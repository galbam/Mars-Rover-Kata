/*
  Gonzalo Alba
*/

// Rover Object Goes Here
// ======================
let rover = {
  direction: "N",
  positionX: 0,
  positionY: 0,
  travelLog: []
};

let roverGridSizeX = 10;
let roverGridSizeY = 10;
let roverGrid = [];
let obstacle = "X";
let numberOfObstacles = 4;
// ======================

//Start
fillGrid();
printGrid();

fillObstacles();
printGrid();

commandList(rover, "rffrfflfrffb");

printTravelLogMatrixMode();

//Grid
function fillGrid(){
  for(let x = 0; x < roverGridSizeX; x++) {
    roverGrid[x] = [];
    for(let y = 0; y < roverGridSizeY; y++) {
      roverGrid[x][y] = ".";
    }
  }
}
function printGrid(){
  for(let x = 0; x < roverGridSizeX; x++) {
    let message = "";
    for(let y = 0; y < roverGridSizeY; y++) {
      message += (roverGrid[y][x] + " ");
    }
    console.log(message);
  }
  console.log("");
}
function fillObstacles(){
  for(let o = 0; o < numberOfObstacles; o++) {
    let inX = Math.floor(Math.random() * roverGridSizeX); 
    let inY = Math.floor(Math.random() * roverGridSizeY); 

    roverGrid[inX][inY] = obstacle;
  }
}

//Rotate
function turnLeft(rover) {
  let currentDireccion = rover.direction;
  console.log(`Current Rover position: X: ${rover.positionX}  -  Y: ${rover.positionY}`);
  console.log(`Rover is facing  ${currentDireccion}  and turned left.`);
  
  switch(currentDireccion) {
    case "N":
      rover.direction = "W";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
    case "W":
      rover.direction = "S";
      break;
  }

  console.log(`Rover is now facing  ${rover.direction}`);
}
function turnRight(rover) {
  let currentDireccion = rover.direction;
  console.log(`Current Rover position: X: ${rover.positionX}  -  Y: ${rover.positionY}`);
  console.log(`Rover is facing  ${currentDireccion}  and turned right.`);
  
  switch(currentDireccion) {
    case "N":
      rover.direction = "E";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "W":
      rover.direction = "S";
      break;
  }

  console.log(`Rover is now facing  ${rover.direction}`);
}

//Moves
function moveForward(rover) {
  switch(rover.direction) {
    case "N":
      //y - 1
      if(validatePositionYNeg(rover)){
        rover.positionY -= 1;
      }   
      break;
    case "S":
      //y + 1
      if(validatePositionYPos(rover)){
        rover.positionY += 1;
      }    
      break;
    case "E":
      //x + 1
      if(validatePosotionXPos(rover)){
        rover.positionX += 1;
      }    
      break;
    case "W":
      //x - 1
      if(validatePosotionXNeg(rover)){
        rover.positionX -= 1
      }     
      break;
  }

  //Fill log
  let roverTravelLog = {
    travelDireccion: rover.direction,
    travelX: rover.positionX,
    travelY: rover.positionY
  }
  rover.travelLog.push(roverTravelLog);

  console.log("");
  console.log("Moving forward 1 position...");
  console.log(`New Rover position: X: ${rover.positionX}  -  Y: ${rover.positionY}`);
  console.log("");

  printTravelLog(rover);
}
function moveBackward(rover) {
  switch(rover.direction) {
    case "N":
      //y + 1
      if(validatePositionYPos(rover)){
        rover.positionY += 1;
      } 
      break;
    case "S":
      //y - 1
      if(validatePositionYNeg(rover)){
        rover.positionY -= 1;
      }
      break;
    case "E":
      //x - 1
      if(validatePosotionXNeg(rover)){
        rover.positionX -= 1;
      }
      break;
    case "W":
      //x + 1
      if(validatePosotionXPos(rover)){
        rover.positionX += 1;
      }
      break;
  }

  //Fill log
  let roverTravelLog = {
    travelDireccion: rover.direction,
    travelX: rover.positionX,
    travelY: rover.positionY
  }
  rover.travelLog.push(roverTravelLog);

  console.log("");
  console.log("Moving back 1 position...");
  console.log(`New Rover position: X: ${rover.positionX}  -  Y: ${rover.positionY}`);
  console.log("");

  printTravelLog(rover);
}

//Print
function printTravelLog(rover) {
  console.log("TRAVEL LOG--------------------------------");
  console.log("Rover has been in the following positions:");

  for(let x = 0; x <= rover.travelLog.length - 1; x++) {     
    console.log(rover.travelLog[x]);
  }

  console.log("------------------------------------------");
}
function printTravelLogMatrixMode()
{
  console.log("");
  console.log("TRAVEL LOG - MATRIX MODE------------------");

  for(let i = 0; i <= rover.travelLog.length - 1; i++) {     
    roverGrid[rover.travelLog[i].travelX][rover.travelLog[i].travelY] = "R";
  }

  printGrid();
}

function commandList(rover, commands) {
  console.log("-COMMANDS-")
  console.log(commands);
  console.log("");
  for(let i = 0; i<= commands.length - 1; i++) {
    switch(commands[i]){
      case "f":
        moveForward(rover);
        break;
      case "r":
        turnRight(rover)
        break;
      case "l":
        turnLeft(rover)
        break;
      case "b":
        moveBackward(rover)
        break;
      default:
        console.log(`${commands[i]} is not a valid command.`);
        break;
    }
  }
}

//Validaion functions
function validatePositionYPos(rover){
  if(rover.positionY + 1 < roverGridSizeY){
    if(roverGrid[rover.positionX][rover.positionY + 1] != obstacle){
      return true;
    } else{
      console.log(`Obstacle on: (${rover.positionX}, ${rover.positionY + 1})`);
    }
  } else{
    console.log("Passing y...");
    return false;
  } 
}
function validatePositionYNeg(rover){
  if(rover.positionY - 1 >= 0){
    if(roverGrid[rover.positionX][rover.positionY -1] != obstacle){
      return true;
    }else{
      console.log(`Obstacle on: (${rover.positionX}, ${rover.positionY - 1})`);
    }
  } else{
    console.log("Passing y...");
    return false;
  } 
}
function validatePosotionXPos(rover){
  if(rover.positionX + 1 < roverGridSizeX){
    if(roverGrid[rover.positionX + 1][rover.positionY] != obstacle){
      return true;
    } else{
      console.log(`Obstacle on: (${rover.positionX + 1}, ${rover.positionY})`);
    }
  } else{
    console.log("Passing x...");
    return false;
  }
}
function validatePosotionXNeg(rover){
  if(rover.positionX - 1 >= 0){
    if(roverGrid[rover.positionX - 1][rover.positionY] != obstacle){
      return true;
    } else{
      console.log(`Obstacle on: (${rover.positionX - 1}, ${rover.positionY})`);
    }    
  } else{
    console.log("Passing x...");
    return false;
  }
}