// setup adjustments; initialize
var downforceAdjustment = 1;
var gearingAdjustment   = 1;
var topSpeedAdjustment  = 1;
var suspAdjustment      = 1;
var brakeAdjustment     = 1;

// dynamic forces and constants
var dragCoEfficient     = 0.001; // this value is changed by DOWNFORCE adjustment
var downforceCoEff      = 0.030; // this value is changed by DOWNFORCE adjustment
var gripCoefficient     = 0.050; // this is the value changed for SUSPENSION/STEERING adjustments
var maxSpeed            = 7.500;  // kph; preset value to trim top speed and drag calculations
var tyreWearRF          = 1.000;  // percent; this value will decrease as the player drives
var tyreWearLF          = 1.000;  // percent; this value will decrease as the player drives
var tyreWearRR          = 1.000;  // percent; this value will decrease as the player drives
var tyreWearLR          = 1.000;  // percent; this value will decrease as the player drives

// player controlled forces
var engineForce         = 0.03;  // this is value changed for GEAR
var brakeForce          = 0.06;  // this is the value changed for BRAKE PRESSURE

// puts some fresh rubber on the car
function newTyres() {
    tyreWearRF          = 1.000;
    tyreWearLF          = 1.000;  
    tyreWearRR          = 1.000;  
    tyreWearLR          = 1.000;
}


