var xmlHttp = createXmlHttpRequestObject();
function createXmlHttpRequestObject() {
    var xmlHttp;

    if(window.ActiveXObject){
        try{
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }catch (e){
            xmlHttp = false;
        }
    }else{
        try{
            xmlHttp = new XMLHttpRequest();
        }catch (e){
            xmlHttp = false;
        }
    }

    if(!xmlHttp){
        alert("can't create object")
    }else
        return xmlHttp;
}
var url = "http://localhost:8081/"

function initializePage() {
    var loggedIn = getCookie("logged_in");
    if (loggedIn!=null)
    {
        var username = getCookie("username");

        var regButton = document.getElementById("sign-up");
        var logButton = document.getElementById("login-button");
        regButton.innerHTML = username;
        regButton.setAttribute("onclick", "");
        logButton.innerHTML = "Log out";
        logButton.setAttribute("onclick", "logout()");
    }
}

function homeScript() {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){


        xmlHttp.open("GET", "rest/album/", true);
        //xmlHttp.setRequestHeader(requestHeaderAuth);
        xmlHttp.onreadystatechange  = homeServerResponse();
        xmlHttp.send(null);
    }else {
        setTimeout('homeScript()',1000);
    }
}
function homeServerResponse() {

    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var resp = JSON.parse(xmlHttp.responseText);
            clearTable();
            hideElements();
            document.getElementById("homeDiv").style.display = 'inline';


            if (!isNaN(resp.length))for (var i = 0; i < resp.length; i++) {
                var table = document.getElementById("resultTable");
                var trelem = document.createElement('tr');
                var tdelem1 = document.createElement('td');
                var tdelem2 = document.createElement('td');
                var tdelem3 = document.createElement('td');
                var tdelem4 = document.createElement('td');
                var tdelem5 = document.createElement('td');
                var image = document.createElement('img');
                image.src = "images/" + resp[i].id +".jpg";
                image.width = 200;
                image.heigh = 200;

                tdelem1.innerHTML = resp[i].artistName;
                tdelem2.innerHTML = resp[i].title;
                tdelem3.innerHTML = resp[i].year;
                tdelem4.innerHTML = resp[i].description;
                tdelem5.appendChild(image);

                trelem.appendChild(tdelem1);
                trelem.appendChild(tdelem2);
                trelem.appendChild(tdelem3);
                trelem.appendChild(tdelem4);
                trelem.appendChild(tdelem5);
                table.appendChild(trelem);

            }else {
                fillTable(resp);
            }
        }
    }else setTimeout('homeServerResponse()',1000);
}

function recommendationsScript() {
    hideElements();
    recommendationsClearTable();
    document.getElementById("recommendationsDiv").style.display = 'inline';
    document.getElementById("recommendationsResultTableDiv").style.display='none';
    var loggedIn = getCookie("logged_in");
    if(loggedIn!='true'){
        document.getElementById("loginReq").style.display='inline';
        return;
    }
    document.getElementById("recommendationsResultTableDiv").style.display='inline';
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        var username = getCookie("username");
        var password = getCookie("password");

        xmlHttp.open("GET", "rest/recommendations/", true);
        //xmlHttp.setRequestHeader(requestHeaderAuth);
        //var body = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
        //xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttp.withCredentials = true;
        xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        xmlHttp.onreadystatechange  = recommendationsResponse();
        xmlHttp.send(null);
    }else {
        setTimeout('recommendationsScript()',1000);
    }
}
function recommendationsResponse() {
    document.getElementById("loginReq").style.display='none';
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {

            var resp = JSON.parse(xmlHttp.responseText);


            if (!isNaN(resp.length))for (var i = 0; i < resp.length; i++) {
                var table = document.getElementById("recommendationsResultTable");
                var trelem = document.createElement('tr');
                var tdelem1 = document.createElement('td');
                var tdelem2 = document.createElement('td');
                var tdelem3 = document.createElement('td');
                var tdelem4 = document.createElement('td');
                var tdelem5 = document.createElement('td');
                var image = document.createElement('img');
                image.src = "images/" + resp[i].id +".jpg";
                image.width = 200;
                image.heigh = 200;
                tdelem1.innerHTML = resp[i].artistName;
                tdelem2.innerHTML = resp[i].title;
                tdelem3.innerHTML = resp[i].year;
                tdelem4.innerHTML = resp[i].description;
                tdelem5.appendChild(image);

                trelem.appendChild(tdelem1);
                trelem.appendChild(tdelem2);
                trelem.appendChild(tdelem3);
                trelem.appendChild(tdelem4);
                trelem.appendChild(tdelem5);
                table.appendChild(trelem);

            }else {
                fillTable(resp);
            }
        }

    }else setTimeout('recommendationsResponse()',1000);
}

function signUp() {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var email = document.getElementById("email").value;

        xmlHttp.open("POST", "rest/register/", true);
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.onreadystatechange  = signUpResponse();
        var data = JSON.stringify({"username": username, "password": password, "email": email});
        xmlHttp.send(data);
    }else {
        setTimeout('signUp()',1000);
    }

}
function signUpResponse(){
}

