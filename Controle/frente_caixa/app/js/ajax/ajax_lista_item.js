
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_item();
});

function buscar_item(){
	
	var id_item = "";
	var descricao_item = "";
	var grupo_id = "";
	var data_atualizacao_item = "";
	var usuario_id = "";
	var bool_ativo_item = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroItem = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoItem").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_itemController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_item': true,
			'filtro': $("#pesquisa_item").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroItem += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroItem += "<br>";

			telaCadastroItem += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_item = subvetor[0];
				descricao_item = subvetor[1];
				grupo_id = subvetor[2];
				data_atualizacao_item = subvetor[3];
				usuario_id = subvetor[4];
				bool_ativo_item = subvetor[5];
				
				acumularFunctionId.push(id_item);
				acumularFunctionCampo.push(grupo_id+"+grupo");
				acumularFunctionId.push(id_item);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_item == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_item' style='color: #f0ad4e;' data-id='"+id_item+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_item+"'>";
				tabelaViewBody += 				"<a href='#!item' style='color: "+cor_ativo+"' data-id='"+id_item+"' onclick=\"excluir(this , 'item', "+bool_ativo_item+", 'item')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descricao_item+"</td>";
				tabelaViewBody += 			"<td><div id='grupo_"+parseInt(id_item)+"'></div></td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_item)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_item)+"'></div></td>";
				if($("#n_acs_item_unidade_medida_item").val() == 1 || $("#n_acs_item_unidade_medida_item").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_item_unidade_medida-item' style='color: green' data-id='"+id_item+"' onclick=\"grade(this , 'item', 'item_unidade_medida')\" title='Item Unidade Medida'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroItem += 	"<table class='table'>";
			telaCadastroItem += 		"<tr bgcolor='white'>";
			telaCadastroItem += 			"<td><b>Editar</b></td>";
			telaCadastroItem += 			"<td><b>Ativo</b></td>";
			telaCadastroItem += 			"<td><b>N°</b></td>";
			telaCadastroItem += 			"<td><b>Descrição</b></td>";
			telaCadastroItem += 			"<td><b>Grupo</b></td>";
			telaCadastroItem += 			"<td><b>Data Atualização</b></td>";
			telaCadastroItem += 			"<td><b>Usuário</b></td>";
			if($("#n_acs_item_unidade_medida_item").val() == 1 || $("#n_acs_item_unidade_medida_item").val() == "1") {
			telaCadastroItem += 			"<td><b>Item Unidade Medida</b></td>";
			}
			telaCadastroItem += 		"</tr>";
			telaCadastroItem +=		tabelaViewBody;
			telaCadastroItem += 	"</table>";
		}
		telaCadastroItem += "</div>";
		$("#conteudoItem").html(telaCadastroItem);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
