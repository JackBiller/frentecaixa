
$(document).ready(function(){
	zerarTabelaGrade();
	buscar_cliente_contato();
});

function buscar_cliente_contato(){
	
	var id_cliente_contato = "";
	var telefone_cliente_contato = "";
	var celular_cliente_contato = "";
	var email_cliente_contato = "";
	var cliente_id = "";
	var data_atualizacao_cliente_contato = "";
	var usuario_id = "";
	var bool_ativo_cliente_contato = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroCliente_contato = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	$("#conteudoCliente_contato").html("Carregando...");
	$.ajax({
		url:'app/controllers/funcoes_cliente_contatoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_cliente_contato': true,
			'filtro': $("#pesquisa_cliente_contato").val()
		}
	}).done( function(data){
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroCliente_contato += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroCliente_contato += "<br>";

			telaCadastroCliente_contato += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_cliente_contato = subvetor[0];
				telefone_cliente_contato = subvetor[1];
				celular_cliente_contato = subvetor[2];
				email_cliente_contato = subvetor[3];
				cliente_id = subvetor[4];
				data_atualizacao_cliente_contato = subvetor[5];
				usuario_id = subvetor[6];
				bool_ativo_cliente_contato = subvetor[7];
				
				acumularFunctionId.push(id_cliente_contato);
				acumularFunctionCampo.push(cliente_id+"+cliente");

				if (bool_ativo_cliente_contato == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_cliente_contato' style='color: #f0ad4e;' data-id='"+id_cliente_contato+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_cliente_contato+"'>";
				tabelaViewBody += 				"<a href='#!cliente_contato' style='color: "+cor_ativo+"' data-id='"+id_cliente_contato+"' onclick=\"excluir(this , 'cliente_contato', "+bool_ativo_cliente_contato+", 'cliente_contato')\">";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+telefone_cliente_contato+"</td>";
				tabelaViewBody += 			"<td>"+celular_cliente_contato+"</td>";
				tabelaViewBody += 			"<td>"+email_cliente_contato+"</td>";
				tabelaViewBody += 			"<td><div id='cliente_"+parseInt(id_cliente_contato)+"'></div></td>";
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_cliente_contato)+"</td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroCliente_contato += 	"<table class='table'>";
			telaCadastroCliente_contato += 		"<tr bgcolor='white'>";
			telaCadastroCliente_contato += 			"<td><b>Editar</b></td>";
			telaCadastroCliente_contato += 			"<td><b>Ativo</b></td>";
			telaCadastroCliente_contato += 			"<td><b>N°</b></td>";
			telaCadastroCliente_contato += 			"<td><b>Telefone</b></td>";
			telaCadastroCliente_contato += 			"<td><b>Celular</b></td>";
			telaCadastroCliente_contato += 			"<td><b>Email</b></td>";
			telaCadastroCliente_contato += 			"<td><b>Cliente</b></td>";
			telaCadastroCliente_contato += 			"<td><b>Data Atualização</b></td>";
			telaCadastroCliente_contato += 		"</tr>";
			telaCadastroCliente_contato +=		tabelaViewBody;
			telaCadastroCliente_contato += 	"</table>";
		}
		telaCadastroCliente_contato += "</div>";
		$("#conteudoCliente_contato").html(telaCadastroCliente_contato);
		for (var i = 0; i < acumularFunctionId.length; i++) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
	});
}
