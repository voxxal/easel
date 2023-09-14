// ==UserScript==
// @name         LoadCustomMod
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://acolyte.easel.gg/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
(async function () {
  "use strict";
  let urlBox = document.createElement("input");
  urlBox.placeholder = "Mod Url";
  (await waitForElm("#root > div > div.page > p")).append(urlBox);
  urlBox.value = localStorage.modUrl ?? "";
  let oldFetch = fetch;
  window.fetch = (...args) => {
    if (args[0].startsWith("/api/sources/")) {
      localStorage.modUrl = urlBox.value;
      return oldFetch(urlBox.value, args[1]);
    } else {
      return oldFetch(...args);
    }
  };
})();
