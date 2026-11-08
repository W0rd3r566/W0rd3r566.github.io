setSiteTheme(document.documentElement.getAttribute('data-theme')||'light');

const reduced=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
function sparks(x,y,n=7){if(reduced.matches)return;for(let i=0;i<n;i++){const s=document.createElement('span');s.className='spark';s.textContent=i%2?'✧':'✦';s.style.left=x+'px';s.style.top=y+'px';s.style.color=i%2?'#a5d8cf':'#e88eb8';const a=Math.random()*Math.PI*2,d=25+Math.random()*70;s.style.setProperty('--x',Math.cos(a)*d+'px');s.style.setProperty('--y',Math.sin(a)*d-25+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),1000)}}
document.addEventListener('pointerdown',e=>{if(e.target.closest('a,button,iframe'))return;sparks(e.clientX,e.clientY,5)});
const retry=document.getElementById('retry');let retryTimer;retry.addEventListener('click',()=>{const h=document.querySelector('.hero');clearTimeout(retryTimer);h.classList.remove('retrying');void h.offsetWidth;h.classList.add('retrying');const r=document.querySelector('.portrait').getBoundingClientRect();sparks(r.x+r.width/2,r.y+r.height/2,18);retryTimer=setTimeout(()=>h.classList.remove('retrying'),850)});

let avatarTaps=0,lastAvatarTap=0,toastTimer;
document.getElementById('miku-trigger').addEventListener('click',()=>{const now=Date.now();avatarTaps=now-lastAvatarTap<900?avatarTaps+1:1;lastAvatarTap=now;if(avatarTaps<3)return;avatarTaps=0;const active=document.body.classList.toggle('miku-mode');document.querySelector('.tag').textContent=active?'MIKU MODE ★':'retry? ↻';const toast=document.getElementById('toast');toast.textContent=active?'★ MIKU MODE / ON':'Miku mode выключен';toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),2600);const r=document.querySelector('.portrait').getBoundingClientRect();sparks(r.x+r.width/2,r.y+r.height/2,30)});


const dock=document.querySelector('.music-dock'),playButton=document.getElementById('dock-play'),dockStatus=document.getElementById('dock-status');
let ytPlayer;
window.onYouTubeIframeAPIReady=function(){ytPlayer=new YT.Player('official-video',{events:{onStateChange:function(e){const playing=e.data===1;dock.classList.toggle('playing',playing);playButton.textContent=playing?'Ⅱ':'▶';playButton.setAttribute('aria-label',playing?'Приостановить Retry Now':'Включить Retry Now');dockStatus.textContent=playing?'Сейчас играет · Hatsune Miku':'NAKISO · Hatsune Miku'}}})};
playButton.addEventListener('click',function(){if(ytPlayer&&ytPlayer.getPlayerState){if(ytPlayer.getPlayerState()===1)ytPlayer.pauseVideo();else ytPlayer.playVideo()}else{document.getElementById('music').scrollIntoView({behavior:'smooth'});dockStatus.textContent='Нажми ▶ в видеоплеере'}});
const ytScript=document.createElement('script');ytScript.src='https://www.youtube.com/iframe_api';document.head.appendChild(ytScript);

// Optional effects never block navigation, theme switching or playback.
(function(){
if('IntersectionObserver' in window&&!reduced.matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}})},{threshold:0.08});document.querySelectorAll('.section,.end').forEach(el=>{el.classList.add('observed');observer.observe(el)})}
const glow=document.querySelector('.cursor-glow');let lastX=0,lastY=0,frame=0;
if(glow&&!reduced.matches)document.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;lastX=e.clientX;lastY=e.clientY;if(!frame)frame=requestAnimationFrame(()=>{glow.style.left=lastX+'px';glow.style.top=lastY+'px';frame=0})},{passive:true});
let flashTimer;document.getElementById('retry').addEventListener('click',()=>{if(reduced.matches)return;const flash=document.querySelector('.restart-flash');flash.classList.remove('fire');void flash.offsetWidth;flash.classList.add('fire');clearTimeout(flashTimer);flashTimer=setTimeout(()=>flash.classList.remove('fire'),700);document.querySelectorAll('.hero .reveal').forEach(el=>{el.style.animation='none';void el.offsetWidth;el.style.animation=''})});
})();

document.getElementById('year').textContent=new Date().getFullYear();
