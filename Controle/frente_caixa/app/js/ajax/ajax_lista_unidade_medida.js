
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_unidade_medida();
});

function buscar_unidade_medida(){
	
	var id_unidade_medida = "";
	var descricao_unidade_medida = "";
	var sigla_unidade_medida = "";
	var data_atualizacao_unidade_medida = "";
	var usuario_id = "";
	var bool_ativo_unidade_medida = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroUnidade_medida = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoUnidade_medida").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_unidade_medidaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_unidade_medida': true,
			'filtro': $("#pesquisa_unidade_medida").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroUnidade_medida += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroUnidade_medida += "<br>";

			telaCadastroUnidade_medida += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_unidade_medida = subvetor[0];
				descricao_unidade_medida = subvetor[1];
				sigla_unidade_medida = subvetor[2];
				data_atualizacao_unidade_medida = subvetor[3];
				usuario_id = subvetor[4];
				bool_ativo_unidade_medida = subvetor[5];
				
				acumularFunctionId.push(id_unidade_medida);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_unidade_medida == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_unidade_medida' style='color: #f0ad4e;' data-id='"+id_unidade_medida+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_unidade_medida+"'>";
				tabelaViewBody += 				"<a href='#!unidade_medida' style='color: "+cor_ativo+"' data-id='"+id_unidade_medida+"' onclick=\"excluir(this , 'unidade_medida', "+bool_ativo_unidade_medida+", 'unidade_medida')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descricao_unidade_medida+"</td>";
				tabelaViewBody += 			"<td>"+sigla_unidade_medida+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_unidade_medida)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_unidade_medida)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroUnidade_medida += 	"<table class='table'>";
			telaCadastroUnidade_medida += 		"<tr bgcolor='white'>";
			telaCadastroUnidade_medida += 			"<td><b>Editar</b></td>";
			telaCadastroUnidade_medida += 			"<td><b>Ativo</b></td>";
			telaCadastroUnidade_medida += 			"<td><b>N°</b></td>";
			telaCadastroUnidade_medida += 			"<td><b>Descrição</b></td>";
			telaCadastroUnidade_medida += 			"<td><b>Sigla</b></td>";
			telaCadastroUnidade_medida += 			"<td><b>Data Atualização</b></td>";
			telaCadastroUnidade_medida += 			"<td><b>Usuário</b></td>";
			telaCadastroUnidade_medida += 		"</tr>";
			telaCadastroUnidade_medida +=		tabelaViewBody;
			telaCadastroUnidade_medida += 	"</table>";
		}
		telaCadastroUnidade_medida += "</div>";
		$("#conteudoUnidade_medida").html(telaCadastroUnidade_medida);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
