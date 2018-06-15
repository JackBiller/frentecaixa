
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_empresa();
});

function buscar_empresa(){
	
	var id_empresa = "";
	var razao_social_empresa = "";
	var data_atualizacao_empresa = "";
	var usuario_id = "";
	var bool_ativo_empresa = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroEmpresa = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoEmpresa").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_empresaController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_empresa': true,
			'filtro': $("#pesquisa_empresa").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroEmpresa += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroEmpresa += "<br>";

			telaCadastroEmpresa += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_empresa = subvetor[0];
				razao_social_empresa = subvetor[1];
				data_atualizacao_empresa = subvetor[2];
				usuario_id = subvetor[3];
				bool_ativo_empresa = subvetor[4];
				
				acumularFunctionId.push(id_empresa);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_empresa == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_empresa' style='color: #f0ad4e;' data-id='"+id_empresa+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_empresa+"'>";
				tabelaViewBody += 				"<a href='#!empresa' style='color: "+cor_ativo+"' data-id='"+id_empresa+"' onclick=\"excluir(this , 'empresa', "+bool_ativo_empresa+", 'empresa')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+razao_social_empresa+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_empresa)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_empresa)+"'></div></td>";
				if($("#n_acs_filial_empresa").val() == 1 || $("#n_acs_filial_empresa").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_filial-empresa' style='color: green' data-id='"+id_empresa+"' onclick=\"grade(this , 'empresa', 'filial')\" title='Filial'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroEmpresa += 	"<table class='table'>";
			telaCadastroEmpresa += 		"<tr bgcolor='white'>";
			telaCadastroEmpresa += 			"<td><b>Editar</b></td>";
			telaCadastroEmpresa += 			"<td><b>Ativo</b></td>";
			telaCadastroEmpresa += 			"<td><b>N°</b></td>";
			telaCadastroEmpresa += 			"<td><b>Razão Social</b></td>";
			telaCadastroEmpresa += 			"<td><b>Data Atualização</b></td>";
			telaCadastroEmpresa += 			"<td><b>Usuário</b></td>";
			if($("#n_acs_filial_empresa").val() == 1 || $("#n_acs_filial_empresa").val() == "1") {
			telaCadastroEmpresa += 			"<td><b>Filial</b></td>";
			}
			telaCadastroEmpresa += 		"</tr>";
			telaCadastroEmpresa +=		tabelaViewBody;
			telaCadastroEmpresa += 	"</table>";
		}
		telaCadastroEmpresa += "</div>";
		$("#conteudoEmpresa").html(telaCadastroEmpresa);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
