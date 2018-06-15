
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_grupo();
});

function buscar_grupo(){
	
	var id_grupo = "";
	var descricao_grupo = "";
	var imagem_grupo = "";
	var filial_id = "";
	var data_atualizacao_grupo = "";
	var usuario_id = "";
	var bool_ativo_grupo = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroGrupo = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoGrupo").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_grupoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_grupo': true,
			'filtro': $("#pesquisa_grupo").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroGrupo += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroGrupo += "<br>";

			telaCadastroGrupo += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_grupo = subvetor[0];
				descricao_grupo = subvetor[1];
				imagem_grupo = subvetor[2];
				filial_id = subvetor[3];
				data_atualizacao_grupo = subvetor[4];
				usuario_id = subvetor[5];
				bool_ativo_grupo = subvetor[6];
				
				acumularFunctionId.push(id_grupo);
				acumularFunctionCampo.push(filial_id+"+filial");
				acumularFunctionId.push(id_grupo);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_grupo == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_grupo' style='color: #f0ad4e;' data-id='"+id_grupo+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_grupo+"'>";
				tabelaViewBody += 				"<a href='#!grupo' style='color: "+cor_ativo+"' data-id='"+id_grupo+"' onclick=\"excluir(this , 'grupo', "+bool_ativo_grupo+", 'grupo')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descricao_grupo+"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='app/upload/img/"+imagem_grupo+"' target='_blank'>";
				tabelaViewBody += 					"<img src='app/upload/img/"+imagem_grupo+"' style='max-height: 500px; max-width: 15%;'>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody += 			"</td>";
				tabelaViewBody += 			"<td><div id='filial_"+parseInt(id_grupo)+"'></div></td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_grupo)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_grupo)+"'></div></td>";
				if($("#n_acs_item_grupo").val() == 1 || $("#n_acs_item_grupo").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_item-grupo' style='color: green' data-id='"+id_grupo+"' onclick=\"grade(this , 'grupo', 'item')\" title='Item'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroGrupo += 	"<table class='table'>";
			telaCadastroGrupo += 		"<tr bgcolor='white'>";
			telaCadastroGrupo += 			"<td><b>Editar</b></td>";
			telaCadastroGrupo += 			"<td><b>Ativo</b></td>";
			telaCadastroGrupo += 			"<td><b>N°</b></td>";
			telaCadastroGrupo += 			"<td><b>Descrição</b></td>";
			telaCadastroGrupo += 			"<td><b>Imagem</b></td>";
			telaCadastroGrupo += 			"<td><b>Filial</b></td>";
			telaCadastroGrupo += 			"<td><b>Data Atualização</b></td>";
			telaCadastroGrupo += 			"<td><b>Usuário</b></td>";
			if($("#n_acs_item_grupo").val() == 1 || $("#n_acs_item_grupo").val() == "1") {
			telaCadastroGrupo += 			"<td><b>Item</b></td>";
			}
			telaCadastroGrupo += 		"</tr>";
			telaCadastroGrupo +=		tabelaViewBody;
			telaCadastroGrupo += 	"</table>";
		}
		telaCadastroGrupo += "</div>";
		$("#conteudoGrupo").html(telaCadastroGrupo);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
