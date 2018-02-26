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
var url = "http://localhost:8081/";

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
        xmlHttp.onreadystatechange  = homeServerResponse();
        xmlHttp.send(null);
    }else {
        setTimeout('homeScript()',1000);
    }
}
function homeServerResponse() {

    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var response = JSON.parse(xmlHttp.responseText);
            var table = document.getElementById("resultTable");
            clearTable(table);
            hideElements();
            document.getElementById("homeDiv").style.display = 'inline';
            if (isNaN(response.length)){
                var resp = [response];
            } else resp = response;

            for (var i = 0; i < resp.length; i++) {

                var trelem = document.createElement('tr');
                var tdelem1 = document.createElement('td');
                var tdelem2 = document.createElement('td');
                var tdelem3 = document.createElement('td');
                var tdelem4 = document.createElement('td');
                var tdelem5 = document.createElement('td');
                var tdelem6 = document.createElement('td');
                var tdelem7 = document.createElement('td');
                var image = document.createElement('img');
                image.src = "images/" + resp[i].id +".jpg";
                image.width = 200;
                image.heigh = 200;

                var artist = resp[i].artistName;
                var album = resp[i].title;

                var refElement1 = document.createElement('a');
                refElement1.setAttribute('class', 'tableRef');
                refElement1.innerHTML = artist;
                refElement1.value = resp[i].artistId;
                refElement1.setAttribute('onclick', 'getArtist(this.value)');
                tdelem1.appendChild(refElement1);

                var refElement2 = document.createElement('a');
                refElement2.setAttribute('class', 'tableRef');
                refElement2.innerHTML = album;
                refElement2.value = resp[i].id;
                refElement2.setAttribute('onclick', 'getAlbum(this.value)');
                tdelem2.appendChild(refElement2);

                tdelem3.innerHTML = "<a>" + resp[i].year +"</a>";
                tdelem4.innerHTML = "<a>" + resp[i].description +"</a>";
                tdelem5.appendChild(image);
                tdelem6.innerHTML = "<a>" + resp[i].rating +"</a>";
                tdelem7.innerHTML = "<a>" + resp[i].genre +"</a>";

                trelem.appendChild(tdelem1);
                trelem.appendChild(tdelem2);
                trelem.appendChild(tdelem3);
                trelem.appendChild(tdelem4);
                trelem.appendChild(tdelem5);
                trelem.appendChild(tdelem6);
                trelem.appendChild(tdelem7);
                table.appendChild(trelem);

            }
        }
    }else setTimeout('homeServerResponse()',1000);
}

function getArtist(id) {
    hideElements();
    document.getElementById("artistDiv").style.display = 'inline';
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        xmlHttp.open("GET", "rest/artist/" + id, true);
        xmlHttp.onreadystatechange  = artistServerResponse();
        xmlHttp.send(null);
    }else {
        setTimeout('getArtist(id)',1000);
    }
}
function artistServerResponse() {

    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var resp = JSON.parse(xmlHttp.responseText);
            document.getElementById("artistName").innerHTML = resp.name;
            document.getElementById("artistDescription").innerHTML = resp.description;
            var table = document.getElementById("discographyTable");
            clearTable(table);
            for (var i = 0; i < resp.albums.length; i++) {

                var trelem = document.createElement('tr');
                var tdelem1 = document.createElement('td');
                var tdelem2 = document.createElement('td');
                var tdelem3 = document.createElement('td');
                var tdelem4 = document.createElement('td');
                var image = document.createElement('img');
                image.src = "images/" + resp.albums[i].id +".jpg";
                image.width = 100;
                image.heigh = 100;

                var album = resp.albums[i].title;

                tdelem1.appendChild(image);
                tdelem2.innerHTML = resp.albums[i].year;

                var refElement3 = document.createElement('a');
                refElement3.setAttribute('class', 'tableRef');
                refElement3.innerHTML = album;
                refElement3.value = resp.albums[i].id;
                refElement3.setAttribute('onclick', 'getAlbum(this.value)');
                tdelem3.appendChild(refElement3);

                tdelem4.innerHTML = resp.albums[i].rating;

                trelem.appendChild(tdelem1);
                trelem.appendChild(tdelem2);
                trelem.appendChild(tdelem3);
                trelem.appendChild(tdelem4);

                table.appendChild(trelem);

            }

        }
    }else setTimeout('artistServerResponse()',1000);
}

