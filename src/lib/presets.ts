// export type PresetWord = string[][];

export interface Preset {
    id: string;
    name: string;
    words: PresetWord[];
}

export interface PresetWord {
    c: string[];
    p: string[];
}

export const presets: Preset[] = [
    {
        id: 'lesson1',
        name: 'Lesson 1',
        words: [
            // Text 1
            {c: ['你'], p: ['ni3']},
            {c: ['好'], p: ['hao3']},
            {c: ['陆', '雨', '平'], p: ['lv4', 'yu3', 'ping2']},
            {c: ['马'], p: ['ma3']},
            {c: ['我'], p: ['wo3']},
            {c: ['很'], p: ['hen3']},
            {c: ['呢'], p: ['ne5']},
            {c: ['也'], p: ['ye3']},
            {c: ['林', '娜'], p: ['lin2', 'na4']},
        ],
    },
    {
        id: 'lesson2',
        name: 'Lesson 2',
        words: [
            // Text 1
            {c: ['忙'], p: ['mang2']},
            {c: ['爸', '爸'], p: ['ba4', 'ba5']},
            {c: ['妈', '妈'], p: ['ma1', 'ma5']},
            {c: ['他', '们'], p: ['ta1', 'men5']},
            {c: ['都'], p: ['dou1']},
            {c: ['不'], p: ['bu4']},
            {c: ['男'], p: ['nan2']},
            {c: ['朋', '友'], p: ['peng2', 'you5']},
            
            // Text 2
            {c: ['哥', '哥'], p: ['ge1', 'ge5']},
            {c: ['要'], p: ['yao4']},
            {c: ['咖', '啡'], p: ['ka1', 'fei1']},
            {c: ['弟', '弟'], p: ['di4', 'di5']},
            {c: ['我', '们'], p: ['wo3', 'men5']},
            {c: ['喝'], p: ['he1']},
            {c: ['丁'], p: ['ding1']},
        ],
    },
    {
        id: 'lesson3',
        name: 'Lesson 3',
        words: [
            // Text 1
            {c: ['她'], p: ['ta1']},
            {c: ['是'], p: ['shi4']},
            {c: ['哪'], p: ['na3']},
            {c: ['国'], p: ['guo2']},
            {c: ['人'], p: ['ren2']},
            {c: ['那'], p: ['na4']},
            {c: ['谁'], p: ['shei2']},
            {c: ['老', '师'], p: ['lao3', 'shi2']},
            {c: ['中', '国'], p: ['zhong1', 'guo2']},
            
            // Text 2
            {c: ['您'], p: ['nin2']},
            {c: ['这'], p: ['zhe4']},
            {c: ['外', '语'], p: ['wai4', 'yu3']},
            {c: ['医', '生'], p: ['yi1', 'sheng5']},
            {c: ['奶', '奶'], p: ['nai3', 'nai5']},
            {c: ['外', '婆'], p: ['wai4', 'po2']},
            {c: ['陈'], p: ['chen2']},
        ],
    },
];