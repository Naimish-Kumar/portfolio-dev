const pool = require('../config/db');

// --- PROFILE ---
exports.getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1');
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Profile not found' });
    const p = rows[0];
    p.available_for_hire = Boolean(p.available_for_hire);
    p.custom_links = typeof p.custom_links_json === 'string' ? JSON.parse(p.custom_links_json || '[]') : (p.custom_links_json || []);
    return res.json({ success: true, data: p });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const {
    full_name, headline, bio, about_text, avatar_url, resume_url,
    email, phone, location, available_for_hire, years_experience,
    projects_completed, github_url, linkedin_url, twitter_url, youtube_url,
    instagram_url, custom_links
  } = req.body;

  try {
    await pool.query(`
      UPDATE profile SET
        full_name = ?, headline = ?, bio = ?, about_text = ?, avatar_url = ?, resume_url = ?,
        email = ?, phone = ?, location = ?, available_for_hire = ?, years_experience = ?,
        projects_completed = ?, github_url = ?, linkedin_url = ?, twitter_url = ?,
        youtube_url = ?, instagram_url = ?, custom_links_json = ?
      WHERE id = 1
    `, [
      full_name, headline, bio, about_text, avatar_url, resume_url,
      email, phone, location, available_for_hire ? 1 : 0, years_experience || 0,
      projects_completed || 0, github_url, linkedin_url, twitter_url,
      youtube_url, instagram_url, JSON.stringify(custom_links || [])
    ]);

    return res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- HERO SETTINGS ---
exports.getHeroSettings = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hero_settings WHERE id = 1');
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Hero settings not found' });
    const h = rows[0];
    h.typing_strings = typeof h.typing_strings_json === 'string' ? JSON.parse(h.typing_strings_json || '[]') : (h.typing_strings_json || []);
    return res.json({ success: true, data: h });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateHeroSettings = async (req, res) => {
  const {
    greeting, headline, subheadline, typing_strings,
    primary_button_text, primary_button_link,
    secondary_button_text, secondary_button_link, badge_text
  } = req.body;

  try {
    await pool.query(`
      UPDATE hero_settings SET
        greeting = ?, headline = ?, subheadline = ?, typing_strings_json = ?,
        primary_button_text = ?, primary_button_link = ?,
        secondary_button_text = ?, secondary_button_link = ?, badge_text = ?
      WHERE id = 1
    `, [
      greeting, headline, subheadline, JSON.stringify(typing_strings || []),
      primary_button_text, primary_button_link,
      secondary_button_text, secondary_button_link, badge_text
    ]);

    return res.json({ success: true, message: 'Hero settings updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- PROJECTS ---
exports.getProjects = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY display_order ASC, id DESC');
    const projects = rows.map((p) => ({
      ...p,
      tags: typeof p.tags_json === 'string' ? JSON.parse(p.tags_json || '[]') : (p.tags_json || []),
      is_featured: Boolean(p.is_featured),
    }));
    return res.json({ success: true, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProject = async (req, res) => {
  const { title, slug, short_description, long_description, category, image_url, live_url, github_url, tags, is_featured, display_order } = req.body;
  if (!title || !short_description) {
    return res.status(400).json({ success: false, message: 'Title and short description are required' });
  }

  const projectSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) + '-' + Date.now();

  try {
    const [result] = await pool.query(`
      INSERT INTO projects (title, slug, short_description, long_description, category, image_url, live_url, github_url, tags_json, is_featured, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, projectSlug, short_description, long_description || '', category || 'Fullstack',
      image_url || '', live_url || '', github_url || '', JSON.stringify(tags || []),
      is_featured ? 1 : 0, display_order || 0
    ]);

    return res.status(201).json({ success: true, message: 'Project created successfully', id: result.insertId });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, slug, short_description, long_description, category, image_url, live_url, github_url, tags, is_featured, display_order } = req.body;

  try {
    await pool.query(`
      UPDATE projects SET
        title = ?, slug = ?, short_description = ?, long_description = ?,
        category = ?, image_url = ?, live_url = ?, github_url = ?,
        tags_json = ?, is_featured = ?, display_order = ?
      WHERE id = ?
    `, [
      title, slug, short_description, long_description,
      category, image_url, live_url, github_url,
      JSON.stringify(tags || []), is_featured ? 1 : 0, display_order || 0,
      id
    ]);

    return res.json({ success: true, message: 'Project updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- SKILLS ---
exports.getSkills = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM skills ORDER BY display_order ASC, name ASC');
    return res.json({ success: true, data: rows.map(s => ({ ...s, is_featured: Boolean(s.is_featured) })) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSkill = async (req, res) => {
  const { name, category, proficiency, icon, display_order, is_featured } = req.body;
  if (!name) return res.status(400).json({ success: false, message: 'Skill name is required' });

  try {
    const [result] = await pool.query(
      'INSERT INTO skills (name, category, proficiency, icon, display_order, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category || 'Frontend', proficiency || 80, icon || 'Code', display_order || 0, is_featured ? 1 : 0]
    );
    return res.status(201).json({ success: true, message: 'Skill created successfully', id: result.insertId });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name, category, proficiency, icon, display_order, is_featured } = req.body;

  try {
    await pool.query(`
      UPDATE skills SET name = ?, category = ?, proficiency = ?, icon = ?, display_order = ?, is_featured = ?
      WHERE id = ?
    `, [name, category, proficiency, icon, display_order, is_featured ? 1 : 0, id]);

    return res.json({ success: true, message: 'Skill updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM skills WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- EXPERIENCE ---
exports.getExperience = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM experience ORDER BY display_order ASC, id DESC');
    return res.json({
      success: true,
      data: rows.map(e => ({
        ...e,
        skills_used: typeof e.skills_used_json === 'string' ? JSON.parse(e.skills_used_json || '[]') : (e.skills_used_json || []),
        is_current: Boolean(e.is_current),
      }))
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createExperience = async (req, res) => {
  const { company, role, location, employment_type, start_date, end_date, is_current, description, skills_used, display_order } = req.body;
  if (!company || !role) return res.status(400).json({ success: false, message: 'Company and Role are required' });

  try {
    const [result] = await pool.query(`
      INSERT INTO experience (company, role, location, employment_type, start_date, end_date, is_current, description, skills_used_json, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      company, role, location || '', employment_type || 'Full-time',
      start_date || '', end_date || '', is_current ? 1 : 0, description || '',
      JSON.stringify(skills_used || []), display_order || 0
    ]);
    return res.status(201).json({ success: true, message: 'Experience created successfully', id: result.insertId });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateExperience = async (req, res) => {
  const { id } = req.params;
  const { company, role, location, employment_type, start_date, end_date, is_current, description, skills_used, display_order } = req.body;

  try {
    await pool.query(`
      UPDATE experience SET
        company = ?, role = ?, location = ?, employment_type = ?,
        start_date = ?, end_date = ?, is_current = ?, description = ?,
        skills_used_json = ?, display_order = ?
      WHERE id = ?
    `, [
      company, role, location, employment_type,
      start_date, end_date, is_current ? 1 : 0, description,
      JSON.stringify(skills_used || []), display_order || 0, id
    ]);
    return res.json({ success: true, message: 'Experience updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM experience WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- EDUCATION ---
exports.getEducation = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM education ORDER BY display_order ASC, id DESC');
    return res.json({ success: true, data: rows });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createEducation = async (req, res) => {
  const { institution, degree, field_of_study, start_year, end_year, grade, description, display_order } = req.body;
  if (!institution || !degree) return res.status(400).json({ success: false, message: 'Institution and Degree are required' });

  try {
    const [result] = await pool.query(`
      INSERT INTO education (institution, degree, field_of_study, start_year, end_year, grade, description, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [institution, degree, field_of_study || '', start_year || '', end_year || '', grade || '', description || '', display_order || 0]);
    return res.status(201).json({ success: true, message: 'Education created successfully', id: result.insertId });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEducation = async (req, res) => {
  const { id } = req.params;
  const { institution, degree, field_of_study, start_year, end_year, grade, description, display_order } = req.body;

  try {
    await pool.query(`
      UPDATE education SET institution = ?, degree = ?, field_of_study = ?, start_year = ?, end_year = ?, grade = ?, description = ?, display_order = ?
      WHERE id = ?
    `, [institution, degree, field_of_study, start_year, end_year, grade, description, display_order || 0, id]);
    return res.json({ success: true, message: 'Education updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM education WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Education deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- MESSAGES INBOX ---
exports.getMessages = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    return res.json({ success: true, data: rows.map(m => ({ ...m, is_read: Boolean(m.is_read) })) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.markMessageRead = async (req, res) => {
  const { id } = req.params;
  const { is_read } = req.body;
  try {
    await pool.query('UPDATE messages SET is_read = ? WHERE id = ?', [is_read ? 1 : 0, id]);
    return res.json({ success: true, message: 'Message status updated' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM messages WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// --- SITE SETTINGS ---
exports.getSettings = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    const settings = {};
    rows.forEach(r => { settings[r.setting_key] = r.setting_value; });
    return res.json({ success: true, data: settings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  const settingsObj = req.body;
  try {
    for (const [key, value] of Object.entries(settingsObj)) {
      await pool.query(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, String(value), String(value)]
      );
    }
    return res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
