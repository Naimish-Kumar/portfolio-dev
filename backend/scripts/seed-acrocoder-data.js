const pool = require('../config/db');

async function seedAcroCoderData() {
  console.log('Seeding exact AcroCoder profile, projects, packages, and experience into MySQL...');
  const conn = await pool.getConnection();

  try {
    // 1. Update Profile
    await conn.query(`
      UPDATE profile SET
        full_name = 'Naimish Kumar Verma',
        headline = 'Senior Software Architect & Flutter Team Lead | 7+ Years Exp | Java Spring Boot & AI MCP Integrations',
        bio = 'Software Architect & Flutter Team Lead with 7+ years of engineering experience architecting scalable cross-platform mobile systems and enterprise backend services. Expert in Flutter/Dart, 3+ years of enterprise Java Spring Boot microservices, Clean Architecture, BLoC, real-time WebRTC/Socket.IO pipelines, and cutting-edge AI integrations including Model Context Protocol (MCP) agents.',
        about_text = 'Senior Software Architect & Flutter Team Lead at Spirehub Software Pvt Ltd with 7+ years of engineering experience architecting scalable cross-platform mobile systems for iOS and Android as well as enterprise Java Spring Boot backends. Expert in Clean Architecture, BLoC state management, team leadership, 3+ years of enterprise Java Spring Boot microservices, real-time WebRTC/Socket.IO features, and Model Context Protocol (MCP) AI agent integrations. Proven track record of leading development teams to ship production apps serving over 100K+ active users with 99.9% reliability.',
        avatar_url = '/naimish_portrait.png',
        resume_url = 'https://acrocoder.com/resume.pdf',
        email = 'acrocoader@gmail.com',
        phone = '+91 9876543210',
        location = 'India / Remote',
        available_for_hire = TRUE,
        years_experience = 7,
        projects_completed = 30,
        github_url = 'https://github.com/Naimish-Kumar',
        linkedin_url = 'https://linkedin.com/in/naimish-kumar-verma',
        twitter_url = 'https://twitter.com/acrocoder'
      WHERE id = 1
    `);

    // 2. Update Hero Settings
    await conn.query(`
      UPDATE hero_settings SET
        greeting = 'Senior Software Architect & Mobile Lead',
        headline = 'Architecting High-Performance Mobile, Spring Boot & AI Agent Systems',
        subheadline = 'Engineering 60fps cross-platform mobile apps, Java Spring Boot microservices, and autonomous Model Context Protocol (MCP) AI integrations with enterprise reliability.',
        typing_strings_json = ?,
        primary_button_text = 'Explore Applications',
        primary_button_link = '#work',
        secondary_button_text = 'Initiate Contact',
        secondary_button_link = '#contact',
        badge_text = 'Senior Architect & Flutter Team Lead @ Spirehub'
      WHERE id = 1
    `, [
      JSON.stringify([
        '7+ Years Senior Full-Stack Lead',
        'Java 21 Spring Boot Microservices',
        'AI Agents & Model Context Protocol (MCP)',
        'Flutter Lead • Sub-16ms 60fps',
        'Clean Architecture & Cloud Systems'
      ])
    ]);

    // 3. Update Projects & Shipped Apps
    await conn.query('DELETE FROM projects');
    const projects = [
      [
        'Congo Bon Marché - E-Commerce & Marketplace Ecosystem',
        'congobonmarche-ecommerce',
        'Premier multi-vendor e-commerce marketplace and logistics platform in Central Africa with mobile apps for iOS & Android.',
        'End-to-end multi-vendor e-commerce ecosystem designed for DRC and Central Africa. Features high-performance web storefront, native iOS & Android applications built with Flutter, multi-currency wallet support, Mobile Money (Airtel/Orange Money) payment gateways, real-time push order dispatch, and seller analytics dashboard.',
        'Mobile & Web E-Commerce',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
        'https://congobonmarche.com',
        'https://apps.apple.com/in/app/congobonmarch%C3%A9-app/id6443672495',
        JSON.stringify(['Flutter', 'iOS App', 'Android App', 'Java Spring Boot', 'E-Commerce', 'Mobile Money']),
        true,
        1
      ],
      [
        'DarziDesk - Boutique & Custom Tailoring Management SaaS',
        'darzidesk-boutique-saas',
        'Cloud-based bespoke tailoring ERP & boutique management platform with automated measurement profiles, work orders, and WhatsApp notifications.',
        'Comprehensive SaaS platform built for fashion designers, bespoke tailors, and boutique studios. Streamlines client body measurement profiles, custom stitching work orders, fabric inventory tracking, automated invoice generation, and real-time WhatsApp delivery notifications with sub-100ms response times.',
        'Production SaaS',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
        'https://darzidesk.shop',
        'https://darzidesk.shop',
        JSON.stringify(['Next.js 14', 'Java Spring Boot', 'MySQL', 'Tailwind CSS', 'SaaS', 'ERP']),
        true,
        2
      ],
      [
        'Spacebliz - Creative Digital Agency & Software Platform',
        'spacebliz-digital-agency',
        'High-performance digital agency platform featuring 3D interactive interfaces, modern full-stack architectures, and AI cloud engineering.',
        'Dynamic high-performance agency portal and software engineering platform showcasing bespoke digital product development, interactive 3D WebGL interfaces, cloud native infrastructure, and enterprise AI integrations with 99+ Lighthouse performance scores.',
        'Creative Tech & Agency',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        'https://spacebliz.com',
        'https://spacebliz.com',
        JSON.stringify(['React', 'Next.js', 'Three.js 3D', 'Java Spring Boot', 'Cloud Architecture', 'AI MCP']),
        true,
        3
      ],
      [
        'HomiQ Real-Estate Marketplace',
        'homiq-real-estate',
        'Direct real estate & rental marketplace connecting owners, buyers, and renters with zero brokerage fees, verified listings, and smart search.',
        'Production real-estate marketplace serving thousands of active buyers and renters. Features interactive maps, instant chat, mortgage estimation, and verified identity workflows.',
        'Shipped App',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://apps.apple.com/in/app/homiq-real-estate-marketplace/id6779412636',
        'https://play.google.com/store/apps/details?id=com.homiq.acrocoder&hl=en_IN',
        JSON.stringify(['Flutter', 'iOS', 'Android', 'Java Spring Boot', 'Real Estate', 'Google Maps']),
        true,
        4
      ],
      [
        'Healthosyst Healthcare Platform',
        'healthosyst-telemedicine',
        'Comprehensive telemedicine app allowing patients to discover doctors, book appointments, and consult via encrypted video.',
        'Enterprise healthcare suite featuring encrypted WebRTC video consultations, electronic health records (EHR), prescription management, and appointment queuing.',
        'Shipped App',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        'https://apps.apple.com/in/app/healthosyst/id6702022061',
        'https://play.google.com/store/apps/details?id=com.healthosyst.app',
        JSON.stringify(['Flutter', 'WebRTC', 'Telemedicine', 'Java Spring Boot', 'iOS', 'Android']),
        true,
        5
      ],
      [
        'Coach-By-App Fitness Suite',
        'coach-by-app-fitness',
        'Live fitness coaching platform featuring automated workout plans, live trainer chat via Socket.IO, and recurring subscriptions.',
        'Real-time fitness tracking and coaching app with live trainer messaging via Socket.IO, automated workout routine scheduling, and in-app subscription billing.',
        'Shipped App',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        'https://apps.apple.com/in/app/coach-by-app/id6467117400',
        'https://play.google.com/store/apps/details?id=com.coachbyapp.app',
        JSON.stringify(['Flutter', 'Socket.IO', 'Stripe', 'Java Microservices', 'iOS', 'Android']),
        true,
        6
      ],
      [
        'DoodleJoy - Creative Canvas Web & Mobile App',
        'doodlejoy-canvas',
        'Interactive web & mobile drawing application for kids featuring magic brushes, smooth canvas rendering, and secure sharing.',
        'Interactive drawing application for web and mobile featuring sub-16ms custom canvas rendering, glow shaders, multi-touch brush engines, and cloud galleries.',
        'Shipped App',
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
        'https://doodlejoy.fun/',
        'https://play.google.com/store/apps/details?id=com.acrocoder.doodlejoy&hl=en_IN',
        JSON.stringify(['Flutter', 'Canvas 60fps', 'Web', 'Android', 'Clean Architecture', 'BLoC']),
        true,
        7
      ]
    ];

    for (const p of projects) {
      await conn.query(`
        INSERT INTO projects (title, slug, short_description, long_description, category, image_url, live_url, github_url, tags_json, is_featured, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, p);
    }

    // 4. Update Skills
    await conn.query('DELETE FROM skills');
    const skills = [
      ['Java 21 & Spring Boot 3', 'Enterprise Backend', 96, 'Server', 1, true],
      ['Model Context Protocol (MCP) & AI', 'AI & Agentic Systems', 95, 'Sparkles', 2, true],
      ['Flutter & Dart (60FPS BLoC)', 'Core Mobile', 98, 'Smartphone', 3, true],
      ['Spring Security & OAuth2 / JWT', 'Security & Microservices', 94, 'ShieldCheck', 4, true],
      ['Next.js 14 / React 19 & TypeScript', 'Fullstack Web', 96, 'Globe', 5, true],
      ['PostgreSQL & MySQL / JPA Hibernate', 'Databases', 94, 'Database', 6, true],
      ['Apache Kafka & Redis Streaming', 'Event Streaming', 90, 'Activity', 7, true],
      ['Three.js & 3D WebGL Shaders', '3D Graphics', 92, 'Cpu', 8, true],
      ['Docker, K8s & CI/CD Pipelines', 'DevOps & Cloud', 91, 'Cloud', 9, true],
      ['WebRTC & Socket.IO Realtime', 'Realtime Media', 93, 'Video', 10, true],
    ];

    for (const s of skills) {
      await conn.query(
        'INSERT INTO skills (name, category, proficiency, icon, display_order, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
        s
      );
    }

    // 5. Update Experience (7 Years Total: 3 Years Java @ Spirehub, 2+ Years Flutter @ Spirehub, Flutter Lead @ Spirehub)
    await conn.query('DELETE FROM experience');
    const experiences = [
      [
        'Spirehub Software Pvt Ltd',
        'Flutter Team Lead & Senior Full-Stack Architect',
        'Lucknow, India / Remote',
        'Full-time',
        '2024-06-01',
        null,
        true,
        'Leading cross-platform mobile and backend engineering teams, architecting Flutter apps and Java Spring Boot microservices, building AI agent workflows with Model Context Protocol (MCP) servers, mentoring developers, and managing CI/CD automated deployments.',
        JSON.stringify(['Flutter', 'Java Spring Boot', 'Model Context Protocol (MCP)', 'AI Agents', 'BLoC', 'Docker', 'CI/CD']),
        1
      ],
      [
        'Spirehub Software Pvt Ltd',
        'Senior Flutter & Full-Stack Developer',
        'Lucknow, India',
        'Full-time',
        '2022-10-01',
        '2024-06-01',
        false,
        'Architected and deployed 6+ production mobile applications for iOS and Android with sub-16ms 60fps rendering. Integrated payment gateways, optimized rendering engines, implemented real-time Socket.IO/WebRTC pipelines, and built high-performance backends.',
        JSON.stringify(['Flutter', 'Dart', 'Clean Architecture', 'BLoC', 'WebSockets', 'Payment Gateways', 'iOS/Android']),
        2
      ],
      [
        'Spirehub Software Pvt Ltd',
        'Java / Spring Boot Developer',
        'Lucknow, India',
        'Full-time',
        '2019-07-01',
        '2022-10-01',
        false,
        'Engineered 3 years of enterprise Java Spring Boot backend microservices with Spring Security, Hibernate/JPA, PostgreSQL, MySQL, Redis caching, and Kafka event streaming. Built scalable RESTful APIs powering high-traffic enterprise platforms and mobile backends.',
        JSON.stringify(['Java 21', 'Spring Boot', 'Spring Security', 'Hibernate/JPA', 'PostgreSQL', 'MySQL', 'Kafka', 'Redis', 'Microservices', 'REST APIs']),
        3
      ]
    ];

    for (const exp of experiences) {
      await conn.query(`
        INSERT INTO experience (company, role, location, employment_type, start_date, end_date, is_current, description, skills_used_json, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, exp);
    }

    // 6. Update Education (2015 – 2019)
    await conn.query('DELETE FROM education');
    await conn.query(`
      INSERT INTO education (institution, degree, field_of_study, start_year, end_year, grade, description, display_order)
      VALUES
      ('Galgotias University', 'B.Tech in Computer Science & Engineering', 'Cloud Computing & Distributed Systems', '2015', '2019', 'First Class with Distinction', 'Core coursework in Algorithms, Distributed Systems, Software Engineering, Database Systems, and Cloud Computing. Capstone Project: Secure Multi-Tenant Cloud Storage Engine with End-to-End Encryption.', 1)
    `);

    // 7. Update Site Settings
    await conn.query(`
      INSERT INTO site_settings (setting_key, setting_value) VALUES
      ('site_title', 'Naimish Kumar Verma — Senior Mobile Engineer & Flutter Specialist'),
      ('site_description', 'Official portfolio of Naimish Kumar Verma - Flutter Team Lead at Spirehub Software, Senior Mobile Engineer, and Open Source Creator.'),
      ('accent_color', '#06b6d4'),
      ('enable_contact_form', 'true'),
      ('enable_projects_section', 'true'),
      ('enable_skills_section', 'true'),
      ('enable_experience_section', 'true'),
      ('enable_education_section', 'true'),
      ('footer_text', '© 2026 NAIMISH KUMAR VERMA — SENIOR FLUTTER ENGINEER & TEAM LEAD. ALL RIGHTS RESERVED.')
      ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
    `);

    console.log('Successfully seeded authentic AcroCoder data into MySQL!');
  } catch (err) {
    console.error('Error seeding data:', err);
    throw err;
  } finally {
    conn.release();
  }
}

seedAcroCoderData()
  .then(() => {
    console.log('Seeder completed.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeder failed:', err);
    process.exit(1);
  });
