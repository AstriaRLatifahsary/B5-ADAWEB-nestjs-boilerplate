(function(){
  function ensureContainer(){
    let c = document.querySelector('.toast-container');
    if(!c){ c = document.createElement('div'); c.className='toast-container'; document.body.appendChild(c); }
    return c;
  }
  function makeToast(message, type){
    const c = ensureContainer();
    const t = document.createElement('div');
    t.className = 'toast ' + (type||'');
    t.textContent = message;
    c.appendChild(t);
    // small delay to allow CSS transition
    requestAnimationFrame(()=> t.classList.add('show'));
    // auto remove
    setTimeout(()=>{
      t.classList.remove('show');
      setTimeout(()=> t.remove(), 300);
    }, 3500);
    return t;
  }
  window.toast = function(message, type){ return makeToast(message, type); };
})();
