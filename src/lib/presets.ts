export interface Preset {
    id: string;
    name: string;
    shortName: string;
    words: PresetWord[];
}

export interface PresetWord {
    c: string[];
    p: string[];
}

export const presets: Preset[] = [
    {
        id: 'npcr_2ed_lesson1',
        name: 'NPCR 2nd Edition Lesson 1',
        shortName: 'Lesson 1',
        words: [
            // Text 1
            {c: ['你'], p: ['ni3']},
            {c: ['好'], p: ['hao3']},
            {c: ['陆', '雨', '平'], p: ['lv4', 'yu3', 'ping2']},
            {c: ['力', '波'], p: ['li4', 'bo1']},
            
            // Text 2
            {c: ['吗'], p: ['ma5']},
            {c: ['我'], p: ['wo3']},
            {c: ['很'], p: ['hen3']},
            {c: ['呢'], p: ['ne5']},
            {c: ['也'], p: ['ye3']},
            {c: ['林', '娜'], p: ['lin2', 'na4']},
        ],
    },
    {
        id: 'npcr_2ed_lesson2',
        name: 'NPCR 2nd Edition Lesson 2',
        shortName: 'Lesson 2',
        words: [
            // Text 1
            {c: ['忙'], p: ['mang2']},
            {c: ['吗'], p: ['ma5']},
            {c: ['爸', '爸'], p: ['ba4', 'ba5']},
            {c: ['妈', '妈'], p: ['ma1', 'ma5']},
            {c: ['他', '们'], p: ['ta1', 'men5']},
            {c: ['他'], p: ['ta1']},
            {c: ['们'], p: ['men5']},
            {c: ['都'], p: ['dou1']},
            {c: ['不'], p: ['bu4']},
            {c: ['男'], p: ['nan2']},
            {c: ['朋', '友'], p: ['peng2', 'you5']},
            {c: ['呢'], p: ['ne5']},
            
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
        id: 'npcr_2ed_lesson3',
        name: 'NPCR 2nd Edition Lesson 3',
        shortName: 'Lesson 3',
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
            {c: ['都'], p: ['dou1']},
            {c: ['中', '国'], p: ['zhong1', 'guo2']},
            
            // Text 2
            {c: ['您'], p: ['nin2']},
            {c: ['这'], p: ['zhe4']},
            {c: ['他'], p: ['ta1']},
            {c: ['外', '语'], p: ['wai4', 'yu3']},
            {c: ['你'], p: ['ni3']},
            {c: ['医', '生'], p: ['yi1', 'sheng5']},
            {c: ['奶', '奶'], p: ['nai3', 'nai5']},
            {c: ['外', '婆'], p: ['wai4', 'po2']},
            {c: ['陈'], p: ['chen2']},
        ],
    },
    {
        id: 'npcr_2ed_lesson4',
        name: 'NPCR 2nd Edition Lesson 4',
        shortName: 'Lesson 4',
        words: [
            // Text 1
            {c: ['认', '识'], p: ['ren2', 'shi5']},
            {c: ['高', '兴'], p: ['gao1', 'xing4']},
            {c: ['高'], p: ['gao1']},
            {c: ['可', '以'], p: ['ke3', 'yi3']},
            {c: ['进', '来'], p: ['jin4', 'lai2']},
            {c: ['进'], p: ['jin4']},
            {c: ['来'], p: ['lai2']},
            {c: ['请'], p: ['qing3']},
            {c: ['您'], p: ['nin2']},
            {c: ['朋', '友'], p: ['peng2', 'you5']},
            {c: ['记', '者'], p: ['ji4', 'zhe3']},
            {c: ['请', '问'], p: ['qing3', 'wen4']},
            {c: ['问'], p: ['wen4']},
            {c: ['贵', '姓'], p: ['gao1', 'xing4']},
            {c: ['姓'], p: ['xing4']},
            {c: ['叫'], p: ['jiao4']},
            {c: ['先', '生'], p: ['xian1', 'sheng5']},
            {c: ['杨'], p: ['yang2']},
            
            // Text 2
            {c: ['语', '言'], p: ['yu3', 'yan2']},
            {c: ['学', '院'], p: ['xue2', 'yuan4']},
            {c: ['学'], p: ['xue2']},
            {c: ['的'], p: ['de5']},
            {c: ['学', '生'], p: ['xue2', 'sheng5']},
            {c: ['什', '么'], p: ['shen2', 'me5']},
            {c: ['学', '习'], p: ['xue2', 'xi2']},
            {c: ['汉', '语'], p: ['han4', 'yu3']},
            {c: ['英', '国'], p: ['ying1', 'guo2']},
            {c: ['马', '大', '为'], p: ['ma3', 'da4', 'wei2']},
            {c: ['加', '拿', '大'], p: ['jia1', 'na2', 'da4']},
            {c: ['美', '国'], p: ['mei3', 'guo2']},
            
            // Text 2 Supplementary
            {c: ['法', '国'], p: ['fa3', 'guo2']},
            {c: ['德', '国'], p: ['de2', 'guo2']},
            {c: ['俄', '罗', '斯'], p: ['e2', 'luo2', 'si1']},
            {c: ['日', '本'], p: ['ri4', 'ben3']},
        ],
    },
    // {
    //     id: 'npcr_2ed_lesson5',
    //     name: 'NPCR 2nd Edition Lesson 5',
    //     shortName: 'Lesson 5',
    //     words: [
    //         // Text 1
    //         // 餐厅 在 哪儿 请问 问 这 宿舍 女 学生 进 坐 谢谢 对不起 我 知道 没关系 好 再见 再 王小云
    //         
    //         // Text 2
    //         // 小姐 二 层 零 四 号 不用 这儿 晚 了 宋华
    //     ],
    // },
    // {
    //     id: 'npcr_2ed_lesson6',
    //     name: 'NPCR 2nd Edition Lesson 6',
    //     shortName: 'Lesson 6',
    //     words: [
    //         // Text 1
    //         // 去 游泳 昨天 京剧 怎么样 有意思 今天 天 天气 太 什么 时候 现在
    //         
    //         // Text 2
    //         // 明天 有 时间 说 遍 打球 打 球 抱歉 忙 恐怕 行 谢谢 你们
    //     ],
    // },
    // {
    //     id: 'npcr_2ed_lesson7',
    //     name: 'NPCR 2nd Edition Lesson 7',
    //     shortName: 'Lesson 7',
    //     words: [
    //         // Text 1
    //         // 开学 开 很 高兴 高 看 问 一下 学院 名片 啊 教授 教 丁力波 张
    //         
    //         // Text 2
    //         // 谁 来 介绍 名字 中文 爸爸 学习 学 专业 美术 美 文学 系 马大为 加拿大 美国
    //         
    //         // Text 2 Supplementary
    //         // 物理 化学 数学 音乐 历史 哲学 经济 教育 选修 文化
    //     ],
    // },
];