"use strict";
let currentProjects = [];
chrome.storage.sync.get("currentProjects", function(data) {
  currentProjects = data.currentProjects;
});
let rememberQuery = document.querySelector(".rememberQuery input");
let projectName = document.querySelector(".projectName");
let projectID = document.querySelector(".projectID");
let projectAddButton = document.querySelector(".projectManagement button");
let projectList = document.querySelector(".projectList");

let rememberValue = chrome.storage.sync.get(["remember"], function(data) {
  rememberQuery.checked = data.remember;
});

rememberQuery.addEventListener("change", function() {
  chrome.storage.sync.set({
    remember: rememberQuery.checked
  });
});

// projectAddButton.addEventListener("click", function() {
//   let newProject = [projectName.value, projectID.value];
//   currentProjects.push(newProject);
//   chrome.storage.sync.set({
//     currentProjects: currentProjects
//   });
//   projectName.value = "";
//   projectID.value = "";
//   constructOptions(currentProjects);
// });

// function constructOptions(currentProjects) {
//   if (currentProjects.length > 0) {
//     for (let item of currentProjects) {
//       let list = document.createElement("li");
//       chrome.storage.sync.get("currentProjects", function(data) {
//         list.innerHTML = item;
//       });
//       projectList.appendChild(list);
//     }
//   }
// }
// constructOptions(currentProjects);