function getAlbum(id) {
    hideElements();
    document.getElementById("albumDiv").style.display = 'inline';
    var loggedIn = getCookie("logged_in");
    if(loggedIn!='true'){
        document.getElementById('setRating').style.display='none';
        document.getElementById('submitReview').style.display='none';
        document.getElementById('yourReview').style.display='none';
    } else {
        getUserRating(id);
        getUserReview(id);
        document.getElementById('setRating').style.display='inline';
    }
    getReviews(id);
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        xmlHttp.open("GET", "rest/album/" + id, true);
        xmlHttp.onreadystatechange  = albumServerResponse();
        xmlHttp.send(null);
    }
}
function albumServerResponse() {

    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var resp = JSON.parse(xmlHttp.responseText);
            var table = document.getElementById("songsTable");
            clearTable(table);
            document.getElementById("albumTitle").innerHTML = resp.title;
            document.getElementById("setRating").value = resp.id;
            document.getElementById("albumGenre").innerHTML = resp.genre;
            var artist = document.getElementById("performer");
            artist.innerHTML = resp.artistName;
            artist.value = resp.artistId;
            artist.setAttribute('onclick', 'getArtist(this.value)');
            document.getElementById("albumYear").innerHTML = resp.year;
            document.getElementById("albumDescription").innerHTML = resp.description;
            var image = document.getElementById('albumImage');
            image.src = "images/" + resp.id +".jpg";
            image.width = 200;
            image.heigh = 200;
            getTotalRating(resp.id);
            for (var i = 0; i < resp.songs.length; i++) {

                var trelem = document.createElement('tr');
                var tdelem1 = document.createElement('td');
                var tdelem2 = document.createElement('td');
                var tdelem3 = document.createElement('td');
                var tdelem4 = document.createElement('td');

                tdelem1.innerHTML = i + 1;
                tdelem2.innerHTML = resp.songs[i].title;
                tdelem3.innerHTML = resp.artistName;
                tdelem4.innerHTML = timeConvert(resp.songs[i].duration);


                trelem.appendChild(tdelem1);
                trelem.appendChild(tdelem2);
                trelem.appendChild(tdelem3);
                trelem.appendChild(tdelem4);
                table.appendChild(trelem);

            }

        }
    }else setTimeout('albumServerResponse()',1000);
}

//Rating System
function getUserRating(id) {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
        var username = getCookie("username");
        xmlHttp.open("GET", "rest/rating/" + id +'/' + username, false);
        xmlHttp.onreadystatechange  = function(){
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    if(xmlHttp.responseText != "empty"){
                        var resp = JSON.parse(xmlHttp.responseText);
                        document.getElementById('ratingSelect').value = resp;
                    }else document.getElementById('ratingSelect').value = defaultStatus;


                }
            }
        };
        xmlHttp.send(null);
    }else {
        setTimeout('getUserRating(id)',1000);
    }

}
function setRating() {
    var rating =  document.getElementById("ratingSelect").value;
    var album =  document.getElementById("setRating").value;
    var username = getCookie("username");

    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        xmlHttp.open("POST", "rest/rating/", true);
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.onreadystatechange  = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    getTotalRating(album);
                }
            }
        };
        var data = JSON.stringify({"albumId": album, "username": username, "rating": rating});
        xmlHttp.send(data);
    }else {
        setTimeout('setRating()',1000);
    }
}
function getTotalRating(id) {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
        xmlHttp.open("GET", "rest/rating/total/" + id, false);
        xmlHttp.onreadystatechange  = function(){
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    if(xmlHttp.responseText != "empty"){
                        var resp = JSON.parse(xmlHttp.responseText);
                        document.getElementById('totalRating').innerHTML = resp;
                    }else document.getElementById('totalRating').innerHTML = "n/a";


                }
            }
        };
        xmlHttp.send(null);
    }else {
        setTimeout('getTotalRating(id)',1000);
    }
}


