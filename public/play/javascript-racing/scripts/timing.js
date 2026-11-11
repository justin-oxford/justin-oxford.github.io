// intialize all of the timing variables for server communication 
var specBest = 0.0;
var bestPostedTime = 0.0;
var sector1 = 'sec1';
var sector2 = 'sec2';
var sector3 = 'sec3';
var specBestSector1   = 0.0;
var bestPostedSector1 = 0.0;
var specBestSector2   = 0.0;
var bestPostedSector2 = 0.0;
var specBestSector3   = 0.0;
var bestPostedSector3 = 0.0;

// get the best laptime from the server
function getBestLeaderBoardLapTime() {
                    
    $.post('php/getBestLapTime.php',{spec:specChoice, trackName:trackChoice}, function(bestPostedTime){
        
        console.log(bestPostedTime);
        specBest = parseFloat(bestPostedTime);
    });
    console.log(specBest);
}

// get the best sector 1 from server
function getBestLeaderBoardSe1Time() {
    sector = 'sec1';
    $.post('php/getBestSectorTime.php',{spec:specChoice, trackName:trackChoice, sectorNumber:sector1}, function(bestPostedSector1){
        
        console.log(bestPostedSector1);
        specBestSector1 = parseFloat(bestPostedSector1);
    });
    console.log('SECTOR 1 BEST:');
    console.log(specBestSector1);
}

// get the best sector 2 from server
function getBestLeaderBoardSe2Time() {
    $.post('php/getBestSectorTime.php',{spec:specChoice, trackName:trackChoice, sectorNumber:sector2}, function(bestPostedSector2){
        
        console.log(bestPostedSector2);
        specBestSector2 = parseFloat(bestPostedSector2);
    });
    console.log('SECTOR 2 BEST:');
    console.log(specBestSector2);
}

// get the best sector 3 from server
function getBestLeaderBoardSe3Time() {
    $.post('php/getBestSectorTime.php',{spec:specChoice, trackName:trackChoice, sectorNumber:sector3}, function(bestPostedSector3){
        
        console.log(bestPostedSector3);
        specBestSector3 = parseFloat(bestPostedSector3);
    });
    console.log('SECTOR 3 BEST:');
    console.log(specBestSector3);
}





































// RELEVANT LAPTIME VARIABLES
var timer;
var sectorTimer;

var laptimes          = []; // laptime array
var sec1time          = []; // s1 array
var sec2time          = []; // s2 array
var sec3time          = []; // s3 array
var sector1best       = 0;
var sector2best       = 0;
var sector3best       = 0;

var laps              = 0;
var lapValid          = true;
var sectorOneValid    = true;
var sectorTwoValid    = true;
var sectorTreValid    = true;

var sectorOneComplete = false;
var sectorTwoComplete = false;
var sectorTreComplete = false;
var currentSector     = 0;
var previousSector    = 0;
var totalTime         = 0;



// #################
//   TIMING SYSTEM
// #################

