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
    <script type="text/javascript" src="login.js"></script>
  </head>

  <body onload="initTable()">

    <div class="topContainer">
        <div class="logo-name-container">
            <div class="logo-img"><img src="images/logo.png" alt="logo" /></div>
            <div class="logo-name"><h1>Sitename</h1></div>
        </div>

        <div class="ref">
            <a>Home</a>
            <a>Recommendations</a>
            <a>Profile</a>
            <a>Advanced Search</a>
            <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a>Sign Up</a>
            <a onclick="loginScript('show')">Login</a>
        </div>
    </div>

    <h3 class="headLabel">Simple table</h3>

    <div class="inputContainer">
        <input type="number" class="inputField" id="artistId" />
        <input type="button" class="buttonArtist" value="Get" onClick="getArtist()"/>
    </div>


  <br/>
  <table id="resultTable" class = "artistTable">
  </table>

    <div id="popupbox">
        <form name="login" action="" method="post">
            <center><label for="username">Username:</label></center>
            <center><input name="username" id="username" size="14" /></center>
            <center><label for="password">Password:</label></center>
            <center><input name="password" type="password" id="password" size="14" /></center>
            <center>
                <input type="submit" name="login" value="login" />
                <input type="submit" name="close" value="close" />
            </center>
        </form>
    </div>


  </body>
</html>
