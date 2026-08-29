// ============================================================================
// 简历数据（单一数据源）
// 说明：本文件只存放简历内容数据，供 main.js 渲染。
//       修改个人信息、经历、项目、技能、证书、生活照等，只需编辑本文件。
//       中英切换策略：标题 / 标签 / 分类名提供 xxxEn 英文版；
//                     正文内容（描述、要点、详情）保留中文。
// ============================================================================
const resume = {
    basics: {
        name: '刘智鹏',
        nameEn: 'Zhipeng Liu',
        title: '通信工程创新班 · 大一新生',
        titleEn: 'Freshman · Communication Engineering Innovation Class',
        summary: '18岁入选通信工程创新班，自驱力强、结果导向，兼具销售、教学与 AI 实战经验，正持续深耕人工智能与通信技术。',
        summaryEn: 'Selected into the innovation class at 18, self-driven and result-oriented, with hands-on experience in sales, teaching and AI — now diving deep into AI and communication technologies.',
        phone: '16670968176',
        wechat: 'liuzhipengha',
        email: '3675910471@qq.com',
        location: '长沙学院',
        locationEn: 'Changsha University',
        experienceYears: '大一新生（2026级）',
        experienceYearsEn: 'Freshman (Class of 2026)',
        education: '通信工程创新班',
        educationEn: 'Communication Engineering Innovation Class',
        languages: '中文（母语）· 英语（高考140）',
        languagesEn: 'Chinese (Native) · English (Gaokao 140)',
        github: '',
        blog: '',
        skills: ['C语言', 'Python', '团队管理', '销售策略', '教学辅导', 'AI竞赛', '沟通协作', '快速学习'],
        skillsEn: ['C', 'Python', 'Team Management', 'Sales Strategy', 'Tutoring', 'AI Competitions', 'Communication', 'Fast Learning']
    },
    highlights: [
        { number: '58%', numberEn: '58%', desc: '家教学生数学成绩提升幅度，从62分逆袭至98分' },
        { number: '3位', numberEn: '3', desc: '转介绍新学员数量，教学成果获家长一致好评' },
        { number: '100%', numberEn: '100%', desc: '家长满意度，家教服务零差评' },
        { number: '1000+', numberEn: '1000+', desc: '3个月校园销售累计获利，带领10人团队' },
        { number: '23项', numberEn: '23', desc: '阿里达摩院初高级人工智能训练师官方认证，覆盖深度学习、CV、NLP等领域' },
        { number: '40%', numberEn: '40%', desc: '销售复购及转介绍占比，客户满意度100%' }
    ],
    experiences: [{
        id: 'sales',
        label: '💼 销售经历',
        labelEn: 'Sales',
        items: [{
            role: '校园销售负责人',
            company: '四川星辰科技公司（笔记本电脑代理）',
            date: '2026.06 – 2026.08',
            desc: '招募并管理10人+校园销售团队，制定分层激励制度与培训体系。',
            bullets: [
                '团队月均销售额稳步提升，3个月内累计获利超1000元',
                '主导市场调研，精准定位学生群体对高性价比机型的需求，优化选品策略，单周最高成交量屡创新高',
                '建立客户售后跟进SOP，通过口碑裂变实现复购及转介绍占比超40%，客户满意度保持100%'
            ]
        }]
    }, {
        id: 'tutoring',
        label: '📚 教学经历',
        labelEn: 'Tutoring',
        items: [{
            role: '数学学科家教（初高中冲刺辅导）',
            company: '家庭亲戚',
            date: '2026.06 – 2026.08',
            desc: '针对数学基础薄弱学生制定个性化提分方案。',
            bullets: [
                '2个月内帮助学生从期中62分提升至期末98分（满分100），提分幅度达58%',
                '同步辅导创新班选拔考试，系统梳理压轴题解题逻辑与应试策略，最终成功考入目标创新班（录取率<20%）',
                '获得家长群体一致好评，并获转介绍新学员2名'
            ]
        }]
    }],
    projects: [{
        id: 'ai-competition',
        label: '🤖 AI竞赛',
        labelEn: 'AI Competition',
        items: [{
            name: 'AI多任务学习竞赛',
            stack: ['图像分类', '自然语言处理', '时序预测', '深度学习'],
            desc: '先后参与多个AI算法挑战赛，围绕图像分类、NLP、时序预测等方向提交解决方案，在累计23项AI人工智能认证考核中均获金牌等级。',
            result: '23项AI金牌认证，覆盖深度学习、计算机视觉、强化学习等前沿方向',
            link: ''
        }]
    }, {
        id: 'ai-prototype',
        label: '🛒 实战销售',
        labelEn: 'Sales',
        items: [{
            name: '校园笔记本电脑销售',
            stack: ['团队管理', '市场调研', '销售策略', '客户运营'],
            desc: '代理笔记本电脑销售，招募并管理10人+校园销售团队，制定分层激励制度与培训体系。',
            result: '3个月累计获利超1000元，复购及转介绍占比超40%，客户满意度100%',
            link: ''
        }]
    }],
    skills: [{
        category: '💻 编程语言',
        categoryEn: 'Programming Languages',
        items: [
            { name: 'C语言（基础）', level: 55 },
            { name: 'Python（基础）', level: 50 },
            { name: '算法与数据结构', level: 60 }
        ]
    }, {
        category: '🤝 管理与协作',
        categoryEn: 'Management & Collaboration',
        items: [
            { name: '团队组建与激励', level: 85 },
            { name: '销售策略制定', level: 80 },
            { name: '跨年龄段沟通', level: 90 }
        ]
    }, {
        category: '📚 教学与辅导',
        categoryEn: 'Teaching & Tutoring',
        items: [
            { name: '一对一教学', level: 88 },
            { name: '课程设计', level: 82 },
            { name: '学习诊断与规划', level: 85 }
        ]
    }, {
        category: '🧠 AI与前沿技术',
        categoryEn: 'AI & Frontier Tech',
        items: [
            { name: '深度学习基础', level: 65 },
            { name: '计算机视觉', level: 60 },
            { name: '自然语言处理', level: 58 },
            { name: '强化学习', level: 55 }
        ]
    }],
    // ============ 教育背景 ============
    education: {
        school: '长沙学院',
        schoolEn: 'Changsha University',
        major: '通信工程（创新班）',
        majorEn: 'Communication Engineering (Innovation Class)',
        degree: '本科 · 大一新生（2026级）',
        degreeEn: 'Bachelor · Freshman (Class of 2026)',
        period: '2026.09 – 2030.06（预期）',
        periodEn: '2026.09 – 2030.06 (Expected)',
        note: '高考英语 140 分 · 18 岁入选创新班',
        noteEn: 'Gaokao English 140 · Selected into the innovation class at 18',
        courses: ['通信原理', '数据结构与算法', 'Python 程序设计', '人工智能导论', '深度学习', '计算机视觉']
    },
    // ============ 证书 ============
    certificates: [
        {
            title: '🎓 iFLYTEK AI大学堂 · Prompt工程师认证',
            titleEn: '🎓 iFLYTEK AI Academy · Prompt Engineer Certification',
            detail: '科大讯飞 AI大学堂官方认证·Prompt工程师方向，证书编号 XFPROMPT551001，有效期至 2028-07-20。',
            image: 'assets/img/cert-1.jpg',
            noZoom: true
        },
        {
            title: '🤖 iFLYTEK AI大学堂 · 智能体工程师认证',
            titleEn: '🤖 iFLYTEK AI Academy · Agent Engineer Certification',
            detail: '科大讯飞 AI大学堂官方认证·智能体（Agent）工程师方向，证书编号 XFAGENT197292，有效期至 2028-07-20。',
            image: 'assets/img/cert-2.jpg',
            noZoom: true
        },
        {
            title: '🧠 iFLYTEK AI大学堂 · 微调工程师认证',
            titleEn: '🧠 iFLYTEK AI Academy · Fine-tuning Engineer Certification',
            detail: '科大讯飞 AI大学堂官方认证·大模型微调工程师方向，证书编号 XFTUNING698014，有效期至 2028-07-20。',
            image: 'assets/img/cert-3.jpg',
            noZoom: true
        },
        {
            title: '🚀 阿里达摩院 · 人工智能训练师（高级）',
            titleEn: '🚀 Alibaba DAMO Academy · AI Trainer (Advanced)',
            detail: '阿里达摩院智能客服事业部颁发，证书编号 AIT260719182733000175，2026-07-19 颁发，有效期至 2027-07-19。',
            image: 'assets/img/cert-4.jpg',
            noZoom: true
        },
        {
            title: '⭐ 阿里达摩院 · 人工智能训练师（初级）',
            titleEn: '⭐ Alibaba DAMO Academy · AI Trainer (Beginner)',
            detail: '阿里达摩院智能客服事业部颁发，证书编号 AIT260719171905000189，2026-07-19 颁发，有效期至 2027-07-19。',
            image: 'assets/img/cert-5.jpg',
            noZoom: true
        },
        {
            title: '💡 Datawhale · Prompt Engineer 认证',
            titleEn: '💡 Datawhale · Prompt Engineer Certification',
            detail: '由讯飞星火开放平台与 Datawhale 联合颁发，证书编号 DWPE040050，获 Prompt Engineer 称号，2026-07 颁发。',
            image: 'assets/img/cert-6.jpg',
            noZoom: true
        },
        {
            title: '🐍 AI4S Cup · Python 基础能力认证',
            titleEn: '🐍 AI4S Cup · Python Fundamentals Certification',
            detail: '北京科学智能研究院与深势科技联合颁发，证书编号 AI4SCUP_GB01002019，认证 Python 编程核心能力，2026-07-20 颁发。',
            image: 'assets/img/cert-7.jpg',
            noZoom: true
        },
        {
            title: '🎖️ 华为人工智能初识微认证',
            titleEn: '🎖️ Huawei AI Fundamentals Micro-certification',
            detail: '完成华为人工智能初识微认证（Valid Through: Aug 14, 2028）。',
            image: 'assets/img/cert-8.jpg',
            noZoom: true
        },
        {
            title: '🌍 英语能力证明',
            titleEn: '🌍 English Proficiency',
            detail: '高考英语140分，预计大二考取雅思7.5分以上。'
        }
    ],
    life: {
        quote: '你可以肆意长大，我们都不是满分角色。',
        desc: '海风、椰影、山林、云海——每一次出发，都是给灵魂的一次充电。生活不止眼前的苟且，还有诗和远方。大胆去爱，去生活，去成为更好的自己。',
        gallery: [
            { src: 'assets/img/gallery-1.jpg', caption: '山林 · 肆意生长' },
            { src: 'assets/img/gallery-2.jpg', caption: '云海 · 心向远方' },
            { src: 'assets/img/gallery-3.jpg', caption: '椰影 · 拥抱阳光' }
        ]
    }
};
