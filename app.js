const body=document.body;
const buttons=[...document.querySelectorAll('[data-view]')];
function setView(v){body.classList.remove('force-mobile','force-desktop');buttons.forEach(b=>b.classList.toggle('active',b.dataset.view===v));if(v==='mobile')body.classList.add('force-mobile');if(v==='desktop')body.classList.add('force-desktop');localStorage.setItem('ai-guide-view',v)}
buttons.forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));setView(localStorage.getItem('ai-guide-view')||'auto');
document.querySelectorAll('[data-target]').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('#'+btn.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'})));
const modal=document.querySelector('#image-modal');const modalImg=modal.querySelector('img');
document.querySelectorAll('[data-image]').forEach(btn=>btn.addEventListener('click',()=>{modalImg.src=btn.dataset.image;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modalImg.src=''}
modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});