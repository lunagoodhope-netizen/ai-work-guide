const body=document.body;
const buttons=[...document.querySelectorAll('[data-view]')];
function setView(v){body.classList.remove('force-mobile','force-desktop');buttons.forEach(b=>b.classList.toggle('active',b.dataset.view===v));if(v==='mobile')body.classList.add('force-mobile');if(v==='desktop')body.classList.add('force-desktop');localStorage.setItem('ai-guide-view',v)}
buttons.forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));setView(localStorage.getItem('ai-guide-view')||'auto');
document.querySelectorAll('[data-target]').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('#'+btn.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'})));
const modal=document.querySelector('#image-modal');const modalImg=modal.querySelector('img');
document.querySelectorAll('[data-image]').forEach(btn=>btn.addEventListener('click',()=>{modalImg.src=btn.dataset.image;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modalImg.src=''}
modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const SHEET_ID='1K1wG_VkVaMbO7lWC9bCBtJWlnvOAt5pO1m-iMfgXY6Y';
const sheetCsv=name=>'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?tqx=out:csv&sheet='+encodeURIComponent(name);
const COPY_SHEET_CSV=sheetCsv('콘텐츠');
function parseCSV(text){const rows=[];let row=[],cell='',q=false;for(let i=0;i<text.length;i++){const ch=text[i],n=text[i+1];if(ch==='"'){if(q&&n==='"'){cell+='"';i++}else q=!q}else if(ch===','&&!q){row.push(cell);cell=''}else if((ch==='\n'||ch==='\r')&&!q){if(ch==='\r'&&n==='\n')i++;row.push(cell);rows.push(row);row=[];cell=''}else cell+=ch}if(cell||row.length){row.push(cell);rows.push(row)}return rows}
async function loadHomepageCopy(){try{const res=await fetch(COPY_SHEET_CSV+'&cb='+Date.now(),{cache:'no-store'});if(!res.ok)return;const rows=parseCSV(await res.text());const map=Object.fromEntries(rows.slice(1).filter(r=>r[0]).map(r=>[r[0],r[2]??r[1]??'']));document.querySelectorAll('[data-copy]').forEach(el=>{const v=map[el.dataset.copy];if(v!==undefined&&v!==''){if(el.dataset.copy==='main_title')el.innerHTML=v.replace(/\n/g,'<br>');else if(el.dataset.copy==='hero_tag')el.innerHTML=v.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');else el.textContent=v}})}catch(e){}}
const body=document.body;
const buttons=[...document.querySelectorAll('[data-view]')];
function setView(v){body.classList.remove('force-mobile','force-desktop');buttons.forEach(b=>b.classList.toggle('active',b.dataset.view===v));if(v==='mobile')body.classList.add('force-mobile');if(v==='desktop')body.classList.add('force-desktop');localStorage.setItem('ai-guide-view',v)}
buttons.forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));setView(localStorage.getItem('ai-guide-view')||'auto');
document.querySelectorAll('[data-target]').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('#'+btn.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'})));
const modal=document.querySelector('#image-modal');const modalImg=modal.querySelector('img');
document.querySelectorAll('[data-image]').forEach(btn=>btn.addEventListener('click',()=>{modalImg.src=btn.dataset.image;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modalImg.src=''}
modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const SHEET_ID='1K1wG_VkVaMbO7lWC9bCBtJWlnvOAt5pO1m-iMfgXY6Y';
const sheetCsv=name=>'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?tqx=out:csv&sheet='+encodeURIComponent(name);
const COPY_SHEET_CSV=sheetCsv('콘텐츠');
function parseCSV(text){const rows=[];let row=[],cell='',q=false;for(let i=0;i<text.length;i++){const ch=text[i],n=text[i+1];if(ch==='"'){if(q&&n==='"'){cell+='"';i++}else q=!q}else if(ch===','&&!q){row.push(cell);cell=''}else if((ch==='\n'||ch==='\r')&&!q){if(ch==='\r'&&n==='\n')i++;row.push(cell);rows.push(row);row=[];cell=''}else cell+=ch}if(cell||row.length){row.push(cell);rows.push(row)}return rows}
async function loadHomepageCopy(){try{const res=await fetch(COPY_SHEET_CSV+'&cb='+Date.now(),{cache:'no-store'});if(!res.ok)return;const rows=parseCSV(await res.text());const map=Object.fromEntries(rows.slice(1).filter(r=>r[0]).map(r=>[r[0],r[2]??r[1]??'']));document.querySelectorAll('[data-copy]').forEach(el=>{const v=map[el.dataset.copy];if(v!==undefined&&v!==''){if(el.dataset.copy==='main_title')el.innerHTML=v.replace(/\n/g,'<br>');else if(el.dataset.copy==='hero_tag')el.innerHTML=v.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');else el.textContent=v}})}catch(e){}}
loadHomepageCopy();

const INFO_SHEET_CSV=sheetCsv('정보수집');
async function loadInfoSheet(){try{const res=await fetch(INFO_SHEET_CSV+'&cb='+Date.now(),{cache:'no-store'});if(!res.ok)return;const rows=parseCSV(await res.text());const map=Object.fromEntries(rows.slice(1).filter(r=>r[0]).map(r=>[r[0],r[2]??'']));document.querySelectorAll('[data-info]').forEach(el=>{const v=map[el.dataset.info];if(v!==undefined&&v!=='')el.textContent=v})}catch(e){}}
loadInfoSheet();
const POPUP_SHEET_CSV=sheetCsv('정보수집_팝업');
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
1:['./info-step1-reservation-01.png.PNG','./info-step1-reservation-02.png.PNG'],
2:['./info-step1-reservation-03.png.jpg','./info-step1-reservation-04.png.jpg'],
3:['./info-step1-reservation-08.png'],
4:['./info-step1-reservation-05.png'],
5:['./info-step1-reservation-06.png','./info-step1-reservation-07.png'],
6:['./info-step1-reservation-09.png']
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

const TUTOR_SHEET_CSV=sheetCsv('개인화학습');
const tutorDefaults={
 title:'개인화 학습 튜터',subtitle:'알림 · 구글시트 · 대시보드를 연결해 나에게 맞는 학습 루틴을 만듭니다.',
 step1_title:'목표·가용시간',step1_short:'레벨테스트와 커리큘럼 요청',
 step2_title:'커리큘럼 확정',step2_short:'35분 학습 루틴 결정',
 step3_title:'학습 예약',step3_short:'평일 밤 10시 알림',
 step4_title:'구글시트 기록',step4_short:'오답·피드백 자동 정리',
 step5_title:'모바일 복습',step5_short:'웹앱으로 2차 활용',
 note:'알림에 따라 학습만 진행하면 기록과 복습 자료가 쌓입니다. 1·3·7·30일 복습도 함께 설정해 장기기억 관리에 활용할 수 있습니다.',
 prereq_title:'사전 작업',prereq:'GitHub 계정 생성 · Google Sheets와 GitHub 연결 권한 허용 · 첫 페이지 생성 후 자연어로 업데이트',
 step1_desc:'학습 목표와 가용시간을 입력한 뒤, 현재 수준에 맞는 커리큘럼을 요청합니다.',
 step1_prompt:'매일 밤 10시에 영어 학습 알림. 목표는 1년 안에 토익 만점, 현재 점수는 800점 / 1년 안에 비즈니스 회화 중등 수준으로 발화. 현재 발화 수준은 테스트로 확인 필요. 1. 레벨테스트 진행해주고 2. 내 수준 기준으로 목표에 맞춘 하루 35분 학습 플랜으로 커리큘럼 제안해줘.',
 step2_desc:'레벨테스트 후 제안된 커리큘럼을 확인하고, 나에게 맞게 확정합니다.',
 step2_prompt:'총 35분 플랜으로 1. 오전 뉴스 어휘 퀴즈 5분 2. 1·3·7·한 달 기준 복습 5분 3. 패턴·콜로케이션 한영 발화 연습 10분 4. 지피티와 자유회화 10분 5. 피드백 재확인 및 마무리 5분으로 진행해줘.',
 step3_desc:'확정한 루틴을 평일 밤 10시에 자동으로 시작할 수 있도록 예약합니다.',
 step3_prompt:'확정한 커리큘럼대로 주중 밤 10시에 1년 동안 학습 알림 예약해줘.',
 step4_desc:'학습 중 나온 오답, 피드백, 암기사항을 구글시트에 날짜별로 정리합니다.',
 step4_prompt:'구글시트 하나 생성해서 그날 학습 기록(오답, 피드백, 암기사항)을 자동으로 정리해줘. 날짜별로 분류하고, 오답은 따로 분류해줘.',
 step5_desc:'시트에 쌓인 기록을 모바일 친화적인 대시보드로 보고, 복습에 활용합니다.',
 step5_prompt:'구글시트에 정리된 학습 내용은 대시보드에 자동으로 업로드되게 해줘. 대시보드는 주로 핸드폰으로 확인하니까 모바일 친화적인 구성으로 만들어주고 디자인 4개로 제안해줘.'
};
let tutorCopy={...tutorDefaults};
async function loadTutorSheet(){try{const res=await fetch(TUTOR_SHEET_CSV+'&cb='+Date.now(),{cache:'no-store'});if(!res.ok)return;const rows=parseCSV(await res.text());tutorCopy={...tutorDefaults,...Object.fromEntries(rows.slice(1).filter(r=>r[0]).map(r=>[r[0],r[2]??r[1]??'']))};document.querySelectorAll('[data-tutor]').forEach(el=>{const v=tutorCopy[el.dataset.tutor];if(v)el.textContent=v})}catch(e){}}
loadTutorSheet();
const tutorModal=document.querySelector('#tutor-modal');
const tutorVisuals={1:'assets/tutor-step1.webp',2:'assets/tutor-step2.webp',3:'assets/tutor-step3-plan.webp',5:'assets/tutor-step5.webp'};
function tutorPopup(step){const p='step'+step+'_';const image=tutorVisuals[step]?'<img src="'+tutorVisuals[step]+'" alt="STEP '+step+' 예시 화면">':'';let content='<p class="tutor-popup-kicker">STEP '+step+'</p><h2 class="tutor-popup-title">'+tutorCopy[p+'title']+'</h2><p class="tutor-popup-desc">'+tutorCopy[p+'desc']+'</p><div class="tutor-popup-grid"><div><div class="tutor-prompt">'+tutorCopy[p+'prompt']+'</div></div>'+image+'</div>';
 if(step===2)content+='<div class="tutor-routine"><div><b>5분</b><span>오전 뉴스 어휘 퀴즈</span></div><div><b>5분</b><span>1·3·7·한 달 복습</span></div><div><b>10분</b><span>패턴·콜로케이션 한영 발화</span></div><div><b>10분</b><span>지피티와 자유회화</span></div><div><b>5분</b><span>피드백 재확인·마무리</span></div></div>';
 if(step===4)content+='<div class="tutor-sheet"><table><thead><tr><th>날짜</th><th>학습 내용</th><th>오답</th><th>피드백·암기사항</th></tr></thead><tbody><tr><td>9/22</td><td>비즈니스 회화</td><td>suppose / supposed to</td><td>발음·문장 패턴 복습</td></tr><tr><td>9/23</td><td>뉴스 어휘</td><td>—</td><td>1·3·7일 복습 예약</td></tr></tbody></table></div>';
 if(step===5)content+='<div class="dashboard-options"><div><b>미니멀 다크</b><span>진행률 · 오늘 학습</span></div><div><b>모던 라이트</b><span>일일 루틴 · 오답</span></div><div><b>캘린더 + 통계</b><span>학습일수 · 누적 단어</span></div><div><b>카드형 대시보드</b><span>복습 · 바로가기</span></div></div>';
 return content;}
document.querySelectorAll('[data-tutor-step]').forEach(btn=>btn.addEventListener('click',()=>{const step=btn.dataset.tutorStep;document.querySelector('#tutor-modal-content').innerHTML=tutorPopup(step);tutorModal.classList.add('open');tutorModal.setAttribute('aria-hidden','false')}));
function closeTutorModal(){tutorModal.classList.remove('open');tutorModal.setAttribute('aria-hidden','true')}
document.querySelector('.tutor-modal-close')?.addEventListener('click',closeTutorModal);tutorModal?.addEventListener('click',e=>{if(e.target===tutorModal)closeTutorModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&tutorModal?.classList.contains('open'))closeTutorModal()});
loadHomepageCopy();

const INFO_SHEET_CSV=sheetCsv('정보수집');
async function loadInfoSheet(){try{const res=await fetch(INFO_SHEET_CSV+'&cb='+Date.now(),{cache:'no-store'});if(!res.ok)return;const rows=parseCSV(await res.text());const map=Object.fromEntries(rows.slice(1).filter(r=>r[0]).map(r=>[r[0],r[2]??'']));document.querySelectorAll('[data-info]').forEach(el=>{const v=map[el.dataset.info];if(v!==undefined&&v!=='')el.textContent=v})}catch(e){}}
loadInfoSheet();
const POPUP_SHEET_CSV=sheetCsv('정보수집_팝업');
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
1:['./info-step1-reservation-01.png.PNG','./info-step1-reservation-02.png.PNG'],
2:['./info-step1-reservation-03.png.jpg','./info-step1-reservation-04.png.jpg'],
3:['./info-step1-reservation-08.png'],
4:['./info-step1-reservation-05.png'],
5:['./info-step1-reservation-06.png','./info-step1-reservation-07.png'],
6:['./info-step1-reservation-09.png']
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
