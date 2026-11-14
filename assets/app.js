document.documentElement.classList.add('js');
document.getElementById('y').textContent=new Date().getFullYear();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav=document.getElementById('nav'),burger=document.getElementById('burger'),menu=document.getElementById('menu');
function navState(){nav.classList.toggle('solid',scrollY>30);nav.classList.toggle('dark',document.getElementById('cennik').getBoundingClientRect().top<=40);}
addEventListener('scroll',navState,{passive:true});navState();
function setMenu(open){document.body.classList.toggle('menu-open',open);burger.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-hidden',String(!open));burger.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');menu.inert=!open;if(open)menu.querySelector('a').focus();}
burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{setMenu(false);burger.focus();}));
addEventListener('keydown',e=>{if(!document.body.classList.contains('menu-open'))return;if(e.key==='Escape'){setMenu(false);burger.focus();}if(e.key==='Tab'){const controls=[burger,...menu.querySelectorAll('a')],first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
matchMedia('(min-width: 761px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
const rv=document.querySelectorAll('.rv');
if(!reduce&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -60px 0px'});rv.forEach(el=>io.observe(el));}else rv.forEach(el=>el.classList.add('in'));
const ph=document.querySelector('.photo');
if(!reduce){let ticking=false;addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ph.style.transform='translateY('+Math.min(scrollY,innerHeight*1.5)*.18+'px)';ticking=false;});},{passive:true});}
const f=document.getElementById('f');f.noValidate=true;
function polishPhone(value){const compact=value.trim().replace(/[\s-]/g,'');const match=compact.match(/^(?:(?:\+48|0048))?([1-9]\d{8})$/);return match?match[1]:null;}
function check(q){const t=q.dataset.req,input=q.querySelector('input');let ok=true;if(t==='radio')ok=!!q.querySelector('input:checked');if(t==='check')ok=input.checked;if(t==='text')ok=input.value.trim().length>=2;if(t==='phone')ok=!!polishPhone(input.value);q.classList.toggle('invalid',!ok);q.querySelectorAll('input').forEach(el=>el.setAttribute('aria-invalid',String(!ok)));return ok;}
f.querySelectorAll('[data-req]').forEach(q=>['input','change'].forEach(type=>q.addEventListener(type,()=>{if(q.classList.contains('invalid'))check(q);})));
f.addEventListener('submit',e=>{const bad=[...f.querySelectorAll('[data-req]')].filter(q=>!check(q));if(bad.length){e.preventDefault();bad[0].querySelector('input').focus({preventScroll:true});bad[0].scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});return;}const phone=document.getElementById('phone');phone.value=polishPhone(phone.value);});