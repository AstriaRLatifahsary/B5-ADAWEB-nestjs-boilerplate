# 🔌 Plugin & Area System Documentation

## 📖 Overview

Sistem ini memungkinkan Anda menambahkan konten dinamis ke berbagai area di aplikasi (seperti sidebar, header, footer) dengan mudah menggunakan plugin yang dapat diregistrasi.

## 🏗️ Arsitektur

```
┌─────────────────────────────────────────┐
│           main.ts (Bootstrap)           │
│  ┌──────────────┐  ┌────────────────┐  │
│  │PluginManager │  │AreaManager     │  │
│  │  - register  │  │- registerToArea│  │
│  │  - getPlugin │  │- renderArea    │  │
│  └──────────────┘  └────────────────┘  │
└─────────────────────────────────────────┘
                    ↓
        ┌───────────────────────┐
        │   Plugins Directory   │
        ├───────────────────────┤
        │ recentPosts.plugin.ts │
        │ slideshow.plugin.ts   │
        │ yourPlugin.plugin.ts  │
        └───────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  Controller/View      │
        │  renderArea('sidebar')│
        └───────────────────────┘
```

## 🚀 Cara Membuat Plugin Baru

### 1️⃣ Buat File Plugin

Buat file baru di `src/plugins/namaPlugin.plugin.ts`:

```typescript
import PluginManager from '../common/pluginManager';

// Register plugin
PluginManager.register({
  name: 'namaPlugin', // Nama unik
  
  // Fungsi render - return HTML string
  render: async (): Promise<string> => {
    return `
      <div class="your-plugin">
        <h3>Judul Plugin</h3>
        <p>Konten plugin Anda di sini</p>
      </div>
    `;
  },
});
```

### 2️⃣ Import Plugin di Index

Tambahkan import di `src/plugins/index.ts`:

```typescript
import './recentPosts.plugin';
import './slideshow.plugin';
import './namaPlugin.plugin'; // ← Tambahkan ini
```

### 3️⃣ Daftarkan ke Area

Di `src/main.ts`, tambahkan registrasi area:

```typescript
async function bootstrap() {
  // ... kode lain
  
  // Import plugins
  await import('./plugins');
  
  // Register plugins to areas
  AreaManager.registerToArea('sidebar', 'recentPosts');
  AreaManager.registerToArea('sidebar', 'slideshow');
  AreaManager.registerToArea('sidebar', 'namaPlugin'); // ← Tambahkan ini
  
  // ... kode lain
}
```

### 4️⃣ Tambahkan CSS (Opsional)

Tambahkan styling di `themes/default/views/partials/header.ejs`:

```css
.your-plugin {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.your-plugin h3 {
  margin-top: 0;
  color: #333;
}
```

## 📍 Cara Menambahkan Area Baru

### 1️⃣ Daftarkan Plugin ke Area Baru

Di `src/main.ts`:

```typescript
// Contoh: area header
AreaManager.registerToArea('header', 'searchBox');
AreaManager.registerToArea('header', 'userMenu');

// Contoh: area footer
AreaManager.registerToArea('footer', 'newsletter');
AreaManager.registerToArea('footer', 'socialLinks');
```

### 2️⃣ Render Area di Controller

Di controller Anda (contoh: `src/home/home.controller.ts`):

```typescript
@Get()
async getHome(): Promise<void> {
  const sidebarContent = await AreaManager.renderArea('sidebar');
  const headerContent = await AreaManager.renderArea('header');
  const footerContent = await AreaManager.renderArea('footer');
  
  this.render('home', {
    sidebarContent,
    headerContent,
    footerContent,
  });
}
```

### 3️⃣ Tampilkan di View/Template

Di file EJS Anda (contoh: `themes/default/views/layout.ejs`):

```html
<header>
  <%- headerContent %>
</header>

<div class="container">
  <main class="content">
    <%- body %>
  </main>
  
  <aside class="sidebar">
    <%- sidebarContent %>
  </aside>
</div>

<footer>
  <%- footerContent %>
</footer>
```

## 💡 Contoh Plugin Lengkap

### Plugin dengan Data Dinamis

```typescript
import PluginManager from '../common/pluginManager';

interface NewsItem {
  title: string;
  link: string;
  date: string;
}

PluginManager.register({
  name: 'latestNews',
  
  render: async (): Promise<string> => {
    // Bisa fetch dari database atau API
    const news: NewsItem[] = [
      {
        title: 'Breaking News 1',
        link: '/news/1',
        date: '2025-10-18',
      },
      {
        title: 'Breaking News 2',
        link: '/news/2',
        date: '2025-10-17',
      },
    ];
    
    const items = news
      .map(
        (item) => `
        <li>
          <a href="${item.link}">
            <h4>${item.title}</h4>
            <span class="date">${item.date}</span>
          </a>
        </li>
      `,
      )
      .join('');
    
    return `
      <div class="latest-news">
        <h3>Latest News</h3>
        <ul>${items}</ul>
      </div>
    `;
  },
});
```

