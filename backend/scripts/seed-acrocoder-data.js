const pool = require('../config/db');

async function seedAcroCoderData() {
  console.log('Seeding exact AcroCoder profile, projects, packages, and experience into MySQL...');
  const conn = await pool.getConnection();

  try {
    // 1. Update Profile
    await conn.query(`
      UPDATE profile SET
        full_name = 'Naimish Kumar Verma',
        headline = 'Senior Mobile Engineer & Flutter Specialist | Flutter Team Lead @ Spirehub Software',
        bio = 'Engineering 60fps cross-platform mobile apps for iOS & Android with Clean Architecture, BLoC state management, team leadership, and enterprise reliability.',
        about_text = 'Flutter Team Lead at Spirehub Software Pvt Ltd with 3+ years of engineering experience architecting scalable cross-platform mobile systems for iOS and Android. Expert in Clean Architecture, BLoC state management, team leadership, real-time WebRTC/Socket.IO features, payment systems, and performance tuning. Proven track record of leading development teams to ship production apps serving thousands of active users with 99.9% crash-free sessions.',
        avatar_url = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        resume_url = 'https://acrocoder.com/resume.pdf',
        email = 'vnaimishkumar@gmail.com',
        phone = '+91 9876543210',
        location = 'India',
        available_for_hire = TRUE,
        years_experience = 3,
        projects_completed = 10,
        github_url = 'https://github.com/Naimish-Kumar',
        linkedin_url = 'https://linkedin.com/in/naimish-kumar-verma',
        twitter_url = 'https://twitter.com/acrocoder'
      WHERE id = 1
    `);

    // 2. Update Hero Settings
    await conn.query(`
      UPDATE hero_settings SET
        greeting = 'Flutter Team Lead @ Spirehub Software',
        headline = 'Leading High-Performance Flutter & Mobile Engineering',
        subheadline = 'Engineering 60fps cross-platform mobile apps for iOS & Android with Clean Architecture, BLoC state management, team leadership, and enterprise reliability.',
        typing_strings_json = ?,
        primary_button_text = 'Explore Applications',
        primary_button_link = '#work',
        secondary_button_text = 'Initiate Contact',
        secondary_button_link = '#contact',
        badge_text = '🚀 Flutter Team Lead @ Spirehub Software'
      WHERE id = 1
    `, [
      JSON.stringify([
        'Flutter Team Lead',
        'Senior Mobile Engineer',
        'Clean Architecture Specialist',
        'Sub-16ms 60FPS UI Architect',
        'Open-Source Package Creator',
        'Full Stack & Cloud Integrator'
      ])
    ]);

    // 3. Update Projects & Shipped Apps
    await conn.query('DELETE FROM projects');
    const projects = [
      [
        'DoodleJoy - Creative Canvas Web & Mobile App',
        'doodlejoy-canvas',
        'Interactive web & mobile drawing application for kids featuring magic brushes, smooth canvas rendering, and secure sharing.',
        'Interactive drawing application for web and mobile featuring sub-16ms custom canvas rendering, glow shaders, multi-touch brush engines, and cloud galleries.',
        'Shipped App',
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
        'https://doodlejoy.fun/',
        'https://play.google.com/store/apps/details?id=com.acrocoder.doodlejoy&hl=en_IN',
        JSON.stringify(['Flutter', 'Canvas', 'Web', 'Android', 'Clean Architecture', 'BLoC']),
        true,
        1
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
        JSON.stringify(['Flutter', 'iOS', 'Android', 'Real Estate', 'Google Maps', 'REST API']),
        true,
        2
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
        JSON.stringify(['Flutter', 'WebRTC', 'Telemedicine', 'iOS', 'Android', 'Firebase']),
        true,
        3
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
        JSON.stringify(['Flutter', 'Socket.IO', 'Stripe', 'Fitness', 'iOS', 'Android']),
        true,
        4
      ],
      [
        'audio_waveform_recorder (Pub.dev Package)',
        'audio-waveform-recorder-pkg',
        'Flutter open-source package to record audio with real-time dynamic waveform rendering and customizable visualizer bars.',
        'High-performance audio recording plugin for Flutter that renders smooth, real-time 60fps decibel waveforms with customizable visual styles and audio formats.',
        'Open Source',
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
        'https://pub.dev/packages/audio_waveform_recorder',
        'https://github.com/Naimish-Kumar/audio_waveform_recorder',
        JSON.stringify(['Dart', 'Flutter Package', 'Audio', 'Waveforms', 'Pub.dev', 'Open Source']),
        true,
        5
      ],
      [
        'chat_secure_guard (Pub.dev Package)',
        'chat-secure-guard-pkg',
        'End-to-end security plugin providing Double Ratchet encryption and key management for Flutter chat apps.',
        'Cryptographic security plugin bringing end-to-end Signal-protocol style Double Ratchet encryption, ephemeral key exchanges, and secure local storage to Flutter applications.',
        'Open Source',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        'https://pub.dev/packages/chat_secure_guard',
        'https://github.com/Naimish-Kumar/chat_secure_guard',
        JSON.stringify(['Dart', 'Cryptography', 'Double Ratchet', 'Security', 'Pub.dev', 'Open Source']),
        true,
        6
      ],
      [
        'flutter_performance_optimizer (Pub.dev)',
        'flutter-perf-optimizer-pkg',
        'Diagnostic profiling tool providing real-time FPS stats, widget rebuild counts, and memory leak alerts.',
        'Developer diagnostic overlay that tracks frame render times in sub-16ms intervals, monitors unneeded widget rebuilds, and warns about memory leaks in debug/profile modes.',
        'Open Source',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        'https://pub.dev/packages/flutter_performance_optimizer',
        'https://github.com/Naimish-Kumar/flutter_performance_optimizer',
        JSON.stringify(['Dart', 'Performance', 'DevTools', 'Profiling', 'Pub.dev']),
        true,
        7
      ],
      [
        'flutter_architecture_generator (CLI)',
        'flutter-arch-generator-pkg',
        'CLI utility to quickly generate Clean Architecture folder structures, BLoCs, and repositories in seconds.',
        'Command-line code scaffolding tool that generates standardized Clean Architecture folders, domain use-cases, data sources, and BLoC state classes in seconds.',
        'Open Source',
        'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
        'https://pub.dev/packages/flutter_architecture_generator',
        'https://github.com/Naimish-Kumar/flutter_architecture_generator',
        JSON.stringify(['Dart CLI', 'Clean Architecture', 'Code Generator', 'BLoC', 'Pub.dev']),
        true,
        8
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
      ['Flutter & Dart', 'Core Mobile', 98, 'Smartphone', 1, true],
      ['BLoC / Clean Architecture', 'Architecture', 95, 'Layers', 2, true],
      ['Team Leadership & Code Reviews', 'Leadership', 94, 'ShieldCheck', 3, true],
      ['Firebase / Node / Socket.IO', 'Backend & Realtime', 92, 'Server', 4, true],
      ['Payment Gateways (Stripe/Razorpay)', 'Fintech', 90, 'CreditCard', 5, true],
      ['WebRTC & Audio/Video Streaming', 'Media', 88, 'Video', 6, true],
      ['CI/CD & Store Publishing', 'DevOps', 90, 'Cloud', 7, true],
      ['Native Android (Kotlin/Java)', 'Native Mobile', 84, 'Code', 8, true],
      ['Three.js & 3D WebGL Graphics', '3D & Graphics', 86, 'Cpu', 9, true],
      ['Next.js & Fullstack Web', 'Fullstack', 89, 'Globe', 10, true],
    ];

    for (const s of skills) {
      await conn.query(
        'INSERT INTO skills (name, category, proficiency, icon, display_order, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
        s
      );
    }

    // 5. Update Experience
    await conn.query('DELETE FROM experience');
    const experiences = [
      [
        'Spirehub Software Pvt Ltd',
        'Flutter Team Lead',
        'India',
        'Full-time',
        'Jun 2025',
        'Present',
        true,
        'Leading the mobile engineering team, conducting code reviews, mentoring developers, overseeing clean architecture implementations, managing real-time Socket.IO integrations, and streamlining automated CI/CD deployments.',
        JSON.stringify(['Flutter', 'BLoC', 'Team Leadership', 'Clean Architecture', 'CI/CD', 'Socket.IO']),
        1
      ],
      [
        'Spirehub Software Pvt Ltd',
        'Flutter Developer',
        'India',
        'Full-time',
        'Oct 2023',
        'Jun 2025',
        false,
        'Architected and deployed 4+ production mobile applications for iOS and Android. Integrated payment gateways, optimized app render performance (<16ms frame times), and built real-time messaging features.',
        JSON.stringify(['Flutter', 'Dart', 'Stripe', 'WebRTC', 'iOS', 'Android']),
        2
      ],
      [
        'SmartInternz',
        'Android Developer Intern',
        'Remote',
        'Internship',
        'May 2021',
        'Aug 2021',
        false,
        'Built native Android applications using Kotlin and Material Design components. Integrated RESTful microservices and conducted automated unit and integration testing.',
        JSON.stringify(['Kotlin', 'Android SDK', 'REST APIs', 'Unit Testing']),
        3
      ]
    ];

    for (const exp of experiences) {
      await conn.query(`
        INSERT INTO experience (company, role, location, employment_type, start_date, end_date, is_current, description, skills_used_json, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, exp);
    }

    // 6. Update Education
    await conn.query('DELETE FROM education');
    await conn.query(`
      INSERT INTO education (institution, degree, field_of_study, start_year, end_year, grade, description, display_order)
      VALUES
      ('Galgotias University', 'B.Tech in Computer Science & Engineering', 'Cloud Computing & Distributed Systems', '2019', '2023', 'First Class with Distinction', 'Specialized in Cloud Computing and Distributed Systems. Capstone Project: Secure Multi-Tenant Cloud Storage Engine with End-to-End Encryption.', 1)
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
