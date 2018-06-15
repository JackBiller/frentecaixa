
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_pedido_pagamento();
});

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

	$("#conteudoPedido_pagamento").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_pedido_pagamentoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido_pagamento': true,
			'filtro': $("#pesquisa_pedido_pagamento").val()
		}
	}).done( function(data){
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
				acumularFunctionCampo.push(pedido_id+"+pedido");

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
				tabelaViewBody +=				"<a href='principal.php#!editar_pedido_pagamento' style='color: #f0ad4e;' data-id='"+id_pedido_pagamento+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_pedido_pagamento+"'>";
				tabelaViewBody += 				"<a href='#!pedido_pagamento' style='color: "+cor_ativo+"' data-id='"+id_pedido_pagamento+"' onclick=\"excluir(this , 'pedido_pagamento', "+bool_ativo_pedido_pagamento+", 'pedido_pagamento')\">";
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
				tabelaViewBody += 			"<td><div id='pedido_"+parseInt(id_pedido_pagamento)+"'></div></td>";
				if($("#n_acs_pedido_pagamento_extorno_pedido_pagamento").val() == 1 || $("#n_acs_pedido_pagamento_extorno_pedido_pagamento").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_pedido_pagamento_extorno-pedido_pagamento' style='color: green' data-id='"+id_pedido_pagamento+"' onclick=\"grade(this , 'pedido_pagamento', 'pedido_pagamento_extorno')\" title='Pedido Pagamento Extorno'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
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
			telaCadastroPedido_pagamento += 			"<td><b>Pedido</b></td>";
			if($("#n_acs_pedido_pagamento_extorno_pedido_pagamento").val() == 1 || $("#n_acs_pedido_pagamento_extorno_pedido_pagamento").val() == "1") {
			telaCadastroPedido_pagamento += 			"<td><b>Pedido Pagamento Extorno</b></td>";
			}
			telaCadastroPedido_pagamento += 		"</tr>";
			telaCadastroPedido_pagamento +=		tabelaViewBody;
			telaCadastroPedido_pagamento += 	"</table>";
		}
		telaCadastroPedido_pagamento += "</div>";
		$("#conteudoPedido_pagamento").html(telaCadastroPedido_pagamento);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
