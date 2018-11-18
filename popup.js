"use strict";

let tools = document.querySelector(".tools");
let ticketInput = tools.querySelector("input.goToTicket");
let optionsButton = tools.querySelector(".optionsButton");
let clearSession = tools.querySelector(".clearSession");
ticketInput.focus();

chrome.storage.sync.get("remember", function(data) {
  if (data.remember) {
    chrome.storage.sync.get("search", function(data) {
      ticketInput.setAttribute("value", data.search);
      ticketInput.select();
    });
  }
});
optionsButton.addEventListener("click", function() {
  chrome.tabs.create({ url: "/options.html" });
});
clearSession.addEventListener("click", function() {
  chrome.storage.sync.get("sessionUrl", function(data) {
    chrome.cookies.remove({
      url: data.sessionUrl,
      name: "sessionid"
    });
  });
});
ticketInput.addEventListener("keydown", function(e) {
  if ((e.keyCode == 13 && e.metaKey) || (e.keyCode == 13 && e.ctrlKey)) {
    chrome.tabs.create({
      active: false,
      url:
        "https://operapay.atlassian.net/secure/QuickSearch.jspa?searchString=" +
        ticketInput.value
    });
  } else if (e.keyCode == 13) {
    chrome.tabs.update({
      url:
        "https://operapay.atlassian.net/secure/QuickSearch.jspa?searchString=" +
        ticketInput.value
    });
  }
  chrome.storage.sync.get("remember", function(data) {
    if (data.remember) {
      chrome.storage.sync.set({ search: ticketInput.value });
    }
  });
});
