!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=null;function o(a){t.disabled=a,e.disabled=!a}t.addEventListener("click",(function(){document.querySelector("[data-start]"),document.querySelector("[data-stop]");o(!0),a=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}),1e3)})),e.addEventListener("click",(function(){document.querySelector("[data-start]"),document.querySelector("[data-stop]");o(!1),clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.afc3490c.js.map