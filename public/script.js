function onClick() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'api/sticksInput');
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send('{"name":"Mitko"}');
}