function setSiteTheme(theme){
var root=document.documentElement;
root.setAttribute('data-theme',theme);
root.style.backgroundColor=theme==='dark'?'#14151b':'#faf9f6';
try{localStorage.setItem('w0rd3r-theme',theme)}catch(e){}
var button=document.getElementById('theme');
if(button){button.textContent=theme==='dark'?'☀':'☾';button.setAttribute('aria-label',theme==='dark'?'Включить светлую тему':'Включить тёмную тему');button.setAttribute('aria-pressed',String(theme==='dark'));}
var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==='dark'?'#14151b':'#faf9f6';
}
function toggleSiteTheme(){setSiteTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark')}
(function(){var theme='light';try{theme=localStorage.getItem('w0rd3r-theme')||((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light')}catch(e){}setSiteTheme(theme==='dark'?'dark':'light')})();
