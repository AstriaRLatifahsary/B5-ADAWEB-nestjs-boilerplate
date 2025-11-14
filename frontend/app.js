import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const theme = process.env.THEME || 'default';

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'themes', theme, 'views'));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'themes', theme, 'assets')));

// Halaman pertama → langsung login
app.get('/', (req, res) => {
  res.render('/login');   // Pastikan file ada: themes/default/views/auth/login.ejs
});

// Halaman login (opsional)
app.get('/login', (req, res) => {
  res.render('/login');
});

// Run server
const PORT = process.env.FRONTEND_PORT || 5174;
app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT} using theme: ${theme}`);
});
