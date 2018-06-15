
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_caixa_operacao();
});

function buscar_caixa_operacao(){
	
	var id_caixa_operacao = "";
	var valor_caixa_operacao = "";
	var caixa_movimentacao_id = "";
	var operacoes_caixa_id = "";
	var data_emissao_caixa_operacao = "";
	var data_atualizacao_caixa_operacao = "";
	var usuario_id = "";
	var bool_ativo_caixa_operacao = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroCaixa_operacao = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoCaixa_operacao").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_caixa_operacaoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_caixa_operacao': true,
			'filtro': $("#pesquisa_caixa_operacao").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroCaixa_operacao += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroCaixa_operacao += "<br>";

			telaCadastroCaixa_operacao += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_caixa_operacao = subvetor[0];
				valor_caixa_operacao = subvetor[1];
				caixa_movimentacao_id = subvetor[2];
				operacoes_caixa_id = subvetor[3];
				data_emissao_caixa_operacao = subvetor[4];
				data_atualizacao_caixa_operacao = subvetor[5];
				usuario_id = subvetor[6];
				bool_ativo_caixa_operacao = subvetor[7];
				
				acumularFunctionId.push(id_caixa_operacao);
				acumularFunctionCampo.push(caixa_movimentacao_id+"+caixa_movimentacao");
				acumularFunctionId.push(id_caixa_operacao);
				acumularFunctionCampo.push(operacoes_caixa_id+"+operacoes_caixa");

				if (bool_ativo_caixa_operacao == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_caixa_operacao' style='color: #f0ad4e;' data-id='"+id_caixa_operacao+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_caixa_operacao+"'>";
				tabelaViewBody += 				"<a href='#!caixa_operacao' style='color: "+cor_ativo+"' data-id='"+id_caixa_operacao+"' onclick=\"excluir(this , 'caixa_operacao', "+bool_ativo_caixa_operacao+", 'caixa_operacao')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+valor_caixa_operacao+"</td>";
				tabelaViewBody += 			"<td><div id='caixa_movimentacao_"+parseInt(id_caixa_operacao)+"'></div></td>";
				tabelaViewBody += 			"<td><div id='operacoes_caixa_"+parseInt(id_caixa_operacao)+"'></div></td>";
				tabelaViewBody += 			"<td>"+formatarData(data_emissao_caixa_operacao)+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_caixa_operacao)+"</td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroCaixa_operacao += 	"<table class='table'>";
			telaCadastroCaixa_operacao += 		"<tr bgcolor='white'>";
			telaCadastroCaixa_operacao += 			"<td><b>Editar</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>Ativo</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>N°</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>Valor</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>Caixa Movimentacao</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>Operações Caixa</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>Data Emissao</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>Data Atualização</b></td>";
			telaCadastroCaixa_operacao += 		"</tr>";
			telaCadastroCaixa_operacao +=		tabelaViewBody;
			telaCadastroCaixa_operacao += 	"</table>";
		}
		telaCadastroCaixa_operacao += "</div>";
		$("#conteudoCaixa_operacao").html(telaCadastroCaixa_operacao);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