function lapSectorSystem(sectorRegistered) {
    sector = sectorRegistered; // 1 is end of sector 1, 2 is end of sector 2, 3 is start/finish
    console.log(sector);
    if (laps > 0){
        
        
        if (sector == 1) {
            console.log("sector1 active");
            sectorOneComplete = true;
            sectorTime = sectorTimer.getElapsedTime();
            if (sectorTwoComplete == false && sectorTreComplete == true && sectorOneValid == true && sectorTime > 2) {
                sec1time.push(sectorTime);
                sec1time.sort(function(a, b){return a-b});
                sector1best = sec1time[0];
                document.getElementById('sector1TimeDisplay').innerHTML = sectorTime.toFixed(3);
                $.post('php/postSectorTime.php', {name:playerName, spec:specChoice, team:teamChoice, sectorTime:sectorTime, sectorNumber:'sec1', trackName:trackChoice});
                getBestLeaderBoardSe2Time();
                
                if (sectorTime < specBestSector1) {
                    purpleSector(1);
                }
                else if (sectorTime == sector1best){
                    greenSector(1);
                }
                else if (lapValid == false) {
                    redSector(1);
                    console.log('red sector 1');
                }
                else {
                    yellowSector(1);
                }
                splitCalculator(1,sectorTime);
                lapOptimalDisplayUpdate();
                sectorBestDisplayUpdate();
                sectorTimer.reset();
            }
            else if (sectorTime > 4) {
                sectorTimer.reset();
                invalidLapStyle(1);
                sectorOneValid = true;
            }
            sectorTreComplete = false;
            sectorStyleReset(2);
            sectorStyleReset(3);
        }




        if (sector == 2) {
            console.log("sector2 active");
            sectorTwoComplete = true;
            sectorTime = sectorTimer.getElapsedTime();
            if (sectorTreComplete == false && sectorOneComplete == true && sectorTwoValid == true && sectorTime > 2) {
                sec2time.push(sectorTime);
                sec2time.sort(function(a, b){return a-b});
                sector2best = sec2time[0];
                document.getElementById('sector2TimeDisplay').innerHTML = sectorTime.toFixed(3);
                $.post('php/postSectorTime.php', {name:playerName, spec:specChoice, team:teamChoice, sectorTime:sectorTime, sectorNumber:'sec2', trackName:trackChoice});
                getBestLeaderBoardLapTime();
                getBestLeaderBoardSe3Time();
                if (sectorTime < specBestSector2) {
                    purpleSector(2);
                }
                else if (sectorTime == sector2best){
                    greenSector(2);
                }
                else if (lapValid == false) {
                    redSector(2);
                }
                else {
                    yellowSector(2);
                }
                splitCalculator(2,sectorTime);
                lapOptimalDisplayUpdate();
                sectorBestDisplayUpdate();
                sectorTimer.reset();
            }
            else if (sectorTime > 4) {
                sectorTimer.reset();
                invalidLapStyle(2);
                sectorTwoValid = true;
            }
            sectorOneComplete = false;
        }


        if (sector == 3) {
            console.log("sector3 active");
            sectorTreComplete = true;
            sectorTime = sectorTimer.getElapsedTime();
            if (sectorOneComplete == false && sectorTwoComplete == true && sectorTwoValid == true && sectorTime > 2) {
                sec3time.push(sectorTime);
                sec3time.sort(function(a, b){return a-b});
                sector3best = sec3time[0];
                document.getElementById('sector3TimeDisplay').innerHTML = sectorTime.toFixed(3);
                $.post('php/postSectorTime.php', {name:playerName, spec:specChoice, team:teamChoice, sectorTime:sectorTime, sectorNumber:'sec3', trackName:trackChoice});
                getBestLeaderBoardSe1Time();
                
                if (sectorTime < specBestSector3) {
                    purpleSector(3);
                }
                else if (sectorTime == sector3best){
                    greenSector(3);
                }
                else if (lapValid == false) {
                    redSector(3);
                }
                else {
                    yellowSector(3);
                }
                splitCalculator(3,sectorTime);
                lapOptimalDisplayUpdate();
                sectorBestDisplayUpdate();
                sectorTimer.reset();
                
                // total lap timer and counter
                laps = laps + 1;
                currentTimeRAW = timer.getElapsedTime();
                currentTime = currentTimeRAW.toFixed(3);
                if (laps > 1 && lapValid == true){
                    console.log('logging lap');
                    console.log(currentTime);
                    laptimes.push(currentTime);
                    document.getElementById("prevLap").innerHTML = currentTime;
                    laptimes.sort(function(a, b){return a-b});
                    document.getElementById("bestLap").innerHTML = laptimes[0];
                    sendTime = parseFloat(currentTime);
                    
                    // send laptime to server
                    $.post('php/postLapTime.php', {name:playerName, spec:specChoice, team:teamChoice, lapTime:sendTime, trackName:trackChoice});
                    
                    
                    
                    if (currentTime < specBest) {
                        document.getElementById("prevLap").style.backgroundColor = "#cc00cc";
                        document.getElementById("prevLap").style.color = "white";
                        specBest = currentTime;
                    }
                    else if (currentTime == laptimes[0]) {
                        document.getElementById("prevLap").style.backgroundColor = "#00a651";
                        document.getElementById("prevLap").style.color = "white";
                    }
                    else {
                        document.getElementById("prevLap").style.backgroundColor = "cab230";
                        document.getElementById("prevLap").style.color = "white";
                    }
                    totalTime = totalTime + parseFloat(currentTime);
                    averageLapTime = totalTime / laptimes.length;
                    document.getElementById('avgLap').innerHTML = averageLapTime.toFixed(3);
                    document.getElementById('lapCounter').innerHTML = laps;
                    document.getElementById("currentLap").style.color = 'white';
                    timer.reset();
                    console.log(playerName);
                    console.log(specChoice);
                    console.log(teamChoice);
                }
                else {
                    console.log("if statement failed")
                    document.getElementById('lapCounter').innerHTML = laps;
                    document.getElementById("currentLap").style.color = 'white';
                    timer.reset();
                    lapValid = true;
                }
                
            }
            else if (sectorTime > 4) {
                sectorTimer.reset();
                timer.reset();
                invalidLapStyle(3);
                lapValid = true;
                sectorTreValid = true;
            }
            sectorTwoComplete = false;
        }
    }

    else if (laps <= 0 && sector == 3) {
        laps = laps + 1;
        timer.reset();
        sectorTimer.reset();
        lapsValid = true;
    }
    else {
        lapsValid = true;
    }
    sectorOneValid = true;
    sectorTwoValid = true;
    sectorTreValid = true;
}

