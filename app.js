// Vercel auto-deployment pipeline verification


// CMS password protection – hard‑coded for this personal portfolio
const CMS_PASSWORD = "DellN5010";

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hudToggle = document.getElementById('studio-hud-toggle');
    
    let authorized = false;
    if (sessionStorage.getItem('cms_authenticated') === 'true') {
        authorized = true;
    } else if (urlParams.has('edit')) {
        const input = prompt('Enter CMS password:');
        if (input === CMS_PASSWORD) {
            sessionStorage.setItem('cms_authenticated', 'true');
            authorized = true;
        }
    }

    // Auto-enable Studio (edit) mode when authorized via ?edit so edits save reliably
    if (authorized) {
        document.body.classList.add('editor-active');
    }
    
    if (hudToggle) {
        hudToggle.style.setProperty('display', authorized ? 'flex' : 'none', 'important');
    }

    // Helper to extract YouTube video ID from any link style (including Shorts)
    function extractYouTubeId(link) {
        if (!link) return '';
        let cleanId = link.trim();
        if (cleanId.includes('/shorts/')) {
            return cleanId.split('/shorts/')[1].split('?')[0].split('&')[0];
        }
        if (cleanId.includes('youtube.com/watch?v=')) {
            return cleanId.split('v=')[1].split('&')[0];
        }
        if (cleanId.includes('youtu.be/')) {
            return cleanId.split('youtu.be/')[1].split('?')[0].split('&')[0];
        }
        if (cleanId.includes('/embed/')) {
            return cleanId.split('/embed/')[1].split('?')[0].split('&')[0];
        }
        if (cleanId.includes('/live/')) {
            return cleanId.split('/live/')[1].split('?')[0].split('&')[0];
        }
        if (/^[a-zA-Z0-9_-]{11}$/.test(cleanId)) {
            return cleanId;
        }
        return '';
    }
    
    // Particle burst animation for likes
    function createLikeBurst(btn) {
        for (let i = 0; i < 6; i++) {
            const p = document.createElement('div');
            p.className = 'like-particle';
            p.style.setProperty('--x', `${(Math.random() - 0.5) * 80}px`);
            p.style.setProperty('--y', `${-30 - Math.random() * 50}px`);
            btn.appendChild(p);
            setTimeout(() => p.remove(), 800);
        }
    }
    
    // Register GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       STUDIO CREATOR MODE DEFAULT DATABASE
       ========================================================================== */
    const defaultSections = [
        { id: "long", name: "Landscape Videos", aspectRatio: "16-9" },
        { id: "shorts", name: "Shorts & Reels", aspectRatio: "9-16" },
        { id: "graphics", name: "Graphics & Design", aspectRatio: "4-3" }
    ];

    // Default Page Layout order
    const defaultLayoutOrder = ['portfolio', 'about', 'expertise', 'services', 'contact'];

    // Default Education data
    const defaultEducation = [
        {
            id: "edu_1",
            degree: "Bachelor of Engineering in Mechanical",
            loc: "C.K. Pithawala College of Engineering & Technology, Surat (GTU)",
            meta: "2012 - 2015 • CGPA: 7.50"
        },
        {
            id: "edu_2",
            degree: "Diploma in Mechanical Engineering",
            loc: "Government Polytechnic, Valsad (GTU)",
            meta: "2009 - 2012 • CGPA: 8.47"
        }
    ];

    const defaultTimeline = [
        {
            id: "time_1",
            year: "Nov 2025 - Present",
            title: "Senior Video Editor & Motion Designer",
            org: "Code Elevator, Surat",
            desc: "Produce high-converting promotional videos and SaaS software explainers. Coordinated with marketing teams to build automated talking-head AI avatar workflows, decreasing video production turnaround times by 40%."
        },
        {
            id: "time_2",
            year: "Sep 2025 - Nov 2025",
            title: "Digital Studio Manager & Video Editor",
            org: "Gujarat Career Academy, Surat",
            desc: "Managed complete video production cycle for digital ad campaigns. Designed high-CTR YouTube thumbnails, motion graphics sequences, and social media reels that increased click-through rates by 25%."
        },
        {
            id: "time_3",
            year: "Aug 2022 - Jul 2025",
            title: "Lead Video Editor & Content Strategist",
            org: "Yuva Upnishad Foundation Online, Surat",
            desc: "Supervised a content team of writers and designers to publish educational video libraries. Coordinated studio recording operations, live broadcasts, and audio mastering pipelines."
        },
        {
            id: "time_4",
            year: "Feb 2020 - Aug 2022",
            title: "Digital Content & Graphic Designer",
            org: "Yuva Upnishad Publication, Surat",
            desc: "Designed publication layouts, marketing banners, and visual assets. Coordinated printing production cycles and optimized layout review pipelines."
        }
    ];

    const defaultSoftware = [
        // Video Editing Tools
        { id: "soft_1", name: "Adobe Premiere Pro", category: "video", icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg", color: "#9999FF", level: 100 },
        { id: "soft_2", name: "Adobe After Effects", category: "video", icon: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg", color: "#D291FF", level: 100 },
        { id: "soft_3", name: "Filmora", category: "video", icon: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Filmora_logo.svg", color: "#00C4CC", level: 100 },
        { id: "soft_4", name: "DaVinci Resolve", category: "video", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_17_logo.svg", color: "#FF9A00", level: 100 },
        { id: "soft_27", name: "Final Cut Pro", category: "video", icon: "https://upload.wikimedia.org/wikipedia/commons/3/39/Final_Cut_Pro_X_Logo.png", color: "#FF3366", level: 100 },
        { id: "soft_28", name: "CapCut", category: "video", icon: "https://cdn.simpleicons.org/capcut", color: "#00C4CC", level: 100 },

        // Graphics Design
        { id: "soft_5", name: "Adobe Photoshop", category: "graphics", icon: "https://www.vectorlogo.zone/logos/adobe_photoshop/adobe_photoshop-icon.svg", color: "#31A8FF", level: 100 },
        { id: "soft_6", name: "Adobe Illustrator", category: "graphics", icon: "https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg", color: "#FF9A00", level: 100 },
        { id: "soft_7", name: "CorelDRAW", category: "graphics", icon: "https://cdn.simpleicons.org/coreldraw", color: "#FFB900", level: 100 },
        { id: "soft_8", name: "Canva", category: "graphics", icon: "https://www.vectorlogo.zone/logos/canva/canva-icon.svg", color: "#00C4CC", level: 100 },
        { id: "soft_9", name: "Adobe Express", category: "graphics", icon: "https://www.vectorlogo.zone/logos/adobe/adobe-icon.svg", color: "#FF0000", level: 100 },
        { id: "soft_10", name: "Figma", category: "graphics", icon: "https://cdn.simpleicons.org/figma", color: "#F24E1E", level: 100 },

        // AI Tools
        { id: "soft_11", name: "HeyGen AI", category: "ai", icon: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg", color: "#74AA9C", level: 100 },
        { id: "soft_12", name: "ChatGPT", category: "ai", icon: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg", color: "#00A67E", level: 100 },
        { id: "soft_13", name: "Gemini", category: "ai", icon: "https://www.vectorlogo.zone/logos/google_gemini/google_gemini-icon.svg", color: "#1A73E8", level: 100 },
        { id: "soft_14", name: "Grok", category: "ai", icon: "https://cdn.simpleicons.org/x/ffffff", color: "#FFFFFF", level: 100 },
        { id: "soft_15", name: "Google Flow", category: "ai", icon: "https://www.vectorlogo.zone/logos/google/google-icon.svg", color: "#4285F4", level: 100 },
        { id: "soft_16", name: "GenTube", category: "ai", icon: "https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg", color: "#FF0000", level: 100 },
        { id: "soft_17", name: "OpenFM", category: "ai", icon: "https://www.vectorlogo.zone/logos/spotify/spotify-icon.svg", color: "#1DB954", level: 100 },
        { id: "soft_18", name: "Narakeet", category: "ai", icon: "https://www.vectorlogo.zone/logos/audacity/audacity-icon.svg", color: "#0000CC", level: 100 },
        { id: "soft_19", name: "ElevenLabs", category: "ai", icon: "https://cdn.simpleicons.org/elevenlabs", color: "#FEE75C", level: 100 },
        { id: "soft_20", name: "Google Antigravity", category: "ai", icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg", color: "#1A73E8", level: 100 },
        { id: "soft_29", name: "Midjourney", category: "ai", icon: "https://cdn.simpleicons.org/midjourney", color: "#FFFFFF", level: 100 },
        { id: "soft_30", name: "Runway", category: "ai", icon: "https://cdn.simpleicons.org/runway", color: "#FFFFFF", level: 100 },
        { id: "soft_31", name: "Google Veo", category: "ai", icon: "https://www.vectorlogo.zone/logos/google/google-icon.svg", color: "#4285F4", level: 100 },

        // Other Tools
        { id: "soft_21", name: "OBS Studio", category: "other", icon: "https://www.vectorlogo.zone/logos/obsproject/obsproject-icon.svg", color: "#FFFFFF", level: 100 },
        { id: "soft_22", name: "Streamlabs", category: "other", icon: "https://www.vectorlogo.zone/logos/streamlabs/streamlabs-icon.svg", color: "#09D261", level: 100 },
        { id: "soft_23", name: "Microsoft Office", category: "other", icon: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg", color: "#D83B01", level: 100 },
        { id: "soft_24", name: "Blender", category: "other", icon: "https://www.vectorlogo.zone/logos/blender/blender-icon.svg", color: "#E87D0D", level: 100 },
        { id: "soft_25", name: "Audacity", category: "other", icon: "https://www.vectorlogo.zone/logos/audacity/audacity-icon.svg", color: "#0000CC", level: 100 },
        { id: "soft_26", name: "VS Code", category: "other", icon: "https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg", color: "#007ACC", level: 100 }
    ];

    // Default Services data
    const defaultServices = [
        {
            id: "serv_4",
            title: "AI Video & Talking Heads",
            desc: "HeyGen avatars, Runway text-to-video, ElevenLabs voice — complete AI video pipeline for brands and educators.",
            bullets: ["AI Avatar Conversions", "Text-to-Video Pipelines", "Dynamic Voice Synthesis"],
            icon: "cpu"
        },
        {
            id: "serv_1",
            title: "Video Editing",
            desc: "High-retention commercial ads, software demos, and corporate videos with seamless pacing, sound mastering, and clean color grading.",
            bullets: ["Software Demos & Walkthroughs", "Audio & Voiceover Mastering", "Advanced Color Grading (Rec.709)"],
            icon: "video"
        },
        {
            id: "serv_2",
            title: "Motion Graphics",
            desc: "Interactive 2D animated explainers, compensation structure visualizations, kinetic typography, and premium branding assets.",
            bullets: ["2D Explainers & Visualizers", "Kinetic Typography Promos", "Custom Vector Asset Design"],
            icon: "sparkles"
        },
        {
            id: "serv_3",
            title: "Graphic Design",
            desc: "Conversion-optimized social media banners, advertisement layouts, and digital branding assets designed to drive leads and sales.",
            bullets: ["High-CTR Marketing Ads", "Brand Identity Assets", "Social Media Campaign Visuals"],
            icon: "palette"
        }
    ];

    // DB global variables
    let layoutOrder = [];
    let education = [];
    let timeline = [];
    let software = [];
    let services = [];
    let clients = [];

    const defaultProjects = [
        {
            id: "long-1",
            title: "Fxcore Motion Graphics Reel",
            category: "long",
            client: "Fxcore Exchange",
            role: "Lead Motion Designer",
            tools: "After Effects, Illustrator",
            desc: "High-energy motion graphics showreel presenting token utility, interface interactions, and animated branding assets.",
            mediaSource: "upload",
            mediaLink: "./assets/uploads/Fxcore motion graphics reel-01.mp4",
            thumbSource: "auto",
            thumbLink: ""
        },
        {
            id: "long-2",
            title: "Single Leg MLM Software 1080p",
            category: "long",
            client: "Elevate Tech",
            role: "Video Editor & Motion Designer",
            tools: "Premiere Pro, After Effects",
            desc: "A clean software walkthrough explaining matrix distribution plans, compensation systems, and user dashboard features.",
            mediaSource: "upload",
            mediaLink: "./assets/uploads/SINGLE LEG MLM SOFTWARE 1080.mp4",
            thumbSource: "auto",
            thumbLink: ""
        },
        {
            id: "long-3",
            title: "Crypto Exchange 1080p Ad",
            category: "long",
            client: "CoinSwap Ltd",
            role: "Creative Director",
            tools: "Premiere Pro, Photoshop",
            desc: "Promotional video ad for a cryptocurrency trading app showing live trading interfaces and security features.",
            mediaSource: "upload",
            mediaLink: "./assets/uploads/Crypto exchange 1080p for Ad.mp4",
            thumbSource: "auto",
            thumbLink: ""
        },
        {
            id: "long-4",
            title: "MLM Software Explainer",
            category: "long",
            client: "Matrix Software Solutions",
            role: "Video Producer",
            tools: "After Effects, Illustrator",
            desc: "Animated explainer explaining complex level commission systems and network structures for corporate clients.",
            mediaSource: "upload",
            mediaLink: "./assets/uploads/mlm software -1080p.mp4",
            thumbSource: "auto",
            thumbLink: ""
        },
        {
            id: "long-5",
            title: "Crypto Exchange Series - Episode 8",
            category: "long",
            client: "CryptoAcademy",
            role: "Senior Editor",
            tools: "Premiere Pro, Audition",
            desc: "Educational YouTube series episode explaining decentralization, wallet setups, and secure trading practices.",
            mediaSource: "upload",
            mediaLink: "./assets/uploads/Crypto Exchange Series  Episode 8.mp4",
            thumbSource: "auto",
            thumbLink: ""
        },
        {
            id: "long-6",
            title: "Crypto Platform Demo",
            category: "long",
            client: "BlockTrade",
            role: "Video Editor",
            tools: "Premiere Pro, After Effects",
            desc: "Corporate software demo presenting institutional trading tools, portfolio stats, and liquidity metrics.",
            mediaSource: "upload",
            mediaLink: "./assets/uploads/crypto - 1920x1080.mp4",
            thumbSource: "auto",
            thumbLink: ""
        },
        {
            id: "shorts-1",
            title: "Amit Sharma AI Avatar Intro",
            category: "shorts",
            client: "Internal Showcase",
            role: "AI Creative Specialist",
            tools: "HeyGen, ElevenLabs, Premiere Pro",
            desc: "A professional AI-generated talking head video showcasing custom voice training and high-fidelity video pipelines.",
            mediaSource: "link",
            mediaLink: "https://youtube.com/shorts/wnueL2OtrR4",
            thumbSource: "auto",
            thumbLink: "https://img.youtube.com/vi/wnueL2OtrR4/maxresdefault.jpg"
        },
        {
            id: "shorts-2",
            title: "Deep Bhai Reel",
            category: "shorts",
            client: "Personal Brand",
            role: "Reels Editor",
            tools: "CapCut, After Effects",
            desc: "Dynamic vertical short format promo utilizing kinetic typography, sound effects, and fast-paced visual storytelling.",
            mediaSource: "upload",
            mediaLink: "./assets/uploads/deep bhai reel.mp4",
            thumbSource: "auto",
            thumbLink: ""
        },
        {
            id: "shorts-3",
            title: "Intro Reel Promo",
            category: "shorts",
            client: "Gujarat Career Academy",
            role: "Motion Designer",
            tools: "After Effects, Photoshop",
            desc: "Eye-catching intro reel designed as an advertisement campaign to increase click-through rate for online courses.",
            mediaSource: "upload",
            mediaLink: "./assets/uploads/intro.mp4",
            thumbSource: "auto",
            thumbLink: ""
        },
        {
            id: "shorts-4",
            title: "SaaS Mobile Launch Reel",
            category: "shorts",
            client: "SaaS Start",
            role: "Video Editor",
            tools: "Premiere Pro, After Effects",
            desc: "Fast-paced vertical short presenting interface flow and core benefits for a mobile SaaS launch.",
            mediaSource: "link",
            mediaLink: "https://youtube.com/shorts/SVgNhbRH_lc",
            thumbSource: "auto",
            thumbLink: "https://img.youtube.com/vi/SVgNhbRH_lc/maxresdefault.jpg"
        },
        {
            id: "shorts-5",
            title: "Crypto Wallet Features Short",
            category: "shorts",
            client: "WalletX",
            role: "Reels Editor",
            tools: "After Effects, Illustrator",
            desc: "Dynamic social media short detailing mobile wallet security, transaction speeds, and multi-currency support.",
            mediaSource: "link",
            mediaLink: "iG9_Hw-bKms",
            thumbSource: "auto",
            thumbLink: "https://img.youtube.com/vi/iG9_Hw-bKms/maxresdefault.jpg"
        },
        {
            id: "shorts-6",
            title: "Mobile Dashboard Walkthrough",
            category: "shorts",
            client: "Dashboard.io",
            role: "Creative Specialist",
            tools: "Premiere Pro, Canva",
            desc: "Engaging vertical reel showing mobile user dashboard configurations, data analytics, and interface navigation.",
            mediaSource: "link",
            mediaLink: "q_6zS9x9kAw",
            thumbSource: "auto",
            thumbLink: "https://img.youtube.com/vi/q_6zS9x9kAw/maxresdefault.jpg"
        }
    ];

    let sections = [];
    let projects = [];
    let copiedCard = null;
    let isStudioUnlocked = false; // password unlock status

    const gridsContainer = document.getElementById('portfolio-grids-container');
    const portfolioFilters = document.getElementById('portfolio-filters');

    // Load from localStorage or default
    function initDatabase() {
        // Resolve Firebase URL early (used for cloud pull below)
        const DEFAULT_FIREBASE_URL = 'https://amit-portfolio-f0d71-default-rtdb.firebaseio.com';
        let firebaseDbUrl = localStorage.getItem('amit_portfolio_firebase_url') || DEFAULT_FIREBASE_URL;
        if (firebaseDbUrl && firebaseDbUrl.endsWith('/')) {
            firebaseDbUrl = firebaseDbUrl.slice(0, -1);
        }

        // Automatic DB version upgrade migration (forces cache clear for new defaults)
        const DB_VERSION_KEY = 'amit_portfolio_db_version';
        const CURRENT_DB_VERSION = '18';
        const storedVersion = localStorage.getItem(DB_VERSION_KEY);
        if (storedVersion !== CURRENT_DB_VERSION) {
            localStorage.removeItem('amit_portfolio_projects');
            localStorage.removeItem('amit_portfolio_sections');
            localStorage.removeItem('amit_portfolio_showreel');
            localStorage.removeItem('amit_portfolio_layout_order');
            localStorage.removeItem('amit_portfolio_software');
            localStorage.removeItem('amit_portfolio_deleted_software');
            localStorage.removeItem('amit_portfolio_theme');
            localStorage.removeItem('amit_portfolio_services');
            localStorage.removeItem('amit_portfolio_cms_text');
            localStorage.removeItem('amit_portfolio_education');
            localStorage.removeItem('amit_portfolio_timeline');
            localStorage.removeItem('amit_portfolio_clients');
            localStorage.removeItem('amit_portfolio_last_updated');
            localStorage.setItem(DB_VERSION_KEY, CURRENT_DB_VERSION);
            console.log("Database version upgrade detected. LocalStorage cache cleared.");
            location.reload();
            return;
        }

        // Load Sections list
        const storedSections = localStorage.getItem('amit_portfolio_sections');
        if (storedSections) {
            try {
                sections = JSON.parse(storedSections);
            } catch(e) {
                sections = [...defaultSections];
            }
        } else {
            sections = [...defaultSections];
        }

        // Auto-migrate sections name if old "Motion Graphics" exists in database
        let needsMigrationSave = false;
        sections.forEach(sec => {
            if (sec.id === 'long' && sec.name === 'Motion Graphics') {
                sec.name = 'Landscape Videos';
                needsMigrationSave = true;
            }
        });
        if (needsMigrationSave || !storedSections) {
            localStorage.setItem('amit_portfolio_sections', JSON.stringify(sections));
        }

        // Seed from baked data into localStorage (do NOT push to cloud on load;
        // cloud pull below is the source of truth and edits push explicitly)
        const bakedData = (typeof window.CLOUD_DEFAULT_PROJECTS !== 'undefined' && Array.isArray(window.CLOUD_DEFAULT_PROJECTS)) ? window.CLOUD_DEFAULT_PROJECTS : defaultProjects;
        projects = JSON.parse(JSON.stringify(bakedData));
        localStorage.setItem('amit_portfolio_projects', JSON.stringify(projects));

        // Pull live cloud data so changes made in edit mode appear for all visitors
        if (firebaseDbUrl) {
            fetchFirebaseCloudData(firebaseDbUrl);
        }

        // Projects loaded. Ready.

        // Auto-migrate showreel default thumbnail to new compelling cover image
        const storedShowreel = localStorage.getItem('amit_portfolio_showreel');
        if (storedShowreel) {
            try {
                const config = JSON.parse(storedShowreel);
                if (config.thumbLink === './assets/showreel.png') {
                    config.thumbLink = './assets/showreel_cover_compelling.png';
                    localStorage.setItem('amit_portfolio_showreel', JSON.stringify(config));
                }
            } catch(e) {}
        }
        // Load layout order
        const storedLayout = localStorage.getItem('amit_portfolio_layout_order');
        if (storedLayout) {
            try { layoutOrder = JSON.parse(storedLayout); } catch(e) { layoutOrder = [...defaultLayoutOrder]; }
        } else {
            layoutOrder = [...defaultLayoutOrder];
            localStorage.setItem('amit_portfolio_layout_order', JSON.stringify(layoutOrder));
        }

        // Load education
        const storedEdu = localStorage.getItem('amit_portfolio_education');
        if (storedEdu) {
            try { education = JSON.parse(storedEdu); } catch(e) { education = [...defaultEducation]; }
        } else {
            education = [...defaultEducation];
            localStorage.setItem('amit_portfolio_education', JSON.stringify(education));
        }

        // Load timeline
        const storedTimeline = localStorage.getItem('amit_portfolio_timeline');
        if (storedTimeline) {
            try { timeline = JSON.parse(storedTimeline); } catch(e) { timeline = [...defaultTimeline]; }
        } else {
            timeline = [...defaultTimeline];
            localStorage.setItem('amit_portfolio_timeline', JSON.stringify(timeline));
        }

        // Load software
        const storedSoft = localStorage.getItem('amit_portfolio_software');
        let needsSoftSave = false;
        
        if (storedSoft) {
            try { 
                software = JSON.parse(storedSoft); 
                
                // 1. Ensure all items have a level property
                software.forEach(item => {
                    if (item.level === undefined) {
                        const defItem = defaultSoftware.find(x => x.id === item.id);
                        item.level = defItem ? defItem.level : 80;
                        needsSoftSave = true;
                    }
                    
                    // 2. Ensure all items have correct category
                    if (!item.category) {
                        const defItem = defaultSoftware.find(x => x.id === item.id);
                        item.category = defItem ? defItem.category : "other";
                        needsSoftSave = true;
                    }

                    // Migrate OBS Studio color to white
                    if (item.name === "OBS Studio" && item.color !== "#FFFFFF") {
                        item.color = "#FFFFFF";
                        needsSoftSave = true;
                    }
                    
                    // 3. Fix corrupted simpleicons URLs to Vector Logo Zone / Wikimedia
                    if (item.icon && item.icon.includes('cdn.simpleicons.org') && 
                        !item.icon.includes('figma') && !item.icon.includes('coreldraw') && !item.icon.includes('elevenlabs')) {
                        const defItem = defaultSoftware.find(x => x.id === item.id);
                        if (defItem) {
                            item.icon = defItem.icon;
                            needsSoftSave = true;
                        }
                    }
                });
                
                // 4. Ensure new default tools (like Final Cut Pro) exist, unless they were explicitly deleted by the user
                const deletedTools = JSON.parse(localStorage.getItem('amit_portfolio_deleted_software') || '[]');
                defaultSoftware.forEach(defItem => {
                    if (deletedTools.includes(defItem.id)) return; // skip if deleted
                    const exists = software.some(x => x.id === defItem.id || x.name.toLowerCase() === defItem.name.toLowerCase());
                    if (!exists) {
                        software.push(defItem);
                        needsSoftSave = true;
                    }
                });
                
            } catch(e) { 
                software = [...defaultSoftware]; 
                needsSoftSave = true;
            }
        } else {
            software = [...defaultSoftware];
            needsSoftSave = true;
        }
        
        if (needsSoftSave) {
            localStorage.setItem('amit_portfolio_software', JSON.stringify(software));
        }

        // Load services
        const storedServ = localStorage.getItem('amit_portfolio_services');
        if (storedServ) {
            try { 
                services = JSON.parse(storedServ); 
                services.forEach(s => delete s.highlight);
            } catch(e) { 
                services = [...defaultServices]; 
            }
        } else {
            services = [...defaultServices];
            localStorage.setItem('amit_portfolio_services', JSON.stringify(services));
        }
        
        // Load clients
        const defaultClients = ["Code Elevator", "MLM World", "Gujarat Career Academy", "Yuva Upnishad Foundation"];
        const storedClients = localStorage.getItem('amit_portfolio_clients');
        if (storedClients) {
            try { clients = JSON.parse(storedClients); } catch(e) { clients = [...defaultClients]; }
        } else {
            clients = [...defaultClients];
            localStorage.setItem('amit_portfolio_clients', JSON.stringify(clients));
        }
        
        renderShowreel();
        reorderDOMSections();
        renderDynamicEducation();
        renderDynamicTimeline();
        renderDynamicSoftware();
        renderDynamicServices();
        renderClientsStrip();

        // Set default password if not exists
        if (!localStorage.getItem('amit_portfolio_password')) {
            localStorage.setItem('amit_portfolio_password', 'admin123');
        }

        // Initialize Firebase Cloud sync configurations
        const firebaseInput = document.getElementById('console-firebase-url');
        if (firebaseInput) {
            firebaseInput.value = firebaseDbUrl;
        }
        if (firebaseDbUrl) {
            fetchFirebaseCloudData(firebaseDbUrl);
        }
    }

    async function fetchFirebaseCloudData(url) {
        try {
            console.log("Checking Firebase cloud database for updates...");
            
            const localTimestamp = parseInt(localStorage.getItem('amit_portfolio_last_updated') || '0');
            let cloudTimestamp = 0;
            try {
                const tsRes = await fetch(`${url}/last_updated.json`);
                if (tsRes.ok) {
                    const parsedTs = await tsRes.json();
                    cloudTimestamp = parsedTs ? parseInt(parsedTs) : 0;
                }
            } catch (tsErr) {
                console.warn("Could not fetch cloud timestamp:", tsErr.message);
            }
            
            console.log(`Sync status: local=${localTimestamp}, cloud=${cloudTimestamp}`);
            
            // NOTE: Cloud is the single source of truth. We always pull cloud data
            // on load so every visitor sees the latest edits. Edits are pushed
            // explicitly via saveDatabase() on user action.
            
            // Firebase stores arrays as objects {0:val,1:val,...} — convert back
            function firebaseToArray(data) {
                if (!data) return null;
                if (Array.isArray(data)) return data;
                if (typeof data === 'object') {
                    return Object.values(data).filter(v => v !== null && v !== undefined);
                }
                return null;
            }

            const projRes = await fetch(`${url}/projects.json`);
            if (!projRes.ok) return;
            const cloudProjects = firebaseToArray(await projRes.json());
            
            const secRes = await fetch(`${url}/sections.json`);
            if (!secRes.ok) return;
            const cloudSections = firebaseToArray(await secRes.json());

            const layRes = await fetch(`${url}/layout_order.json`);
            let cloudLayout = null;
            if (layRes.ok) {
                cloudLayout = firebaseToArray(await layRes.json());
            }
            
            let hasChanges = false;
            
            if (cloudProjects && Array.isArray(cloudProjects)) {
                // Filter out any corrupt projects with temporary browser blob URLs
                let cleanCloudProjects = cloudProjects.filter(p => {
                    const isCorruptMedia = p.mediaLink && p.mediaLink.startsWith('blob:');
                    const isCorruptThumb = p.thumbLink && p.thumbLink.startsWith('blob:');
                    return !isCorruptMedia && !isCorruptThumb;
                });
                
                if (cleanCloudProjects.length < cloudProjects.length) {
                    projects = cleanCloudProjects;
                    localStorage.setItem('amit_portfolio_projects', JSON.stringify(projects));
                    pushToCloud('projects', projects, true);
                    hasChanges = true;
                } else if (JSON.stringify(projects) !== JSON.stringify(cleanCloudProjects)) {
                    projects = cleanCloudProjects;
                    localStorage.setItem('amit_portfolio_projects', JSON.stringify(projects));
                    hasChanges = true;
                }
            }
            
            if (cloudSections && Array.isArray(cloudSections)) {
                if (JSON.stringify(sections) !== JSON.stringify(cloudSections)) {
                    sections = cloudSections;
                    localStorage.setItem('amit_portfolio_sections', JSON.stringify(sections));
                    hasChanges = true;
                }
            }

            if (cloudLayout && Array.isArray(cloudLayout)) {
                if (JSON.stringify(layoutOrder) !== JSON.stringify(cloudLayout)) {
                    layoutOrder = cloudLayout;
                    localStorage.setItem('amit_portfolio_layout_order', JSON.stringify(layoutOrder));
                    hasChanges = true;
                }
            }
            
            const themeRes = await fetch(`${url}/theme.json`);
            if (themeRes.ok) {
                const cloudTheme = await themeRes.json();
                if (cloudTheme && typeof cloudTheme === 'string') {
                    if (localStorage.getItem('amit_portfolio_theme') !== cloudTheme) {
                        localStorage.setItem('amit_portfolio_theme', cloudTheme);
                        if (typeof applyTheme === 'function') {
                            applyTheme(cloudTheme);
                        }
                    }
                }
            }

            const softRes = await fetch(`${url}/software.json`);
            if (softRes.ok) {
                const cloudSoftware = firebaseToArray(await softRes.json());
                if (cloudSoftware && Array.isArray(cloudSoftware)) {
                    if (JSON.stringify(software) !== JSON.stringify(cloudSoftware)) {
                        software = cloudSoftware;
                        localStorage.setItem('amit_portfolio_software', JSON.stringify(software));
                        hasChanges = true;
                    }
                }
            }

            const customColorsRes = await fetch(`${url}/custom_colors.json`);
            if (customColorsRes.ok) {
                const cloudColors = await customColorsRes.json();
                const localColorsStr = localStorage.getItem('amit_portfolio_custom_colors');
                if (cloudColors) {
                    if (localColorsStr !== JSON.stringify(cloudColors)) {
                        localStorage.setItem('amit_portfolio_custom_colors', JSON.stringify(cloudColors));
                        if (typeof applyCustomColors === 'function') {
                            applyCustomColors(cloudColors);
                        }
                    }
                } else if (localColorsStr) {
                    localStorage.removeItem('amit_portfolio_custom_colors');
                    window.location.reload();
                }
            }

            const clientsRes = await fetch(`${url}/clients.json`);
            if (clientsRes.ok) {
                const cloudClients = await clientsRes.json();
                if (cloudClients && Array.isArray(cloudClients)) {
                    if (JSON.stringify(clients) !== JSON.stringify(cloudClients)) {
                        clients = cloudClients;
                        localStorage.setItem('amit_portfolio_clients', JSON.stringify(clients));
                        if (typeof renderClientsStrip === 'function') {
                            renderClientsStrip();
                        }
                    }
                }
            }
             if (hasChanges) {
                renderProjects();
                reorderDOMSections();
                if (typeof renderDynamicSoftware === 'function') {
                    renderDynamicSoftware();
                }
                appendConsoleLog("> Showcase database synchronized with cloud updates.");
            } else {
                console.log("Local database is up-to-date with cloud.");
            }
            
            // Save the synchronized cloud timestamp locally
            if (cloudTimestamp > 0) {
                localStorage.setItem('amit_portfolio_last_updated', cloudTimestamp);
            }
        } catch (err) {
            console.warn(`Cloud sync warning: ${err.message}`);
        }
    }

    let activeSyncsCount = 0;
    let syncErrorOccurred = false;

    function setCmsSyncStatus(status, errorMsg = '') {
        const badge = document.getElementById('cms-cloud-sync-status');
        if (!badge) return;
        
        const dot = badge.querySelector('.sync-status-dot');
        const text = badge.querySelector('.sync-status-text');
        
        badge.className = `cms-sync-status-badge ${status}`;
        
        if (status === 'syncing') {
            text.textContent = 'Syncing...';
            badge.style.cursor = 'default';
            badge.title = 'Uploading your changes to Firebase Cloud Database...';
        } else if (status === 'synced') {
            text.textContent = 'Saved';
            badge.style.cursor = 'default';
            badge.title = 'All changes successfully synchronized and saved to cloud.';
        } else if (status === 'failed') {
            text.textContent = 'Sync Failed';
            badge.style.cursor = 'pointer';
            badge.title = `Error: ${errorMsg}. Click to manually retry syncing all data.`;
            
            badge.onclick = (e) => {
                e.stopPropagation();
                manuallyRetrySync();
            };
        }
    }
    
    function showCmsToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `cms-toast ${type}`;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '8px';
        toast.style.background = type === 'error' ? 'rgba(239, 68, 68, 0.95)' : (type === 'info' ? 'rgba(59, 130, 246, 0.95)' : 'rgba(16, 185, 129, 0.95)');
        toast.style.color = '#fff';
        toast.style.fontSize = '0.8rem';
        toast.style.fontWeight = '600';
        toast.style.zIndex = '99999';
        toast.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.3)';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '8px';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', type === 'error' ? 'alert-circle' : (type === 'info' ? 'info' : 'check-circle'));
        toast.appendChild(icon);
        
        const text = document.createElement('span');
        text.textContent = message;
        toast.appendChild(text);
        
        document.body.appendChild(toast);
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        toast.offsetHeight; // force reflow
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3500);
    }

    function pushToCloudPromise(node, data) {
        return new Promise((resolve, reject) => {
            const DEFAULT_FIREBASE_URL = 'https://amit-portfolio-f0d71-default-rtdb.firebaseio.com';
            let url = localStorage.getItem('amit_portfolio_firebase_url') || DEFAULT_FIREBASE_URL;
            if (!url) {
                reject(new Error("No database URL configured"));
                return;
            }
            if (url.endsWith('/')) url = url.slice(0, -1);
            
            fetch(`${url}/${node}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => {
                if (res.ok) {
                    resolve();
                } else {
                    reject(new Error(`HTTP ${res.status}`));
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    function manuallyRetrySync() {
        setCmsSyncStatus('syncing');
        showCmsToast("Retrying cloud synchronization...", "info");
        Promise.all([
            pushToCloudPromise('projects', projects),
            pushToCloudPromise('sections', sections),
            pushToCloudPromise('layout_order', layoutOrder),
            pushToCloudPromise('software', software),
            pushToCloudPromise('last_updated', parseInt(localStorage.getItem('amit_portfolio_last_updated') || '0'))
        ]).then(() => {
            syncErrorOccurred = false;
            setCmsSyncStatus('synced');
            showCmsToast("Showcase database synced to cloud!", "success");
            appendConsoleLog("> Manual retry: Cloud sync successful.");
        }).catch(err => {
            setCmsSyncStatus('failed', err.message);
            showCmsToast(`Sync failed: ${err.message}`, "error");
            appendConsoleLog(`> Manual retry: Cloud sync failed: ${err.message}`);
        });
    }

    function pushToCloud(node, data, bypassCheck = false) {
        if (!bypassCheck && !document.body.classList.contains('editor-active')) return Promise.resolve();

        activeSyncsCount++;
        setCmsSyncStatus('syncing');

        return pushToCloudPromise(node, data)
            .then(() => {
                activeSyncsCount--;
                if (activeSyncsCount <= 0) {
                    activeSyncsCount = 0;
                    if (!syncErrorOccurred) setCmsSyncStatus('synced');
                }
                appendConsoleLog(`> Cloud sync successful for [${node}].`);
            })
            .catch(err => {
                activeSyncsCount--;
                syncErrorOccurred = true;
                setCmsSyncStatus('failed', err.message);
                appendConsoleLog(`> Cloud auto-save failed for [${node}]: ${err.message}`);
                showCmsToast(`Cloud sync failed: ${err.message}`, 'error');
                throw err;
            });
    }

    function updateTimestampAndSync(localWriteSuccess = true) {
        const now = Date.now();
        try {
            if (localWriteSuccess) {
                localStorage.setItem('amit_portfolio_last_updated', now);
            } else {
                localStorage.setItem('amit_portfolio_last_updated', '0');
            }
        } catch (e) {
            console.warn("localStorage last_updated write failed:", e.message);
        }
        return pushToCloud('last_updated', now);
    }

    function saveSections() {
        let success = true;
        try {
            localStorage.setItem('amit_portfolio_sections', JSON.stringify(sections));
        } catch (e) {
            console.warn("localStorage sections write failed:", e.message);
            success = false;
        }
        return Promise.all([
            pushToCloud('sections', sections, true),
            updateTimestampAndSync(success)
        ]);
    }

    function saveDatabase() {
        let success = true;
        try {
            localStorage.setItem('amit_portfolio_projects', JSON.stringify(projects));
        } catch (e) {
            console.warn("localStorage projects write failed:", e.message);
            success = false;
        }
        return Promise.all([
            pushToCloud('projects', projects, true),
            updateTimestampAndSync(success)
        ]);
    }

    function saveLayoutOrder() {
        let success = true;
        try {
            localStorage.setItem('amit_portfolio_layout_order', JSON.stringify(layoutOrder));
        } catch (e) {
            console.warn("localStorage layout_order write failed:", e.message);
            success = false;
        }
        return Promise.all([
            pushToCloud('layout_order', layoutOrder, true),
            updateTimestampAndSync(success)
        ]);
    }
    function saveEducation() {
        let success = true;
        try {
            localStorage.setItem('amit_portfolio_education', JSON.stringify(education));
        } catch (e) {
            console.warn("localStorage education write failed:", e.message);
            success = false;
        }
        return updateTimestampAndSync(success);
    }
    function saveTimeline() {
        let success = true;
        try {
            localStorage.setItem('amit_portfolio_timeline', JSON.stringify(timeline));
        } catch (e) {
            console.warn("localStorage timeline write failed:", e.message);
            success = false;
        }
        return updateTimestampAndSync(success);
    }
    function saveSoftware() {
        let success = true;
        try {
            localStorage.setItem('amit_portfolio_software', JSON.stringify(software));
        } catch (e) {
            console.warn("localStorage software write failed:", e.message);
            success = false;
        }
        return Promise.all([
            pushToCloud('software', software, true),
            updateTimestampAndSync(success)
        ]);
    }
    function saveServices() {
        let success = true;
        try {
            localStorage.setItem('amit_portfolio_services', JSON.stringify(services));
        } catch (e) {
            console.warn("localStorage services write failed:", e.message);
            success = false;
        }
        return updateTimestampAndSync(success);
    }

    function moveProject(projectId, direction) {
        const index = projects.findIndex(p => p.id === projectId);
        if (index === -1) return;
        const project = projects[index];
        const category = project.category;
        
        const catProjects = projects.filter(p => p.category === category);
        const catIndex = catProjects.findIndex(p => p.id === projectId);
        
        if (direction === 'prev' && catIndex > 0) {
            const prevProject = catProjects[catIndex - 1];
            const prevFullIndex = projects.findIndex(p => p.id === prevProject.id);
            
            projects[index] = prevProject;
            projects[prevFullIndex] = project;
            
            saveDatabase();
            renderProjects();
            appendConsoleLog(`> Card "${project.title}" shifted left.`);
        } else if (direction === 'next' && catIndex < catProjects.length - 1) {
            const nextProject = catProjects[catIndex + 1];
            const nextFullIndex = projects.findIndex(p => p.id === nextProject.id);
            
            projects[index] = nextProject;
            projects[nextFullIndex] = project;
            
            saveDatabase();
            renderProjects();
            appendConsoleLog(`> Card "${project.title}" shifted right.`);
        }
    }

    function copyProject(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        copiedCard = JSON.parse(JSON.stringify(project));
        document.body.classList.add('has-copied-card');
        renderProjects();
        appendConsoleLog(`> Copied record to HUD clipboard: "${project.title}"`);
    }

    function pasteProject(category, targetCatIndex) {
        if (!copiedCard) return;
        
        const newProj = JSON.parse(JSON.stringify(copiedCard));
        newProj.id = "proj_" + Date.now();
        newProj.category = category;
        
        const otherProjects = projects.filter(p => p.category !== category);
        const catProjects = projects.filter(p => p.category === category);
        
        catProjects.splice(targetCatIndex, 0, newProj);
        projects = [...otherProjects, ...catProjects];
        
        copiedCard = null;
        document.body.classList.remove('has-copied-card');
        saveDatabase();
        renderProjects();
        appendConsoleLog(`> Duplicate pasted at index ${targetCatIndex} in ${category.toUpperCase()}.`);
    }

    function deleteProject(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        
        projects = projects.filter(p => p.id !== projectId);
        saveDatabase();
        renderProjects();
        appendConsoleLog(`> Record deleted: "${project.title}"`);
    }

    function addSection(name, aspectRatio) {
        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim();
        if (!id) return;
        
        if (sections.some(s => s.id === id)) {
            alert("A section with this name or ID already exists!");
            return;
        }
        
        sections.push({ id, name, aspectRatio });
        saveSections();
        renderProjects();
        appendConsoleLog(`> Created section: "${name}" [${aspectRatio}]`);
    }

    function deleteSection(sectionId) {
        if (sections.length <= 1) {
            alert("You must keep at least one category section!");
            return;
        }
        
        const section = sections.find(s => s.id === sectionId);
        if (!section) return;
        
        const catProjects = projects.filter(p => p.category === sectionId);
        if (catProjects.length > 0) {
            const targetSection = sections.find(s => s.id !== sectionId);
            if (confirm(`Section "${section.name}" contains ${catProjects.length} projects. Re-assign them to "${targetSection.name}"?`)) {
                projects.forEach(p => {
                    if (p.category === sectionId) {
                        p.category = targetSection.id;
                    }
                });
                saveDatabase();
            } else {
                return;
            }
        }
        
        sections = sections.filter(s => s.id !== sectionId);
        saveSections();
        renderProjects();
        appendConsoleLog(`> Deleted section: "${section.name}".`);
    }

    function openProjectModalForEdit(projectId) {
        timelineCapturedDataUrl = '';
        const timelineVideo = document.getElementById('timeline-picker-video');
        if (timelineVideo) timelineVideo.src = '';
        
        let project;
        const modalEl = document.getElementById('project-editor-modal');
        
        if (projectId === 'showreel') {
            // Load showreel config from database
            const stored = localStorage.getItem('amit_portfolio_showreel');
            let config = {
                title: "Featured Software Demos & explainers",
                mediaSource: "link",
                mediaLink: "u6KTFBKMP8M",
                thumbLink: "./assets/showreel_cover_compelling.png",
                thumbSource: "auto"
            };
            if (stored) {
                try {
                    config = JSON.parse(stored);
                } catch(e) {}
            }
            project = {
                id: "showreel",
                title: config.title,
                category: "long",
                desc: "",
                client: "",
                year: "",
                mediaSource: config.mediaSource,
                mediaLink: config.mediaLink,
                thumbSource: config.thumbSource || "auto",
                thumbLink: config.thumbLink
            };
            modalEl.classList.add('showreel-mode');
        } else {
            project = projects.find(p => p.id === projectId);
            if (!project) return;
            modalEl.classList.remove('showreel-mode');
        }
        
        document.getElementById('modal-title-text').textContent = projectId === 'showreel' ? "Edit Featured Showreel" : "Edit Showcase Settings";
        document.getElementById('edit-project-id').value = project.id;
        document.getElementById('modal-project-title').value = project.title;
        document.getElementById('modal-project-category').value = project.category;
        
        document.getElementById('modal-media-source').value = project.mediaSource || 'link';
        document.getElementById('modal-media-link').value = project.mediaSource === 'link' ? project.mediaLink : '';
        
        document.getElementById('modal-thumb-source').value = project.thumbSource || 'auto';
        document.getElementById('modal-thumb-link').value = project.thumbSource === 'auto' ? project.thumbLink : '';
        
        toggleMediaSourceFields();
        toggleThumbSourceFields();
        
        document.getElementById('media-file-status').textContent = project.mediaSource === 'upload' ? `Current: ${project.mediaLink.split('/').pop()}` : 'No file chosen';
        document.getElementById('thumb-file-status').textContent = project.thumbSource === 'upload' ? `Current: ${project.thumbLink.split('/').pop()}` : 'No file chosen';
        
        modalEl.classList.add('active');
    }

    function openProjectModal(category) {
        timelineCapturedDataUrl = '';
        const timelineVideo = document.getElementById('timeline-picker-video');
        if (timelineVideo) timelineVideo.src = '';
        
        const modalEl = document.getElementById('project-editor-modal');
        modalEl.classList.remove('showreel-mode');
        
        document.getElementById('modal-title-text').textContent = "Add New Showcase Card";
        document.getElementById('edit-project-id').value = "";
        document.getElementById('project-modal-form').reset();
        
        document.getElementById('modal-project-category').value = category || 'long';
        document.getElementById('modal-media-source').value = 'link';
        document.getElementById('modal-thumb-source').value = 'auto';
        
        toggleMediaSourceFields();
        toggleThumbSourceFields();
        
        document.getElementById('media-file-status').textContent = 'No file chosen';
        document.getElementById('thumb-file-status').textContent = 'No file chosen';
        
        modalEl.classList.add('active');
    }

    function toggleMediaSourceFields() {
        const source = document.getElementById('modal-media-source').value;
        document.getElementById('media-link-container').classList.toggle('hidden', source !== 'link');
        document.getElementById('media-upload-container').classList.toggle('hidden', source !== 'upload');
    }
    
    function toggleThumbSourceFields() {
        const source = document.getElementById('modal-thumb-source').value;
        document.getElementById('thumb-link-container').classList.toggle('hidden', source !== 'auto');
        document.getElementById('thumb-upload-container').classList.toggle('hidden', source !== 'upload');
        
        const timelineContainer = document.getElementById('thumb-timeline-container');
        timelineContainer.classList.toggle('hidden', source !== 'timeline');
        
        if (source === 'timeline') {
            loadTimelineVideo();
        }
    }

    function renderGridCategory(gridEl, category, isEditorActive, aspectRatio) {
        gridEl.innerHTML = '';
        const catProjects = projects.filter(p => p.category === category);
        
        catProjects.forEach((proj, idx) => {
            if (isEditorActive && copiedCard) {
                const pasteSlot = document.createElement('div');
                pasteSlot.className = 'paste-placeholder-card';
                pasteSlot.innerHTML = `<i data-lucide="clipboard"></i> Paste Here`;
                pasteSlot.addEventListener('click', () => {
                    pasteProject(category, idx);
                });
                gridEl.appendChild(pasteSlot);
            }
            
            const itemEl = document.createElement('div');
            itemEl.className = 'portfolio-item show-item';
            itemEl.setAttribute('data-category', category);
            itemEl.setAttribute('data-project-id', proj.id);
            itemEl.id = `project-${category}-${proj.id}`;
            
            const aspectClass = `aspect-${aspectRatio}`;
            let viewLabel = 'STREAM SHOWCASE';
            let iconName = 'play';
            if (aspectRatio === '9-16') {
                viewLabel = 'STREAM SHORT';
            } else if (aspectRatio === '4-3' || aspectRatio === '1-1') {
                viewLabel = 'VIEW CREATION';
                iconName = 'maximize-2';
            }
            
            // Like button setup for video items
            let likeButtonHTML = '';
            if (category === 'long' || category === 'shorts') {
                const likedKey = `amit_portfolio_liked_${proj.id}`;
                const isLiked = localStorage.getItem(likedKey) === 'true';
                const likeCountKey = `amit_portfolio_likes_${proj.id}`;
                let likeCount = parseInt(localStorage.getItem(likeCountKey) || '0');
                if (likeCount === 0) {
                    likeCount = Math.floor(Math.random() * 70) + 15;
                    localStorage.setItem(likeCountKey, likeCount);
                }
                
                likeButtonHTML = `
                    <div class="project-like-container" data-project-id="${proj.id}">
                        <button type="button" class="project-like-btn ${isLiked ? 'liked' : ''}">
                            <i data-lucide="heart" class="like-heart-icon"></i>
                            <span class="like-count">${likeCount}</span>
                        </button>
                    </div>
                `;
            }

            const fallbackThumb = './assets/showreel_cover_compelling.png';
            let thumbImgSrc = proj.category === 'graphics' ? proj.mediaLink : proj.thumbLink;
            if (!thumbImgSrc || thumbImgSrc.trim() === '') {
                thumbImgSrc = fallbackThumb;
            }
            itemEl.innerHTML = `
                <div class="project-card video-trigger-card" data-project-id="${proj.id}">
                    <!-- Multi-select delete checkbox overlay (direct child of card, high z-index) -->
                    <div class="cms-checkbox-wrapper" style="display: none; pointer-events: auto;">
                        <input type="checkbox" class="cms-delete-checkbox" data-id="${proj.id}" style="width: 20px; height: 20px; cursor: pointer; accent-color: var(--accent-cyan);" />
                    </div>
                    <div class="project-media ${aspectClass}">
                        <img src="${normalizeMediaPath(thumbImgSrc)}" alt="${proj.title}" onerror="this.src='./assets/showreel_cover_compelling.png'">
                        <canvas class="preview-canvas"></canvas>
                        <div class="video-watermark">Amit Sharma</div>
                        <div class="project-overlay-glow"></div>
                        <div class="project-view-badge">
                            <i data-lucide="${iconName}" class="play-icon"></i>
                            <span>${viewLabel}</span>
                        </div>
                    </div>
                    <div class="project-details" ${category === 'shorts' || category === 'graphics' ? 'style="display: none !important;"' : ''}>
                        <h3 class="project-title">${proj.title}</h3>
                        ${proj.client || proj.role || proj.tools || proj.desc ? `
                            <div class="project-meta-info">
                                ${proj.client ? `<span class="meta-label"><b>Client:</b> ${proj.client}</span>` : ''}
                                ${proj.role ? `<span class="meta-label"><b>Role:</b> ${proj.role}</span>` : ''}
                                ${proj.tools ? `<span class="meta-label"><b>Tools:</b> ${proj.tools}</span>` : ''}
                                ${proj.desc ? `<p class="project-description-short" title="${proj.desc}">${proj.desc}</p>` : ''}
                            </div>
                        ` : ''}
                        ${likeButtonHTML}
                    </div>
                    <div class="card-edit-overlay">
                        <div class="card-actions-row">
                            <button type="button" class="card-hud-btn btn-edit-hud" data-id="${proj.id}"><i data-lucide="edit-2"></i> Edit</button>
                            <button type="button" class="card-hud-btn btn-delete-hud" data-id="${proj.id}"><i data-lucide="trash-2"></i> Delete</button>
                        </div>
                    </div>
                </div>
            `;
            gridEl.appendChild(itemEl);
            // Direct click listener on card (more reliable than delegation/onclick)
            const cardEl = itemEl.firstElementChild;
            if (cardEl) {
                cardEl.addEventListener('click', function(ev) {
                    if (ev.target.closest('.card-hud-btn') || ev.target.closest('.cms-checkbox-wrapper') || ev.target.classList.contains('cms-delete-checkbox')) return;
                    if (document.body.classList.contains('editor-active')) {
                        return;
                    }
                    const pid = this.getAttribute('data-project-id');
                    const pj = projects.find(p => p.id === pid);
                    if (pj) openLightbox(pj);
                });
            }
        });
        
        if (isEditorActive && copiedCard) {
            const lastPasteSlot = document.createElement('div');
            lastPasteSlot.className = 'paste-placeholder-card';
            lastPasteSlot.innerHTML = `<i data-lucide="clipboard"></i> Paste At End`;
            lastPasteSlot.addEventListener('click', () => {
                pasteProject(category, catProjects.length);
            });
            gridEl.appendChild(lastPasteSlot);
        }
        
        if (isEditorActive) {
            const addCard = document.createElement('div');
            addCard.className = 'portfolio-item show-item';
            addCard.innerHTML = `
                <div class="add-project-card" data-category="${category}">
                    <div class="add-project-icon-box">
                        <i data-lucide="plus"></i>
                    </div>
                    <h4 class="add-project-title">Add New Project</h4>
                    <p class="add-project-desc">Insert custom works or external links into this category.</p>
                </div>
            `;
            addCard.querySelector('.add-project-card').addEventListener('click', () => {
                openProjectModal(category);
            });
            gridEl.appendChild(addCard);
        }

        // Graphics: show only 12 items + "View More" button (only on live, not in editor)
        if (category === 'graphics' && !isEditorActive && catProjects.length > 12) {
            const items = gridEl.querySelectorAll('.portfolio-item');
            items.forEach((item, i) => {
                if (i >= 12) item.classList.add('graphics-extra');
            });
            const viewMoreBtn = document.createElement('button');
            viewMoreBtn.className = 'graphics-view-more-btn';
            viewMoreBtn.textContent = `View All (${catProjects.length} designs)`;
            viewMoreBtn.addEventListener('click', () => {
                document.body.classList.toggle('show-all-graphics');
                const isOpen = document.body.classList.contains('show-all-graphics');
                viewMoreBtn.textContent = isOpen ? 'Show Less' : `View All (${catProjects.length} designs)`;
                viewMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
            gridEl.appendChild(viewMoreBtn);
        }
    }

    function renderConsoleSectionsList() {
        const consoleListEl = document.getElementById('console-sections-list');
        if (!consoleListEl) return;
        consoleListEl.innerHTML = '';
        
        sections.forEach(sec => {
            const item = document.createElement('div');
            item.className = 'console-section-item';
            item.innerHTML = `
                <div>
                    <span>${sec.name}</span>
                    <span class="section-meta">(${sec.aspectRatio.replace('-', ':')})</span>
                </div>
                <button type="button" class="btn-delete-section" data-id="${sec.id}" title="Delete Section">
                    <i data-lucide="trash-2"></i>
                </button>
            `;
            item.querySelector('.btn-delete-section').addEventListener('click', () => {
                deleteSection(sec.id);
            });
            consoleListEl.appendChild(item);
        });
    }

    function renderShowreel() {
        const stored = localStorage.getItem('amit_portfolio_showreel');
        let config = {
            title: "Featured Software Demos & explainers",
            mediaSource: "link",
            mediaLink: "u6KTFBKMP8M",
            thumbLink: "./assets/showreel_cover_compelling.png",
            thumbSource: "auto"
        };
        if (stored) {
            try {
                config = JSON.parse(stored);
            } catch(e) {}
        }
        
        const showreelImg = document.querySelector('.showreel-img');
        if (showreelImg) {
            showreelImg.src = normalizeMediaPath(config.thumbLink) || './assets/showreel.png';
        }
        
        const playBtn = document.getElementById('play-showreel-btn');
        if (playBtn) {
            playBtn.setAttribute('data-video-id', config.mediaLink);
            playBtn.setAttribute('data-media-source', config.mediaSource);
        }
    }

    function reorderDOMSections() {
        const container = document.getElementById('dynamic-sections-container');
        if (!container) return;
        
        layoutOrder.forEach(secId => {
            const secNode = document.getElementById(secId);
            if (secNode) {
                container.appendChild(secNode);
            }
        });
        
        const spyUl = document.querySelector('.side-scroll-spy ul');
        if (spyUl) {
            spyUl.innerHTML = `
                <li>
                    <a href="#hero" class="spy-link active" data-target="hero">
                        <span class="spy-dot-container"><span class="spy-dot"></span></span>
                        <span class="spy-label">Home</span>
                    </a>
                </li>
            `;
            layoutOrder.forEach(secId => {
                let name = secId.toUpperCase();
                if (secId === 'portfolio') name = 'Showcase';
                if (secId === 'about') name = 'About & CV';
                if (secId === 'expertise') name = 'Toolkit';
                if (secId === 'services') name = 'Services';
                if (secId === 'contact') name = 'Contact';
                
                const li = document.createElement('li');
                li.innerHTML = `
                    <a href="#${secId}" class="spy-link" data-target="${secId}">
                        <span class="spy-dot-container"><span class="spy-dot"></span></span>
                        <span class="spy-label">${name}</span>
                    </a>
                `;
                spyUl.appendChild(li);
            });
        }
    }

    function renderLayoutManagerList() {
        const listEl = document.getElementById('console-layout-list');
        if (!listEl) return;
        
        listEl.innerHTML = '';
        layoutOrder.forEach((secId, idx) => {
            let label = secId.toUpperCase();
            if (secId === 'portfolio') label = 'Showcase Grid';
            if (secId === 'about') label = 'About & CV';
            if (secId === 'expertise') label = 'Toolkit';
            if (secId === 'services') label = 'Services';
            if (secId === 'contact') label = 'Contact';
            
            const div = document.createElement('div');
            div.className = 'console-section-item';
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';
            div.style.background = 'rgba(255,255,255,0.03)';
            div.style.padding = '4px 8px';
            div.style.borderRadius = '4px';
            div.style.fontSize = '0.75rem';
            
            div.innerHTML = `
                <span>${label}</span>
                <div style="display: flex; gap: 4px;">
                    <button class="console-btn btn-primary btn-move-layout-up" data-id="${secId}" style="padding: 2px 6px; margin: 0; font-size: 0.65rem; border-radius: 4px; ${idx === 0 ? 'opacity: 0.3; pointer-events: none;' : ''}">
                        <i data-lucide="arrow-up" style="width: 10px; height: 10px;"></i>
                    </button>
                    <button class="console-btn btn-primary btn-move-layout-down" data-id="${secId}" style="padding: 2px 6px; margin: 0; font-size: 0.65rem; border-radius: 4px; ${idx === layoutOrder.length - 1 ? 'opacity: 0.3; pointer-events: none;' : ''}">
                        <i data-lucide="arrow-down" style="width: 10px; height: 10px;"></i>
                    </button>
                </div>
            `;
            listEl.appendChild(div);
        });
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ attrs: { class: 'lucide' } });
        }
        
        listEl.querySelectorAll('.btn-move-layout-up').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const idx = layoutOrder.indexOf(id);
                if (idx > 0) {
                    const temp = layoutOrder[idx];
                    layoutOrder[idx] = layoutOrder[idx - 1];
                    layoutOrder[idx - 1] = temp;
                    saveLayoutOrder();
                    reorderDOMSections();
                    renderLayoutManagerList();
                    appendConsoleLog(`> Shifted section layout order up: "${id}"`);
                }
            });
        });
        
        listEl.querySelectorAll('.btn-move-layout-down').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const idx = layoutOrder.indexOf(id);
                if (idx !== -1 && idx < layoutOrder.length - 1) {
                    const temp = layoutOrder[idx];
                    layoutOrder[idx] = layoutOrder[idx + 1];
                    layoutOrder[idx + 1] = temp;
                    saveLayoutOrder();
                    reorderDOMSections();
                    renderLayoutManagerList();
                    appendConsoleLog(`> Shifted section layout order down: "${id}"`);
                }
            });
        });
    }

    function renderDynamicEducation() {
        const container = document.getElementById('edu-list-container');
        if (!container) return;
        
        container.innerHTML = '';
        education.forEach(item => {
            const div = document.createElement('div');
            div.className = 'edu-item cms-item-wrapper';
            div.innerHTML = `
                <button type="button" class="cms-delete-btn btn-delete-edu" data-id="${item.id}" title="Delete Education">
                    <i data-lucide="trash-2"></i>
                </button>
                <span class="edu-deg" data-cms-key="edu-deg-${item.id}">${item.degree}</span>
                <span class="edu-loc" data-cms-key="edu-loc-${item.id}">${item.loc}</span>
                <span class="edu-meta" data-cms-key="edu-meta-${item.id}">${item.meta}</span>
            `;
            container.appendChild(div);
        });
        
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'cms-add-btn';
        addBtn.innerHTML = '<i data-lucide="plus"></i> Add Education Background';
        addBtn.addEventListener('click', () => {
            education.push({
                id: "edu_" + Date.now(),
                degree: "New Degree Title (Click to Edit)",
                loc: "University / Institution Name",
                meta: "Years • CGPA / Grade"
            });
            saveEducation();
            renderDynamicEducation();
            initInlineTextCMS();
            appendConsoleLog("> Inserted new education slot.");
        });
        container.appendChild(addBtn);
        
        container.querySelectorAll('.btn-delete-edu').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                education = education.filter(x => x.id !== id);
                saveEducation();
                renderDynamicEducation();
                initInlineTextCMS();
                appendConsoleLog("> Deleted education slot.");
            });
        });
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function renderDynamicTimeline() {
        const container = document.getElementById('timeline-events-container');
        if (!container) return;
        
        container.innerHTML = '<div class="timeline-line"></div>';
        
        timeline.forEach(item => {
            const div = document.createElement('div');
            div.className = 'timeline-event cms-item-wrapper';
            div.id = `timeline-event-${item.id}`;
            div.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-card-wrapper" style="position: relative;">
                    <button type="button" class="cms-delete-btn btn-delete-time" data-id="${item.id}" title="Delete Milestone" style="top: 15px; right: 15px;">
                        <i data-lucide="trash-2"></i>
                    </button>
                    <span class="timeline-year" data-cms-key="time-year-${item.id}">${item.year}</span>
                    <h4 class="timeline-headline" data-cms-key="time-title-${item.id}">${item.title}</h4>
                    <span class="timeline-org" data-cms-key="time-org-${item.id}">${item.org || ''}</span>
                    <p class="timeline-desc" data-cms-key="time-desc-${item.id}">${item.desc}</p>
                </div>
            `;
            container.appendChild(div);
        });
        
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'cms-add-btn';
        addBtn.innerHTML = '<i data-lucide="plus"></i> Add Career Milestone';
        addBtn.addEventListener('click', () => {
            timeline.push({
                id: "time_" + Date.now(),
                year: "Year Range",
                title: "Job Title",
                org: "Company Name & Location",
                desc: "Description of your achievements, responsibilities, and workflows."
            });
            saveTimeline();
            renderDynamicTimeline();
            initInlineTextCMS();
            appendConsoleLog("> Inserted new career timeline slot.");
        });
        container.appendChild(addBtn);
        
        container.querySelectorAll('.btn-delete-time').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                timeline = timeline.filter(x => x.id !== id);
                saveTimeline();
                renderDynamicTimeline();
                initInlineTextCMS();
                appendConsoleLog("> Deleted career timeline milestone.");
            });
        });
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function renderDynamicSoftware() {
        const container = document.getElementById('software-skills-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        const categories = [
            { id: "video", name: "Video Editing", icon: "video", gradient: "linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))", glow: "var(--accent-cyan)", glowShadow: "var(--accent-glow-card-shadow)" },
            { id: "graphics", name: "Graphics Design", icon: "palette", gradient: "linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))", glow: "var(--accent-cyan)", glowShadow: "var(--accent-glow-card-shadow)" },
            { id: "ai", name: "AI Tools", icon: "cpu", gradient: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))", glow: "var(--accent-cyan)", glowShadow: "var(--accent-glow-card-shadow)" },
            { id: "other", name: "Other Tools", icon: "settings", gradient: "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))", glow: "var(--accent-cyan)", glowShadow: "var(--accent-glow-card-shadow)" }
        ];
        
        categories.forEach(cat => {
            const catCard = document.createElement('div');
            catCard.className = `software-category-card category-${cat.id}`;
            catCard.style.setProperty('--card-glow-color', cat.glow);
            catCard.style.setProperty('--card-glow-shadow', cat.glowShadow);
            
            // Get software belonging to this category
            const catSoftware = software.filter(item => item.category === cat.id);
            
            let toolsHtml = '';
            catSoftware.forEach(item => {
                const activeThemeName = localStorage.getItem('amit_portfolio_theme') || 'neon-cyber';
                const isPurpleTheme = activeThemeName === 'neon-cyber' || activeThemeName === 'royal-purple';
                const brandColor = isPurpleTheme ? (item.color || 'var(--accent-cyan)') : 'var(--accent-cyan)';
                
                const isUrl = item.icon && (item.icon.startsWith('http') || item.icon.includes('/'));
                const iconHtml = isUrl 
                    ? `<img src="${item.icon}" class="vertical-tool-logo" alt="${item.name}" style="--brand-color: ${brandColor};" />`
                    : `<i data-lucide="${item.icon || 'star'}" class="vertical-tool-logo" style="--brand-color: ${brandColor};"></i>`;
                
                // Wrap logo in a file upload trigger container
                const logoWrapperHtml = `
                    <div class="vertical-tool-logo-wrapper">
                        ${iconHtml}
                        <label class="cms-logo-upload-trigger" title="Upload custom logo">
                            <input type="file" class="cms-logo-file-input" data-id="${item.id}" accept="image/*" style="display: none;" />
                            <i data-lucide="camera" class="camera-upload-icon"></i>
                        </label>
                    </div>
                `;
                
                // Calculate 5 segments
                const level = item.level || 80;
                const filledCount = Math.min(5, Math.max(0, Math.round(level / 20)));
                
                let segmentsHtml = '';
                for (let i = 1; i <= 5; i++) {
                    const isFilled = i <= filledCount;
                    const fillStyle = isFilled 
                        ? `background: ${brandColor};`
                        : `background: rgba(255, 255, 255, 0.08);`;
                    segmentsHtml += `<div class="prof-segment-block" data-index="${i}" data-tool-id="${item.id}" style="${fillStyle}"></div>`;
                }
                
                toolsHtml += `
                    <div class="vertical-tool-row cms-item-wrapper" style="--brand-color: ${brandColor};">
                        ${logoWrapperHtml}
                        <div class="vertical-tool-info">
                            <span class="vertical-tool-name" data-cms-key="soft-name-${item.id}">${item.name}</span>
                        </div>
                        <div class="tool-proficiency-segments">
                            ${segmentsHtml}
                        </div>
                        <input type="range" class="cms-tool-level-slider cms-only-slider" data-id="${item.id}" min="0" max="5" step="1" value="${filledCount}" title="Drag to adjust level" />
                        <button type="button" class="cms-delete-btn btn-delete-soft" data-id="${item.id}" title="Delete Skill">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                `;
            });
            
            catCard.innerHTML = `
                <div class="category-card-header" style="background: #141822; border-bottom: 2px solid ${cat.glow};">
                    <h3 class="category-header-title" style="color: ${cat.glow}; text-shadow: none;">
                        <i data-lucide="${cat.icon}"></i>
                        <span>${cat.name}</span>
                    </h3>
                </div>
                <div class="category-tools-list-vertical">
                    ${toolsHtml}
                </div>
                <div class="category-card-footer">
                    <button type="button" class="cms-add-btn cta-style-add-btn" style="--btn-border-color: ${cat.glow}; --btn-glow-color: ${cat.glow};">
                        <i data-lucide="plus"></i> Add Tool
                    </button>
                </div>
            `;
            
            // Add custom add button inside footer
            const addBtn = catCard.querySelector('.cta-style-add-btn');
            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    software.push({
                        id: "soft_" + Date.now(),
                        name: "New Tool",
                        category: cat.id,
                        icon: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
                        color: "#4285F4",
                        level: 80
                    });
                    saveSoftware();
                    renderDynamicSoftware();
                    initInlineTextCMS();
                    appendConsoleLog(`> Added new skill in category "${cat.name}".`);
                });
            }
            
            container.appendChild(catCard);
        });
        
        // Add delete event listeners
        container.querySelectorAll('.btn-delete-soft').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                
                // Track this ID as deleted to prevent default software restoration on load
                if (id && id.startsWith('soft_')) {
                    const deletedTools = JSON.parse(localStorage.getItem('amit_portfolio_deleted_software') || '[]');
                    if (!deletedTools.includes(id)) {
                        deletedTools.push(id);
                        localStorage.setItem('amit_portfolio_deleted_software', JSON.stringify(deletedTools));
                    }
                }
                
                software = software.filter(x => x.id !== id);
                saveSoftware();
                renderDynamicSoftware();
                initInlineTextCMS();
                appendConsoleLog("> Deleted software skill.");
            });
        });
        
        // Wire up range slider changes (snapped to 5 steps)
        container.querySelectorAll('.cms-tool-level-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const id = slider.getAttribute('data-id');
                const val = parseInt(e.target.value); // 0 to 5
                const pctVal = val * 20; // 0% to 100%
                
                // Find tool and update level
                const toolItem = software.find(x => x.id === id);
                if (toolItem) {
                    toolItem.level = pctVal;
                    
                    // Update segment blocks in real-time
                    const cardRow = slider.closest('.vertical-tool-row');
                    if (cardRow) {
                        const blocks = cardRow.querySelectorAll('.prof-segment-block');
                        blocks.forEach((block, idx) => {
                            const isFilled = (idx + 1) <= val;
                            if (isFilled) {
                                block.style.background = toolItem.color || 'var(--accent-cyan)';
                                block.style.boxShadow = `0 0 8px ${toolItem.color || 'var(--accent-cyan)'}`;
                            } else {
                                block.style.background = 'rgba(255, 255, 255, 0.08)';
                                block.style.boxShadow = 'none';
                            }
                        });
                    }
                }
            });
            
            slider.addEventListener('change', () => {
                saveSoftware();
            });
        });

        // Wire up interactive segment block clicks
        container.querySelectorAll('.prof-segment-block').forEach(block => {
            block.addEventListener('click', (e) => {
                if (!document.body.classList.contains('editor-active')) return;
                
                const toolId = block.getAttribute('data-tool-id');
                const val = parseInt(block.getAttribute('data-index'));
                const pctVal = val * 20;
                
                const toolItem = software.find(x => x.id === toolId);
                if (toolItem) {
                    toolItem.level = pctVal;
                    saveSoftware();
                    renderDynamicSoftware();
                    initInlineTextCMS();
                    appendConsoleLog(`> Updated rating of "${toolItem.name}" to ${val}/5.`);
                }
            });
        });

        // Make software names contenteditable and save directly
        const isEditorActive = document.body.classList.contains('editor-active');
        container.querySelectorAll('.vertical-tool-name').forEach(nameEl => {
            nameEl.contentEditable = isEditorActive ? "true" : "false";
            
            nameEl.addEventListener('focus', () => {
                nameEl.style.outline = 'none';
                nameEl.style.borderBottom = '1px dashed var(--accent-cyan)';
            });
            
            nameEl.addEventListener('blur', () => {
                nameEl.style.borderBottom = 'none';
                const deleteBtn = nameEl.closest('.vertical-tool-row').querySelector('.btn-delete-soft');
                if (!deleteBtn) return;
                const id = deleteBtn.getAttribute('data-id');
                const newName = nameEl.textContent.trim();
                
                const toolItem = software.find(x => x.id === id);
                if (toolItem && newName) {
                    toolItem.name = newName;
                    
                    // Auto-assign logo if name matches a popular brand
                    const nameLower = newName.toLowerCase().replace(/\s+/g, '');
                    if (nameLower === 'premiere' || nameLower === 'premierepro') {
                        toolItem.icon = 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg';
                        toolItem.color = '#9999FF';
                    } else if (nameLower === 'aftereffects' || nameLower === 'ae') {
                        toolItem.icon = 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg';
                        toolItem.color = '#D291FF';
                    } else if (nameLower === 'filmora') {
                        toolItem.icon = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Filmora_logo.svg';
                        toolItem.color = '#00C4CC';
                    } else if (nameLower === 'davinci' || nameLower === 'davinciresolve') {
                        toolItem.icon = 'https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_17_logo.svg';
                        toolItem.color = '#FF9A00';
                    } else if (nameLower === 'finalcut' || nameLower === 'finalcutpro' || nameLower === 'fcp') {
                        toolItem.icon = 'https://upload.wikimedia.org/wikipedia/commons/3/39/Final_Cut_Pro_X_Logo.png';
                        toolItem.color = '#FF3366';
                    } else if (nameLower === 'photoshop' || nameLower === 'ps') {
                        toolItem.icon = 'https://www.vectorlogo.zone/logos/adobe_photoshop/adobe_photoshop-icon.svg';
                        toolItem.color = '#31A8FF';
                    } else if (nameLower === 'illustrator' || nameLower === 'ai') {
                        toolItem.icon = 'https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg';
                        toolItem.color = '#FF9A00';
                    } else if (nameLower === 'figma') {
                        toolItem.icon = 'https://cdn.simpleicons.org/figma';
                        toolItem.color = '#F24E1E';
                    } else if (nameLower === 'canva') {
                        toolItem.icon = 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg';
                        toolItem.color = '#00C4CC';
                    } else if (nameLower === 'gemini') {
                        toolItem.icon = 'https://www.vectorlogo.zone/logos/google_gemini/google_gemini-icon.svg';
                        toolItem.color = '#1A73E8';
                    } else if (nameLower === 'chatgpt' || nameLower === 'openai') {
                        toolItem.icon = 'https://www.vectorlogo.zone/logos/openai/openai-icon.svg';
                        toolItem.color = '#00A67E';
                    } else if (nameLower === 'youtube') {
                        toolItem.icon = 'https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg';
                        toolItem.color = '#FF0000';
                    } else if (nameLower === 'obs' || nameLower === 'obsstudio') {
                        toolItem.icon = 'https://www.vectorlogo.zone/logos/obsproject/obsproject-icon.svg';
                        toolItem.color = '#302E2F';
                    } else if (nameLower === 'blender') {
                        toolItem.icon = 'https://www.vectorlogo.zone/logos/blender/blender-icon.svg';
                        toolItem.color = '#E87D0D';
                    } else if (nameLower === 'audacity') {
                        toolItem.icon = 'https://www.vectorlogo.zone/logos/audacity/audacity-icon.svg';
                        toolItem.color = '#0000CC';
                    }
                    
                    saveSoftware();
                    renderDynamicSoftware();
                    initInlineTextCMS();
                    appendConsoleLog(`> Updated software name to: "${newName}"`);
                }
            });
            
            nameEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    nameEl.blur();
                }
            });
        });
        
        // Wire up custom logo uploads
        container.querySelectorAll('.cms-logo-file-input').forEach(input => {
            input.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const id = input.getAttribute('data-id');
                const toolItem = software.find(x => x.id === id);
                if (!toolItem) return;
                
                // Show temporary upload opacity state
                const wrapper = input.closest('.vertical-tool-logo-wrapper');
                const img = wrapper.querySelector('.vertical-tool-logo');
                if (img) img.style.opacity = '0.3';
                
                try {
                    appendConsoleLog(`> Uploading logo for "${toolItem.name}"...`);
                    const filePath = await uploadFile(file);
                    toolItem.icon = filePath;
                    saveSoftware();
                    renderDynamicSoftware();
                    initInlineTextCMS();
                    appendConsoleLog(`> Successfully uploaded custom logo for "${toolItem.name}".`);
                } catch (err) {
                    appendConsoleLog(`> Upload failed: ${err.message}`);
                    if (img) img.style.opacity = '1';
                }
            });
        });
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function renderDynamicServices() {
        const container = document.getElementById('services-grid-container');
        if (!container) return;
        
        container.innerHTML = '';
        services.forEach(item => {
            const div = document.createElement('div');
            div.className = 'service-card cms-item-wrapper' + (item.highlight ? ' highlight' : '');
            div.id = `service-${item.id}`;
            
            let bulletsHtml = '';
            if (Array.isArray(item.bullets)) {
                item.bullets.forEach((bullet, bIdx) => {
                    bulletsHtml += `<li data-cms-key="service-bullet-${item.id}-${bIdx}">${bullet}</li>`;
                });
            }
            
            div.innerHTML = `
                <div class="service-glow"></div>
                <div class="service-icon-box">
                    <button type="button" class="cms-delete-btn btn-delete-serv" data-id="${item.id}" title="Delete Service" style="top: -5px; right: -5px;">
                        <i data-lucide="trash-2"></i>
                    </button>
                    <i data-lucide="${item.icon || 'check'}" class="service-icon"></i>
                </div>
                <h3 class="service-title" data-cms-key="service-title-${item.id}">${item.title}</h3>
                <p class="service-text" data-cms-key="service-desc-${item.id}">${item.desc}</p>
                <ul class="service-bullets">
                    ${bulletsHtml}
                </ul>
            `;
            container.appendChild(div);
        });
        
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'cms-add-btn';
        addBtn.style.gridColumn = '1 / -1';
        addBtn.innerHTML = '<i data-lucide="plus"></i> Add Service Offering';
        addBtn.addEventListener('click', () => {
            services.push({
                id: "serv_" + Date.now(),
                title: "New Service Offering",
                desc: "Description details outlining your creative outputs, metrics and delivery methods.",
                bullets: ["Key Deliverable 1", "Key Deliverable 2", "Key Deliverable 3"],
                icon: "sparkles"
            });
            saveServices();
            renderDynamicServices();
            initInlineTextCMS();
            appendConsoleLog("> Inserted new service offering slot.");
        });
        container.appendChild(addBtn);
        
        container.querySelectorAll('.btn-delete-serv').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                services = services.filter(x => x.id !== id);
                saveServices();
                renderDynamicServices();
                initInlineTextCMS();
                appendConsoleLog("> Deleted service offering card.");
            });
        });
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function renderClientsStrip() {
        const clientsRow = document.querySelector('.clients-row');
        if (!clientsRow) return;
        
        const activeClients = clients.filter(c => c && c.trim().length > 0);
        
        let html = '';
        activeClients.forEach((client, idx) => {
            html += `<span class="client-name">${client.trim()}</span>`;
            if (idx < activeClients.length - 1) {
                html += `<span class="client-divider"></span>`;
            }
        });
        clientsRow.innerHTML = html;
        
        const clientsInput = document.getElementById('console-clients-input');
        if (clientsInput) {
            clientsInput.value = activeClients.join(', ');
        }
    }
    window.renderClientsStrip = renderClientsStrip;

    function initCvDownloadAnimation() {
        document.querySelectorAll('a[href*="Amit_Sharma_CV.pdf"]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (btn.classList.contains('downloading')) {
                    e.preventDefault();
                    return;
                }
                
                e.preventDefault();
                btn.classList.add('downloading');
                
                const isRingBtn = btn.classList.contains('nav-cv-ring-btn');
                const icon = btn.querySelector('i');
                const originalIconHtml = icon ? icon.outerHTML : '';
                
                if (icon && !isRingBtn) {
                    icon.outerHTML = '<span class="download-spinner-ring"></span>';
                }
                
                const textSpan = btn.querySelector('span');
                const originalText = textSpan ? textSpan.textContent : 'CV';
                
                if (textSpan) {
                    if (isRingBtn) {
                        textSpan.textContent = 'Wait';
                    } else {
                        textSpan.textContent = 'Preparing File...';
                    }
                }
                
                setTimeout(() => {
                    if (!isRingBtn) {
                        const spinner = btn.querySelector('.download-spinner-ring');
                        if (spinner) {
                            spinner.outerHTML = originalIconHtml;
                        }
                        if (textSpan) {
                            textSpan.textContent = 'Downloaded!';
                        }
                    }
                    
                    const fileUrl = btn.getAttribute('href');
                    const link = document.createElement('a');
                    link.href = fileUrl;
                    link.download = btn.getAttribute('download') || 'Amit_Sharma_CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    setTimeout(() => {
                        btn.classList.remove('downloading');
                        if (textSpan) {
                            textSpan.textContent = originalText;
                        }
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }, isRingBtn ? 100 : 1500);
                    
                }, 1500);
            });
        });
    }

    function renderProjects() {
        const isEditorActive = document.body.classList.contains('editor-active');
        
        // Render Filters Dynamically
        if (portfolioFilters) {
            const activeFilterBtn = portfolioFilters.querySelector('.filter-btn.active');
            const currentFilterVal = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
            portfolioFilters.innerHTML = '';
            
            const allBtn = document.createElement('button');
            allBtn.className = `filter-btn ${currentFilterVal === 'all' ? 'active' : ''}`;
            allBtn.setAttribute('data-filter', 'all');
            allBtn.textContent = 'All Creations';
            portfolioFilters.appendChild(allBtn);
            
            sections.forEach(sec => {
                const btn = document.createElement('button');
                btn.className = `filter-btn ${currentFilterVal === sec.id ? 'active' : ''}`;
                btn.setAttribute('data-filter', sec.id);
                btn.textContent = sec.name;
                portfolioFilters.appendChild(btn);
            });
            attachFilterListeners();
        }

        // Render Grids Dynamically
        if (gridsContainer) {
            gridsContainer.innerHTML = '';
            sections.forEach(sec => {
                const blockDiv = document.createElement('div');
                blockDiv.className = 'portfolio-category-block';
                blockDiv.id = `block-${sec.id}`;
                
                const headerEl = document.createElement('h3');
                headerEl.className = 'category-block-title';
                headerEl.textContent = sec.name;
                blockDiv.appendChild(headerEl);
                
                const gridDiv = document.createElement('div');
                gridDiv.className = `portfolio-grid grid-${sec.aspectRatio}`;
                gridDiv.id = `${sec.id}-videos-grid`;
                blockDiv.appendChild(gridDiv);
                
                gridsContainer.appendChild(blockDiv);
                
                renderGridCategory(gridDiv, sec.id, isEditorActive, sec.aspectRatio);
            });
        }

        // Populate dropdown dynamic categories
        const categoryDropdown = document.getElementById('modal-project-category');
        if (categoryDropdown) {
            categoryDropdown.innerHTML = '';
            sections.forEach(sec => {
                const opt = document.createElement('option');
                opt.value = sec.id;
                opt.textContent = `${sec.name} (${sec.aspectRatio.replace('-', ':')})`;
                categoryDropdown.appendChild(opt);
            });
        }

        renderConsoleSectionsList();
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        initPreviewCanvases();
        renderShowreel();
        reorderDOMSections();
        renderLayoutManagerList();
        renderDynamicEducation();
        renderDynamicTimeline();
        renderDynamicSoftware();
        renderDynamicServices();
        
        initDragAndDropSorting();
        
        initInlineTextCMS();
        applyContentEditable();
        
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    async function uploadFile(file, progressCallback) {
        return new Promise((resolve) => {
            const isLocalServer = window.location.origin.includes('8000');
            const uploadUrl = isLocalServer ? '/upload' : 'http://localhost:8000/upload';
            
            appendConsoleLog(`> Starting upload of "${file.name}" (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
            appendConsoleLog(`> Target URL: ${uploadUrl} (Current origin: ${window.location.origin})`);
            
            const xhr = new XMLHttpRequest();
            xhr.open('POST', uploadUrl, true);
            xhr.setRequestHeader('X-File-Name', file.name);
            
            const getBase64Fallback = () => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result); // Resolve with permanent Base64 string!
                };
                reader.onerror = () => {
                    resolve('');
                };
                reader.readAsDataURL(file);
            };

            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable && progressCallback) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    progressCallback(percent);
                } else {
                    appendConsoleLog(`> Upload progress: ${e.loaded} bytes sent.`);
                }
            };
            
            xhr.onload = () => {
                appendConsoleLog(`> Server responded with status: ${xhr.status}`);
                if (xhr.status === 200) {
                    try {
                        const res = JSON.parse(xhr.responseText);
                        appendConsoleLog(`> Upload completed: ${res.filePath}`);
                        resolve(res.filePath);
                    } catch (err) {
                        appendConsoleLog("> Fallback: Invalid server response, using compressed Base64.");
                        getBase64Fallback();
                    }
                } else {
                    appendConsoleLog("> Fallback: Server disabled (HTTP " + xhr.status + "), using compressed Base64.");
                    getBase64Fallback();
                }
            };
            
            xhr.onerror = (err) => {
                appendConsoleLog(`> Connection failed. (Server offline), using compressed Base64 fallback.`);
                getBase64Fallback();
            };
            
            try {
                xhr.send(file);
            } catch (sendErr) {
                appendConsoleLog(`> Error sending request: ${sendErr.message}, using compressed Base64 fallback.`);
                getBase64Fallback();
            }
        });
    }

    function compressAndGetBase64(file) {
        return new Promise((resolve) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            
            let resolved = false;
            const timeoutId = setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    URL.revokeObjectURL(objectUrl);
                    // Fallback to FileReader if ObjectURL times out
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = () => resolve('');
                    reader.readAsDataURL(file);
                }
            }, 5000);
            
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    const maxDim = 800;
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxDim || height > maxDim) {
                        if (width > height) {
                            height = Math.round((height * maxDim) / width);
                            width = maxDim;
                        } else {
                            width = Math.round((width * maxDim) / height);
                            height = maxDim;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    const base64Data = canvas.toDataURL('image/jpeg', 0.70);
                    if (!resolved) {
                        resolved = true;
                        clearTimeout(timeoutId);
                        URL.revokeObjectURL(objectUrl);
                        resolve(base64Data);
                    }
                } catch (canvasErr) {
                    if (!resolved) {
                        resolved = true;
                        clearTimeout(timeoutId);
                        URL.revokeObjectURL(objectUrl);
                        // Fallback
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.onerror = () => resolve('');
                        reader.readAsDataURL(file);
                    }
                }
            };
            
            img.onerror = () => {
                if (!resolved) {
                    resolved = true;
                    clearTimeout(timeoutId);
                    URL.revokeObjectURL(objectUrl);
                    // Fallback
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = () => resolve('');
                    reader.readAsDataURL(file);
                }
            };
            
            img.src = objectUrl;
        });
    }

    function normalizeMediaPath(path) {
        if (!path) return '';
        if (path.startsWith('./assets/uploads/') || path.startsWith('assets/uploads/') || path.startsWith('/assets/uploads/')) {
            const cleanPath = path.replace(/^\.\//, '/').replace(/^assets\//, '/assets/');
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            if (isLocal && window.location.port !== '8000') {
                return `http://localhost:8000${cleanPath}`;
            }
            return cleanPath;
        }
        return path;
    }

    function generateVideoThumbnail(videoUrl) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.src = normalizeMediaPath(videoUrl);
            video.crossOrigin = 'anonymous';
            video.muted = true;
            video.playsInline = true;
            
            video.onloadedmetadata = () => {
                video.currentTime = 1; // Seek to 1 second
            };
            
            video.onseeked = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth || 640;
                    canvas.height = video.videoHeight || 360;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                    resolve(dataUrl);
                } catch (e) {
                    resolve('./assets/proj_design.png');
                }
            };
            
            video.onerror = () => {
                resolve('./assets/proj_design.png');
            };
        });
    }

    function getBestYoutubeThumbnail(youtubeId) {
        return new Promise((resolve) => {
            const maxResUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
            const img = new Image();
            img.onload = () => {
                if (img.width > 120) {
                    resolve(maxResUrl);
                } else {
                    resolve(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
                }
            };
            img.onerror = () => {
                resolve(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
            };
            img.src = maxResUrl;
        });
    }

    let timelineCapturedDataUrl = '';
    let timelineYtPlayer = null;
    let timelineYtReady = false;

    function loadTimelineVideo() {
        const videoEl = document.getElementById('timeline-picker-video');
        const youtubeImg = document.getElementById('timeline-picker-youtube-img');
        const errorEl = document.getElementById('timeline-picker-error');
        const rangeEl = document.getElementById('timeline-picker-range');
        const timeEl = document.getElementById('timeline-picker-time');

        if (videoEl) videoEl.style.display = 'none';
        if (youtubeImg) youtubeImg.style.display = 'none';
        errorEl.style.display = 'block';
        errorEl.textContent = 'Loading video stream...';

        let videoUrl = '';
        const mediaSrc = document.getElementById('modal-media-source').value;
        const mediaLinkInput = document.getElementById('modal-media-link').value.trim();
        const youtubeId = extractYouTubeId(mediaLinkInput);

        if (mediaSrc === 'link' && youtubeId) {
            errorEl.textContent = 'Loading YouTube player...';
            // Destroy previous player if any
            if (timelineYtPlayer) { try { timelineYtPlayer.destroy(); } catch(e) {} timelineYtPlayer = null; }
            timelineYtReady = false;

            // Ensure YouTube IFrame API is loaded
            if (typeof YT === 'undefined' || !YT.Player) {
                var tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                var first = document.getElementsByTagName('script')[0];
                first.parentNode.insertBefore(tag, first);
                // onYouTubeIframeAPIReady will be called globally
                window.onYouTubeIframeAPIReady = function() { createYtTimelinePlayer(youtubeId); };
            } else {
                createYtTimelinePlayer(youtubeId);
            }
            // Set a loading state
            rangeEl.min = 0; rangeEl.max = 100; rangeEl.value = 0;
            timeEl.textContent = 'Loading...';
            return;
        }

        if (mediaSrc === 'upload') {
            const uploadFile = document.getElementById('modal-media-file').files[0];
            if (uploadFile) {
                videoUrl = URL.createObjectURL(uploadFile);
            } else {
                const editId = document.getElementById('edit-project-id').value;
                if (editId) {
                    const existing = projects.find(p => p.id === editId);
                    if (existing && existing.mediaSource === 'upload') {
                        videoUrl = normalizeMediaPath(existing.mediaLink);
                    }
                }
            }
        } else {
            if (mediaLinkInput && !youtubeId) {
                videoUrl = normalizeMediaPath(mediaLinkInput);
            }
        }

        if (!videoUrl) {
            errorEl.textContent = 'No local video file loaded or MP4 link specified above';
            return;
        }

        videoEl.src = videoUrl;
        videoEl.crossOrigin = 'anonymous';
        videoEl.load();

        videoEl.onloadedmetadata = () => {
            errorEl.style.display = 'none';
            videoEl.style.display = 'block';
            rangeEl.min = 0;
            rangeEl.max = Math.floor(videoEl.duration);
            rangeEl.value = 0;
            timeEl.textContent = '0:00';
            videoEl.currentTime = 0;
        };

        videoEl.onerror = () => {
            errorEl.textContent = 'Failed to load video timeline';
        };
    }

    function createYtTimelinePlayer(youtubeId) {
        const container = document.getElementById('timeline-picker-video');
        if (!container) return;
        container.style.display = 'none'; // Keep hidden, we seek via API

        // Create a hidden div for the player if not exists
        let playerDiv = document.getElementById('yt-timeline-player');
        if (!playerDiv) {
            playerDiv = document.createElement('div');
            playerDiv.id = 'yt-timeline-player';
            playerDiv.style.position = 'absolute';
            playerDiv.style.opacity = '0';
            playerDiv.style.pointerEvents = 'none';
            playerDiv.style.width = '1px';
            playerDiv.style.height = '1px';
            container.parentElement.appendChild(playerDiv);
        }

        timelineYtPlayer = new YT.Player('yt-timeline-player', {
            videoId: youtubeId,
            height: '1', width: '1',
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
                rel: 0,
                iv_load_policy: 3
            },
            events: {
                onReady: function(event) {
                    timelineYtReady = true;
                    const duration = event.target.getDuration();
                    const rangeEl = document.getElementById('timeline-picker-range');
                    const timeEl = document.getElementById('timeline-picker-time');
                    const errorEl = document.getElementById('timeline-picker-error');
                    const youtubeImg = document.getElementById('timeline-picker-youtube-img');
                    if (errorEl) errorEl.style.display = 'none';
                    if (youtubeImg) {
                        youtubeImg.style.display = 'block';
                        youtubeImg.src = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
                    }
                    if (rangeEl) {
                        rangeEl.min = 0;
                        rangeEl.max = Math.floor(duration);
                        rangeEl.value = 0;
                    }
                    if (timeEl) timeEl.textContent = '0:00';
                },
                onError: function() {
                    const errorEl = document.getElementById('timeline-picker-error');
                    if (errorEl) errorEl.textContent = 'YouTube player error. Check video ID.';
                }
            }
        });
    }

    // Bind slider input range scrubbing
    const rangeEl = document.getElementById('timeline-picker-range');
    if (rangeEl) {
        rangeEl.addEventListener('input', (e) => {
            const videoEl = document.getElementById('timeline-picker-video');
            const youtubeImg = document.getElementById('timeline-picker-youtube-img');
            const timeEl = document.getElementById('timeline-picker-time');

            if (timelineYtPlayer && timelineYtReady && timelineYtPlayer.getDuration) {
                const seconds = parseFloat(e.target.value);
                timelineYtPlayer.seekTo(seconds, true);
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                timeEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
                // Update thumbnail to the closest default frame or maxres
                const mediaLinkInput = document.getElementById('modal-media-link').value.trim();
                const yid = extractYouTubeId(mediaLinkInput);
                if (yid && youtubeImg) {
                    youtubeImg.src = `https://img.youtube.com/vi/${yid}/maxresdefault.jpg`;
                }
            } else if (videoEl && !isNaN(videoEl.duration) && videoEl.style.display !== 'none') {
                const seconds = parseFloat(e.target.value);
                videoEl.currentTime = seconds;
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                timeEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }
        });
    }

    // Bind capture frame camera button clicks
    const captureBtn = document.getElementById('btn-capture-frame');
    if (captureBtn) {
        captureBtn.addEventListener('click', () => {
            const videoEl = document.getElementById('timeline-picker-video');
            const youtubeImg = document.getElementById('timeline-picker-youtube-img');

            if (timelineYtPlayer && timelineYtReady) {
                const seconds = timelineYtPlayer.getCurrentTime();
                const mediaLinkInput = document.getElementById('modal-media-link').value.trim();
                const yid = extractYouTubeId(mediaLinkInput);
                timelineCapturedDataUrl = `https://img.youtube.com/vi/${yid}/maxresdefault.jpg`;
                const pickerContainer = document.getElementById('thumb-timeline-container');
                pickerContainer.style.outline = '2px solid var(--accent-cyan)';
                setTimeout(() => pickerContainer.style.outline = 'none', 300);
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                appendConsoleLog(`> Captured YouTube frame at ${mins}:${secs < 10 ? '0' : ''}${secs}`);
                alert(`Frame captured at ${mins}:${secs < 10 ? '0' : ''}${secs}!`);
            } else if (videoEl && !isNaN(videoEl.duration) && videoEl.style.display !== 'none') {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = videoEl.videoWidth || 1920;
                    canvas.height = videoEl.videoHeight || 1080;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
                    timelineCapturedDataUrl = canvas.toDataURL('image/jpeg', 1.0);
                    const pickerContainer = document.getElementById('thumb-timeline-container');
                    pickerContainer.style.outline = '2px solid var(--accent-cyan)';
                    setTimeout(() => pickerContainer.style.outline = 'none', 300);
                    appendConsoleLog(`> Captured high-res timeline frame at ${videoEl.currentTime.toFixed(2)}s`);
                    alert("Frame captured successfully as high-resolution thumbnail!");
                } catch (err) {
                    alert("Could not capture video frame: " + err.message);
                }
            } else {
                alert("Please ensure a valid video is loaded first.");
            }
        });
    }

    // Initialize drag-and-drop sortable grids using SortableJS library
    let sortableInstances = [];
    
    function initDragAndDropSorting() {
        // Destroy existing instances first
        sortableInstances.forEach(inst => inst.destroy());
        sortableInstances = [];
        
        const isEditorActive = document.body.classList.contains('editor-active');
        if (!isEditorActive || typeof Sortable === 'undefined') return;

        // Mount MultiDrag plugin if available
        if (typeof MultiDrag !== 'undefined') {
            try {
                Sortable.mount(new MultiDrag());
            } catch(e) {}
        }
        
        document.querySelectorAll('.portfolio-grid').forEach(gridEl => {
            let category = gridEl.id.replace('-videos-grid', '');
            if (gridEl.id === 'modal-graphics-grid') {
                category = 'graphics';
            }
            
            const inst = new Sortable(gridEl, {
                group: 'portfolio-creations',
                animation: 150,
                multiDrag: true, // Enable multi-drag
                selectedClass: 'sortable-selected', // Class for selected items
                ghostClass: 'sortable-ghost',
                dragClass: 'sortable-drag',
                // Filter out non-draggable items like Add Card, Paste placeholders, or View More triggers
                filter: '.paste-placeholder-card, .graphics-gallery-trigger-card, .portfolio-item:has(.btn-add-hud)',
                onSelect: function (evt) {
                    const cb = evt.item.querySelector('.cms-delete-checkbox');
                    if (cb) cb.checked = true;
                },
                onDeselect: function (evt) {
                    const cb = evt.item.querySelector('.cms-delete-checkbox');
                    if (cb) cb.checked = false;
                },
                onEnd: function (evt) {
                    let fromCat = evt.from.id.replace('-videos-grid', '');
                    if (evt.from.id === 'modal-graphics-grid') fromCat = 'graphics';
                    
                    let toCat = evt.to.id.replace('-videos-grid', '');
                    if (evt.to.id === 'modal-graphics-grid') toCat = 'graphics';
                    
                    // Rebuild order of items
                    const remainingProjs = projects.filter(p => p.category !== fromCat && p.category !== toCat);
                    
                    // Get ordered IDs from target category grid children using data-project-id attribute
                    const toGridItemIds = Array.from(evt.to.children)
                        .filter(child => child.classList.contains('portfolio-item') && !child.querySelector('.btn-add-hud') && !child.classList.contains('graphics-gallery-trigger-card'))
                        .map(child => child.getAttribute('data-project-id'));
                        
                    // Re-construct projects list matching the new drag index order
                    const targetCategoryProjects = [];
                    toGridItemIds.forEach(id => {
                        const proj = projects.find(p => p.id === id);
                        if (proj) {
                            proj.category = toCat; // Update category in case of group migration
                            targetCategoryProjects.push(proj);
                        }
                    });
                    
                    let sourceCategoryProjects = [];
                    if (fromCat !== toCat) {
                        const fromGridItemIds = Array.from(evt.from.children)
                            .filter(child => child.classList.contains('portfolio-item') && !child.querySelector('.btn-add-hud') && !child.classList.contains('graphics-gallery-trigger-card'))
                            .map(child => child.getAttribute('data-project-id'));
                            
                        fromGridItemIds.forEach(id => {
                            const proj = projects.find(p => p.id === id);
                            if (proj) {
                                proj.category = fromCat;
                                sourceCategoryProjects.push(proj);
                            }
                        });
                    }
                    
                    // Reassemble projects database
                    projects = [
                        ...remainingProjs,
                        ...targetCategoryProjects,
                        ...sourceCategoryProjects
                    ];
                    
                    saveDatabase();
                    appendConsoleLog(`> Reordered portfolio items via drag-and-drop.`);
                    
                    // Re-render both grids
                    renderProjects();
                    renderModalGraphicsGrid();
                }
            });
            sortableInstances.push(inst);
        });
    }

    initDatabase();
    renderProjects();

    /* ==========================================================================
       PRELOADER & COUNTER
       ========================================================================== */
    const loader = document.getElementById('loader');
    const loaderPercentage = document.getElementById('loader-percentage');
    const loaderProgressBar = document.getElementById('loader-progress-bar');
    
    let count = 0;
    const counterInterval = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2; // Random increments
        if (count >= 100) {
            count = 100;
            clearInterval(counterInterval);
            
            // Hide Loader with GSAP
            if (typeof gsap !== 'undefined') {
                gsap.to(loader, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power4.inOut",
                    onComplete: () => {
                        loader.style.display = 'none';
                        // Start Hero Animations
                        initHeroAnimations();
                    }
                });
            } else {
                loader.style.transition = 'transform 0.8s ease-in-out';
                loader.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    loader.style.display = 'none';
                    initHeroAnimations();
                }, 800);
            }
        }
        
        // Update labels
        loaderPercentage.textContent = count < 10 ? '0' + count : count;
        loaderProgressBar.style.width = count + '%';
    }, 40);


    /* ==========================================================================
       CUSTOM CURSOR
       ========================================================================== */
    const cursor = document.getElementById('custom-cursor');
    const cursorGlow = document.getElementById('custom-cursor-glow');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let cursorX = mouseX;
    let cursorY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    
    // Update mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Custom cursor render loop (lerp for smooth tracking)
    function updateCursor() {
        // Linear interpolation: currentPos + (targetPos - currentPos) * speed
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        if (cursor && cursorGlow) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
        }
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Hover interactions for cursor changes
    const interactables = 'a, button, .filter-btn, .project-card, .service-card, input, select, textarea, .form-range, .scroll-indicator';
    document.querySelectorAll(interactables).forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hover-interactive');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hover-interactive');
        });
    });


    /* ==========================================================================
       MAGNETIC BUTTONS PHYSICS
       ========================================================================== */
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate cursor relative coordinates from card center
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            // Push button in coordinate direction (limit to 15px max)
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            
            // Inner text child subtle offset if exists
            const text = btn.querySelector('span');
            const icon = btn.querySelector('i');
            if (text) text.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            if (icon) icon.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            const text = btn.querySelector('span');
            const icon = btn.querySelector('i');
            if (text) text.style.transform = 'translate(0px, 0px)';
            if (icon) icon.style.transform = 'translate(0px, 0px)';
        });
    });


    /* ==========================================================================
       HERO ANIMATED PARTICLE BACKGROUND (CANVAS)
       ========================================================================== */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let connectionDistance = 110;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseSpeedX = (Math.random() - 0.5) * 0.4;
                // Dynamic Gamio purple/crimson HSL values for gaming theme
                const isPurple = Math.random() > 0.5;
                const hue = isPurple ? 268 : 347;
                const sat = isPurple ? 80 : 92;
                const light = isPurple ? 63 : 47;
                this.color = `hsla(${hue}, ${sat}%, ${light}%, ${Math.random() * 0.2 + 0.05})`;
            }
            
            update() {
                // Interactive mouse repulsion/pull
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.hypot(dx, dy);
                
                if (distance < 180) {
                    // Force calculations
                    const force = (180 - distance) / 180;
                    const angle = Math.atan2(dy, dx);
                    
                    // Repulse slightly
                    this.speedX -= Math.cos(angle) * force * 0.05;
                    this.speedY -= Math.sin(angle) * force * 0.05;
                } else {
                    // Decay back to base velocity
                    this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
                    this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
                }
                
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Screen wrapping check
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
        
        // Initialize particle array
        const maxParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
        
        // Main particle loop
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Render grid structure lines
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);
                    
                    if (dist < connectionDistance) {
                        const alpha = (1 - (dist / connectionDistance)) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        
                        // Core purple connection line
                        ctx.strokeStyle = `rgba(156, 85, 235, ${alpha * 0.5})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }


    /* ==========================================================================
       GSAP SCROLL INTERACTIVES
       ========================================================================== */
    function initHeroAnimations() {
        if (typeof gsap === 'undefined') return;
        
        // Navbar reveal
        gsap.from("#navbar", {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        // Hero Content Elements
        const heroTimeline = gsap.timeline();
        
        heroTimeline.from(".hero-badge", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from("#hero-headline", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        }, "-=0.6")
        .from(".hero-subheading", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .from(".hero-actions", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .from(".hud-frame", {
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1")
        .from(".hud-tag", {
            opacity: 0,
            x: (i, target) => target.classList.contains('tag-top') ? 30 : -30,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .from(".scroll-indicator", {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2");
        
        // Navbar Scrolled State Trigger
        ScrollTrigger.create({
            trigger: "#hero",
            start: "100px top",
            onEnter: () => document.getElementById('navbar').classList.add('nav-scrolled'),
            onLeaveBack: () => document.getElementById('navbar').classList.remove('nav-scrolled')
        });
        
        // Portfolio Showcase Title Reveal
        gsap.from("#portfolio .section-header > *", {
            scrollTrigger: {
                trigger: "#portfolio",
                start: "top 80%"
            },
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
        });
        
        // Services Section Title & Grid reveals
        gsap.from("#services .section-header > *", {
            scrollTrigger: {
                trigger: "#services",
                start: "top 80%"
            },
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
        });
        
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 80%"
            },
            y: 60,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out"
        });
        
        // Expertise Skill bars animation trigger
        gsap.from(".expertise-skills .section-header > *, .expertise-skills .section-desc", {
            scrollTrigger: {
                trigger: "#expertise",
                start: "top 80%"
            },
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
        });
        
        // Skill Progress bar loading
        ScrollTrigger.create({
            trigger: ".skills-list",
            start: "top 85%",
            onEnter: () => {
                document.querySelectorAll('.skill-bar-progress').forEach(bar => {
                    const targetPercent = bar.getAttribute('data-progress');
                    bar.style.width = targetPercent;
                });
            }
        });
        
        // Numerical statistics counter trigger
        ScrollTrigger.create({
            trigger: ".stats-dashboard",
            start: "top 85%",
            onEnter: () => animateStatsCounters()
        });
        
        // Showreel title and viewport reveals
        gsap.from("#showreel-section .section-header > *", {
            scrollTrigger: {
                trigger: "#showreel-section",
                start: "top 80%"
            },
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
        });
        
        gsap.from(".showreel-viewport", {
            scrollTrigger: {
                trigger: ".showreel-viewport",
                start: "top 80%"
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });
        
        // About & Timeline reveals
        gsap.from(".about-bio > *", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%"
            },
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
        });
        
        gsap.from(".timeline-event", {
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top 80%"
            },
            x: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out"
        });
        
        // Contact details and form reveals
        gsap.from(".contact-details-box > *", {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%"
            },
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out"
        });
        
        gsap.from(".contact-form-box", {
            scrollTrigger: {
                trigger: ".contact-form-box",
                start: "top 80%"
            },
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }

    // Backup triggers if GSAP doesn't load properly
    if (typeof gsap === 'undefined') {
        setTimeout(() => {
            // Fill progress bars automatically
            document.querySelectorAll('.skill-bar-progress').forEach(bar => {
                bar.style.width = bar.getAttribute('data-progress');
            });
            // Run counters
            animateStatsCounters();
        }, 1000);
    }


    /* ==========================================================================
       PORTFOLIO CATEGORY FILTERS
       ========================================================================== */
    function attachFilterListeners() {
        const filterButtons = portfolioFilters.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-filter');
                const allBlocks = gridsContainer.querySelectorAll('.portfolio-category-block');
                
                if (typeof gsap !== 'undefined') {
                    const blocksToHide = [];
                    const blocksToShow = [];
                    
                    allBlocks.forEach(block => {
                        const secId = block.id.replace('block-', '');
                        if (category === 'all' || secId === category) {
                            blocksToShow.push(block);
                        } else {
                            blocksToHide.push(block);
                        }
                    });
                    
                    if (blocksToHide.length > 0) {
                        gsap.to(blocksToHide, { 
                            opacity: 0, 
                            y: 15, 
                            duration: 0.3, 
                            onComplete: () => {
                                blocksToHide.forEach(b => b.style.display = 'none');
                                blocksToShow.forEach(b => {
                                    b.style.display = 'block';
                                });
                                gsap.to(blocksToShow, { opacity: 1, y: 0, duration: 0.4 });
                            }
                        });
                    } else {
                        blocksToShow.forEach(b => {
                            b.style.display = 'block';
                        });
                        gsap.to(blocksToShow, { opacity: 1, y: 0, duration: 0.4 });
                    }
                } else {
                    allBlocks.forEach(block => {
                        const secId = block.id.replace('block-', '');
                        if (category === 'all' || secId === category) {
                            block.style.display = 'block';
                            block.style.opacity = 1;
                        } else {
                            block.style.display = 'none';
                            block.style.opacity = 0;
                        }
                    });
                }
                
                // Toggle individual items inside grids
                const allItems = document.querySelectorAll('.portfolio-item');
                allItems.forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    
                    if (category === 'all' || itemCat === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('show-item');
                        }, 50);
                    } else {
                        item.classList.remove('show-item');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);
                    }
                });
                
                if (typeof ScrollTrigger !== 'undefined') {
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    }, 500);
                }
            });
        });
    }


    /* ==========================================================================
       SERVICES GLOW SPOTLIGHT EFFECT
       ========================================================================== */
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Assign coordinate properties to use in card CSS gradients
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    /* ==========================================================================
       STATISTICS DYNAMIC COUNTER ENGINE
       ========================================================================== */
    function animateStatsCounters() {
        const stats = document.querySelectorAll('.stat-num');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            let current = 0;
            const duration = 2000; // 2 seconds animation
            const steps = 60;
            const increment = target / steps;
            const stepTime = duration / steps;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = `+${target}`;
                    clearInterval(counter);
                } else {
                    stat.textContent = `+${Math.floor(current)}`;
                }
            }, stepTime);
        });
    }


    /* ==========================================================================
       PORTFOLIO HOVER RENDERING PREVIEW (AUTO-PLAY VIDEO TRAILERS)
       ========================================================================== */
    function initPreviewCanvases() {
        const projectCards = document.querySelectorAll('.project-card');
        
        // Intersection Observer: Auto-play silent video previews on scroll/viewport visibility (both desktop and mobile)
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.35 // Trigger when card is at least 35% visible in the viewport
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const card = entry.target;
                    const mediaContainer = card.querySelector('.project-media');
                    if (!mediaContainer) return;

                    const projectId = card.getAttribute('data-project-id');
                    const proj = projects.find(p => p.id === projectId);
                    if (!proj) return;

                    // If it is static design category, ignore
                    if (proj.mediaSource === 'upload') {
                        const isVideo = (proj.category === 'long' || proj.category === 'shorts');
                        if (!isVideo) return;
                    }

                    if (entry.isIntersecting) {
                        if (document.body.classList.contains('editor-active')) return;
                        const isAnyPlaying = document.querySelector('.project-card.playing-inline') || 
                                             document.getElementById('video-modal').classList.contains('active');
                        if (isAnyPlaying) return;

                        // Check if a preview is already playing inside this card
                        if (mediaContainer.querySelector('.hover-video-preview')) return;

                        let previewEl;
                        if (proj.mediaSource === 'upload') {
                            previewEl = document.createElement('video');
                            previewEl.src = normalizeMediaPath(proj.mediaLink);
                            previewEl.muted = true;
                            previewEl.loop = true;
                            previewEl.autoplay = true;
                            previewEl.setAttribute('muted', '');
                            previewEl.setAttribute('playsinline', '');
                            previewEl.playsInline = true;
                            previewEl.className = 'hover-video-preview';
                            
                            previewEl.onplaying = () => {
                                previewEl.classList.add('loaded');
                            };
                            
                            mediaContainer.appendChild(previewEl);
                        } else {
                            const cleanId = extractYouTubeId(proj.mediaLink);
                            previewEl = document.createElement('iframe');
                            previewEl.src = `https://www.youtube.com/embed/${cleanId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${cleanId}&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1&vq=hd1080`;
                            previewEl.className = 'hover-video-preview';
                            
                            previewEl.onload = () => {
                                previewEl.classList.add('loaded');
                            };
                            
                            mediaContainer.appendChild(previewEl);
                        }
                    } else {
                        // User scrolled past the card: clean up resources immediately
                        mediaContainer.querySelectorAll('.hover-video-preview').forEach(el => el.remove());
                    }
                });
            }, observerOptions);

            projectCards.forEach(card => observer.observe(card));
        }
    }


    /* ==========================================================================
       SHOWREEL SECTION AUDIO WAVEFORM SIMULATOR
       ========================================================================== */
    const waveform = document.getElementById('waveform-canvas');
    let waveformAnimationFrame = null;
    let wavePlaying = false;
    
    if (waveform) {
        const wCtx = waveform.getContext('2d');
        
        function resizeWaveform() {
            waveform.width = waveform.offsetWidth;
            waveform.height = waveform.offsetHeight;
        }
        resizeWaveform();
        window.addEventListener('resize', resizeWaveform);
        
        let phase = 0;
        
        function drawWaveform() {
            wCtx.clearRect(0, 0, waveform.width, waveform.height);
            
            // Draw simulated neon soundwaves (dual overlapping curves)
            const amp = wavePlaying ? 25 : 8; // high wave when active
            const speed = wavePlaying ? 0.25 : 0.05; // fast wave when active
            
            phase += speed;
            
            // Draw Wave 1 (Gamio Purple)
            wCtx.beginPath();
            wCtx.lineWidth = 2;
            wCtx.strokeStyle = 'rgba(156, 85, 235, 0.6)';
            
            for (let x = 0; x < waveform.width; x++) {
                const angle = (x / waveform.width) * Math.PI * 4 + phase;
                // Fade amplitudes at screen edges
                const edgeDecay = Math.sin((x / waveform.width) * Math.PI);
                const y = waveform.height / 2 + Math.sin(angle) * amp * edgeDecay;
                
                if (x === 0) wCtx.moveTo(x, y);
                else wCtx.lineTo(x, y);
            }
            wCtx.stroke();
            
            // Draw Wave 2 (Gamio Crimson)
            wCtx.beginPath();
            wCtx.lineWidth = 1.5;
            wCtx.strokeStyle = 'rgba(229, 10, 58, 0.4)';
            
            for (let x = 0; x < waveform.width; x++) {
                const angle = (x / waveform.width) * Math.PI * 6 - phase * 0.8;
                const edgeDecay = Math.sin((x / waveform.width) * Math.PI);
                const y = waveform.height / 2 + Math.cos(angle) * (amp * 0.7) * edgeDecay;
                
                if (x === 0) wCtx.moveTo(x, y);
                else wCtx.lineTo(x, y);
            }
            wCtx.stroke();
            
            waveformAnimationFrame = requestAnimationFrame(drawWaveform);
        }
        drawWaveform();
    }

    // Auto-preview showreel muted when section scrolls into view
    (function() {
        const viewport = document.getElementById('showreel-viewport');
        if (!viewport) return;
        const frame = viewport.querySelector('.showreel-frame');
        // Capture the default (poster) markup so we can restore it later
        const showreelFrameDefaultHTML = frame ? frame.innerHTML : '';
        let autoPlayed = false;
        const autoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !autoPlayed) {
                    if (document.body.classList.contains('editor-active')) return;
                    autoPlayed = true;
                    autoObserver.disconnect();
                    if (!frame) return;
                    const playBtn = document.getElementById('play-showreel-btn');
                    const vid = playBtn ? (playBtn.getAttribute('data-video-id') || 'u6KTFBKMP8M') : 'u6KTFBKMP8M';
                    const cleanYtId = extractYouTubeId(vid);
                    if (!cleanYtId) return;
                    frame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + cleanYtId + '?autoplay=1&mute=1&controls=0&loop=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
                    const waveformEl = document.getElementById('waveform-canvas');
                    if (waveformEl) waveformEl.style.display = 'none';
                    wavePlaying = true;
                    appendConsoleLog('> Showreel auto-preview started (muted).');
                }
            });
        }, { threshold: 0.4 });
        autoObserver.observe(viewport);

        // Stop all video previews (used when entering CMS mode)
        window.stopAllPreviews = function() {
            // Remove hover/inline previews in portfolio cards
            document.querySelectorAll('.hover-video-preview').forEach(el => el.remove());
            document.querySelectorAll('.project-card.playing-inline').forEach(card => {
                const media = card.querySelector('.project-media');
                if (media) media.querySelectorAll('iframe, video').forEach(v => v.remove());
                card.classList.remove('playing-inline');
            });
            // Restore showreel frame to poster (stop auto-preview)
            if (frame && frame.querySelector('iframe')) {
                frame.innerHTML = showreelFrameDefaultHTML;
                autoPlayed = false;
                autoObserver.observe(viewport);
            }
            const waveformEl = document.getElementById('waveform-canvas');
            if (waveformEl) waveformEl.style.display = '';
            wavePlaying = false;
        };
    })();

    // Play button triggers
    const playShowreelBtn = document.getElementById('play-showreel-btn');
    const playBtnIcon = playShowreelBtn ? playShowreelBtn.querySelector('.play-btn-icon') : null;
    const playBtnLabel = document.querySelector('.play-btn-label');
    const consoleLogs = document.getElementById('console-logs');
    
    if (playShowreelBtn) {
        playShowreelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const videoId = playShowreelBtn.getAttribute('data-video-id') || 'u6KTFBKMP8M';
            const mediaSource = playShowreelBtn.getAttribute('data-media-source') || 'link';
            const viewport = document.getElementById('showreel-viewport');
            const frame = viewport ? viewport.querySelector('.showreel-frame') : null;
            
            if (frame) {
                // Clear cover elements and append direct player
                frame.innerHTML = '';
                
                const cleanYtId = extractYouTubeId(videoId);
                const isYoutube = !!cleanYtId;
                
                if (mediaSource === 'upload' && !isYoutube) {
                    const video = document.createElement('video');
                    video.src = normalizeMediaPath(videoId);
                    video.controls = true;
                    video.autoplay = true;
                    video.preload = 'auto';
                    video.style.position = 'absolute';
                    video.style.top = '0';
                    video.style.left = '0';
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.border = 'none';
                    
                    frame.appendChild(video);
                } else {
                    const iframe = document.createElement('iframe');
                    iframe.src = `https://www.youtube.com/embed/${cleanYtId || videoId}?autoplay=1&rel=0&modestbranding=1&vq=hd1080`;
                    iframe.style.position = 'absolute';
                    iframe.style.top = '0';
                    iframe.style.left = '0';
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.border = 'none';
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                    iframe.allowFullscreen = true;
                    
                    frame.appendChild(iframe);
                }
                
                // Hide glowing backdrop to prevent focus bleed
                const backdrop = viewport.querySelector('.showreel-glow-backdrop');
                if (backdrop) backdrop.style.display = 'none';
                
                appendConsoleLog('> Main showreel streaming inline... Active.');
            }
        });
    }
    
    // Console log utility
    function appendConsoleLog(text) {
        if (!consoleLogs) return;
        const line = document.createElement('div');
        line.className = 'log-line';
        line.textContent = text;
        consoleLogs.appendChild(line);
        
        // Scroll console body to bottom
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
        
        // Keep logs under 10 lines max to prevent clutter
        while (consoleLogs.children.length > 7) {
            consoleLogs.removeChild(consoleLogs.firstChild);
        }
    }


    /* ==========================================================================
       TESTIMONIALS SLIDER CONTROLS
       ========================================================================== */
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('testi-prev-btn');
    const nextBtn = document.getElementById('testi-next-btn');
    const sliderDots = document.getElementById('slider-dots');
    
    let currentIndex = 0;
    const totalSlides = testimonialSlides.length;
    
    // Setup dots dynamic list
    if (sliderDots && totalSlides > 0) {
        sliderDots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }
    }
    
    function updateSlidePosition() {
        const wrapper = document.getElementById('testimonials-wrapper');
        if (!wrapper) return;
        
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update slides active state
        testimonialSlides.forEach((slide, idx) => {
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update dots styling
        if (sliderDots) {
            const dots = sliderDots.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlidePosition();
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlidePosition();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlidePosition();
        });
    }
    
    // Auto cycle testimonials slider (every 8 seconds)
    let autoSlider = setInterval(() => {
        if (totalSlides > 0) {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlidePosition();
        }
    }, 8000);
    
    // Reset timer on manual slider button click
    const sliderActionBtns = document.querySelectorAll('.slider-btn, .slider-dots .dot');
    sliderActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            clearInterval(autoSlider);
        });
    });


    /* ==========================================================================
       BUDGET SLIDER & CONTACT BRIEF FORM INGESTION
       ========================================================================== */
    const budgetSlider = document.getElementById('form-budget');
    const budgetValue = document.getElementById('budget-value');
    
    if (budgetSlider && budgetValue) {
        budgetSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            if (val >= 150000) {
                budgetValue.textContent = '₹1,50,000+';
            } else {
                budgetValue.textContent = `₹${val.toLocaleString('en-IN')}`;
            }
        });
    }
    
    const projectBriefForm = document.getElementById('project-brief-form');
    const formSuccessPanel = document.getElementById('form-success-panel');
    const resetFormBtn = document.getElementById('reset-form-btn');
    
    if (projectBriefForm) {
        projectBriefForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather values
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const company = document.getElementById('form-company').value;
            const msg = document.getElementById('form-message').value;
            
            const submitBtn = document.getElementById('form-submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>SENDING...</span><i class="submit-icon" style="animation: spin 1s linear infinite;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></i>';
            
            appendConsoleLog(`> Directing brief transmission to amits1417@gmail.com...`);
            
            fetch('https://formsubmit.co/ajax/amits1417@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Name: name,
                    Email: email,
                    Company: company,
                    Message: msg
                })
            })
            .then(res => res.json())
            .then(data => {
                appendConsoleLog(`> Brief packet transmission success.`);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Trigger GSAP transition to show success screen
                if (formSuccessPanel) {
                    formSuccessPanel.classList.add('active');
                }
            })
            .catch(err => {
                console.error("Form transmission error:", err);
                appendConsoleLog(`> Form packet transmission failed.`);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                alert("Brief transmission failed. Please try again or check your internet connection.");
            });
        });
    }
    
    if (resetFormBtn && projectBriefForm && formSuccessPanel) {
        resetFormBtn.addEventListener('click', () => {
            // Reset fields
            projectBriefForm.reset();
            formSuccessPanel.classList.remove('active');
        });
    }


    /* ==========================================================================
       MOBILE RESPONSIVE HAMBURGER NAVIGATION
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Force highlight tab helper
        function forceHighlightTab(targetId) {
            window.isManualScrolling = true;
            if (window.manualScrollTimeout) clearTimeout(window.manualScrollTimeout);
            window.manualScrollTimeout = setTimeout(() => {
                window.isManualScrolling = false;
            }, 1000);

            const sectionToTabMap = {
                'hero': 'hero',
                'portfolio': 'portfolio',
                'services': 'services',
                'expertise': 'experience',
                'experience': 'experience',
                'about': 'about',
                'testimonials': 'about',
                'contact': 'contact'
            };

            const mappedTarget = sectionToTabMap[targetId] || targetId;

            // Update desktop links
            document.querySelectorAll('.nav-link:not(.nav-cta)').forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const hrefId = href.substring(1);
                    if (hrefId === mappedTarget) {
                        link.classList.add('active');
                    }
                }
            });

            // Update mobile tabs
            document.querySelectorAll('.mobile-nav-tab').forEach(tab => {
                tab.classList.remove('active');
                const target = tab.getAttribute('data-target');
                if (target === mappedTarget) {
                    tab.classList.add('active');
                    tab.parentElement.scrollTo({
                        left: tab.offsetLeft - tab.parentElement.clientWidth / 2 + tab.clientWidth / 2,
                        behavior: 'smooth'
                    });
                }
            });

            // Update side scroll spy
            document.querySelectorAll('.spy-link').forEach(link => {
                link.classList.remove('active');
                const target = link.getAttribute('data-target');
                if (target === mappedTarget) {
                    link.classList.add('active');
                }
            });
        }

        // Clicking menu link closes panel
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    forceHighlightTab(href.substring(1));
                }
            });
        });
        
        // Clicking mobile tab closes hamburger panel
        document.querySelectorAll('.mobile-nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const href = tab.getAttribute('href');
                if (href && href.startsWith('#')) {
                    forceHighlightTab(href.substring(1));
                }
            });
        });

        // Delegate clicks for side scroll spy dots
        document.addEventListener('click', (e) => {
            const spyLink = e.target.closest('.spy-link');
            if (spyLink) {
                const href = spyLink.getAttribute('href');
                if (href && href.startsWith('#')) {
                    forceHighlightTab(href.substring(1));
                }
            }
        });
    }
    
    // Hover-to-scroll navigation delegation
    let hoverScrollTimeout = null;
    document.addEventListener('mouseover', (e) => {
        const link = e.target.closest('.spy-link, .nav-link:not(.nav-cta), .nav-menu a:not(.nav-cta)');
        if (link) {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSec = document.querySelector(targetId);
                if (targetSec) {
                    if (hoverScrollTimeout) clearTimeout(hoverScrollTimeout);
                    hoverScrollTimeout = setTimeout(() => {
                        targetSec.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                }
            }
        }
    });
    
    // Auto nav active updates on scrolling viewport sections
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');
    const pageSections = document.querySelectorAll('section, #experience');
    
    window.addEventListener('scroll', () => {
        if (window.isManualScrolling) return;
        let currentSec = 'hero';
        let maxOffset = -1;
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        pageSections.forEach(section => {
            if (section) {
                const secTop = section.getBoundingClientRect().top + window.scrollY;
                if (scrollPosition >= secTop && secTop > maxOffset) {
                    maxOffset = secTop;
                    currentSec = section.getAttribute('id');
                }
            }
        });

        // Activate last section if scrolled to the very bottom (more generous 150px threshold)
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 150) {
            currentSec = 'contact';
        }
        
        const sectionToTabMap = {
            'hero': 'hero',
            'portfolio': 'portfolio',
            'services': 'services',
            'expertise': 'experience',
            'experience': 'experience',
            'about': 'about',
            'testimonials': 'about',
            'contact': 'contact'
        };
        
        const activeTabTarget = sectionToTabMap[currentSec] || 'hero';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const hrefId = href.substring(1);
                if (hrefId === activeTabTarget) {
                    link.classList.add('active');
                }
            }
        });
    });

    /* ==========================================================================
       YOUTUBE & UPLOADED VIDEO MODAL OVERLAY PLAYER
       ========================================================================== */
    const videoModal = document.getElementById('video-modal');
    let modalIframe = document.getElementById('video-modal-iframe');
    const modalCloseBtn = document.getElementById('video-modal-close-btn');
    let lightboxPlayer = null;
    
    // Close video overlay player
    const closePlayer = (fromHistory = false) => {
        if (videoModal && !videoModal.classList.contains('active')) return;

        if (lightboxPlayer) {
            try {
                lightboxPlayer.destroy();
            } catch(e) {}
            lightboxPlayer = null;
        }
        
        const wrapper = videoModal.querySelector('.video-modal-iframe-wrapper');
        if (wrapper) {
            wrapper.innerHTML = '<iframe id="video-modal-iframe" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            modalIframe = document.getElementById('video-modal-iframe');
        }
        
        if (modalIframe) modalIframe.src = '';
        if (modalIframe) modalIframe.style.display = 'block';
        
        // Remove any custom media players
        if (videoModal) {
            const customVideo = videoModal.querySelector('video');
            if (customVideo) customVideo.remove();
            const customImg = videoModal.querySelector('img');
            if (customImg) customImg.remove();
            
            videoModal.className = 'video-modal-overlay';
        }
        
        wavePlaying = false;
        if (playShowreelBtn) {
            playShowreelBtn.style.backgroundColor = 'var(--accent-cyan)';
            if (playBtnIcon) {
                playBtnIcon.setAttribute('data-lucide', 'play');
                playBtnIcon.style.color = '#050505';
                playBtnIcon.style.fill = '#050505';
                lucide.createIcons({ attrs: { class: 'play-btn-icon' } });
            }
            if (playBtnLabel) playBtnLabel.textContent = 'STREAM SHOWREEL';
        }
        
        // Clear history hash if closing manually (prevents hardware back-button from breaking flow)
        if (!fromHistory && window.location.hash === '#play-video') {
            history.back();
        }
        
        appendConsoleLog(`> Playback window terminated.`);
    };

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => closePlayer(false));
    }
    
    if (videoModal) {

        let currentLightboxProjects = [];
        let currentLightboxIndex = -1;

        function isImageProject(proj) {
            return proj.category === 'graphics';
        }

        function loadProjectInLightbox(proj) {
            if (!proj) return;
            
            // Push history state to prevent mobile Back button from leaving the website
            if (window.location.hash !== '#play-video') {
                window.location.hash = 'play-video';
            }
            
            // Clean up any active hover previews
            document.querySelectorAll('.hover-video-preview').forEach(el => el.remove());
            
            // Clean up any old video/image nodes or watermarks
            const oldVideo = videoModal.querySelector('video');
            if (oldVideo) oldVideo.remove();
            const oldImg = videoModal.querySelector('img');
            if (oldImg) {
                if (currentLightboxProjects.length > 1) {
                    oldImg.style.transition = 'filter 0.2s ease, opacity 0.2s ease';
                    oldImg.style.filter = 'blur(20px)';
                    oldImg.style.opacity = '0';
                    setTimeout(() => { if (oldImg.parentNode) oldImg.remove(); }, 200);
                } else {
                    oldImg.remove();
                }
            }
            const oldWatermark = videoModal.querySelector('.modal-watermark');
            if (oldWatermark) oldWatermark.remove();
            
            modalIframe.style.display = 'none';
            modalIframe.src = '';
            
            if (lightboxPlayer) {
                try {
                    lightboxPlayer.destroy();
                } catch(e) {}
                lightboxPlayer = null;
            }

            const wrapper = videoModal.querySelector('.video-modal-iframe-wrapper');
            if (wrapper) {
                wrapper.innerHTML = '';
            }

            const isImage = isImageProject(proj);
            
            if (isImage) {
                const imgEl = document.createElement('img');
                imgEl.src = normalizeMediaPath(proj.mediaLink);
                imgEl.classList.add('lightbox-image-enter');
                if (wrapper) wrapper.appendChild(imgEl);
                
                // Apply lightbox override class
                videoModal.className = 'video-modal-overlay active is-image-lightbox';
                appendConsoleLog(`> Lightbox image active: "${proj.title}"`);
            } else {
                const targetSec = sections.find(s => s.id === proj.category);
                const targetAspectRatio = targetSec ? targetSec.aspectRatio : '16-9';
                videoModal.className = `video-modal-overlay active modal-aspect-${targetAspectRatio}`;
                
                const watermarkEl = document.createElement('div');
                watermarkEl.className = 'video-watermark modal-watermark';
                watermarkEl.textContent = 'Amit Sharma';
                
                if (proj.mediaSource === 'upload') {
                    const videoEl = document.createElement('video');
                    videoEl.id = 'lightbox-plyr-player';
                    videoEl.src = normalizeMediaPath(proj.mediaLink);
                    videoEl.controls = true;
                    videoEl.autoplay = true;
                    videoEl.playsInline = true;
                    videoEl.preload = 'auto';
                    videoEl.style.position = 'absolute';
                    videoEl.style.top = '0';
                    videoEl.style.left = '0';
                    videoEl.style.width = '100%';
                    videoEl.style.height = '100%';
                    videoEl.style.backgroundColor = '#000';
                    
                    if (wrapper) {
                        wrapper.appendChild(videoEl);
                        wrapper.appendChild(watermarkEl);
                    }
                    
                    lightboxPlayer = new Plyr('#lightbox-plyr-player', {
                        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
                        settings: ['quality'],
                        quality: { default: 1080, options: [4320, 2160, 1440, 1080, 720, 576, 480, 360, 240] }
                    });
                    
                    appendConsoleLog(`> Lightbox video active: "${proj.title}"`);
                } else {
                    const cleanId = extractYouTubeId(proj.mediaLink);
                    const iframe = document.createElement('iframe');
                    iframe.src = `https://www.youtube.com/embed/${cleanId}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&vq=hd1080`;
                    iframe.style.position = 'absolute';
                    iframe.style.top = '0';
                    iframe.style.left = '0';
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.border = 'none';
                    iframe.allowFullscreen = true;
                    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
                    
                    if (wrapper) {
                        wrapper.appendChild(iframe);
                        wrapper.appendChild(watermarkEl);
                    }
                    
                    appendConsoleLog(`> Lightbox YouTube clean native embed active: "${proj.title}"`);
                }
            }
            
            // Toggle navigation arrows visibility
            const prevBtn = document.getElementById('lightbox-prev-btn');
            const nextBtn = document.getElementById('lightbox-next-btn');
            if (prevBtn && nextBtn) {
                if (currentLightboxProjects.length > 1) {
                    prevBtn.style.display = 'flex';
                    nextBtn.style.display = 'flex';
                } else {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                }
            }

            // Populate and render the bottom gallery strip
            const galleryStrip = document.getElementById('lightbox-gallery-strip');
            if (galleryStrip) {
                if (currentLightboxProjects.length > 1) {
                    galleryStrip.style.display = 'flex';
                    galleryStrip.innerHTML = '';
                    
                    currentLightboxProjects.forEach((p, idx) => {
                        const thumbImgSrc = p.category === 'graphics' ? p.mediaLink : p.thumbLink;
                        const thumbEl = document.createElement('img');
                        thumbEl.src = normalizeMediaPath(thumbImgSrc);
                        thumbEl.className = 'lightbox-gallery-thumb' + (p.id === proj.id ? ' active' : '');
                        thumbEl.alt = p.title;
                        thumbEl.title = p.title;
                        thumbEl.addEventListener('click', (e) => {
                            e.stopPropagation();
                            currentLightboxIndex = idx;
                            loadProjectInLightbox(p);
                        });
                        galleryStrip.appendChild(thumbEl);
                    });
                    
                    // Auto scroll active thumbnail to center
                    setTimeout(() => {
                        const activeThumb = galleryStrip.querySelector('.lightbox-gallery-thumb.active');
                        if (activeThumb) {
                            activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                    }, 80);
                } else {
                    galleryStrip.style.display = 'none';
                    galleryStrip.innerHTML = '';
                }
            }
        }

        function navigateLightbox(dir) {
            if (currentLightboxProjects.length <= 1) return;
            
            currentLightboxIndex = (currentLightboxIndex + dir + currentLightboxProjects.length) % currentLightboxProjects.length;
            const nextProj = currentLightboxProjects[currentLightboxIndex];
            
            loadProjectInLightbox(nextProj);
        }

        function openLightbox(proj) {
            if (videoModal && modalIframe) {
                const cat = proj.category;
                
                // Slide/swipe gallery view should ONLY work for 'shorts' and 'graphics'
                if (cat === 'shorts' || cat === 'graphics') {
                    // Filter pool to only contain items of the same category
                    currentLightboxProjects = projects.filter(p => p.category === cat);
                    currentLightboxIndex = currentLightboxProjects.findIndex(p => p.id === proj.id);
                } else {
                    // Disable slide/swipe gallery navigation for landscape videos (long)
                    currentLightboxProjects = [];
                    currentLightboxIndex = -1;
                }
                
                loadProjectInLightbox(proj);
            }
        }

        // Wiring prev/next buttons
        const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
        const lightboxNextBtn = document.getElementById('lightbox-next-btn');
        
        if (lightboxPrevBtn) {
            lightboxPrevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navigateLightbox(-1);
            });
        }
        
        if (lightboxNextBtn) {
            lightboxNextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navigateLightbox(1);
            });
        }
        
        // Keyboard arrow controls for lightbox
        document.addEventListener('keydown', (e) => {
            if (videoModal && videoModal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    navigateLightbox(-1);
                } else if (e.key === 'ArrowRight') {
                    navigateLightbox(1);
                } else if (e.key === 'Escape') {
                    closePlayer();
                }
            }
        });

        // Click on backdrop to close
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closePlayer();
            }
        });

        // Touch swipe gestures for lightbox navigation on mobile
        let touchStartX = 0;
        let touchEndX = 0;

        videoModal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        videoModal.addEventListener('touchend', (e) => {
            // Ignore swipe gesture navigation if touching inside the thumbnail strip itself
            if (e.target.closest('#lightbox-gallery-strip')) return;
            
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, { passive: true });

        function handleSwipeGesture() {
            const swipeThreshold = 50; // min pixels to detect swipe
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left -> Next item
                navigateLightbox(1);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right -> Prev item
                navigateLightbox(-1);
            }
        }
    }

    // Unified click handler (Event Delegation)
    document.addEventListener('click', (e) => {
        // 1.2. Handle Like Buttons
        const likeBtn = e.target.closest('.project-like-btn');
        if (likeBtn) {
            e.stopPropagation();
            e.preventDefault();
            const container = likeBtn.closest('.project-like-container');
            const projId = container.getAttribute('data-project-id');
            const likedKey = `amit_portfolio_liked_${projId}`;
            const likeCountKey = `amit_portfolio_likes_${projId}`;
            const isLiked = localStorage.getItem(likedKey) === 'true';
            let likeCount = parseInt(localStorage.getItem(likeCountKey) || '0');
            
            if (isLiked) {
                localStorage.setItem(likedKey, 'false');
                likeCount = Math.max(0, likeCount - 1);
                likeBtn.classList.remove('liked');
            } else {
                localStorage.setItem(likedKey, 'true');
                likeCount = likeCount + 1;
                likeBtn.classList.add('liked');
                
                // Particle burst
                createLikeBurst(likeBtn);
            }
            localStorage.setItem(likeCountKey, likeCount);
            likeBtn.querySelector('.like-count').textContent = likeCount;
            
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        // 1. Handle edit actions (HUD buttons on overlay)
        const hudBtn = e.target.closest('.card-hud-btn');
        if (hudBtn) {
            e.stopPropagation();
            const id = hudBtn.getAttribute('data-id');
            if (hudBtn.classList.contains('btn-edit-hud')) {
                openProjectModalForEdit(id);
            } else if (hudBtn.classList.contains('btn-copy-hud')) {
                copyProject(id);
            } else if (hudBtn.classList.contains('btn-delete-hud')) {
                deleteProject(id);
            } else if (hudBtn.classList.contains('btn-move-prev')) {
                moveProject(id, 'prev');
            } else if (hudBtn.classList.contains('btn-move-next')) {
                moveProject(id, 'next');
            }
            return;
        }

        // 2. Handle card clicks (playing video / showing image inline)
        const addCardBtn = e.target.closest('.add-project-card');
        if (addCardBtn) {
            e.stopPropagation();
            e.preventDefault();
            const category = addCardBtn.getAttribute('data-category');
            openProjectModal(category);
            return;
        }
    });

    /* ==========================================================================
       STUDIO CREATOR TOGGLE & MODALS HANDLERS
       ========================================================================== */
    const studioToggleBtn = document.getElementById('studio-toggle-btn');
    const passwordLockModal = document.getElementById('password-lock-modal');
    const passwordLockForm = document.getElementById('password-lock-form');
    const passwordModalCloseBtn = document.getElementById('password-modal-close-btn');

    function activateStudioMode() {
        document.body.classList.add('editor-active');
        studioToggleBtn.classList.add('active');
        studioToggleBtn.querySelector('.studio-btn-text').textContent = "CLOSE CMS STUDIO";
        const bulkDeleteBtn = document.getElementById('studio-bulk-delete-btn');
        if (bulkDeleteBtn) bulkDeleteBtn.style.display = 'inline-flex';
        appendConsoleLog("> Local CMS Studio mode active. Use card controls to modify.");
        if (typeof window.stopAllPreviews === 'function') window.stopAllPreviews();
        renderProjects();
        renderDynamicSoftware();
        renderDynamicServices();
        // Reset text edit toggle when entering CMS mode
        isTextEditActive = false;
        var teBtn = document.getElementById('btn-toggle-text-edit');
        if (teBtn) {
            teBtn.querySelector('span').textContent = 'Enable Text Edit';
            teBtn.style.borderColor = 'var(--border-color)';
            teBtn.style.color = 'var(--text-muted)';
        }
        window.dispatchEvent(new CustomEvent('cms-mode-change', { detail: { active: true } }));
    }

    const showreelEditOverlay = document.querySelector('.showreel-edit-overlay');
    if (showreelEditOverlay) {
        showreelEditOverlay.addEventListener('click', (e) => {
            if (document.body.classList.contains('editor-active')) {
                e.preventDefault();
                e.stopPropagation();
                openProjectModalForEdit('showreel');
            }
        });
    }

    if (studioToggleBtn) {
        studioToggleBtn.addEventListener('click', () => {
            if (window.isBatchUploading) {
                alert("Upload in progress! Please wait until the upload is completed before closing CMS.");
                return;
            }
            const isActive = document.body.classList.contains('editor-active');
            if (isActive) {
                document.body.classList.remove('editor-active');
                studioToggleBtn.classList.remove('active');
                studioToggleBtn.querySelector('.studio-btn-text').textContent = "STUDIO CREATOR MODE";
                const bulkDeleteBtn = document.getElementById('studio-bulk-delete-btn');
                if (bulkDeleteBtn) bulkDeleteBtn.style.display = 'none';
                appendConsoleLog("> Local CMS Studio mode disabled.");
                renderProjects();
                renderDynamicSoftware();
                renderDynamicServices();
                window.dispatchEvent(new CustomEvent('cms-mode-change', { detail: { active: false } }));
            } else {
                activateStudioMode();
            }
        });
    }

    const bulkDeleteBtn = document.getElementById('studio-bulk-delete-btn');
    if (bulkDeleteBtn) {
        bulkDeleteBtn.addEventListener('click', () => {
            const checkedBoxes = document.querySelectorAll('.cms-delete-checkbox:checked');
            if (checkedBoxes.length === 0) {
                alert("Please select at least one project checkbox to delete.");
                return;
            }
            
            const idsToDelete = Array.from(checkedBoxes).map(cb => cb.getAttribute('data-id'));
            projects = projects.filter(p => !idsToDelete.includes(p.id));
            saveDatabase();
            renderProjects();
            appendConsoleLog(`> Bulk deleted ${idsToDelete.length} records.`);
            alert(`Successfully deleted ${idsToDelete.length} selected project(s)!`);
        });
    }

    if (passwordLockForm) {
        passwordLockForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const passInput = document.getElementById('lock-password-input');
            const inputVal = passInput ? passInput.value : '';
            const correctPass = localStorage.getItem('amit_portfolio_password') || 'DellN5010';
            
            if (inputVal === correctPass) {
                isStudioUnlocked = true;
                if (passwordLockModal) {
                    passwordLockModal.classList.remove('active');
                }
                activateStudioMode();
            } else {
                alert("Incorrect password! Access denied.");
                if (passInput) {
                    passInput.value = '';
                    passInput.focus();
                }
            }
        });
    }

    if (passwordModalCloseBtn && passwordLockModal) {
        passwordModalCloseBtn.addEventListener('click', () => {
            passwordLockModal.classList.remove('active');
        });
    }

    const consolePasswordForm = document.getElementById('console-password-form');
    if (consolePasswordForm) {
        consolePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentInput = document.getElementById('console-pass-current').value;
            const newInput = document.getElementById('console-pass-new').value;
            const correctPass = localStorage.getItem('amit_portfolio_password') || 'DellN5010';
            
            if (currentInput === correctPass) {
                if (newInput.trim() === '') {
                    alert("Password cannot be empty!");
                    return;
                }
                localStorage.setItem('amit_portfolio_password', newInput);
                alert("Password changed successfully!");
                consolePasswordForm.reset();
                appendConsoleLog("> Studio Creator password successfully updated.");
            } else {
                alert("Current password is incorrect!");
                document.getElementById('console-pass-current').value = '';
                document.getElementById('console-pass-current').focus();
            }
        });
    }

    const consoleAddSectionForm = document.getElementById('console-add-section-form');
    if (consoleAddSectionForm) {
        consoleAddSectionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('new-section-name').value.trim();
            const ratio = document.getElementById('new-section-ratio').value;
            
            if (name) {
                addSection(name, ratio);
                consoleAddSectionForm.reset();
            }
        });
    }

    // Modal cancellation/close hooks
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const modalCloseBtn2 = document.getElementById('project-modal-close-btn');
    const editorModal = document.getElementById('project-editor-modal');

    if (modalCancelBtn) modalCancelBtn.addEventListener('click', () => editorModal.classList.remove('active'));
    if (modalCloseBtn2) modalCloseBtn2.addEventListener('click', () => editorModal.classList.remove('active'));

    // File Inputs label change triggers
    const mediaFileEl = document.getElementById('modal-media-file');
    if (mediaFileEl) {
        mediaFileEl.addEventListener('change', (e) => {
            const status = document.getElementById('media-file-status');
            status.textContent = e.target.files.length > 0 ? e.target.files[0].name : 'No file chosen';
        });
    }
    
    const thumbFileEl = document.getElementById('modal-thumb-file');
    if (thumbFileEl) {
        thumbFileEl.addEventListener('change', (e) => {
            const status = document.getElementById('thumb-file-status');
            status.textContent = e.target.files.length > 0 ? e.target.files[0].name : 'No file chosen';
        });
    }

    // Project Form Ingest (with Ajax POST to /upload)
    const projectModalForm = document.getElementById('project-modal-form');
    if (projectModalForm) {
        projectModalForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const editId = document.getElementById('edit-project-id').value;
            const category = editId === 'showreel' ? 'long' : document.getElementById('modal-project-category').value;
            
            const title = document.getElementById('modal-project-title').value.trim();
            const year = '';
            
            const mediaSrc = document.getElementById('modal-media-source').value;
            const thumbSrc = document.getElementById('modal-thumb-source').value;
            
            let mediaLink = '';
            let thumbLink = '';
            
            const progressContainer = document.getElementById('modal-upload-progress-container');
            const progressBar = document.getElementById('modal-upload-progress-bar');
            const percentText = document.getElementById('upload-percent-text');
            
            try {
                // Upload Media file if source is upload
                if (mediaSrc === 'upload') {
                    const mediaFile = mediaFileEl.files[0];
                    if (mediaFile) {
                        if (category === 'graphics') {
                            progressContainer.classList.remove('hidden');
                            progressBar.style.width = '50%';
                            percentText.textContent = 'Processing image...';
                            mediaLink = await compressAndGetBase64(mediaFile);
                        } else {
                            progressContainer.classList.remove('hidden');
                            progressBar.style.width = '0%';
                            percentText.textContent = '0% (Uploading Media)';
                            
                            const isLocal = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') || window.location.origin.includes('8000');
                            if (isLocal) {
                                mediaLink = await uploadFile(mediaFile, (pct) => {
                                    progressBar.style.width = `${pct}%`;
                                    percentText.textContent = `${pct}% (Uploading Media)`;
                                });
                            } else {
                                appendConsoleLog("> Live site detected, converting media to compressed Base64.");
                                progressBar.style.width = '50%';
                                percentText.textContent = 'Compressing media...';
                                mediaLink = await compressAndGetBase64(mediaFile);
                                progressBar.style.width = '100%';
                                percentText.textContent = '100% (Completed)';
                            }
                        }
                    } else {
                        if (editId) {
                            let existing = null;
                            if (editId === 'showreel') {
                                const stored = localStorage.getItem('amit_portfolio_showreel');
                                if (stored) existing = JSON.parse(stored);
                            } else {
                                existing = projects.find(p => p.id === editId);
                            }
                            if (existing && existing.mediaSource === 'upload') {
                                mediaLink = existing.mediaLink;
                            }
                        }
                        if (!mediaLink) throw new Error("Please select a media file to upload.");
                    }
                } else {
                    mediaLink = document.getElementById('modal-media-link').value.trim();
                    if (!mediaLink) throw new Error("Please enter a media link / YouTube ID.");
                }
                
                // Upload Thumbnail file if source is upload
                if (thumbSrc === 'upload') {
                    const thumbFile = thumbFileEl.files[0];
                    if (thumbFile) {
                        progressContainer.classList.remove('hidden');
                        progressBar.style.width = '50%';
                        percentText.textContent = 'Processing thumbnail image...';
                        thumbLink = await compressAndGetBase64(thumbFile);
                    } else {
                        if (editId) {
                            let existing = null;
                            if (editId === 'showreel') {
                                const stored = localStorage.getItem('amit_portfolio_showreel');
                                if (stored) existing = JSON.parse(stored);
                            } else {
                                existing = projects.find(p => p.id === editId);
                            }
                            if (existing && existing.thumbSource === 'upload') {
                                thumbLink = existing.thumbLink;
                            }
                        }
                        if (!thumbLink) throw new Error("Please select a thumbnail image.");
                    }
                } else if (thumbSrc === 'timeline') {
                    if (timelineCapturedDataUrl) {
                        thumbLink = timelineCapturedDataUrl;
                    } else {
                        if (editId) {
                            let existing = projects.find(p => p.id === editId);
                            if (existing) thumbLink = existing.thumbLink;
                        }
                        if (!thumbLink) throw new Error("Please scrub the timeline and click 'Capture Frame' first.");
                    }
                } else {
                    thumbLink = document.getElementById('modal-thumb-link').value.trim();
                    
                    if (thumbSrc === 'auto') {
                        const cleanYtId = extractYouTubeId(mediaLink);
                        if (cleanYtId) {
                            thumbLink = await getBestYoutubeThumbnail(cleanYtId);
                        } else if (mediaSrc === 'upload') {
                            // Automatically extract thumbnail from the uploaded video file!
                            try {
                                progressContainer.classList.remove('hidden');
                                progressBar.style.width = '50%';
                                percentText.textContent = 'Extracting video thumbnail...';
                                appendConsoleLog(`> Generating thumbnail from video: ${mediaLink}`);
                                thumbLink = await generateVideoThumbnail(mediaLink);
                            } catch (err) {
                                appendConsoleLog(`> Video thumbnail extraction failed: ${err.message}`);
                            }
                        }
                    }
                    
                    // Last Priority Fallback: If no auto-thumbnail was resolved, check existing database card thumb
                    if (!thumbLink && editId) {
                        let existing = null;
                        if (editId === 'showreel') {
                            const stored = localStorage.getItem('amit_portfolio_showreel');
                            if (stored) existing = JSON.parse(stored);
                        } else {
                            existing = projects.find(p => p.id === editId);
                        }
                        if (existing) {
                            thumbLink = existing.thumbLink;
                        }
                    }
                    
                    if (!thumbLink) {
                        thumbLink = './assets/proj_design.png';
                    }
                }
                
                progressContainer.classList.add('hidden');
                
                if (editId === 'showreel') {
                    const showreelData = {
                        title: title,
                        mediaSource: mediaSrc,
                        mediaLink: mediaLink,
                        thumbSource: thumbSrc,
                        thumbLink: thumbLink
                    };
                    localStorage.setItem('amit_portfolio_showreel', JSON.stringify(showreelData));
                    appendConsoleLog(`> Updated Featured Showreel settings.`);
                    renderShowreel();
                    editorModal.classList.remove('active');
                    return;
                }

                if (editId) {
                    const projIdx = projects.findIndex(p => p.id === editId);
                    if (projIdx !== -1) {
                        projects[projIdx] = {
                            id: editId,
                            title,
                            category,
                            year,
                            mediaSource: mediaSrc,
                            mediaLink,
                            thumbSource: thumbSrc,
                            thumbLink
                        };
                        appendConsoleLog(`> Updated showcase details: "${title}"`);
                    }
                } else {
                    const newProj = {
                        id: "proj_" + Date.now(),
                        title,
                        category,
                        year,
                        mediaSource: mediaSrc,
                        mediaLink,
                        thumbSource: thumbSrc,
                        thumbLink
                    };
                    projects.push(newProj);
                    appendConsoleLog(`> Inserted new showcase details: "${title}"`);
                }
                
                saveDatabase();
                renderProjects();
                editorModal.classList.remove('active');
                
            } catch (err) {
                alert("Upload failed: " + err.message);
                progressContainer.classList.add('hidden');
            }
        });
    }

    // Toggle source options change listeners
    const mediaSrcSelect = document.getElementById('modal-media-source');
    if (mediaSrcSelect) mediaSrcSelect.addEventListener('change', toggleMediaSourceFields);
    
    const thumbSrcSelect = document.getElementById('modal-thumb-source');
    if (thumbSrcSelect) thumbSrcSelect.addEventListener('change', toggleThumbSourceFields);

    /* ==========================================================================
       DEVELOPER DATABASE HUB DRAWER
       ========================================================================== */
    const consoleDrawerTrigger = document.getElementById('console-drawer-trigger');
    const consoleDrawer = document.getElementById('studio-console-drawer');
    if (consoleDrawerTrigger && consoleDrawer) {
        consoleDrawerTrigger.addEventListener('click', () => {
            consoleDrawer.classList.toggle('open');
        });
    }

    const consoleResetBtn = document.getElementById('console-reset-btn');
    if (consoleResetBtn) {
        consoleResetBtn.addEventListener('click', () => {
            if (confirm("Reset showcase database to default portfolio settings? Current custom uploads and additions will be cleared.")) {
                projects = JSON.parse(JSON.stringify(defaultProjects));
                saveDatabase();
                renderProjects();
                appendConsoleLog("> Showcase database reset to factory configurations.");
            }
        });
    }

    const consoleExportBtn = document.getElementById('console-export-btn');
    if (consoleExportBtn) {
        consoleExportBtn.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
            const dlAnchor = document.createElement('a');
            dlAnchor.setAttribute("href", dataStr);
            dlAnchor.setAttribute("download", `portfolio_database_${new Date().toISOString().slice(0,10)}.json`);
            document.body.appendChild(dlAnchor);
            dlAnchor.click();
            dlAnchor.remove();
            appendConsoleLog("> Exported local database JSON configuration backup.");
        });
    }

    const consoleImportFile = document.getElementById('console-import-file');
    if (consoleImportFile) {
        consoleImportFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    if (Array.isArray(parsed)) {
                        projects = parsed;
                        saveDatabase();
                        renderProjects();
                        appendConsoleLog("> Imported database JSON configuration successfully.");
                        alert("Database configuration imported successfully!");
                    } else {
                        alert("Invalid file format. Import requires a JSON array.");
                    }
                } catch (err) {
                    alert("JSON parse failure: " + err.message);
                }
            };
            reader.readAsText(file);
        });
    }

    // Firebase Cloud Database Listeners
    const firebaseInputForSync = document.getElementById('console-firebase-url');
    if (firebaseInputForSync) {
        firebaseInputForSync.addEventListener('change', () => {
            let url = firebaseInputForSync.value.trim();
            if (url) {
                if (url.endsWith('/')) url = url.slice(0, -1);
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
            }
            localStorage.setItem('amit_portfolio_firebase_url', url);
            firebaseInputForSync.value = url;
            appendConsoleLog(`> Firebase Database URL saved: ${url}`);
        });
    }

    const firebaseSyncBtn = document.getElementById('console-firebase-sync-btn');
    if (firebaseSyncBtn) {
        firebaseSyncBtn.addEventListener('click', async () => {
            const DEFAULT_FIREBASE_URL = 'https://amit-portfolio-f0d71-default-rtdb.firebaseio.com';
            let url = localStorage.getItem('amit_portfolio_firebase_url') || DEFAULT_FIREBASE_URL;
            if (!url && firebaseInputForSync) {
                url = firebaseInputForSync.value.trim();
                if (url) {
                    if (url.endsWith('/')) url = url.slice(0, -1);
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        url = 'https://' + url;
                    }
                    localStorage.setItem('amit_portfolio_firebase_url', url);
                    firebaseInputForSync.value = url;
                }
            }
            
            if (url && url.endsWith('/')) {
                url = url.slice(0, -1);
            }
            
            if (!url) {
                alert("Please enter your Firebase Database URL first!");
                return;
            }
            
            firebaseSyncBtn.disabled = true;
            const originalHTML = firebaseSyncBtn.innerHTML;
            firebaseSyncBtn.innerHTML = '<span>Uploading...</span>';
            
            try {
                const pRes = await fetch(`${url}/projects.json`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(projects)
                });
                
                const sRes = await fetch(`${url}/sections.json`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sections)
                });

                const lRes = await fetch(`${url}/layout_order.json`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(layoutOrder)
                });
                
                if (pRes.ok && sRes.ok && lRes.ok) {
                    appendConsoleLog("> Showcase database synchronized to Firebase Cloud successfully!");
                    alert("Database pushed to Firebase Cloud successfully!");
                } else {
                    throw new Error("Cloud save returned error. Check database rules.");
                }
            } catch (err) {
                appendConsoleLog(`> Cloud upload error: ${err.message}`);
                alert(`Error syncing with cloud: ${err.message}\nMake sure your Firebase Realtime Database rules have ".read": true and ".write": true set!`);
            } finally {
                firebaseSyncBtn.disabled = false;
                firebaseSyncBtn.innerHTML = originalHTML;
            }
        });
    }

    function base64ToBlob(base64, mimeType) {
        const parts = base64.split(',');
        const bytes = window.atob(parts[1]);
        const ab = new ArrayBuffer(bytes.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeType });
    }

    window.isBatchUploading = false;
    window.addEventListener('beforeunload', (e) => {
        if (window.isBatchUploading) {
            e.preventDefault();
            e.returnValue = 'Upload is in progress. Leaving this page will abort the upload.';
            return e.returnValue;
        }
    });

    // Batch Graphics Upload Change Listener
    const batchFileEl = document.getElementById('console-batch-graphics-file');
    const batchStatus = document.getElementById('console-batch-status');
    if (batchFileEl && batchStatus) {
        batchFileEl.addEventListener('change', async (e) => {
            if (!document.body.classList.contains('editor-active')) {
                alert("Please unlock CMS panel with password first.");
                batchFileEl.value = '';
                return;
            }
            
            const files = Array.from(e.target.files);
            if (files.length === 0) return;
            
            window.isBatchUploading = true;
            batchFileEl.disabled = true;
            
            const progressContainer = document.getElementById('console-batch-progress-container');
            const progressBar = document.getElementById('console-batch-progress-bar');
            const percentText = document.getElementById('console-batch-percent-text');
            
            if (progressContainer && progressBar && percentText) {
                progressContainer.classList.remove('hidden');
                progressBar.style.width = '0%';
                percentText.textContent = '0%';
            }
            
            batchStatus.textContent = `Processing 0/${files.length} images...`;
            appendConsoleLog(`> Starting batch processing of ${files.length} images to Graphics section...`);
            
            let uploadedCount = 0;
            const newProjects = [];
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                try {
                    batchStatus.textContent = `Compressing ${i + 1}/${files.length} (${file.name})...`;
                    const base64Data = await compressAndGetBase64(file);
                    if (!base64Data) throw new Error("Compression failed");
                    
                    let finalUrl = base64Data;
                    const isLocal = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') || window.location.origin.includes('8000');
                    if (isLocal) {
                        try {
                            const blob = base64ToBlob(base64Data, 'image/jpeg');
                            const cleanName = file.name.replace(/\.[^/.]+$/, "") + "_" + Date.now() + "_" + i + ".jpg";
                            const compressedFile = new File([blob], cleanName, { type: 'image/jpeg' });
                            
                            batchStatus.textContent = `Uploading ${i + 1}/${files.length} (${file.name})...`;
                            finalUrl = await uploadFile(compressedFile, (percent) => {
                                if (progressBar && percentText) {
                                    const currentFilePercent = Math.round(((i + (percent / 100)) / files.length) * 100);
                                    progressBar.style.width = `${currentFilePercent}%`;
                                    percentText.textContent = `${currentFilePercent}%`;
                                }
                            });
                        } catch (uploadErr) {
                            appendConsoleLog(`> Server upload failed for "${file.name}", falling back to compressed base64.`);
                        }
                    } else {
                        // On live site (Vercel), skip upload requests completely and use compressed Base64 instantly
                        appendConsoleLog(`> Live site detected, saving compressed Base64 directly for "${file.name}".`);
                        if (progressBar && percentText) {
                            const percent = Math.round(((i + 1) / files.length) * 100);
                            progressBar.style.width = `${percent}%`;
                            percentText.textContent = `${percent}%`;
                        }
                    }
                    
                    const newProj = {
                        id: "proj_graphics_" + Date.now() + "_" + i + "_" + Math.floor(Math.random() * 100000),
                        title: file.name.replace(/\.[^/.]+$/, ""), // Strip file extension
                        category: 'graphics',
                        desc: '',
                        client: '',
                        role: '',
                        tools: '',
                        year: '',
                        mediaSource: 'upload',
                        mediaLink: finalUrl,
                        thumbSource: 'upload',
                        thumbLink: finalUrl
                    };
                    newProjects.push(newProj);
                    uploadedCount++;
                    
                    if (progressBar && percentText) {
                        const percent = Math.round(((i + 1) / files.length) * 100);
                        progressBar.style.width = `${percent}%`;
                        percentText.textContent = `${percent}%`;
                    }
                } catch (err) {
                    appendConsoleLog(`> Batch upload error on "${file.name}": ${err.message}`);
                }
            }
            
            if (newProjects.length > 0) {
                projects.push(...newProjects);
                
                batchStatus.textContent = `Syncing ${newProjects.length} images to cloud...`;
                appendConsoleLog(`> Syncing batch upload of ${newProjects.length} images to Firebase Cloud...`);
                
                try {
                    await saveDatabase();
                    renderProjects();
                    renderModalGraphicsGrid();
                    appendConsoleLog(`> Batch processed and successfully synced ${newProjects.length} images to cloud.`);
                    alert(`Successfully uploaded and saved ${newProjects.length} images!`);
                } catch (err) {
                    appendConsoleLog(`> Batch cloud sync failed: ${err.message}`);
                    alert(`Failed to sync to cloud database: ${err.message}. Please try again.`);
                }
            } else {
                alert("Upload failed. Please try a different image format.");
            }
            
            window.isBatchUploading = false;
            batchFileEl.disabled = false;
            
            setTimeout(() => {
                if (progressContainer) progressContainer.classList.add('hidden');
                batchStatus.textContent = '';
                batchFileEl.value = '';
            }, 1000);
        });
    }

    function initScrollSpy() {
        const sectionsToSpy = document.querySelectorAll('#hero, #portfolio, #experience, #about, #expertise, #services, #testimonials, #contact');
        
        window.addEventListener('scroll', () => {
            if (window.isManualScrolling) return;
            const bg = document.getElementById('parallax-timeline-bg');
            if (bg) {
                // Scroll the timeline background both horizontally and vertically for a dynamic editing software timeline feel
                bg.style.transform = `translate3d(${window.scrollY * -0.22}px, ${window.scrollY * -0.09}px, 0)`;
            }
            
            const spyLinks = document.querySelectorAll('.spy-link'); // Query dynamically to support reordered DOM links
            let currentActiveSectionId = 'hero';
            let maxOffset = -1;
            const scrollPos = window.scrollY + window.innerHeight / 3;
            
            sectionsToSpy.forEach(sec => {
                if (sec) {
                    const secTop = sec.getBoundingClientRect().top + window.scrollY;
                    if (scrollPos >= secTop && secTop > maxOffset) {
                        maxOffset = secTop;
                        currentActiveSectionId = sec.id;
                    }
                }
            });

            // Activate last section if scrolled to the very bottom (more generous 150px threshold)
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 150) {
                currentActiveSectionId = 'contact';
            }
            
            const sectionToTabMap = {
                'hero': 'hero',
                'portfolio': 'portfolio',
                'services': 'services',
                'expertise': 'about',
                'experience': 'about',
                'about': 'about',
                'testimonials': 'about',
                'contact': 'contact'
            };
            
            const activeTabTarget = sectionToTabMap[currentActiveSectionId] || 'hero';
            
            spyLinks.forEach(link => {
                const target = link.getAttribute('data-target');
                if (target === activeTabTarget) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            const mobileTabs = document.querySelectorAll('.mobile-nav-tab');
            mobileTabs.forEach(tab => {
                const target = tab.getAttribute('data-target');
                if (target === activeTabTarget) {
                    tab.classList.add('active');
                    // Smoothly center the active tab inside its scrollable parent container
                    tab.parentElement.scrollTo({
                        left: tab.offsetLeft - tab.parentElement.clientWidth / 2 + tab.clientWidth / 2,
                        behavior: 'smooth'
                    });
                } else {
                    tab.classList.remove('active');
                }
            });
            
            // Calculate scroll progress percentage for the header bar indicator
            const headerProgressBar = document.getElementById('header-scroll-progress-bar');
            if (headerProgressBar) {
                const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
                headerProgressBar.style.width = scrolled + "%";
            }
        });
    }

    function initInlineTextCMS() {
        try {
            const savedText = localStorage.getItem('amit_portfolio_cms_text');
            let textDb = {};
            if (savedText) { try { textDb = JSON.parse(savedText); } catch(e) {} }

            function isInsideCMS(el) {
                return el.closest('.project-editor-modal-overlay') || el.closest('.password-lock-modal-overlay') || el.closest('.console-logs-container') || el.closest('.studio-console-drawer') || el.closest('#loader') || el.closest('#contact');
            }

            function shouldSkip(el) {
                var t = el.tagName.toLowerCase();
                if (t === 'button') {
                    if (el.id === 'studio-toggle-btn' || el.classList.contains('hamburger') || el.closest('.hamburger') || el.classList.contains('back-to-top') || el.closest('.back-to-top') || el.classList.contains('video-modal-close') || el.classList.contains('close-btn') || el.classList.contains('lightbox-nav-btn') || el.classList.contains('console-btn') || el.closest('.filter-btn')) return true;
                }
                if (t === 'a' && el.classList.contains('social-link')) return true;
                return false;
            }

            var allTextTags = 'h1, h2, h3, h4, h5, h6, p, li, span, div, label, strong, em, b, i, u, a, button, td, th, blockquote, cite, code, pre, small, sub, sup';

            // First pass: restore saved text + attach blur listeners
            document.querySelectorAll(allTextTags).forEach(function(el, idx) {
                try {
                    if (isInsideCMS(el)) return;
                    if (shouldSkip(el)) return;
                    var key = el.getAttribute('data-cms-key');
                    if (!key) {
                        var sec = el.closest('section') || el.closest('header') || el.closest('footer') || el.closest('#hero');
                        var secId = sec ? (sec.id || 'body') : 'body';
                        key = 'cms-' + secId + '-' + el.tagName.toLowerCase() + '-' + idx;
                        el.setAttribute('data-cms-key', key);
                    }
                    if (textDb[key] !== undefined) {
                        el.innerHTML = textDb[key];
                    }
                    if (!el.dataset.cmsInitialized) {
                        el.dataset.cmsInitialized = 'true';
                        var saveTimer;
                        function doSave() {
                            if (!document.body.classList.contains('editor-active')) return;
                            try {
                                textDb[key] = el.innerHTML;
                                localStorage.setItem('amit_portfolio_cms_text', JSON.stringify(textDb));
                                appendConsoleLog('> Saved: [' + key + ']');
                            } catch(e) { console.error('save error:', e); }
                        }
                        el.addEventListener('input', function() {
                            clearTimeout(saveTimer);
                            saveTimer = setTimeout(doSave, 400);
                        });
                        el.addEventListener('blur', function() {
                            clearTimeout(saveTimer);
                            doSave();
                        });
                    }
                } catch(e) {}
            });
        } catch(e) { console.error('initInlineTextCMS error:', e); }
    }

    var isTextEditActive = false;

    // Apply contentEditable on text-edit toggle
    window.addEventListener('cms-mode-change', function() {
        var isActive = document.body.classList.contains('editor-active');
        if (!isActive) {
            isTextEditActive = false;
        }
        applyContentEditable();
    });

    function applyContentEditable() {
        var active = isTextEditActive && document.body.classList.contains('editor-active');
        try {
            var allEls = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, div, label, strong, em, b, i, u, a, button, td, th, blockquote, cite, code, pre, small, sub, sup');
            for (var i = 0; i < allEls.length; i++) {
                var el = allEls[i];
                if (el.closest('.project-editor-modal-overlay') || el.closest('.password-lock-modal-overlay') || el.closest('.console-logs-container') || el.closest('.studio-console-drawer') || el.closest('#loader') || el.closest('#contact')) continue;
                var t = el.tagName.toLowerCase();
                // Skip form elements and interactive controls - set explicit false to override parent inheritance
                if (t === 'input' || t === 'textarea' || t === 'select') { el.contentEditable = 'false'; continue; }
                if (el.closest('.form-group')) { el.contentEditable = 'false'; continue; }
                if (t === 'button' && (el.id === 'studio-toggle-btn' || el.classList.contains('hamburger') || el.closest('.hamburger') || el.classList.contains('back-to-top') || el.closest('.back-to-top') || el.classList.contains('video-modal-close') || el.classList.contains('close-btn') || el.classList.contains('lightbox-nav-btn') || el.classList.contains('console-btn') || el.closest('.filter-btn'))) continue;
                if (t === 'a' && el.classList.contains('social-link')) continue;
                el.contentEditable = active ? 'true' : 'false';
            }
        } catch(e) { console.error('contentEditable apply error:', e); }
    }

    // Listen for mobile back button navigation (hashchange) to close player overlay smoothly
    window.addEventListener('hashchange', () => {
        if (window.location.hash !== '#play-video') {
            closePlayer(true);
        }
    });

    // --- THEME SELECTOR & DARK/LIGHT MODE TOGGLE WORKFLOW ---
    
    function applyTheme(themeName) {
        document.body.className = document.body.className.split(' ').filter(c => !c.startsWith('theme-')).join(' ');
        document.body.classList.add('theme-' + themeName);
    }
    
    // Exposed globally for Firebase startup check
    window.applyTheme = applyTheme;

    // Initialize Theme on startup
    const savedTheme = localStorage.getItem('amit_portfolio_theme') || 'neon-cyber';
    applyTheme(savedTheme);
    renderRestorePointsUI();

    // --- AUTO-SAVE RESTORE POINT SYSTEM (max 4, timestamped) ---
    const MAX_RESTORE_POINTS = 4;
    const RP_KEY = 'amit_portfolio_restore_points';

    function captureRestorePoint() {
        try {
            let points = JSON.parse(localStorage.getItem(RP_KEY) || '[]');
            const lastRp = points.length > 0 ? points[points.length - 1] : null;
            const now = Date.now();
            // Throttle: skip if last point was < 10s ago
            if (lastRp && (now - lastRp.id) < 10000) return;
            const d = new Date();
            const pad = n => String(n).padStart(2, '0');
            const label = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
            const snapshot = {
                id: now,
                label: label,
                data: {
                    projects: JSON.parse(JSON.stringify(projects)),
                    sections: JSON.parse(JSON.stringify(sections)),
                    layoutOrder: JSON.parse(JSON.stringify(layoutOrder)),
                    software: JSON.parse(JSON.stringify(software)),
                    services: JSON.parse(JSON.stringify(services)),
                    education: JSON.parse(JSON.stringify(education)),
                    timeline: JSON.parse(JSON.stringify(timeline)),
                    clients: JSON.parse(JSON.stringify(clients)),
                    showreel: (() => { try { return JSON.parse(localStorage.getItem('amit_portfolio_showreel')); } catch(e) { return null; } })(),
                    theme: localStorage.getItem('amit_portfolio_theme') || 'neon-cyber',
                    customColors: localStorage.getItem('amit_portfolio_custom_colors') || null
                }
            };
            points.push(snapshot);
            if (points.length > MAX_RESTORE_POINTS) {
                points = points.slice(points.length - MAX_RESTORE_POINTS);
            }
            localStorage.setItem(RP_KEY, JSON.stringify(points));
            renderRestorePointsUI();
        } catch(e) {
            console.warn('Restore point capture failed:', e);
        }
    }

    function restoreFromPoint(pointId) {
        const points = JSON.parse(localStorage.getItem(RP_KEY) || '[]');
        const point = points.find(p => String(p.id) === String(pointId));
        if (!point) return;
        if (!confirm(`Restore snapshot from ${point.label}? Current data will be overwritten.`)) return;
        const d = point.data;
        projects.length = 0; projects.push(...d.projects);
        sections.length = 0; sections.push(...d.sections);
        layoutOrder.length = 0; layoutOrder.push(...d.layoutOrder);
        software.length = 0; software.push(...d.software);
        services.length = 0; services.push(...d.services);
        education.length = 0; education.push(...d.education);
        timeline.length = 0; timeline.push(...d.timeline);
        clients.length = 0; clients.push(...d.clients);
        if (d.showreel) localStorage.setItem('amit_portfolio_showreel', JSON.stringify(d.showreel));
        else localStorage.removeItem('amit_portfolio_showreel');
        if (d.theme) localStorage.setItem('amit_portfolio_theme', d.theme);
        if (d.customColors) localStorage.setItem('amit_portfolio_custom_colors', d.customColors);
        else localStorage.removeItem('amit_portfolio_custom_colors');
        // Mark restore points to stop auto-capture + trigger full save
        window._skipRestorePoint = true;
        saveDatabase();
        applyTheme(d.theme || 'neon-cyber');
        appendConsoleLog(`> Restored snapshot from ${point.label}.`);
    }

    function renderRestorePointsUI() {
        const container = document.getElementById('console-restore-points-list');
        if (!container) return;
        const points = JSON.parse(localStorage.getItem(RP_KEY) || '[]');
        if (points.length === 0) {
            container.innerHTML = '<span style="font-size:0.65rem;color:var(--text-muted);">No restore points yet.</span>';
            return;
        }
        container.innerHTML = points.slice().reverse().map(p => `
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;padding:6px 8px;background:rgba(255,255,255,0.02);border-radius:4px;border:1px solid rgba(255,255,255,0.04);">
                <span style="font-size:0.7rem;color:var(--text-primary);white-space:nowrap;">
                    <i data-lucide="camera" style="width:12px;height:12px;color:var(--accent-cyan);margin-right:4px;"></i>
                    ${p.label}
                </span>
                <button type="button" class="console-btn btn-secondary" data-restore-id="${p.id}" style="padding:3px 8px;font-size:0.6rem;margin:0;flex-shrink:0;">
                    <i data-lucide="rotate-ccw" style="width:10px;height:10px;"></i> Restore
                </button>
            </div>
        `).join('');
        // Attach restore listeners
        container.querySelectorAll('[data-restore-id]').forEach(btn => {
            btn.addEventListener('click', () => restoreFromPoint(btn.getAttribute('data-restore-id')));
        });
        // Re-init Lucide icons for new elements
        if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    }

    // Patch saveDatabase to auto-capture restore points
    const _origSaveDatabase = saveDatabase;
    saveDatabase = function() {
        if (!window._skipRestorePoint) {
            captureRestorePoint();
        }
        window._skipRestorePoint = false;
        return _origSaveDatabase.apply(this, arguments);
    };



    // Hex to HSL color converter helper
    function hexToHsl(hex) {
        hex = hex.replace(/^#/, '');
        let r = parseInt(hex.substring(0, 2), 16) / 255;
        let g = parseInt(hex.substring(2, 4), 16) / 255;
        let b = parseInt(hex.substring(4, 6), 16) / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    // Apply custom colors to document element style property values
    function applyCustomColors(colors) {
        if (!colors) return;
        const root = document.documentElement;
        if (colors.bgPrimary) root.style.setProperty('--bg-primary', colors.bgPrimary);
        if (colors.bgSecondary) root.style.setProperty('--bg-secondary', colors.bgSecondary);
        if (colors.textPrimary) root.style.setProperty('--text-primary', colors.textPrimary);
        if (colors.textSecondary) root.style.setProperty('--text-secondary', colors.textSecondary);
        if (colors.accentCyan) {
            root.style.setProperty('--accent-cyan', colors.accentCyan);
            const hslCyan = hexToHsl(colors.accentCyan);
            if (hslCyan) {
                root.style.setProperty('--accent-cyan-hsl', `${hslCyan.h}, ${hslCyan.s}%, ${hslCyan.l}%`);
            }
        }
        if (colors.accentPurple) root.style.setProperty('--accent-purple', colors.accentPurple);
        if (colors.gradStart) root.style.setProperty('--gradient-start', colors.gradStart);
        if (colors.gradEnd) root.style.setProperty('--gradient-end', colors.gradEnd);
        
        // Sync color picker UI inputs
        const pickers = {
            'picker-bg-primary': colors.bgPrimary,
            'picker-bg-secondary': colors.bgSecondary,
            'picker-text-primary': colors.textPrimary,
            'picker-text-secondary': colors.textSecondary,
            'picker-accent-cyan': colors.accentCyan,
            'picker-accent-purple': colors.accentPurple,
            'picker-grad-start': colors.gradStart,
            'picker-grad-end': colors.gradEnd
        };
        for (const [id, val] of Object.entries(pickers)) {
            const el = document.getElementById(id);
            if (el && val) el.value = val;
        }
    }
    
    window.applyCustomColors = applyCustomColors;

    // Initialize custom color designer logic
    function initCustomColors() {
        const applyBtn = document.getElementById('btn-apply-colors');
        const resetBtn = document.getElementById('btn-reset-colors');
        
        // Load initial colors on load
        const stored = localStorage.getItem('amit_portfolio_custom_colors');
        if (stored) {
            applyCustomColors(JSON.parse(stored));
        }

        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                const colors = {
                    bgPrimary: document.getElementById('picker-bg-primary').value,
                    bgSecondary: document.getElementById('picker-bg-secondary').value,
                    textPrimary: document.getElementById('picker-text-primary').value,
                    textSecondary: document.getElementById('picker-text-secondary').value,
                    accentCyan: document.getElementById('picker-accent-cyan').value,
                    accentPurple: document.getElementById('picker-accent-purple').value,
                    gradStart: document.getElementById('picker-grad-start').value,
                    gradEnd: document.getElementById('picker-grad-end').value
                };
                
                applyCustomColors(colors);
                localStorage.setItem('amit_portfolio_custom_colors', JSON.stringify(colors));
                pushToCloud('custom_colors', colors);
                appendConsoleLog("> Custom theme colors applied and saved to cloud.");
                alert("Custom colors applied successfully!");
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm("Reset theme colors to default preset styles?")) {
                    localStorage.removeItem('amit_portfolio_custom_colors');
                    pushToCloud('custom_colors', null);
                    appendConsoleLog("> Custom theme colors cleared. Default presets restored.");
                    alert("Colors reset to default. Reloading page...");
                    window.location.reload();
                }
            });
        }
    }

    function initClientsEditor() {
        const saveClientsBtn = document.getElementById('btn-save-clients');
        const clientsInput = document.getElementById('console-clients-input');
        
        if (saveClientsBtn && clientsInput) {
            // Set initial value in input
            clientsInput.value = clients.filter(c => c && c.trim().length > 0).join(', ');
            
            saveClientsBtn.addEventListener('click', () => {
                const rawVal = clientsInput.value;
                const newClients = rawVal.split(',').map(s => s.trim()).filter(s => s.length > 0);
                clients = newClients;
                localStorage.setItem('amit_portfolio_clients', JSON.stringify(clients));
                pushToCloud('clients', clients);
                renderClientsStrip();
                appendConsoleLog("> Trusted clients list updated and saved to cloud.");
                alert("Trusted clients list updated successfully!");
            });
        }
    }

    // Graphics gallery modal handlers
    function renderModalGraphicsGrid() {
        const modalGrid = document.getElementById('modal-graphics-grid');
        if (modalGrid) {
            const isEditorActive = document.body.classList.contains('editor-active');
            renderGridCategory(modalGrid, 'graphics', isEditorActive, '4-3');
        }
    }

    function openGraphicsGalleryModal() {
        const modal = document.getElementById('graphics-gallery-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
            renderModalGraphicsGrid();
            if (typeof lucide !== 'undefined') lucide.createIcons();
            initDragAndDropSorting();
            
            // Toggle bulk management buttons depending on edit mode state
            const isEditorActive = document.body.classList.contains('editor-active');
            const selectAllBtn = document.getElementById('modal-select-all-btn');
            const bulkDeleteBtn = document.getElementById('modal-bulk-delete-btn');
            if (selectAllBtn && bulkDeleteBtn) {
                selectAllBtn.style.display = isEditorActive ? 'inline-flex' : 'none';
                bulkDeleteBtn.style.display = isEditorActive ? 'inline-flex' : 'none';
                document.getElementById('modal-delete-count').textContent = '0';
                const selectAllText = document.getElementById('modal-select-all-text');
                if (selectAllText) selectAllText.textContent = 'Select All';
            }

            const addBtn = document.getElementById('modal-graphics-add-btn');
            if (addBtn) {
                addBtn.style.display = isEditorActive ? 'inline-flex' : 'none';
            }
            
            appendConsoleLog("> Opened Graphics Design Gallery.");
        }
    }

    function closeGraphicsGalleryModal() {
        const modal = document.getElementById('graphics-gallery-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock background scroll
            appendConsoleLog("> Closed Graphics Design Gallery.");
        }
    }

    function initGraphicsGallery() {
        const closeBtn = document.getElementById('graphics-gallery-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeGraphicsGalleryModal);
        }

        // Add Image (local file upload only — no link option) for Graphics section
        const addBtn = document.getElementById('modal-graphics-add-btn');
        const fileInput = document.getElementById('modal-graphics-file');
        if (addBtn && fileInput) {
            addBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', async (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                try {
                    appendConsoleLog("> Processing graphics image...");
                    const isLocal = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') || window.location.origin.includes('8000');
                    let mediaLink;
                    if (isLocal) {
                        mediaLink = await uploadFile(file);
                    } else {
                        mediaLink = await compressAndGetBase64(file);
                    }
                    const newProj = {
                        id: "proj_graphics_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
                        title: '',
                        category: 'graphics',
                        desc: '',
                        client: '',
                        role: '',
                        tools: '',
                        year: '',
                        mediaSource: 'upload',
                        mediaLink: mediaLink,
                        thumbSource: 'auto',
                        thumbLink: mediaLink
                    };
                    projects.push(newProj);
                    saveDatabase();
                    renderModalGraphicsGrid();
                    renderProjects();
                    appendConsoleLog("> Added new graphics image.");
                } catch (err) {
                    alert("Image upload failed: " + err.message);
                }
                fileInput.value = '';
            });
        }
        const galleryModal = document.getElementById('graphics-gallery-modal');
        if (galleryModal) {
            galleryModal.addEventListener('click', (e) => {
                if (e.target === galleryModal) {
                    closeGraphicsGalleryModal();
                }
            });
        }

        // Checkbox state tracking using event delegation on the grid
        const modalGrid = document.getElementById('modal-graphics-grid');
        if (modalGrid) {
            modalGrid.addEventListener('change', (e) => {
                if (e.target.classList.contains('cms-delete-checkbox')) {
                    const checkedCount = modalGrid.querySelectorAll('.cms-delete-checkbox:checked').length;
                    const deleteCountEl = document.getElementById('modal-delete-count');
                    if (deleteCountEl) deleteCountEl.textContent = checkedCount;
                    
                    // Toggle Select All button label
                    const allCheckboxes = modalGrid.querySelectorAll('.cms-delete-checkbox');
                    const selectAllText = document.getElementById('modal-select-all-text');
                    if (selectAllText) {
                        if (checkedCount === allCheckboxes.length && allCheckboxes.length > 0) {
                            selectAllText.textContent = 'Deselect All';
                        } else {
                            selectAllText.textContent = 'Select All';
                        }
                    }
                }
            });
        }

        // Select/Deselect All button click handler
        const selectAllBtn = document.getElementById('modal-select-all-btn');
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', () => {
                const grid = document.getElementById('modal-graphics-grid');
                if (!grid) return;
                
                const checkboxes = grid.querySelectorAll('.cms-delete-checkbox');
                const selectAllText = document.getElementById('modal-select-all-text');
                const isSelectingAll = selectAllText && selectAllText.textContent === 'Select All';
                
                checkboxes.forEach(cb => {
                    cb.checked = isSelectingAll;
                    const item = cb.closest('.portfolio-item');
                    if (item) {
                        item.classList.toggle('sortable-selected', isSelectingAll);
                    }
                });
                
                if (selectAllText) selectAllText.textContent = isSelectingAll ? 'Deselect All' : 'Select All';
                const deleteCountEl = document.getElementById('modal-delete-count');
                if (deleteCountEl) deleteCountEl.textContent = isSelectingAll ? checkboxes.length : 0;
            });
        }

        // Bulk Delete selected items click handler
        const modalBulkDeleteBtn = document.getElementById('modal-bulk-delete-btn');
        if (modalBulkDeleteBtn) {
            modalBulkDeleteBtn.addEventListener('click', () => {
                const grid = document.getElementById('modal-graphics-grid');
                if (!grid) return;
                
                const checkedBoxes = grid.querySelectorAll('.cms-delete-checkbox:checked');
                if (checkedBoxes.length === 0) {
                    alert("Please select at least one graphic checkbox to delete.");
                    return;
                }
                
                if (confirm(`Are you sure you want to delete the ${checkedBoxes.length} selected graphic(s)?`)) {
                    const idsToDelete = Array.from(checkedBoxes).map(cb => cb.getAttribute('data-id'));
                    projects = projects.filter(p => !idsToDelete.includes(p.id));
                    saveDatabase();
                    
                    renderModalGraphicsGrid();
                    renderProjects();
                    
                    const deleteCountEl = document.getElementById('modal-delete-count');
                    if (deleteCountEl) deleteCountEl.textContent = '0';
                    const selectAllText = document.getElementById('modal-select-all-text');
                    if (selectAllText) selectAllText.textContent = 'Select All';
                    
                    appendConsoleLog(`> Bulk deleted ${idsToDelete.length} graphics from within gallery modal.`);
                    alert(`Successfully deleted ${idsToDelete.length} graphic(s)!`);
                }
            });
        }
    }
    
    // Make these globally accessible so that dynamically generated elements can trigger them
    window.openGraphicsGalleryModal = openGraphicsGalleryModal;
    window.closeGraphicsGalleryModal = closeGraphicsGalleryModal;
    window.renderModalGraphicsGrid = renderModalGraphicsGrid;

    // --- BATCH YOUTUBE IMPORT (handled by standalone script in index.html) ---
    

    // Event delegation for checkbox changes to sync with SortableJS MultiDrag
    document.addEventListener('change', (e) => {
        if (e.target && e.target.classList.contains('cms-delete-checkbox')) {
            const item = e.target.closest('.portfolio-item');
            if (item) {
                if (e.target.checked) {
                    item.classList.add('sortable-selected');
                    if (typeof Sortable !== 'undefined' && Sortable.utils) {
                        try {
                            Sortable.utils.select(item);
                        } catch(err) {}
                    }
                } else {
                    item.classList.remove('sortable-selected');
                    if (typeof Sortable !== 'undefined' && Sortable.utils) {
                        try {
                            Sortable.utils.deselect(item);
                        } catch(err) {}
                    }
                }
            }
        }
    });

    initScrollSpy();
    initInlineTextCMS();
    initCustomColors();
    initClientsEditor();
    initCvDownloadAnimation();
    initGraphicsGallery();

    // Text Edit Toggle Button Handler
    var textEditBtn = document.getElementById('btn-toggle-text-edit');
    if (textEditBtn) {
        textEditBtn.addEventListener('click', function() {
            if (!document.body.classList.contains('editor-active')) return;
            isTextEditActive = !isTextEditActive;
            textEditBtn.querySelector('span').textContent = isTextEditActive ? 'Disable Text Edit' : 'Enable Text Edit';
            textEditBtn.style.borderColor = isTextEditActive ? 'var(--accent-cyan)' : 'var(--border-color)';
            textEditBtn.style.color = isTextEditActive ? 'var(--accent-cyan)' : 'var(--text-muted)';
            applyContentEditable();
            appendConsoleLog('> Inline text editing ' + (isTextEditActive ? 'enabled' : 'disabled') + '.');
        });
    }

    // Expose to window so inline script can access them
    window.extractYouTubeId = extractYouTubeId;
    window.saveDatabase = saveDatabase;
    window.renderProjects = renderProjects;
    window.appendConsoleLog = appendConsoleLog;
    Object.defineProperty(window, 'projects', {
        get: function() { return projects; },
        set: function(val) { projects = val; },
        configurable: true
    });
});
