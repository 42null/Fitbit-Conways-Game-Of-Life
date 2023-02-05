import * as document from "document";
import { display } from "display";

let background = document.getElementById("background");

const gameWidth = 300;
const gameHeight = 300;
// Max is 24 by 24 at the time due to updates per frame. Not sure if svg limmitation or Fitbit
const gameTilesRow = 24;
const gameTilesColoum = 24;
const GLIDER_TEST = false;
const tickTimeMS = 1;
const mathRandomMultiplyer = (GLIDER_TEST ? 0:2 );
const gameTileWidth = gameWidth/gameTilesColoum;
const gameTileHeight = gameHeight/gameTilesRow;

const cells = document.getElementsByClassName("cell");
const array1 = Array.apply(null, Array(gameTilesRow*gameTilesColoum)).map(function () {return false;});
const array2 = Array.apply(null, Array(gameTilesRow*gameTilesColoum)).map(function () {return false;});

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
// for(var i=0; i<cells.length; i++){
//   cells[i].style.fill="purple";
// }

const currentArray = array1;

for(var i=0; i<gameTilesRow; i++){
  for(var j=0; j<gameTilesColoum; j++){
    const cell = cells[i*gameTilesColoum+j];
    const cellBoolean = currentArray[i*gameTilesColoum+j];
    if(Math.floor(Math.random() * mathRandomMultiplyer)==0){
      cell.style.fill="#FFFFFF";
      // cellBoolean=true;
      currentArray[i*gameTilesColoum+j]=true;
    }else{
      cell.style.fill="#FFFFFF";
      // cell.style.fill="#000000";
      // cellBoolean=false;
      currentArray[i*gameTilesColoum+j]=false;
    }
    if(i==0 && j==0){
      cell.style.fill="#FF0000";
    }else if(i==0){
      cell.style.fill="#00FF00";
    }else if(j==0){
      cell.style.fill="#0000FF";
     }
    cell.y=gameTileHeight*i;
    cell.x=gameTileWidth*j;
    cell.width=gameTileWidth*.9;
    cell.height=gameTileHeight*.9;
  }
}


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
         cell.style.fill="#FFFFFF";
      }else{
         cell.style.fill="#000000";
      }
    }
   
  }
  iteration++;
}, tickTimeMS);