function recommendationsScript() {
    hideElements();
    var table = document.getElementById("recommendationsResultTable");
    clearTable(table);
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

        xmlHttp.open("GET", "rest/recommendations/" + username, true);

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

            var response = JSON.parse(xmlHttp.responseText);
            if (isNaN(response.length)){
                var resp = [response];
            } else resp = response;

            for (var i = 0; i < resp.length; i++) {
                var table = document.getElementById("recommendationsResultTable");
                var trelem = document.createElement('tr');
                var tdelem1 = document.createElement('td');
                var tdelem2 = document.createElement('td');
                var tdelem3 = document.createElement('td');
                var tdelem4 = document.createElement('td');
                var tdelem5 = document.createElement('td');
                var tdelem6 = document.createElement('td');
                var tdelem7 = document.createElement('td');
                var image = document.createElement('img');
                image.src = "images/" + resp[i].id +".jpg";
                image.width = 200;
                image.heigh = 200;

                var artist = resp[i].artistName;
                var album = resp[i].title;


                var refElement1 = document.createElement('a');
                refElement1.innerHTML = artist;
                refElement1.setAttribute('class', 'tableRef');
                refElement1.value = resp[i].artistId;
                refElement1.setAttribute('onclick', 'getArtist(this.value)');
                tdelem1.appendChild(refElement1);

                var refElement2 = document.createElement('a');
                refElement2.setAttribute('class', 'tableRef');
                refElement2.innerHTML = album;
                refElement2.value = resp[i].id;
                refElement2.setAttribute('onclick', 'getAlbum(this.value)');
                tdelem2.appendChild(refElement2);

                tdelem3.innerHTML = resp[i].year;
                tdelem4.innerHTML = resp[i].description;
                tdelem5.appendChild(image);
                tdelem6.innerHTML = resp[i].rating;
                tdelem7.innerHTML = resp[i].genre;

                trelem.appendChild(tdelem1);
                trelem.appendChild(tdelem2);
                trelem.appendChild(tdelem3);
                trelem.appendChild(tdelem4);
                trelem.appendChild(tdelem5);
                trelem.appendChild(tdelem6);
                trelem.appendChild(tdelem7);
                table.appendChild(trelem);

            }
        }

    }else setTimeout('recommendationsResponse()',1000);
}

//Authorization
function signUpShow(showhide) {
    if(showhide== 'show'){
        hideElements();
        document.getElementById("signUpDiv").style.display = 'inline';
        document.getElementById("sign-up-form").style.display = 'block';
        document.getElementById("signUpMessage").style.display = 'none';
    }

    else {
        document.getElementById("sign-up-form").style.display = 'none';
    }
}
function loginShow(showhide) {
    if(showhide== 'show'){
        hideElements();
        document.getElementById("loginDiv").style.display = 'inline';
        document.getElementById("login-form").style.display = 'block';

    }
}
function signUp() {
    if((validation()) && (xmlHttp.readyState==0 || xmlHttp.readyState==4)){

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var email = document.getElementById("email").value;

        xmlHttp.open("POST", "rest/register/", true);
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.onreadystatechange  = signUpResponse();
        var data = JSON.stringify({"username": username, "password": password, "email": email});
        xmlHttp.send(data);
    }

}
function signUpResponse(){
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 201) {
            var username = document.getElementById("username").value;
            document.getElementById("username").value = '';
            document.getElementById("email").value = '';
            document.getElementById("confirmEmail").value = '';
            document.getElementById("password").value = '';
            document.getElementById("confirmPassword").value = '';
            document.getElementById("signUpMessage").innerHTML = 'Welcome ' + username + '!';
            document.getElementById("sign-up-form").style.display = 'none';
            document.getElementById("signUpMessage").style.display = 'inline';
        }
        else if(xmlHttp.status == 200){
            document.getElementById("signUpMessage").innerHTML = 'User already exists.';
            document.getElementById("signUpMessage").style.display = 'inline';
            document.getElementById("signUpMessage").style.color = 'red';
        }
    }else setTimeout('signUpResponse()', 1000);
}
function auth_user() {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        var username = document.getElementById("loginUsername").value;
        var password = document.getElementById("loginPassword").value;
        var body = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
        xmlHttp.open("POST", url + "login", true);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
/*        xmlHttp.withCredentials = true;
        xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));*/
        xmlHttp.onreadystatechange  = auth_ok();
        xmlHttp.send(body);
    }
    else setTimeout('auth_user()',1000);
}
function auth_ok() {
    var text = document.getElementById("login-message");


    if(xmlHttp.status == 200){
        var username = document.getElementById("loginUsername").value;
        var password = document.getElementById("loginPassword").value;
        setCookie("username", username, 3600);
        setCookie("password", password, 3600);
        setCookie("logged_in", true, 3600);
        loginShow('hide');
        document.getElementById("login-form").style.display = 'none';
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
            if (xmlHttp.readyState==4){
                deleteCookie("username");
                deleteCookie("password");
                deleteCookie("logged_in");

                var regButton = document.getElementById("sign-up");
                var logButton = document.getElementById("login-button");
                document.getElementById("login-message").style.display = 'none';
                document.getElementById("login-form").style.display = 'block';
                regButton.innerHTML = "Sign up";
                regButton.setAttribute("onclick", "signUpShow('show')");
                logButton.innerHTML = "Log in";
                logButton.setAttribute("onclick","loginShow('show')");
                window.location.reload(false);
            }
        };
        xmlHttp.send(null);
    }
    else setTimeout('logout()',1000);
}

