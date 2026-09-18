const pool = require('../config/db');
const bcrypt = require('bcryptjs');

async function initDB() {
  console.log('Connecting to MySQL database and initializing tables...');
  const conn = await pool.getConnection();

  try {
    // 1. Admins Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Profile Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id INT PRIMARY KEY DEFAULT 1,
        full_name VARCHAR(150) NOT NULL,
        headline VARCHAR(255) NOT NULL,
        bio TEXT,
        about_text TEXT,
        avatar_url TEXT,
        resume_url TEXT,
        email VARCHAR(255),
        phone VARCHAR(50),
        location VARCHAR(100),
        available_for_hire BOOLEAN DEFAULT TRUE,
        years_experience INT DEFAULT 3,
        projects_completed INT DEFAULT 25,
        github_url VARCHAR(255),
        linkedin_url VARCHAR(255),
        twitter_url VARCHAR(255),
        youtube_url VARCHAR(255),
        instagram_url VARCHAR(255),
        custom_links_json JSON,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Hero Settings Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS hero_settings (
        id INT PRIMARY KEY DEFAULT 1,
        greeting VARCHAR(100) DEFAULT 'Hello World, I am',
        headline VARCHAR(255) DEFAULT 'Building Scalable Fullstack & Cloud Solutions',
        subheadline TEXT,
        typing_strings_json JSON,
        primary_button_text VARCHAR(100) DEFAULT 'Explore Projects',
        primary_button_link VARCHAR(255) DEFAULT '#projects',
        secondary_button_text VARCHAR(100) DEFAULT 'Get in Touch',
        secondary_button_link VARCHAR(255) DEFAULT '#contact',
        badge_text VARCHAR(100) DEFAULT 'Available for new opportunities',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 4. Skills Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL DEFAULT 'Frontend',
        proficiency INT NOT NULL DEFAULT 85,
        icon VARCHAR(100),
        display_order INT DEFAULT 0,
        is_featured BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 5. Projects Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(200) NOT NULL UNIQUE,
        short_description TEXT NOT NULL,
        long_description LONGTEXT,
        category VARCHAR(100) NOT NULL DEFAULT 'Fullstack',
        image_url TEXT,
        live_url VARCHAR(255),
        github_url VARCHAR(255),
        tags_json JSON,
        is_featured BOOLEAN DEFAULT TRUE,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 6. Experience Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS experience (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company VARCHAR(150) NOT NULL,
        role VARCHAR(150) NOT NULL,
        location VARCHAR(100),
        employment_type VARCHAR(50) DEFAULT 'Full-time',
        start_date VARCHAR(50) NOT NULL,
        end_date VARCHAR(50),
        is_current BOOLEAN DEFAULT FALSE,
        description TEXT,
        skills_used_json JSON,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 7. Education Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        institution VARCHAR(200) NOT NULL,
        degree VARCHAR(150) NOT NULL,
        field_of_study VARCHAR(150),
        start_year VARCHAR(50),
        end_year VARCHAR(50),
        grade VARCHAR(50),
        description TEXT,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 8. Messages / Contact Inbox Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        ip_address VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 9. Site Settings Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log('Tables verified and created successfully.');

    // Seed default Admin if not exists
    const [existingAdmins] = await conn.query('SELECT id FROM admins LIMIT 1');
    if (existingAdmins.length === 0) {
      const defaultPasswordHash = await bcrypt.hash('admin123', 10);
      await conn.query(
        'INSERT INTO admins (username, email, password_hash) VALUES (?, ?, ?)',
        ['admin', 'admin@acrocoder.com', defaultPasswordHash]
      );
      console.log('Created default admin: admin@acrocoder.com / admin123');
    }

    // Seed default Profile if not exists
    const [existingProfile] = await conn.query('SELECT id FROM profile WHERE id = 1');
    if (existingProfile.length === 0) {
      await conn.query(`
        INSERT INTO profile (
          id, full_name, headline, bio, about_text, avatar_url, resume_url,
          email, phone, location, available_for_hire, years_experience, projects_completed,
          github_url, linkedin_url, twitter_url, youtube_url, instagram_url, custom_links_json
        ) VALUES (
          1,
          'Naimish Kumar Verma',
          'Flutter Team Lead & Mobile / 3D Creative',
          'Passionate Flutter Team Lead and Creative Technologist building production cross-platform apps, 3D WebGL interfaces, and scalable distributed backends.',
          'I am a Flutter Team Lead & full-stack engineer with hands-on expertise building cross-platform mobile architectures, production-ready cloud systems, and modern interactive applications using Flutter, Dart, Next.js, Node.js, and MySQL.',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          '#resume',
          'acrocoader@gmail.com',
          '+91 7784068641',
          'Lucknow, India',
          TRUE,
          4,
          32,
          'https://github.com/acrocoder',
          'https://linkedin.com/in/acrocoder',
          'https://twitter.com/acrocoder',
          'https://youtube.com/@acrocoder',
          'https://instagram.com/acrocoder',
          JSON_ARRAY()
        )
      `);
      console.log('Created default profile.');
    }

    // Seed Hero Settings
    const [existingHero] = await conn.query('SELECT id FROM hero_settings WHERE id = 1');
    if (existingHero.length === 0) {
      await conn.query(`
        INSERT INTO hero_settings (
          id, greeting, headline, subheadline, typing_strings_json,
          primary_button_text, primary_button_link, secondary_button_text, secondary_button_link, badge_text
        ) VALUES (
          1,
          'Hello, World! I am Naimish',
          'Full Stack Developer & Cloud Architect',
          'Specializing in high-performance Next.js web applications, resilient Node.js microservices, and modern UI engineering.',
          JSON_ARRAY('Full Stack Developer', 'Next.js & React Specialist', 'Node.js & Cloud Architect', 'UI/UX Enthusiast', 'Open Source Contributor'),
          'Explore My Projects',
          '#projects',
          'Let\\'s Talk',
          '#contact',
          'Available for exciting new roles & contracts'
        )
      `);
      console.log('Created default hero settings.');
    }

    // Seed Skills
    const [existingSkills] = await conn.query('SELECT id FROM skills LIMIT 1');
    if (existingSkills.length === 0) {
      const defaultSkills = [
        ['Next.js / React', 'Frontend', 95, 'Layers', 1, true],
        ['TypeScript & JavaScript', 'Frontend', 92, 'Code2', 2, true],
        ['Tailwind CSS & Modern UI', 'Frontend', 94, 'Palette', 3, true],
        ['Node.js & Express', 'Backend', 90, 'Server', 4, true],
        ['RESTful APIs & GraphQL', 'Backend', 88, 'Network', 5, true],
        ['MySQL & PostgreSQL', 'Database', 88, 'Database', 6, true],
        ['Redis & Caching', 'Database', 82, 'Cpu', 7, true],
        ['Docker & Cloud Hosting', 'DevOps & Cloud', 84, 'Cloud', 8, true],
        ['Git & CI/CD Pipelines', 'DevOps & Cloud', 89, 'GitBranch', 9, true],
        ['System Architecture & Security', 'Architecture', 86, 'ShieldCheck', 10, true],
      ];

      for (const skill of defaultSkills) {
        await conn.query(
          'INSERT INTO skills (name, category, proficiency, icon, display_order, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
          skill
        );
      }
      console.log('Created default skills.');
    }

    // Seed Projects
    const [existingProjects] = await conn.query('SELECT id FROM projects LIMIT 1');
    if (existingProjects.length === 0) {
      const defaultProjects = [
        [
          'SpaceBliz AI - Next-Gen Creative Suite',
          'spacebliz-ai',
          'Generative AI platform for multi-modal asset creation and automated workflow orchestration.',
          'SpaceBliz is an enterprise-grade AI creative suite powered by Next.js, Node.js, and LLM orchestration. Features real-time collaborative canvas, automated asset rendering, and high-throughput asset pipeline.',
          'Fullstack & AI',
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          'https://spacebliz.com',
          'https://github.com/acrocoder/spacebliz',
          JSON.stringify(['Next.js', 'React', 'Node.js', 'MySQL', 'TailwindCSS', 'AI/ML', 'Docker']),
          true,
          1
        ],
        [
          'Homiq Real Estate Platform',
          'homiq-real-estate',
          'Modern real estate marketplace with immersive property tours, interactive search, and instant booking.',
          'A comprehensive real estate ecosystem connecting buyers, tenants, and verified property brokers. Complete with dynamic filtering, live chat, interactive maps, and automated mortgage estimation.',
          'Fullstack Web',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://homiq.space',
          'https://github.com/acrocoder/homiq',
          JSON.stringify(['React', 'Next.js', 'Express', 'MySQL', 'REST API', 'Maps API']),
          true,
          2
        ],
        [
          'WhatsFlow Messaging & CRM Hub',
          'whatsflow-crm',
          'Omnichannel conversational marketing and customer management system with automated drip campaigns.',
          'Automated WhatsApp and omnichannel CRM for e-commerce and retail brands. Handles automated triggers, bulk communications, analytics dashboards, and webhooks.',
          'Backend & SaaS',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          'https://whatsflow.site',
          'https://github.com/acrocoder/whatsflow',
          JSON.stringify(['Node.js', 'WebSockets', 'MySQL', 'Redis', 'React', 'Tailwind']),
          true,
          3
        ],
        [
          'DarziDesk Tailoring ERP & Inventory',
          'darzidesk-erp',
          'Cloud-native ERP and custom order tracking system built specifically for bespoke tailoring ateliers.',
          'Complete workflow management software tracking customer measurements, garment production status, inventory logistics, billing, and automated SMS alerts.',
          'SaaS & ERP',
          'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1200&q=80',
          'https://darzidesk.shop',
          'https://github.com/acrocoder/darzidesk',
          JSON.stringify(['Next.js', 'Node.js', 'MySQL', 'REST API', 'TailwindCSS']),
          true,
          4
        ]
      ];

      for (const p of defaultProjects) {
        await conn.query(
          `INSERT INTO projects (title, slug, short_description, long_description, category, image_url, live_url, github_url, tags_json, is_featured, display_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          p
        );
      }
      console.log('Created default projects.');
    }

    // Seed Experience
    const [existingExp] = await conn.query('SELECT id FROM experience LIMIT 1');
    if (existingExp.length === 0) {
      const defaultExp = [
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

      for (const exp of defaultExp) {
        await conn.query(
          `INSERT INTO experience (company, role, location, employment_type, start_date, end_date, is_current, description, skills_used_json, display_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          exp
        );
      }
      console.log('Created default experience.');
    }

    // Seed Education
    const [existingEdu] = await conn.query('SELECT id FROM education LIMIT 1');
    if (existingEdu.length === 0) {
      await conn.query(`
        INSERT INTO education (institution, degree, field_of_study, start_year, end_year, grade, description, display_order)
        VALUES
        ('Galgotias University', 'B.Tech in Computer Science & Engineering', 'Cloud Computing & Distributed Systems', '2015', '2019', 'First Class with Distinction', 'Core coursework in Algorithms, Distributed Systems, Software Engineering, Database Systems, and Cloud Computing. Capstone Project: Secure Multi-Tenant Cloud Storage Engine with End-to-End Encryption.', 1)
      `);
      console.log('Created default education.');
    }

    // Seed Site Settings
    const defaultSettings = [
      ['site_title', 'AcroCoder | Full Stack Developer & Cloud Engineer'],
      ['site_description', 'Official dynamic portfolio of AcroCoder - Senior Full Stack Developer, Next.js Architect, and Cloud Engineer.'],
      ['accent_color', '#6366f1'],
      ['enable_contact_form', 'true'],
      ['enable_projects_section', 'true'],
      ['enable_skills_section', 'true'],
      ['enable_experience_section', 'true'],
      ['enable_education_section', 'true'],
      ['footer_text', '© 2026 AcroCoder. Built with Next.js, Node.js & Hostinger. All rights reserved.']
    ];

    for (const [key, val] of defaultSettings) {
      await conn.query(
        'INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)',
        [key, val]
      );
    }
    console.log('Created default site settings.');

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    conn.release();
  }
}

if (require.main === module) {
  initDB()
    .then(() => {
      console.log('Database script completed.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Database script failed:', err);
      process.exit(1);
    });
}

module.exports = initDB;
