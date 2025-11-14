// routes/auth.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { join } = require('path');
const authController = require('../controllers/authController');

// Multer storage: simpan di frontend/public/uploads
const uploadDir = join(process.cwd(), 'frontend', 'public', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = `${Date.now()}-${file.originalname}`.replace(/[^a-zA-Z0-9.\-_%]/g, '_');
    cb(null, safe);
  },
});
const upload = multer({ storage });

// Middleware: parse form body & JSON
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Optional: parse cookies manually if you don't want cookie-parser
router.use((req, res, next) => {
  req.cookies = req.cookies || {};
  const raw = req.headers.cookie;
  if (raw) {
    raw.split(';').forEach((pair) => {
      const idx = pair.indexOf('=');
      if (idx > -1) {
        const key = pair.substr(0, idx).trim();
        const val = decodeURIComponent(pair.substr(idx + 1).trim());
        req.cookies[key] = val;
      }
    });
  }
  next();
});

// Disable global layout for auth views
router.use((req, res, next) => {
  res.locals.layout = false;
  next();
});

// Legacy auth pages (login/register)
router.get(['/login', '/auth/login'], authController.showLogin);
router.post(['/login', '/auth/login'], authController.postLogin);

router.get(['/register', '/auth/register'], authController.showRegister);
router.post(['/register', '/auth/register'], authController.postRegister);

// Logout routes
router.get(['/logout', '/auth/logout'], authController.logout);
router.post(['/logout', '/auth/logout'], authController.logout);

// Root auth path redirect to login
router.get('/', (req, res) => res.redirect('/login'));

// AJAX: check username availability
router.get('/check-username', authController.checkUsername);

// Profile routes
router.get(['/profile', '/users/profile'], authController.showProfile);
router.post(['/profile', '/users/profile'], upload.single('avatar'), authController.postProfile);

module.exports = router;
