"use strict";

// Selecting elements

let searchSpace = document.getElementById("search-bar");
let resultsItem = document.getElementById("search-results");

// Adding event listener whenever key is released
searchSpace.addEventListener("keyup", () => hunterHeros(searchSpace.value));

// API call
async function hunterHeros(wordTyped) {
     
    
     if (wordTyped.length == 0) {
          resultsItem.innerHTML = ``;
          return;
     }

     // fetching data and converting to Json Format
     await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${wordTyped}&apikey=8a886d3f4363b10af9be5b8d86901ca9&hash=06dcec256cdbecac0e7542c7e0b74fc5&ts=1672940765610`)
          .then(res => res.json()) 
          .then(data => showResults(data.data.results)) 
}

//Funtion to display results according to the text entered
function showResults(myHeros) {


     // favouritesCharacterIDs is a map containing id of character
     let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
     if(favouritesCharacterIDs == null){
          
          favouritesCharacterIDs = new Map();
     }
     else if(favouritesCharacterIDs != null){
        
          favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     }

     resultsItem.innerHTML = ``;
     //to count results in dom
     let counter = 1;

     
     for (const key in myHeros) {
          // to display results if count less than 5 and ignore other results
          if (counter <= 5) {
              
               let hero = myHeros[key];
               // creating html template and appending in the array
               resultsItem.innerHTML +=
                    `
               <li class="flex-row single-search-result">
                    <div class="flex-row img-info">
                         <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}" alt="">
                         <div class="hero-info">
                              <a class="character-info" href="./Information.html">
                                   <span class="hero-name">${hero.name}</span>
                              </a>
                         </div>
                    </div>
                    <div class="flex-col buttons">
                         <!-- <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button> -->
                         <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add</button>"}
                    </div>
                    <div style="display:none;">
                         <span>${hero.name}</span>
                         <span>${hero.description}</span>
                         <span>${hero.comics.available}</span>
                         <span>${hero.series.available}</span>
                         <span>${hero.stories.available}</span>
                         <span>${hero.thumbnail.path+'/portrait_uncanny.' + hero.thumbnail.extension}</span>
                         <span>${hero.id}</span>
                         <span>${hero.thumbnail.path+'/landscape_incredible.' + hero.thumbnail.extension}</span>
                         <span>${hero.thumbnail.path+'/standard_fantastic.' + hero.thumbnail.extension}</span>
                    </div>
               </li>
               `
          }
          counter++;
     }
     // adding everts do button
     buttonEvents();
}

// Function for attacthing eventListener to buttons
function buttonEvents() {
     let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
     favouriteButton.forEach((btn) => btn.addEventListener("click", moveinFavorites));

     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click", addInfoHeros))
}


// to store data of heros in local storage
function addInfoHeros() {

     
     let heroInfo = {
          name: this.parentElement.parentElement.parentElement.children[2].children[0].innerHTML,
          description: this.parentElement.parentElement.parentElement.children[2].children[1].innerHTML,
          comics: this.parentElement.parentElement.parentElement.children[2].children[2].innerHTML,
          series: this.parentElement.parentElement.parentElement.children[2].children[3].innerHTML,
          stories: this.parentElement.parentElement.parentElement.children[2].children[4].innerHTML,
          portraitImage: this.parentElement.parentElement.parentElement.children[2].children[5].innerHTML,
          id: this.parentElement.parentElement.parentElement.children[2].children[6].innerHTML,
          landscapeImage: this.parentElement.parentElement.parentElement.children[2].children[7].innerHTML,
          squareImage: this.parentElement.parentElement.parentElement.children[2].children[8].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}

// function call whenever adding and removing superhero from favorites
function moveinFavorites() {

     // when adding to favorites
     if (this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add') {

          
          let heroInfo = {
               name: this.parentElement.parentElement.children[2].children[0].innerHTML,
               description: this.parentElement.parentElement.children[2].children[1].innerHTML,
               comics: this.parentElement.parentElement.children[2].children[2].innerHTML,
               series: this.parentElement.parentElement.children[2].children[3].innerHTML,
               stories: this.parentElement.parentElement.children[2].children[4].innerHTML,
               portraitImage: this.parentElement.parentElement.children[2].children[5].innerHTML,
               id: this.parentElement.parentElement.children[2].children[6].innerHTML,
               landscapeImage: this.parentElement.parentElement.children[2].children[7].innerHTML,
               squareImage: this.parentElement.parentElement.children[2].children[8].innerHTML
          }

          // getting gavorite array having character object
          let favouritesArray = localStorage.getItem("favouriteCharacters");

          //creating new array if fav is null
          if (favouritesArray == null) {
               
               favouritesArray = [];
          } else {
               
               favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          }

        //checking if fav is already in the array if it is then display remove butoon
          let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

          
          if (favouritesCharacterIDs == null) {
         
               favouritesCharacterIDs = new Map();
          } else {
               
               favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
              
          }

          
          favouritesCharacterIDs.set(heroInfo.id, true);
         

          // appening hero infor to array
          favouritesArray.push(heroInfo);

          
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          
          localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));

          //chaning add tp remove
          this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove';
          
         
     }
     // For removing heros from array
     else{
          
         
          let idremoveChar = this.parentElement.parentElement.children[2].children[6].innerHTML;
          
          
          let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          
          
          let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
          
          
          let newFavouritesArray = [];
          
          
          // deleting the character from array 
          favouritesCharacterIDs.delete(`${idremoveChar}`);
          
          // creating new array not including deleted character
        
          favouritesArray.forEach((favourite) => {
              //append to the array if id doesn't match 
               if(idremoveChar != favourite.id){
                    newFavouritesArray.push(favourite);
               }
          });
          
          localStorage.setItem("favouriteCharacters",JSON.stringify(newFavouritesArray));
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          
          
          
          this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add';
          
     }     
}




