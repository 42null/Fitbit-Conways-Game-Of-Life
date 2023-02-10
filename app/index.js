import * as messaging from "messaging";
import * as document from "document";
import { display } from "display";

// SETTINGS COMPANION VARIABLES
let background = document.getElementById("background");
let border     = document.getElementById("border");

let screenBackgroundColor = "#000000";
let screenBorderColor     = "#000000";
let liveCellColor         = "#FFFFFF";
let deadCellColor         = "#000000";

background.style.fill = screenBackgroundColor;
border.style.fill     = screenBorderColor;



const gameWidth = 300;
const gameHeight = 300;
// Max is 24 by 24 at the time due to updates per frame. Not sure if svg limmitation or Fitbit
let gameTilesRow = 24;
let gameTilesColoum = 24;
const GLIDER_TEST = false;
const tickTimeMS = 1;
const mathRandomMultiplyer = (GLIDER_TEST ? 0:2 );
let gameTileWidth = gameWidth/gameTilesColoum;
let gameTileHeight = gameHeight/gameTilesRow;

const cells = document.getElementsByClassName("cell");
let array1 = Array.apply(null, Array(gameTilesRow*gameTilesColoum)).map(function () {return false;});
let array2 = Array.apply(null, Array(gameTilesRow*gameTilesColoum)).map(function () {return false;});


messaging.peerSocket.addEventListener("message", (evt) => {
  console.log(JSON.stringify(evt.data));
});


messaging.peerSocket.addEventListener("message", (evt) => {
  const key = evt.data.key;
  const value = evt.data.value;

  console.log("Key = "+evt.data.key);
  console.log("Value = "+evt.data.value);
  if(evt && evt.data){
    if(evt.data.key === "KEY_COLOR__GRID_COLOR"){
      screenBackgroundColor=value;
      background.style.fill = screenBackgroundColor;
    }else if(key === "KEY_COLOR__CELL_LIVE"){
      liveCellColor=value;
    }else if(key === "KEY_COLOR__CELL_DEAD"){
      deadCellColor=value;
    }else if(key === "KEY_NUMBER__COLOUMS"){
      console.log("value = "+value)
      gameTilesRow   =value;
      gameTilesColoum=value;
      gameTileWidth = gameWidth/gameTilesColoum;
      gameTileHeight = gameHeight/gameTilesRow;
      for(let i=0; i < cells.length; i+=1 ){
        const cell = cells[i];
        cell.y=-1;
        cell.x=-1;
        cell.width=0;
        cell.height=0;
      }
      array1 = Array.apply(null, Array(gameTilesRow*gameTilesColoum)).map(function () {return false;});
      array2 = Array.apply(null, Array(gameTilesRow*gameTilesColoum)).map(function () {return false;});
      setBackground();
    }
  }
});

if(GLIDER_TEST){
  cells[3*gameTilesRow+2].style.fill="#FFFFFF";
  cells[4*gameTilesRow+3].style.fill="#FFFFFF";
  cells[5*gameTilesRow+1].style.fill="#FFFFFF";
  cells[5*gameTilesRow+2].style.fill="#FFFFFF";
  cells[5*gameTilesRow+3].style.fill="#FFFFFF";
  array1[3*gameTilesRow+2]=true;
  array1[4*gameTilesRow+3]=true;
  array1[5*gameTilesRow+1]=true;
  array1[5*gameTilesRow+2]=true;
  array1[5*gameTilesRow+3]=true;
}


console.log("array1.length = "+array1.length)
console.log("array2.length = "+array2.length)
console.log("cells.length  = "+cells.length);


const currentArray = array1;
const currentArray2 = array2;

function setBackground(){//TODO: Make take argments
  for(var i=0; i<gameTilesRow; i++){
    for(var j=0; j<gameTilesColoum; j++){
      const cell = cells[i*gameTilesColoum+j];      
      if(Math.floor(Math.random() * mathRandomMultiplyer)==0){
        cell.style.fill=liveCellColor;
        currentArray[i*gameTilesColoum+j]=true;
        currentArray2[i*gameTilesColoum+j]=true;
      }else{
        cell.style.fill=deadCellColor;
        currentArray[i*gameTilesColoum+j]=false;
        currentArray2[i*gameTilesColoum+j]=false;
      }
      cell.y=gameTileHeight*i;
      cell.x=gameTileWidth*j;
      cell.width=gameTileWidth*.9;
      cell.height=gameTileHeight*.9;
    }
  }
}
setBackground();

let iteration = 0;

setInterval(function() {
  
  if(iteration%2 == 1){
    const arrayCurrent = array2;
    const arrayNext = array1;
   }else{
    const arrayCurrent = array1;
    const arrayNext = array2;
   }
  
  for(var i=0; i<gameTilesRow; i++){
    for(var j=0; j<gameTilesColoum; j++){
      const cell = cells[i*gameTilesRow+j];
      const currentCellValue = arrayCurrent[i*gameTilesRow+j];
      const num = 0;
      //TODO: Make more efficent
      try{if(arrayCurrent[i*gameTilesRow+(j-1)]){ num++;}}catch(e){};
      try{if(arrayCurrent[i*gameTilesRow+(j+1)]){ num++;}}catch(e){};
      try{if(arrayCurrent[(i-1)*gameTilesRow+(j-1)]){ num++;}}catch(e){};
      try{if(arrayCurrent[(i-1)*gameTilesRow+(j)]){ num++;}}catch(e){};
      try{if(arrayCurrent[(i-1)*gameTilesRow+(j+1)]){ num++;}}catch(e){};
      try{if(arrayCurrent[(i+1)*gameTilesRow+(j-1)]){ num++;}}catch(e){};
      try{if(arrayCurrent[(i+1)*gameTilesRow+(j)]){ num++;}}catch(e){};
      try{if(arrayCurrent[(i+1)*gameTilesRow+(j+1)]){ num++;}}catch(e){};
      
// https://en.wikipedia.org/wiki/Conway's_Game_of_Life#Rules
  // Any live cell with two or three live neighbours survives.
  // Any dead cell with three live neighbours becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
      arrayNext[i*gameTilesRow+j] = false;
      if(currentCellValue){
        if(num == 2 || num == 3){
          arrayNext[i*gameTilesRow+j] = true;
        }
      }
      if(!currentCellValue && num == 3){
        arrayNext[i*gameTilesRow+j] = true;
      }
    }
  }
  
for(var i=0; i<gameTilesRow; i++){
  for(var j=0; j<gameTilesColoum; j++){
    const cell = cells[i*gameTilesColoum+j];

      if(arrayNext[i*gameTilesColoum+j]){
         cell.style.fill=liveCellColor;
      }else{
         cell.style.fill=deadCellColor;
      }
    }
   
  }
  iteration++;
}, tickTimeMS);
