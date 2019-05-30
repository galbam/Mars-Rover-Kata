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

let roverGrid = [];
let roverGridSizeX = 10;
let roverGridSizeY = 10;
// ======================

//Start Rover 1
commandList(rover, "rffrfflfrffb");

//Rotate
function turnLeft(rover) {
  console.log("turnLeft was called!");

  let currentDireccion = rover.direction;
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
  console.log("--------------");
}
function turnRight(rover) {
  console.log("turnRight was called!");

  let currentDireccion = rover.direction;
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
  console.log("--------------");
}

//Moves
function moveForward(rover) {
  console.log("moveForward was called");

  let currentPositionX = rover.positionX;
  let currentPositionY = rover.positionY;
  console.log(`Current Rover position: X: ${currentPositionX}  -  Y: ${currentPositionY}`);

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

  rover.travelLog.push(`${rover.direction} - (${rover.positionX}, ${rover.positionY})`);

  console.log(`New Rover position: X: ${rover.positionX}  -  Y: ${rover.positionY}`);
  console.log("--------------");

  printTravelLog(rover);
}
function moveBackward(rover) {
  console.log("moveBackward was called");

  let currentPositionX = rover.positionX;
  let currentPositionY = rover.positionY;
  console.log(`Current Rover position: X: ${currentPositionX}  -  Y: ${currentPositionY}`);

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

  rover.travelLog.push(`${rover.direction} - (${rover.positionX}, ${rover.positionY})`);

  console.log(`New Rover position: X: ${rover.positionX}  -  Y: ${rover.positionY}`);
  console.log("--------------");

  printTravelLog(rover);
}

//Print
function printTravelLog(rover) {
  console.log("");
  console.log("Rover has been in the following positions:");

  for(var x = 0; x <= rover.travelLog.length - 1; x++) {     
    console.log(rover.travelLog[x]);
  }

  console.log("");
}

function commandList(rover, commands) {
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
    return true;
  } else{
    console.log("Passing y...");
    return false;
  } 
}
function validatePositionYNeg(rover){
  if(rover.positionY - 1 >= 0){
    return true;
  } else{
    console.log("Passing y...");
    return false;
  } 
}
function validatePosotionXPos(rover){
  if(rover.positionX + 1 < roverGridSizeX){
    return true;
  } else{
    console.log("Passing x...");
    return false;
  }
}
function validatePosotionXNeg(rover){
  if(rover.positionX - 1 >= 0){
    return true;
  } else{
    console.log("Passing x...");
    return false;
  }
}