function advSearchScript() {
    hideElements();
    document.getElementById("advSearchDiv").style.display = 'block';
}
function advancedSearchRequest() {
    var minDate = document.getElementById("start-year").value;
    var maxDate = document.getElementById("end-year").value;
    var minRating = document.getElementById("min-rating").value;
    var maxRating = document.getElementById("max-rating").value;
    var artist = document.getElementById("artist").value;

    if(minDate =="") minDate = 1;
    if(maxDate =="") maxDate = 10000;
    if(minRating =="") minRating = 0;
    if(maxRating =="") maxRating = 0;

    var genres = [];
    var cboxes = document.getElementsByClassName('genre');
    var j =0;
    for (var i=0; i<cboxes.length; i++) {

            if(cboxes[i].checked == true){
                genres[j] = cboxes[i].value;
                j++;
            }
    }


    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        xmlHttp.open("POST", "rest/album/search", true);
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.onreadystatechange  = advancedSearchServerResponse();
        var data = JSON.stringify({"artistName":artist ,"genres": genres, "minDate": minDate, "maxDate": maxDate, "minRating": minRating, "maxRating":maxRating});
        xmlHttp.send(data);
    }else {
        setTimeout('advancedSearchRequest()',1000);
    }

}
function advancedSearchServerResponse() {
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var response = JSON.parse(xmlHttp.responseText);
            var table = document.getElementById("advancedSearchResultTable");
            clearTable(table);

            if (isNaN(response.length)){
                var resp = [response];
            } else resp = response;

            for (var i = 0; i < resp.length; i++) {

                var trelem = document.createElement('tr');
                var image = document.createElement('img');
                var tdelem0 = document.createElement('td');
                var tdelem1 = document.createElement('td');
                var tdelem2 = document.createElement('td');
                var tdelem3 = document.createElement('td');
                var tdelem4 = document.createElement('td');



                image.src = "images/" + resp[i].id +".jpg";
                image.width = 100;
                image.heigh = 100;

                var artist = resp[i].artistName;
                var album = resp[i].title;


                var refElement1 = document.createElement('a');
                refElement1.setAttribute('class', 'tableRef');
                refElement1.innerHTML = artist;
                refElement1.value = resp[i].artistId;
                refElement1.setAttribute('onclick', 'getArtist(this.value)');
                tdelem2.appendChild(refElement1);

                var refElement2 = document.createElement('a');
                refElement2.setAttribute('class', 'tableRef');
                refElement2.innerHTML = album;
                refElement2.value = resp[i].id;
                refElement2.setAttribute('onclick', 'getAlbum(this.value)');
                tdelem3.appendChild(refElement2);

                tdelem1.innerHTML = "<a>" + resp[i].year +"</a>";
                tdelem0.appendChild(image);
                tdelem4.innerHTML = "<a>" + resp[i].rating +"</a>";

                trelem.appendChild(tdelem0);
                trelem.appendChild(tdelem1);
                trelem.appendChild(tdelem2);
                trelem.appendChild(tdelem3);
                trelem.appendChild(tdelem4);
                table.appendChild(trelem);

            }
        }
    }else setTimeout('advancedSearchServerResponse()',1000);
}

