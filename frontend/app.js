import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const theme = process.env.THEME || 'default';

// parse urlencoded form bodies so we can proxy them
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Simple proxy helpers: forward POST to backend and pass through Set-Cookie and redirects
const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN || 'http://localhost:3000';

async function proxyPostToBackend(req, res, backendPath) {
  try {
    // Build body as URLSearchParams to mimic form submit
    const params = new URLSearchParams();
    for (const k of Object.keys(req.body || {})) params.append(k, req.body[k]);

    const backendRes = await fetch(BACKEND_ORIGIN + backendPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      redirect: 'manual',
    });

    // Pass through Set-Cookie headers if any
    const setCookie = backendRes.headers.get('set-cookie') || backendRes.headers.get('Set-Cookie');
    if (setCookie) {
      // If multiple cookies, backend may send comma-separated; forward as-is
      res.setHeader('Set-Cookie', setCookie);
    }

    // If backend responds with redirect, forward the Location to the browser
    // and forward any Set-Cookie header so the browser will store session cookie.
    if (backendRes.status >= 300 && backendRes.status < 400) {
      const location = backendRes.headers.get('location') || '/';
      const setCookieHeader = backendRes.headers.get('set-cookie') || backendRes.headers.get('Set-Cookie');
      if (setCookieHeader) res.setHeader('Set-Cookie', setCookieHeader);
      // send redirect to browser (will change URL to the redirect location)
      return res.redirect(location);
    }

    // Otherwise forward response body and status
    const bodyText = await backendRes.text();
    res.status(backendRes.status).send(bodyText);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  }
}

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'themes', theme, 'views'));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'themes', theme, 'assets')));

// Halaman pertama -> proxy to backend root so authenticated users see backend layout/feed
app.get('/', async (req, res) => {
  try {
    const cookieHeader = req.headers.cookie;
    const backendRes = await fetch(BACKEND_ORIGIN + '/', {
      method: 'GET',
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      redirect: 'manual',
    });

    // Forward any Set-Cookie from backend
    const setCookie = backendRes.headers.get('set-cookie') || backendRes.headers.get('Set-Cookie');
    if (setCookie) res.setHeader('Set-Cookie', setCookie);

    // If backend redirects (unauthenticated -> /login), forward redirect to browser
    if (backendRes.status >= 300 && backendRes.status < 400) {
      const location = backendRes.headers.get('location') || '/login';
      return res.redirect(location);
    }

    const body = await backendRes.text();
    res.status(200).send(body);
  } catch (err) {
    console.error('GET / proxy error:', err);
    // Fallback: show standalone login page if backend not available
    return res.render('auth_page', { page: 'login', title: 'Login' });
  }
});

// Halaman login (opsional)
app.get('/login', (req, res) => {
  res.render('auth_page', { page: 'login', title: 'Login' });
});

// Halaman register (standalone)
app.get('/register', (req, res) => {
  res.render('auth_page', { page: 'register', title: 'Register' });
});

// Proxy POST /login -> backend /login
app.post('/login', async (req, res) => {
  return proxyPostToBackend(req, res, '/login');
});

// Proxy POST /register -> backend /register
app.post('/register', async (req, res) => {
  return proxyPostToBackend(req, res, '/register');
});

// Run server
const PORT = process.env.FRONTEND_PORT || 5174;
app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT} using theme: ${theme}`);
});
