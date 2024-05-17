// ==UserScript==
// @name         Retrospring Ask To MD
// @namespace    http://github.com/warpkaiba/
// @version      1.0.0
// @description  Copies an answered ask as markdown (for fediverse)
// @author       warpkaiba
// @match        https://retrospring.net/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=retrospring.net
// @grant        GM_addStyle
// ==/UserScript==

"use strict";

(function() {
    GM_addStyle(`
.btn.btn-link.answerbox__action.fedi:focus::after {
  content: "Copied markdown to clipboard";
  position: absolute;
  background: var(--success);
  color: var(--body-color);
  padding: 0.5em;
  border-radius: 10px;
  z-index: 100;
  animation: ease-out 1s 1s disappear 1 forwards;
  width: 10em;
}

@keyframes disappear {
    0% {opacity: 1}
    100% {opacity: 0}
}`);

    function askToClipboard(ask) {
        var username = ask.querySelector(".question__user > a");
        if (!username) {
            username = "Anonymous Creature";
        } else {
            username = username.textContent;
        }
        var question = ask.querySelector(".question__text").textContent.replace("\n", "");
        var answer = ask.querySelector(".answerbox__answer-text").textContent;
        var url = ask.querySelector("[data-selection-hotkey=l]").href;

        var clipboardText = `> [${username} asked](${url}): \n> ${question} \n${answer}`;

        console.log(clipboardText);
        navigator.clipboard.writeText(clipboardText);
    }

    function addButtons(){
        var asks = document.querySelectorAll(".answerbox");

        for (let ask of asks) {
            var button = document.createElement("button")
            button.className = "btn btn-link answerbox__action fedi"
            button.title = "Copy markdown for Fediverse to clipboard"
            var i = document.createElement("i")
            i.className = "fa fa-fw fa-circle-nodes"
            button.addEventListener("click", function(){askToClipboard(ask)});
            button.appendChild(i);
            ask.querySelector(".answerbox__actions").appendChild(button);
        }
    }

    addButtons();

})();