// styling overall best sectors
function purpleSector(sector) {
    if (sector == 1){
        document.getElementById('sector1TimeDisplay').style.color = 'white';
        document.getElementById('sector1TimeDisplay').style.backgroundColor = '#cc00cc';
    }
    else if (sector == 2){
        document.getElementById('sector2TimeDisplay').style.color = 'white';
        document.getElementById('sector2TimeDisplay').style.backgroundColor = '#cc00cc';
    }
    else if (sector == 3){
        document.getElementById('sector3TimeDisplay').style.color = 'white';
        document.getElementById('sector3TimeDisplay').style.backgroundColor = '#cc00cc';
    }
}

// styling personal best sectors  -- for live timing
function greenSector(sector) {
    if (sector == 1){
        document.getElementById('sector1TimeDisplay').style.color = 'white';
        document.getElementById('sector1TimeDisplay').style.backgroundColor = '#00a651';
    }
    else if (sector == 2){
        document.getElementById('sector2TimeDisplay').style.color = 'white';
        document.getElementById('sector2TimeDisplay').style.backgroundColor = '#00a651';
    }
    else if (sector == 3){
        document.getElementById('sector3TimeDisplay').style.color = 'white';
        document.getElementById('sector3TimeDisplay').style.backgroundColor = '#00a651';
    }
}

// styling slower/off-pace sectors
function yellowSector(sector) {
    if (sector == 1){
        document.getElementById('sector1TimeDisplay').style.color = 'white';
        document.getElementById('sector1TimeDisplay').style.backgroundColor = '#cab230';
    }
    else if (sector == 2){
        document.getElementById('sector2TimeDisplay').style.color = 'white';
        document.getElementById('sector2TimeDisplay').style.backgroundColor = '#cab230';
    }
    else if (sector == 3){
        document.getElementById('sector3TimeDisplay').style.color = 'white';
        document.getElementById('sector3TimeDisplay').style.backgroundColor = '#cab230';
    }
}

// styling invalid lap sectors
function redSector(sector) {
    if (sector == 1){
        document.getElementById('sector1TimeDisplay').style.color = 'white';
        document.getElementById('sector1TimeDisplay').style.backgroundColor = 'darkred';
    }
    else if (sector == 2){
        document.getElementById('sector2TimeDisplay').style.color = 'white';
        document.getElementById('sector2TimeDisplay').style.backgroundColor = 'darkred';
    }
    else if (sector == 3){
        document.getElementById('sector3TimeDisplay').style.color = 'white';
        document.getElementById('sector3TimeDisplay').style.backgroundColor = 'darkred';
    }
}

// styling sectors that are invalid
function invalidLapStyle(sector) {
    if (sector == 1){
        document.getElementById('sector1Split').innerHTML = '---';
        document.getElementById('sector1TimeDisplay').style.color = 'white';
        document.getElementById('sector1TimeDisplay').style.backgroundColor = '#ca3030';
        console.log('go red');
    }
    else if (sector == 2){
        document.getElementById('sector2Split').innerHTML = '---';
        document.getElementById('sector2TimeDisplay').style.color = 'white';
        document.getElementById('sector2TimeDisplay').style.backgroundColor = '#ca3030';
    }
    else if (sector == 3){
        document.getElementById('sector3Split').innerHTML = '---';
        document.getElementById('sector3TimeDisplay').style.color = 'white';
        document.getElementById('sector3TimeDisplay').style.backgroundColor = '#ca3030';
    }  
}

