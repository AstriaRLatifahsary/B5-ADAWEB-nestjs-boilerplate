import { PluginManager } from '../common/pluginManager';

PluginManager.register({
  name: 'recentPosts',
  render() {
    const posts = [
      {
        title: 'Breaking: AI Technology Reaches New Milestone',
        date: '2025-10-15',
      },
      {
        title: 'Tech Giant Announces Revolutionary Product Launch',
        date: '2025-10-12',
      },
      { title: 'Global Summit on Climate Change Begins', date: '2025-10-10' },
      {
        title: 'New Study Reveals Health Benefits of Mediterranean Diet',
        date: '2025-10-08',
      },
    ];

    return `
      <div class="recent-posts">
        <h3>📰 Recent Posts</h3>
        <ul>
          ${posts
            .map(
              (p) =>
                `<li><strong>${p.title}</strong> <small>${p.date}</small></li>`,
            )
            .join('')}
        </ul>
      </div>
    `;
  },
});
