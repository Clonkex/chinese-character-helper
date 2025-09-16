'use client'

import { useEffect, useState } from 'react';
import { Preset, PresetWord } from '@/lib/presets';
import Cedict, { ChineseWord } from '@tykok/cedict-dictionary';
import { produce, setAutoFreeze } from 'immer';
import { loadPresets, savePresets } from '@/actions/actions';

setAutoFreeze(false);

export default function Picker() {
    const [loading, setLoading] = useState(true);
    const [newPresetTitle, setNewPresetTitle] = useState('');
    const [presets, setPresets] = useState([] as Preset[]);
    const [selectedPreset, setSelectedPreset] = useState(presets.length > 0 ? presets[0] : undefined);
    const [potentialWords, setPotentialWords] = useState([] as ChineseWord[]);
    
    useEffect(() => {
        const fetchData = async () => {
            const loadedPresets = await loadPresets();
            setPresets(produce(presets, draft => {
                draft.length = 0;
                draft.push(...loadedPresets);
            }));
            setLoading(false);
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    let timeout: NodeJS.Timeout;
    const allWords = Cedict.getCedict();
    
    return (
        <div className="flex flex-col gap-5 max-w-3xl mx-auto my-10">
            <button type="button" className="btn" onClick={async () => {
                await savePresets(presets);
            }}>Save Presets</button>
            <div className="flex gap-5 items-center">
                <label htmlFor="newPresetInput">New Preset Title</label>
                <input id="newPresetInput" type="text" className="input" value={newPresetTitle} onChange={e => {
                    setNewPresetTitle(e.target.value);
                }}/>
                <button type="button" className="btn btn-sm" onClick={() => {
                    const newPreset: Preset = {
                        id: newPresetTitle.toLowerCase().replaceAll(' ', ''),
                        name: newPresetTitle,
                        shortName: newPresetTitle,
                        words: [],
                    };
                    setNewPresetTitle('');
                    if (presets.find(p => p.id === newPreset.id)) {
                        alert(`Cannot add duplicate preset with ID "${newPreset.id}"`);
                        return;
                    }
                    setPresets(produce(presets, draft => {
                        draft.push(newPreset);
                    }));
                    setSelectedPreset(newPreset);
                }}>Add</button>
            </div>
            <div className="flex gap-5 items-center">
                <label htmlFor="presetSelector">Preset</label>
                <select id="presetSelector" className="select" value={selectedPreset?.id} onChange={e => {
                    setSelectedPreset(presets.find(p => p.id === e.target.value));
                }}>
                    {presets.map(preset =>
                        <option key={preset.id} value={preset.id}>{preset.name}</option>
                    )}
                </select>
            </div>
            {selectedPreset !== undefined &&
                <div className="flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                        <label htmlFor="charInput">Add Character</label>
                        <input id="charInput" type="text" className="input" onChange={e => {
                            clearTimeout(timeout);
                            timeout = setTimeout(() => {
                                const words = allWords.filter(w => w.pinyin === e.target.value);
                                setPotentialWords(words);
                            }, 100);
                        }}/>
                    </div>
                    
                    {/* Potential words list */}
                    <div className="list gap-1">
                        {potentialWords.map(potentialWord =>
                            <div key={keyFromChineseWord(potentialWord)} className="flex items-center gap-2">
                                <button type="button" className="btn btn-sm" onClick={() => {
                                    setPresets(produce(presets, draft => {
                                        const preset = draft.find(p => p.id === selectedPreset.id);
                                        if (preset === undefined) {
                                            throw new Error("this shouldn't happen");
                                        }
                                        // const newWord: PresetWord = {c: ['陆', '雨', '平'], p: ['lv4', 'yu3', 'ping2']};
                                        const newWord: PresetWord = {c: ['陆', '雨', '平'], p: ['lv4', 'yu3', 'ping2']};
                                        preset.words.push(newWord);
                                    }));
                                }}>Add</button>
                                <span>{`${potentialWord.simplified === potentialWord.traditional ? potentialWord.simplified : `${potentialWord.simplified}/${potentialWord.traditional}`}: ${potentialWord.pinyin} - ${potentialWord.english.join(', ')}`}</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Current words list */}
                    <div className="list gap-1">
                        {selectedPreset.words.map(word =>
                            <div key={keyFromPresetWord(word)} className="flex items-center gap-2">
                                <button type="button" className="btn btn-sm" onClick={() => {
                                    console.log('clicked delete for');
                                    console.log(word);
                                }}>Delete</button>
                                <span>{`${word.c.join('')}: ${word.p.join(' ')}`}</span>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

function keyFromChineseWord(word: ChineseWord): string {
    return `${word.english.join('')}${word.pinyin}${word.simplified}${word.traditional}`;
}

function keyFromPresetWord(word: PresetWord): string {
    return `${word.c.join('')}${word.p.join('')}`;
}