
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_pedido();
});

function buscar_pedido(){
	
	var id_pedido = "";
	var documento_pedido = "";
	var total_pedido = "";
	var emissao_pedido = "";
	var cliente_id = "";
	var nome_cliente_pedido = "";
	var bool_finalizado_pedido = "";
	var filial_id = "";
	var data_atualizacao_pedido = "";
	var usuario_id = "";
	var bool_ativo_pedido = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroPedido = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoPedido").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_pedidoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido': true,
			'filtro': $("#pesquisa_pedido").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroPedido += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroPedido += "<br>";

			telaCadastroPedido += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_pedido = subvetor[0];
				documento_pedido = subvetor[1];
				total_pedido = subvetor[2];
				emissao_pedido = subvetor[3];
				cliente_id = subvetor[4];
				nome_cliente_pedido = subvetor[5];
				bool_finalizado_pedido = subvetor[6];
				filial_id = subvetor[7];
				data_atualizacao_pedido = subvetor[8];
				usuario_id = subvetor[9];
				bool_ativo_pedido = subvetor[10];
				
				acumularFunctionId.push(id_pedido);
				acumularFunctionCampo.push(cliente_id+"+cliente");

				if (bool_ativo_pedido == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_pedido' style='color: #f0ad4e;' data-id='"+id_pedido+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_pedido+"'>";
				tabelaViewBody += 				"<a href='#!pedido' style='color: "+cor_ativo+"' data-id='"+id_pedido+"' onclick=\"excluir(this , 'pedido', "+bool_ativo_pedido+", 'pedido')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+documento_pedido+"</td>";
				tabelaViewBody += 			"<td>"+total_pedido+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(emissao_pedido)+"</td>";
				tabelaViewBody += 			"<td><div id='cliente_"+parseInt(id_pedido)+"'></div></td>";
				tabelaViewBody += 			"<td>"+nome_cliente_pedido+"</td>";
				if($("#n_acs_pedido_item_pedido").val() == 1 || $("#n_acs_pedido_item_pedido").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_pedido_item-pedido' style='color: green' data-id='"+id_pedido+"' onclick=\"grade(this , 'pedido', 'pedido_item')\" title='Pedido Item'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
				if($("#n_acs_pedido_pagamento_pedido").val() == 1 || $("#n_acs_pedido_pagamento_pedido").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_pedido_pagamento-pedido' style='color: green' data-id='"+id_pedido+"' onclick=\"grade(this , 'pedido', 'pedido_pagamento')\" title='Pedido Pagamento'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroPedido += 	"<table class='table'>";
			telaCadastroPedido += 		"<tr bgcolor='white'>";
			telaCadastroPedido += 			"<td><b>Editar</b></td>";
			telaCadastroPedido += 			"<td><b>Ativo</b></td>";
			telaCadastroPedido += 			"<td><b>N°</b></td>";
			telaCadastroPedido += 			"<td><b>Documento</b></td>";
			telaCadastroPedido += 			"<td><b>Total</b></td>";
			telaCadastroPedido += 			"<td><b>Emissao</b></td>";
			telaCadastroPedido += 			"<td><b>Cliente</b></td>";
			telaCadastroPedido += 			"<td><b>Nome Cliente</b></td>";
			if($("#n_acs_pedido_item_pedido").val() == 1 || $("#n_acs_pedido_item_pedido").val() == "1") {
			telaCadastroPedido += 			"<td><b>Pedido Item</b></td>";
			}
			if($("#n_acs_pedido_pagamento_pedido").val() == 1 || $("#n_acs_pedido_pagamento_pedido").val() == "1") {
			telaCadastroPedido += 			"<td><b>Pedido Pagamento</b></td>";
			}
			telaCadastroPedido += 		"</tr>";
			telaCadastroPedido +=		tabelaViewBody;
			telaCadastroPedido += 	"</table>";
		}
		telaCadastroPedido += "</div>";
		$("#conteudoPedido").html(telaCadastroPedido);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
