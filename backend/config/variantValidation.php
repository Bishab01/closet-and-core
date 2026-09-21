<?php
    // Shared by addProduct.php and updateProduct.php.
    //
    // Cleans up the variants a retailer submitted and enforces two rules:
    //   1. size is a standard size (XS, S, M, L, XL, XXL, XXXL, XXXXL, 2XL ... 9XL, ...)
    //      or any short size of 1-2 characters (34, 57, ...)
    //   2. the (color, size) PAIR must be unique within one product.
    //      Color on its own, size on its own or stock on its own may repeat:
    //        red + M, red + L, blue + M   -> allowed
    //        red + M, red + M             -> rejected
    //
    // Returns [$cleanVariants, $errorMessage]. $errorMessage is null when all is well.
    // Colors are stored lowercase and sizes uppercase, and the duplicate check uses
    // those same forms, so "Red"/"red" and "m"/"M" count as the same value.

    function isValidSize(string $size): bool {
        // /u so a multi-byte character still counts as one character
        if (preg_match('/^.{1,2}$/us', $size)) {
            return true;
        }
        return (bool)preg_match('/^(X{1,4}[SL]|[2-9]X[SL])$/', $size);
    }

    function cleanVariants(array $variants): array {
        $clean = [];
        $seen = [];

        foreach ($variants as $v) {
            if (!is_array($v)) {
                return [[], "Invalid variant data."];
            }

            $color = preg_replace('/\s+/', ' ', trim((string)($v["color"] ?? "")));
            $color = $color === "" ? null : strtolower($color);

            $size = trim((string)($v["size"] ?? ""));
            $size = $size === "" ? null : strtoupper($size);

            if ($size !== null && !isValidSize($size)) {
                return [[], "Invalid size \"" . $size . "\". Use a standard size (XS, S, M, L, XL, XXL, XXXL, 2XL...) or a short size like 34."];
            }

            $key = json_encode([$color, $size]);
            if (isset($seen[$key])) {
                $label = trim(($color ?? "no color") . ", " . ($size ?? "no size"));
                return [[], "Duplicate variant (" . $label . "). Each variant of a product needs a different color and size combination."];
            }
            $seen[$key] = true;

            $colorHex = trim((string)($v["color_hex"] ?? ""));

            $clean[] = [
                "color"     => $color,
                "size"      => $size,
                "color_hex" => $colorHex === "" ? null : $colorHex,
                "stock"     => isset($v["stock"]) ? (int)$v["stock"] : 0
            ];
        }

        return [$clean, null];
    }
?>
 
