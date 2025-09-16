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
    const [enabledPresetIds, setEnabledPresetIds] = useState(presets.map(p => p.id));
    const [graphData, setGraphData] = useState({
        nodes: [] as NodeObject<GraphNode>[],
        links: [] as LinkObject<GraphNode, GraphLink>[],
    });
    const [enablePresetNodes, setEnablePresetNodes] = useState(true);
    const [useGlobalScale, setUseGlobalScale] = useState(false);
    
    useEffect(() => {
        setGraphData(generateGraphDataFromPresets(presets.filter(p => enabledPresetIds.includes(p.id)), enablePresetNodes));
        graphRef.current?.zoomToFit(500);
    }, [enabledPresetIds, enablePresetNodes]);
    
    useEffect(() => {
        setTimeout(() => {
            graphRef.current?.zoomToFit(500);
        }, 500);
    }, []);
    
    const graphRef = useRef<ForceGraphMethods<GraphNode, GraphLink>>(undefined);
    
    return (
        <div className="flex">
            <div className="flex flex-col gap-10 m-5">
                <div className="flex flex-col gap-2">
                    <span>Presets</span>
                    <div className="flex flex-col">
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
                                <label className="label" htmlFor={`preset-${preset.id}`}>{preset.name}</label>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span>Settings</span>
                    <div className="flex gap-2">
                        <input id="enablePresetNodesCheckbox" type="checkbox" checked={enablePresetNodes} onChange={e => {
                            setEnablePresetNodes(e.target.checked);
                        }}/>
                        <label className="label" htmlFor="enablePresetNodesCheckbox">Add Preset Nodes</label>
                    </div>
                    <div className="flex gap-2">
                        <input id="useGlobalScaleCheckbox" type="checkbox" checked={useGlobalScale} onChange={e => {
                            setUseGlobalScale(e.target.checked);
                        }}/>
                        <label className="label" htmlFor="useGlobalScaleCheckbox">Scale With Zoom</label>
                    </div>
                </div>
            </div>
            <div className=" bg-slate-400">
                <ForceGraph2D
                    ref={graphRef}
                    graphData={graphData}
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
                                fontSize = useGlobalScale ? 25 / globalScale : 15;
                                break;
                            case NodeType.Pinyin:
                                colour = '#f2d2fa';
                                fontSize = useGlobalScale ? 15 / globalScale : 10;
                                break;
                            case NodeType.Custom:
                                colour = '#fae9d2';
                                fontSize = useGlobalScale ? 15 / globalScale : 10;
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

                        node.diameter = diameter; // to reuse in nodePointerAreaPaint
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

function generateGraphDataFromPresets(presets: Preset[], addPresetNodes: boolean) {
    const graphData = {
        nodes: [
            // {
            //     id: 'root',
            //     type: NodeType.Custom,
            // },
        ] as NodeObject<GraphNode>[],
        links: [] as LinkObject<GraphNode, GraphLink>[],
    };
    
    for (const preset of presets) {
        
        // Add the preset as a node
        if (addPresetNodes) {
            addNode(graphData, preset.shortName, NodeType.Custom);
        }
                
        // Add NPCR link
        // addLink(graphData, preset.id, 'root', false);
        
        for (const word of preset.words) {
            const fullC = word.c.join('');
            const fullP = word.p.join('');
            
            // Skip any broken preset words
            if (word.c.length !== word.p.length) {
                console.log(`Skipping invalid word "${fullC}" (${fullP}) in preset "${preset.id}"`);
                continue;
            }
            
            // Add the full word with all characters
            const fullWordAdded = addNode(graphData, fullC, NodeType.Character);
            
            // Add each character separately unless it's already added
            word.c.forEach(c => addNode(graphData, c, NodeType.Character));
            
            // Add each pinyin separately unless it's already added
            word.p.forEach(p => addNode(graphData, p, NodeType.Pinyin));
            
            // Add links
            for (let i = 0; i < word.c.length; i++) {
                const c = word.c[i];
                const p = word.p[i];
                
                // If the full word hadn't previously been added, add the link to the preset
                if (addPresetNodes && fullWordAdded) {
                    addLink(graphData, fullC, preset.shortName, false);
                }
                
                // Add the link from the full word to the current character
                addLink(graphData, fullC, c, false);
                
                // Add the link from the current character to the current pinyin
                addLink(graphData, c, p, false);
                
                // Add weak links between pinyins that differ only by tone (e.g. shi4 > shi2)
                const simpleP = p.replace(/\d/, '');
                for (const other of graphData.nodes) {
                    if (other.id === p || other.type !== NodeType.Pinyin) {
                        continue;
                    }
                    const otherSimpleP = String(other.id).replace(/\d/, '');
                    if (simpleP === otherSimpleP) {
                        addLink(graphData, p, other.id!, true);
                    }
                }
            }
        }
    }
    
    return graphData;

    function addNode(graphData: { nodes: NodeObject<GraphNode>[], links: LinkObject<GraphNode, GraphLink>[] }, id: string, type: NodeType): boolean {
        if (graphData.nodes.find(n => n.id === id) !== undefined) {
            console.log(`Skipping node because node with id "${id}" already exists`);
            return false;
        }
        console.log(`Adding node "${id}"`);
        graphData.nodes.push({
            id,
            type,
        });
        return true;
    }

    function addLink(graphData: { nodes: NodeObject<GraphNode>[], links: LinkObject<GraphNode, GraphLink>[] }, source: string | number, target: string | number, weakLink: boolean): boolean {
        if (source === target) {
            console.log(`Skipping link because source "${source}" === target "${target}"`);
            return false;
        }
        const test1 = graphData.links.find(l => l.source === source && l.target === target);
        if (test1 !== undefined) {
            console.log(`Skipping link because an existing link with the same source "${source}" and target "${target}" exists`);
            console.log(test1);
            return false;
        }
        const test2 = graphData.links.find(l => l.source === target && l.target === source);
        if (test2 !== undefined) {
            console.log(`Skipping link because an existing link with a source matching target "${target}" and target matching source "${source}" exists`);
            console.log(test2);
            return false;
        }
        console.log(`Adding link with source "${source}" and target "${target}"`);
        graphData.links.push({
            source,
            target,
            weakLink,
        });
        return true;
    }
}