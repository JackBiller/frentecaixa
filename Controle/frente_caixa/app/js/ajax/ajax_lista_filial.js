
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_filial();
});

function buscar_filial(){
	
	var id_filial = "";
	var razao_social_filial = "";
	var cnpj_filial = "";
	var empresa_id = "";
	var data_atualizacao_filial = "";
	var usuario_id = "";
	var bool_ativo_filial = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroFilial = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoFilial").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_filialController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_filial': true,
			'filtro': $("#pesquisa_filial").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroFilial += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroFilial += "<br>";

			telaCadastroFilial += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_filial = subvetor[0];
				razao_social_filial = subvetor[1];
				cnpj_filial = subvetor[2];
				empresa_id = subvetor[3];
				data_atualizacao_filial = subvetor[4];
				usuario_id = subvetor[5];
				bool_ativo_filial = subvetor[6];
				
				acumularFunctionId.push(id_filial);
				acumularFunctionCampo.push(empresa_id+"+empresa");
				acumularFunctionId.push(id_filial);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_filial == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_filial' style='color: #f0ad4e;' data-id='"+id_filial+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_filial+"'>";
				tabelaViewBody += 				"<a href='#!filial' style='color: "+cor_ativo+"' data-id='"+id_filial+"' onclick=\"excluir(this , 'filial', "+bool_ativo_filial+", 'filial')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+razao_social_filial+"</td>";
				tabelaViewBody += 			"<td>"+cnpj_filial+"</td>";
				tabelaViewBody += 			"<td><div id='empresa_"+parseInt(id_filial)+"'></div></td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_filial)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_filial)+"'></div></td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroFilial += 	"<table class='table'>";
			telaCadastroFilial += 		"<tr bgcolor='white'>";
			telaCadastroFilial += 			"<td><b>Editar</b></td>";
			telaCadastroFilial += 			"<td><b>Ativo</b></td>";
			telaCadastroFilial += 			"<td><b>N°</b></td>";
			telaCadastroFilial += 			"<td><b>Razão Social</b></td>";
			telaCadastroFilial += 			"<td><b>Cnpj</b></td>";
			telaCadastroFilial += 			"<td><b>Empresa</b></td>";
			telaCadastroFilial += 			"<td><b>Data Atualização</b></td>";
			telaCadastroFilial += 			"<td><b>Usuário</b></td>";
			telaCadastroFilial += 		"</tr>";
			telaCadastroFilial +=		tabelaViewBody;
			telaCadastroFilial += 	"</table>";
		}
		telaCadastroFilial += "</div>";
		$("#conteudoFilial").html(telaCadastroFilial);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
