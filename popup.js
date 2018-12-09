"use strict";

let optionsButton = document.querySelector(".optionsButton");
let tools = document.querySelector(".tools");
let otoolsTitle = document.querySelector(".otools-title");
let ticketInput = tools.querySelector("input.goToTicket");
let clearSession = tools.querySelector(".clearSession");
let jiraURL = "";
ticketInput.focus();
chrome.storage.sync.get("searchJiraUrl", function(data) {
  console.log(data);
  data.searchJiraUrl
    ? (jiraURL = data.searchJiraUrl)
    : (jiraURL = "[ERROR]NO_JIRA_URL");
});
chrome.storage.sync.get("remember", function(data) {
  if (data.remember) {
    chrome.storage.sync.get("search", function(data) {
      ticketInput.setAttribute("value", data.search);
      ticketInput.select();
    });
  }
});
otoolsTitle.innerHTML += `OTools (${chrome.app.getDetails().version})`;
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
      url: jiraURL + ticketInput.value
    });
  } else if (e.keyCode == 13) {
    chrome.tabs.update({
      url: jiraURL + ticketInput.value
    });
  }
  chrome.storage.sync.get("remember", function(data) {
    if (data.remember) {
      chrome.storage.sync.set({ search: ticketInput.value });
    }
  });
});
