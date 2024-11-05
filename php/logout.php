<?php
session_start();
session_unset(); // Limpa todas as variáveis de sessão
session_destroy(); // Destrói a sessão atual

header("Location: ../index.html"); // Redireciona para a página inicial
exit();
?>
