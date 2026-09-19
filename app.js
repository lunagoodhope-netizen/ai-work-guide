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
const POPUP_SHEET_CSV='https://docs.google.com/spreadsheets/d/1K1wG_VkVaMbO7lWC9bCBtJWlnvOAt5pO1m-iMfgXY6Y/gviz/tq?tqx=out:csv&sheet=%EC%A0%95%EB%B3%B4%EC%88%98%EC%A7%91_%ED%8C%9D%EC%97%85';
const popupDefaults={
step1_title:'원하는 알림 예약하기',step1_desc:'관심 주제 · 시간 · 형식 · 언어 등 원하는 조건을 자연어로 요청합니다.',
step2_title:'알림 수신',step2_desc:'설정한 시간에 예약한 내용이 알림으로 도착합니다.',
step3_title:'질문',step3_desc:'뉴스를 확인하면서 궁금한 내용을 바로 이어서 질문할 수 있습니다.',
step4_title:'자동으로 기록',step4_desc:'필요한 내용을 자동으로 저장합니다.',
step5_title:'옵션',step5_desc:'대시보드로 구성해 웹앱에서 확인할 수 있습니다.',
step6_title:'학습 연계',step6_desc:'저장한 내용을 학습 테스트와 연결할 수 있습니다.',
image_guide:'이미지를 누르면 크게 볼 수 있습니다.'
};
let popupCopy={...popupDefaults};
async function loadPopupSheet(){try{const res=await fetch(POPUP_SHEET_CSV+'&cb='+Date.now(),{cache:'no-store'});if(!res.ok)return;const rows=parseCSV(await res.text());popupCopy={...popupDefaults,...Object.fromEntries(rows.slice(1).filter(r=>r[0]).map(r=>[r[0],r[2]??'']))}}catch(e){}}
loadPopupSheet();
const stepImages={
1:['info-step1-reservation-01.png.PNG','info-step1-reservation-02.png.PNG'],
2:['info-step1-reservation-03.png.jpg','info-step1-reservation-04.png.jpg'],
3:['info-step1-reservation-08.png'],
4:['info-step1-reservation-05.png'],
5:['info-step1-reservation-06.png','info-step1-reservation-07.png'],
6:['info-step1-reservation-09.png']
};
function stepPopupHTML(step){
 const imgs=(stepImages[step]||[]).map((src,i)=>'<button class="step-real-image" data-popup-image="'+src+'"><img src="'+src+'" alt="STEP '+step+' 실제 화면 '+(i+1)+'"></button>').join('');
 return '<div class="step-popup-head"><span>STEP '+step+'</span><h2>'+popupCopy['step'+step+'_title']+'</h2><p>'+popupCopy['step'+step+'_desc']+'</p></div><div class="'+((stepImages[step]||[]).length>1?'image-pair':'image-single')+'">'+imgs+'</div><p class="popup-image-guide">'+popupCopy.image_guide+'</p>';
}
const stepModal=document.querySelector('#step-modal');
document.querySelectorAll('.info-step').forEach((btn,i)=>{btn.classList.add('clickable');btn.dataset.step=btn.dataset.step||(i+1);btn.addEventListener('click',()=>{const step=btn.dataset.step;document.querySelector('#step-modal-content').innerHTML=stepPopupHTML(step);stepModal.classList.add('open');stepModal.setAttribute('aria-hidden','false')})});
document.querySelector('.step-modal-close')?.addEventListener('click',()=>{stepModal.classList.remove('open');stepModal.setAttribute('aria-hidden','true')});
stepModal?.addEventListener('click',e=>{if(e.target===stepModal){stepModal.classList.remove('open');stepModal.setAttribute('aria-hidden','true')}});

document.addEventListener('click',e=>{const b=e.target.closest('[data-popup-image]');if(!b)return;modalImg.src=b.dataset.popupImage;modal.classList.add('open');modal.setAttribute('aria-hidden','false')});
