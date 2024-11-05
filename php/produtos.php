<?php
include 'db_connection.php';

// Consultar produtos
$categorias = ['aneis', 'brincos', 'colares'];
foreach ($categorias as $categoria) {
    echo "<div class='lista-$categoria'>";
    echo "<h1>" . ucfirst($categoria) . "</h1>";
    echo "<ul>";

    $sql = "SELECT * FROM produtos WHERE categoria='$categoria'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<li class='produto'>";
            echo "<a href='#'>";
            echo "<img class='img-lista' src='" . $row['imagem'] . "' alt='" . $row['descricao'] . "'>";
            echo "<p>R$ " . number_format($row['preco'], 2, ',', '.') . "</p>";
            echo "</a>";
            echo "</li>";
        }
    } else {
        echo "<li>Nenhum produto encontrado.</li>";
    }

    echo "</ul>";
    echo "</div>";
}

$conn->close();
?>
