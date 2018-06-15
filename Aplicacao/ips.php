<?php


echo "<h2>IPV4</h2><br>";

$ip = "";
$intQuerbra = 1;


echo "
<table width='100%'>
	<tr>";
for ($i=0; $i < 256; $i++) { 
	for ($j=0; $j < 256; $j++) { 
		for ($k=0; $k < 256; $k++) { 
			for ($l=0; $l < 256; $l++) { 

				echo '
		<td align=\'right\'>';
				echo $i.".".$j.".".$k.".".$l;
				echo '</td>';

				if ($intQuerbra == 10) {
					$intQuerbra = 0;
					echo "
	</tr>
	<tr>";
				}
				$intQuerbra++;
			}
		}
	}
}

echo "
	</tr>
</table>";

?>