### Plugin dengan Async Data

```typescript
import PluginManager from '../common/pluginManager';

PluginManager.register({
  name: 'weatherWidget',
  
  render: async (): Promise<string> => {
    try {
      // Contoh fetch data dari API
      const response = await fetch('https://api.weather.com/...');
      const data = await response.json();
      
      return `
        <div class="weather-widget">
          <h3>Weather Today</h3>
          <p>Temperature: ${data.temp}°C</p>
          <p>Condition: ${data.condition}</p>
        </div>
      `;
    } catch (error) {
      return `
        <div class="weather-widget">
          <p>Unable to load weather data</p>
        </div>
      `;
    }
  },
});
```

## 📸 Hasil Tampilan

### Layout 2-Kolom (Desktop)

```
┌────────────────────────────────────────────────────┐
│                   Header/Nav                       │
├─────────────────────────────┬──────────────────────┤
│                             │  ┌────────────────┐  │
│                             │  │ Recent Posts   │  │
│    Main Content Area        │  │ - News 1       │  │
│                             │  │ - News 2       │  │
│    (flex: 1)                │  └────────────────┘  │
│                             │  ┌────────────────┐  │
│                             │  │ Slideshow      │  │
│                             │  │ [Image Gallery]│  │
│                             │  └────────────────┘  │
│                             │                      │
│                             │  Sidebar (300px)     │
└─────────────────────────────┴──────────────────────┘
```

### Layout Mobile (< 768px)

```
┌────────────────────────────┐
│      Header/Nav            │
├────────────────────────────┤
│                            │
│    Main Content Area       │
│    (full width)            │
│                            │
├────────────────────────────┤
│  ┌──────────────────────┐  │
│  │ Recent Posts         │  │
│  └──────────────────────┘  │
│  ┌──────────────────────┐  │
│  │ Slideshow            │  │
│  └──────────────────────┘  │
│                            │
│  Sidebar (full width)      │
└────────────────────────────┘
```

## 🔍 API Reference

### PluginManager

| Method | Parameter | Return | Deskripsi |
|--------|-----------|--------|-----------|
| `register()` | `Plugin` | `void` | Mendaftarkan plugin baru |
| `getPlugin()` | `name: string` | `Plugin \| undefined` | Mengambil plugin berdasarkan nama |
| `has()` | `name: string` | `boolean` | Cek apakah plugin sudah terdaftar |
| `reset()` | - | `void` | Reset semua plugin (untuk testing) |

### AreaManager

| Method | Parameter | Return | Deskripsi |
|--------|-----------|--------|-----------|
| `registerToArea()` | `areaName: string, pluginName: string` | `void` | Daftarkan plugin ke area tertentu |
| `renderArea()` | `areaName: string` | `Promise<string>` | Render semua plugin di area |
| `reset()` | - | `void` | Reset semua area (untuk testing) |

### Plugin Interface

```typescript
interface Plugin {
  name: string;                          // Nama unik plugin
  render: () => Promise<string> | string; // Fungsi render HTML
}
```

## ✅ Best Practices

1. **Penamaan Plugin**: Gunakan camelCase (contoh: `recentPosts`, `userMenu`)
2. **Nama Unik**: Pastikan setiap plugin punya nama yang unik
3. **Error Handling**: Tambahkan try-catch untuk plugin yang fetch data
4. **Responsive**: Pastikan CSS plugin responsive untuk mobile
5. **Performance**: Hindari operasi berat di fungsi render, gunakan caching jika perlu

## 🐛 Troubleshooting

### Plugin Tidak Muncul

1. Cek apakah plugin sudah di-import di `src/plugins/index.ts`
2. Cek apakah plugin sudah didaftarkan ke area di `src/main.ts`
3. Cek console browser untuk error JavaScript

### Styling Tidak Terapply

1. Cek CSS di `themes/default/views/partials/header.ejs`
2. Cek juga `themes/dark/views/partials/header.ejs` untuk dark mode
3. Clear browser cache

### Area Tidak Render

1. Pastikan controller memanggil `await AreaManager.renderArea()`
2. Pastikan variabel di-pass ke view template
3. Cek template EJS menggunakan `<%- variableName %>` (bukan `<%= %>`)

## 📚 Referensi

- Main Implementation: `src/common/pluginManager.ts`, `src/common/areaManager.ts`
- Example Plugins: `src/plugins/recentPosts.plugin.ts`, `src/plugins/slideshow.plugin.ts`
- Bootstrap: `src/main.ts`
- Controller Example: `src/home/home.controller.ts`
- Layout: `themes/default/views/layout.ejs`

---

**Happy Plugin Development! 🚀**
