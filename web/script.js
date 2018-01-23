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

function getNew() {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        clearTable();
        xmlHttp.open("GET", "rest/album/", true);
        xmlHttp.onreadystatechange  = handleServerResponse();
        xmlHttp.send(null);
    }else {
        setTimeout('getNew()',1000);
    }
}


function handleServerResponse() {

    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
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
    }else setTimeout('handleServerResponse()',1000);
}



function initTable() {

    var table = document.getElementById("resultTable");
    var trelem = document.createElement('tr');
    var tdelem1 = document.createElement('th');
    var tdelem2 = document.createElement('th');
    var tdelem3 = document.createElement('th');
    var tdelem4 = document.createElement('th');
    var tdelem5 = document.createElement('th');
    tdelem1.innerHTML = 'artistName';
    tdelem2.innerHTML = 'title';
    tdelem3.innerHTML = 'year';
    tdelem4.innerHTML = 'description';
    tdelem5.innerHTML = 'img';
    trelem.appendChild(tdelem1);
    trelem.appendChild(tdelem2);
    trelem.appendChild(tdelem3);
    trelem.appendChild(tdelem4);
    trelem.appendChild(tdelem5);
    table.appendChild(trelem);

}
function clearTable() {
    var table = document.getElementById("resultTable");
    while(table.hasChildNodes())
    {
        table.removeChild(table.firstChild);
    }
    initTable();
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






