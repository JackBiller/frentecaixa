
<?php 

session_start();

if (!empty($_SESSION['nome']) && $_SESSION['nome'] != "") {
	$nomeUser = $_SESSION['nome'];
} else {
	header("Location: index.php");
}

$areaDeAtuacao = "";
if (!empty($_SESSION['areaDeAtuacao'])) $areaDeAtuacao = $_SESSION['areaDeAtuacao'];


$editar = 0;
if (!empty($_SESSION['editar'])) $editar = $_SESSION['editar'];



/*************************************************************************************
/** SESSÃO GRADES *
/************************************************************************************/

$item_grupo = "0";
if(!empty($_SESSION['item-grupo'])) {
	$item_grupo = $_SESSION['item-grupo'];
}
	
$item_unidade_medida_item = "0";
if(!empty($_SESSION['item_unidade_medida-item'])) {
	$item_unidade_medida_item = $_SESSION['item_unidade_medida-item'];
}
	
$cliente_contato_cliente = "0";
if(!empty($_SESSION['cliente_contato-cliente'])) {
	$cliente_contato_cliente = $_SESSION['cliente_contato-cliente'];
}
	
$cliente_endereco_cliente = "0";
if(!empty($_SESSION['cliente_endereco-cliente'])) {
	$cliente_endereco_cliente = $_SESSION['cliente_endereco-cliente'];
}
	
$pedido_item_pedido = "0";
if(!empty($_SESSION['pedido_item-pedido'])) {
	$pedido_item_pedido = $_SESSION['pedido_item-pedido'];
}
	
$pedido_pagamento_pedido = "0";
if(!empty($_SESSION['pedido_pagamento-pedido'])) {
	$pedido_pagamento_pedido = $_SESSION['pedido_pagamento-pedido'];
}
	
$pedido_pagamento_extorno_pedido_pagamento = "0";
if(!empty($_SESSION['pedido_pagamento_extorno-pedido_pagamento'])) {
	$pedido_pagamento_extorno_pedido_pagamento = $_SESSION['pedido_pagamento_extorno-pedido_pagamento'];
}
	
$caixa_operacao_caixa_movimentacao = "0";
if(!empty($_SESSION['caixa_operacao-caixa_movimentacao'])) {
	$caixa_operacao_caixa_movimentacao = $_SESSION['caixa_operacao-caixa_movimentacao'];
}
	
$filial_empresa = "0";
if(!empty($_SESSION['filial-empresa'])) {
	$filial_empresa = $_SESSION['filial-empresa'];
}
	


include "app/classe/conexao.php";
$conn = new Conexao();
$pdo = $conn->Connect(); 

$sql = "SELECT area_nivel_acesso
		FROM nivel_acesso
		WHERE id_nivel_acesso = (
			SELECT nivel_acesso_id FROM usuario WHERE id_usuario = ".$_SESSION['login']."
		);";
$verifica = $pdo->query($sql);

foreach ($verifica as $dados) $minha_area_nivel_acesso = explode("+", $dados[0]);


$acess_caixa = false;
if(in_array('caixa', $minha_area_nivel_acesso)) $acess_caixa = true;

$acess_cliente = false;
if(in_array('cliente', $minha_area_nivel_acesso)) $acess_cliente = true;

$acess_condicao_de_pagamento = false;
if(in_array('condicao_de_pagamento', $minha_area_nivel_acesso)) $acess_condicao_de_pagamento = true;

$acess_empresa = false;
if(in_array('empresa', $minha_area_nivel_acesso)) $acess_empresa = true;

$acess_estado = false;
if(in_array('estado', $minha_area_nivel_acesso)) $acess_estado = true;

$acess_filial = false;
if(in_array('filial', $minha_area_nivel_acesso)) $acess_filial = true;

$acess_grupo = false;
if(in_array('grupo', $minha_area_nivel_acesso)) $acess_grupo = true;

$acess_item = false;
if(in_array('item', $minha_area_nivel_acesso)) $acess_item = true;

$acess_operacoes_caixa = false;
if(in_array('operacoes_caixa', $minha_area_nivel_acesso)) $acess_operacoes_caixa = true;

$acess_unidade_medida = false;
if(in_array('unidade_medida', $minha_area_nivel_acesso)) $acess_unidade_medida = true;

$acess_item_grupo = "0";
if(in_array('item-grupo', $minha_area_nivel_acesso)) $acess_item_grupo = "1";

$acess_item_unidade_medida_item = "0";
if(in_array('item_unidade_medida-item', $minha_area_nivel_acesso)) $acess_item_unidade_medida_item = "1";

