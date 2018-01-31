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
/*if ((document.getElementById("username") != null) &&(document.getElementById("password") != null)){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var requestHeaderAuth = ("Authorization" + "Basic " + btoa(username + ":" + password));
}*/


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
            document.getElementById("resultTableDiv").style.display = 'inline';
            document.getElementById("headerLine").style.display = 'inline';
            document.getElementById("headerLine").innerHTML = "New Releases";



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
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        xmlHttp.open("GET", "rest/album/", true);
        //xmlHttp.setRequestHeader(requestHeaderAuth);
        xmlHttp.onreadystatechange  = recommendationsResponse();
        xmlHttp.send(null);
    }else {
        setTimeout('recommendationsScript()',1000);
    }
}
function recommendationsResponse() {

    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            hideElements();
            clearTable();
            document.getElementById("headerLine").innerHTML = "Recommendations";
            document.getElementById("headerLine").style.display = 'inline';
            document.getElementById("resultTableDiv").style.display = 'inline';
            var resp = JSON.parse(xmlHttp.responseText);


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
function signUpResponse(){}


function profileScript() {
    
}

function signUpShow(showhide) {
    if(showhide== 'show'){
        hideElements();
        document.getElementById("headerLine").style.display = 'inline';
        document.getElementById("headerLine").innerHTML = "Sign Up";
        document.getElementById("sign-up-form").style.display = 'block';
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

function fillTable(resp) {
    var table = document.getElementById("resultTable");
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
        document.getElementById("headerLine").style.display = 'inline';
        document.getElementById("headerLine").innerHTML = "Log In";
        document.getElementById("login-form").style.display = 'block';
    }

    else {
        document.getElementById("login-form").style.display = 'none';
    }
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
    document.getElementById("login-form").style.display = 'none';
    document.getElementById("resultTableDiv").style.display = 'none';
    document.getElementById("headerLine").style.display = 'none';
    document.getElementById("sign-up-form").style.display = 'none';
    document.getElementById("login-message").style.display = 'none';
}

function auth_user() {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        var username = document.getElementById("loginUsername").value;
        var password = document.getElementById("loginPassword").value;
        console.log(username);
        console.log(password);
        var body = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
        xmlHttp.open("POST", url + "login", true);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //xmlHttp.withCredentials = true;
        //xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        xmlHttp.onreadystatechange  = ok();
        xmlHttp.send(body);
    }
    else setTimeout('auth_user()',1000);
}
function ok() {
    var text = document.getElementById("login-message");
    var regButton = document.getElementById("sign-up");
    var logButton = document.getElementById("login-button");
    if(xmlHttp.status == 200){
        text.innerHTML = xmlHttp.responseText;
        text.style.display = "block";
        regButton.innerHTML = "Username";
        regButton.setAttribute("onclick", "");
        logButton.innerHTML = "Log out";
        logButton.setAttribute("onclick", "")

    }

    else if(xmlHttp.status == 401){
        text.innerHTML = xmlHttp.responseText;
        text.style.display = "block";
    }

    else setTimeout('ok()',1000);
}





