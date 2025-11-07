import { PluginManager } from '../common/pluginManager';

interface Reply {
  username: string;
  content: string;
  time: string;
}

interface Comment {
  username: string;
  content: string;
  time: string;
  replies?: Reply[];
}

interface Post {
  id: number;
  username: string;
  handle: string;
  content: string;
  likes: number;
  reposts: number;
  comments: number;
  time: string;
  image?: string;
  commentList: Comment[];
}

PluginManager.register({
  name: 'socialFeed',

  render: (): Promise<string> => {
    const randomLikes = () => Math.floor(Math.random() * 900) + 20;
    const randomReposts = () => Math.floor(Math.random() * 200) + 5;
    const randomComments = () => Math.floor(Math.random() * 60) + 1;
    const randomHours = () => `${Math.floor(Math.random() * 23) + 1}h ago`;

    const posts: Post[] = [
      {
        id: 1,
        username: 'Elon Musk',
        handle: '@elonmusk',
        content: 'Starship flight 3 scheduled next week 🚀🔥',
        likes: 980,
        reposts: 422,
        comments: 151,
        time: '1h ago',
        image:
          'https://cdn.pixabay.com/photo/2019/06/17/19/48/rocket-4281575_960_720.jpg',
        commentList: [
          {
            username: 'SpaceNerd',
            content: 'Can’t wait for liftoff! 🚀',
            time: '5m ago',
          },
        ],
      },
      {
        id: 2,
        username: 'OpenAI',
        handle: '@OpenAI',
        content:
          'Introducing GPT-5 — smarter, faster, and more helpful than ever.',
        likes: 1200,
        reposts: 530,
        comments: 202,
        time: '2h ago',
        image:
          'https://cdn.pixabay.com/photo/2022/12/03/10/26/artificial-intelligence-7631843_960_720.jpg',
        commentList: [
          {
            username: 'TechGuru',
            content: 'AI is moving too fast 😅',
            time: '1h ago',
          },
        ],
      },
      {
        id: 3,
        username: 'Taylor Swift',
        handle: '@taylorswift13',
        content: 'Feeling grateful for all your love during The Eras Tour 💕🎶',
        likes: 890,
        reposts: 312,
        comments: 150,
        time: '3h ago',
        image:
          'https://cdn.pixabay.com/photo/2017/08/02/01/47/concert-2575809_960_720.jpg',
        commentList: [],
      },
      {
        id: 4,
        username: 'NASA',
        handle: '@nasa',
        content:
          '🌕 Lunar rover testing completed successfully! Next step: Artemis mission.',
        likes: 650,
        reposts: 212,
        comments: 77,
        time: '5h ago',
        image:
          'https://cdn.pixabay.com/photo/2019/09/15/21/24/moon-4480933_960_720.jpg',
        commentList: [],
      },
    ];

    // 🔁 generate dummy tambahan otomatis (total 100 posting)
    const topics = [
      'AI',
      'technology',
      'startup',
      'gaming',
      'coding',
      'music',
      'movies',
      'travel',
      'lifestyle',
      'productivity',
      'education',
      'cybersecurity',
      'web3',
      'blockchain',
      'AR/VR',
      'design',
      'space',
      'science',
    ];

    for (let i = 5; i <= 100; i++) {
      const topic = topics[Math.floor(Math.random() * topics.length)];
      const hasImage = Math.random() < 0.3; // 30% punya foto
      posts.push({
        id: i,
        username: `User${i}`,
        handle: `@user${i}`,
        content: `Trending thought on ${topic} — what do you think about the latest innovation? #${topic}`,
        likes: randomLikes(),
        reposts: randomReposts(),
        comments: randomComments(),
        time: randomHours(),
        image: hasImage
          ? `https://picsum.photos/seed/${topic}-${i}/600/400`
          : undefined,
        commentList: [],
      });
    }

    const renderReplies = (replies?: Reply[]) => `
      <div class="replies">
        ${
          replies && replies.length
            ? replies
                .map(
                  (r) => `
              <div class="reply">
                <strong>${r.username}</strong>: ${r.content}
                <span class="comment-time">${r.time}</span>
              </div>
            `,
                )
                .join('')
            : ''
        }
      </div>
    `;

    const items = posts
      .map(
        (p) => `
      <div class="post" data-id="${p.id}">
        <div class="post-header">
          <strong>${p.username}</strong>
          <span class="handle">${p.handle}</span>
          <span class="time">${p.time}</span>
        </div>

        <div class="post-content">${p.content}</div>
        ${p.image ? `<img src="${p.image}" alt="post-image" class="post-image"/>` : ''}

        <div class="post-actions">
          <button class="like-btn">🤍 ${p.likes}</button>
          <button class="comment-btn">💬 ${p.comments}</button>
          <button class="repost-btn">🔄 ${p.reposts}</button>
        </div>

        <div class="comment-section" style="display:none;">
          <div class="comments-list">
            ${p.commentList
              .map(
                (c) => `
              <div class="comment">
                <strong>${c.username}</strong>: ${c.content}
                <span class="comment-time">${c.time}</span>
                <button class="reply-toggle">Balas</button>
                ${renderReplies(c.replies)}
                <div class="reply-input" style="display:none;">
                  <input type="text" placeholder="Balas komentar..." />
                  <button class="send-reply">Kirim</button>
                </div>
              </div>
            `,
              )
              .join('')}
          </div>
          <div class="add-comment">
            <input type="text" placeholder="Tulis komentar..." />
            <button class="send-comment">Kirim</button>
          </div>
        </div>
      </div>
    `,
      )
      .join('');

    const html = `
      <div class="social-feed">
        <h3>🔥 Trending Feed (Dummy 2025)</h3>
        ${items}
      </div>
    `;

    return Promise.resolve(html);
  },
});
