(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const m=document.querySelector(".app"),g=document.querySelector(".DarkThemeIcone__img"),p=document.querySelector(".addTask__input"),L=document.querySelector(".addTask__button"),c=document.querySelector(".taskList__list"),_=document.querySelectorAll(".listOptions__filter"),h=document.querySelector(".listOptions__counter"),v=document.querySelector(".listOptions__deleteButton"),k=document.querySelector(".dragDropMessage"),y=document.querySelector(".DarkThemeIcone"),S=()=>document.querySelectorAll(".taskList__checkbox"),T=()=>document.querySelectorAll(".taskList__deleteIcon"),E=()=>document.querySelectorAll(".taskList__taskContent"),f=()=>{m.classList.toggle("app--isDark"),m.classList.contains("app--isDark")?(g.src="./images/icon-sun.svg",r("themeMode","Dark")):(g.src="./images/icon-moon.svg",r("themeMode","Light"))},q=e=>{e.preventDefault();const t=p.value;if(!t.trim())return;const n={value:t,isCompleted:!1},i=a("tasks")||[];l("increase"),i.push(n),r("tasks",i),d(i)},l=e=>{let t=a("counter")||0;e=="increase"?t++:e=="decrease"&&t--,h.innerHTML=`${t}`,r("counter",t)},C=e=>{let t="";e.forEach(n=>{t+=`<li
          class="taskList__taskContent ${n.isCompleted?"taskList__taskContent--isCompleted":""}"
          draggable = "true"
          >
            <button class="taskList__checkbox">
              <img
                src="./images/icon-check.svg"
                alt="check-icon"
                class="taskList__checkboxImg"
              />

            
            </button>
            <div class="taskList__valueContent">
              <p class="taskList__value">${n.value}</p>
              <img
                src="./images/icon-basket.svg"
                alt="basket-icon"
                class="taskList__deleteIcon"
              />
            </div>
        `}),c.innerHTML=t,p.value=""},a=e=>{const t=localStorage.getItem(e);return t?JSON.parse(t):!1},r=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))},D=()=>{a("themeMode")==="Dark"&&f(),d(a("tasks")),l()},B=()=>{c.innerHTML='<p class="emptyList">Empty List...</p>'},d=e=>{e.length?(C(e),N()):B(),e.length>1?k.classList.remove("hide"):k.classList.add("hide")},b=e=>{const t=a("tasks");t[e].isCompleted||l("decrease"),t.splice(e,1),r("tasks",t),d(t)},O=(e,t)=>{const n=a("tasks");e.parentElement.classList.toggle("taskList__taskContent--isCompleted"),n[t].isCompleted=!n[t].isCompleted,r("tasks",n),n[t].isCompleted?l("decrease"):l("increase")},I=e=>{document.querySelector(".active").classList.remove("active"),e.classList.add("active");const t=e.classList;t.contains("allButton")?c.classList="taskList__list":t.contains("activeButton")?c.classList="taskList__list taskList__list--hideCompleted":t.contains("completedButton")&&(c.classList="taskList__list taskList__list--hideActive")},M=()=>{let e=a("tasks");e=e.filter(t=>!t.isCompleted),r("tasks",e),d(e)},A=e=>{e.preventDefault();const t=c.querySelector(".dragging"),i=[...c.querySelectorAll(".taskList__taskContent:not(.dragging)")].find(s=>e.clientY<=s.offsetTop+s.offsetHeight/2);c.insertBefore(t,i)};_.forEach(e=>{e.addEventListener("click",()=>{I(e)})});const N=()=>{T().forEach((e,t)=>{e.addEventListener("click",()=>{b(t)})}),S().forEach((e,t)=>{e.addEventListener("click",()=>{O(e,t)})}),E().forEach(e=>{e.addEventListener("dragstart",()=>setTimeout(()=>e.classList.add("dragging"),0)),e.addEventListener("dragend",()=>e.classList.remove("dragging"))}),c.addEventListener("dragover",A)};L.addEventListener("click",q);v.addEventListener("click",M);y.addEventListener("click",f);D();
