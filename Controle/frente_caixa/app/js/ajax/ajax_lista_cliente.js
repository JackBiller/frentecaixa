
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_cliente();
});

function buscar_cliente(){
	
	var id_cliente = "";
	var nome_cliente = "";
	var data_atualizacao_cliente = "";
	var usuario_id = "";
	var bool_ativo_cliente = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroCliente = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoCliente").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_clienteController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_cliente': true,
			'filtro': $("#pesquisa_cliente").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroCliente += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroCliente += "<br>";

			telaCadastroCliente += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_cliente = subvetor[0];
				nome_cliente = subvetor[1];
				data_atualizacao_cliente = subvetor[2];
				usuario_id = subvetor[3];
				bool_ativo_cliente = subvetor[4];
				
				acumularFunctionId.push(id_cliente);
				acumularFunctionCampo.push(usuario_id+"+usuario");

				if (bool_ativo_cliente == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_cliente' style='color: #f0ad4e;' data-id='"+id_cliente+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_cliente+"'>";
				tabelaViewBody += 				"<a href='#!cliente' style='color: "+cor_ativo+"' data-id='"+id_cliente+"' onclick=\"excluir(this , 'cliente', "+bool_ativo_cliente+", 'cliente')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+nome_cliente+"</td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_cliente)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_cliente)+"'></div></td>";
				if($("#n_acs_cliente_contato_cliente").val() == 1 || $("#n_acs_cliente_contato_cliente").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_cliente_contato-cliente' style='color: green' data-id='"+id_cliente+"' onclick=\"grade(this , 'cliente', 'cliente_contato')\" title='Cliente Contato'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
				if($("#n_acs_cliente_endereco_cliente").val() == 1 || $("#n_acs_cliente_endereco_cliente").val() == "1") {
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<a href='principal.php#!grade_cliente_endereco-cliente' style='color: green' data-id='"+id_cliente+"' onclick=\"grade(this , 'cliente', 'cliente_endereco')\" title='Cliente Endereço'>";
				tabelaViewBody += 					"<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
				tabelaViewBody +=  				"</a>";
				tabelaViewBody +=  			"</td>";
				}
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroCliente += 	"<table class='table'>";
			telaCadastroCliente += 		"<tr bgcolor='white'>";
			telaCadastroCliente += 			"<td><b>Editar</b></td>";
			telaCadastroCliente += 			"<td><b>Ativo</b></td>";
			telaCadastroCliente += 			"<td><b>N°</b></td>";
			telaCadastroCliente += 			"<td><b>Nome</b></td>";
			telaCadastroCliente += 			"<td><b>Data Atualização</b></td>";
			telaCadastroCliente += 			"<td><b>Usuário</b></td>";
			if($("#n_acs_cliente_contato_cliente").val() == 1 || $("#n_acs_cliente_contato_cliente").val() == "1") {
			telaCadastroCliente += 			"<td><b>Cliente Contato</b></td>";
			}
			if($("#n_acs_cliente_endereco_cliente").val() == 1 || $("#n_acs_cliente_endereco_cliente").val() == "1") {
			telaCadastroCliente += 			"<td><b>Cliente Endereço</b></td>";
			}
			telaCadastroCliente += 		"</tr>";
			telaCadastroCliente +=		tabelaViewBody;
			telaCadastroCliente += 	"</table>";
		}
		telaCadastroCliente += "</div>";
		$("#conteudoCliente").html(telaCadastroCliente);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
