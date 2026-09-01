<?php
    include("../config/connectDB.php");

    $pid = $_GET["pid"] ?? "";

    if (!ctype_digit((string)$pid)) {
        http_response_code(400);
        exit;
    }

    $stmt = $conn->prepare("SELECT pimg FROM products WHERE pid = ?");
    $stmt->bind_param("i", $pid);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if (!$row || !$row["pimg"]) {
        http_response_code(404);
        exit;
    }

    $imageData = $row["pimg"];

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_buffer($finfo, $imageData);
    finfo_close($finfo);

    header("Content-Type: " . $mimeType);
    header("Cache-Control: public, max-age=86400");
    header("Content-Length: " . strlen($imageData));
    echo $imageData;

    $stmt->close();
    $conn->close();
?>