$acess_cliente_contato_cliente = "0";
if(in_array('cliente_contato-cliente', $minha_area_nivel_acesso)) $acess_cliente_contato_cliente = "1";

$acess_cliente_endereco_cliente = "0";
if(in_array('cliente_endereco-cliente', $minha_area_nivel_acesso)) $acess_cliente_endereco_cliente = "1";

$acess_pedido_item_pedido = "0";
if(in_array('pedido_item-pedido', $minha_area_nivel_acesso)) $acess_pedido_item_pedido = "1";

$acess_pedido_pagamento_pedido = "0";
if(in_array('pedido_pagamento-pedido', $minha_area_nivel_acesso)) $acess_pedido_pagamento_pedido = "1";

$acess_pedido_pagamento_extorno_pedido_pagamento = "0";
if(in_array('pedido_pagamento_extorno-pedido_pagamento', $minha_area_nivel_acesso)) $acess_pedido_pagamento_extorno_pedido_pagamento = "1";

$acess_caixa_operacao_caixa_movimentacao = "0";
if(in_array('caixa_operacao-caixa_movimentacao', $minha_area_nivel_acesso)) $acess_caixa_operacao_caixa_movimentacao = "1";

$acess_filial_empresa = "0";
if(in_array('filial-empresa', $minha_area_nivel_acesso)) $acess_filial_empresa = "1";

$acess_upload = false;
if(in_array('upload', $minha_area_nivel_acesso)) $acess_upload = true;

$acess_mapa = false;
if(in_array('mapa', $minha_area_nivel_acesso)) $acess_mapa = true;

$acess_mov = false;
if(in_array('mov', $minha_area_nivel_acesso)) $acess_mov = true;

$acess_pdf = false;
if(in_array('relatorio', $minha_area_nivel_acesso)) $acess_pdf = true;

$acess_notif = false;
if(in_array('notificacao', $minha_area_nivel_acesso)) $acess_notif = true;

$acess_usuario = false;
if(in_array('usuario', $minha_area_nivel_acesso)) $acess_usuario = true;

?>
<!DOCTYPE html>
<html>
<head>
	<title>Frente Caixa</title>
	<link rel='shortcut icon' href='app/img/teacher.ico' />
	<?php include "app/componetes/bibliotecasHead.php"; ?>
	<?php include "app/componetes/biblioteca.php"; ?>
