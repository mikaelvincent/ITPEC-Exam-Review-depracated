        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <?php if (isset($additional_js) && is_array($additional_js)) {
            foreach ($additional_js as $js_file) {
                echo '<script src="' . $js_file . '"></script>';
            }
        } ?>
    </body>
</html>
