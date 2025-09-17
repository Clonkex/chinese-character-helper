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

enum LinkType {
    Level5, // Strongest
    Level4,
    Level3,
    Level2,
    Level1, // Weakest
}

interface GraphLink {
    type: LinkType;
}

export default function Home() {
    const [enabledPresetIds, setEnabledPresetIds] = useState(presets.map(p => p.id));
    const [graphData, setGraphData] = useState({
        nodes: [] as NodeObject<GraphNode>[],
        links: [] as LinkObject<GraphNode, GraphLink>[],
    });
    const [enablePresetNodes, setEnablePresetNodes] = useState(true);
    const [useGlobalScale, setUseGlobalScale] = useState(true);
    const [showLevel4Links, setShowLevel4Links] = useState(true);
    const [showLevel3Links, setShowLevel3Links] = useState(true);
    const [showLevel2Links, setShowLevel2Links] = useState(true);
    const [showLevel1Links, setShowLevel1Links] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [matchWholeWord, setMatchWholeWord] = useState(true);
    
    useEffect(() => {
        setGraphData(generateGraphDataFromPresets(presets.filter(p => enabledPresetIds.includes(p.id)), enablePresetNodes, showLevel4Links, showLevel3Links, showLevel2Links, showLevel1Links, filterText, matchWholeWord));
        graphRef.current?.zoomToFit(500);
    }, [enabledPresetIds, enablePresetNodes, showLevel4Links, showLevel3Links, showLevel2Links, showLevel1Links, filterText, matchWholeWord]);
    
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
                    <div className="flex flex-col">
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
                        <div className="flex gap-2">
                            <input id="showLevel4LinksCheckbox" type="checkbox" checked={showLevel4Links} onChange={e => {
                                setShowLevel4Links(e.target.checked);
                            }}/>
                            <label className="label" htmlFor="showLevel4LinksCheckbox">Show Strongest Links</label>
                        </div>
                        <div className="flex gap-2">
                            <input id="showLevel3LinksCheckbox" type="checkbox" checked={showLevel3Links} onChange={e => {
                                setShowLevel3Links(e.target.checked);
                            }}/>
                            <label className="label" htmlFor="showLevel3LinksCheckbox">Show Stronger Links</label>
                        </div>
                        <div className="flex gap-2">
                            <input id="showLevel2LinksCheckbox" type="checkbox" checked={showLevel2Links} onChange={e => {
                                setShowLevel2Links(e.target.checked);
                            }}/>
                            <label className="label" htmlFor="showLevel2LinksCheckbox">Show Weaker Links</label>
                        </div>
                        <div className="flex gap-2">
                            <input id="showLevel1LinksCheckbox" type="checkbox" checked={showLevel1Links} onChange={e => {
                                setShowLevel1Links(e.target.checked);
                            }}/>
                            <label className="label" htmlFor="showLevel1LinksCheckbox">Show Weakest Links</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span>Filter</span>
                    <div className="flex flex-col">
                        <div className="flex gap-2 items-center">
                            <input type="input" className="input" value={filterText} onChange={e => {
                                setFilterText(e.target.value);
                            }}/>
                            <button type="button" className="btn btn-sm" onClick={() => {
                                setFilterText('');
                            }}>Clear</button>
                        </div>
                        <div className="flex gap-2">
                            <input id="matchWholeWordCheckbox" type="checkbox" checked={matchWholeWord} onChange={e => {
                                setMatchWholeWord(e.target.checked);
                            }}/>
                            <label className="label" htmlFor="matchWholeWordCheckbox">Match Whole Word</label>
                        </div>
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
                        const idParts = String(node.id).split('|');
                        const label = idParts[0];
                        const metrics = ctx.measureText(label);
                        const diameter = metrics.width + 2;
                        
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
                        if (idParts.length > 1) {
                            ctx.font = `${fontSize / 2}px Sans-Serif`;
                            ctx.fillText(idParts[1], node.x, node.y + fontSize * 0.7);
                        }

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
                    linkWidth={(d: GraphLink) => {
                        let width: number;
                        switch (d.type) {
                            case LinkType.Level5:
                                width = 8;
                                break;
                            case LinkType.Level4:
                                width = 6;
                                break;
                            case LinkType.Level3:
                                width = 4;
                                break;
                            case LinkType.Level2:
                                width = 2;
                                break;
                            case LinkType.Level1:
                                width = 1;
                                break;
                        }
                        return width;
                    }}
                    linkColor={(d: GraphLink) => {
                        let colour: string;
                        switch (d.type) {
                            case LinkType.Level5:
                                colour = '#65cdbc';
                                break;
                            case LinkType.Level4:
                                colour = '#b09bc9';
                                break;
                            case LinkType.Level3:
                                colour = '#c79bc9';
                                break;
                            case LinkType.Level2:
                                colour = '#c9c19b';
                                break;
                            case LinkType.Level1:
                                colour = '#c99b9f';
                                break;
                        }
                        return colour;
                    }}
                />
            </div>
        </div>
    );
}