function advSearchScript() {
    hideElements();
    document.getElementById("advSearchDiv").style.display = 'block';
}


function profileScript() {
    
}

function signUpShow(showhide) {
    if(showhide== 'show'){
        hideElements();
        document.getElementById("signUpDiv").style.display = 'inline';
    }

    else {
        document.getElementById("sign-up-form").style.display = 'none';
    }
}

function clearTable() {
    var table = document.getElementById("resultTable");
    while(table.hasChildNodes() && table.rows.length >1)
    {
        table.removeChild(table.lastChild);
    }
}
function recommendationsClearTable() {
    var table = document.getElementById("recommendationsResultTable");
    while(table.hasChildNodes() && table.rows.length >1)
    {
        table.removeChild(table.lastChild);
    }
}

function fillTable(resp) {
    var table = document.getElementById("recommendationsResultTable");
    var trelem = document.createElement('tr');
    var tdelem1 = document.createElement('td');
    var tdelem2 = document.createElement('td');
    var tdelem3 = document.createElement('td');
    var tdelem4 = document.createElement('td');
    var tdelem5 = document.createElement('td');
    tdelem1.innerHTML = resp.artistName;
    tdelem2.innerHTML = resp.title;
    tdelem3.innerHTML = resp.year;
    tdelem4.innerHTML = resp.description;
    tdelem5.innerHTML = resp.description;

    trelem.appendChild(tdelem1);
    trelem.appendChild(tdelem2);
    trelem.appendChild(tdelem3);
    trelem.appendChild(tdelem4);
    trelem.appendChild(tdelem5);
    table.appendChild(trelem);
}

function loginShow(showhide) {
    if(showhide== 'show'){
        hideElements();
        document.getElementById("loginDiv").style.display = 'inline';

    }

    else {
        document.getElementById("login-form").style.display = 'none';
    }
}

function profile() {
    hideElements();
    document.getElementById("profileDiv").style.display = 'inline';
    document.getElementById("profileContent").style.display = 'none';
    var loggedIn = getCookie("logged_in");
    if(loggedIn!='true'){
        document.getElementById("profileReq").style.display='inline';
        return;
    }
    document.getElementById("profileReq").style.display='none';
    document.getElementById("profileContent").style.display = 'inline';
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        var username = getCookie("username");
        xmlHttp.open("GET", "rest/user/" + username, true);
        //xmlHttp.setRequestHeader(requestHeaderAuth);
        xmlHttp.onreadystatechange  = profileServerResponse();
        xmlHttp.send(null);
    }else {
        setTimeout('profile()',1000);
    }
}
function profileServerResponse() {

    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var resp = JSON.parse(xmlHttp.responseText);
            document.getElementById("profile-name").innerHTML = resp.username;
            document.getElementById("profile-email").innerHTML = resp.email;

        }
    }else setTimeout('profileServerResponse()',1000);
}

//For later
function validate() {
    var username = document.getElementsByName("username").value;
    var password = document.getElementsByName("password").value;
    if(username!='' && password!='')
        return true;
    else
        return false;
}

function hideElements() {
    document.getElementById("loginDiv").style.display = 'none';
    document.getElementById("homeDiv").style.display = 'none';
    document.getElementById("advSearchDiv").style.display = 'none';
    document.getElementById("signUpDiv").style.display = 'none';
    document.getElementById("recommendationsDiv").style.display = 'none';
    document.getElementById("profileDiv").style.display = 'none';
}

function auth_user() {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        var username = document.getElementById("loginUsername").value;
        var password = document.getElementById("loginPassword").value;
        var body = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
        setCookie("username", username, 3600);
        setCookie("password", password, 3600);
        xmlHttp.open("POST", url + "login", true);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //xmlHttp.withCredentials = true;
        //xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        xmlHttp.onreadystatechange  = auth_ok();
        xmlHttp.send(body);
    }
    else setTimeout('auth_user()',1000);
}
function auth_ok() {
    var text = document.getElementById("login-message");


    if(xmlHttp.status == 200){
        setCookie("logged_in", true, 3600);
        loginShow('hide');
        initializePage();
        text.innerHTML = xmlHttp.responseText;
        text.style.display = "block";
    }

    else if(xmlHttp.status == 401){
        text.innerHTML = xmlHttp.responseText;
        text.style.display = "block";
    }

    else setTimeout('auth_ok()',1000);
}

function logout() {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        xmlHttp.open("POST", url + "logout", true);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //xmlHttp.withCredentials = true;
        //xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        xmlHttp.onreadystatechange  = function loggedOut(){

            deleteCookie("username");
            deleteCookie("password");
            deleteCookie("logged_in");
            var username = getCookie("username");
            var password = getCookie("password");

            var regButton = document.getElementById("sign-up");
            var logButton = document.getElementById("login-button");
            regButton.innerHTML = "Sign up";
            regButton.setAttribute("onclick", "signUpShow('show')");
            logButton.innerHTML = "Log in";
            logButton.setAttribute("onclick","loginShow('show')");

        };
        xmlHttp.send(null);
    }
    else setTimeout('logout()',1000);
}





//Cookies
function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}


