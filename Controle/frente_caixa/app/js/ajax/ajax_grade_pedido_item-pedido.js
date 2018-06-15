
$(document).ready(function(){
	buscar_pedido_item();
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

	var grades = document.getElementsByName("grade");
	var id_tabela_primaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == "pedido" && $(grades[i]).data("g") == "pedido_item") {
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
		url:'app/controllers/funcoes_pedido_itemController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_pedido_item_grade': true,
			'filtro': $("#pesquisa_pedido_item").val(),
			'tabela': "pedido",
			'id': id_tabela_primaria
		}
	}).done( function(data){
		// _filtro_grade
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
				tabelaViewBody +=				"<a href='principal.php#!editar_grade_pedido_item-pedido' style='color: #f0ad4e;' data-id='"+id_pedido_item+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_pedido_item+"'>";
				tabelaViewBody += 				"<a href='#!grade_pedido_item-pedido' style='color: "+cor_ativo+"' data-id='"+id_pedido_item+"' onclick=\"excluir(this , 'pedido_item', "+bool_ativo_pedido_item+", 'grade_pedido_item-pedido')\" title='Excluir'>";
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
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
		var botaoBoltarGrade = verificaGrade('pedido', 'pedido_item', 'Pedido');
		$("#botaoVoltarGrade").html(botaoBoltarGrade);
	});
}