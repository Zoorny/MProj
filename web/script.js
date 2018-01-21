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

function getArtist() {
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){

        var id = encodeURIComponent(document.getElementById("artistId").value);
        clearTable();
        xmlHttp.open("GET", "rest/artist/"+id, true);
        xmlHttp.onreadystatechange  = handleServerResponse();
        xmlHttp.send(null);
    }else {
        setTimeout('getArtist()',1000);
    }
}


function handleServerResponse() {

    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var resp = JSON.parse(xmlHttp.responseText);
            console.log(resp.length);

            if (!isNaN(resp.length))for (var i = 0; i < resp.length; i++) {
                var table = document.getElementById("resultTable");
                var trelem = document.createElement('tr');
                var tdelem1 = document.createElement('td');
                var tdelem2 = document.createElement('td');
                var tdelem3 = document.createElement('td');
                tdelem1.innerHTML = resp[i].id;
                tdelem2.innerHTML = resp[i].name;
                tdelem3.innerHTML = resp[i].description;

                trelem.appendChild(tdelem1);
                trelem.appendChild(tdelem2);
                trelem.appendChild(tdelem3);
                table.appendChild(trelem);

            }else {
                var table = document.getElementById("resultTable");
                var trelem = document.createElement('tr');
                var tdelem1 = document.createElement('td');
                var tdelem2 = document.createElement('td');
                var tdelem3 = document.createElement('td');
                tdelem1.innerHTML = resp.id;
                tdelem2.innerHTML = resp.name;
                tdelem3.innerHTML = resp.description;

                trelem.appendChild(tdelem1);
                trelem.appendChild(tdelem2);
                trelem.appendChild(tdelem3);
                table.appendChild(trelem);
            }
        }
    }else setTimeout('handleServerResponse()',100);
}



function initTable() {

    var table = document.getElementById("resultTable");
    var trelem = document.createElement('tr');
    var tdelem1 = document.createElement('th');
    var tdelem2 = document.createElement('th');
    var tdelem3 = document.createElement('th');
    tdelem1.innerHTML = 'id';
    tdelem2.innerHTML = 'name';
    tdelem3.innerHTML = 'description';
    trelem.appendChild(tdelem1);
    trelem.appendChild(tdelem2);
    trelem.appendChild(tdelem3);
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






