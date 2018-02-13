<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test Page</title>
    <link href="stylesheet.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="script.js"></script>
</head>
<body onload="homeScript(), initializePage()">

<div id="header"></div>

<div id="header-container">
    <div id="navigation">
        <div id="logo-div" onclick="homeScript()">
            <img src="images/logo.png" width="40" height="40">
            <h2>Sitename</h2>
        </div>
        <div class="navdiv">
            <ul class="navbar">
                <li><a onclick="homeScript()">Home</a></li>
                <li><a onclick="recommendationsScript()">Recommendations</a></li>
                <li><a onclick="profile()">Profile</a></li>
                <li><a onclick="advSearchScript()">Advanced Search</a></li>
            </ul>
            <ul class="navbar" id="logbar">
                <li><a id="sign-up" onclick="signUpShow('show')">Sign up</a></li>
                <li><a id="login-button" onclick="loginShow('show')">Log in</a></li>
            </ul>
        </div>

    </div>
</div>

<div class="main">

    <div id="homeDiv">
        <h1 id="homeHeader">New Releases</h1>
        <div id="resultTableDiv">
            <table id="resultTable">
                <tr>
                    <td>artistName</td>
                    <td>title</td>
                    <td>year</td>
                    <td>description</td>
                    <td>img</td>
                    <td>rating</td>
                    <td>genre</td>
                </tr>
            </table>
        </div>
    </div>

    <div id="recommendationsDiv">
        <h1 id="recommendationsHeader">Recommendations</h1>
        <p id="loginReq">Log in to see recommendations.</p>
        <div id="recommendationsResultTableDiv">
            <table id="recommendationsResultTable">
                <tr>
                    <td>artistName</td>
                    <td>title</td>
                    <td>year</td>
                    <td>description</td>
                    <td>img</td>
                    <td>rating</td>
                    <td>genre</td>
                </tr>
            </table>
        </div>
    </div>

    <div id="profileDiv">
        <h1>User profile</h1>
        <p id="profileReq">Log in to see profile.</p>
        <div id="profileContent">
            profile-name: <h2 id="profile-name"></h2><br/>
            profile-email: <h2 id="profile-email"></h2>
        </div>


    </div>

    <div id="loginDiv">
        <h1 id="loginHeader">Log In</h1>
        <p id="login-message"></p>
        <form id="login-form" action='/login' method='POST'>
            <table>
                <tr><td>Username:</td><td><input type='text' id='loginUsername' required></td></tr>
                <tr><td>Password:</td><td><input type='password' id='loginPassword' required/></td></tr>
            </table>
            <input name="submit" type="button" value="Log In" onclick="auth_user()"/>
            <input name="close" type="button" value="Close" onclick="loginShow('hide')"/>
        </form>
    </div>

    <div id="signUpDiv">
        <h1 id="signUpHeader">Sign Up</h1>
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

    <div id="advSearchDiv">
        <h1>Advanced Search</h1>
        <div class="sidebar">

            <section class="filter-genres">
                <header><h3>Genres</h3></header>
                <div class="tab-content">
                    <div class="genreOptions">
                        <ul>
                            <li>
                                <input class="genre" type="checkbox" value="Blues" id="blues">
                                <label for="blues">Blues</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="Classical" id="classical">
                                <label for="classical">Classical</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="Country" id="country">
                                <label for="country">Country</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="Electronic" id="electronic">
                                <label for="electronic">Electronic</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="Folk" id="folk">
                                <label for="folk">Folk</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="Jazz" id="jazz">
                                <label for="jazz">Jazz</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="NewAge" id="newAge">
                                <label for="newAge">New Age</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="Pop" id="pop">
                                <label for="pop">Pop</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="Rock" id="rock">
                                <label for="rock">Rock</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="R&B" id="r&b">
                                <label for="r&b">R&B</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="Rap" id="rap">
                                <label for="rap">Rap</label>
                            </li>
                            <li>
                                <input class="genre" type="checkbox" value="Reggae"  id="reggae">
                                <label for="reggae">Reggae</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section class="filter-years">
                <h3>Release Date</h3>
                <div class="tab-content">
                    <div class="options">
                        <select id="start-year" name="start-year">
                            <option></option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                            <option value="1969">1969</option>
                            <option value="1968">1968</option>
                            <option value="1967">1967</option>
                            <option value="1966">1966</option>
                            <option value="1965">1965</option>
                            <option value="1964">1964</option>
                            <option value="1963">1963</option>
                            <option value="1962">1962</option>
                            <option value="1961">1961</option>
                            <option value="1960">1960</option>
                            <option value="1959">1959</option>
                            <option value="1958">1958</option>
                            <option value="1957">1957</option>
                            <option value="1956">1956</option>
                            <option value="1955">1955</option>
                            <option value="1954">1954</option>
                            <option value="1953">1953</option>
                            <option value="1952">1952</option>
                            <option value="1951">1951</option>
                            <option value="1950">1950</option>
                            <option value="1949">1949</option>
                            <option value="1948">1948</option>
                            <option value="1947">1947</option>
                            <option value="1946">1946</option>
                            <option value="1945">1945</option>
                            <option value="1944">1944</option>
                            <option value="1943">1943</option>
                            <option value="1942">1942</option>
                            <option value="1941">1941</option>
                            <option value="1940">1940</option>
                            <option value="1939">1939</option>
                            <option value="1938">1938</option>
                            <option value="1937">1937</option>
                            <option value="1936">1936</option>
                            <option value="1935">1935</option>
                            <option value="1934">1934</option>
                            <option value="1933">1933</option>
                            <option value="1932">1932</option>
                            <option value="1931">1931</option>
                            <option value="1930">1930</option>
                            <option value="1929">1929</option>
                            <option value="1928">1928</option>
                            <option value="1927">1927</option>
                            <option value="1926">1926</option>
                            <option value="1925">1925</option>
                            <option value="1924">1924</option>
                            <option value="1923">1923</option>
                            <option value="1922">1922</option>
                            <option value="1921">1921</option>
                            <option value="1920">1920</option>
                        </select>
                        TO
                        <select id="end-year" name="end-year">
                            <option></option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                            <option value="1969">1969</option>
                            <option value="1968">1968</option>
                            <option value="1967">1967</option>
                            <option value="1966">1966</option>
                            <option value="1965">1965</option>
                            <option value="1964">1964</option>
                            <option value="1963">1963</option>
                            <option value="1962">1962</option>
                            <option value="1961">1961</option>
                            <option value="1960">1960</option>
                            <option value="1959">1959</option>
                            <option value="1958">1958</option>
                            <option value="1957">1957</option>
                            <option value="1956">1956</option>
                            <option value="1955">1955</option>
                            <option value="1954">1954</option>
                            <option value="1953">1953</option>
                            <option value="1952">1952</option>
                            <option value="1951">1951</option>
                            <option value="1950">1950</option>
                            <option value="1949">1949</option>
                            <option value="1948">1948</option>
                            <option value="1947">1947</option>
                            <option value="1946">1946</option>
                            <option value="1945">1945</option>
                            <option value="1944">1944</option>
                            <option value="1943">1943</option>
                            <option value="1942">1942</option>
                            <option value="1941">1941</option>
                            <option value="1940">1940</option>
                            <option value="1939">1939</option>
                            <option value="1938">1938</option>
                            <option value="1937">1937</option>
                            <option value="1936">1936</option>
                            <option value="1935">1935</option>
                            <option value="1934">1934</option>
                            <option value="1933">1933</option>
                            <option value="1932">1932</option>
                            <option value="1931">1931</option>
                            <option value="1930">1930</option>
                            <option value="1929">1929</option>
                            <option value="1928">1928</option>
                            <option value="1927">1927</option>
                            <option value="1926">1926</option>
                            <option value="1925">1925</option>
                            <option value="1924">1924</option>
                            <option value="1923">1923</option>
                            <option value="1922">1922</option>
                            <option value="1921">1921</option>
                            <option value="1920">1920</option>
                        </select>
                    </div>

                </div>
            </section>
            <section class="filter-rating">
                <h3>Rating</h3>
                <div class="tab-content">
                    <div class="options">
                        <select id="min-rating">
                            <option></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        TO
                        <select id="max-rating">
                            <option></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
            </section>
            <section class="filter-artists">
                <h3>Artist</h3>
                <div class="tab-content">
                    <div class="tab-content">
                        <input id = "artist" type="text" placeholder="type to filter artists by name">
                    </div>
                </div>

            </section><br/>
            <button value="Search" onclick="advancedSearchRequest()">Search</button>
        </div>
        <div class="results">
            <table id="advancedSearchResultTable">
                <tr>
                    <td>img</td>
                    <td>year</td>
                    <td>artist</td>
                    <td>album</td>
                    <td>rating</td>
                </tr>
            </table>
        </div>
    </div>

    <div id="artistDiv">
        <h2 id="artistName"></h2>
        <h1>Biography</h1>
        <p id="artistDescription"></p>
        <div id="discographyDiv">
            <h1>Discography</h1>
            <table id="discographyTable">
                <tr>
                    <td>img</td>
                    <td>year</td>
                    <td>title</td>
                    <td>rating</td>
                </tr>
            </table>
        </div>
    </div>

    <div id="albumDiv">
    <h1 id="albumTitle"></h1>
    <img id="albumImage"><br/>
    Performer: <label id="performer"></label><br/>
    Year: <label id="albumYear"></label><br/>
    Genre: <label id="albumGenre"></label><br/>
    Description: <p id="albumDescription"></p>
    Total rating: <label id="totalRating"></label><br/>

    <div id="setRating" onchange="setRating()">
        Your Rating:
        <select id="ratingSelect">
            <option></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
    </div>

    <div id="reviews">
        <div id="submitReview">
            <h3>Your Review</h3>
            <textarea name="user-review" id="user-review" class="user-review-box"></textarea><br/>
            <input type="button" value="Submit Review" onclick="createReview()">
        </div>
        <div id="yourReview">
            <h3>Your Review</h3>
            <div id="yourReviewInfo">
                <p id="yourUsername"></p>
                <p id="yourDate"></p>
                <p id="yourRating"></p>
                <p id="yourText"></p>
            </div>
        </div>
        <div id="userReviews">
            <h3>User Reviews</h3>
            <div class="userReviewResults">

            </div>
        </div>
    </div>
    <div id="songsDiv">
        <h1>Tracklist</h1>
        <table id="songsTable">
            <tr>
                <td></td>
                <td>Title</td>
                <td>Performer</td>
                <td>Time</td>
            </tr>
        </table>
    </div>

</div>



</div>



</body>
</html>