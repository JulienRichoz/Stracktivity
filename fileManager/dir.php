
var getFiles = <?php $out = array();
foreach (glob('../gpx/*.gpx') as $basename) {
    $p = pathinfo($basename);
    $out[] = $p['basename'];
}
echo json_encode($out);