function generateGraphDataFromPresets(presets: Preset[], addPresetNodes: boolean, addLevel4Links: boolean, addLevel3Links: boolean, addLevel2Links: boolean, addLevel1Links: boolean, filterText: string, matchWholeWord: boolean) {
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
            
            const fullId = `${fullC}|${fullP}`;
            
            // Skip any non-matching words
            if (filterText !== '') {
                if (matchWholeWord) {
                    const parts = fullId.split('|').flatMap(p => p.split(/\d/));
                    console.log(parts);
                    if (!parts.includes(filterText)) {
                        console.log(`Skipping word "${fullId}" in preset "${preset.id}" because it does not match the filter text "${filterText}"`);
                        continue;
                    }
                } else {
                    if (!fullId.includes(filterText)) {
                        console.log(`Skipping word "${fullId}" in preset "${preset.id}" because it does not match the filter text "${filterText}"`);
                        continue;
                    }
                }
            }
            
            // Skip any broken preset words
            if (word.c.length !== word.p.length) {
                console.log(`Skipping invalid word "${fullId}" in preset "${preset.id}"`);
                continue;
            }
            
            // Add the full word with all characters
            const fullWordAdded = addNode(graphData, fullId, NodeType.Character);
            
            // Add each character separately unless it's already added
            word.c.forEach((c, index) => addNode(graphData, `${c}|${word.p[index]}`, NodeType.Character));
            
            // Add links
            for (let i = 0; i < word.c.length; i++) {
                const c = word.c[i];
                const p = word.p[i];
                
                const id = `${c}|${p}`;
                
                // If the full word hadn't previously been added, add the link to the preset
                if (addPresetNodes && fullWordAdded) {
                    addLink(graphData, fullId, preset.shortName, LinkType.Level5);
                }
                
                // Add the link from the full word to the current character
                addLink(graphData, fullId, id, LinkType.Level5);
                
                // Add weak links between pinyins that differ only by tone (e.g. shi4 > shi2)
                const simpleP = p.replace(/\d/, '');
                for (const other of graphData.nodes) {
                    if (other.id === id || other.type !== NodeType.Character || other.id === undefined) {
                        continue;
                    }
                    const otherIdParts = String(other.id).split('|');
                    if (otherIdParts.length < 2) {
                        continue;
                    }
                    const otherC = otherIdParts[0];
                    const otherP = otherIdParts[1];
                    const otherSimpleP = otherP.replace(/\d/, '');
                    
                    if (otherC === c) {
                        if (otherSimpleP === simpleP) {
                            // characters match, pinyins weak match == character match + pinyin weak match link (level 4)
                            if (addLevel4Links) {
                                addLink(graphData, id, other.id, LinkType.Level4);
                            }
                        } else {
                            // characters match, pinyins no match == character match link (level 3)
                            if (addLevel3Links) {
                                addLink(graphData, id, other.id, LinkType.Level3);
                            }
                        }
                    } else {
                        if (otherP === p) {
                            // characters no match, pinyins exact match == pinyin match link (level 2)
                            if (addLevel2Links) {
                                addLink(graphData, id, other.id, LinkType.Level2);
                            }
                        } else if (otherSimpleP === simpleP) {
                            // characters no match, pinyins inexact match (tones differ) == pinyin weak match link (level 1)
                            if (addLevel1Links) {
                                addLink(graphData, id, other.id, LinkType.Level1);
                            }
                        }
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

    function addLink(graphData: { nodes: NodeObject<GraphNode>[], links: LinkObject<GraphNode, GraphLink>[] }, source: string | number, target: string | number, type: LinkType): boolean {
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
            type,
        });
        return true;
    }
}