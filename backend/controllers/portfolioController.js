const pool = require('../config/db');

exports.getFullPortfolio = async (req, res) => {
  try {
    const [profileRows] = await pool.query('SELECT * FROM profile WHERE id = 1');
    const [heroRows] = await pool.query('SELECT * FROM hero_settings WHERE id = 1');
    const [skills] = await pool.query('SELECT * FROM skills ORDER BY display_order ASC, name ASC');
    const [projects] = await pool.query('SELECT * FROM projects ORDER BY display_order ASC, id DESC');
    const [experience] = await pool.query('SELECT * FROM experience ORDER BY display_order ASC, id DESC');
    const [education] = await pool.query('SELECT * FROM education ORDER BY display_order ASC, id DESC');
    const [settingsRows] = await pool.query('SELECT setting_key, setting_value FROM site_settings');

    const profile = profileRows[0] || null;
    const hero = heroRows[0] || null;

    // Convert site settings array to key-value map
    const settings = {};
    settingsRows.forEach((row) => {
      settings[row.setting_key] = row.setting_value;
    });

    // Parse JSON fields safely
    const parsedSkills = skills.map((s) => ({
      ...s,
      is_featured: Boolean(s.is_featured),
    }));

    const parsedProjects = projects.map((p) => ({
      ...p,
      tags: typeof p.tags_json === 'string' ? JSON.parse(p.tags_json || '[]') : (p.tags_json || []),
      is_featured: Boolean(p.is_featured),
    }));

    const parsedExperience = experience.map((e) => ({
      ...e,
      skills_used: typeof e.skills_used_json === 'string' ? JSON.parse(e.skills_used_json || '[]') : (e.skills_used_json || []),
      is_current: Boolean(e.is_current),
    }));

    const parsedProfile = profile ? {
      ...profile,
      available_for_hire: Boolean(profile.available_for_hire),
      custom_links: typeof profile.custom_links_json === 'string' ? JSON.parse(profile.custom_links_json || '[]') : (profile.custom_links_json || []),
    } : null;

    const parsedHero = hero ? {
      ...hero,
      typing_strings: typeof hero.typing_strings_json === 'string' ? JSON.parse(hero.typing_strings_json || '[]') : (hero.typing_strings_json || []),
    } : null;

    return res.json({
      success: true,
      data: {
        profile: parsedProfile,
        hero: parsedHero,
        skills: parsedSkills,
        projects: parsedProjects,
        experience: parsedExperience,
        education,
        settings,
      },
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve portfolio data' });
  }
};

exports.submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

  try {
    const [result] = await pool.query(
      'INSERT INTO messages (name, email, subject, message, ip_address) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.trim(), (subject || 'Portfolio Inquiry').trim(), message.trim(), clientIp]
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
};
