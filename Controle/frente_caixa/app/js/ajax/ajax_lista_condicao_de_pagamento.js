
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_condicao_de_pagamento();
});

function buscar_condicao_de_pagamento(){
	
	var id_condicao_de_pagamento = "";
	var descricao_condicao_de_pagamento = "";
	var data_atualizacao_condicao_de_pagamento = "";
	var usuario_id = "";
	var bool_ativo_condicao_de_pagamento = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroCondicao_de_pagamento = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoCondicao_de_pagamento").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_condicao_de_pagamentoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_condicao_de_pagamento': true,
			'filtro': $("#pesquisa_condicao_de_pagamento").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroCondicao_de_pagamento += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroCondicao_de_pagamento += "<br>";

			telaCadastroCondicao_de_pagamento += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_condicao_de_pagamento = subvetor[0];
				descricao_condicao_de_pagamento = subvetor[1];
				data_atualizacao_condicao_de_pagamento = subvetor[2];
				usuario_id = subvetor[3];
				bool_ativo_condicao_de_pagamento = subvetor[4];
				
				acumularFunctionId.push(id_condicao_de_pagamento);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_condicao_de_pagamento == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_condicao_de_pagamento' style='color: #f0ad4e;' data-id='"+id_condicao_de_pagamento+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_condicao_de_pagamento+"'>";
				tabelaViewBody += 				"<a href='#!condicao_de_pagamento' style='color: "+cor_ativo+"' data-id='"+id_condicao_de_pagamento+"' onclick=\"excluir(this , 'condicao_de_pagamento', "+bool_ativo_condicao_de_pagamento+", 'condicao_de_pagamento')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+descricao_condicao_de_pagamento+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_condicao_de_pagamento)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_condicao_de_pagamento)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroCondicao_de_pagamento += 	"<table class='table'>";
			telaCadastroCondicao_de_pagamento += 		"<tr bgcolor='white'>";
			telaCadastroCondicao_de_pagamento += 			"<td><b>Editar</b></td>";
			telaCadastroCondicao_de_pagamento += 			"<td><b>Ativo</b></td>";
			telaCadastroCondicao_de_pagamento += 			"<td><b>N°</b></td>";
			telaCadastroCondicao_de_pagamento += 			"<td><b>Descrição</b></td>";
			telaCadastroCondicao_de_pagamento += 			"<td><b>Data Atualização</b></td>";
			telaCadastroCondicao_de_pagamento += 			"<td><b>Usuário</b></td>";
			telaCadastroCondicao_de_pagamento += 		"</tr>";
			telaCadastroCondicao_de_pagamento +=		tabelaViewBody;
			telaCadastroCondicao_de_pagamento += 	"</table>";
		}
		telaCadastroCondicao_de_pagamento += "</div>";
		$("#conteudoCondicao_de_pagamento").html(telaCadastroCondicao_de_pagamento);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