</head>
<body ng-app="myApp" onload="carregarNotificao();">
	<?php include "app/componetes/cabecario.php"; ?>
	<div id="wrapper">

		<?php include "app/componetes/menu.php"; ?>

			<!-- .page-content -->
			<div class="page-content sidebar-page right-sidebar-page clearfix">
				<!-- .page-content-wrapper -->
				<div class="page-content-wrapper">
					<div class="page-content-inner">
						<!-- .page-content-inner -->
						<div id="page-header" class="clearfix">
							<div class="page-header">
								<h2>Frente Caixa</h2>
								<span class="txt">Bem Vindo a este projeto!</span>
							</div>
							<div class="header-stats">
							</div>
						</div>

						<div class="row">
							<!-- Start .row -->
							<div class="col-lg-12 col-md-12">
								<!-- col-lg-12 start here -->
								<div class="row">
									<!-- Start .row -->
									<div class="col-lg-12 col-md-12 col-sm-12">
										<!-- col-lg-12 start here -->
										<div class="panel panel-default plain toggle panelClose panelRefresh">
											<!-- Start .panel -->
											<div class="panel-heading">
												<!--h4 class="panel-title">
													<i class="l-basic-target"></i> 
													<span id='tituloView'>Home</span>
												</h4-->
											</div>
											<div class="panel-body">
												<div class="row">
													<!-- Start .row -->
													<div class="col-md-12">
														<input type="hidden" id="areaDeAtuacao" value="<?php echo $areaDeAtuacao; ?>">
														<input type="hidden" id="editar" value="<?php echo $editar; ?>">
														<input type="hidden" name="grade" id="el_grupo-item" data-p="grupo" data-g="item" value="<?php echo $item_grupo; ?>">
														<input type="hidden" id='n_acs_item_grupo' value='<?php echo $acess_item_grupo; ?>'>
														<input type="hidden" name="grade" id="el_item-item_unidade_medida" data-p="item" data-g="item_unidade_medida" value="<?php echo $item_unidade_medida_item; ?>">
														<input type="hidden" id='n_acs_item_unidade_medida_item' value='<?php echo $acess_item_unidade_medida_item; ?>'>
														<input type="hidden" name="grade" id="el_cliente-cliente_contato" data-p="cliente" data-g="cliente_contato" value="<?php echo $cliente_contato_cliente; ?>">
														<input type="hidden" id='n_acs_cliente_contato_cliente' value='<?php echo $acess_cliente_contato_cliente; ?>'>
														<input type="hidden" name="grade" id="el_cliente-cliente_endereco" data-p="cliente" data-g="cliente_endereco" value="<?php echo $cliente_endereco_cliente; ?>">
														<input type="hidden" id='n_acs_cliente_endereco_cliente' value='<?php echo $acess_cliente_endereco_cliente; ?>'>
														<input type="hidden" name="grade" id="el_pedido-pedido_item" data-p="pedido" data-g="pedido_item" value="<?php echo $pedido_item_pedido; ?>">
														<input type="hidden" id='n_acs_pedido_item_pedido' value='<?php echo $acess_pedido_item_pedido; ?>'>
														<input type="hidden" name="grade" id="el_pedido-pedido_pagamento" data-p="pedido" data-g="pedido_pagamento" value="<?php echo $pedido_pagamento_pedido; ?>">
														<input type="hidden" id='n_acs_pedido_pagamento_pedido' value='<?php echo $acess_pedido_pagamento_pedido; ?>'>
														<input type="hidden" name="grade" id="el_pedido_pagamento-pedido_pagamento_extorno" data-p="pedido_pagamento" data-g="pedido_pagamento_extorno" value="<?php echo $pedido_pagamento_extorno_pedido_pagamento; ?>">
														<input type="hidden" id='n_acs_pedido_pagamento_extorno_pedido_pagamento' value='<?php echo $acess_pedido_pagamento_extorno_pedido_pagamento; ?>'>
														<input type="hidden" name="grade" id="el_caixa_movimentacao-caixa_operacao" data-p="caixa_movimentacao" data-g="caixa_operacao" value="<?php echo $caixa_operacao_caixa_movimentacao; ?>">
														<input type="hidden" id='n_acs_caixa_operacao_caixa_movimentacao' value='<?php echo $acess_caixa_operacao_caixa_movimentacao; ?>'>
														<input type="hidden" name="grade" id="el_empresa-filial" data-p="empresa" data-g="filial" value="<?php echo $filial_empresa; ?>">
														<input type="hidden" id='n_acs_filial_empresa' value='<?php echo $acess_filial_empresa; ?>'>
														<input type="hidden" id="usuario" value="<?php echo $_SESSION['login']; ?>">
														<div ng-view class="col-md-12">

													</div>
												</div>
												<!-- End .row -->
											</div>
										</div>
										<!-- End .panel -->
									</div>
									<!-- col-lg-12 end here -->
								</div>
							</div>
						</div>
						<!-- End .row -->
					</div>
					<!-- / .page-content-inner -->
				</div>
				<!-- / page-content-wrapper -->
			</div>
			<!-- / page-content -->
		</div>
		<!-- / #wrapper -->

	
	<!-- Modal upload de Imagem -->
	<div class="modal fade" id="modalImagem" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" id="fecharModalIpBottun" data-dismiss="modal">
						&times;
					</button>
					<h4 class="modal-title">Upload de Arquivo: <span id='descricaoTipoUpload'></span></h4>
				</div>
				<div class="modal-body">
					<img src="app/img/padraoUp.png" id="imgemViewsUpload" height="100px">
					<form action="uploard.php" id="formulario_imgem" method="POST" enctype="multipart/form-data">
						<input type="file" class="form-control" name="arquivo" id="imagemInputModalImagem">
						<!--input type="hidden" name="pasta" value=""-->
						<input type="hidden" name="tipo" id='tipoUploadValor' value="img">
						<input type="hidden" name="paginaLogar" id="paginaLogarModalImagem">
						<button type="submit" class="btn btn-default" id="btn_uploadImagem" disabled>
							<i class="fa fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;Uploard
						</button>
						<span id="erroExtencaoArqMoldaImagem" style="color:red;"></span>
					</form>
					<br>
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Pesquisar..." aria-describedby="basic-addon2" id='campoPesquisaModalImagem' onkeyup="chamarImgUp(this.value);">
						<span class="input-group-addon" id="basic-addon2">
							<i class="fa fa-search" aria-hidden="true"></i>
						</span>
					</div>
					<br>
					<div id="viewImagensUpadas"></div>
					<br>
					<input type="hidden" id="campoSelecionadoModalImagemUp">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						<i class="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;Fechar
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- fim Modal upload de Imagem -->

	<style type="text/css">
		.divImg{
			background-color: #eee;
			border-style: solid;
			display: block;
		}
		.notificacaoStyle{
			/*bottom: 0px;*/
			/*margin-top: -25px;*/
			/*margin-left: 1%;*/
			height: 350px;
			/*width: 100%;*/
			border-top-style: solid;
			overflow: auto;
		}
		.infoNewView{
			position: absolute;
			width: 35px;
			height: 35px;
		}
	</style>

	<script type="text/javascript">
		function atualizaNotificacao(){
			$.ajax({
				url:'app/controllers/funcoes_notificacoesController.php',
				type: 'POST',
				dataType: 'text',
				data: { 'retornaStatusNotificacao': true }
			}).done( function(data){
				if (data == 0 || data == "0"){
					$("#notificacaoNView").html("");
				} else {
					$("#notificacaoNView").html("<span class='badge'>"+data+"</span>");
				}
			});
		}

		function carregarNotificao(){
			setInterval(function(){ atualizaNotificacao(); }, 5000);
		}

		function chamarImgUp(filtro){
			$("#viewImagensUpadas").html("Carregando...");
			var tipo = $("#tipoUploadValor").val();
			$.ajax({
				url:'app/controllers/funcoesController.php',
				type: 'POST',
				dataType: 'text',
				data: {
					'listarArquivo': true,
					'filtro': filtro,
					'tipo': tipo,
					'operacao': true
				}
			}).done( function(data){
				$("#viewImagensUpadas").html(data);
			});
		}

		// $("#modalImagem").on('shown.bs.modal',function(){  });

		function selecionarArquivo(arquivo){
			var campoSerdefinido = $("#campoSelecionadoModalImagemUp").val();
			document.getElementById(campoSerdefinido).value = arquivo;
			$("#modalImagem").modal("hide");
		}

		$("#imagemInputModalImagem").on("change", function(){
			var tipo = $("#tipoUploadValor").val();
			var arquivo = '';
			var files = !!this.files ? this.files : [];
			if (!files.length || !window.FileReader) return;

			if(tipo == 'img'){
				if (/^image/.test( files[0].type)){
					var reader = new FileReader();
					reader.readAsDataURL(files[0]);

					reader.onload = function(){
						$("#imgemViewsUpload").attr('src', this.result);
						document.getElementById("btn_uploadImagem").disabled = false;
						$("#erroExtencaoArqMoldaImagem").html("");
					}
				} else {
					$("#imgemViewsUpload").attr('src', "app/img/padraoUp.png");
					document.getElementById("btn_uploadImagem").disabled = true;
					$("#erroExtencaoArqMoldaImagem").html("Arquivo inválido!");
				}
			}
			else if(tipo == 'text'){
				if (/^text/.test( files[0].type) || files[0].type == 'application/pdf'){
					var reader = new FileReader();
					reader.readAsDataURL(files[0]);

					reader.onload = function(){
						document.getElementById("btn_uploadImagem").disabled = false;
						$("#erroExtencaoArqMoldaImagem").html("");
					}
				} else {
					document.getElementById("btn_uploadImagem").disabled = true;
					$("#erroExtencaoArqMoldaImagem").html("Arquivo inválido!");
				}
			}
			else {
				arquivo = files[0].type.split("/");
				if (tipo == arquivo[0]){
					var reader = new FileReader();
					reader.readAsDataURL(files[0]);

					reader.onload = function(){
						document.getElementById("btn_uploadImagem").disabled = false;
						$("#erroExtencaoArqMoldaImagem").html("");
					}
				} else {
					document.getElementById("btn_uploadImagem").disabled = true;
					$("#erroExtencaoArqMoldaImagem").html("Arquivo inválido!");
				}
			}
		});

		function chamarModalImagem(campoId, pagina, tipo){
			console.log(campoId);
			$('#modalImagem').modal('show');
			$("#campoPesquisaModalImagem").val("");
			$("#imgemViewsUpload").attr('src', "app/img/padraoUp.png");
			$("#imagemInputModalImagem").val("");
			document.getElementById("btn_uploadImagem").disabled = true;
			$('#campoSelecionadoModalImagemUp').val(campoId);
			$("#paginaLogarModalImagem").val(pagina);
			$("#tipoUploadValor").val(tipo);
			chamarImgUp("");
					if(tipo == 'img') $('#descricaoTipoUpload').html('Imagem');
			else 	if(tipo == 'video') $('#descricaoTipoUpload').html('Vídeo');
			else 	if(tipo == 'audio') $('#descricaoTipoUpload').html('Áudio');
			else 	if(tipo == 'text') $('#descricaoTipoUpload').html('Arquivo de Texto');
		}
	</script>


	<?php include "app/componetes/bibliotecasFooter.php"; ?>
</body>
</html>