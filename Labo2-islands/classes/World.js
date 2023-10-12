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

        document.getElementById("btnSave").addEventListener("click", () => {
            this.save();
            console.log("save");
        });

        document.getElementById("btnLoad").addEventListener("click", () => {
            this.load();
            console.log("load");
        });
    }

    save() {
        // save array islands to localstorage as string
        // loop over all this.islands and save the names
        const islandNames = this.islands.map((island) => {
            return {
                name: island.name,
            };
        });
        const islandNamesJSON = JSON.stringify(islandNames);
        localStorage.setItem('islands', islandNamesJSON);
        console.log(islandNames, islandNamesJSON);
        console.log(this.islands);
    }

     load() {
         // load islands from localstorage into array
         // loop over the array and addIslands()
         const islandNamesJSON = localStorage.getItem('islands');
         if (islandNamesJSON) {
            this.clearIslands();
             const islandNames = JSON.parse(islandNamesJSON);
             islandNames.forEach(name => this.addIsland(name));
         }
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
        let name = island.getRandomName();
        div.innerHTML = name;
        document.body.appendChild(div);
        this.islands.push({name});
        this.moveIsland(div);
    }

    moveIsland(div) {
        // this might be a good point to animate the islands with JS Animations API
        let coords = this.getCoordinates();
        div.animate([
            { transform: `translate(0px, 0px)` },
            { transform: `translate(${coords.x}px, ${coords.y}px)` }

        ], {
            duration: 1000,
            iterations: 1,
            fill: "forwards"
        });
    }

    clearIslands() {
        // Remove all islands from the DOM
        const islands = document.querySelectorAll(".island");
        islands.forEach((island) => {
          island.remove();
        });
    
        // Clear the islands array
        this.islands = [];
      }


}
