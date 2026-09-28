const pool = require('../config/db');

async function seedAcroCoderData() {
  console.log('Seeding exact Naimish Kumar Verma profile, projects, packages, and experience into MySQL...');
  const conn = await pool.getConnection();

  try {
    // 1. Update Profile
    await conn.query(`
      UPDATE profile SET
        full_name = 'Naimish Kumar Verma',
        headline = 'Flutter Developer | Mobile & Full-Stack Engineer',
        bio = 'Results-driven Flutter Developer with 2+ years of professional experience designing and shipping scalable cross-platform mobile applications for Android and iOS. Proficient in Flutter, Dart, Firebase, REST APIs, real-time systems (Socket.IO), and payment gateway integration (PayPal, Authorize.net). Published 5+ production applications on Google Play Store and Apple App Store. Hands-on open-source contributor with 4 published pub.dev packages.',
        about_text = 'Results-driven Flutter Developer with 2+ years of professional experience designing and shipping scalable cross-platform mobile applications for Android and iOS. Proficient in Flutter, Dart, Firebase, REST APIs, real-time systems (Socket.IO), and payment gateway integration (PayPal, Authorize.net). Published 5+ production applications on Google Play Store and Apple App Store. Hands-on open-source contributor with 4 published pub.dev packages.',
        avatar_url = '/akash_portrait_bw.jpg',
        resume_url = 'https://acrocoder.com/resume.pdf',
        email = 'vnaimishkumar@gmail.com',
        phone = '+91-9536824061',
        location = 'Noida, India',
        available_for_hire = TRUE,
        years_experience = 2,
        projects_completed = 12,
        github_url = 'https://github.com/vnaimishkumar',
        linkedin_url = 'https://linkedin.com/in/vnaimishkumar',
        twitter_url = NULL
      WHERE id = 1
    `);

    // 2. Update Hero Settings
    await conn.query(`
      UPDATE hero_settings SET
        greeting = 'Flutter Developer | Mobile & Full-Stack Engineer',
        headline = 'Building Scalable Cross-Platform Mobile Apps & Open-Source Tools',
        subheadline = 'Specializing in Flutter, BLoC, Clean Architecture, Socket.IO real-time systems, and payment gateway integrations.',
        typing_strings_json = ?,
        primary_button_text = 'Explore Applications',
        primary_button_link = '#work',
        secondary_button_text = 'Initiate Contact',
        secondary_button_link = '#contact',
        badge_text = 'Flutter Developer @ Spirehub Software'
      WHERE id = 1
    `, [
      JSON.stringify([
        'Flutter & Dart Cross-Platform Mobile Apps',
        'Open Source Pub.dev Package Contributor',
        'Clean Architecture & BLoC State Management',
        'Socket.IO & Real-Time Communications',
        'PayPal & Authorize.net Payment Gateways'
      ])
    ]);

    // 3. Update Projects & Shipped Apps + Pub.dev Packages
    await conn.query('DELETE FROM projects');
    const projects = [
      [
        'Healthosyst — Healthcare Appointment Booking Platform',
        'healthosyst-telemedicine',
        'Full-featured healthcare appointment booking platform with doctor discovery, real-time slot availability, and appointment management for patients and providers.',
        'Architected and deployed healthcare appointment booking platform with doctor discovery, real-time slot availability, and appointment management for patients and providers. Integrated Google Maps SDK for hospital/clinic location search, distance calculation, and turn-by-turn directions via deep linking. Implemented Firebase FCM push notifications for appointment reminders, cancellations, and real-time status updates. Developed multi-role authentication (patient, doctor, admin) with JWT-secured API calls and token refresh handling.',
        'Shipped Mobile App',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        'https://play.google.com/store/apps/details?id=com.healthosyst.app',
        'https://apps.apple.com/in/app/healthosyst/id6702022061',
        JSON.stringify(['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Node.js', 'BLoC', 'Healthcare']),
        true,
        1
      ],
      [
        'Coach-By-App — Real-Time Fitness Coaching Platform',
        'coach-by-app-fitness',
        'Live fitness coaching app enabling real-time coach-client communication via Socket.IO chat, video tutorials, and Authorize.net subscription billing.',
        'Developed a live fitness coaching app enabling real-time coach-client communication via Socket.IO-powered chat and session tracking. Built a workout library with video tutorials (Chewie/VideoPlayer), animated exercise demonstrations, and progress logging with chart visualizations (fl_chart). Implemented personalized workout plan generation with schedule management, rest-day tracking, and push notification reminders. Integrated Authorize.net for subscription billing with plan upgrade/downgrade flows and payment history screens.',
        'Shipped Mobile App',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        'https://play.google.com/store/apps/details?id=com.coachbyapp.app',
        'https://apps.apple.com/in/app/coach-by-app/id6467117400',
        JSON.stringify(['Flutter', 'Dart', 'Socket.IO', 'Firebase', 'Authorize.net', 'Node.js', 'VideoPlayer', 'fl_chart']),
        true,
        2
      ],
      [
        'Smyline — Business Management Platform',
        'smyline-business-platform',
        'Dental aligner treatment companion app enabling patients to track orthodontic progress, manage treatment stages, and monitor smile transformation digitally.',
        'Developed a dental aligner treatment companion app enabling patients to track orthodontic progress, manage treatment stages, and monitor smile transformation digitally. Built appointment scheduling and clinic management features allowing users to book consultations, receive reminders, and stay connected with dental professionals. Implemented treatment timeline tracking with aligner change notifications, progress monitoring, and patient engagement workflows.',
        'Shipped Mobile App',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        'https://play.google.com/store/apps/details?id=com.smyline.app',
        'https://apps.apple.com/in/app/smyline/id6470000000',
        JSON.stringify(['Flutter', 'Firebase', 'REST APIs', 'Hive', 'Clean Architecture', 'Dental App']),
        true,
        3
      ],
      [
        'Ancient Mystic Music — Music Streaming Application',
        'ancient-mystic-music',
        'Full-featured music streaming app with playlist management, background audio playback (just_audio, audio_service), and equalizer controls.',
        'Developed a full-featured music streaming app with playlist management, background audio playback (just_audio, audio_service), and equalizer controls. Implemented subscription-based access with PayPal payment integration, entitlement management, and graceful paywall flows. Built offline listening with local caching of purchased tracks and download progress tracking UI.',
        'Shipped Mobile App',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
        'https://play.google.com/store/apps/details?id=com.ancientmysticmusic.app',
        'https://apps.apple.com/in/app/ancient-mystic-music/id6480000000',
        JSON.stringify(['Flutter', 'just_audio', 'audio_service', 'PayPal SDK', 'Firebase', 'Provider']),
        true,
        4
      ],
      [
        'CongoBonMarché — E-Commerce Shopping Platform',
        'congobonmarche-ecommerce',
        'Built a full-featured e-commerce shopping app for the Congolese market, enabling product discovery, cart management, and order tracking.',
        'Built a full-featured e-commerce shopping app for the Congolese market, enabling product discovery, cart management, and order tracking for both Android and iOS users. Implemented multi-language support, secure user authentication, and real-time inventory updates with Firebase Firestore synchronization. Published and maintained on both Google Play Store and Apple App Store.',
        'Shipped Mobile App',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
        'https://play.google.com/store/apps/details?id=org.congobonmarche',
        'https://apps.apple.com/in/app/congobonmarch%C3%A9-app/id6443672495',
        JSON.stringify(['Flutter', 'Dart', 'Firebase', 'REST APIs', 'BLoC', 'Clean Architecture', 'E-Commerce']),
        true,
        5
      ],
      [
        'audio_waveform_recorder',
        'audio-waveform-recorder',
        'Real-time audio recording with animated waveform visualization package for Flutter apps.',
        'Published pub.dev open-source Flutter package for real-time audio recording with animated waveform visualization. Supports MP3/WAV/AAC output, customizable wave colors/amplitude, and platform channels for native audio access.',
        'Pub.dev Open Source Package',
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
        'https://pub.dev/packages/audio_waveform_recorder',
        'https://github.com/vnaimishkumar/audio_waveform_recorder',
        JSON.stringify(['Open Source', 'Pub.dev', 'Flutter Package', 'Audio', 'Dart']),
        true,
        6
      ],
      [
        'chat_secure_guard',
        'chat-secure-guard',
        'End-to-end chat encryption utilities for Flutter apps implementing AES-256-GCM and RSA key exchange.',
        'Published pub.dev open-source Flutter package providing end-to-end chat encryption utilities. Implements AES-256-GCM and RSA key exchange with secure storage integration via flutter_secure_storage.',
        'Pub.dev Open Source Package',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        'https://pub.dev/packages/chat_secure_guard',
        'https://github.com/vnaimishkumar/chat_secure_guard',
        JSON.stringify(['Open Source', 'Pub.dev', 'Flutter Package', 'Encryption', 'Security']),
        true,
        7
      ],
      [
        'flutter_performance_optimizer',
        'flutter-performance-optimizer',
        'Developer toolkit for analyzing widget rebuilds, frame render times, and memory usage in Flutter.',
        'Published pub.dev open-source Flutter developer toolkit for analyzing widget rebuilds, frame render times, and memory usage. Includes overlay dashboard with real-time FPS monitoring and performance optimization suggestions.',
        'Pub.dev Open Source Package',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        'https://pub.dev/packages/flutter_performance_optimizer',
        'https://github.com/vnaimishkumar/flutter_performance_optimizer',
        JSON.stringify(['Open Source', 'Pub.dev', 'Flutter Package', 'Performance', 'DevTools']),
        true,
        8
      ],
      [
        'flutter_architecture_generator',
        'flutter-architecture-generator',
        'CLI + IDE plugin that auto-scaffolds BLoC/Clean Architecture folder structure and dependency injection.',
        'Published pub.dev open-source CLI + IDE plugin tool that auto-scaffolds BLoC/Clean Architecture folder structure, generates boilerplate files, and wires dependency injection for new Flutter features.',
        'Pub.dev Open Source Package',
        'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
        'https://pub.dev/packages/flutter_architecture_generator',
        'https://github.com/vnaimishkumar/flutter_architecture_generator',
        JSON.stringify(['Open Source', 'Pub.dev', 'Flutter Package', 'Clean Architecture', 'CLI']),
        true,
        9
      ],
      [
        'DoodleJoy — Interactive Drawing Web Platform',
        'doodlejoy-canvas',
        'Interactive drawing & doodling web platform for kids. Built with Next.js and Canvas API. Live at doodlejoy.fun.',
        'Interactive drawing & doodling web platform for kids built with Next.js and Canvas API. Features sub-16ms custom canvas rendering, glow shaders, and multi-touch drawing tools. Live at doodlejoy.fun with Android app on Google Play Store.',
        'Web Project',
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
        'https://doodlejoy.fun',
        'https://github.com/vnaimishkumar/doodlejoy',
        JSON.stringify(['Next.js', 'Canvas API', 'Web App', 'Kids App', 'Drawing']),
        true,
        10
      ],
      [
        'GreenStreak — Gamified Sustainability Habit Tracker',
        'greenstreak-sustainability',
        'Sustainability habit tracker that gamifies eco-friendly actions with streaks, badges, and social sharing. Live at greenstreak.in.',
        'Sustainability habit tracker web platform that gamifies eco-friendly actions with streaks, badges, and social sharing. Built with Next.js and React, empowering users to track daily green activities and compete on leaderboards. Live at greenstreak.in.',
        'Web Project',
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
        'https://greenstreak.in',
        'https://github.com/vnaimishkumar/greenstreak',
        JSON.stringify(['Next.js', 'React', 'Sustainability', 'Gamification', 'Web App']),
        true,
        11
      ],
      [
        'StudyGate — AI-Powered Parental Control EdTech App',
        'studygate-ai-edtech',
        'AI-powered parental control EdTech app using Flutter, Laravel, MySQL, and Claude API for AI quiz generation.',
        'Currently building StudyGate, an AI-powered parental control EdTech app. Integrates Flutter for cross-platform Android & iOS apps, Laravel and MySQL for backend REST services, and Claude API for automated AI quiz generation and educational content curation.',
        'In-Development AI App',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        'https://github.com/vnaimishkumar/studygate',
        'https://github.com/vnaimishkumar/studygate',
        JSON.stringify(['Flutter', 'Laravel', 'MySQL', 'Claude API', 'EdTech', 'AI']),
        true,
        12
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
      ['Flutter & Dart (BLoC / Provider)', 'Core Mobile', 98, 'Smartphone', 1, true],
      ['Clean Architecture & MVVM', 'Architecture', 95, 'Layers', 2, true],
      ['Firebase (Auth, Firestore, FCM)', 'Backend & Cloud', 94, 'Database', 3, true],
      ['Socket.IO & Real-Time Chat', 'Backend & Real-Time', 92, 'Activity', 4, true],
      ['PayPal & Authorize.net Integration', 'Payment Systems', 90, 'ShieldCheck', 5, true],
      ['Laravel & Node.js REST APIs', 'Backend Development', 88, 'Server', 6, true],
      ['SQLite (sqflite) & Hive', 'Local Databases', 92, 'Database', 7, true],
      ['Performance Optimization (<16ms)', 'Mobile Systems', 95, 'Cpu', 8, true],
      ['Git, GitHub & CI/CD Pipelines', 'DevOps & Tools', 90, 'Cloud', 9, true],
      ['Next.js & Web Technologies', 'Web Development', 86, 'Globe', 10, true],
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
        'Flutter Developer',
        'Noida, India',
        'Full-time',
        '2023-10-01',
        null,
        true,
        'Architected and deployed 4+ cross-platform mobile applications (Android & iOS) serving thousands of users, following Clean Architecture and BLoC state management patterns for maintainability and scalability.\\nIntegrated Firebase services including Authentication, Firestore, Cloud Storage, Remote Config, and Analytics, reducing backend development time by 30%.\\nImplemented bidirectional real-time communication using Socket.IO for live chat, notifications, and data sync across healthcare and fitness platforms.\\nIntegrated PayPal and Authorize.net payment gateways with secure tokenized transactions, PCI-compliant flows, and subscription billing support.\\nOptimized app performance by reducing widget rebuild cycles and implementing lazy loading — achieving <16ms frame render times.\\nCollaborated with backend Node.js developers to design RESTful API contracts.\\nSet up CI/CD pipelines via GitHub Actions for automated builds and app distribution.',
        JSON.stringify(['Flutter', 'Dart', 'Firebase', 'Socket.IO', 'PayPal', 'Authorize.net', 'REST APIs', 'BLoC', 'Clean Architecture', 'CI/CD']),
        1
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
      ('Galgotias University, Greater Noida', 'Bachelor of Technology (B.Tech)', 'Computer Science & Engineering', '2019', '2025', 'First Class', 'Key coursework: Android Development, Distributed Systems, Network Security, Database Management, Software Engineering, Operating Systems.', 1)
    `);

    // 7. Update Site Settings
    await conn.query(`
      INSERT INTO site_settings (setting_key, setting_value) VALUES
      ('site_title', 'Naimish Kumar Verma — Flutter Developer | Mobile & Full-Stack Engineer'),
      ('site_description', 'Official portfolio of Naimish Kumar Verma - Flutter Developer with 2+ years of professional experience shipping cross-platform mobile apps and publishing open-source pub.dev packages.'),
      ('accent_color', '#10b981'),
      ('enable_contact_form', 'true'),
      ('enable_projects_section', 'true'),
      ('enable_skills_section', 'true'),
      ('enable_experience_section', 'true'),
      ('enable_education_section', 'true'),
      ('footer_text', '© 2026 NAIMISH KUMAR VERMA — FLUTTER DEVELOPER | MOBILE & FULL-STACK ENGINEER. ALL RIGHTS RESERVED.')
      ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
    `);

    console.log('Successfully seeded authentic Naimish Kumar Verma data into MySQL!');
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
