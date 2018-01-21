<%--
  Created by IntelliJ IDEA.
  User: Zoorny
  Date: 19.01.2018
  Time: 17:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>JavaScript Rest Client</title>
    <link href="styles.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="script.js"></script>
  </head>

  <body onload="initTable()">
  <h3 class="headLabel">Simple table</h3>
<div class="inputContainer">
  <input type="number" class="inputField" id="artistId" />
  <input type="button" class="buttonArtist" value="GetById" onClick="getArtist()"/>
</div>

  <br/>
  <table id="resultTable" class = "artistTable">
  </table>

  </body>
</html>
