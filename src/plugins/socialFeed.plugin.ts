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
    const randomHours = () => `${Math.floor(Math.random() * 23) + 1} jam lalu`;

    // 🔹 Dummy komentar
    const allComments = [
      'Postingan ini sangat inspiratif!',
      'Wah, nggak nyangka bisa sebagus ini!',
      'Informasi yang sangat berguna, terima kasih!',
      'Mantap banget hasilnya 💪',
      'Saya baru tahu soal ini, menarik sekali!',
      'Ide yang brilian, harus dicoba!',
      'Keren banget konsepnya 🔥',
      'Setuju! Ini langkah yang tepat 👍',
      'Suka banget cara penyampaiannya!',
      'Semoga makin banyak update seperti ini!',
      'Boleh juga nih buat dijadikan referensi 😄',
      'Kontennya menarik banget, lanjut terus!',
      'Wah ini bikin semangat belajar lagi!',
      'Nggak nyangka bakal se-efektif ini!',
      'Bener banget, saya juga merasakan hal yang sama!',
      'Visualnya keren, simple tapi impactful!',
      'Topiknya relevan banget sama kondisi sekarang!',
      'Terinspirasi banget baca ini ✨',
      'Suka gaya komunikasinya, ringan tapi dalam!',
      'Tolong bahas topik ini lebih dalam lagi ya!',
      'Wah keren banget hasil eksperimennya!',
      'Menarik banget pembahasannya!',
      'Baru tahu ada hal seperti ini di bidang AI!',
      'Salut dengan effortnya, luar biasa!',
      'Suka banget detail yang dijelaskan di sini!',
      'Ini baru konten berkualitas 👏',
      'Terima kasih sudah berbagi informasi seperti ini!',
      'Wah kalau begini masa depan teknologi makin seru!',
      'Bisa dijelasin lebih lanjut di posting berikutnya?',
      'Konten seperti ini yang saya tunggu-tunggu!',
      'Semangat terus berkarya 💫',
      'Postingan ini bikin saya mikir ulang 😮',
      'Luar biasa inovatif!',
      'Penjelasannya mudah dipahami banget!',
      'Wah keren, jadi pengen belajar lebih dalam!',
      'Suka banget vibe positifnya!',
      'Nggak sabar lihat versi selanjutnya!',
      'Postingan ini benar-benar relate banget!',
      'Suka banget sama pendekatannya!',
      'Informasinya padat tapi jelas 💡',
      'Wah jadi tahu hal baru lagi, mantap!',
      'Cocok banget buat pemula yang baru belajar!',
      'Saya udah coba juga, hasilnya bagus!',
      'Setuju banget sama poin ini!',
      'Inspiratif banget buat generasi muda!',
      'Suka banget gaya visualnya 🎨',
      'Nggak nyangka bisa sepopuler ini!',
      'Wah baru sadar ini penting banget!',
      'Bener-bener keren deh! 🔥',
      'Suka banget sama insight-nya!',
    ];

    const sampleUsersReal = [
      'Rara_tech',
      'BudiTravels',
      'SitiMusic',
      'AldiDev',
      'NinaAI',
      'YogaFilm',
      'DewiArt',
      'RicoSpace',
      'FaniCrypto',
      'LukasGamer',
      'TariLifestyle',
      'RanggaStartup',
      'MayaDesign',
      'VinoPhoto',
      'LiaEdu',
    ];

    const sampleTopics = [
      'kecerdasan buatan',
      'teknologi',
      'startup',
      'game',
      'pemrograman',
      'musik',
      'film',
      'perjalanan',
      'gaya hidup',
      'produktifitas',
      'pendidikan',
      'keamanan siber',
      'web3',
      'blockchain',
      'AR/VR',
      'desain',
      'antariksa',
      'sains',
    ];

    const usedIndices = new Set<number>();
    const randomUniqueComment = (): Comment => {
      let index;
      do {
        index = Math.floor(Math.random() * allComments.length);
      } while (usedIndices.has(index) && usedIndices.size < allComments.length);
      usedIndices.add(index);

      return {
        username:
          sampleUsersReal[Math.floor(Math.random() * sampleUsersReal.length)],
        content: allComments[index],
        time: `${Math.floor(Math.random() * 59) + 1} menit lalu`,
        replies: [],
      };
    };

    // 🔹 Postingan utama (lebih realistis)
    const posts: Post[] = [
      {
        id: 1,
        username: 'Elon Musk',
        handle: '@elonmusk',
        content: 'Penerbangan Starship ke-3 dijadwalkan minggu depan 🚀🔥',
        likes: 980,
        reposts: 422,
        comments: 3,
        time: '1 jam lalu',
        image:
          'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=800&q=80',
        commentList: [
          randomUniqueComment(),
          randomUniqueComment(),
          randomUniqueComment(),
        ],
      },
      {
        id: 2,
        username: 'OpenAI',
        handle: '@OpenAI',
        content:
          'Memperkenalkan GPT-5 — lebih cerdas, lebih cepat, dan lebih bermanfaat dari sebelumnya.',
        likes: 1200,
        reposts: 530,
        comments: 3,
        time: '2 jam lalu',
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        commentList: [
          randomUniqueComment(),
          randomUniqueComment(),
          randomUniqueComment(),
        ],
      },
      {
        id: 3,
        username: 'Taylor Swift',
        handle: '@taylorswift13',
        content:
          'Sangat bersyukur atas semua cinta kalian selama The Eras Tour 💕🎶',
        likes: 890,
        reposts: 312,
        comments: 2,
        time: '3 jam lalu',
        image:
          'https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=800&q=80',
        commentList: [randomUniqueComment(), randomUniqueComment()],
      },
      {
        id: 4,
        username: 'NASA',
        handle: '@nasa',
        content:
          '🌕 Pengujian rover bulan berhasil diselesaikan! Langkah selanjutnya: misi Artemis.',
        likes: 650,
        reposts: 212,
        comments: 2,
        time: '5 jam lalu',
        image:
          'https://images.unsplash.com/photo-1580428180121-88a88f69b5e5?auto=format&fit=crop&w=800&q=80',
        commentList: [randomUniqueComment(), randomUniqueComment()],
      },
    ];

    // 🔁 Tambahan postingan dummy lebih realistis
    for (let i = 0; i < 50; i++) {
      const username =
        sampleUsersReal[Math.floor(Math.random() * sampleUsersReal.length)];
      const topic =
        sampleTopics[Math.floor(Math.random() * sampleTopics.length)];
      const hasImage = Math.random() < 0.4;
      const commentCount = Math.floor(Math.random() * 5); // 0–4 komentar
      const generatedComments: Comment[] = [];
      for (let j = 0; j < commentCount; j++) {
        generatedComments.push(randomUniqueComment());
      }

      posts.push({
        id: posts.length + 1,
        username: username,
        handle: `@${username.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        content: [
          `Baru saja mencoba hal baru tentang ${topic}, ternyata sangat menarik!`,
          `Apa pendapat kalian soal inovasi terbaru di bidang ${topic}?`,
          `Hari ini belajar banyak tentang ${topic}, share pengalaman kalian dong.`,
          `Update terbaru tentang ${topic}, ini insight menarik yang aku temukan!`,
          `Bagi yang tertarik dengan ${topic}, ini tips praktisnya.`,
        ][Math.floor(Math.random() * 5)],
        likes: randomLikes(),
        reposts: randomReposts(),
        comments: commentCount,
        time: randomHours(),
        image: hasImage
          ? `https://picsum.photos/seed/${username}-${i}/600/400`
          : undefined,
        commentList: generatedComments,
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
              </div>`,
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
              </div>`,
              )
              .join('')}
          </div>
          <div class="add-comment">
            <input type="text" placeholder="Tulis komentar..." />
            <button class="send-comment">Kirim</button>
          </div>
        </div>
      </div>`,
      )
      .join('');

    const html = `
      <style>
        .social-feed {
          max-width: 100%;
          box-sizing: border-box;
          max-height: calc(100vh - 160px);
          overflow-y: auto;
          padding-right: 8px;
        }

        .social-feed h3 { margin-top: 0; }

        .social-feed .post { margin-bottom: 12px; }

        @media (max-width: 600px) {
          .social-feed { max-height: calc(100vh - 200px); }
        }
      </style>

      <div class="social-feed">
        <h3>🔥 Trending Feed</h3>
        ${items}
      </div>
    `;

    return Promise.resolve(html);
  },
});
