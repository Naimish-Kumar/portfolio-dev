const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// All admin routes require JWT Authentication
router.use(authMiddleware);

// Profile
router.get('/profile', adminController.getProfile);
router.put('/profile', adminController.updateProfile);

// Hero Settings
router.get('/hero', adminController.getHeroSettings);
router.put('/hero', adminController.updateHeroSettings);

// Projects
router.get('/projects', adminController.getProjects);
router.post('/projects', adminController.createProject);
router.put('/projects/:id', adminController.updateProject);
router.delete('/projects/:id', adminController.deleteProject);

// Skills
router.get('/skills', adminController.getSkills);
router.post('/skills', adminController.createSkill);
router.put('/skills/:id', adminController.updateSkill);
router.delete('/skills/:id', adminController.deleteSkill);

// Experience
router.get('/experience', adminController.getExperience);
router.post('/experience', adminController.createExperience);
router.put('/experience/:id', adminController.updateExperience);
router.delete('/experience/:id', adminController.deleteExperience);

// Education
router.get('/education', adminController.getEducation);
router.post('/education', adminController.createEducation);
router.put('/education/:id', adminController.updateEducation);
router.delete('/education/:id', adminController.deleteEducation);

// Messages / Inquiries Inbox
router.get('/messages', adminController.getMessages);
router.put('/messages/:id/read', adminController.markMessageRead);
router.delete('/messages/:id', adminController.deleteMessage);

// Site Settings
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

module.exports = router;
