

$(document).ready(function(){
	zerarTabelaGrade();
	buscar_notificacoes();
});

function buscar_notificacoes(){	
	var id_notificacoes = "";
	var descricao_notificacoes = "";
	var usuario_atuador_notificacoes = "";
	var usuaio_requerente_notificacoes = "";
	var tipo_alteracao_notificacoes = "";
	var notificacoes_config_id = "";
	var bool_view_notificacoes = "";
	var data_atualizacao_notificacoes = "";
	var bool_ativo_notificacoes = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var acumularFunctionComplemento = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroNotificacoes = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	// var accesskeyEditar = " accesskey='w'";
	var tipo_para_imiprimir = "";
	var primeiraVisualizacao = "";

	$("#conteudoNotificacoes").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_notificacoesController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_notificacoes': true,
			'filtro': $("#pesquisa_notificacoes").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroNotificacoes += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroNotificacoes += "<br>";

			telaCadastroNotificacoes += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_notificacoes = subvetor[0];
				descricao_notificacoes = subvetor[1];
				usuario_atuador_notificacoes = subvetor[2];
				usuaio_requerente_notificacoes = subvetor[3];
				tipo_alteracao_notificacoes = subvetor[4];
				notificacoes_config_id = subvetor[5];
				bool_view_notificacoes = subvetor[6];
				data_atualizacao_notificacoes = subvetor[7];
				bool_ativo_notificacoes = subvetor[8];
				
				acumularFunctionId.push(id_notificacoes);
				acumularFunctionCampo.push(usuario_atuador_notificacoes+"+usuario");
				acumularFunctionComplemento.push("_atuador");

				if (bool_ativo_notificacoes == 1) { 
					desabilitar = "";
					icone_ativo = "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
					cor_ativo = "#0f0;";
					valorAtivo = 0;
				} else {
					desabilitar = "disabled";
					cor_ativo = "#f00;";
					icone_ativo = "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>";
					valorAtivo = 1;
				}

				if (tipo_alteracao_notificacoes == "i") {
					tipo_para_imiprimir = "Inserção";
				} else if (tipo_alteracao_notificacoes == "u") {
					tipo_para_imiprimir = "Atualização";
				}

				primeiraVisualizacao = bool_view_notificacoes == 0 ? "<img src='app/img/new-icon.png' width='100%'>" : "";

				tabelaViewBody += 		"<div class='col-md-4 col-sm-6 notificacaoStyle' id='notificacaoDiv"+id_notificacoes+"'><br />";
				tabelaViewBody += 			"<div class='infoNewView'>"+primeiraVisualizacao+"</div>";
				tabelaViewBody += 			"<center>";
				tabelaViewBody += 				"<button class='btn btn-success' onclick='salvarNotificacaoExibida("+id_notificacoes+")'>";
				tabelaViewBody += 					"<i class='fa fa-floppy-o'></i> Salvar";
				tabelaViewBody += 				"</button>";
				tabelaViewBody +=				"&nbsp;&nbsp;&nbsp;&nbsp;" 
				tabelaViewBody += 				"<button class='btn btn-danger' onclick='apagarNotificacaoExibida("+id_notificacoes+")'>";
				tabelaViewBody += 					"<i class='fa fa-times'></i> Excluir";
				tabelaViewBody += 				"</button>";
				tabelaViewBody += 			"</center><br />";
				tabelaViewBody += 			descricao_notificacoes;
				tabelaViewBody += 			"<b>Usuário Atuador: </b>";
				tabelaViewBody += 			"<span id='usuario_atuador_"+parseInt(id_notificacoes)+"'></span><br />";
				tabelaViewBody += 			"<b>Tipo de Operação: </b>"+tipo_para_imiprimir;
				tabelaViewBody += 			"<br /><b>Data da Operação: </b>"+formatarData(data_atualizacao_notificacoes);
				tabelaViewBody += 		"</div>";

				numeroRegAtual++;
			}
			telaCadastroNotificacoes +=		tabelaViewBody;
		}
		telaCadastroNotificacoes += "</div>";
		$("#conteudoNotificacoes").html(telaCadastroNotificacoes);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], acumularFunctionComplemento[i]);
		}

		$.ajax({
			url:'app/controllers/funcoes_notificacoesController.php',
			type: 'POST',
			dataType: 'text',
			data: { 'setar_visualizacao_notificacoes': true }
		}).done( function(data){});
	});
}




function apagarNotificacaoExibida(id){
	bootbox.confirm({
		title: "Tem certeza que deseja apagar esta notificação?",
		message: "Ao aperta o botão \"Sim\" você irá apagar esta notificação definitivamente!",
		buttons: {
			confirm: {
				label: 'Sim',
				className: 'btn-success'
			},
			cancel: {
				label: 'Não',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if (result) {
				$.ajax({
					url:'app/controllers/funcoes_notificacoesController.php',
					type: 'POST',
					dataType: 'text',
					data: { 
						'apagarNotificacao': true,
						'id': id
					}
				}).done( function(data){
					console.log(data);
					toast.info("Notificação apagada com sucesso!");
					$("#notificacaoDiv"+id).remove();
				});
			}
		}
	});
}





function salvarNotificacaoExibida(id){
	bootbox.confirm({
		title: "Tem certeza que deseja salvar esta notificação?",
		message: "Ao aperta o botão \"Sim\" você irá armazenar esta notificação na aréa de Notificação -> Salvas!",
		buttons: {
			confirm: {
				label: 'Sim',
				className: 'btn-success'
			},
			cancel: {
				label: 'Não',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if (result) {
				$.ajax({
					url:'app/controllers/funcoes_notificacoesController.php',
					type: 'POST',
					dataType: 'text',
					data: { 
						'salvarNotificacao': true,
						'id': id
					}
				}).done( function(data){
					console.log(data);
					toast.success("Notificação salva com sucesso!");
					$("#notificacaoDiv"+id).remove();
				});	
			}
		}
	});
}