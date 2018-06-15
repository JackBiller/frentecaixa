
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_caixa();
});

function buscar_caixa(){
	
	var id_caixa = "";
	var descricao_caixa = "";
	var filial_id = "";
	var data_atualizacao_caixa = "";
	var usuario_id = "";
	var bool_ativo_caixa = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroCaixa = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoCaixa").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_caixaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_caixa': true,
			'filtro': $("#pesquisa_caixa").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroCaixa += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroCaixa += "<br>";

			telaCadastroCaixa += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_caixa = subvetor[0];
				descricao_caixa = subvetor[1];
				filial_id = subvetor[2];
				data_atualizacao_caixa = subvetor[3];
				usuario_id = subvetor[4];
				bool_ativo_caixa = subvetor[5];
				
				acumularFunctionId.push(id_caixa);
				acumularFunctionCampo.push(filial_id+"+filial");
				acumularFunctionId.push(id_caixa);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_caixa == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_caixa' style='color: #f0ad4e;' data-id='"+id_caixa+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_caixa+"'>";
				tabelaViewBody += 				"<a href='#!caixa' style='color: "+cor_ativo+"' data-id='"+id_caixa+"' onclick=\"excluir(this , 'caixa', "+bool_ativo_caixa+", 'caixa')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descricao_caixa+"</td>";
				tabelaViewBody += 			"<td><div id='filial_"+parseInt(id_caixa)+"'></div></td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_caixa)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_caixa)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroCaixa += 	"<table class='table'>";
			telaCadastroCaixa += 		"<tr bgcolor='white'>";
			telaCadastroCaixa += 			"<td><b>Editar</b></td>";
			telaCadastroCaixa += 			"<td><b>Ativo</b></td>";
			telaCadastroCaixa += 			"<td><b>N°</b></td>";
			telaCadastroCaixa += 			"<td><b>Descrição</b></td>";
			telaCadastroCaixa += 			"<td><b>Filial</b></td>";
			telaCadastroCaixa += 			"<td><b>Data Atualização</b></td>";
			telaCadastroCaixa += 			"<td><b>Usuário</b></td>";
			telaCadastroCaixa += 		"</tr>";
			telaCadastroCaixa +=		tabelaViewBody;
			telaCadastroCaixa += 	"</table>";
		}
		telaCadastroCaixa += "</div>";
		$("#conteudoCaixa").html(telaCadastroCaixa);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
