<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test Page</title>
    <link href="stylesheet.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="script.js"></script>
</head>
<body onload="homeScript()">

<div id="header"></div>

<div id="header-container">
    <div id="navigation">
        <div id="logo-div">
            <img src="images/logo.png" width="40" height="40">
            <h2>Sitename</h2>
        </div>
        <div class="navdiv">
            <ul class="navbar">
                <li><a onclick="homeScript()">Home</a></li>
                <li><a onclick="recommendationsScript()">Recommendations</a></li>
                <li><a href="/profile.html">Profile</a></li>
                <li><a href="/rest/advanced-search">Advanced Search</a></li>
            </ul>
            <ul class="navbar" id="logbar">
                <li><a id="sign-up" onclick="signUpShow('show')">Sign up</a></li>
                <li><a id="login-button" onclick="loginShow('show')">Log in</a></li>
            </ul>
        </div>

    </div>
</div>

<div class="main">
    <h1 id="headerLine"></h1>
    <div id="resultTableDiv">
        <table id="resultTable">
            <tr>
                <td>artistName</td>
                <td>title</td>
                <td>year</td>
                <td>description</td>
                <td>img</td>
            </tr>
        </table>
    </div>
    <p id="login-message"></p>

    <form id="login-form" action='/login' method='POST'>
        <table>
            <tr><td>Username:</td><td><input type='text' id='loginUsername' required></td></tr>
            <tr><td>Password:</td><td><input type='password' id='loginPassword' required/></td></tr>
        </table>
        <input name="submit" type="button" value="Log In" onclick="loginShow('hide'), auth_user()"/>
        <input name="close" type="button" value="Close" onclick="loginShow('hide')"/>
    </form>

    <form action="/logout" method="POST">
        <input type="submit" value="Sign Out"/>
    </form>

    <form id="sign-up-form">
        <table>
            <tr><td>Username:</td><td><input type='text' id='username'></td></tr>
            <tr><td>E-mail:</td><td><input type='text' id='email'/></td></tr>
            <tr><td>Confirm E-mail:</td><td><input type='text' id='confirmEmail'/></td></tr>
            <tr><td>Password:</td><td><input type='password' id='password'/></td></tr>
            <tr><td>Confirm Password:</td><td><input type='password' id='confirmPassword'/></td></tr>
        </table>
        <input name="submit" type="button" value="Sign Up" onclick="signUp(),loginShow('hide')"/>
        <input name="close" type="button" value="Close" onclick="loginShow('hide')"/>
    </form>

</div>


</body>
</html>