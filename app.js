const body=document.body;
const buttons=[...document.querySelectorAll('[data-view]')];
function setView(v){body.classList.remove('force-mobile','force-desktop');buttons.forEach(b=>b.classList.toggle('active',b.dataset.view===v));if(v==='mobile')body.classList.add('force-mobile');if(v==='desktop')body.classList.add('force-desktop');localStorage.setItem('ai-guide-view',v)}
buttons.forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));setView(localStorage.getItem('ai-guide-view')||'auto');
document.querySelectorAll('[data-target]').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('#'+btn.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'})));
const modal=document.querySelector('#image-modal');const modalImg=modal.querySelector('img');
document.querySelectorAll('[data-image]').forEach(btn=>btn.addEventListener('click',()=>{modalImg.src=btn.dataset.image;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modalImg.src=''}
modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const COPY_SHEET_CSV='https://docs.google.com/spreadsheets/d/1K1wG_VkVaMbO7lWC9bCBtJWlnvOAt5pO1m-iMfgXY6Y/gviz/tq?tqx=out:csv&sheet=%EC%BD%98%ED%85%90%EC%B8%A0';
function parseCSV(text){const rows=[];let row=[],cell='',q=false;for(let i=0;i<text.length;i++){const ch=text[i],n=text[i+1];if(ch==='"'){if(q&&n==='"'){cell+='"';i++}else q=!q}else if(ch===','&&!q){row.push(cell);cell=''}else if((ch==='\n'||ch==='\r')&&!q){if(ch==='\r'&&n==='\n')i++;row.push(cell);rows.push(row);row=[];cell=''}else cell+=ch}if(cell||row.length){row.push(cell);rows.push(row)}return rows}
async function loadHomepageCopy(){try{const res=await fetch(COPY_SHEET_CSV+'&cb='+Date.now(),{cache:'no-store'});if(!res.ok)return;const rows=parseCSV(await res.text());const map=Object.fromEntries(rows.slice(1).filter(r=>r[0]).map(r=>[r[0],r[2]??r[1]??'']));document.querySelectorAll('[data-copy]').forEach(el=>{const v=map[el.dataset.copy];if(v!==undefined&&v!==''){if(el.dataset.copy==='main_title')el.innerHTML=v.replace(/\n/g,'<br>');else el.textContent=v}})}catch(e){}}
loadHomepageCopy();
