
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_operacoes_caixa();
});

function buscar_operacoes_caixa(){
	
	var id_operacoes_caixa = "";
	var descricao_operacoes_caixa = "";
	var data_atualizacao_operacoes_caixa = "";
	var usuario_id = "";
	var bool_ativo_operacoes_caixa = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroOperacoes_caixa = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoOperacoes_caixa").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_operacoes_caixaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_operacoes_caixa': true,
			'filtro': $("#pesquisa_operacoes_caixa").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroOperacoes_caixa += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroOperacoes_caixa += "<br>";

			telaCadastroOperacoes_caixa += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_operacoes_caixa = subvetor[0];
				descricao_operacoes_caixa = subvetor[1];
				data_atualizacao_operacoes_caixa = subvetor[2];
				usuario_id = subvetor[3];
				bool_ativo_operacoes_caixa = subvetor[4];
				
				acumularFunctionId.push(id_operacoes_caixa);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_operacoes_caixa == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_operacoes_caixa' style='color: #f0ad4e;' data-id='"+id_operacoes_caixa+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_operacoes_caixa+"'>";
				tabelaViewBody += 				"<a href='#!operacoes_caixa' style='color: "+cor_ativo+"' data-id='"+id_operacoes_caixa+"' onclick=\"excluir(this , 'operacoes_caixa', "+bool_ativo_operacoes_caixa+", 'operacoes_caixa')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descricao_operacoes_caixa+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_operacoes_caixa)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_operacoes_caixa)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroOperacoes_caixa += 	"<table class='table'>";
			telaCadastroOperacoes_caixa += 		"<tr bgcolor='white'>";
			telaCadastroOperacoes_caixa += 			"<td><b>Editar</b></td>";
			telaCadastroOperacoes_caixa += 			"<td><b>Ativo</b></td>";
			telaCadastroOperacoes_caixa += 			"<td><b>N°</b></td>";
			telaCadastroOperacoes_caixa += 			"<td><b>Descrição</b></td>";
			telaCadastroOperacoes_caixa += 			"<td><b>Data Atualização</b></td>";
			telaCadastroOperacoes_caixa += 			"<td><b>Usuário</b></td>";
			telaCadastroOperacoes_caixa += 		"</tr>";
			telaCadastroOperacoes_caixa +=		tabelaViewBody;
			telaCadastroOperacoes_caixa += 	"</table>";
		}
		telaCadastroOperacoes_caixa += "</div>";
		$("#conteudoOperacoes_caixa").html(telaCadastroOperacoes_caixa);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
