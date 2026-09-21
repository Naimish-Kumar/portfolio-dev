const pool = require('../config/db');

async function seedAcroCoderData() {
  console.log('Seeding exact AcroCoder profile, projects, packages, and experience into MySQL...');
  const conn = await pool.getConnection();

  try {
    // 1. Update Profile
    await conn.query(`
      UPDATE profile SET
        full_name = 'Akash Verma',
        headline = 'Software Engineer | Java & Mobile Systems Developer',
        bio = 'Software Engineer with 7+ years of overall experience bridging hardware and software systems, including 3 years of dedicated Java enterprise development. Proven expertise in developing production-ready, cross-platform mobile applications integrated with IoT hardware, microservices, and real-time backend services. Skilled in firmware-to-cloud communication, IoT protocols (MQTT, BLE), and system-level performance optimization.',
        about_text = 'Software Engineer with 7+ years of overall experience bridging hardware and software systems, including 3 years of dedicated Java enterprise development. Proven expertise in developing production-ready, cross-platform mobile applications integrated with IoT hardware, microservices, and real-time backend services. Skilled in firmware-to-cloud communication, IoT protocols (MQTT, BLE), and system-level performance optimization.',
        avatar_url = '/naimish_portrait.png',
        resume_url = 'https://acrocoder.com/resume.pdf',
        email = 'akash@spirehubs.com',
        phone = '+91 9718598938',
        location = 'Noida, India',
        available_for_hire = TRUE,
        years_experience = 7,
        projects_completed = 30,
        github_url = NULL,
        linkedin_url = NULL,
        twitter_url = NULL
      WHERE id = 1
    `);

    // 2. Update Hero Settings
    await conn.query(`
      UPDATE hero_settings SET
        greeting = 'Software Engineer | Java & Mobile Systems',
        headline = 'Bridging Hardware & Enterprise Software Systems',
        subheadline = 'Engineering scalable Java 17/21 microservices, cross-platform mobile apps with Flutter, and real-time IoT firmware-to-cloud pipelines.',
        typing_strings_json = ?,
        primary_button_text = 'Explore Applications',
        primary_button_link = '#work',
        secondary_button_text = 'Initiate Contact',
        secondary_button_link = '#contact',
        badge_text = 'Senior Software Engineer @ SpireHub Softwares'
      WHERE id = 1
    `, [
      JSON.stringify([
        '7+ Years Systems & Software Engineer',
        'Java 17/21 & Spring Boot Microservices',
        'Flutter & Android Mobile Architectures',
        'IoT Telemetry, MQTT & BLE Protocols',
        'High-Throughput Kafka & Redis Streaming'
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
      ['Java 17/21 & Spring Boot', 'Enterprise Backend', 96, 'Server', 1, true],
      ['Spring Cloud, Security & JWT', 'Microservices & Security', 94, 'ShieldCheck', 2, true],
      ['Flutter & Dart (BLoC / Provider)', 'Core Mobile', 98, 'Smartphone', 3, true],
      ['Android Native & Systems Dev', 'Core Mobile', 92, 'Smartphone', 4, true],
      ['MQTT & BLE Hardware Protocols', 'IoT & Hardware Systems', 95, 'Cpu', 5, true],
      ['IoT Telemetry & Ingestion', 'IoT & Hardware Systems', 93, 'Activity', 6, true],
      ['Apache Kafka & Redis Streaming', 'Event Streaming', 92, 'Activity', 7, true],
      ['PostgreSQL & MySQL / Hibernate', 'Databases', 94, 'Database', 8, true],
      ['Docker & Microservices Architecture', 'DevOps & Cloud', 91, 'Cloud', 9, true],
      ['Node.js, Express & WebSockets', 'Backend & Real-Time', 90, 'Globe', 10, true],
    ];

    for (const s of skills) {
      await conn.query(
        'INSERT INTO skills (name, category, proficiency, icon, display_order, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
        s
      );
    }

    // 5. Update Experience (SpireHub, Enterprise Software Solutions, TechSmart Mobile Systems)
    await conn.query('DELETE FROM experience');
    const experiences = [
      [
        'SpireHub Softwares Pvt Ltd',
        'Senior Software Engineer',
        'Noida, India',
        'Full-time',
        '2023-06-01',
        null,
        true,
        'Spearheaded development of cross-platform mobile applications (Flutter/Android) communicating with custom IoT hardware via BLE and MQTT protocols.\\nArchitected microservices using Java 17/21 and Spring Boot, optimizing data processing pipelines that reduced latency by 35% for real-time sensor streams.\\nDesigned and maintained firmware-to-cloud communication interfaces, handling device authentication, telemetry ingestion, and OTA update dispatching.\\nImplemented real-time bidirectional communication channels using WebSockets and Socket.IO for live device control dashboards.\\nMentored junior engineers and led code reviews to maintain code quality, test coverage, and documentation standards.',
        JSON.stringify(['Java 17/21', 'Spring Boot', 'Flutter', 'Android', 'BLE', 'MQTT', 'Microservices', 'WebSockets', 'Docker']),
        1
      ],
      [
        'Enterprise Software Solutions',
        'Java Enterprise Developer',
        'Noida, India',
        'Full-time',
        '2020-05-01',
        '2023-05-01',
        false,
        'Engineered core enterprise backend services utilizing Java, Spring Boot, Hibernate/JPA, and PostgreSQL/MySQL databases.\\nBuilt and maintained RESTful APIs powering high-traffic web applications, processing 2M+ daily requests with 99.9% uptime.\\nIntegrated message-driven architectures using Apache Kafka and Redis for asynchronous task queuing and distributed caching.\\nImplemented role-based access control (RBAC), OAuth2, and JWT authentication across distributed microservices.\\nContainerized backend applications with Docker and automated deployment workflows through CI/CD pipelines.',
        JSON.stringify(['Java', 'Spring Boot', 'Hibernate/JPA', 'PostgreSQL', 'MySQL', 'Apache Kafka', 'Redis', 'OAuth2', 'JWT', 'Docker']),
        2
      ],
      [
        'TechSmart Mobile Systems',
        'Associate Software Engineer — Mobile & Systems',
        'Noida, India',
        'Full-time',
        '2017-06-01',
        '2020-04-01',
        false,
        'Developed hybrid and native mobile application modules for Android and cross-platform frameworks.\\nIntegrated backend APIs and local persistence layers (SQLite, Room, Shared Preferences) ensuring offline-first user experiences.\\nImplemented Bluetooth / serial communication protocols for companion device connectivity and data synchronization.\\nCollaborated with UI/UX teams to build responsive, accessible layouts and smooth, jitter-free user interaction flows.\\nAssisted in debugging, bug fixes, automated unit testing, and release cycle preparation.',
        JSON.stringify(['Android', 'Flutter', 'Java', 'SQLite', 'Bluetooth', 'REST APIs', 'Offline-First', 'Git']),
        3
      ]
    ];

    for (const exp of experiences) {
      await conn.query(`
        INSERT INTO experience (company, role, location, employment_type, start_date, end_date, is_current, description, skills_used_json, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, exp);
    }

    // 6. Update Education (2013 – 2017)
    await conn.query('DELETE FROM education');
    await conn.query(`
      INSERT INTO education (institution, degree, field_of_study, start_year, end_year, grade, description, display_order)
      VALUES
      ('Galgotias University', 'B.Tech in Computer Science & Engineering', 'Computer Science & Software Systems', '2013', '2017', 'First Class with Distinction', 'Core coursework in Data Structures & Algorithms, Object-Oriented Programming (Java), Operating Systems, Computer Networks, Database Management Systems, and Software Engineering.', 1)
    `);

    // 7. Update Site Settings
    await conn.query(`
      INSERT INTO site_settings (setting_key, setting_value) VALUES
      ('site_title', 'Akash Verma — Software Engineer | Java & Mobile Systems Developer'),
      ('site_description', 'Official portfolio of Akash Verma - Software Engineer with 7+ years of experience bridging hardware & software systems, Java enterprise microservices, and Flutter mobile architectures.'),
      ('accent_color', '#06b6d4'),
      ('enable_contact_form', 'true'),
      ('enable_projects_section', 'true'),
      ('enable_skills_section', 'true'),
      ('enable_experience_section', 'true'),
      ('enable_education_section', 'true'),
      ('footer_text', '© 2026 AKASH VERMA — SOFTWARE ENGINEER | JAVA & MOBILE SYSTEMS DEVELOPER. ALL RIGHTS RESERVED.')
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
