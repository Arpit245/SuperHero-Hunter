//js for more information page
"use strict"
// Selecting elements
let info = document.getElementById('info-container');
let pagetitle = document.getElementById('page-title');

// getting the object
let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

// changing page title according to hero
pagetitle.innerHTML = heroInfo.name
//addding eventlistener whenever page is loaded
window.addEventListener("load", function () {
    //creating html template and adding to dom
     info.innerHTML =
          `
               <div class="flex-row hero-name">${heroInfo.name}</div>
               <div class="flex-row hero-img-and-more-info">
               <img  class="hero-img" src="${heroInfo.portraitImage}" alt=""> 
               <div class="flex-col more-info">
                    <div class="flex-row id">
                    <b>ID:</b><span>${heroInfo.id}</span>
               </div>
                    <div class="flex-row comics">
                         <b>Comics:</b><span>${heroInfo.comics}</span>
                    </div>
                         <div class="flex-row series">
                              <b>Series:</b><span>${heroInfo.series}</span>
                         </div>
                         <div class="flex-row stories">
                              <b>Stories:</b><span>${heroInfo.stories}</span>
                         </div>
                    </div>
               </div>
               <div class="flex-col hero-discription">
                    <b>Discription:</b>
                    <p>${heroInfo.description != "" ? heroInfo.description : "Description is not available"}</p>
               </div>
               <div style="display:none;">
                    <span>${heroInfo.name}</span>
                    <span>${heroInfo.portraitImage}</span>
                    <span>${heroInfo.landscapeImage}</span>
                    <span>${heroInfo.id}</span>
                    <span>${heroInfo.comics}</span>
                    <span>${heroInfo.series}</span>
                    <span>${heroInfo.stories}</span>
                    <span>${heroInfo.squareImage}</span>
                    <span>${heroInfo.description}</span>
               </div>
               
          `
    
})



