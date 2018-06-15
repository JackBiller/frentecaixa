
$(document).ready(function(){
	buscar_cliente_endereco();
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



function buscar_cliente_endereco(){
	
	var id_cliente_endereco = "";
	var endereco_cliente_endereco = "";
	var numero_cliente_endereco = "";
	var complemento_cliente_endereco = "";
	var bairro_cliente_endereco = "";
	var cidade_cliente_endereco = "";
	var estado_id = "";
	var cliente_id = "";
	var data_atualizacao_cliente_endereco = "";
	var usuario_id = "";
	var bool_ativo_cliente_endereco = "";

	var acumularFunctionId = [];
	var acumularFunctionCampo = [];
	var desabilitar = "";
	var icone_ativo = "";
	var cor_ativo = "";
	var telaCadastroCliente_endereco = "";
	var valorAtivo = 0;
	var tabela_cliente = "";
	var tabelaViewBody = "";
	var numeroRegAtual = 1;
	var simOUnao = "";
	var accesskeyEditar = " accesskey='w'";

	var grades = document.getElementsByName("grade");
	var id_tabela_primaria = 0;
	for (var i = grades.length - 1; i >= 0; i--) {
		if ($(grades[i]).data("p") == "cliente" && $(grades[i]).data("g") == "cliente_endereco") {
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
		url:'app/controllers/funcoes_cliente_enderecoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 
			'pequisa_cliente_endereco_grade': true,
			'filtro': $("#pesquisa_cliente_endereco").val(),
			'tabela': "cliente",
			'id': id_tabela_primaria
		}
	}).done( function(data){
		// _filtro_grade
		var vetor = data.split("[]");
		var subvetor = vetor[0].split("{,}");
		if (subvetor[1] == undefined) {
			telaCadastroCliente_endereco += "<h3>Nenhum registro encontrado!</h3>";
		} else {
			telaCadastroCliente_endereco += "<br>";

			telaCadastroCliente_endereco += "<div class='bloco2'>";

			for (var i = 0; i < vetor.length; i++) {
				subvetor = vetor[i].split("{,}");

				
				id_cliente_endereco = subvetor[0];
				endereco_cliente_endereco = subvetor[1];
				numero_cliente_endereco = subvetor[2];
				complemento_cliente_endereco = subvetor[3];
				bairro_cliente_endereco = subvetor[4];
				cidade_cliente_endereco = subvetor[5];
				estado_id = subvetor[6];
				cliente_id = subvetor[7];
				data_atualizacao_cliente_endereco = subvetor[8];
				usuario_id = subvetor[9];
				bool_ativo_cliente_endereco = subvetor[10];
				

				if (bool_ativo_cliente_endereco == 1) { 
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
				tabelaViewBody +=				"<a href='principal.php#!editar_grade_cliente_endereco-cliente' style='color: #f0ad4e;' data-id='"+id_cliente_endereco+"' onclick='editar(this);' title='Editar'"+accesskeyEditar+" "+desabilitar+">";
				tabelaViewBody +=				 	"<b><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></b>";
				tabelaViewBody += 				"</a>";
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td align='center'>";
				tabelaViewBody += 				"<div  id='ativo_"+id_cliente_endereco+"'>";
				tabelaViewBody += 				"<a href='#!grade_cliente_endereco-cliente' style='color: "+cor_ativo+"' data-id='"+id_cliente_endereco+"' onclick=\"excluir(this , 'cliente_endereco', "+bool_ativo_cliente_endereco+", 'grade_cliente_endereco-cliente')\" title='Excluir'>";
				tabelaViewBody += 					icone_ativo;
				tabelaViewBody +=  				"</a>";
				tabelaViewBody += 				"</div>";
				tabelaViewBody +=  			"</td>";
				tabelaViewBody +=			"<td align='center'>";
				tabelaViewBody +=				numeroRegAtual;
				tabelaViewBody +=			"</td>";
				tabelaViewBody += 			"<td>"+endereco_cliente_endereco+"</td>";
				tabelaViewBody += 			"<td>"+numero_cliente_endereco+"</td>";
				tabelaViewBody += 			"<td>"+complemento_cliente_endereco+"</td>";
				tabelaViewBody += 			"<td>"+bairro_cliente_endereco+"</td>";
				tabelaViewBody += 			"<td>"+cidade_cliente_endereco+"</td>";
				tabelaViewBody += 		"</tr>";

				numeroRegAtual++;
				accesskeyEditar = "";
			}
			telaCadastroCliente_endereco += 	"<table class='table'>";
			telaCadastroCliente_endereco += 		"<tr bgcolor='white'>";
			telaCadastroCliente_endereco += 			"<td><b>Editar</b></td>";
			telaCadastroCliente_endereco += 			"<td><b>Ativo</b></td>";
			telaCadastroCliente_endereco += 			"<td><b>N°</b></td>";
			telaCadastroCliente_endereco += 			"<td><b>Endereço</b></td>";
			telaCadastroCliente_endereco += 			"<td><b>Número</b></td>";
			telaCadastroCliente_endereco += 			"<td><b>Complemento</b></td>";
			telaCadastroCliente_endereco += 			"<td><b>Bairro</b></td>";
			telaCadastroCliente_endereco += 			"<td><b>Cidade</b></td>";
			telaCadastroCliente_endereco += 		"</tr>";
			telaCadastroCliente_endereco +=		tabelaViewBody;
			telaCadastroCliente_endereco += 	"</table>";
		}
		telaCadastroCliente_endereco += "</div>";
		$("#conteudoCliente_endereco").html(telaCadastroCliente_endereco);
		for (var i = acumularFunctionId.length - 1; i >= 0; i--) {
			setarValorEstrangeiroLista(acumularFunctionId[i], acumularFunctionCampo[i], "");
		}
		var botaoBoltarGrade = verificaGrade('cliente', 'cliente_endereco', 'Cliente');
		$("#botaoVoltarGrade").html(botaoBoltarGrade);
	});
}