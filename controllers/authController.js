// Single, cleaned legacy auth controller.
/* eslint-disable @typescript-eslint/no-require-imports */
const bcrypt = require('bcrypt');

// In-memory store (dev fallback)
const users = new Map();

let AppDataSource;
let AuthUserEntity;
try {
  AppDataSource = require('../src/database/data-source').AppDataSource;
  AuthUserEntity = require('../src/auth/auth-user.entity').AuthUser;
} catch (err) {
  void err;
  AppDataSource = null;
  AuthUserEntity = null;
}

async function getAuthRepo() {
  if (!AppDataSource || !AuthUserEntity) return null;
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    return AppDataSource.getRepository(AuthUserEntity);
  } catch (err) {
    void err;
    return null;
  }
}

exports.showLogin = (req, res) => {
  if (req.session && req.session.user) return res.redirect('/home');
  return res.render('layouts/authLayout', {
    page: 'login',
    layout: false,
    title: 'Login',
  });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).render('layouts/authLayout', {
      page: 'login',
      layout: false,
      title: 'Login',
      error: 'Username dan password harus diisi',
      username: username || '',
    });
  }
  let user = null;
  const repo = await getAuthRepo();
  if (repo) {
    try {
      const entity = await repo.findOne({ where: { username } });
      if (entity)
        user = {
          username: entity.username,
          passwordHash: entity.passwordHash || entity.password,
        };
    } catch (err) {
      void err;
    }
  }
  if (!user) user = users.get(username);
  if (!user)
    return res.status(401).render('layouts/authLayout', {
      page: 'login',
      layout: false,
      title: 'Login',
      error: 'Username atau password salah',
      username,
    });
  const match = bcrypt.compareSync(password, user.passwordHash);
  if (match) {
    if (req.session) req.session.user = username;
    return res.redirect('/');
  }
  return res.status(401).render('layouts/authLayout', {
    page: 'login',
    layout: false,
    title: 'Login',
    error: 'Username atau password salah',
    username,
  });
};

exports.showRegister = (req, res) => {
  if (req.session && req.session.user) return res.redirect('/home');
  return res.render('layouts/authLayout', {
    page: 'register',
    layout: false,
    title: 'Register',
  });
};

exports.postRegister = async (req, res) => {
  const { username, email, password } = req.body || {};
  if (!username || !password)
    return res.status(400).render('layouts/authLayout', {
      page: 'register',
      layout: false,
      title: 'Register',
      error: 'Username dan password harus diisi',
      username: username || '',
      email: email || '',
    });
  if (users.has(username))
    return res.status(409).render('layouts/authLayout', {
      page: 'register',
      layout: false,
      title: 'Register',
      error: 'Username sudah terpakai',
      username,
      email,
    });
  const passwordHash = bcrypt.hashSync(password, 10);
  const repo = await getAuthRepo();
  if (repo) {
    try {
      const existing = await repo.findOne({ where: { username } });
      if (existing)
        return res.status(409).render('layouts/authLayout', {
          page: 'register',
          layout: false,
          title: 'Register',
          error: 'Username sudah terpakai',
          username,
          email,
        });
      await repo.save(
        repo.create({
          username,
          email: email || null,
          passwordHash,
          displayName: '',
          profilePhoto: '',
        }),
      );
      users.set(username, { username, email, passwordHash, displayName: '' });
      return res.redirect('/login');
    } catch (err) {
      void err;
    }
  }
  users.set(username, {
    username,
    email,
    passwordHash,
    displayName: '',
    profilePhoto: '',
    followers: [],
    following: [],
  });
  return res.redirect('/login');
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      try {
        res.clearCookie('connect.sid');
      } catch (err) {
        void err;
      }
      return res.redirect('/login');
    });
  } else return res.redirect('/login');
};

exports.showProfile = async (req, res) => {
  const username = req.session && req.session.user;
  if (!username) return res.redirect('/login');
  let user = null;
  const repo = await getAuthRepo();
  if (repo) {
    try {
      const entity = await repo.findOne({ where: { username } });
      if (entity)
        user = {
          username: entity.username,
          displayName: entity.displayName || '',
          profilePhoto: entity.profilePhoto || '',
          followers: [],
          following: [],
        };
    } catch (err) {
      void err;
    }
  }
  if (!user)
    user = users.get(username) || {
      username,
      displayName: '',
      profilePhoto: '',
      followers: [],
      following: [],
    };
  let sidebarContent = '';
  let navSidebarContent = '';
  try {
    const AreaManager = (global && global.AreaManager) || null;
    if (AreaManager && typeof AreaManager.renderArea === 'function') {
      sidebarContent = await AreaManager.renderArea('sidebar');
      navSidebarContent = await AreaManager.renderArea('nav-sidebar');
    }
  } catch (err) {
    void err;
  }
  return res.render('users/profile', {
    title: `${user.displayName || user.username} - Profile`,
    user,
    sidebarContent,
    navSidebarContent,
    layout: 'layout',
  });
};

exports.postProfile = async (req, res) => {
  const username = req.session && req.session.user;
  if (!username) return res.redirect('/login');
  const { displayName } = req.body || {};
  let profilePhotoPath = null;
  if (req.file && req.file.path) {
    const publicPath = req.file.path.replace(/\\/g, '/');
    const idx = publicPath.indexOf('/public/');
    profilePhotoPath =
      idx > -1
        ? publicPath.substring(idx + '/public'.length)
        : '/' + publicPath;
  }
  const repo = await getAuthRepo();
  if (repo) {
    try {
      const entity = await repo.findOne({ where: { username } });
      if (!entity) return res.redirect('/login');
      if (displayName !== undefined) entity.displayName = displayName;
      if (profilePhotoPath) entity.profilePhoto = profilePhotoPath;
      await repo.save(entity);
      return res.redirect('/profile');
    } catch (err) {
      void err;
    }
  }
  const user = users.get(username);
  if (user) {
    if (displayName !== undefined) user.displayName = displayName;
    if (profilePhotoPath) user.profilePhoto = profilePhotoPath;
    users.set(username, user);
  }
  return res.redirect('/profile');
};