// styling reset
function sectorStyleReset(sector) {
    if (sector == 1){
        document.getElementById('sector1Split').innerHTML = '---';
        document.getElementById('sector1TimeDisplay').style.color = 'white';
        document.getElementById('sector1TimeDisplay').style.backgroundColor = 'black';
    }
    else if (sector == 2){
        document.getElementById('sector2Split').innerHTML = '---';
        document.getElementById('sector2TimeDisplay').style.color = 'white';
        document.getElementById('sector2TimeDisplay').style.backgroundColor = 'black';
    }
    else if (sector == 3){
        document.getElementById('sector3Split').innerHTML = '---';
        document.getElementById('sector3TimeDisplay').style.color = 'white';
        document.getElementById('sector3TimeDisplay').style.backgroundColor = 'black';
    }  
}


// calculate the split for sectors
function splitCalculator(sector,sectorTime) {
    if (sector == 1) {
        split = sectorTime - sector1best;
        newSplit = sectorTime - sec1time[1];
        if (split > 0){
            document.getElementById('sector1Split').innerHTML = `+${split.toFixed(3)}`;
        }
        else if (isNaN(newSplit) == true || isNaN(split) == true) {
            document.getElementById('sector1Split').innerHTML = '---';
        }
        else {
            document.getElementById('sector1Split').innerHTML = `${newSplit.toFixed(3)}`;
        }
    }
    else if (sector == 2) {
        split = sectorTime - sector2best;
        newSplit = sectorTime - sec2time[1];
        if (split > 0){
            document.getElementById('sector2Split').innerHTML = `+${split.toFixed(3)}`;
        }
        else if (isNaN(newSplit) == true || isNaN(split) == true) {
            document.getElementById('sector2Split').innerHTML = '---';
        }
        else {
            document.getElementById('sector2Split').innerHTML = `${newSplit.toFixed(3)}`;
        }
    }
    else if (sector == 3) {
        split = sectorTime - sector3best;
        newSplit = sectorTime - sec3time[1];
        if (split > 0){
            document.getElementById('sector3Split').innerHTML = `+${split.toFixed(3)}`;
        }
        else if (isNaN(newSplit) == true || isNaN(split) == true) {
            document.getElementById('sector3Split').innerHTML = '---';
        }
        else {
            document.getElementById('sector3Split').innerHTML = `${newSplit.toFixed(3)}`;
        }
    }
}

// gets called when a void-lap object is hit
function voidLap() {
    lapValid = false;
    console.log('voided lap triggered');
}

//gets called when a void-lap object is hit (but resets at the start of the next sector)
function voidSector(sector) {
    if (sector == 1) {
        sectorValid = false;
        sectorOneValid = false;
    }
    else if (sector == 2) {
        sectorValid = false;
        sectorTwoValid = false;
    }
    else if (sector == 3) {
        sectorValid = false;
        sectorTreValid = false;
    }
    console.log('voided sector triggered');
}

// dishes out time penalties to rule breaks
function timePenalty() {
    // add a  'N' second time penalty on trigger ('N' will be sent to the function to correspond to the time, allowing each instand to have a unique penalty)
    // add it to the sector AND the overall lap
    // update a UI feature that displays acrued penalty time
    // return the new time and the penalty awarded
}

// Sector Best Updater
function sectorBestDisplayUpdate() {
    bestSector1 = sec1time[0];
    bestSector2 = sec2time[0];
    bestSector3 = sec3time[0];
    if (isNaN(bestSector1)) {
        document.getElementById("sector1Best").innerHTML = '---';
    }
    else {
        document.getElementById("sector1Best").innerHTML = bestSector1.toFixed(3);
    }
    if (isNaN(bestSector2)) {
        document.getElementById("sector2Best").innerHTML = '---';
    }
    else {
        document.getElementById("sector2Best").innerHTML = bestSector2.toFixed(3);
    }
    if (isNaN(bestSector3)) {
        document.getElementById("sector3Best").innerHTML = '---';
    }
    else {
        document.getElementById("sector3Best").innerHTML = bestSector3.toFixed(3);
    }
}

// Optimal Updater
function lapOptimalDisplayUpdate() {
    bestSector1 = sec1time[0];
    bestSector2 = sec2time[0];
    bestSector3 = sec3time[0];
    optimal = parseFloat(bestSector1) + parseFloat(bestSector2) + parseFloat(bestSector3)
    if (isNaN(optimal) == true) {
        document.getElementById("optimalTimeDisplay").innerHTML = '---';
    }
    else {
        document.getElementById("optimalTimeDisplay").innerHTML = optimal.toFixed(3);
    }
}