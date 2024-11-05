<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "painite_joias";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// A conexão permanece aberta, e será fechada somente nos arquivos que utilizam o db_connection.php.
?>
