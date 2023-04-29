//js file from favorite section
"use strict"
// Selecting elements
let herosContainer = document.getElementById('container');

// adding event listener whenver page is loaded
window.addEventListener("load", function () {
    
     let favourites = localStorage.getItem("favouriteCharacters");

     
     favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
     

     herosContainer.innerHTML = "";
     favourites.forEach(character => {
          herosContainer.innerHTML +=
               `
               <div class="flex-col card">
                    <img src="${character.squareImage}" alt="">
                    <span class="name">${character.name}</span>
                    <span class="id">Id : ${character.id}</span>
                    <span class="comics">Comics : ${character.comics}</span>
                    <span class="series">Series : ${character.series}</span>
                    <span class="stories">Stories : ${character.stories}</span>
                    <a class="character-info" href="./Information.html">
                         <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Information</button>
                    </a>
                    <div style="display:none;">
                         <span>${character.id}</span>
                         <span>${character.name}</span>
                         <span>${character.comics}</span>
                         <span>${character.series}</span>
                         <span>${character.stories}</span>
                         <span>${character.description}</span>
                         <span>${character.landscapeImage}</span>
                         <span>${character.portraitImage}</span>
                         <span>${character.squareImage}</span>
                    </div>
                    <button class="btn remove-btn"><i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove</button>
               </div>
          `

     })
     // adding events to buttond
     addEventToButton();
})

// adding event listener to buttons
function addEventToButton() {
     let removeButton = document.querySelectorAll(".remove-btn");
     removeButton.forEach((btn) => btn.addEventListener("click", removeCharacters))

     let characterInformation = document.querySelectorAll(".character-info");
     characterInformation.forEach((character) => character.addEventListener("click", addInformation));
}


//Function to store data in local storage
function addInformation() {
    
     let heroInfo = {
          name: this.parentElement.children[7].children[1].innerHTML,
          description: this.parentElement.children[7].children[5].innerHTML,
          comics: this.parentElement.children[7].children[2].innerHTML,
          series: this.parentElement.children[7].children[3].innerHTML,
          stories: this.parentElement.children[7].children[4].innerHTML,
          portraitImage: this.parentElement.children[7].children[7].innerHTML,
          id: this.parentElement.children[7].children[0].innerHTML,
          landscapeImage: this.parentElement.children[7].children[6].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}


//removing character from fav 
function removeCharacters() {
     
     
     let idOfCharacterToBeDeleted = this.parentElement.children[2].innerHTML.substring(5);

      
     let favourites = JSON.parse(localStorage.getItem("favouriteCharacters"));
    
     let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     // deleting the characters id from favouritesCharacterId map
     favouritesCharacterIDs.delete(`${idOfCharacterToBeDeleted}`);


     // deleting the character form array if is matching 
     favourites.forEach(function (favourite, index) {
          if (favourite.id == idOfCharacterToBeDeleted) {
               
               favourites.splice(index, 1);
          }
     });

     

     // Updating the new arrays in localStorage
     localStorage.setItem("favouriteCharacters", JSON.stringify(favourites));
     localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

     
     this.parentElement.remove();

     
}




