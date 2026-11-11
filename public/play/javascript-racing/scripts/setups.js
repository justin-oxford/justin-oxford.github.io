var downforceSetting   = 2; // this is the middle option
var gearingSetting     = 2; // this is the middle option
var suspensionSetting  = 2; // this is the middle option
var brakesSetting      = 2; // this is the middle option


function changeDownforce(adjustment) {
    if (adjustment == 'decrease' && downforceSetting > 1) {
        downforceSetting -= 1;
    } 
    else if (adjustment == 'increase' && downforceSetting < 3) {
        downforceSetting += 1;
    } 
    updateSetup();
    console.log("DF: " + downforceSetting);
}

function changeGearing(adjustment) {
    if (adjustment == 'decrease' && gearingSetting > 1) {
        gearingSetting -= 1;
    } 
    else if (adjustment == 'increase' && gearingSetting < 3) {
        gearingSetting += 1;
    } 
    updateSetup();
    console.log("Gear: " + gearingSetting);
}

function changeSuspension(adjustment) {
    if (adjustment == 'decrease' && suspensionSetting > 1) {
        suspensionSetting -= 1;
    } 
    else if (adjustment == 'increase' && suspensionSetting < 3) {
        suspensionSetting += 1;
    } 
    updateSetup();
    console.log("Sus: " + suspensionSetting);
}

function changeBrakes(adjustment) {
    if (adjustment == 'decrease' && brakesSetting > 1) {
        brakesSetting -= 1;
    } 
    else if (adjustment == 'increase' && brakesSetting < 3) {
        brakesSetting += 1;
    } 
    updateSetup();
    console.log("Brake: " + brakesSetting);
}

function updateSetup() {
    
    // update downforce
    if(downforceSetting == 1) {
        downforceAdjustment = 0.95;
        document.getElementById("DFSetting").innerHTML = "Low";
    }
    else if (downforceSetting == 2){
        downforceAdjustment = 1.00;
        document.getElementById("DFSetting").innerHTML = "Med";
    }
    else if (downforceSetting == 3) {
        downforceAdjustment = 1.05;
        document.getElementById("DFSetting").innerHTML = "High";
    }

    // update gear
    if(gearingSetting == 1) {
        gearingAdjustment  = 0.99;
        topSpeedAdjustment = 1.05;
        document.getElementById("GRSetting").innerHTML = "Long";
    }
    else if (gearingSetting == 2){
        gearingAdjustment  = 1.00;
        topSpeedAdjustment = 1.00;
        document.getElementById("GRSetting").innerHTML = "Med";
    }
    else if (gearingSetting == 3) {
        gearingAdjustment  = 1.2;
        topSpeedAdjustment = 0.95;
        document.getElementById("GRSetting").innerHTML = "Short";
    }

    // update suspension
    if(suspensionSetting == 1) {
        suspAdjustment = 0.50;
        document.getElementById("SSSetting").innerHTML = "Tight";
    }
    else if (suspensionSetting == 2){
        suspAdjustment = 0.90;
        document.getElementById("SSSetting").innerHTML = "Med";
    }
    else if (suspensionSetting == 3) {
        suspAdjustment = 1.05;
        document.getElementById("SSSetting").innerHTML = "Loose";
    }

    // update brakes
    if(brakesSetting == 1) {
        brakeAdjustment = 0.95;
        document.getElementById("BPSetting").innerHTML = "Low";
    }
    else if (brakesSetting == 2){
        brakeAdjustment = 1.00;
        document.getElementById("BPSetting").innerHTML = "Med";
    }
    else if (brakesSetting == 3) {
        brakeAdjustment = 1.10;
        document.getElementById("BPSetting").innerHTML = "High";
    }
    // setting          = (team %)   * (Spec Base) * (Setup %)
    engineForce         = teamEngine *  specEngine * gearingAdjustment;
    maxSpeed            = teamSpeed  *  specSpeed  * topSpeedAdjustment;
    brakeForce          = teamBrakes *  specBrakes * brakeAdjustment;
    dragCoEfficient     = teamDrag   *  specDrag   * downforceAdjustment; 
    downforceCoEff      = teamDownFc *  specDownFc * downforceAdjustment;
    gripCoefficient     = teamGrip   *  specGrip   * suspAdjustment;

    console.log("Power : " + engineForce);
    console.log("MaxSp : " + maxSpeed);
    console.log("Brake : " + brakeForce);
    console.log("DownF : " + downforceCoEff);
    console.log("DragC : " + dragCoEfficient);
}