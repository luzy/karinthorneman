<?php
    session_start();

    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    }
    else {
        echo "please log in to see this page</br>";
        die();
    }
?>

<!doctype html>

<html lang="en">
    <head>
        <title>Karin Thorneman</title>
        <meta charset   =utf-8>
        <link   type    ="text/css" 
                rel     ="stylesheet" 
                href    ="../../../stylesheet.css"
                media   ="screen" />
        <link   type    ="text/css" 
                rel     ="stylesheet" 
                href    ="stylesheet.css"
                media   ="screen" />
        <link   rel     ="stylesheet" 
                href    ="../../../fonts/octicons/octicons.css" />
    </head>
    <body>
        <noscript>
            <h1>This site requires Javascript to function properly</h1>
        </noscript>
        <div id = "container"> 
            <div id="header">
                <div id="logo">
                    <h2>Karin Thorneman</h2>
                </div>
            </div>
        
            <div id="contentHolder">
                <div id="control">
                    <ul id="exhibitions">
                        <li id="1" class="clickable">Utställning 2014</li>
                        <li id="2" class="clickable">Utställning 2010</li>
                    </ul>
                    <div id="arrowHolder" class="holder">
                        <span class="mega-octicon octicon-chevron-left 
                                        clickable fadeout">
                        </span>
                        <span id="whichimage" class="fadeout"></span>
                        <span class="mega-octicon octicon-chevron-right 
                                        clickable fadeout">
                        </span>
                    </div>
                    <div id="description" class="fadeout"></div>
<!--                    <div id="togglefade" class="fadeout"><p>Tona ut</p></div>
-->
                </div>
                <div id="images">
                    <div id="imageWrapper" class="clickable"></div>
                </div>
            </div>

            <div id="footer" class="fadeout">
                <small id="copyright">
                    Copyright <a href="mailto:karin.thoreman@gmail.com">Karin Thorneman</a>
                </small>
            </div>
        </div>
        <script language = "javascript" 
                src = "../../../scripts/js/jquery-1.11.1.min.js">
        </script>
        <script language = "javascript"
                src = "script.js">
        </script>
    </body>
</html>

