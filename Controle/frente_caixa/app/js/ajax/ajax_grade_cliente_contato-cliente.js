
$(document).ready(function(){
	buscar_cliente_contato();
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

	var grades = document.getElementsByName("grade");
	var id_tabela_primaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == "cliente" && $(grades[i]).data("g") == "cliente_contato") {
			id_tabela_primaria = $(grades[i]).val();
			if (id_tabela_primaria == 0)
				window.location.assign("principal.php#!cliente");
			else {
				$.ajax({
					url:'app/controllers/funcoes_clienteController.php',
					type: 'POST',
					dataType: 'text',
					data: {
						'pequisa_cliente_id': true,
						'id': id_tabela_primaria
					}
				}).done( function(data){
					// console.log("funcoes_clienteController: "+data);
					vetor = data.split("{,}");
					document.getElementById('nomeCliente').innerHTML = vetor[1];
				});
			}
		}
	}


	$.ajax({
		url:'app/controllers/funcoes_cliente_contatoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_cliente_contato_grade': true,
			'filtro': $("#pesquisa_cliente_contato").val(),
			'tabela': "cliente",
			'id': id_tabela_primaria
		}
	}).done( function(data){
		// _filtro_grade
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
				acumularFunctionCampo.push(usuario_id+"+usuario");

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
				tabelaViewBody +=				"<a href='principal.php#!editar_grade_cliente_contato-cliente' style='color: #f0ad4e;' data-id='"+id_cliente_contato+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_cliente_contato+"'>";
				tabelaViewBody += 				"<a href='#!grade_cliente_contato-cliente' style='color: "+cor_ativo+"' data-id='"+id_cliente_contato+"' onclick=\"excluir(this , 'cliente_contato', "+bool_ativo_cliente_contato+", 'grade_cliente_contato-cliente')\" title='Excluir'>";
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
				tabelaViewBody += 			"<td>"+formatarData(data_atualizacao_cliente_contato)+"</td>";
				tabelaViewBody += 			"<td><div id='usuario_"+parseInt(id_cliente_contato)+"'></div></td>";
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
			telaCadastroCliente_contato += 			"<td><b>Data Atualização</b></td>";
			telaCadastroCliente_contato += 			"<td><b>Usuário</b></td>";
			telaCadastroCliente_contato += 		"</tr>";
			telaCadastroCliente_contato +=		tabelaViewBody;
			telaCadastroCliente_contato += 	"</table>";
		}
		telaCadastroCliente_contato += "</div>";
		$("#conteudoCliente_contato").html(telaCadastroCliente_contato);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
		var botaoBoltarGrade = verificaGrade('cliente', 'cliente_contato', 'Cliente');
		$("#botaoVoltarGrade").html(botaoBoltarGrade);
	});
}