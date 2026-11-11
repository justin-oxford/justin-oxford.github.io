var menuOpen = false;
var timingOpen = false;

function openMenu() {
    if (menuOpen === true) {
        document.getElementById("settingsAndSetup").style.top = '-550px';
        menuOpen = false;
    }
    else {
        document.getElementById("settingsAndSetup").style.top = '50px';
        menuOpen = true;
    }
}

function openTiming() {
    if (timingOpen === true) {
        document.getElementById("timingDropDown").style.top = '-225px';
        timingOpen = false;
    }
    else {
        document.getElementById("timingDropDown").style.top = '50px';
        timingOpen = true;
    }
}

function resetTiming() {
    laptimes          = []; // laptime array
    sec1time          = []; // s1 array
    sec2time          = []; // s2 array
    sec3time          = []; // s3 array
}

// this function resets colors of all sector time displays
function resetColors() {
    document.getElementById('sector1TimeDisplay').style.color = "white";
    document.getElementById('sector1TimeDisplay').style.backgroundColor = "black";
    document.getElementById('sector2TimeDisplay').innerHTML = "---";
    document.getElementById('sector2TimeDisplay').style.color = "white";
    document.getElementById('sector2TimeDisplay').style.backgroundColor = "black";
    document.getElementById('sector3TimeDisplay').innerHTML = "---";
    document.getElementById('sector3TimeDisplay').style.color = "white";
    document.getElementById('sector3TimeDisplay').style.backgroundColor = "black";
    document.getElementById('prevLap').innerHTML = "---";
    document.getElementById('prevLap').style.color = "white";
    document.getElementById('prevLap').style.backgroundColor = "black";
}


// this function will reset the car to the pitlane and clear everything
function resetCarToPitlane() {
    playerCar.x            = INITX;
    playerCar.y            = INITY;
    playerCar.angle        = INITtheta;
    playerCar.currentAngle = INITtheta;
    playerCar.carSpeed     = 0;
    //changeCar(colorChoice);
    currentSector          = 1;
    previousSector         = 3;
    getBestLeaderBoardLapTime();
    getBestLeaderBoardSe1Time();
    getBestLeaderBoardSe2Time();
    getBestLeaderBoardSe3Time();
}

// this function sets the car to the grid if the player asks it to
function setCarToGrid(gridSlot) {
    if (gridSlot == 0){// random grid slot if 'G'
        gridSlot = Math.floor(Math.random() * 10);
    }
    if (gridSlot == 1){ //1
        playerCar.x = grid1X;
        playerCar.y = grid1Y;
    }
    else if (gridSlot == 2){//2
        playerCar.x = grid2X;
        playerCar.y = grid2Y;
    }
    else if (gridSlot == 3){//3
        playerCar.x = grid3X;
        playerCar.y = grid3Y;
    }
    else if (gridSlot == 4){//4
        playerCar.x = grid4X;
        playerCar.y = grid4Y;
    }
    else if (gridSlot == 5){//5
        playerCar.x = grid5X;
        playerCar.y = grid5Y;
    }
    else if (gridSlot == 6){//6
        playerCar.x = grid6X;
        playerCar.y = grid6Y;
    }
    else if (gridSlot == 7){//7
        playerCar.x = grid7X;
        playerCar.y = grid7Y;
    }
    else if (gridSlot == 8){//8
        playerCar.x = grid8X;
        playerCar.y = grid8Y;
    }
    else if (gridSlot == 9){//9
        playerCar.x = grid9X;
        playerCar.y = grid9Y;
    }
    else if (gridSlot == 10){//10
        playerCar.x = grid10X;
        playerCar.y = grid10Y;
    }
    playerCar.carSpeed = 0;
    playerCar.angle = INITtheta;
    currentSector = 3;
    previousSector = 2;
    laps = 0;
    getBestLeaderBoardLapTime();
    getBestLeaderBoardSe1Time();
    getBestLeaderBoardSe2Time();
    getBestLeaderBoardSe3Time();
}