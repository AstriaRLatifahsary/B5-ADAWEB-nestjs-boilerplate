//routes/auth.js
/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');
const { join } = require('path');

// multer storage: save to public/uploads
const uploadDir = join(process.cwd(), 'public', 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safe = `${Date.now()}-${file.originalname}`.replace(
      /[^a-zA-Z0-9.\-_%]/g,
      '_',
    );
    cb(null, safe);
  },
});
const upload = multer({ storage });

// Basic middleware: parse form bodies and JSON so req.body is available
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Lightweight cookie parser so controllers can read req.cookies without extra deps
router.use((req, res, next) => {
  req.cookies = req.cookies || {};
  const raw = req.headers && req.headers.cookie;
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

// Ensure these routes don't use the global layout (defensive fallback)
router.use((req, res, next) => {
  // express-ejs-layouts respects res.locals.layout === false
  res.locals.layout = false;
  next();
});

// Public auth routes (accept both /login and /auth/login so UI works from either path)
router.get(['/login', '/auth/login'], authController.showLogin);
router.post(['/login', '/auth/login'], authController.postLogin);

router.get(['/register', '/auth/register'], authController.showRegister);
router.post(['/register', '/auth/register'], authController.postRegister);

// optional logout route (also accept /auth/logout)
router.post(['/logout', '/auth/logout'], authController.logout);
router.get(['/logout', '/auth/logout'], authController.logout);

// Redirect root auth path to login
router.get('/', (req, res) => res.redirect('/login'));

// AJAX: check username availability
router.get('/check-username', (req, res) => {
  // returns JSON { available: true|false }
  const controller = require('../controllers/authController');
  return controller.checkUsername(req, res);
});

// Profile routes
router.get(['/profile', '/users/profile'], authController.showProfile);
router.post(
  ['/profile', '/users/profile'],
  upload.single('avatar'),
  authController.postProfile,
);

module.exports = router;
