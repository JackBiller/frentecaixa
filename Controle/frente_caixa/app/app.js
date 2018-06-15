
var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider)
{
	$routeProvider

	.when('/home', {
		templateUrl : 'app/views/home.htm',
	})




	/*************************************************************************************************************/
	/* Tabelas da Aplicação */
	/*************************************************************************************************************/
	// Tabela: caixa
	.when('/caixa', {
		templateUrl : 'app/views/caixa.htm',
	})
	.when('/adicionar_caixa', {
		templateUrl : 'app/views/adicionar_caixa.htm',
	})
	.when('/editar_caixa', {
		templateUrl : 'app/views/editar_caixa.htm',
	})

	
	// Tabela: cliente
	.when('/cliente', {
		templateUrl : 'app/views/cliente.htm',
	})
	.when('/adicionar_cliente', {
		templateUrl : 'app/views/adicionar_cliente.htm',
	})
	.when('/editar_cliente', {
		templateUrl : 'app/views/editar_cliente.htm',
	})

	
	// Tabela: condicao_de_pagamento
	.when('/condicao_de_pagamento', {
		templateUrl : 'app/views/condicao_de_pagamento.htm',
	})
	.when('/adicionar_condicao_de_pagamento', {
		templateUrl : 'app/views/adicionar_condicao_de_pagamento.htm',
	})
	.when('/editar_condicao_de_pagamento', {
		templateUrl : 'app/views/editar_condicao_de_pagamento.htm',
	})

	
	// Tabela: empresa
	.when('/empresa', {
		templateUrl : 'app/views/empresa.htm',
	})
	.when('/adicionar_empresa', {
		templateUrl : 'app/views/adicionar_empresa.htm',
	})
	.when('/editar_empresa', {
		templateUrl : 'app/views/editar_empresa.htm',
	})

	
	// Tabela: estado
	.when('/estado', {
		templateUrl : 'app/views/estado.htm',
	})
	.when('/adicionar_estado', {
		templateUrl : 'app/views/adicionar_estado.htm',
	})
	.when('/editar_estado', {
		templateUrl : 'app/views/editar_estado.htm',
	})

	
	// Tabela: filial
	.when('/filial', {
		templateUrl : 'app/views/filial.htm',
	})
	.when('/adicionar_filial', {
		templateUrl : 'app/views/adicionar_filial.htm',
	})
	.when('/editar_filial', {
		templateUrl : 'app/views/editar_filial.htm',
	})

	
	// Tabela: grupo
	.when('/grupo', {
		templateUrl : 'app/views/grupo.htm',
	})
	.when('/adicionar_grupo', {
		templateUrl : 'app/views/adicionar_grupo.htm',
	})
	.when('/editar_grupo', {
		templateUrl : 'app/views/editar_grupo.htm',
	})

	
	// Tabela: item
	.when('/item', {
		templateUrl : 'app/views/item.htm',
	})
	.when('/adicionar_item', {
		templateUrl : 'app/views/adicionar_item.htm',
	})
	.when('/editar_item', {
		templateUrl : 'app/views/editar_item.htm',
	})

	
	// Tabela: operacoes_caixa
	.when('/operacoes_caixa', {
		templateUrl : 'app/views/operacoes_caixa.htm',
	})
	.when('/adicionar_operacoes_caixa', {
		templateUrl : 'app/views/adicionar_operacoes_caixa.htm',
	})
	.when('/editar_operacoes_caixa', {
		templateUrl : 'app/views/editar_operacoes_caixa.htm',
	})

	
	// Tabela: unidade_medida
	.when('/unidade_medida', {
		templateUrl : 'app/views/unidade_medida.htm',
	})
	.when('/adicionar_unidade_medida', {
		templateUrl : 'app/views/adicionar_unidade_medida.htm',
	})
	.when('/editar_unidade_medida', {
		templateUrl : 'app/views/editar_unidade_medida.htm',
	})

	




	/*************************************************************************************************************/
	/* Perfil */
	/*************************************************************************************************************/
	.when('/perfil_editar', {
		templateUrl : 'app/views/perfil_editar.htm',
	})

	.when('/perfil_trocar_senha', {
		templateUrl : 'app/views/perfil_trocar_senha.htm',
	})





	/*************************************************************************************************************/
	/* Usuario */
	/*************************************************************************************************************/
	.when('/usuario_lista', {
		templateUrl : 'app/views/usuario_lista.htm',
	})

	.when('/usuario_adiciona', {
		templateUrl : 'app/views/usuario_adiciona.htm',
	})

	.when('/usuario_edita', {
		templateUrl : 'app/views/usuario_edita.htm',
	})

	.when('/usuario_nivel_acesso', {
		templateUrl : 'app/views/usuario_nivel_acesso.htm',
	})

	.when('/usuario_nivel_acesso_adicionar', {
		templateUrl : 'app/views/usuario_nivel_acesso_adicionar.htm',
	})

	.when('/usuario_nivel_acesso_editar', {
		templateUrl : 'app/views/usuario_nivel_acesso_editar.htm',
	})

	.when('/acesso_bloqueado', {
		templateUrl : 'app/views/acesso_bloqueado.htm',
	})





	/*************************************************************************************************************/
	/* Upload */
	/*************************************************************************************************************/
	// Resultado do Upload
	.when('/upload_result', {
		templateUrl : 'app/views/upload_result.php',
	})

	// Upload de Imagem	
	.when('/upload_imagem', {
		templateUrl : 'app/views/upload_imagem.htm',
	})

	.when('/upload_imagem_view', {
		templateUrl : 'app/views/upload_imagem_view.htm',
	})


	// Upload de Video
	.when('/upload_video', {
		templateUrl : 'app/views/upload_video.htm',
	})

	.when('/upload_video_view', {
		templateUrl : 'app/views/upload_video_view.htm',
	})


	// Upload de Audio
	.when('/upload_audio', {
		templateUrl : 'app/views/upload_audio.htm',
	})

	.when('/upload_audio_view', {
		templateUrl : 'app/views/upload_audio_view.htm',
	})


	// Upload de Arquivo de Texto
	.when('/upload_texto', {
		templateUrl : 'app/views/upload_texto.htm',
	})

	.when('/upload_texto_view', {
		templateUrl : 'app/views/upload_texto_view.htm',
	})





	
	/*************************************************************************************************************/
	/* Maps */
	/*************************************************************************************************************/
	// Consultar Latitude e Longitude
	.when('/maps_Lat_Lng', {
		templateUrl : 'app/views/maps_Lat_Lng.htm',
	})





	/*************************************************************************************************************/
	/* Arquivos */
	/*************************************************************************************************************/
	// Movimentação de Arquivo (Imagem)
	.when('/mov_img', {
		templateUrl : 'app/views/mov_img.htm',
	})





	/*************************************************************************************************************/
	/* Relatórios */
	/*************************************************************************************************************/
	// Crud Relatório
	.when('/pdf_emiti', {
		templateUrl : 'app/views/pdf_emiti.htm',
	})

	.when('/pdf_lista', {
		templateUrl : 'app/views/pdf_lista.htm',
	})

	.when('/pdf_adiciona', {
		templateUrl : 'app/views/pdf_adiciona.htm',
	})

	.when('/pdf_edita', {
		templateUrl : 'app/views/pdf_edita.htm',
	})





	/*************************************************************************************************************/
	/* Notificações */
	/*************************************************************************************************************/
	.when('/notif_lista', {
		templateUrl : 'app/views/notif_lista.htm',
	})

	.when('/notif_lista_config', {
		templateUrl : 'app/views/notif_lista_config.htm',
	})

	.when('/notif_adicionar_notificacoes', {
		templateUrl : 'app/views/notif_adicionar_notificacoes.htm',
	})

	.when('/notif_editar_notificacoes', {
		templateUrl : 'app/views/notif_editar_notificacoes.htm',
	})





	/*************************************************************************************************************/
	/* Grades */
	/*************************************************************************************************************/


	// Grades: item-grupo
	.when('/grade_item-grupo', {
		templateUrl : 'app/views/grade_item-grupo.htm',
	})
	.when('/adicionar_grade_item-grupo', {
		templateUrl : 'app/views/adicionar_grade_item-grupo.htm',
	})
	.when('/editar_grade_item-grupo', {
		templateUrl : 'app/views/editar_grade_item-grupo.htm',
	})


	// Grades: item_unidade_medida-item
	.when('/grade_item_unidade_medida-item', {
		templateUrl : 'app/views/grade_item_unidade_medida-item.htm',
	})
	.when('/adicionar_grade_item_unidade_medida-item', {
		templateUrl : 'app/views/adicionar_grade_item_unidade_medida-item.htm',
	})
	.when('/editar_grade_item_unidade_medida-item', {
		templateUrl : 'app/views/editar_grade_item_unidade_medida-item.htm',
	})


	// Grades: cliente_contato-cliente
	.when('/grade_cliente_contato-cliente', {
		templateUrl : 'app/views/grade_cliente_contato-cliente.htm',
	})
	.when('/adicionar_grade_cliente_contato-cliente', {
		templateUrl : 'app/views/adicionar_grade_cliente_contato-cliente.htm',
	})
	.when('/editar_grade_cliente_contato-cliente', {
		templateUrl : 'app/views/editar_grade_cliente_contato-cliente.htm',
	})


	// Grades: cliente_endereco-cliente
	.when('/grade_cliente_endereco-cliente', {
		templateUrl : 'app/views/grade_cliente_endereco-cliente.htm',
	})
	.when('/adicionar_grade_cliente_endereco-cliente', {
		templateUrl : 'app/views/adicionar_grade_cliente_endereco-cliente.htm',
	})
	.when('/editar_grade_cliente_endereco-cliente', {
		templateUrl : 'app/views/editar_grade_cliente_endereco-cliente.htm',
	})


	// Grades: pedido_item-pedido
	.when('/grade_pedido_item-pedido', {
		templateUrl : 'app/views/grade_pedido_item-pedido.htm',
	})
	.when('/adicionar_grade_pedido_item-pedido', {
		templateUrl : 'app/views/adicionar_grade_pedido_item-pedido.htm',
	})
	.when('/editar_grade_pedido_item-pedido', {
		templateUrl : 'app/views/editar_grade_pedido_item-pedido.htm',
	})


	// Grades: pedido_pagamento-pedido
	.when('/grade_pedido_pagamento-pedido', {
		templateUrl : 'app/views/grade_pedido_pagamento-pedido.htm',
	})
	.when('/adicionar_grade_pedido_pagamento-pedido', {
		templateUrl : 'app/views/adicionar_grade_pedido_pagamento-pedido.htm',
	})
	.when('/editar_grade_pedido_pagamento-pedido', {
		templateUrl : 'app/views/editar_grade_pedido_pagamento-pedido.htm',
	})


	// Grades: pedido_pagamento_extorno-pedido_pagamento
	.when('/grade_pedido_pagamento_extorno-pedido_pagamento', {
		templateUrl : 'app/views/grade_pedido_pagamento_extorno-pedido_pagamento.htm',
	})
	.when('/adicionar_grade_pedido_pagamento_extorno-pedido_pagamento', {
		templateUrl : 'app/views/adicionar_grade_pedido_pagamento_extorno-pedido_pagamento.htm',
	})
	.when('/editar_grade_pedido_pagamento_extorno-pedido_pagamento', {
		templateUrl : 'app/views/editar_grade_pedido_pagamento_extorno-pedido_pagamento.htm',
	})


	// Grades: caixa_operacao-caixa_movimentacao
	.when('/grade_caixa_operacao-caixa_movimentacao', {
		templateUrl : 'app/views/grade_caixa_operacao-caixa_movimentacao.htm',
	})
	.when('/adicionar_grade_caixa_operacao-caixa_movimentacao', {
		templateUrl : 'app/views/adicionar_grade_caixa_operacao-caixa_movimentacao.htm',
	})
	.when('/editar_grade_caixa_operacao-caixa_movimentacao', {
		templateUrl : 'app/views/editar_grade_caixa_operacao-caixa_movimentacao.htm',
	})


	// Grades: filial-empresa
	.when('/grade_filial-empresa', {
		templateUrl : 'app/views/grade_filial-empresa.htm',
	})
	.when('/adicionar_grade_filial-empresa', {
		templateUrl : 'app/views/adicionar_grade_filial-empresa.htm',
	})
	.when('/editar_grade_filial-empresa', {
		templateUrl : 'app/views/editar_grade_filial-empresa.htm',
	})





	.otherwise ({ redirectTo: '/home' });
});
