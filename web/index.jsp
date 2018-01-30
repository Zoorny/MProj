<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test Page</title>
    <link href="stylesheet.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="script.js"></script>
</head>
<body onload="initTable(), homeScript()">

<div id="header"></div>

<div id="header-container">
    <div id="navigation">
        <div id="logo-div">
            <img src="images/logo.png" width="40" height="40">
            <h2>Sitename</h2>
        </div>
        <div class="navdiv">
            <ul class="navbar">
                <li><a href="/index.jsp">Home</a></li>
                <li><a onclick="initTable(), recommendationsScript()">Recommendations</a></li>
                <li><a href="/profile.html">Profile</a></li>
                <li><a href="/rest/advanced-search">Advanced Search</a></li>
            </ul>
            <ul class="navbar" id="logbar">
                <li><a id="sign-up" href="/rest/sign-up">Sign up</a></li>
                <li><a id="login-button" onclick="loginShow('show')">Log in</a></li>
            </ul>
        </div>

    </div>
</div>

<div class="main">
    <h1 id="headerLine">New Releases</h1>
    <div id="resultTableDiv">
        <table id="resultTable"></table>
    </div>

    <form name='f' id="login-form" action='/login' method='POST'>
        <label>Log in</label><br/>
        <table>
            <tr><td>User:</td><td><input type='text' name='username'></td></tr>
            <tr><td>Password:</td><td><input type='password' name='password'/></td></tr>
        </table>
        <input name="submit" type="submit" value="Log in" onsubmit="loginShow('hide')"/>
        <input name="close" type="button" value="Close" onclick="loginShow('hide')"/>
    </form>

</div>




</body>
</html>