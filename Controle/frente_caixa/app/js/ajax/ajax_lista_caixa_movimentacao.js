
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_caixa_movimentacao();
});

function buscar_caixa_movimentacao(){
	
	var id_caixa_movimentacao = "";
	var valor_abertura_caixa_movimentacao = "";
	var valor_fechamento_caixa_movimentacao = "";
	var data_abertura_caixa_movimentacao = "";
	var data_fechamento_caixa_movimentacao = "";
	var caixa_id = "";
	var data_atualizacao_caixa_movimentacao = "";
	var usuario_id = "";
	var bool_ativo_caixa_movimentacao = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroCaixa_movimentacao = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoCaixa_movimentacao").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_caixa_movimentacaoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_caixa_movimentacao': true,
			'filtro': $("#pesquisa_caixa_movimentacao").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroCaixa_movimentacao += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroCaixa_movimentacao += "<br>";

			telaCadastroCaixa_movimentacao += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_caixa_movimentacao = subvetor[0];
				valor_abertura_caixa_movimentacao = subvetor[1];
				valor_fechamento_caixa_movimentacao = subvetor[2];
				data_abertura_caixa_movimentacao = subvetor[3];
				data_fechamento_caixa_movimentacao = subvetor[4];
				caixa_id = subvetor[5];
				data_atualizacao_caixa_movimentacao = subvetor[6];
				usuario_id = subvetor[7];
				bool_ativo_caixa_movimentacao = subvetor[8];
				
				acumularFunctionId.push(id_caixa_movimentacao);
				acumularFunctionCampo.push(caixa_id+"+caixa");

				if (bool_ativo_caixa_movimentacao == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_caixa_movimentacao' style='color: #f0ad4e;' data-id='"+id_caixa_movimentacao+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_caixa_movimentacao+"'>";
				tabelaViewBody += 				"<a href='#!caixa_movimentacao' style='color: "+cor_ativo+"' data-id='"+id_caixa_movimentacao+"' onclick=\"excluir(this , 'caixa_movimentacao', "+bool_ativo_caixa_movimentacao+", 'caixa_movimentacao')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+valor_abertura_caixa_movimentacao+"</td>";
				tabelaViewBody += 			"<td>"+valor_fechamento_caixa_movimentacao+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_abertura_caixa_movimentacao)+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_fechamento_caixa_movimentacao)+"</td>";
				tabelaViewBody += 			"<td><div id='caixa_"+parseInt(id_caixa_movimentacao)+"'></div></td>";
				if($("#n_acs_caixa_operacao_caixa_movimentacao").val() == 1 || $("#n_acs_caixa_operacao_caixa_movimentacao").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_caixa_operacao-caixa_movimentacao' style='color: green' data-id='"+id_caixa_movimentacao+"' onclick=\"grade(this , 'caixa_movimentacao', 'caixa_operacao')\" title='Caixa Operação'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroCaixa_movimentacao += 	"<table class='table'>";
			telaCadastroCaixa_movimentacao += 		"<tr bgcolor='white'>";
			telaCadastroCaixa_movimentacao += 			"<td><b>Editar</b></td>";
			telaCadastroCaixa_movimentacao += 			"<td><b>Ativo</b></td>";
			telaCadastroCaixa_movimentacao += 			"<td><b>N°</b></td>";
			telaCadastroCaixa_movimentacao += 			"<td><b>Valor Abertura</b></td>";
			telaCadastroCaixa_movimentacao += 			"<td><b>Valor Fechamento</b></td>";
			telaCadastroCaixa_movimentacao += 			"<td><b>Data Abertura</b></td>";
			telaCadastroCaixa_movimentacao += 			"<td><b>Data Fechamento</b></td>";
			telaCadastroCaixa_movimentacao += 			"<td><b>Caixa</b></td>";
			if($("#n_acs_caixa_operacao_caixa_movimentacao").val() == 1 || $("#n_acs_caixa_operacao_caixa_movimentacao").val() == "1") {
			telaCadastroCaixa_movimentacao += 			"<td><b>Caixa Operação</b></td>";
			}
			telaCadastroCaixa_movimentacao += 		"</tr>";
			telaCadastroCaixa_movimentacao +=		tabelaViewBody;
			telaCadastroCaixa_movimentacao += 	"</table>";
		}
		telaCadastroCaixa_movimentacao += "</div>";
		$("#conteudoCaixa_movimentacao").html(telaCadastroCaixa_movimentacao);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
