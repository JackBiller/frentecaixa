var numTotalAreas = 0;
var areasGeral = [];


$(document).ready(function(){
	listaAreasAcesso();
});



function gravarRegistro(){
	// var areas  = document.getElementsByName("areas");
	var areasSelecionadas = "", listSelecionadas = "", insertSelecionadas = "", updateSelecionadas = "", prefixo = "";
	var contColunas = 0;
	for (var i = 0; i < areasGeral.length; i++) {
		if (areasGeral[i].list == 1) {
			contColunas++;
			prefixo = areasSelecionadas == "" ? "" : "+";
			areasSelecionadas +=  prefixo+areasGeral[i].area;
			listSelecionadas += prefixo+areasGeral[i].list;
			insertSelecionadas += prefixo+areasGeral[i].insert;
			updateSelecionadas += prefixo+areasGeral[i].update;
		}
	}

	var campoFocus = "";
		 if($("#descricao_nivel_acesso").val() == "") campoFocus = "descricao_nivel_acesso";
	else if(contColunas == areasGeral.length) toast.danger("Não pode cadastrar com todas as areas selecionadas!");
	else if(contColunas == 0) toast.danger("Não pode cadastrar com nenhuma area selecionada!");


	else {
		$.ajax({
			url:'app/controllers/funcoes_nivel_acessoController.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'adicionar_nivel_acesso': true,
				'descricao_nivel_acesso': $("#descricao_nivel_acesso").val(),
				'area_nivel_acesso': areasSelecionadas,
				'listSelecionadas': listSelecionadas,
				'insertSelecionadas': insertSelecionadas,
				'updateSelecionadas': updateSelecionadas,
				'usuario_id': $("#usuario_id").val()
			}
		}).done( function(data1){
			/* console.log(data1); */
			if (parseInt(data1) != 0) {
				for (var i = 0; i < areasGeral.length; i++) {
					if (areasGeral[i].list == 1){
						$.ajax({
							url:'app/controllers/funcoes_nivel_acessoController.php',
							type: 'POST',
							dataType: 'text',
							data: {
								'adicionar_area_nivel_acesso': true,
								'usuario_id': $("#usuario_id").val(),
								'area_area_nivel_acesso': areasGeral[i].area,
								'demostrativo_area_nivel_acesso': areasGeral[i].descritivo,
								'bool_list_area_nivel_acesso': areasGeral[i].list,
								'bool_insert_area_nivel_acesso': areasGeral[i].insert,
								'bool_update_area_nivel_acesso': areasGeral[i].update,
								'nivel_acesso_id': data1
							}
						}).done( function(data){
							console.log(data);
							if (data != 1 && data != "1") 	toast.danger("Falha: "+data);
							else {
								/* $("#descricao_nivel_acesso").val(""); */
							}
						});
					}
				}
				toast.success("Cadastrado com sucesso!");
			} else {
				toast.danger("Falha: Já foi cadastrado um Nível de Acesso com essa configuração!");
			}
		});
	} 

	if (campoFocus != "") {
		document.getElementById(campoFocus).focus();
		toast.danger('Preencha no mínimo todos os campos obrigatórios!');
	}
}

function validation(valor){
	if (valor == "") 	return false;
	else 				return true;
}




function listaAreasAcesso(){
	$.ajax({
		url:'app/controllers/funcoes_nivel_acessoController.php',
		type: 'POST',
		dataType: 'text',
		data: { 'pequisa_nivel_acesso_id': true }
	}).done( function(data){
		formatarAreasAcesso(JSON.parse(data));
	});
}