function createReview() {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        var text = document.getElementById("user-review").value;
        document.getElementById("user-review").value = "";
        if (text == "") return;
        var username = getCookie("username");
        var albumId = document.getElementById("setRating").value;
        var rating = document.getElementById("ratingSelect").value;
        console.log(albumId);
        var date = new Date();

        xmlHttp.open("POST", "rest/review/", true);
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.onreadystatechange  = function(){
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 201) {
                    document.getElementById("submitReview").style.display='none';
                    getUserReview(albumId);
                }
            }
        };
        var data = JSON.stringify({"username": username,"albumId": albumId, "text": text, "date": date, "rating":rating});
        xmlHttp.send(data);
    }
}
function getUserReview(id) {
    if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
        var username = getCookie("username");
        xmlHttp.open("GET", "rest/review/" + id + '/' + username, false);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    var resp = JSON.parse(xmlHttp.responseText);
                    document.getElementById("yourUsername").innerHTML = resp.username;
                    document.getElementById("yourDate").innerHTML = resp.date;
                    document.getElementById("yourDate").innerHTML = resp.date;
                    document.getElementById("yourRating").innerHTML = resp.rating + "/10";
                    document.getElementById("yourText").innerHTML = resp.text;
                    document.getElementById("yourReview").style.display = 'block';
                    document.getElementById("submitReview").style.display = 'none';
                    }
                else if (xmlHttp.status == 204){
                    document.getElementById("yourReview").style.display = 'none';
                    document.getElementById("submitReview").style.display = 'block';
                }
            }
        };
        xmlHttp.send(null);
    }

}
function getReviews(id) {
    if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
        xmlHttp.open("GET", "rest/review/" + id, false);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    var response = JSON.parse(xmlHttp.responseText);
                    var reviewContainer = document.getElementById("userReviews");
                    if (isNaN(response.length)){
                        var resp = [response];
                    } else resp = response;
                    while(reviewContainer.hasChildNodes())
                    {
                        reviewContainer.removeChild(reviewContainer.lastChild);
                    }
                    for (var i = 0; i < resp.length; i++){
                        var div = document.createElement('div');
                        div.innerHTML = "<div class='review'><p class='reviewUsername'>" + resp[i].username +"</p>\n" +
                            "<p>" + resp[i].date +"</p>\n" +
                            "<p>" + resp[i].rating +"/10</p>\n" +
                            "<p>" + resp[i].text +"</p>\n</div>";
                        reviewContainer.appendChild(div);
                    }
                }
                else if (xmlHttp.status == 204){
                    document.getElementById("userReviews").style.display = 'none';
                }
            }
        };
        xmlHttp.send(null);
    }
}
function getReviewsProfile(username) {
    if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
        xmlHttp.open("GET", "rest/review/profile/" + username, false);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    var response = JSON.parse(xmlHttp.responseText);
                    var reviewContainer = document.getElementById("profileReviews");
                    if (isNaN(response.length)){
                        var resp = [response];
                    } else resp = response;
                    while(reviewContainer.hasChildNodes())
                    {
                        reviewContainer.removeChild(reviewContainer.lastChild);
                    }
                    for (var i = 0; i < resp.length; i++){
                        var div = document.createElement('div');
                        div.innerHTML = "<div class='review'><p class='reviewUsername'>" + resp[i].albumName + " by " + resp[i].artistName +"</p>\n" +
                            "<p>" + resp[i].date +"</p>\n" +
                            "<p>" + resp[i].rating +"/10</p>\n" +
                            "<p>" + resp[i].text +"</p>\n</div>";
                        reviewContainer.appendChild(div);
                    }
                }
                else if (xmlHttp.status == 204){
                    document.getElementById("profileReviews").style.display = 'none';
                }
            }
        };
        xmlHttp.send(null);
    }
}

function clearTable(table) {
    while(table.hasChildNodes() && table.rows.length >1)
    {
        table.removeChild(table.lastChild);
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
            getReviewsProfile(resp.username);

        }
    }else setTimeout('profileServerResponse()',1000);
}

//For later
function validation() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var confirmEmail = document.getElementById("confirmEmail").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if((username.length == 0) || (email.length==0) || (confirmEmail.length == 0) || (password.length == 0) || (confirmPassword.length==0)){
        console.log('Empty Fields?');
        alert('EMTYY!');
        return false;
    }
    if(allLetter(username)){
        if(passwordValidation(password,3,10)){
            if(validateEmail(email)){
                if(email == confirmEmail && password == confirmPassword){
                    return true;
                }
                else{
                    alert('not equal confirm fields!!');
                    return false;
                }
            }
        }
    }

    return false;
}

function allLetter(username) {
    var letters = /^[A-Za-z]+$/;
    if(username.match(letters))
    {
        return true;
    }
    else
    {
        alert('Username must have alphabet characters only');
        return false;
    }
}
function passwordValidation(pass,minP,maxP) {
    var passLength = pass.length;
    if (passLength == 0 ||passLength >= maxP || passLength < minP)
    {
        alert("Password should not be empty / length be between "+minP+" to "+maxP);
        return false;
    }
    return true;
}
function validateEmail(uemail){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(uemail.match(mailformat))
    {
        return true;
    }
    else
    {
        alert("You have entered an invalid email address!");
        return false;
    }
}

function hideElements() {
    document.getElementById("loginDiv").style.display = 'none';
    document.getElementById("homeDiv").style.display = 'none';
    document.getElementById("advSearchDiv").style.display = 'none';
    document.getElementById("signUpDiv").style.display = 'none';
    document.getElementById("recommendationsDiv").style.display = 'none';
    document.getElementById("profileDiv").style.display = 'none';
    document.getElementById("artistDiv").style.display = 'none';
    document.getElementById("albumDiv").style.display = 'none';
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

//time conversion from seconds
function timeConvert(time){
    return num(Math.floor(time/60)) + ':' + num(time%60);
}
function num(val){
    val = Math.floor(val);
    return val < 10 ? '0' + val : val;
}



