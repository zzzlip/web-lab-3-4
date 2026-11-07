// 实验3：classList、click、mouseenter、mouseleave、批量绑定事件。
const themeArea = document.querySelector('.theme');
const themeButton = document.getElementById('theme-toggle');
const themeMenu = document.getElementById('theme-menu');
function setTheme(theme) {
 document.body.classList.remove('night','forest','sunset');
 if (theme !== 'day') document.body.classList.add(theme);
 themeButton.setAttribute('aria-pressed',String(document.body.classList.contains('night')));
}
themeButton.addEventListener('click',()=>setTheme(document.body.classList.contains('night')?'day':'night'));
function showMenu(){themeMenu.classList.remove('hidden');themeButton.setAttribute('aria-expanded','true');}
function hideMenu(){themeMenu.classList.add('hidden');themeButton.setAttribute('aria-expanded','false');}
themeArea.addEventListener('mouseenter',showMenu);
themeArea.addEventListener('mouseleave',hideMenu);
themeArea.addEventListener('focusin',showMenu);
themeArea.addEventListener('focusout',event=>{if(!themeArea.contains(event.relatedTarget))hideMenu();});
const themeOptions = document.querySelectorAll('[data-theme]');
for (let i=0;i<themeOptions.length;i++) {
 themeOptions[i].addEventListener('click',()=>{setTheme(themeOptions[i].dataset.theme);hideMenu();});
}
