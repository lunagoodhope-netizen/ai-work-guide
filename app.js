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
async function loadHomepageCopy(){try{const res=await fetch(COPY_SHEET_CSV+'&cb='+Date.now(),{cache:'no-store'});if(!res.ok)return;const rows=parseCSV(await res.text());const map=Object.fromEntries(rows.slice(1).filter(r=>r[0]).map(r=>[r[0],r[2]??r[1]??'']));document.querySelectorAll('[data-copy]').forEach(el=>{const v=map[el.dataset.copy];if(v!==undefined&&v!==''){if(el.dataset.copy==='main_title')el.innerHTML=v.replace(/\n/g,'<br>');else if(el.dataset.copy==='hero_tag')el.innerHTML=v.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');else el.textContent=v}})}catch(e){}}
loadHomepageCopy();

const INFO_SHEET_CSV='https://docs.google.com/spreadsheets/d/1K1wG_VkVaMbO7lWC9bCBtJWlnvOAt5pO1m-iMfgXY6Y/gviz/tq?tqx=out:csv&sheet=%EC%A0%95%EB%B3%B4%EC%88%98%EC%A7%91';
async function loadInfoSheet(){try{const res=await fetch(INFO_SHEET_CSV+'&cb='+Date.now(),{cache:'no-store'});if(!res.ok)return;const rows=parseCSV(await res.text());const map=Object.fromEntries(rows.slice(1).filter(r=>r[0]).map(r=>[r[0],r[2]??'']));document.querySelectorAll('[data-info]').forEach(el=>{const v=map[el.dataset.info];if(v!==undefined&&v!=='')el.textContent=v})}catch(e){}}
loadInfoSheet();
const infoStepDetails={
1:'<div class="step-popup-head"><span>STEP 1</span><h2>원하는 알림 예약하기</h2><p>관심 주제 · 시간 · 형식 · 언어 등 원하는 조건을 자연어로 요청합니다.</p></div><button class="step-real-image" data-popup-image="assets/step1-redacted.webp"><img src="assets/step1-redacted.webp" alt="실제 알림 예약 화면"></button><p class="popup-image-guide">이미지를 누르면 크게 볼 수 있습니다.</p>',
2:'<h2>STEP 2 · 알림 수신</h2><p>설정한 시간에 예약한 내용이 알림으로 도착합니다.</p>',
3:'<h2>STEP 3 · 질문</h2><p>뉴스를 확인하면서 궁금한 내용을 바로 이어서 질문할 수 있습니다.</p>'
};
const stepModal=document.querySelector('#step-modal');
document.querySelectorAll('.info-step.clickable').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('#step-modal-content').innerHTML=infoStepDetails[btn.dataset.step]||'';stepModal.classList.add('open');stepModal.setAttribute('aria-hidden','false')}));
document.querySelector('.step-modal-close')?.addEventListener('click',()=>{stepModal.classList.remove('open');stepModal.setAttribute('aria-hidden','true')});
stepModal?.addEventListener('click',e=>{if(e.target===stepModal){stepModal.classList.remove('open');stepModal.setAttribute('aria-hidden','true')}});

document.addEventListener('click',e=>{const b=e.target.closest('[data-popup-image]');if(!b)return;modalImg.src=b.dataset.popupImage;modal.classList.add('open');modal.setAttribute('aria-hidden','false')});
