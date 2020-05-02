console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

var lastRightStickTap;
var lastLeftStickTap;
const gearElement = document.getElementById('gear');
const doubleTapInterval = 250; 

var rightJoystick = new VirtualJoystick({
    container: document.body,
    strokeStyle: 'black',
    limitStickTravel: true,
    stickRadius: 101,
    mouseSupport: true,
    stationaryBase: true,
    baseX: window.innerWidth - 100,
    baseY: window.innerHeight / 2,
    limitStickTravel: true,

});

rightJoystick.addEventListener('touchStartValidation', function(event){
    var touch = event.changedTouches[0];
    if( touch.pageX < window.innerWidth/2 )	
        return false;
    else
        return true;
});

rightJoystick.addEventListener('touchStart', function(){
    let now = new Date().getTime();
    let timesince = now - lastRightStickTap;
    if((timesince < doubleTapInterval) && (timesince > 0)){
        sendRequest('shift', {shift: 'up'});
    }
    lastRightStickTap = new Date().getTime();
});


var leftJoystick = new VirtualJoystick({
    container: document.body,
    strokeStyle: 'black',
    limitStickTravel: true,
    stickRadius: 101,
    stationaryBase: true,
    baseX: 100,
    baseY: window.innerHeight / 2,
    limitStickTravel: true,
});

leftJoystick.addEventListener('touchStartValidation', function(event){
    var touch = event.changedTouches[0];
    if( touch.pageX >= window.innerWidth/2 )
        return false;
    else
        return true;
});

leftJoystick.addEventListener('touchStart', function(){
    let now = new Date().getTime();
    let timesince = now - lastLeftStickTap;
    if((timesince < doubleTapInterval) && (timesince > 0)){
        sendRequest('shift', {shift: 'down'});
    }
    lastLeftStickTap = new Date().getTime();
});


setInterval(sendJoysticksData, 100);


function sendJoysticksData() {
    sendRequest('sticksInput', getJoysticksData());
}

function getJoysticksData() {
    return {
        leftStick: -leftJoystick.deltaY(),
        rightStick: -rightJoystick.deltaY()
    }
}

function sendRequest(destination, data) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'api/' + destination);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(data));
    gearElement.innerHTML = 'sending this: ' + JSON.stringify(data);
}