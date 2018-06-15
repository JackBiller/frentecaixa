
$(document).ready(function(){
	buscar_caixa_operacao();
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

	var grades = document.getElementsByName("grade");
	var id_tabela_primaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == "caixa_movimentacao" && $(grades[i]).data("g") == "caixa_operacao") {
			id_tabela_primaria = $(grades[i]).val();
			if (id_tabela_primaria == 0)
				window.location.assign("principal.php#!caixa_movimentacao");
			else {
				$.ajax({
					url:'app/controllers/funcoes_caixa_movimentacaoController.php',
					type: 'POST',
					dataType: 'text',
					data: {
						'pequisa_caixa_movimentacao_id': true,
						'id': id_tabela_primaria
					}
				}).done( function(data){
					// console.log("funcoes_caixa_movimentacaoController: "+data);
					vetor = data.split("{,}");
					document.getElementById('nomeCaixa_movimentacao').innerHTML = vetor[1];
				});
			}
		}
	}


	$.ajax({
		url:'app/controllers/funcoes_caixa_operacaoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_caixa_operacao_grade': true,
			'filtro': $("#pesquisa_caixa_operacao").val(),
			'tabela': "caixa_movimentacao",
			'id': id_tabela_primaria
		}
	}).done( function(data){
		// _filtro_grade
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
				acumularFunctionCampo.push(operacoes_caixa_id+"+operacoes_caixa");
				acumularFunctionId.push(id_caixa_operacao);
				acumularFunctionCampo.push(usuario_id+"+usuario");

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
				tabelaViewBody +=				"<a href='principal.php#!editar_grade_caixa_operacao-caixa_movimentacao' style='color: #f0ad4e;' data-id='"+id_caixa_operacao+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_caixa_operacao+"'>";
				tabelaViewBody += 				"<a href='#!grade_caixa_operacao-caixa_movimentacao' style='color: "+cor_ativo+"' data-id='"+id_caixa_operacao+"' onclick=\"excluir(this , 'caixa_operacao', "+bool_ativo_caixa_operacao+", 'grade_caixa_operacao-caixa_movimentacao')\" title='Excluir'>";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+valor_caixa_operacao+"</td>";
				tabelaViewBody += 			"<td><div id='operacoes_caixa_"+parseInt(id_caixa_operacao)+"'></div></td>";
				tabelaViewBody += 			"<td>"+formatarData(data_emissao_caixa_operacao)+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_caixa_operacao)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_caixa_operacao)+"'></div></td>";
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
			telaCadastroCaixa_operacao += 			"<td><b>Operações Caixa</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>Data Emissao</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>Data Atualização</b></td>";
			telaCadastroCaixa_operacao += 			"<td><b>Usuário</b></td>";
			telaCadastroCaixa_operacao += 		"</tr>";
			telaCadastroCaixa_operacao +=		tabelaViewBody;
			telaCadastroCaixa_operacao += 	"</table>";
		}
		telaCadastroCaixa_operacao += "</div>";
		$("#conteudoCaixa_operacao").html(telaCadastroCaixa_operacao);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
		var botaoBoltarGrade = verificaGrade('caixa_movimentacao', 'caixa_operacao', 'Caixa Movimentacao');
		$("#botaoVoltarGrade").html(botaoBoltarGrade);
	});
}