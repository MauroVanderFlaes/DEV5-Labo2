import Island from "./Island.js";
export default class World {
    constructor() {
      this.islands = []; // a good place to keep track of your islands
      this.hookEvents(); // let's kick things of by hooking up events
    }
  
    hookEvents() {
      // hook events like clicking buttons to a specific function
      //if a element with the id btnAddIsland get clicked, do a function
        document.getElementById("btnAddIsland").addEventListener("click", () => {
            this.addIsland();
        });
    }
  
    save() {
      // save array islands to localstorage as string
      // loop over all this.islands and save the names
    }
  
    load() {
      // load islands from localstorage into array
      // loop over the array and addIslands()
    }
  
    getCoordinates() {
      // return coordinates within the screen at random, feel free to change it up!
      let randomSign = Math.random() < 0.5 ? -1 : 1;
      return {
        x: ((Math.random() * window.innerWidth) / 2) * randomSign,
        y: ((Math.random() * window.innerHeight) / 2) * randomSign
      };
    }
  
    addIsland() {
      // add the islands to the DOM
      let island = new Island();
      console.log("addIsland");
      let div = document.createElement("div");
      div.classList.add("island");
      div.style.backgroundColor = island.getRandomColor();
      div.innerHTML = island.getRandomName();
      document.body.appendChild(div);
      this.moveIsland(div);
    }
  
    moveIsland(div) {
      // this might be a good point to animate the islands with JS Animations API
      let coords = this.getCoordinates();
      div.animate([
        {transform: `translate(0px, 0px)`},
        {transform: `translate(${coords.x}px, ${coords.y}px)`}

    ], {
        duration: 1000,
        iterations: 1,
        fill: "forwards"
    });
    }
  }
