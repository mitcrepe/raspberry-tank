console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

var rightJoystick = new VirtualJoystick({
    container: document.body,
    strokeStyle: 'cyan',
    limitStickTravel: true,
    stickRadius: 100,
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

// one on the right of the screen
var leftJoystick = new VirtualJoystick({
    container: document.body,
    strokeStyle: 'orange',
    limitStickTravel: true,
    stickRadius: 100,
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

setInterval(sendJoysticksData, 1000);


function sendJoysticksData() {
    let joysticksData = getJoysticksData();
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'api/sticksInput');
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xmlHttp.send(JSON.stringify(joysticksData));
}

function getJoysticksData() {
    return {
        leftStick: -leftJoystick.deltaY(),
        rightStick: -rightJoystick.deltaY()
    }
}
