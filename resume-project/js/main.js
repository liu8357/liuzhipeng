(function() {
    'use strict';

    // ============ 状态 ============
    let currentLang = 'zh';
    let currentTheme = localStorage.getItem('resume-theme') || 'light';

    // ============ DOM 引用 ============
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const langToggle = document.getElementById('langToggle');
    const printBtn = document.getElementById('printBtn');
    const backToTop = document.getElementById('backToTop');
    const scrollProgress = document.getElementById('scrollProgress');
    const toast = document.getElementById('toast');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const highlightsGrid = document.getElementById('highlightsGrid');
    const experienceTabsContainer = document.getElementById('experienceTabsContainer');
    const projectsTabsContainer = document.getElementById('projectsTabsContainer');
    const skillsGrid = document.getElementById('skillsGrid');
    const educationSection = document.getElementById('educationSection');
    const lifeSection = document.getElementById('lifeSection');
    const heroContactBtns = document.getElementById('heroContactBtns');
    const heroBadges = document.getElementById('heroBadges');
    const heroName = document.getElementById('heroName');
    const heroTagline = document.getElementById('heroTagline');
    const heroSummary = document.getElementById('heroSummary');

    // ============ 工具函数 ============
    function t(zhText, enText) {
        return currentLang === 'zh' ? zhText : enText;
    }

    /**
     * DOM 构建工具：数据驱动创建元素，避免用 innerHTML 拼接内容。
     * 属性约定：
     *   class   → className
     *   text    → textContent（自动转义，防 XSS）
     *   html    → innerHTML（仅用于硬编码的 SVG 图标）
     *   onXxx   → addEventListener（如 onClick / onChange）
     *   style   → 对象 { prop: value }，逐个赋值
     *   其它    → setAttribute
     * 子节点：元素直接追加；字符串转文本节点；null/undefined/false 跳过。
     */
    function el(tag, attrs, ...children) {
        const node = document.createElement(tag);
        if (attrs) {
            Object.keys(attrs).forEach((key) => {
                const val = attrs[key];
                if (val == null) return;
                if (key === 'class') node.className = val;
                else if (key === 'text') node.textContent = val;
                else if (key === 'html') node.innerHTML = val;
                else if (key === 'style') Object.assign(node.style, val);
                else if (key.slice(0, 2) === 'on' && typeof val === 'function') node.addEventListener(key.slice(2), val);
                else node.setAttribute(key, val);
            });
        }
        children.forEach((child) => {
            if (child == null || child === false) return;
            node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
        });
        return node;
    }

    /**
     * 创建 <img>：统一懒加载；错误处理由全局事件委托完成（见文末）。
     */
    function makeImg(src, alt, className) {
        const img = el('img', { src: src, alt: alt, loading: 'lazy' });
        if (className) img.className = className;
        return img;
    }

    // SVG 图标：path 为硬编码常量，使用 innerHTML 是刻意为之（DOM API 构建 SVG 过于冗长）
    function createSVG(innerHTML, viewBox = '0 0 24 24') {
        return `<svg viewBox="${viewBox}" aria-hidden="true">${innerHTML}</svg>`;
    }

    // ============ 主题切换 ============
    function setTheme(theme) {
        currentTheme = theme;
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
        } else {
            html.removeAttribute('data-theme');
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
        }
        localStorage.setItem('resume-theme', theme);
    }

    function toggleTheme() {
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    // ============ 语言切换（仅标签英文翻译，内容保留中文） ============
    function toggleLang() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        renderAll();
        updateLangToggleTitle();
    }

    function updateLangToggleTitle() {
        const label = currentLang === 'zh' ? 'Switch to English' : '切换为中文';
        langToggle.setAttribute('title', label);
        langToggle.setAttribute('aria-label', label);
    }

    // ============ 导航菜单 ============
    function toggleNavMenu() {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    }

    function closeNavMenu() {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    // ============ 复制 ============
    function copyEmail() {
        const email = resume.basics.email;
        if (!email) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => showCopyFeedback(true)).catch(() => fallbackCopy(email));
        } else {
            fallbackCopy(email);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback(true);
        } catch (e) {
            showCopyFeedback(false);
        }
        document.body.removeChild(textarea);
    }

    // ============ Toast 轻提示 ============
    let toastTimer = null;
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    }

    function showCopyFeedback(success) {
        showToast(success ? '✅ 已复制到剪贴板' : '⚠️ 复制失败，请手动复制');
    }

    // ============ 渲染函数（数据驱动，全部用 el()/createElement） ============
    function renderHero() {
        heroName.textContent = t(resume.basics.name, resume.basics.nameEn);
        heroTagline.textContent = t(resume.basics.title, resume.basics.titleEn);
        heroSummary.textContent = t(resume.basics.summary, resume.basics.summaryEn);

        // 技能标签走马灯（两遍用于无缝循环）
        heroBadges.innerHTML = '';
        const badges = t(resume.basics.skills, resume.basics.skillsEn).slice(0, 8);
        const track = el('div', { class: 'marquee-track' });
        for (let copy = 0; copy < 2; copy++) {
            const group = el('div', { class: 'marquee-group' });
            if (copy === 1) group.setAttribute('aria-hidden', 'true');
            badges.forEach((skill) => group.appendChild(el('span', { class: 'badge', text: skill })));
            track.appendChild(group);
        }
        heroBadges.appendChild(track);

        // 联系方式按钮：SVG 图标（硬编码）+ 文字文本节点
        heroContactBtns.innerHTML = '';
        function makeContactBtn(tagName, className, svgPath, label) {
            const btn = el(tagName, { class: className, html: createSVG(svgPath) });
            btn.appendChild(document.createTextNode(' ' + label));
            return btn;
        }
        if (resume.basics.phone) {
            const phoneBtn = makeContactBtn('a', 'btn btn-secondary',
                '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
                '电话');
            phoneBtn.href = 'tel:' + resume.basics.phone;
            heroContactBtns.appendChild(phoneBtn);
        }
        if (resume.basics.wechat) {
            const wechatBtn = makeContactBtn('button', 'btn btn-secondary',
                '<path d="M20 11.5a8 8 0 1 0-15 0c0 2.5 1.2 4.8 3 6.2L7 21l3.2-2.4c.9.2 1.8.3 2.8.3"/><path d="M17 22v-1.3a3.7 3.7 0 0 0-1-2.6 3.7 3.7 0 0 0-2.6-1.1h-1.2"/>',
                '微信');
            wechatBtn.addEventListener('click', () => {
                const text = resume.basics.wechat;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text)
                        .then(() => showToast('✅ 微信号已复制：' + text))
                        .catch(() => fallbackCopy(text));
                } else {
                    fallbackCopy(text);
                }
            });
            heroContactBtns.appendChild(wechatBtn);
        }
        if (resume.basics.email) {
            const emailBtn = makeContactBtn('a', 'btn btn-primary',
                '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6L22 7"/>', '邮件');
            emailBtn.href = 'mailto:' + resume.basics.email;
            heroContactBtns.appendChild(emailBtn);

            const copyEmailBtn = makeContactBtn('button', 'btn btn-ghost',
                '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>', '复制邮箱');
            copyEmailBtn.addEventListener('click', copyEmail);
            heroContactBtns.appendChild(copyEmailBtn);
        }
        if (resume.basics.github) {
            const githubBtn = makeContactBtn('a', 'btn btn-ghost',
                '<path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
                'GitHub');
            githubBtn.href = resume.basics.github;
            githubBtn.target = '_blank';
            githubBtn.rel = 'noopener';
            heroContactBtns.appendChild(githubBtn);
        }
        if (resume.basics.blog) {
            const blogBtn = makeContactBtn('a', 'btn btn-ghost',
                '<path d="M4 12a8 8 0 0 1 16 0"/><path d="M2 12a10 10 0 0 1 20 0"/><circle cx="12" cy="12" r="3"/>', '博客');
            blogBtn.href = resume.basics.blog;
            blogBtn.target = '_blank';
            blogBtn.rel = 'noopener';
            heroContactBtns.appendChild(blogBtn);
        }
        if (heroContactBtns.children.length === 0) {
            heroContactBtns.appendChild(el('span', { class: 'contact-placeholder', text: '联系方式待更新' }));
        }

        document.querySelector('#heroCardPhone .hero-card-value').textContent = resume.basics.phone || '待更新';
        document.querySelector('#heroCardWechat .hero-card-value').textContent = resume.basics.wechat || '待更新';
        document.querySelector('#heroCardLocation .hero-card-value').textContent = t(resume.basics.location, resume.basics.locationEn);
        document.querySelector('#heroCardEdu .hero-card-value').textContent = t(resume.basics.education, resume.basics.educationEn);
        document.querySelector('#heroCardLang .hero-card-value').textContent = t(resume.basics.languages, resume.basics.languagesEn);
    }

    // 解析亮点数字，支持 "58%" / "1000+" / "23项" 等前缀数字格式
    function parseCountUp(text) {
        const match = String(text).match(/^(\d+)(.*)$/);
        if (!match) return null;
        return { value: parseInt(match[1], 10), suffix: match[2] };
    }

    // 数字滚动动画（easeOutCubic 缓动）
    function animateNumber(targetEl, target, suffix) {
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            targetEl.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // 亮点数字进入视口后触发一次滚动动画
    function initCountUp() {
        const counters = document.querySelectorAll('.count-up');
        if (!('IntersectionObserver' in window)) {
            counters.forEach((counter) => { counter.textContent = counter.dataset.value + counter.dataset.suffix; });
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target, parseInt(entry.target.dataset.value, 10), entry.target.dataset.suffix);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        counters.forEach((counter) => {
            // 已进入视口的元素直接显示终值；未进入的从 0 滚动计数，增强阅读趣味
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                counter.textContent = counter.dataset.value + counter.dataset.suffix;
            } else {
                counter.textContent = '0' + counter.dataset.suffix;
                observer.observe(counter);
            }
        });
    }

    function renderHighlights() {
        highlightsGrid.innerHTML = '';
        resume.highlights.forEach((item, index) => {
            const card = el('div', { class: 'highlight-card fade-in' });
            card.style.transitionDelay = (index * 0.08) + 's';

            const numWrap = el('div', { class: 'highlight-number' });
            const parsed = parseCountUp(t(item.number, item.numberEn));
            if (parsed) {
                const counter = el('span', { class: 'count-up' });
                counter.dataset.value = parsed.value;
                counter.dataset.suffix = parsed.suffix;
                counter.textContent = '0' + parsed.suffix;
                numWrap.appendChild(counter);
            } else {
                numWrap.textContent = t(item.number, item.numberEn);
            }
            card.appendChild(numWrap);
            card.appendChild(el('div', { class: 'highlight-desc', text: item.desc }));
            highlightsGrid.appendChild(card);
        });
        initCountUp();
    }

    function renderExperienceTabs() {
        experienceTabsContainer.innerHTML = '';
        const cols = el('div', { class: 'split-columns' });
        resume.experiences.forEach((group, idx) => {
            const col = el('div', { class: 'split-col fade-in' });
            col.style.transitionDelay = (idx * 0.1) + 's';
            col.appendChild(el('h3', { class: 'split-col-title', text: t(group.label, group.labelEn) }));

            const timeline = el('div', { class: 'timeline' });
            group.items.forEach((item) => {
                const bullets = el('ul', null,
                    ...item.bullets.map((b) => el('li', { text: b }))
                );
                const tlItem = el('div', { class: 'timeline-item' },
                    el('div', { class: 'timeline-dot' }),
                    el('div', { class: 'timeline-header' },
                        el('span', { class: 'timeline-role', text: item.role }),
                        el('span', { class: 'timeline-company', text: item.company }),
                        el('span', { class: 'timeline-date', text: item.date })
                    ),
                    el('div', { class: 'timeline-desc' }, item.desc, bullets)
                );
                timeline.appendChild(tlItem);
            });
            col.appendChild(timeline);
            cols.appendChild(col);
        });
        experienceTabsContainer.appendChild(cols);
    }

    function renderProjectTabs() {
        projectsTabsContainer.innerHTML = '';
        const cols = el('div', { class: 'split-columns' });
        resume.projects.forEach((group, idx) => {
            const col = el('div', { class: 'split-col fade-in' });
            col.style.transitionDelay = (idx * 0.1) + 's';
            col.appendChild(el('h3', { class: 'split-col-title', text: t(group.label, group.labelEn) }));

            group.items.forEach((project) => {
                // <article>：项目卡片是独立、可分发的内容块，语义化标签
                const card = el('article', { class: 'project-card' });
                if (project.image) card.appendChild(makeImg(project.image, project.name + ' 封面', 'project-cover'));
                if (project.gallery && project.gallery.length) {
                    const gallery = el('div', { class: 'project-gallery' });
                    project.gallery.forEach((src, i) => gallery.appendChild(makeImg(src, project.name + ' 图片' + (i + 1), '')));
                    card.appendChild(gallery);
                }
                if (project.quote) card.appendChild(el('div', { class: 'project-quote', text: project.quote }));
                card.appendChild(el('div', { class: 'project-name', text: project.name }));
                card.appendChild(el('div', { class: 'project-stack' },
                    ...project.stack.map((s) => el('span', { class: 'badge', text: s }))
                ));
                card.appendChild(el('div', { class: 'project-desc', text: project.desc }));
                card.appendChild(el('div', { class: 'project-result', text: project.result }));
                if (project.link) {
                    const linkWrap = el('div', { class: 'project-links' });
                    const link = el('a', { href: project.link, target: '_blank', rel: 'noopener', html: createSVG('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>') });
                    link.appendChild(document.createTextNode(' 查看项目'));
                    linkWrap.appendChild(link);
                    card.appendChild(linkWrap);
                }
                col.appendChild(card);
            });
            cols.appendChild(col);
        });
        projectsTabsContainer.appendChild(cols);
    }

    function renderSkills() {
        skillsGrid.innerHTML = '';
        resume.skills.forEach((group, index) => {
            const card = el('div', { class: 'skill-group fade-in' });
            card.style.transitionDelay = (index * 0.06) + 's';
            card.appendChild(el('div', { class: 'skill-group-title', text: t(group.category, group.categoryEn) }));

            group.items.forEach((item) => {
                const fill = el('div', { class: 'skill-bar-fill' });
                fill.style.setProperty('--target-width', item.level + '%');
                fill.dataset.level = item.level;
                const bar = el('div', { class: 'skill-bar' },
                    el('div', { class: 'skill-bar-label' },
                        el('span', { text: item.name }),
                        el('span', { class: 'skill-level', text: item.level + '%' })
                    ),
                    el('div', { class: 'skill-bar-track' }, fill)
                );
                card.appendChild(bar);
            });
            skillsGrid.appendChild(card);
        });
        setTimeout(() => {
            document.querySelectorAll('.skill-bar-fill').forEach((fill) => fill.classList.add('animated'));
        }, 200);
    }

    function renderEducation() {
        educationSection.innerHTML = '';
        const edu = resume.education;
        if (edu) {
            const courses = el('div', { class: 'edu-courses' },
                ...edu.courses.map((c) => el('span', { class: 'badge', text: c }))
            );
            // <article>：教育概览也是独立内容块
            const eduCard = el('article', { class: 'edu-card edu-overview fade-in' },
                el('div', { class: 'edu-overview-top' },
                    el('div', { class: 'edu-school', text: t(edu.school, edu.schoolEn) }),
                    el('div', { class: 'edu-degree', text: t(edu.degree, edu.degreeEn) })
                ),
                el('div', { class: 'edu-major', text: t(edu.major, edu.majorEn) }),
                el('div', { class: 'edu-meta' },
                    el('span', { text: '📅 ' + t(edu.period, edu.periodEn) }),
                    el('span', { class: 'edu-note', text: '⭐ ' + t(edu.note, edu.noteEn) })
                ),
                courses
            );
            educationSection.appendChild(eduCard);
        }
        resume.certificates.forEach((cert, index) => {
            // <article>：每张证书是独立内容块
            const certCard = el('article', { class: 'edu-card fade-in' });
            certCard.style.transitionDelay = (index * 0.1) + 's';
            if (cert.image) certCard.classList.add('cert-with-image');
            certCard.appendChild(el('h4', { class: 'edu-card-title', text: t(cert.title, cert.titleEn) }));
            certCard.appendChild(el('div', { class: 'edu-detail', text: cert.detail }));
            if (cert.image) {
                const wrap = el('div', { class: 'no-zoom-wrap' });
                wrap.appendChild(makeImg(cert.image, cert.title, 'cert-image' + (cert.noZoom ? ' no-zoom' : ' zoomable')));
                certCard.appendChild(wrap);
            }
            educationSection.appendChild(certCard);
        });
    }

    function renderFooter() {
        document.getElementById('footerText').textContent = t(
            '© 2026 刘智鹏 · 个人简历 · 最后更新 2026年8月',
            '© 2026 Zhipeng Liu · Resume · Last updated August 2026'
        );
        document.getElementById('footerNote').textContent = t(
            '由纯 HTML/CSS/JS 构建 · 无需外部依赖',
            'Built with pure HTML/CSS/JS · No external dependencies'
        );
    }

    function renderLifeSection() {
        if (!lifeSection) return;
        lifeSection.innerHTML = '';
        const life = resume.life || {};
        if (life.quote) lifeSection.appendChild(el('blockquote', { class: 'life-quote', text: life.quote }));
        if (life.desc) lifeSection.appendChild(el('p', { class: 'life-desc', text: life.desc }));
        if (life.gallery && life.gallery.length) {
            const gallery = el('div', { class: 'life-gallery' });
            life.gallery.forEach((g, i) => {
                const fig = el('figure', { class: 'life-photo fade-in' },
                    makeImg(g.src, '旅行照片' + (i + 1), 'zoomable'),
                    g.caption ? el('figcaption', { text: g.caption }) : null
                );
                gallery.appendChild(fig);
            });
            lifeSection.appendChild(gallery);
        }
    }

    function renderAll() {
        renderHero();
        renderHighlights();
        renderExperienceTabs();
        renderProjectTabs();
        renderSkills();
        renderEducation();
        renderLifeSection();
        renderFooter();
        requestAnimationFrame(() => {
            document.querySelectorAll('.fade-in').forEach((el2) => el2.classList.add('visible'));
        });
    }

    // ============ 滚动效果 ============
    function handleScroll() {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        if (scrollable > 0 && scrollProgress) {
            scrollProgress.style.width = (window.scrollY / scrollable) * 100 + '%';
        }
        // 滚动视差：hero 背景光斑随滚动轻微位移（仅在 hero 尚未滚出视口时更新，避免无谓计算）
        const hero = document.getElementById('hero');
        if (hero && window.scrollY < hero.offsetHeight) {
            hero.style.setProperty('--parallax', window.scrollY + 'px');
        }
        if (window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        if (window.scrollY > 400) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
        document.querySelectorAll('.fade-in:not(.visible)').forEach((el2) => {
            const rect = el2.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) el2.classList.add('visible');
        });
        highlightNavLink();
    }

    function highlightNavLink() {
        const sections = ['hero', 'highlights', 'experience', 'projects', 'skills', 'education', 'life'];
        const navLinks = navMenu.querySelectorAll('a');
        let currentSection = '';
        sections.forEach((id) => {
            const sectionEl = document.getElementById(id);
            if (sectionEl) {
                const rect = sectionEl.getBoundingClientRect();
                if (rect.top <= 120 && rect.bottom >= 100) currentSection = id;
            }
        });
        navLinks.forEach((link) => {
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) link.classList.add('active');
            else link.classList.remove('active');
        });
    }

    // ============ 图片灯箱 ============
    function openLightbox(src, alt) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        if (lightboxImg) lightboxImg.removeAttribute('src');
    }

    function initLightbox() {
        // 事件委托：点击带 .zoomable 类的图片即可放大预览
        document.addEventListener('click', (e) => {
            const img = e.target.closest('img.zoomable');
            if (img && img.getAttribute('src')) {
                openLightbox(img.getAttribute('src'), img.alt || '');
            }
        });
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // ============ 图片加载失败统一处理 ============
    // error 事件不冒泡，需捕获阶段监听；统一隐藏破图，避免影响排版
    function initImageFallback() {
        document.addEventListener('error', (e) => {
            const target = e.target;
            if (target && target.tagName === 'IMG') {
                target.style.display = 'none';
            }
        }, true);
    }

    // ============ 打印 ============
    function handlePrint() { window.print(); }

    // ============ 平滑滚动 ============
    function smoothScrollTo(targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ============ 事件绑定 ============
    themeToggle.addEventListener('click', toggleTheme);
    langToggle.addEventListener('click', toggleLang);
    printBtn.addEventListener('click', handlePrint);
    navToggle.addEventListener('click', toggleNavMenu);
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    navMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            closeNavMenu();
            smoothScrollTo(targetId);
        }
    });
    document.querySelector('.brand').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) closeNavMenu(); });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNavMenu();
            closeLightbox();
        }
    });

    // ============ 初始化 ============
    function init() {
        setTheme(currentTheme);
        renderAll();
        initLightbox();
        initImageFallback();
        updateLangToggleTitle();
        handleScroll();
        requestAnimationFrame(() => {
            document.querySelectorAll('.fade-in').forEach((el2, index) => {
                setTimeout(() => el2.classList.add('visible'), index * 100);
            });
        });
        setTimeout(() => {
            document.querySelectorAll('.skill-bar-fill').forEach((fill) => fill.classList.add('animated'));
        }, 400);
    }

    init();
})();
