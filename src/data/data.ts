import type { CVData } from '../types/types';

// Real CV Data - Onur Hüseyin Koçak
export const cvData: CVData = {
    personal: {
        name: "Onur Hüseyin Koçak",
        title: "Vibe Coding Specialist & AI-Assisted Developer | React Native Enthusiast",
        tagline: "From Zero to Launch in Days — Building AI-Powered Apps that Solve Real Problems",
        bio: "I turn ideas into real, revenue-generating applications—fast. Expert in vibe coding and AI-assisted development platforms, I've built and shipped multiple mobile & web apps from concept to deployment. With a unique blend of sales psychology, product thinking, and rapid development skills, I create apps that users love and businesses need. Currently expanding my React and React Native expertise to strengthen my development capabilities.",
        email: "onurhuseyinkocak1@gmail.com",
        location: "Alanya, Antalya, Turkey",
        phone: "+90 544 713 15 50",
    },

    social: [
        {
            platform: "GitHub",
            url: "https://github.com/onurhuseyinkocak",
            icon: "github"
        },
        {
            platform: "LinkedIn",
            url: "https://www.linkedin.com/in/onur-hüseyin-koçak",
            icon: "linkedin"
        },
        {
            platform: "Email",
            url: "mailto:onurhuseyinkocak1@gmail.com",
            icon: "envelope"
        }
    ],


    skills: [
        // Vibe Coding & AI-Assisted Development (Primary Expertise)
        { name: "Vibe Coding & Rapid Prototyping", category: "platforms", level: 98 },
        { name: "AI-Assisted Development", category: "platforms", level: 95 },
        { name: "Loveable AI Platform", category: "platforms", level: 92 },
        { name: "FlutterFlow", category: "platforms", level: 90 },
        { name: "Antigravity", category: "platforms", level: 90 },
        { name: "Replit Agent", category: "platforms", level: 88 },
        { name: "Bolt.new (StackBlitz)", category: "platforms", level: 88 },
        { name: "Natively", category: "platforms", level: 85 },

        // Product Development
        { name: "0-to-1 Product Building", category: "nocode", level: 95 },
        { name: "MVP Development & Launch", category: "nocode", level: 94 },
        { name: "Mobile App Publishing", category: "nocode", level: 90 },
        { name: "AI/ChatGPT Integration", category: "nocode", level: 92 },

        // Code Skills (Learning & Growing)
        { name: "React.js (Junior)", category: "development", level: 55 },
        { name: "React Native (Junior)", category: "development", level: 50 },
        { name: "JavaScript", category: "development", level: 65 },
        { name: "HTML/CSS", category: "development", level: 75 },
        { name: "TypeScript (Basic)", category: "development", level: 45 },

        // Design & Product Skills
        { name: "Figma & UI Design", category: "design", level: 85 },
        { name: "User Experience (UX)", category: "design", level: 82 },
        { name: "Product-Market Fit", category: "design", level: 88 },

        // Business & Soft Skills
        { name: "Product Strategy", category: "other", level: 92 },
        { name: "Sales Psychology", category: "other", level: 95 },
        { name: "Customer Discovery", category: "other", level: 90 },
        { name: "Rapid Execution", category: "other", level: 96 },
    ],


    projects: [
        {
            id: "1",
            title: "PathFinder",
            description: "AI-powered personal development & career guidance app",
            longDescription: "Full-stack personal development platform built with AI-assisted development tools, featuring AI-driven career guidance, financial mindset coaching, and mental resilience tracking. Successfully launched and published with integrated payment systems and user analytics.",
            category: "mobile",
            technologies: ["Loveable", "AI/ChatGPT Integration", "Payment Systems"],
            featured: true
        },
        {
            id: "2",
            title: "SassyBFF AI",
            description: "Viral-worthy AI companion with personality",
            longDescription: "Built and shipped an emotionally intelligent AI chat companion using advanced prompt engineering and vibe coding. Features real-time emotional responses, personality customization, and engaging conversation flows that keep users coming back daily.",
            category: "mobile",
            technologies: ["AI/NLP", "Vibe Coding", "Real-time Chat"],
            featured: true
        },
        {
            id: "3",
            title: "Dream Mining",
            description: "Psychology-driven dream analysis platform",
            longDescription: "Complete AI-assisted solution for dream journaling and pattern recognition. Combines structured data collection, AI-powered analysis, and psychological insights to help users understand their subconscious. Features cloud sync, dream cards, and trend visualization.",
            category: "mobile",
            technologies: ["FlutterFlow", "Data Visualization", "Cloud Sync"],
            featured: true
        },
        {
            id: "4",
            title: "Minesminis",
            description: "AI-enhanced EdTech platform for kids",
            longDescription: "Interactive English learning platform for children featuring AI chatbot teacher, gamified lessons, and multimedia content. Built entirely with AI-assisted development to deliver professional-grade educational experience with parental dashboards and progress tracking.",
            category: "web",
            technologies: ["FlutterFlow", "AI Chatbot", "Gamification"],
            featured: false
        },
        {
            id: "5",
            title: "JungleTalk",
            description: "Themed language learning app for children",
            longDescription: "Engaging English education app with jungle theme, designed using vibe coding to create interactive story-based learning experiences. Features voice recognition, animated characters, and progress rewards to keep young learners motivated.",
            category: "mobile",
            technologies: ["Natively", "Gamification", "Voice Recognition"],
            featured: false
        },
        {
            id: "6",
            title: "Promtable",
            description: "AI prompt marketplace with monetization",
            longDescription: "Built a full-featured web platform for discovering and selling AI prompts. Includes user authentication, payment processing, prompt categories, and search functionality - all created with vibe coding to validate the business idea quickly.",
            category: "web",
            technologies: ["Bolt.new", "Payment Integration", "Rapid MVP"],
            featured: false
        }
    ],

    experience: [
        {
            id: "1",
            company: "Independent Projects",
            role: "Vibe Coding Specialist & AI-Assisted Developer",
            startDate: "2025-01",
            description: "Building and shipping revenue-ready mobile & web apps using vibe coding and AI-assisted platforms",
            achievements: [
                "Built and published 6+ complete applications from zero to production using AI-assisted development",
                "Reduced time-to-market by 10x using vibe coding - launching MVPs in days, not months",
                "Integrated AI/ChatGPT, payment systems, and cloud databases with modern development platforms",
                "Validated multiple business ideas through rapid prototyping and user feedback loops"
            ]
        },
        {
            id: "2",
            company: "Sadullahoğlu Alanya Arçelik",
            role: "Sales Specialist",
            startDate: "2023-04",
            description: "Managing customer relationships and in-store sales operations",
            achievements: [
                "Providing product consulting based on customer needs",
                "Applying sales strategies to improve customer satisfaction and conversion",
                "Managing customer relationships effectively"
            ]
        },
        {
            id: "3",
            company: "Pozitera Perakende Geliştirme Hizmetleri",
            role: "Sales Responsible",
            startDate: "2022-12",
            endDate: "2023-04",
            description: "Managing sales operations and retail performance in Antalya",
            achievements: [
                "Supporting store development and customer engagement strategies",
                "Managing retail performance metrics",
                "Improving customer satisfaction levels"
            ]
        },
        {
            id: "4",
            company: "Vatan Bilgisayar",
            role: "Sales Consultant",
            startDate: "2022-03",
            endDate: "2022-12",
            description: "Advising customers on technology products",
            achievements: [
                "Supporting sales targets and customer satisfaction",
                "Providing expert consultation on technology products",
                "Building strong customer relationships"
            ]
        },
        {
            id: "5",
            company: "Decathlon Turkey",
            role: "Sports Leader",
            startDate: "2017-09",
            endDate: "2020-11",
            description: "Leading department operations and customer experience",
            achievements: [
                "Managing product presentation and sales performance",
                "Leading team operations effectively",
                "Enhancing customer experience in sports department"
            ]
        },
        {
            id: "6",
            company: "Budak Turizm",
            role: "Operational Specialist",
            startDate: "2019-09",
            endDate: "2020-01",
            description: "Supporting operational planning and coordination in Antalya",
            achievements: [
                "Assisting with daily operational processes",
                "Supporting operational planning initiatives",
                "Improving operational efficiency"
            ]
        }
    ],

    certificates: [
        {
            id: "1",
            title: "Google UX Design Professional Certificate",
            issuer: "Google / Coursera",
            date: "June 2024",
            credentialUrl: "https://coursera.org/share/32a3b220aaeb8b984646a5296d79a171",
            image: `${import.meta.env.BASE_URL}certificates/google-ux-design.jpg`
        },
        {
            id: "2",
            title: "Associate Degree in Computer Programming",
            issuer: "Anadolu University - Open Education Faculty",
            date: "January 2025",
            image: `${import.meta.env.BASE_URL}certificates/anadolu-diploma.jpg`
        },
        {
            id: "3",
            title: "Mobile Frontend Software Expertise Training",
            issuer: "Siliconmade Academy / ICCW Certified",
            date: "March 2025",
            credentialUrl: "https://iccw.us/iccw/admin/view-certificate/59440/21",
            image: `${import.meta.env.BASE_URL}certificates/mobile-frontend-iccw.jpg`
        },
        {
            id: "4",
            title: "Mobile Frontend Training Certificate",
            issuer: "Siliconmade Academy",
            date: "March 2025",
            image: `${import.meta.env.BASE_URL}certificates/mobile-frontend-siliconmade.jpg`
        },
        {
            id: "5",
            title: "Fundamentals of Programming Training",
            issuer: "Siliconmade Academy",
            date: "October 2024",
            image: `${import.meta.env.BASE_URL}certificates/fundamentals-programming.jpg`
        },
        {
            id: "6",
            title: "İş Bankası ProSchool IT Class",
            issuer: "TopTalent Business School / Türkiye İş Bankası",
            date: "December 2022",
            credentialUrl: "https://toptalent.co/businessschool/verify/73612CCE2D-73612BE302-73435EA50D/",
            image: `${import.meta.env.BASE_URL}certificates/toptalent-it-class.jpg`
        },
        {
            id: "7",
            title: "English Proficiency Test - Advanced CEFR C1",
            issuer: "TopTalent Business School",
            date: "July 2022",
            credentialUrl: "https://toptalent.co/businessschool/verify/735B36ED89-735B36C48A-73435EA50D/",
            image: `${import.meta.env.BASE_URL}certificates/toptalent-english-c1.jpg`
        },
        {
            id: "8",
            title: "Mobile Frontend Software Expertise Certificate - 184 Hours",
            issuer: "Mudanya University - MUDUSEM",
            date: "March 2025",
            image: `${import.meta.env.BASE_URL}certificates/mudanya-mobile-frontend.jpg`
        }
    ]
};
