<?php 
    
    session_start();

    $username = $_POST['username'];
    $password = $_POST['password'];
    
    if ($username == 'karin' and $password == "123") {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header('Location: login/index.php');
        die();
    }
    else {
        echo 'Password or username is incorrect';
    }
?>