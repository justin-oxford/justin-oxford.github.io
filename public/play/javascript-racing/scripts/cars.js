// initialize team specs [bluebull]
var teamEngine  = 1.070;
var teamSpeed   = 1.000;
var teamBrakes  = 1.050;
var teamDrag    = 1.000;
var teamDownFc  = 1.000;
var teamGrip    = 1.120;
// initialize spec specs [spec 1]
var specEngine  = 0.030;
var specSpeed   = 7.000;
var specBrakes  = 0.060;
var specDrag    = 0.001;
var specDownFc  = 0.030;
var specGrip    = 0.050;

// changes the team 
function changeCar(selection) {
    // update the car image
    colorChoice = selection;
    playerCar.image.src = colorChoice;
    playerCar.update();
    
    
    // update specs
    //Milotti Specs
    if (colorChoice == "Cars/redCar.jpg"){
        teamEngine  = 1.100;
        teamSpeed   = 1.100;
        teamBrakes  = 1.000;
        teamDrag    = 0.970;
        teamDownFc  = 0.960;
        teamGrip    = 0.990;
        teamChoice = "Cavalli";
    }
    //Blue Bull Specs
    else if (colorChoice == "Cars/blueCar.jpg") {
        teamEngine  = 1.070;
        teamSpeed   = 1.000;
        teamBrakes  = 1.050;
        teamDrag    = 1.000;
        teamDownFc  = 1.000;
        teamGrip    = 1.120;
        teamChoice = "Blue Bull";
    }
    //Motus Specs
    else if (colorChoice == "Cars/greenCar.jpg") {
        teamEngine  = 0.750;
        teamSpeed   = 0.750;
        teamBrakes  = 0.700;
        teamDrag    = 0.800;
        teamDownFc  = 0.800;
        teamGrip    = 0.800;
        teamChoice = "Motus";
    }
    //McFaren Specs
    else if (colorChoice == "Cars/mclarenCar.jpg") {
        teamEngine  = 1.000;
        teamSpeed   = 1.000;
        teamBrakes  = 1.000;
        teamDrag    = 1.050;
        teamDownFc  = 1.000;
        teamGrip    = 1.010;
        teamChoice = "McFaren";
    }
    //Stewart Specs
    else if (colorChoice == "Cars/stewCar.jpg") {
        teamEngine  = 0.950;
        teamSpeed   = 0.980;
        teamBrakes  = 1.000;
        teamDrag    = 1.070;
        teamDownFc  = 1.000;
        teamGrip    = 0.950;
        teamChoice = "Stewart";
    }
    //Foucault Specs
    else if (colorChoice == "Cars/foucCar.jpg") {
        teamEngine  = 1.000;
        teamSpeed   = 1.000;
        teamBrakes  = 1.000;
        teamDrag    = 1.000;
        teamDownFc  = 1.000;
        teamGrip    = 1.000;
        teamChoice = "Foucoult";
    }
    //Merc Specs
    else if (colorChoice == "Cars/silverCar.jpg") {
        teamEngine  = 1.100;
        teamSpeed   = 1.100;
        teamBrakes  = 1.060;
        teamDrag    = 0.980;
        teamDownFc  = 1.000;
        teamGrip    = 1.100;
        teamChoice = "Silberner";
    }
    //Beta Juliet Specs
    else if (colorChoice == "Cars/betaCar.jpg") {
        teamEngine  = 1.010;
        teamSpeed   = 1.000;
        teamBrakes  = 1.000;
        teamDrag    = 1.030;
        teamDownFc  = 1.000;
        teamGrip    = 0.960;
        teamChoice = "Beta Juliet";
    }
    //Stroll Specs
    else if (colorChoice == "Cars/strollCar.jpg") {
        teamEngine  = 0.990;
        teamSpeed   = 0.990;
        teamBrakes  = 1.000;
        teamDrag    = 1.080;
        teamDownFc  = 1.000;
        teamGrip    = 0.980;
        teamChoice = "Stroll";
    }
    //Toro Blue Specs
    else if (colorChoice == "Cars/toroCar.jpg") {
        teamEngine  = 0.970;
        teamSpeed   = 0.980;
        teamBrakes  = 1.000;
        teamDrag    = 1.050;
        teamDownFc  = 1.000;
        teamGrip    = 1.050;
        teamChoice = "Toro Blu";
    }
    //Trilliams Specs
    else if (colorChoice == "Cars/trilliamsCar.jpg"){
        teamEngine  = 0.930;
        teamSpeed   = 0.940;
        teamBrakes  = 1.000;
        teamDrag    = 1.050;
        teamDownFc  = 1.000;
        teamGrip    = 0.950;
        teamChoice = "Trilliams";
    }

    // reset car, but not times -- to compare teams
    resetCarToPitlane();
    //getBestLeaderBoardLapTime();
    //getBestLeaderBoardSe1Time();
    //getBestLeaderBoardSe2Time();
    //getBestLeaderBoardSe3Time();
}

// this function changes the car spec.
function changeSpec(x) {
    specLevel = x;
    if (specLevel == "spec1") {
        specEngine  = 0.030;
        specSpeed   = 7.000;
        specBrakes  = 0.060;
        specDrag    = 0.001;
        specDownFc  = 0.030;
        specGrip    = 0.050;
        specChoice  = "spec1";
    }
    else if (specLevel == "spec2"){
        specEngine  = 0.025;
        specSpeed   = 6.000;
        specBrakes  = 0.060;
        specDrag    = 0.002;
        specDownFc  = 0.030;
        specGrip    = 0.040;
        specChoice  = "spec2";
    }
    else if (specLevel == "spec3") {
        specEngine  = 0.023;
        specSpeed   = 5.000;
        specBrakes  = 0.060;
        specDrag    = 0.003;
        specDownFc  = 0.030;
        specGrip    = 0.030;
        specChoice  = "spec3";
    }
    
    // reset car and times
    resetCarToPitlane();
    resetTiming();
}