// interprets event listener data and changes the scene accordingly
function updateGameArea() {
    myGameArea.clear();
    playerCar.moveAngle       = 0;
    playerCar.throttle        = 0;
    playerCar.brake           = 0;
    rollingResistance         = 0;
    turnForceLATERAL          = 0;
    turnForceLONGITUDINAL     = 0;
    playerCar.drag            = dragCoEfficient * (playerCar.carSpeed ** 2);
    playerCar.downforce       = downforceCoEff  * (playerCar.carSpeed ** 2);
    
    // get grip data from tyres and downforce
    if (playerCar.carSpeed > 0 && playerCar.carSpeed < 6.95) {
        tyreGripLF    = (playerCar.mass + playerCar.fuelLVL) * (Math.log10( 10 * tyreWearLF)) * (((-0.0088) * ((playerCar.carSpeed-3.5)**4)) + 1.25);
        tyreGripRF    = (playerCar.mass + playerCar.fuelLVL) * (Math.log10( 10 * tyreWearRF)) * (((-0.0088) * ((playerCar.carSpeed-3.5)**4)) + 1.25);
        tyreGripLR    = (playerCar.mass + playerCar.fuelLVL) * (Math.log10( 10 * tyreWearLR)) * (((-0.0088) * ((playerCar.carSpeed-3.5)**4)) + 1.25);
        tyreGripRR    = (playerCar.mass + playerCar.fuelLVL) * (Math.log10( 10 * tyreWearRR)) * (((-0.0088) * ((playerCar.carSpeed-3.5)**4)) + 1.25);
        playerCar.LFgripSUM  = tyreGripLF + playerCar.downforce;
        playerCar.RFgripSUM  = tyreGripRF + playerCar.downforce;
        playerCar.LRgripSUM  = tyreGripLR + playerCar.downforce;
        playerCar.RRgripSUM  = tyreGripRR + playerCar.downforce;  
    }
    else { // if they player exceeds the grip limit then there is 0 grip [ this catches negative values ]
        tyreGripLF           = 0;
        tyreGripRF           = 0;
        tyreGripLR           = 0;
        tyreGripRR           = 0;
        playerCar.LFgripSUM  = 0;
        playerCar.RFgripSUM  = 0;
        playerCar.LRgripSUM  = 0;
        playerCar.RRgripSUM  = 0;
    }

    // left turn
    if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65])) {
        if (playerCar.carSpeed >= 0) {
            // generate forces
            turnForceLFLAT  = (gripCoefficient) * Math.cos(Math.PI / 50) * playerCar.LFgripSUM;
            turnForceLFLOG  = (gripCoefficient) * Math.sin(Math.PI / 50) * playerCar.LFgripSUM;
            turnForceRFLAT  = (gripCoefficient) * Math.cos(Math.PI / 50) * playerCar.RFgripSUM;
            turnForceRFLOG  = (gripCoefficient) * Math.sin(Math.PI / 50) * playerCar.RFgripSUM;
            turnForceLR     = (gripCoefficient) * playerCar.LRgripSUM;
            turnForceRR     = (gripCoefficient) * playerCar.RRgripSUM;

            // sum up the grip forces
            turnForceLATERAL       = (-1) * (turnForceLFLAT + turnForceRFLAT + turnForceLR + turnForceRR);
            turnForceLONGITUDINAL  = turnForceLFLOG + turnForceRFLOG;
            
            // rotate the car based on grip and forces
            playerCar.moveAngle    = turnForceLATERAL * 10;
            
            tyreWearRF = tyreWearRF - (0.002 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.01)); //turning at higher speed causes more wear
            tyreWearLF = tyreWearLF - (0.002 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.0005));
            tyreWearRR = tyreWearRR - (0.002 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.0085)); 
            tyreWearLR = tyreWearLR - (0.002 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.0005));
        }
    }

    // right turn
    else if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68])) {
        if (playerCar.carSpeed >= 0) {
            // generate forces
            turnForceLFLAT  = (gripCoefficient) * Math.cos(Math.PI / 50) * playerCar.LFgripSUM;
            turnForceLFLOG  = (gripCoefficient) * Math.sin(Math.PI / 50) * playerCar.LFgripSUM;
            turnForceRFLAT  = (gripCoefficient) * Math.cos(Math.PI / 50) * playerCar.RFgripSUM;
            turnForceRFLOG  = (gripCoefficient) * Math.sin(Math.PI / 50) * playerCar.RFgripSUM;
            turnForceLR     = (gripCoefficient) * playerCar.LRgripSUM;
            turnForceRR     = (gripCoefficient) * playerCar.RRgripSUM;

            // sum up the grip forces
            turnForceLATERAL       = ( 1) * (turnForceLFLAT + turnForceRFLAT + turnForceLR + turnForceRR);
            turnForceLONGITUDINAL  = turnForceLFLOG + turnForceRFLOG;
            
            // rotate the car based on grip and forces
            playerCar.moveAngle    = turnForceLATERAL * 10;
            
            tyreWearRF = tyreWearRF - (0.002 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.01)); //turning at higher speed causes more wear
            tyreWearLF = tyreWearLF - (0.002 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.0005));
            tyreWearRR = tyreWearRR - (0.002 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.0085)); 
            tyreWearLR = tyreWearLR - (0.002 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.0005));
        }
    }

    // gas pedal
    if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87])) {
         if (playerCar.carSpeed < maxSpeed && playerCar.fuelLVL > 0.0) {
            averageRearGrip = ((tyreWearLR + tyreWearRR)/2);
            console.log(engineForce);
            if (averageRearGrip >= 0.05){
                playerCar.throttle = engineForce * ((averageRearGrip - 0.05)**(1/6)) + 0.024;
            }
            else if (averageRearGrip < 0.05 && averageRearGrip > 0) {
                playerCar.throttle = 0.01; // maintains same fall-off behavior if setup is changed
            }
            else {
                playerCar.throttle = 0;
            }
            
            if (playerCar.carSpeed > 0){
                tyreWearRR = tyreWearRR - (0.1 * ((0.00003 / (((0.05) * playerCar.carSpeed) + 0.002)) - 0.000));//acceleration at lower speed causes more wear
                tyreWearLR = tyreWearLR - (0.1 * ((0.00003 / (((0.05) * playerCar.carSpeed) + 0.002)) - 0.000));//acceleration at lower speed causes more wear
            }
            else {
                tyreWearRR = tyreWearRR - 0.00375;//acceleration at lower speed causes more wear
                tyreWearLR = tyreWearLR - 0.00375;//acceleration at lower speed causes more wear
            }
            playerCar.fuelLVL = playerCar.fuelLVL - 0.00002; // burns fuel
        }      
    }

    // brake pedal
    if (myGameArea.keys && (myGameArea.keys[90] || myGameArea.keys[32] || myGameArea.keys[83])) {
        if (playerCar.carSpeed > 0) {
            averageFrontGrip = ((tyreGripLF + tyreGripRF) / 2);
            if (averageFrontGrip > 0.05) {
                playerCar.brake = brakeForce * ((averageFrontGrip - 0.05)**(1/6)) + 0.024;
            }
            else if (averageFrontGrip <= 0.05 && averageFrontGrip > 0){
                playerCar.brake = 0.01;
            }
            else {
                playerCar.brake = 0;
            }
            if (playerCar.carSpeed != 0) {
                tyreWearRF = tyreWearRF - (0.02 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.001)); //deceleration at higher speed causes more wear
                tyreWearLF = tyreWearLF - (0.02 * ((0.0001 * (playerCar.carSpeed ** 4)) + 0.001)); //deceleration at hihger speed causes more wear
            }
        }
        else {
            playerCar.brake = 0;
        }
    }

    if (playerCar.carSpeed > 0){
        rollingResistance   = (playerCar.mass) * 0.01; // still needs fuel level substration 
    }

    

    // function -- sum of forces -- calculates what actually happens to the car after all above considered

    if (playerCar.carSpeed >= 0){
        forwardForce                = playerCar.throttle;
        backwardForce               = playerCar.brake + playerCar.drag + rollingResistance + turnForceLONGITUDINAL;
        playerCar.netAcceleration   = forwardForce - backwardForce; // the actual force controlling in-line motion
    }
    else if (playerCar.carSpeed < 0) {
        forwardForce                = playerCar.throttle + playerCar.brake + playerCar.drag + rollingResistance + turnForceLONGITUDINAL;
        backwardForce               = 0;
        playerCar.netAcceleration   = forwardForce - backwardForce; // the actual force controlling in-line motion
    }
    
    leftROTForce              = 1;
    leftLATForce              = 0;
    rightROTForce             = 1;
    rightLATForce             = 0;
    playerCar.NETlat          = turnForceLATERAL; // the actual force controlling lateral motion
    playerCar.NETrot          = rightROTForce - leftROTForce; // the actual force controlling rotational motion
    
    // press "R" to reset car to pitlane
    if (myGameArea.keys && myGameArea.keys[82]) {
        resetCarToPitlane();
    }

    // open debug panel on 'K'
    if (myGameArea.keys && myGameArea.keys[75]) {
        if (debugOpen == false) {
            document.getElementById("debug").style.display = 'block';
            debugOpen = true;
        }
        else {
            document.getElementById("debug").style.display = 'none';
            debugOpen = false;
        }
    }

    // live update the laptime timer
    document.getElementById("carSpeed").innerHTML = Math.round(playerCar.carSpeed * 45);
    if (laps >= 1  && lapValid == true){
        currentLapTime = timer.getElapsedTime()
        document.getElementById("currentLap").innerHTML = currentLapTime.toFixed(3);
        document.getElementById("currentLap").style.color = 'white';
    }
    else if (laps >= 1 && lapValid == false) {
        document.getElementById("currentLap").innerHTML = 'INVALID';
        document.getElementById("currentLap").style.color = 'red';
    }
    else {
        document.getElementById("currentLap").innerHTML = '--';
        document.getElementById("currentLap").style.color = 'white';
    }

    // update tyre display data color; needs to be its own function
    blue  = 0; // this value doesn't change
    redLF   = ((-1) * 256 * tyreWearLF)+256;
    greenLF = tyreWearLF * 265;
    document.getElementById("LFtyre").style.backgroundColor = "rgba(" + redLF +","+ greenLF +","+ blue + ", 0.5)";
    redRF   = ((-1) * 256 * tyreWearRF)+256;
    greenRF = tyreWearRF * 265;
    document.getElementById("RFtyre").style.backgroundColor = "rgba(" + redRF +","+ greenRF +","+ blue + ", 0.5)";
    redLR   = ((-1) * 256 * tyreWearLR)+256;
    greenLR = tyreWearLR * 265;
    document.getElementById("LRtyre").style.backgroundColor = "rgba(" + redLR +","+ greenLR +","+ blue + ", 0.5)";
    redRR   = ((-1) * 256 * tyreWearRR)+256;
    greenRR = tyreWearRR * 265;
    document.getElementById("RRtyre").style.backgroundColor = "rgba(" + redRR +","+ greenRR +","+ blue + ", 0.5)";





    // run the update function for the frame
    myBackground.update();
    playerCar.newPos();
    playerCar.update();
    tyreWearPercentageLF = ((tyreWearLF) * 100).toFixed(1);
    tyreWearPercentageRF = ((tyreWearRF) * 100).toFixed(1);
    tyreWearPercentageLR = ((tyreWearLR) * 100).toFixed(1);
    tyreWearPercentageRR = ((tyreWearRR) * 100).toFixed(1);
    fuelLevel            = ((playerCar.fuelLVL/0.2)*100).toFixed(0);
    fuelDisplayValue     = ((-1) * fuelLevel) + 100;
    // change fuel level display

    document.getElementById("fuelMarker").style.top = fuelDisplayValue + "%";

    effectiveThrottle = playerCar.throttle / (engineForce * ((1 - 0.05)**(1/6)) + 0.024);
    //debug infomation
    document.getElementById('LF').innerHTML                = tyreWearPercentageLF + "%";
    document.getElementById('RF').innerHTML                = tyreWearPercentageRF + "%";
    document.getElementById('LR').innerHTML                = tyreWearPercentageLR + "%";
    document.getElementById('RR').innerHTML                = tyreWearPercentageRR + "%";
    document.getElementById('fuelLevelNUM').innerHTML      = fuelLevel + "%";
    document.getElementById('drag').innerHTML              = playerCar.drag.toFixed(3);
    document.getElementById('downforce').innerHTML         = playerCar.downforce.toFixed(3);
    document.getElementById('throttle').innerHTML          = effectiveThrottle.toFixed(3); 
    document.getElementById('LFgrip').innerHTML            = playerCar.LFgripSUM.toFixed(3);
    document.getElementById('RFgrip').innerHTML            = playerCar.RFgripSUM.toFixed(3);
    document.getElementById('LRgrip').innerHTML            = playerCar.LRgripSUM.toFixed(3);
    document.getElementById('RRgrip').innerHTML            = playerCar.RRgripSUM.toFixed(3);
    document.getElementById('speed').innerHTML             = playerCar.carSpeed.toFixed(3);
}
