document.addEventListener('DOMContentLoaded', () => {
  // LIKE toggle
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.like-btn');
    if (!btn) return;
    const liked = btn.classList.toggle('liked');
    let num = parseInt(btn.textContent.replace(/[^0-9]/g, ''));
    btn.textContent = liked ? `❤️ ${num + 1}` : `🤍 ${num - 1}`;
  });

  // REPOST toggle
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.repost-btn');
    if (!btn) return;
    const reposted = btn.classList.toggle('reposted');
    let num = parseInt(btn.textContent.replace(/[^0-9]/g, ''));
    btn.textContent = reposted ? `🔁 ${num + 1}` : `🔄 ${num - 1}`;
  });

  // KOMENTAR toggle
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.comment-btn');
    if (!btn) return;
    const post = btn.closest('.post');
    const section = post.querySelector('.comment-section');
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
  });

  // Kirim komentar baru
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.send-comment');
    if (!btn) return;

    const post = btn.closest('.post');
    const input = post.querySelector('.add-comment input');
    const list = post.querySelector('.comments-list');
    const text = input.value.trim();
    if (!text) return;

    const newComment = createCommentElement('Kamu', text);
    list.appendChild(newComment);
    input.value = '';

    updateCommentCount(post);
  });

  // Toggle input balasan
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.reply-toggle');
    if (!btn) return;
    const parent = btn.closest('.comment, .reply');
    const replyInput = parent.querySelector(':scope > .reply-input');
    replyInput.style.display = replyInput.style.display === 'none' ? 'flex' : 'none';
  });

  // Kirim balasan (reply)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.send-reply');
    if (!btn) return;
    const replyInput = btn.closest('.reply-input');
    const input = replyInput.querySelector('input');
    const text = input.value.trim();
    if (!text) return;

    // Ambil container .replies langsung di level yang tepat
    const parentComment = replyInput.closest('.comment, .reply');
    const repliesContainer = parentComment.querySelector(':scope > .replies');

    const newReply = createCommentElement('Kamu', text);
    repliesContainer.appendChild(newReply);

    input.value = '';
    replyInput.style.display = 'none';

    const post = btn.closest('.post');
    updateCommentCount(post);
  });

  // ==== Fungsi bantu ====

  function createCommentElement(username, text) {
    const div = document.createElement('div');
    div.className = 'reply'; // Bisa dipakai juga untuk komentar utama (strukturnya sama)
    div.innerHTML = `
      <strong>${username}</strong>: ${text}
      <span class="comment-time">baru saja</span>
      <button class="reply-toggle">Balas</button>
      <div class="replies"></div>
      <div class="reply-input" style="display:none;">
        <input type="text" placeholder="Balas komentar..." />
        <button class="send-reply">Kirim</button>
      </div>
    `;
    return div;
  }

  function updateCommentCount(post) {
    const commentBtn = post.querySelector('.comment-btn');
    const allComments = post.querySelectorAll('.comment, .reply');
    commentBtn.textContent = `💬 ${allComments.length}`;
  }
});
