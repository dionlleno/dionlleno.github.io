<?php
include 'db_connection.php'; // Inclui o arquivo de conexão com o banco de dados

if ($_SERVER["REQUEST_METHOD"] == "POST") { // Verifica se o método da requisição é POST
    // Obtém os dados do formulário de login
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Consulta SQL para buscar o usuário pelo email
    $sql = "SELECT * FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email); // "s" indica que o parâmetro é uma string
    $stmt->execute();
    $result = $stmt->get_result();

    // Verifica se o usuário existe
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verifica se a senha inserida corresponde à senha armazenada
        if (password_verify($senha, $user['senha'])) {
            session_start();
            // Armazena informações do usuário na sessão
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['nome']; // Armazena o nome do usuário para exibição no cabeçalho
            
            // Redireciona o usuário para a página inicial
            header("Location: ../index.html");
            exit();
        } else {
            // Caso a senha esteja incorreta
            echo "Senha incorreta!";
        }
    } else {
        // Caso o usuário não seja encontrado
        echo "Usuário não encontrado!";
    }

    // Fecha a declaração e a conexão com o banco de dados
    $stmt->close();
    $conn->close();
}
?>
