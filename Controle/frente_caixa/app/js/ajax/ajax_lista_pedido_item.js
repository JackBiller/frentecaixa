
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_pedido_item();
});

function buscar_pedido_item(){
	
	var id_pedido_item = "";
	var quantidade_pedido_item = "";
	var valor_unitario_pedido_item = "";
	var valor_total_pedido_item = "";
	var item_id = "";
	var item_unidade_medida_id = "";
	var pedido_id = "";
	var data_atualizacao_pedido_item = "";
	var usuario_id = "";
	var bool_ativo_pedido_item = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroPedido_item = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoPedido_item").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_pedido_itemController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido_item': true,
			'filtro': $("#pesquisa_pedido_item").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroPedido_item += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroPedido_item += "<br>";

			telaCadastroPedido_item += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_pedido_item = subvetor[0];
				quantidade_pedido_item = subvetor[1];
				valor_unitario_pedido_item = subvetor[2];
				valor_total_pedido_item = subvetor[3];
				item_id = subvetor[4];
				item_unidade_medida_id = subvetor[5];
				pedido_id = subvetor[6];
				data_atualizacao_pedido_item = subvetor[7];
				usuario_id = subvetor[8];
				bool_ativo_pedido_item = subvetor[9];
				
				acumularFunctionId.push(id_pedido_item);
				acumularFunctionCampo.push(item_id+"+item");
				acumularFunctionId.push(id_pedido_item);
				acumularFunctionCampo.push(item_unidade_medida_id+"+item_unidade_medida");

				if (bool_ativo_pedido_item == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_pedido_item' style='color: #f0ad4e;' data-id='"+id_pedido_item+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_pedido_item+"'>";
				tabelaViewBody += 				"<a href='#!pedido_item' style='color: "+cor_ativo+"' data-id='"+id_pedido_item+"' onclick=\"excluir(this , 'pedido_item', "+bool_ativo_pedido_item+", 'pedido_item')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+quantidade_pedido_item+"</td>";
				tabelaViewBody += 			"<td>"+valor_unitario_pedido_item+"</td>";
				tabelaViewBody += 			"<td>"+valor_total_pedido_item+"</td>";
				tabelaViewBody += 			"<td><div id='item_"+parseInt(id_pedido_item)+"'></div></td>";
				tabelaViewBody += 			"<td><div id='item_unidade_medida_"+parseInt(id_pedido_item)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroPedido_item += 	"<table class='table'>";
			telaCadastroPedido_item += 		"<tr bgcolor='white'>";
			telaCadastroPedido_item += 			"<td><b>Editar</b></td>";
			telaCadastroPedido_item += 			"<td><b>Ativo</b></td>";
			telaCadastroPedido_item += 			"<td><b>N°</b></td>";
			telaCadastroPedido_item += 			"<td><b>Quantidade</b></td>";
			telaCadastroPedido_item += 			"<td><b>Valor Unitário</b></td>";
			telaCadastroPedido_item += 			"<td><b>Valor Total</b></td>";
			telaCadastroPedido_item += 			"<td><b>Item</b></td>";
			telaCadastroPedido_item += 			"<td><b>Item Unidade Medida</b></td>";
			telaCadastroPedido_item += 		"</tr>";
			telaCadastroPedido_item +=		tabelaViewBody;
			telaCadastroPedido_item += 	"</table>";
		}
		telaCadastroPedido_item += "</div>";
		$("#conteudoPedido_item").html(telaCadastroPedido_item);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
