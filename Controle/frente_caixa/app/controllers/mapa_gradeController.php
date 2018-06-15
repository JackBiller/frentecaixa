
<?php

session_start();


if($_POST['grade'] == 'item-grupo'){
	$_SESSION['item-grupo'] = $_POST['id'];
}

else if($_POST['grade'] == 'item_unidade_medida-item'){
	$_SESSION['item_unidade_medida-item'] = $_POST['id'];
}

else if($_POST['grade'] == 'cliente_contato-cliente'){
	$_SESSION['cliente_contato-cliente'] = $_POST['id'];
}

else if($_POST['grade'] == 'cliente_endereco-cliente'){
	$_SESSION['cliente_endereco-cliente'] = $_POST['id'];
}

else if($_POST['grade'] == 'pedido_item-pedido'){
	$_SESSION['pedido_item-pedido'] = $_POST['id'];
}

else if($_POST['grade'] == 'pedido_pagamento-pedido'){
	$_SESSION['pedido_pagamento-pedido'] = $_POST['id'];
}

else if($_POST['grade'] == 'pedido_pagamento_extorno-pedido_pagamento'){
	$_SESSION['pedido_pagamento_extorno-pedido_pagamento'] = $_POST['id'];
}

else if($_POST['grade'] == 'caixa_operacao-caixa_movimentacao'){
	$_SESSION['caixa_operacao-caixa_movimentacao'] = $_POST['id'];
}

else if($_POST['grade'] == 'filial-empresa'){
	$_SESSION['filial-empresa'] = $_POST['id'];
}


if(!empty($_POST['zerarGrades'])){ 
	$_SESSION['item-grupo'] = 0;
	$_SESSION['item_unidade_medida-item'] = 0;
	$_SESSION['cliente_contato-cliente'] = 0;
	$_SESSION['cliente_endereco-cliente'] = 0;
	$_SESSION['pedido_item-pedido'] = 0;
	$_SESSION['pedido_pagamento-pedido'] = 0;
	$_SESSION['pedido_pagamento_extorno-pedido_pagamento'] = 0;
	$_SESSION['caixa_operacao-caixa_movimentacao'] = 0;
	$_SESSION['filial-empresa'] = 0;
}

?>