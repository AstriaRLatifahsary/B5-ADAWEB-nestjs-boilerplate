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
                  <div class="followers-count"><span>${acc.followers}</span> pengikut</div>
                  <button class="follow-btn" data-following="false">Ikuti</button>
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
