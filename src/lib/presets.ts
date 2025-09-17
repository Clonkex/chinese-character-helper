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
            {c: ['贵', '姓'], p: ['gui4', 'xing4']},
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
    {
        id: 'npcr_2ed_lesson5',
        name: 'NPCR 2nd Edition Lesson 5',
        shortName: 'Lesson 5',
        words: [
            // Text 1
            {c: ['餐', '厅'], p: ['can1', 'ting1']},
            {c: ['在'], p: ['zai4']},
            {c: ['哪', '儿'], p: ['na3', 'er5']},
            {c: ['请', '问'], p: ['qing3', 'wen4']},
            {c: ['问'], p: ['wen4']},
            {c: ['这'], p: ['zhe4']},
            {c: ['宿', '舍'], p: ['su4', 'she4']},
            {c: ['女'], p: ['nv3']},
            {c: ['学', '生'], p: ['xue2', 'sheng5']},
            {c: ['进'], p: ['jin4']},
            {c: ['坐'], p: ['zuo4']},
            {c: ['谢', '谢'], p: ['xie4', 'xie5']},
            {c: ['对', '不', '起'], p: ['dui4', 'bu4', 'qi3']},
            {c: ['我'], p: ['wo3']},
            {c: ['知', '道'], p: ['zhi1', 'dao4']},
            {c: ['没', '关', '系'], p: ['mei2', 'guan1', 'xi5']},
            {c: ['好'], p: ['hao3']},
            {c: ['再', '见'], p: ['zai4', 'jian4']},
            {c: ['再'], p: ['zai4']},
            {c: ['王', '小', '云'], p: ['wang2', 'xiao3', 'yun2']},
            
            // Text 2
            {c: ['小', '姐'], p: ['xiao3', 'jie5']},
            {c: ['二'], p: ['er4']},
            {c: ['层'], p: ['ceng2']},
            {c: ['零'], p: ['ling2']},
            {c: ['四'], p: ['si4']},
            {c: ['号'], p: ['hao4']},
            {c: ['不', '用'], p: ['bu2', 'yong4']},
            {c: ['这', '儿'], p: ['zhe4', 'er5']},
            {c: ['晚'], p: ['wan3']},
            {c: ['了'], p: ['le5']},
            {c: ['宋', '华'], p: ['song4', 'hua2']},
        ],
    },
    {
        id: 'npcr_2ed_lesson6',
        name: 'NPCR 2nd Edition Lesson 6',
        shortName: 'Lesson 6',
        words: [
            // Text 1
            {c: ['去'], p: ['qu4']},
            {c: ['游', '泳'], p: ['you2', 'yong3']},
            {c: ['昨', '天'], p: ['zuo2', 'tian1']},
            {c: ['京', '剧'], p: ['jing1', 'ju4']},
            {c: ['怎', '么', '样'], p: ['zen3', 'me5', 'yang4']},
            {c: ['有', '意', '思'], p: ['you3', 'yi4', 'si5']},
            {c: ['今', '天'], p: ['jin1', 'tian1']},
            {c: ['天'], p: ['tian1']},
            {c: ['天', '气'], p: ['tian1', 'qi4']},
            {c: ['太'], p: ['tai4']},
            {c: ['什', '么'], p: ['shen2', 'me5']},
            {c: ['时', '候'], p: ['shi2', 'hou4']},
            {c: ['现', '在'], p: ['xian4', 'zai4']},
            
            // Text 2
            {c: ['明', '天'], p: ['ming2', 'tian1']},
            {c: ['有'], p: ['you3']},
            {c: ['时', '间'], p: ['shi2', 'jian1']},
            {c: ['说'], p: ['shuo1']},
            {c: ['遍'], p: ['bian4']},
            {c: ['打', '球'], p: ['da3', 'qiu2']},
            {c: ['打'], p: ['da3']},
            {c: ['球'], p: ['qiu2']},
            {c: ['抱', '歉'], p: ['bao4', 'qian4']},
            {c: ['忙'], p: ['mang2']},
            {c: ['恐', '怕'], p: ['kong3', 'pa4']},
            {c: ['行'], p: ['xing2']},
            {c: ['谢', '谢'], p: ['xie4', 'xie5']},
            {c: ['你', '们'], p: ['ni3', 'men5']},
        ],
    },
    {
        id: 'npcr_2ed_lesson7',
        name: 'NPCR 2nd Edition Lesson 7',
        shortName: 'Lesson 7',
        words: [
            // Text 1
            {c: ['开', '学'], p: ['kai1', 'xue2']},
            {c: ['开'], p: ['kai1']},
            {c: ['很'], p: ['hen3']},
            {c: ['高', '兴'], p: ['gao1', 'xing4']},
            {c: ['高'], p: ['gao1']},
            {c: ['看'], p: ['kan4']},
            {c: ['问'], p: ['wen4']},
            {c: ['一下'], p: ['yi2', 'xia4']},
            {c: ['学', '院'], p: ['xue2', 'yuan4']},
            {c: ['名', '片'], p: ['ming2', 'pian4']},
            {c: ['啊'], p: ['a4']},
            {c: ['教', '授'], p: ['jiao4', 'shou4']},
            {c: ['教'], p: ['jiao1']},
            {c: ['丁', '力', '波'], p: ['ding1', 'li4', 'bo1']},
            {c: ['张'], p: ['zhang1']},
            
            // Text 2
            {c: ['谁'], p: ['shei2']},
            {c: ['来'], p: ['lai2']},
            {c: ['介', '绍'], p: ['jie4', 'shao4']},
            {c: ['名', '字'], p: ['ming2', 'zi5']},
            {c: ['中', '文'], p: ['zhong1', 'wen2']},
            {c: ['爸', '爸'], p: ['ba4', 'ba5']},
            {c: ['学', '习'], p: ['xue2', 'xi2']},
            {c: ['学'], p: ['xue2']},
            {c: ['专', '业'], p: ['zhuan1', 'ye4']},
            {c: ['美', '术'], p: ['mei3', 'shu4']},
            {c: ['美'], p: ['mei3']},
            {c: ['文', '学'], p: ['wen2', 'xue2']},
            {c: ['系'], p: ['xi4']},
            {c: ['马', '大', '为'], p: ['ma3', 'da4', 'wei2']},
            {c: ['加', '拿', '大'], p: ['jia1', 'na2', 'da4']},
            {c: ['美', '国'], p: ['mei3', 'guo2']},
            
            // Text 2 Supplementary
            {c: ['物', '理'], p: ['wu4', 'li3']},
            {c: ['化', '学'], p: ['hua4', 'xue2']},
            {c: ['数', '学'], p: ['shu4', 'xue2']},
            {c: ['音', '乐'], p: ['yin1', 'yue4']},
            {c: ['历', '史'], p: ['li4', 'shi3']},
            {c: ['哲', '学'], p: ['zhe2', 'xue2']},
            {c: ['经', '济'], p: ['jing1', 'ji4']},
            {c: ['教', '育'], p: ['jiao4', 'yu4']},
            {c: ['选', '修'], p: ['xuan3', 'xiu1']},
            {c: ['文', '化'], p: ['wen2', 'hua4']},
        ],
    },
];