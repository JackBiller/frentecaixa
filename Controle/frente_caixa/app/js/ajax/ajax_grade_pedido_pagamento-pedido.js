
$(document).ready(function(){
	buscar_pedido_pagamento();
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



function buscar_pedido_pagamento(){
	
	var id_pedido_pagamento = "";
	var parcela_atual_pedido_pagamento = "";
	var parcela_total_pedido_pagamento = "";
	var valor_pago_pedido_pagamento = "";
	var bool_esta_pago_pedido_pagamento = "";
	var pedido_id = "";
	var condicao_de_pagamento_id = "";
	var data_atualizacao_pedido_pagamento = "";
	var usuario_id = "";
	var bool_ativo_pedido_pagamento = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroPedido_pagamento = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	var grades = document.getElementsByName("grade");
	var id_tabela_primaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == "pedido" && $(grades[i]).data("g") == "pedido_pagamento") {
			id_tabela_primaria = $(grades[i]).val();
			if (id_tabela_primaria == 0)
				window.location.assign("principal.php#!pedido");
			else {
				$.ajax({
					url:'app/controllers/funcoes_pedidoController.php',
					type: 'POST',
					dataType: 'text',
					data: {
						'pequisa_pedido_id': true,
						'id': id_tabela_primaria
					}
				}).done( function(data){
					// console.log("funcoes_pedidoController: "+data);
					vetor = data.split("{,}");
					document.getElementById('nomePedido').innerHTML = vetor[1];
				});
			}
		}
	}


	$.ajax({
		url:'app/controllers/funcoes_pedido_pagamentoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido_pagamento_grade': true,
			'filtro': $("#pesquisa_pedido_pagamento").val(),
			'tabela': "pedido",
			'id': id_tabela_primaria
		}
	}).done( function(data){
		// _filtro_grade
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroPedido_pagamento += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroPedido_pagamento += "<br>";

			telaCadastroPedido_pagamento += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_pedido_pagamento = subvetor[0];
				parcela_atual_pedido_pagamento = subvetor[1];
				parcela_total_pedido_pagamento = subvetor[2];
				valor_pago_pedido_pagamento = subvetor[3];
				bool_esta_pago_pedido_pagamento = subvetor[4];
				pedido_id = subvetor[5];
				condicao_de_pagamento_id = subvetor[6];
				data_atualizacao_pedido_pagamento = subvetor[7];
				usuario_id = subvetor[8];
				bool_ativo_pedido_pagamento = subvetor[9];
				
				acumularFunctionId.push(id_pedido_pagamento);
				acumularFunctionCampo.push(condicao_de_pagamento_id+"+condicao_de_pagamento");

				if (bool_ativo_pedido_pagamento == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_grade_pedido_pagamento-pedido' style='color: #f0ad4e;' data-id='"+id_pedido_pagamento+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_pedido_pagamento+"'>";
				tabelaViewBody += 				"<a href='#!grade_pedido_pagamento-pedido' style='color: "+cor_ativo+"' data-id='"+id_pedido_pagamento+"' onclick=\"excluir(this , 'pedido_pagamento', "+bool_ativo_pedido_pagamento+", 'grade_pedido_pagamento-pedido')\" title='Excluir'>";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+parcela_atual_pedido_pagamento+"</td>";
				tabelaViewBody += 			"<td>"+parcela_total_pedido_pagamento+"</td>";
				tabelaViewBody += 			"<td>"+valor_pago_pedido_pagamento+"</td>";
				simOUnao = bool_esta_pago_pedido_pagamento == 1 ? 'Sim' : 'Não';
				tabelaViewBody += 			"<td>"+simOUnao+"</td>";
				tabelaViewBody += 			"<td><div id='condicao_de_pagamento_"+parseInt(id_pedido_pagamento)+"'></div></td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_pedido_pagamento_extorno-pedido_pagamento' style='color: green' data-id='"+id_pedido_pagamento+"' onclick=\"grade(this , 'pedido_pagamento', 'pedido_pagamento_extorno')\" title='Pedido Pagamento Extorno'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroPedido_pagamento += 	"<table class='table'>";
			telaCadastroPedido_pagamento += 		"<tr bgcolor='white'>";
			telaCadastroPedido_pagamento += 			"<td><b>Editar</b></td>";
			telaCadastroPedido_pagamento += 			"<td><b>Ativo</b></td>";
			telaCadastroPedido_pagamento += 			"<td><b>N°</b></td>";
			telaCadastroPedido_pagamento += 			"<td><b>Parcela Atual</b></td>";
			telaCadastroPedido_pagamento += 			"<td><b>Parcela Total</b></td>";
			telaCadastroPedido_pagamento += 			"<td><b>Valor Pago</b></td>";
			telaCadastroPedido_pagamento += 			"<td><b>Esta Pago?</b></td>";
			telaCadastroPedido_pagamento += 			"<td><b>Condição De Pagamento</b></td>";
			telaCadastroPedido_pagamento += 			"<td><b>Pedido Pagamento Extorno</b></td>";
			telaCadastroPedido_pagamento += 		"</tr>";
			telaCadastroPedido_pagamento +=		tabelaViewBody;
			telaCadastroPedido_pagamento += 	"</table>";
		}
		telaCadastroPedido_pagamento += "</div>";
		$("#conteudoPedido_pagamento").html(telaCadastroPedido_pagamento);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
		var botaoBoltarGrade = verificaGrade('pedido', 'pedido_pagamento', 'Pedido');
		$("#botaoVoltarGrade").html(botaoBoltarGrade);
	});
}