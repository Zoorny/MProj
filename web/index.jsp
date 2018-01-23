<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test Page</title>
    <link href="stylesheet.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="script.js"></script>
    <script type="text/javascript" src="login.js"></script>
</head>
<body onload="initTable(), getNew()">

<div id="header"></div>

<div id="header-container">
    <div id="navigation">
        <div id="logo-div">
            <img src="images/logo.png" width="40" height="40">
            <h2>Sitename</h2>
        </div>
        <div class="navdiv">
            <ul class="navbar">
                <li onclick="getNew()"><a>Home</a></li>
                <li><a href="/rest/recommendations">Recommendations</a></li>
                <li><a href="/rest/profile">Profile</a></li>
                <li><a href="/rest/advanced-search">Advanced Search</a></li>
            </ul>
            <ul class="navbar" id="logbar">
                <li><a href="/rest/sign-up">Sign up</a></li>
                <li><a onclick="loginScript('show')">Log in</a></li>
            </ul>
        </div>

    </div>
</div>

<div class="main">
    <h1>New Releases</h1>
    <table id="resultTable"></table>
    <div id="popupbox">
        <form name="login" action="" method="post">
            <fieldset>
                <label for="username">Username:</label>
                <input name="username" id="username" size="14" />
                <br/>
                <label for="password">Password:</label>
                <input name="password" type="password" id="password" size="14" />
                <div>
                    <input type="button" name="login" value="login"/>
                    <input type="button" name="close" value="close" onclick="loginScript('hide')"/>
                </div>
            </fieldset>
        </form>
    </div>
</div>

</body>
</html>