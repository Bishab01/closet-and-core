<?php
//conneting to the created database
$env = parse_ini_file(__DIR__ . '/../.env');

$host = $env['DB_HOST'];
$dbname   = $env['DB_NAME'];
$user = $env['DB_USER'];
$password = $env['DB_PASSWORD'];
$port = $env['DB_PORT'];

$conn = new mysqli ( $host, $user, $password, $dbname, $port);

if($conn->connect_error){
    die ("Connection failed: " . $conn->connect_error);
}

$conn->query("SET time_zone = '+05:45'");

?>