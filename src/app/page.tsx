'use client'

import { produce, setAutoFreeze } from 'immer';
import { useEffect, useRef, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods, LinkObject, NodeObject } from 'react-force-graph-2d';
import { Preset, presets } from '@/lib/presets';

setAutoFreeze(false);

enum NodeType {
  Character,
  Pinyin,
  Custom,
}

interface GraphNode {
  type: NodeType;
}

interface GraphLink {
  weakLink: boolean;
}

export default function Home() {
  const [enabledPresetIds, setEnabledPresetIds] = useState([] as string[]);
  const [graphData, setGraphData] = useState({
    nodes: [] as NodeObject<GraphNode>[],
    links: [] as LinkObject<GraphNode, GraphLink>[],
  });
  
  useEffect(() => {
    setGraphData(generateGraphDataFromPresets(presets.filter(p => enabledPresetIds.includes(p.id))));
    graphRef.current?.zoomToFit(500);
  }, [enabledPresetIds]);
  
  useEffect(() => {
    setTimeout(() => {
      graphRef.current?.zoomToFit(500);
    }, 500);
  }, []);
  
  const graphRef = useRef<ForceGraphMethods<GraphNode, GraphLink>>(undefined);
  
  return (
    <div className="flex">
      <div className="flex flex-col p-5">
        {presets.map(preset =>
          <div key={preset.id} className="flex gap-2">
            <input id={`preset-${preset.id}`} type="checkbox" checked={enabledPresetIds.includes(preset.id)} onChange={e => {
              setEnabledPresetIds(produce(enabledPresetIds, draft => {
                if (e.target.checked) {
                  if (!draft.includes(preset.id)) {
                    draft.push(preset.id);
                  }
                } else {
                  if (draft.includes(preset.id)) {
                    draft.splice(draft.indexOf(preset.id), 1);
                  }
                }
              }));
            }}/>
            <label htmlFor={`preset-${preset.id}`}>{preset.name}</label>
          </div>
        )}
      </div>
      <div className=" bg-slate-400">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          cooldownTicks={100}
          nodeCanvasObject={(node, ctx, globalScale) => {
            if (node.x === undefined || node.y === undefined) {
              return;
            }
            
            // Calculate colour and font size
            let colour: string;
            let fontSize: number;
            switch (node.type) {
              case NodeType.Character:
                colour = '#d2f9fa';
                fontSize = 14 / globalScale;
                break;
              case NodeType.Pinyin:
                colour = '#f2d2fa';
                fontSize = 11 / globalScale;
                break;
              case NodeType.Custom:
                colour = '#fae9d2';
                fontSize = 11 / globalScale;
                break;
            }
            
            // Prepare font and measure text
            ctx.font = `${fontSize}px Sans-Serif`;
            const label = String(node.id);
            const diameter = ctx.measureText(label).width + 2;
            
            // Render circle
            ctx.fillStyle = colour;
            ctx.beginPath();
            ctx.arc(node.x, node.y, diameter / 2, 0, 2 * Math.PI);
            ctx.fill();

            // Render text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#0e0e0e';
            ctx.fillText(label, node.x, node.y);

            node.diameter = diameter; // to re-use in nodePointerAreaPaint
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            if (node.x === undefined || node.y === undefined) {
              return;
            }
            ctx.fillStyle = color;
            const diameter = node.diameter;
            if (diameter) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, diameter / 2, 0, 2 * Math.PI);
              ctx.fill();
            }
          }}
          linkWidth={(d: GraphLink) => d.weakLink ? 4 : 8}
          linkColor={(d: GraphLink) => d.weakLink ? '#c79bc9' : '#65cdbc'}
        />
      </div>
    </div>
  );
}

function generateGraphDataFromPresets(presets: Preset[]) {
  const graphData = {
    nodes: [] as NodeObject<GraphNode>[],
    links: [] as LinkObject<GraphNode, GraphLink>[],
  };
  
  for (const preset of presets) {
    for (const word of preset.words) {
      
      // Skip any broken preset words
      if (word.c.length !== word.p.length) {
        console.log(`Skipping invalid word ${word.c.join('')} (${word.p.join('')}) in preset ${preset.id}`);
        continue;
      }
      
      // Add the full word with all characters
      graphData.nodes.push({
        id: word.c.join(''),
        type: NodeType.Character,
      });
      
      // Add each character separately unless it's already added
      const newChars = word.c.map(c => ({
        id: c,
        type: NodeType.Character,
      }));
      for (const newChar of newChars) {
        if (graphData.nodes.find(n => n.id === newChar.id)) {
          continue;
        }
        graphData.nodes.push(newChar);
      }
      
      // Add each pinyin separately unless it's already added
      const newPinyins = word.p.map(p => ({
        id: p,
        type: NodeType.Pinyin,
      }));
      for (const newPinyin of newPinyins) {
        if (graphData.nodes.find(n => n.id === newPinyin.id)) {
          continue;
        }
        graphData.nodes.push(newPinyin);
      }
      
      // Add links
      for (let i = 0; i < word.c.length; i++) {
        const c = word.c[i];
        const p = word.p[i];
        
        // Add the link from the full word to the current character if necessary
        if (word.c.length > 1) {
          graphData.links.push({
            source: word.c.join(''),
            target: c,
            weakLink: false,
          });
        }
        
        // Add the link from the current character to the current pinyin
        graphData.links.push({
          source: c,
          target: p,
          weakLink: false,
        });
        
        // Add weak links between pinyins that differ only by tone (e.g. shi4 > shi2)
        const simpleP = p.replace(/\d/, '');
        for (const other of graphData.nodes) {
          if (other.id === p || other.type !== NodeType.Pinyin) {
            continue;
          }
          const otherSimpleP = String(other.id).replace(/\d/, '');
          if (simpleP === otherSimpleP) {
            graphData.links.push({
              source: p,
              target: other,
              weakLink: true,
            });
          }
        }
      }
    }
  }
  
  return graphData;
}