function formatarAreasAcesso(area_nivel_acesso){
	numTotalAreas = 0;

	var tabelaColunas = "<h2>Areas de Acesso</h2>";
	var ctrlClass = "";
	var ctrlIcon = "";
	var ctrlDisabled = "";


	tabelaColunas +=	"<style>";
	tabelaColunas +=		".area_acesso_card{";
	tabelaColunas +=			"border-style: solid;";
	tabelaColunas +=			"border-color: lightgray;";
	tabelaColunas +=			"border-radius: 10px;";
	tabelaColunas +=			"box-shadow: 5px 5px 5px #eee;";
	tabelaColunas +=			"margin-top: 5px;";
	tabelaColunas +=			"margin-bottom: 5px;";
	tabelaColunas +=			"margin-left: 1px;";
	tabelaColunas +=			"margin-right: 1px;";
	tabelaColunas +=		"}";
	tabelaColunas +=	"</style>";

	for (i in area_nivel_acesso){
		areasGeral.push({
			descritivo: area_nivel_acesso[i].descritivo,
			area: area_nivel_acesso[i].area,
			list: area_nivel_acesso[i].list,
			insert: area_nivel_acesso[i].insert,
			update: area_nivel_acesso[i].update
		});

		tabelaColunas += 	"<div class='col-md-3 col-sm-4 col-xs-4 text-center'>";
		tabelaColunas += 	"<div class='area_acesso_card col-xs-11'>";
		tabelaColunas += 		"<h4 style='margin-bottom: -10px;margin-top: 5px;'>"+area_nivel_acesso[i].descritivo+"</h4><br>";

		ctrlClass = area_nivel_acesso[i].list == 1 ? "success" : "danger";
		ctrlIcon = area_nivel_acesso[i].list == 1 ? "check" : "times";
		ctrlDisabled = area_nivel_acesso[i].list == 1 ? "" : " disabled";

		tabelaColunas +=		"<div id='btn_area_l_"+area_nivel_acesso[i].area+"'>";
		tabelaColunas += 		"<button style='margin-bottom: 10px' class='btn btn-"+ctrlClass+" btn-block' onclick='definirAreaAcessoLIU(\""+area_nivel_acesso[i].area+"\", \"l\", 0)'"+ctrlDisabled+">";
		tabelaColunas += 			"<i class='fa fa-"+ctrlIcon+"'></i>&nbsp;&nbsp;Listar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		tabelaColunas += 		"</button>";
		tabelaColunas +=		"</div>";


		ctrlClass = area_nivel_acesso[i].insert == 1 ? "success" : "danger";
		ctrlIcon = area_nivel_acesso[i].insert == 1 ? "check" : "times";
		ctrlDisabled = area_nivel_acesso[i].insert == 1 ? "" : " disabled";

		tabelaColunas +=		"<div id='btn_area_i_"+area_nivel_acesso[i].area+"'>";
		tabelaColunas += 		"<button style='margin-bottom: 10px' class='btn btn-"+ctrlClass+" btn-block' onclick='definirAreaAcessoLIU(\""+area_nivel_acesso[i].area+"\", \"i\", 0)'"+ctrlDisabled+">";
		tabelaColunas += 			"<i class='fa fa-"+ctrlIcon+"'></i>&nbsp;&nbsp;Inserir&nbsp;&nbsp;&nbsp;&nbsp;";
		tabelaColunas += 		"</button>";
		tabelaColunas +=		"</div>";


		ctrlClass = area_nivel_acesso[i].update == 1 ? "success" : "danger";
		ctrlIcon = area_nivel_acesso[i].update == 1 ? "check" : "times";
		ctrlDisabled = area_nivel_acesso[i].update == 1 ? "" : " disabled";

		tabelaColunas +=		"<div id='btn_area_u_"+area_nivel_acesso[i].area+"'>";
		tabelaColunas += 		"<button style='margin-bottom: 10px' class='btn btn-"+ctrlClass+" btn-block' onclick='definirAreaAcessoLIU(\""+area_nivel_acesso[i].area+"\", \"u\", 0)'"+ctrlDisabled+">";
		tabelaColunas += 			"<i class='fa fa-"+ctrlIcon+"'></i>&nbsp;&nbsp;Atualizar";
		tabelaColunas += 		"</button>";
		tabelaColunas +=		"</div>";

		tabelaColunas += 	"</div>";
		tabelaColunas += 	"</div>";
		numTotalAreas++;
	}
	/*console.log("areasGeral");
	console.log(areasGeral);
	console.log(areasGeral[0]);
	console.log(areasGeral[0].area);*/

	tabelaColunas = numTotalAreas != 0 ? tabelaColunas : "Nenhum resultado encontrado...";

	$("#conteudoAreas_acesso").html(tabelaColunas);
}

function selecionarColuna(coluna){
	if (document.getElementById("check_"+coluna).checked) {
		document.getElementById("check_"+coluna).checked = false;
		document.getElementById("icone_"+coluna).innerHTML = "<i class='fa fa-times'></i>";
		document.getElementById("linha_"+coluna).style.backgroundColor = "#f0ad4e";
	} else {
		document.getElementById("check_"+coluna).checked = true;
		document.getElementById("icone_"+coluna).innerHTML = "<i class='fa fa-check'></i>";
		document.getElementById("linha_"+coluna).style.backgroundColor = "#5cb85c";
	}
}

function definirAreaAcessoLIU(area, tipo, status){
	// console.log("definirAreaAcessoLIU");
	var indiceArea = 0;
	for (var i = 01; i < areasGeral.length; i++) {
		if(areasGeral[i].area == area){ indiceArea = i; i = areasGeral.length }
	}
	switch(tipo){
		case 'l': 
			var descricaoBtn = "Listar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			areasGeral[indiceArea].list = status;
			break;
		case 'i': 
			var descricaoBtn = "Inserir&nbsp;&nbsp;&nbsp;&nbsp;";
			areasGeral[indiceArea].insert = status;
			break;
		case 'u': 
			var descricaoBtn = "Atualizar";
			areasGeral[indiceArea].update = status;
			break;
	}

	var ctrlClass	 = status == 1 ? "success" 	: "danger";
	var ctrlIcon	 = status == 1 ? "check" 	: "times";
	var newStatus	 = status == 1 ? 0 			: 1;

	var resultado  = 	"<button style='margin-bottom: 10px' class='btn btn-"+ctrlClass+" btn-block' onclick='definirAreaAcessoLIU(\""+area+"\", \""+tipo+"\", "+newStatus+")'>";
		resultado += 		"<i class='fa fa-"+ctrlIcon+"'></i>&nbsp;&nbsp;"+descricaoBtn;
		resultado += 	"</button>";
	document.getElementById("btn_area_"+tipo+"_"+area).innerHTML = resultado;

	if (status == 1) {
		if (tipo == "u")  		definirAreaAcessoLIU(area, "i", status);
		else if (tipo == "i")  	definirAreaAcessoLIU(area, "l", status);
	} else {
		if (tipo == "l") 		definirAreaAcessoLIU(area, "i", status);
		else if (tipo == "i") 	definirAreaAcessoLIU(area, "u", status);
	}
}