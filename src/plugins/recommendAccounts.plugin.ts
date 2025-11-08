import { PluginManager } from '../common/pluginManager';

PluginManager.register({
  name: 'recommendAccounts',
  render() {
    const accounts = [
      {
        id: 1,
        name: 'OpenAI',
        username: '@OpenAI',
        followers: 1200,
        photo: '/uploads/openai.jpg',
      },
      {
        id: 2,
        name: 'NASA',
        username: '@nasa',
        followers: 980,
        photo: '/uploads/nasa.jpg',
      },
      {
        id: 3,
        name: 'Taylor Swift',
        username: '@taylorswift13',
        followers: 890,
        photo: '/uploads/taylor.jpg',
      },
      {
        id: 4,
        name: 'Elon Musk',
        username: '@elonmusk',
        followers: 1500,
        photo: '/uploads/elon.jpg',
      },
      {
        id: 5,
        name: 'Ariana Grande',
        username: '@arianagrande',
        followers: 1320,
        photo: '/uploads/ariana.jpg',
      },
    ];

    return `
      <style>
        .recommend-section {
          width: 350px;
          padding: 10px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          overflow-x: auto;         /* scroll horizontal */
          overflow-y: hidden;
        }

        .recommend-section h3 {
          font-size: 15px;
          margin-bottom: 8px;
          color: #d66b6b;
        }

        .recommend-carousel {
          display: inline-flex;     /* inline-flex penting agar scroll muncul */
          flex-direction: row;
          gap: 10px;
          min-width: max-content;   /* memaksa total lebar > container */
        }

        .recommend-card {
          flex: 0 0 auto;           /* mencegah shrink */
          width: 120px;
          background: #fdfdfd;
          border-radius: 8px;
          padding: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          text-align: center;
        }

        .profile-photo {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #fbc4c4;
          margin-bottom: 5px;
        }

        .recommend-info strong { font-size: 13px; }
        .recommend-info small { display: block; font-size: 11px; color: #666; }
        .followers-count { font-size: 11px; color: #888; margin-top: 2px; }

        .follow-btn {
          background: #1d9bf0;
          color: #fff;
          border: none;
          padding: 3px 8px;
          font-size: 11px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 4px;
        }

        /* scrollbar */
        .recommend-section::-webkit-scrollbar { height: 6px; }
        .recommend-section::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.3);
          border-radius: 3px;
        }
      </style>

      <div class="plugin recommend-section">
        <h3>✨ Rekomendasi Akun</h3>
        <div class="recommend-carousel">
          ${accounts
            .map(
              (acc) => `
              <div class="recommend-card" data-id="${acc.id}">
                <img src="${acc.photo}" alt="${acc.name}" class="profile-photo"/>
                <div class="recommend-info">
                  <strong>${acc.name}</strong>
                  <small>${acc.username}</small>
                  <div class="followers-count">${acc.followers} pengikut</div>
                  <button class="follow-btn">Ikuti</button>
                </div>
              </div>`,
            )
            .join('')}
        </div>
      </div>

      <script src="/js/recommendAccounts.js"></script>
    `;
  },
});
