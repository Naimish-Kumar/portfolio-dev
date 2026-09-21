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
          'Akash Verma',
          'Software Engineer | Java & Mobile Systems Developer',
          'Software Engineer with 7+ years of overall experience bridging hardware and software systems, including 3 years of dedicated Java enterprise development. Proven expertise in developing production-ready, cross-platform mobile applications integrated with IoT hardware, microservices, and real-time backend services.',
          'Software Engineer with 7+ years of overall experience bridging hardware and software systems, including 3 years of dedicated Java enterprise development. Proven expertise in developing production-ready, cross-platform mobile applications integrated with IoT hardware, microservices, and real-time backend services. Skilled in firmware-to-cloud communication, IoT protocols (MQTT, BLE), and system-level performance optimization.',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          'https://acrocoder.com/resume.pdf',
          'akash@spirehubs.com',
          '+91 9536824061',
          'Noida, India',
          TRUE,
          7,
          30,
          'https://github.com/akash-verma',
          'https://linkedin.com/in/akash-verma',
          'https://twitter.com/akash_dev',
          'https://youtube.com/@akash_dev',
          'https://instagram.com/akash_dev',
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
          'Hello, World! I am Akash Verma',
          'Software Engineer | Java & Mobile Systems',
          'Bridging hardware and enterprise software systems with scalable Java 17/21 microservices, cross-platform mobile apps with Flutter, and real-time IoT firmware-to-cloud pipelines.',
          JSON_ARRAY('Java 17/21 & Spring Boot', 'Flutter & Mobile Architectures', 'IoT Telemetry, MQTT & BLE', 'Kafka & Redis Streaming', 'High-Performance Cloud Systems'),
          'Explore My Projects',
          '#projects',
          'Let\\'s Talk',
          '#contact',
          'Senior Software Engineer @ SpireHub Softwares'
        )
      `);
      console.log('Created default hero settings.');
    }

    // Seed Skills
    const [existingSkills] = await conn.query('SELECT id FROM skills LIMIT 1');
    if (existingSkills.length === 0) {
      const defaultSkills = [
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
          'SpireHub Softwares Pvt Ltd',
          'Senior Software Engineer',
          'Noida, India',
          'Full-time',
          '2023-06-01',
          null,
          true,
          'Spearheaded development of cross-platform mobile applications (Flutter/Android) communicating with custom IoT hardware via BLE and MQTT protocols.\\nArchitected microservices using Java 17/21 and Spring Boot, optimizing data processing pipelines that reduced latency by 35% for real-time sensor streams.\\nDesigned and maintained firmware-to-cloud communication interfaces, handling device authentication, telemetry ingestion, and OTA update dispatching.',
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
          'Engineered core enterprise backend services utilizing Java, Spring Boot, Hibernate/JPA, and PostgreSQL/MySQL databases.\\nBuilt and maintained RESTful APIs powering high-traffic web applications, processing 2M+ daily requests with 99.9% uptime.\\nIntegrated message-driven architectures using Apache Kafka and Redis for asynchronous task queuing and distributed caching.',
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
          'Developed hybrid and native mobile application modules for Android and cross-platform frameworks.\\nIntegrated backend APIs and local persistence layers (SQLite, Room, Shared Preferences) ensuring offline-first user experiences.\\nImplemented Bluetooth / serial communication protocols for companion device connectivity and data synchronization.',
          JSON.stringify(['Android', 'Flutter', 'Java', 'SQLite', 'Bluetooth', 'REST APIs', 'Offline-First', 'Git']),
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
        ('Galgotias University', 'B.Tech in Computer Science & Engineering', 'Computer Science & Software Systems', '2013', '2017', 'First Class with Distinction', 'Core coursework in Data Structures & Algorithms, Object-Oriented Programming (Java), Operating Systems, Computer Networks, Database Management Systems, and Software Engineering.', 1)
      `);
      console.log('Created default education.');
    }

    // Seed Site Settings
    const defaultSettings = [
      ['site_title', 'Akash Verma | Software Engineer & Systems Developer'],
      ['site_description', 'Official portfolio of Akash Verma - Software Engineer with 7+ years experience bridging hardware & software systems, Java Spring Boot microservices, and Flutter mobile applications.'],
      ['accent_color', '#6366f1'],
      ['enable_contact_form', 'true'],
      ['enable_projects_section', 'true'],
      ['enable_skills_section', 'true'],
      ['enable_experience_section', 'true'],
      ['enable_education_section', 'true'],
      ['footer_text', '© 2026 Akash Verma. Built with Next.js, Java Spring Boot & Cloud Architecture. All rights reserved.']
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
