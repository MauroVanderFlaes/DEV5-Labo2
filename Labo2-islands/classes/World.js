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

        document.getElementById("btnClear").addEventListener("click", () => {
            this.clearIslands();
            console.log("clear");
        });
    }

    save() {
        // Save array islands to localstorage as string
        // Loop over all this.islands and save the names, coordinates, and color
        const islandData = this.islands.map((island) => {
            return {
                name: island.name,
                coordinates: island.coordinates,
                color: island.color,
            };
        });
        const islandDataJSON = JSON.stringify(islandData);
        localStorage.setItem('islands', islandDataJSON);
        console.log(islandData, islandDataJSON);
        console.log(this.islands);
    }

    load() {
        // Load islands from localstorage into array
        // Loop over the array and addIslands()
        const islandDataJSON = localStorage.getItem('islands');
        if (islandDataJSON) {
            this.clearIslands();
            const islandData = JSON.parse(islandDataJSON);
            islandData.forEach(data => this.addIsland(data.name, data.coordinates, data.color));
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

    addIsland(name, coordinates, color) {
        // Add the islands to the DOM
        let island = new Island();
        console.log("addIsland");
        let div = document.createElement("div");
        div.classList.add("island");
        div.style.backgroundColor = color || island.getRandomColor();
        div.innerHTML = name || island.getRandomName();
        document.body.appendChild(div);
        this.islands.push({ 
            name: name || island.getRandomName(),
            coordinates: coordinates || this.getCoordinates(),
            color: div.style.backgroundColor,  // Hier de huidige kleur correct opslaan
        });
        this.moveIsland(div, this.islands[this.islands.length - 1].coordinates);
    }

moveIsland(div, coordinates) {
    coordinates = coordinates || this.getCoordinates();
    div.animate([
        { transform: `translate(0px, 0px)` },
        { transform: `translate(${coordinates.x}px, ${coordinates.y}px)` }
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
