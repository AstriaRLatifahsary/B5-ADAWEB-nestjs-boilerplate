import { PluginManager } from '../common/pluginManager';

PluginManager.register({
  name: 'newPost',

  render: (): Promise<string> => {
    const html = `
      <style>
        /* Emoji Picker Styles */
        .emoji-picker {
          position: absolute;
          bottom: 100%;
          left: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          padding: 12px;
          display: none;
          grid-template-columns: repeat(8, 1fr);
          gap: 8px;
          margin-bottom: 8px;
          z-index: 1000;
          max-width: 320px;
        }

        .emoji-picker.active {
          display: grid;
        }

        .emoji-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .emoji-btn:hover {
          background: rgba(0,0,0,0.05);
          transform: scale(1.2);
        }

        /* 🌈 Gen Z Pastel + Glassmorphism */
        .add-post {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 16px;
          margin: 16px auto;
          width: 100%;
          max-width: 550px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          font-family: "Poppins", sans-serif;
          transition: transform 0.2s ease;
        }

        .add-post:hover { transform: translateY(-2px); }

        .post-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        #new-post-username {
          flex: 1;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.5);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          color: #333;
        }

        #new-post-content {
          width: 100%;
          border: none;
          outline: none;
          resize: none;
          padding: 12px;
          border-radius: 12px;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.6);
          color: #222;
          margin-bottom: 12px;
          min-height: 80px;
          transition: background 0.2s ease;
        }

        #new-post-content:focus {
          background: rgba(255, 255, 255, 0.8);
        }

        .post-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .post-tools {
          display: flex;
          gap: 10px;
        }

        .tool-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          transition: transform 0.2s;
        }

        .tool-button:hover {
          transform: scale(1.2);
        }

        #submit-post {
          background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
          border: none;
          padding: 10px 18px;
          border-radius: 50px;
          cursor: pointer;
          color: #222;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 10px rgba(161, 196, 253, 0.5);
        }

        #submit-post:hover {
          background: linear-gradient(135deg, #c2e9fb, #a1c4fd);
          transform: translateY(-2px);
        }

        .image-preview {
          margin-top: 10px;
          display: none;
        }

        .image-preview img {
          width: 100%;
          border-radius: 12px;
          max-height: 250px;
          object-fit: cover;
          margin-top: 8px;
        }

        .post-notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          padding: 12px 24px;
          border-radius: 30px;
          font-weight: 500;
          color: #333;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          animation: fadeInOut 3s ease;
          max-width: 80%;
          text-align: center;
          line-height: 1.5;
        }
        
        .post-notification.error {
          background: linear-gradient(135deg, #ff4444, #ff0000);
          color: white;
          font-weight: 600;
          box-shadow: 0 8px 20px rgba(255, 0, 0, 0.2);
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px) translateX(-50%); }
          10% { opacity: 1; transform: translateY(0) translateX(-50%); }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(10px) translateX(-50%); }
        }
      </style>

      <div class="add-post">
        <textarea id="new-post-content" placeholder="Apa yang sedang Anda pikirkan? 🌸" rows="3"></textarea>
        
        <!-- 📸 Preview foto -->
        <div class="image-preview" id="image-preview">
          <img id="preview-img" src="" alt="Preview Foto">
        </div>

        <div class="post-actions">
          <div class="post-tools">
            <button class="tool-button" id="photo-btn" title="Tambah Gambar">📷</button>
            <input type="file" id="image-input" accept="image/*" style="display:none;">
            <div style="position: relative;">
              <button class="tool-button" id="emoji-btn" title="Tambah Emoji">😊</button>
              <div class="emoji-picker" id="emoji-picker">
                <!-- Common emojis -->
                <button class="emoji-btn">😊</button>
                <button class="emoji-btn">😂</button>
                <button class="emoji-btn">❤️</button>
                <button class="emoji-btn">👍</button>
                <button class="emoji-btn">🔥</button>
                <button class="emoji-btn">✨</button>
                <button class="emoji-btn">🎉</button>
                <button class="emoji-btn">🌟</button>
                <button class="emoji-btn">💕</button>
                <button class="emoji-btn">🥰</button>
                <button class="emoji-btn">😍</button>
                <button class="emoji-btn">🤗</button>
                <button class="emoji-btn">👋</button>
                <button class="emoji-btn">🎨</button>
                <button class="emoji-btn">🌈</button>
                <button class="emoji-btn">🌺</button>
                <button class="emoji-btn">🍀</button>
                <button class="emoji-btn">🌸</button>
                <button class="emoji-btn">⭐</button>
                <button class="emoji-btn">💫</button>
                <button class="emoji-btn">💝</button>
                <button class="emoji-btn">💖</button>
                <button class="emoji-btn">💯</button>
                <button class="emoji-btn">🎵</button>
              </div>
            </div>
          </div>
          <button id="submit-post">
            <span class="button-content">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Posting
            </span>
          </button>
        </div>
      </div>

      <script>
        document.addEventListener('DOMContentLoaded', () => {
          const photoBtn = document.getElementById('photo-btn');
          const imageInput = document.getElementById('image-input');
          const previewContainer = document.getElementById('image-preview');
          const previewImg = document.getElementById('preview-img');
          const submitBtn = document.getElementById('submit-post');

          // Helper: add owner controls (edit + delete) to a post element
          const addOwnerControls = (div, postId) => {
            const actionsEl = div.querySelector('.post-actions');
            if (!actionsEl) return;

            // Avoid adding controls twice
            if (actionsEl.querySelector('.delete-btn') || actionsEl.querySelector('.edit-btn')) return;

            // EDIT button (pencil icon)
            const editBtn = document.createElement('button');
            editBtn.className = 'tool-button edit-btn';
            editBtn.setAttribute('aria-label', 'Edit postingan Anda');
            editBtn.title = 'Edit postingan Anda';
            editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4h7a1 1 0 0 1 1 1v7"></path><path d="M21 3l-8 8"></path><path d="M3 21l4-1 9-9 1-4-13 13z"></path></svg>';
            editBtn.style.marginLeft = '8px';
            actionsEl.appendChild(editBtn);

            // DELETE button (trash) — same as before
            const delBtn = document.createElement('button');
            delBtn.className = 'tool-button delete-btn';
            delBtn.setAttribute('aria-label', 'Hapus postingan Anda');
            delBtn.title = 'Hapus postingan Anda';
            delBtn.style.marginLeft = '8px';
            delBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>';
            actionsEl.appendChild(delBtn);

            // Delete handler
            delBtn.addEventListener('click', async () => {
              const ok = confirm('Hapus postingan ini?');
              if (!ok) return;
              const r = await fetch('/api/posts/' + postId, { method: 'DELETE' });
              if (!r.ok) {
                const notif = document.createElement('div');
                notif.className = 'post-notification error';
                notif.textContent = 'Gagal menghapus postingan.';
                document.body.appendChild(notif);
                setTimeout(() => notif.remove(), 3000);
                return;
              }
              // remove from DOM
              div.remove();
              // remove from localStorage
              try {
                const myPosts2 = JSON.parse(localStorage.getItem('myPosts') || '[]').filter(id => id !== postId);
                localStorage.setItem('myPosts', JSON.stringify(myPosts2));
              } catch (e) {}
            });

            // Edit handler
            editBtn.addEventListener('click', () => {
              const contentEl = div.querySelector('.post-content');
              if (!contentEl) return;
              // Prevent multiple editors
              if (div.querySelector('textarea.edit-area')) return;

              const originalText = contentEl.textContent || '';
              contentEl.style.display = 'none';
              const textarea = document.createElement('textarea');
              textarea.className = 'edit-area';
              textarea.value = originalText;
              textarea.rows = 4;
              textarea.style.width = '100%';
              contentEl.parentNode.insertBefore(textarea, contentEl);

              // Save / Cancel buttons
              const saveBtn = document.createElement('button');
              saveBtn.className = 'tool-button save-edit-btn';
              saveBtn.textContent = 'Simpan';
              saveBtn.style.marginLeft = '8px';

              const cancelBtn = document.createElement('button');
              cancelBtn.className = 'tool-button cancel-edit-btn';
              cancelBtn.textContent = 'Batal';
              cancelBtn.style.marginLeft = '6px';

              // Hide edit/delete while editing
              editBtn.style.display = 'none';
              delBtn.style.display = 'none';
              actionsEl.appendChild(saveBtn);
              actionsEl.appendChild(cancelBtn);

              cancelBtn.addEventListener('click', () => {
                textarea.remove();
                contentEl.style.display = 'block';
                saveBtn.remove();
                cancelBtn.remove();
                editBtn.style.display = '';
                delBtn.style.display = '';
              });

              saveBtn.addEventListener('click', async () => {
                const newContent = textarea.value.trim();
                // PUT to API
                const r = await fetch('/api/posts/' + postId, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ content: newContent }),
                });
                if (!r.ok) {
                  const notif = document.createElement('div');
                  notif.className = 'post-notification error';
                  notif.textContent = 'Gagal menyimpan perubahan.';
                  document.body.appendChild(notif);
                  setTimeout(() => notif.remove(), 3000);
                  return;
                }
                const updated = await r.json();
                // update DOM
                contentEl.textContent = updated.content || newContent;
                textarea.remove();
                contentEl.style.display = 'block';
                saveBtn.remove();
                cancelBtn.remove();
                editBtn.style.display = '';
                delBtn.style.display = '';
              });
            });
          };

          // 📸 klik tombol kamera → buka file picker
          if (photoBtn && imageInput) {
            photoBtn.addEventListener('click', () => imageInput.click());
          }

          // � Emoji picker functionality
          const emojiBtn = document.getElementById('emoji-btn');
          const emojiPicker = document.getElementById('emoji-picker');
          const contentTextarea = document.getElementById('new-post-content');

          if (emojiBtn && emojiPicker && contentTextarea) {
            // Toggle emoji picker
            emojiBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              emojiPicker.classList.toggle('active');
            });

            // Close emoji picker when clicking outside
            document.addEventListener('click', (e) => {
              if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
                emojiPicker.classList.remove('active');
              }
            });

            // Handle emoji selection
            const emojiButtons = emojiPicker.querySelectorAll('.emoji-btn');
            emojiButtons.forEach(btn => {
              btn.addEventListener('click', (e) => {
                e.preventDefault();
                const emoji = btn.textContent;
                const start = contentTextarea.selectionStart;
                const end = contentTextarea.selectionEnd;
                const text = contentTextarea.value;
                const before = text.substring(0, start);
                const after = text.substring(end);
                
                contentTextarea.value = before + emoji + after;
                contentTextarea.focus();
                contentTextarea.selectionStart = contentTextarea.selectionEnd = start + emoji.length;
                
                // Close picker after selection
                emojiPicker.classList.remove('active');
              });
            });
          }

          // Decorate existing posts in the feed that belong to this client
          try {
            const myPostsOnLoad = JSON.parse(localStorage.getItem('myPosts') || '[]');
            if (Array.isArray(myPostsOnLoad) && myPostsOnLoad.length) {
              const feedEl = document.querySelectorAll('.social-feed .post');
              feedEl.forEach(pEl => {
                const id = Number(pEl.dataset.id);
                if (myPostsOnLoad.includes(id)) {
                  addOwnerControls(pEl, id);
                }
              });
            }
          } catch (e) {
            // ignore
          }

          // �🖼 tampilkan preview gambar dengan validasi
          if (imageInput) {
            imageInput.addEventListener('change', (e) => {
              const file = e.target.files[0];
              if (file) {
                // Validasi ukuran file (max 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                  const notification = document.createElement('div');
                  notification.className = 'post-notification error';
                  notification.innerHTML = \`
                    Ukuran file terlalu besar!<br>
                    Ukuran saat ini: \${(file.size / 1024 / 1024).toFixed(2)}MB<br>
                    Batas maksimal: 5MB<br><br>
                    Silakan pilih file yang lebih kecil.
                  \`;
                  document.body.appendChild(notification);
                  setTimeout(() => notification.remove(), 5000);
                  imageInput.value = '';
                  return;
                }

                // Validasi tipe file
                const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!validTypes.includes(file.type)) {
                  const notification = document.createElement('div');
                  notification.className = 'post-notification error';
                  notification.innerHTML = \`
                    Format file tidak didukung!<br>
                    Format yang diizinkan:<br>
                    • JPG/JPEG<br>
                    • PNG<br>
                    • GIF
                  \`;
                  document.body.appendChild(notification);
                  setTimeout(() => notification.remove(), 5000);
                  imageInput.value = '';
                  return;
                }

                // Jika validasi berhasil, tampilkan preview
                const reader = new FileReader();
                reader.onload = (event) => {
                  previewImg.src = event.target.result;
                  previewContainer.style.display = 'block';
                };
                reader.readAsDataURL(file);
              } else {
                previewContainer.style.display = 'none';
              }
            });
          }

          // 🚀 submit postingan
          if (submitBtn) {
            submitBtn.addEventListener('click', async () => {
              const contentEl = document.getElementById('new-post-content');
              const content = contentEl?.value?.trim();
              const previewContainer = document.getElementById('image-preview');
              const image = previewContainer?.style?.display === 'block' ? previewImg?.src : null;
              if (!content && !image) return;

              const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, image }),
              });
              if (!res.ok) return;
              const post = await res.json();

              const feed = document.querySelector('.social-feed');
              const div = document.createElement('div');
              div.className = 'post';
              div.dataset.id = post.id;
              div.innerHTML = \`
                <div class="post-header"><strong>\${post.username}</strong><span class="handle">\${post.handle}</span><span class="time">\${post.time}</span></div>
                <div class="post-content">\${post.content}</div>
                \${post.image && post.image !== 'null' && post.image !== '' ? '<img src="' + post.image + '" class="post-img" style="width:100%;border-radius:12px;margin-top:8px;">' : ''}
                <div class="post-actions">
                  <button class="like-btn">🤍 \${post.likes}</button>
                  <button class="comment-btn">💬 \${post.comments}</button>
                  <button class="repost-btn">🔄 \${post.reposts}</button>
                </div>
              \`;
              // Mark post as belonging to this client (persist in localStorage)
              try {
                const myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
                myPosts.unshift(post.id);
                localStorage.setItem('myPosts', JSON.stringify(myPosts));
              } catch (e) {
                // ignore storage errors
              }

              // Insert post into feed and add delete control if it's user's post
              if (feed) {
                feed.insertBefore(div, feed.querySelector('.post'));

                // If this is one of user's posts (tracked via localStorage), add owner controls
                const myPosts = JSON.parse(localStorage.getItem('myPosts') || '[]');
                if (Array.isArray(myPosts) && myPosts.includes(post.id)) {
                  addOwnerControls(div, post.id);
                }
              }

              // Reset input
              contentEl.value = '';
              previewContainer.style.display = 'none';
              imageInput.value = '';

              const notification = document.createElement('div');
              notification.className = 'post-notification';
              notification.textContent = '✨ Post berhasil ditambahkan!';
              document.body.appendChild(notification);
              setTimeout(() => notification.remove(), 3000);
            });
          }
        });
      </script>
    `;
    return Promise.resolve(html);
  },
});
