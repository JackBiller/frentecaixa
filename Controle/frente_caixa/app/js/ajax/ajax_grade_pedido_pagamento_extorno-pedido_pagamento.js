
$(document).ready(function(){
	buscar_pedido_pagamento_extorno();
});

/*function setarValorEstrangeiroLista(id, tabelaEstrangeira){
	id = parseInt(id);
	tabelaEstrangeira = tabelaEstrangeira.split("+");
	var idTabelaEstrangeira = tabelaEstrangeira[0];
	tabelaEstrangeira = tabelaEstrangeira[1];
	var colunaParam = "pequisa_"+tabelaEstrangeira+"_id";

	var param = JSON.parse('{ "'+colunaParam+'":true, "id":'+idTabelaEstrangeira+' }');

	$.ajax({
		url:'app/controllers/funcoes_'+tabelaEstrangeira+'Controller.php',
		type: 'POST',
		dataType: 'text',
		data: param
	}).done( function(data){
		vetor = data.split("{,}");
		document.getElementById(tabelaEstrangeira+'_'+id).innerHTML = vetor[1];
	});
}*/



function buscar_pedido_pagamento_extorno(){
	
	var id_pedido_pagamento_extorno = "";
	var motivo_pedido_pagamento_extorno = "";
	var pedido_pagamento_id = "";
	var data_atualizacao_pedido_pagamento_extorno = "";
	var usuario_id = "";
	var bool_ativo_pedido_pagamento_extorno = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroPedido_pagamento_extorno = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	var grades = document.getElementsByName("grade");
	var id_tabela_primaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == "pedido_pagamento" && $(grades[i]).data("g") == "pedido_pagamento_extorno") {
			id_tabela_primaria = $(grades[i]).val();
			if (id_tabela_primaria == 0)
				window.location.assign("principal.php#!pedido_pagamento");
			else {
				$.ajax({
					url:'app/controllers/funcoes_pedido_pagamentoController.php',
					type: 'POST',
					dataType: 'text',
					data: {
						'pequisa_pedido_pagamento_id': true,
						'id': id_tabela_primaria
					}
				}).done( function(data){
					// console.log("funcoes_pedido_pagamentoController: "+data);
					vetor = data.split("{,}");
					document.getElementById('nomePedido_pagamento').innerHTML = vetor[1];
				});
			}
		}
	}


	$.ajax({
		url:'app/controllers/funcoes_pedido_pagamento_extornoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido_pagamento_extorno_grade': true,
			'filtro': $("#pesquisa_pedido_pagamento_extorno").val(),
			'tabela': "pedido_pagamento",
			'id': id_tabela_primaria
		}
	}).done( function(data){
		// _filtro_grade
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroPedido_pagamento_extorno += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroPedido_pagamento_extorno += "<br>";

			telaCadastroPedido_pagamento_extorno += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_pedido_pagamento_extorno = subvetor[0];
				motivo_pedido_pagamento_extorno = subvetor[1];
				pedido_pagamento_id = subvetor[2];
				data_atualizacao_pedido_pagamento_extorno = subvetor[3];
				usuario_id = subvetor[4];
				bool_ativo_pedido_pagamento_extorno = subvetor[5];
				
				acumularFunctionId.push(id_pedido_pagamento_extorno);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_pedido_pagamento_extorno == 1) { 
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

				tabelaViewBody += 		"<tr>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				"<a href='principal.php#!editar_grade_pedido_pagamento_extorno-pedido_pagamento' style='color: #f0ad4e;' data-id='"+id_pedido_pagamento_extorno+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_pedido_pagamento_extorno+"'>";
				tabelaViewBody += 				"<a href='#!grade_pedido_pagamento_extorno-pedido_pagamento' style='color: "+cor_ativo+"' data-id='"+id_pedido_pagamento_extorno+"' onclick=\"excluir(this , 'pedido_pagamento_extorno', "+bool_ativo_pedido_pagamento_extorno+", 'grade_pedido_pagamento_extorno-pedido_pagamento')\" title='Excluir'>";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+motivo_pedido_pagamento_extorno+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_pedido_pagamento_extorno)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_pedido_pagamento_extorno)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroPedido_pagamento_extorno += 	"<table class='table'>";
			telaCadastroPedido_pagamento_extorno += 		"<tr bgcolor='white'>";
			telaCadastroPedido_pagamento_extorno += 			"<td><b>Editar</b></td>";
			telaCadastroPedido_pagamento_extorno += 			"<td><b>Ativo</b></td>";
			telaCadastroPedido_pagamento_extorno += 			"<td><b>N°</b></td>";
			telaCadastroPedido_pagamento_extorno += 			"<td><b>Motivo</b></td>";
			telaCadastroPedido_pagamento_extorno += 			"<td><b>Data Atualização</b></td>";
			telaCadastroPedido_pagamento_extorno += 			"<td><b>Usuário</b></td>";
			telaCadastroPedido_pagamento_extorno += 		"</tr>";
			telaCadastroPedido_pagamento_extorno +=		tabelaViewBody;
			telaCadastroPedido_pagamento_extorno += 	"</table>";
		}
		telaCadastroPedido_pagamento_extorno += "</div>";
		$("#conteudoPedido_pagamento_extorno").html(telaCadastroPedido_pagamento_extorno);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
		var botaoBoltarGrade = verificaGrade('pedido_pagamento', 'pedido_pagamento_extorno', 'Pedido Pagamento');
		$("#botaoVoltarGrade").html(botaoBoltarGrade);
	});
}