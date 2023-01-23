import * as document from "document";
import { Vibration } from "haptics";
import { Barometer } from "barometer";
import { Geolocation } from "geolocation";
import { display } from "display";

// import { Puck } from "./Puck";


let background = document.getElementById("background");
// let previousBackgroundColor = background.style.fill;;

// let puck1 = new Puck("puck0", "Icons/flashlight_on_fontsGoogleWhite.png", 90, 90, 20, 75);

const gameWidth = 300;
const gameHeight = 300;
const gameTilesRow = 10;
const gameTilesColoum = 10;
const gameTileWidth = gameWidth/gameTilesRow;
const gameTileHeight = gameHeight/gameTilesRow;

const cells = document.getElementsByClassName("cell");
const test = Array.apply(null, Array(100)).map(function () {return "false";});

console.log("cells.length = "+cells.length);
// for(var i=0; i<cells.length; i++){
//   cells[i].style.fill="purple";
// }

for(var i=0; i<gameTilesRow; i++){
  for(var j=0; j<gameTilesColoum; j++){
    const cell = cells[i*gameTilesRow+j];
    const cellTest = test[i*gameTilesRow+j];
    if(Math.floor(Math.random() * 2)==0){
      cell.style.fill="#FFFFFF";
      cellTest="true";
    }else{
      cell.style.fill="#000000";
      cellTest="false";
    }
    cell.y=gameTilesColoum*i*3;
    cell.x=gameTileWidth*j;
    cell.width=gameTileWidth;
    cell.height=gameTileHeight;
  }
}





// flashlight.onclick = (e) => {
//   // flashlight.onClickDefault();
//   if(background.style.fill != "#FFFFFF"){
//     previousBackgroundColor = background.style.fill;
//     background.style.fill   = "#FFFFFF";
//     flashlight.href   = "Icons/flashlight_off_fontsGoogle.png";
//    }else{
//       background.style.fill = previousBackgroundColor;
//       flashlight.href = "Icons/flashlight_on_fontsGoogleWhite.png";
//    }
// }

setInterval(function() {
  
  for(var i=0; i<gameTilesRow; i++){
    for(var j=0; j<gameTilesColoum; j++){
      const cell = cells[i*gameTilesRow+j];
      const cellTest = test[i*gameTilesRow+j];
      const num = 0;
      try{if(cells[(i-1)*gameTilesRow+j].style.fill=="#FFFFFF"){ num++;}}catch(e){};
      try{if(cells[(i+1)*gameTilesRow+j].style.fill=="#FFFFFF"){ num++;}}catch(e){};
      try{if(cells[i*gameTilesRow+(j-1)].style.fill=="#FFFFFF"){ num++;}}catch(e){};
      try{if(cells[i*gameTilesRow+(j+1)].style.fill=="#FFFFFF"){ num++;}}catch(e){};
// Any live cell with two or three live neighbours survives.
// Any dead cell with three live neighbours becomes a live cell.
// All other live cells die in the next generation. Similarly, all other dead cells stay dead.
      test[i*gameTilesRow+j] = "false";
      if(cell.style.fill=="#FFFFFF"){
        if(num == 2 || num == 3){ test[i*gameTilesRow+j] = "true"; }
      }
      if(cell.style.fill=="#000000" && num == 3){
        test[i*gameTilesRow+j] = "true";
      }
    }
  }
  console.log(test);
  // for(var i=0; i<100; i++){
  //   if(test[i]){
  //     // test[i*gameTilesRow+j].style.fill="orange";
  //   }
  // }
  for(var i=0; i<gameTilesRow; i++){
  for(var j=0; j<gameTilesColoum; j++){
    const cell = cells[i*gameTilesRow+j];
    if(test[i*gameTilesRow+j]=="true"){
       cell.style.fill="#FFFFFF";
    }else{
       cell.style.fill="#000000";
    }
    // cell.y=gameTilesColoum*i*3;
    // cell.x=gameTileWidth*j;
    // cell.width=gameTileWidth;
    // cell.height=gameTileHeight;
  }
}
  // puck1.tick();
  // puck2.tick();
}, 500);
