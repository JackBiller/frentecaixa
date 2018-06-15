-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 15-Jun-2018 às 13:13
-- Versão do servidor: 10.1.13-MariaDB
-- PHP Version: 7.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `frentecaixa`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `area_nivel_acesso`
--

CREATE TABLE `area_nivel_acesso` (
  `id_area_nivel_acesso` int(11) NOT NULL,
  `area_area_nivel_acesso` varchar(200) NOT NULL,
  `demostrativo_area_nivel_acesso` varchar(200) NOT NULL,
  `bool_list_area_nivel_acesso` int(1) NOT NULL DEFAULT '1',
  `bool_insert_area_nivel_acesso` int(1) NOT NULL DEFAULT '1',
  `bool_update_area_nivel_acesso` int(1) NOT NULL DEFAULT '1',
  `nivel_acesso_id` int(11) NOT NULL,
  `data_atualizacao_area_nivel_acesso` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_area_nivel_acesso` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `area_nivel_acesso`
--

INSERT INTO `area_nivel_acesso` (`id_area_nivel_acesso`, `area_area_nivel_acesso`, `demostrativo_area_nivel_acesso`, `bool_list_area_nivel_acesso`, `bool_insert_area_nivel_acesso`, `bool_update_area_nivel_acesso`, `nivel_acesso_id`, `data_atualizacao_area_nivel_acesso`, `usuario_id`, `bool_ativo_area_nivel_acesso`) VALUES
(100, 'caixa', 'Caixa', 1, 1, 1, 1, '2018-06-14 10:41:22', 1, 1),
(101, 'cliente', 'Cliente', 1, 1, 1, 1, '2018-06-14 10:41:23', 1, 1),
(102, 'condicao_de_pagamento', 'Condição De Pagamento', 1, 1, 1, 1, '2018-06-14 10:41:23', 1, 1),
(103, 'empresa', 'Empresa', 1, 1, 1, 1, '2018-06-14 10:41:23', 1, 1),
(104, 'estado', 'Estado', 1, 1, 1, 1, '2018-06-14 10:41:23', 1, 1),
(105, 'filial', 'Filial', 1, 1, 1, 1, '2018-06-14 10:41:23', 1, 1),
(106, 'grupo', 'Grupo', 1, 1, 1, 1, '2018-06-14 10:41:24', 1, 1),
(107, 'item', 'Item', 1, 1, 1, 1, '2018-06-14 10:41:24', 1, 1),
(108, 'operacoes_caixa', 'Operações Caixa', 1, 1, 1, 1, '2018-06-14 10:41:24', 1, 1),
(109, 'unidade_medida', 'Unidade Medida', 1, 1, 1, 1, '2018-06-14 10:41:24', 1, 1),
(110, 'item-grupo', 'Item - Grupo', 1, 1, 1, 1, '2018-06-14 10:41:24', 1, 1),
(111, 'item_unidade_medida-item', 'Item Unidade Medida - Item', 1, 1, 1, 1, '2018-06-14 10:41:24', 1, 1),
(112, 'cliente_contato-cliente', 'Cliente Contato - Cliente', 1, 1, 1, 1, '2018-06-14 10:41:25', 1, 1),
(113, 'cliente_endereco-cliente', 'Cliente Endereço - Cliente', 1, 1, 1, 1, '2018-06-14 10:41:25', 1, 1),
(114, 'pedido_item-pedido', 'Pedido Item - Pedido', 1, 1, 1, 1, '2018-06-14 10:41:25', 1, 1),
(115, 'pedido_pagamento-pedido', 'Pedido Pagamento - Pedido', 1, 1, 1, 1, '2018-06-14 10:41:25', 1, 1),
(116, 'pedido_pagamento_extorno-pedido_pagamento', 'Pedido Pagamento Extorno - Pedido Pagamento', 1, 1, 1, 1, '2018-06-14 10:41:25', 1, 1),
(117, 'caixa_operacao-caixa_movimentacao', 'Caixa Operação - Caixa Movimentacao', 1, 1, 1, 1, '2018-06-14 10:41:25', 1, 1),
(118, 'filial-empresa', 'Filial - Empresa', 1, 1, 1, 1, '2018-06-14 10:41:26', 1, 1),
(119, 'upload', 'Upload', 1, 1, 1, 1, '2018-06-14 10:41:26', 1, 1),
(120, 'mapa', 'Mapa', 1, 1, 1, 1, '2018-06-14 10:41:26', 1, 1),
(121, 'mov', 'Mov', 1, 1, 1, 1, '2018-06-14 10:41:26', 1, 1),
(122, 'relatorio', 'Relatório', 1, 1, 1, 1, '2018-06-14 10:41:26', 1, 1),
(123, 'notificacao', 'Notificação', 1, 1, 1, 1, '2018-06-14 10:41:26', 1, 1),
(124, 'usuario', 'Usuário', 1, 1, 1, 1, '2018-06-14 10:41:26', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `caixa`
--

CREATE TABLE `caixa` (
  `id_caixa` int(11) NOT NULL,
  `descricao_caixa` varchar(200) NOT NULL,
  `filial_id` int(200) NOT NULL,
  `data_atualizacao_caixa` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_caixa` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `caixa`
--

INSERT INTO `caixa` (`id_caixa`, `descricao_caixa`, `filial_id`, `data_atualizacao_caixa`, `usuario_id`, `bool_ativo_caixa`) VALUES
(1, 'Caixa 01', 1, '2018-06-14 09:43:36', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `caixa_movimentacao`
--

CREATE TABLE `caixa_movimentacao` (
  `id_caixa_movimentacao` int(11) NOT NULL,
  `valor_abertura_caixa_movimentacao` float DEFAULT NULL,
  `valor_fechamento_caixa_movimentacao` float DEFAULT NULL,
  `data_abertura_caixa_movimentacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_fechamento_caixa_movimentacao` datetime DEFAULT NULL,
  `caixa_id` int(11) NOT NULL,
  `data_atualizacao_caixa_movimentacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_caixa_movimentacao` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `caixa_operacao`
--

CREATE TABLE `caixa_operacao` (
  `id_caixa_operacao` int(11) NOT NULL,
  `valor_caixa_operacao` float NOT NULL,
  `caixa_movimentacao_id` int(11) NOT NULL,
  `operacoes_caixa_id` int(200) NOT NULL,
  `data_emissao_caixa_operacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao_caixa_operacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_caixa_operacao` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nome_cliente` varchar(200) NOT NULL,
  `data_atualizacao_cliente` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_cliente` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nome_cliente`, `data_atualizacao_cliente`, `usuario_id`, `bool_ativo_cliente`) VALUES
(1, 'Jack', '2018-06-14 09:43:48', 1, 1),
(2, 'Ana', '2018-06-14 09:43:57', 1, 1),
(3, 'João', '2018-06-14 09:44:04', 1, 1),
(4, 'Maria', '2018-06-14 09:44:15', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente_contato`
--

CREATE TABLE `cliente_contato` (
  `id_cliente_contato` int(11) NOT NULL,
  `telefone_cliente_contato` varchar(100) NOT NULL,
  `celular_cliente_contato` varchar(100) DEFAULT NULL,
  `email_cliente_contato` varchar(100) DEFAULT NULL,
  `cliente_id` int(11),
  `data_atualizacao_cliente_contato` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_cliente_contato` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cliente_contato`
--

INSERT INTO `cliente_contato` (`id_cliente_contato`, `telefone_cliente_contato`, `celular_cliente_contato`, `email_cliente_contato`, `cliente_id`, `data_atualizacao_cliente_contato`, `usuario_id`, `bool_ativo_cliente_contato`) VALUES
(5, '123', '', '', 1, '2018-06-14 09:56:44', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente_endereco`
--

CREATE TABLE `cliente_endereco` (
  `id_cliente_endereco` int(11) NOT NULL,
  `endereco_cliente_endereco` varchar(200) NOT NULL,
  `numero_cliente_endereco` int(11) NOT NULL,
  `complemento_cliente_endereco` varchar(100) DEFAULT NULL,
  `bairro_cliente_endereco` varchar(200) NOT NULL,
  `cidade_cliente_endereco` varchar(200) NOT NULL,
  `estado_id` int(50) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `data_atualizacao_cliente_endereco` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_cliente_endereco` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cliente_endereco`
--

INSERT INTO `cliente_endereco` (`id_cliente_endereco`, `endereco_cliente_endereco`, `numero_cliente_endereco`, `complemento_cliente_endereco`, `bairro_cliente_endereco`, `cidade_cliente_endereco`, `estado_id`, `cliente_id`, `data_atualizacao_cliente_endereco`, `usuario_id`, `bool_ativo_cliente_endereco`) VALUES
(1, 'Teste', 12, '', 'Teste', 'Teste', 13, 1, '2018-06-14 10:10:11', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `condicao_de_pagamento`
--

CREATE TABLE `condicao_de_pagamento` (
  `id_condicao_de_pagamento` int(11) NOT NULL,
  `descricao_condicao_de_pagamento` varchar(200) NOT NULL,
  `data_atualizacao_condicao_de_pagamento` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_condicao_de_pagamento` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `condicao_de_pagamento`
--

INSERT INTO `condicao_de_pagamento` (`id_condicao_de_pagamento`, `descricao_condicao_de_pagamento`, `data_atualizacao_condicao_de_pagamento`, `usuario_id`, `bool_ativo_condicao_de_pagamento`) VALUES
(1, 'Dinheiro', '2018-06-14 09:57:20', 1, 1),
(2, 'Cartão Crédito', '2018-06-14 09:57:34', 1, 1),
(3, 'Cartão Débito', '2018-06-14 09:57:42', 1, 1),
(4, 'Cheque', '2018-06-14 09:57:48', 1, 1),
(5, 'Boleto', '2018-06-14 09:57:58', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL,
  `razao_social_empresa` varchar(200) NOT NULL,
  `data_atualizacao_empresa` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_empresa` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `estado`
--

CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL,
  `descricao_estado` varchar(50) NOT NULL,
  `sigla_estado` varchar(2) NOT NULL,
  `data_atualizacao_estado` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_estado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `estado`
--

INSERT INTO `estado` (`id_estado`, `descricao_estado`, `sigla_estado`, `data_atualizacao_estado`, `usuario_id`, `bool_ativo_estado`) VALUES
(1, 'Acre', 'AC', '2018-06-14 10:08:59', 1, 1),
(2, 'Alagoas', 'AL', '2018-06-14 10:08:43', 1, 1),
(3, 'Amapá', 'AP', '2018-06-14 10:08:43', 1, 1),
(4, 'Amazonas', 'AM', '2018-06-14 10:08:43', 1, 1),
(5, 'Bahia', 'BA', '2018-06-14 10:08:43', 1, 1),
(6, 'Ceará', 'CE', '2018-06-14 10:08:43', 1, 1),
(7, 'Distrito Federal', 'DF', '2018-06-14 10:08:43', 1, 1),
(8, 'Espírito Santo', 'ES', '2018-06-14 10:08:43', 1, 1),
(9, 'Goiás', 'GO', '2018-06-14 10:08:43', 1, 1),
(10, 'Maranhão', 'MA', '2018-06-14 10:08:43', 1, 1),
(11, 'Mato Grosso', 'MT', '2018-06-14 10:08:43', 1, 1),
(12, 'Mato Grosso do Sul', 'MS', '2018-06-14 10:08:43', 1, 1),
(13, 'Minas Gerais', 'MG', '2018-06-14 10:08:43', 1, 1),
(14, 'Pará', 'PA', '2018-06-14 10:08:43', 1, 1),
(15, 'Paraíba', 'PB', '2018-06-14 10:08:43', 1, 1),
(16, 'Paraná', 'PR', '2018-06-14 10:08:43', 1, 1),
(17, 'Pernambuco', 'PE', '2018-06-14 10:08:43', 1, 1),
(18, 'Piauí', 'PI', '2018-06-14 10:08:43', 1, 1),
(19, 'Rio de Janeiro', 'RJ', '2018-06-14 10:08:43', 1, 1),
(20, 'Rio Grande do Norte', 'RN', '2018-06-14 10:08:43', 1, 1),
(21, 'Rio Grande do Sul', 'RS', '2018-06-14 10:08:43', 1, 1),
(22, 'Rondônia', 'RO', '2018-06-14 10:08:43', 1, 1),
(23, 'Roraima', 'RR', '2018-06-14 10:08:43', 1, 1),
(24, 'Santa Catarina', 'SC', '2018-06-14 10:08:43', 1, 1),
(25, 'São Paulo', 'SP', '2018-06-14 10:08:43', 1, 1),
(26, 'Sergipe', 'SE', '2018-06-14 10:08:43', 1, 1),
(27, 'Tocantins', 'TO', '2018-06-14 10:08:43', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `filial`
--

CREATE TABLE `filial` (
  `id_filial` int(11) NOT NULL,
  `razao_social_filial` varchar(200) NOT NULL,
  `cnpj_filial` varchar(25) NOT NULL,
  `empresa_id` int(200) DEFAULT NULL,
  `data_atualizacao_filial` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_filial` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `filial`
--

INSERT INTO `filial` (`id_filial`, `razao_social_filial`, `cnpj_filial`, `empresa_id`, `data_atualizacao_filial`, `usuario_id`, `bool_ativo_filial`) VALUES
(1, 'Filial 01', '123', NULL, '2018-06-14 09:43:18', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo`
--

CREATE TABLE `grupo` (
  `id_grupo` int(11) NOT NULL,
  `descricao_grupo` varchar(100) NOT NULL,
  `imagem_grupo` varchar(100) NOT NULL,
  `filial_id` int(11) NOT NULL,
  `data_atualizacao_grupo` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_grupo` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `grupo`
--

INSERT INTO `grupo` (`id_grupo`, `descricao_grupo`, `imagem_grupo`, `filial_id`, `data_atualizacao_grupo`, `usuario_id`, `bool_ativo_grupo`) VALUES
(1, 'Diversos', 'diversos.png', 1, '2018-06-14 10:13:17', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `item`
--

CREATE TABLE `item` (
  `id_item` int(11) NOT NULL,
  `descricao_item` varchar(200) NOT NULL,
  `grupo_id` int(100) NOT NULL,
  `data_atualizacao_item` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_item` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `item`
--

INSERT INTO `item` (`id_item`, `descricao_item`, `grupo_id`, `data_atualizacao_item`, `usuario_id`, `bool_ativo_item`) VALUES
(1, 'Pão Francês', 1, '2018-06-14 10:13:45', 1, 1),
(2, 'Rosca', 1, '2018-06-14 10:14:29', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `item_unidade_medida`
--

CREATE TABLE `item_unidade_medida` (
  `id_item_unidade_medida` int(11) NOT NULL,
  `quantidade_item_unidade_medida` float NOT NULL,
  `item_id` int(100) NOT NULL,
  `unidade_medida_id` int(100) NOT NULL,
  `data_atualizacao_item_unidade_medida` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_item_unidade_medida` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `item_unidade_medida`
--

INSERT INTO `item_unidade_medida` (`id_item_unidade_medida`, `quantidade_item_unidade_medida`, `item_id`, `unidade_medida_id`, `data_atualizacao_item_unidade_medida`, `usuario_id`, `bool_ativo_item_unidade_medida`) VALUES
(1, 1, 1, 3, '2018-06-14 10:27:30', 1, 1),
(2, 10, 1, 1, '2018-06-14 10:28:16', 1, 1),
(3, 1, 2, 3, '2018-06-14 10:28:33', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `nivel_acesso`
--

CREATE TABLE `nivel_acesso` (
  `id_nivel_acesso` int(11) NOT NULL,
  `descricao_nivel_acesso` varchar(200) NOT NULL,
  `area_nivel_acesso` text NOT NULL,
  `data_atualizacao_nivel_acesso` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_nivel_acesso` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `nivel_acesso`
--

INSERT INTO `nivel_acesso` (`id_nivel_acesso`, `descricao_nivel_acesso`, `area_nivel_acesso`, `data_atualizacao_nivel_acesso`, `usuario_id`, `bool_ativo_nivel_acesso`) VALUES
(1, 'Nivel Administrador', 'caixa+cliente+condicao_de_pagamento+empresa+estado+filial+grupo+item+operacoes_caixa+unidade_medida+item-grupo+item_unidade_medida-item+cliente_contato-cliente+cliente_endereco-cliente+pedido_item-pedido+pedido_pagamento-pedido+pedido_pagamento_extorno-pedido_pagamento+caixa_operacao-caixa_movimentacao+filial-empresa+upload+mapa+mov+relatorio+notificacao+usuario', '2018-06-14 10:41:22', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes`
--

CREATE TABLE `notificacoes` (
  `id_notificacoes` int(11) NOT NULL,
  `descricao_notificacoes` text NOT NULL,
  `usuario_atuador_notificacoes` varchar(200) NOT NULL,
  `usuaio_requerente_notificacoes` varchar(200) NOT NULL,
  `tipo_alteracao_notificacoes` enum('i','u','d') NOT NULL,
  `notificacoes_config_id` int(200) NOT NULL,
  `bool_view_notificacoes` int(1) NOT NULL,
  `data_atualizacao_notificacoes` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_notificacoes` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes_config`
--

CREATE TABLE `notificacoes_config` (
  `id_notificacoes_config` int(11) NOT NULL,
  `area_notificacoes_config` varchar(200) NOT NULL,
  `tipo_alteracao_notificacoes_config` varchar(100) NOT NULL,
  `data_atualizacao_notificacoes_config` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_notificacoes_config` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes_pendentes`
--

CREATE TABLE `notificacoes_pendentes` (
  `id_notificacoes_pendentes` int(11) NOT NULL,
  `descricao_notificacoes_pendentes` text NOT NULL,
  `usuario_atuador_notificacoes_pendentes` varchar(200) NOT NULL,
  `usuaio_requerente_notificacoes_pendentes` varchar(200) NOT NULL,
  `tipo_alteracao_notificacoes_pendentes` enum('i','u','d') NOT NULL,
  `notificacoes_config_id` int(200) NOT NULL,
  `data_atualizacao_notificacoes_pendentes` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_notificacoes_pendentes` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `notificacoes_salvas`
--

CREATE TABLE `notificacoes_salvas` (
  `id_notificacoes_salvas` int(11) NOT NULL,
  `descricao_notificacoes_salvas` text NOT NULL,
  `usuario_atuador_notificacoes_salvas` varchar(200) NOT NULL,
  `usuaio_requerente_notificacoes_salvas` varchar(200) NOT NULL,
  `tipo_alteracao_notificacoes_salvas` varchar(50) NOT NULL,
  `notificacoes_config_id` int(200) NOT NULL,
  `data_atualizacao_notificacoes_salvas` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_notificacoes_salvas` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `operacoes_caixa`
--

CREATE TABLE `operacoes_caixa` (
  `id_operacoes_caixa` int(11) NOT NULL,
  `descricao_operacoes_caixa` varchar(200) NOT NULL,
  `data_atualizacao_operacoes_caixa` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_operacoes_caixa` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `operacoes_caixa`
--

INSERT INTO `operacoes_caixa` (`id_operacoes_caixa`, `descricao_operacoes_caixa`, `data_atualizacao_operacoes_caixa`, `usuario_id`, `bool_ativo_operacoes_caixa`) VALUES
(1, 'Sangria', '2018-06-14 10:14:53', 1, 1),
(2, 'Reforço', '2018-06-14 10:15:29', 1, 1),
(3, 'Devolução', '2018-06-14 10:15:33', 1, 1),
(4, 'Fechamento', '2018-06-14 10:15:46', 1, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `documento_pedido` varchar(200) NOT NULL,
  `total_pedido` float NOT NULL,
  `emissao_pedido` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cliente_id` int(100) DEFAULT NULL,
  `nome_cliente_pedido` varchar(100) DEFAULT NULL,
  `bool_finalizado_pedido` int(1) NOT NULL,
  `filial_id` int(200) NOT NULL,
  `data_atualizacao_pedido` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_pedido` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido_item`
--

CREATE TABLE `pedido_item` (
  `id_pedido_item` int(11) NOT NULL,
  `quantidade_pedido_item` float NOT NULL,
  `valor_unitario_pedido_item` float NOT NULL,
  `valor_total_pedido_item` float NOT NULL,
  `item_id` int(100) DEFAULT NULL,
  `item_unidade_medida_id` int(100) DEFAULT NULL,
  `pedido_id` int(100) DEFAULT NULL,
  `data_atualizacao_pedido_item` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_pedido_item` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido_pagamento`
--

CREATE TABLE `pedido_pagamento` (
  `id_pedido_pagamento` int(11) NOT NULL,
  `parcela_atual_pedido_pagamento` int(11) NOT NULL,
  `parcela_total_pedido_pagamento` int(11) NOT NULL,
  `valor_pago_pedido_pagamento` float NOT NULL,
  `bool_esta_pago_pedido_pagamento` int(1) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `condicao_de_pagamento_id` int(200) NOT NULL,
  `data_atualizacao_pedido_pagamento` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_pedido_pagamento` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido_pagamento_extorno`
--

CREATE TABLE `pedido_pagamento_extorno` (
  `id_pedido_pagamento_extorno` int(11) NOT NULL,
  `motivo_pedido_pagamento_extorno` varchar(200) NOT NULL,
  `pedido_pagamento_id` int(200) NOT NULL,
  `data_atualizacao_pedido_pagamento_extorno` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_pedido_pagamento_extorno` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `relatorios`
--

CREATE TABLE `relatorios` (
  `id_relatorios` int(11) NOT NULL,
  `descricao_relatorios` varchar(200) NOT NULL,
  `tabela_relatorios` varchar(200) NOT NULL,
  `colunas_relatorios` text NOT NULL,
  `colunas_estrangeiras_relatorios` text NOT NULL,
  `colunas_filtro_relatorios` text,
  `bool_filtro_ativo_relatorios` int(1) NOT NULL DEFAULT '1',
  `data_atualizacao_relatorios` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_emitir_relatorios` int(1) NOT NULL DEFAULT '0',
  `bool_ativo_relatorios` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `relatorio_tabela`
--

CREATE TABLE `relatorio_tabela` (
  `id_relatorio_tabela` int(11) NOT NULL,
  `descricao_relatorio_tabela` varchar(200) NOT NULL,
  `data_atualizacao_relatorio_tabela` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_relatorio_tabela` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `unidade_medida`
--

CREATE TABLE `unidade_medida` (
  `id_unidade_medida` int(11) NOT NULL,
  `descricao_unidade_medida` varchar(100) DEFAULT NULL,
  `sigla_unidade_medida` varchar(100) NOT NULL,
  `data_atualizacao_unidade_medida` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `usuario_id` int(11) NOT NULL,
  `bool_ativo_unidade_medida` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `unidade_medida`
--

INSERT INTO `unidade_medida` (`id_unidade_medida`, `descricao_unidade_medida`, `sigla_unidade_medida`, `data_atualizacao_unidade_medida`, `usuario_id`, `bool_ativo_unidade_medida`) VALUES
(1, 'Kilo', 'KG', '2018-06-14 10:21:14', 1, 1),
(2, 'Litro', 'LT', '2018-06-14 10:21:26', 1, 1),
(3, 'Unidade', 'UN', '2018-06-14 10:21:38', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `upload_arq`
--

CREATE TABLE `upload_arq` (
  `id_upload_arq` int(11) NOT NULL,
  `descricao_upload_arq` varchar(100) NOT NULL,
  `tipo_upload_arq` varchar(100) NOT NULL,
  `data_atualizacaoupload_arq` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bool_ativo_upload_arq` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `upload_arq`
--

INSERT INTO `upload_arq` (`id_upload_arq`, `descricao_upload_arq`, `tipo_upload_arq`, `data_atualizacaoupload_arq`, `bool_ativo_upload_arq`) VALUES
(1, 'diversos.png', 'imagem', '2018-06-14 10:12:31', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome_usuario` varchar(200) DEFAULT NULL,
  `login_usuario` char(3) DEFAULT NULL,
  `senha_usuario` varchar(100) DEFAULT NULL,
  `nivel_acesso_id` int(11) NOT NULL DEFAULT '1',
  `bool_ativo_usuario` int(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome_usuario`, `login_usuario`, `senha_usuario`, `nivel_acesso_id`, `bool_ativo_usuario`) VALUES
(1, 'ADMINISTRADOR', 'ADM', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 1, 1),
(2, 'SITE', 'SIT', '*C737C0A2F678ACBE092353610475CC003320E65E', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `area_nivel_acesso`
--
ALTER TABLE `area_nivel_acesso`
  ADD PRIMARY KEY (`id_area_nivel_acesso`),
  ADD KEY `fk_area_nivel_acesso<>usuario` (`usuario_id`),
  ADD KEY `fk_area_nivel_acesso<>nivel_acesso` (`nivel_acesso_id`);

--
-- Indexes for table `caixa`
--
ALTER TABLE `caixa`
  ADD PRIMARY KEY (`id_caixa`),
  ADD KEY `fk_caixa<>usuario` (`usuario_id`),
  ADD KEY `fk_caixa<>filial` (`filial_id`);

--
-- Indexes for table `caixa_movimentacao`
--
ALTER TABLE `caixa_movimentacao`
  ADD PRIMARY KEY (`id_caixa_movimentacao`),
  ADD KEY `fk_caixa_movimentacao<>usuario` (`usuario_id`),
  ADD KEY `fk_caixa_movimentacao<>caixa` (`caixa_id`);

--
-- Indexes for table `caixa_operacao`
--
ALTER TABLE `caixa_operacao`
  ADD PRIMARY KEY (`id_caixa_operacao`),
  ADD KEY `fk_caixa_operacao<>usuario` (`usuario_id`),
  ADD KEY `fk_caixa_operacao<>caixa_movimentacao` (`caixa_movimentacao_id`),
  ADD KEY `fk_caixa_operacao<>operacoes_caixa` (`operacoes_caixa_id`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `fk_cliente<>usuario` (`usuario_id`);

--
-- Indexes for table `cliente_contato`
--
ALTER TABLE `cliente_contato`
  ADD PRIMARY KEY (`id_cliente_contato`),
  ADD KEY `fk_cliente_contato<>usuario` (`usuario_id`),
  ADD KEY `fk_cliente_contato<>cliente` (`cliente_id`);

--
-- Indexes for table `cliente_endereco`
--
ALTER TABLE `cliente_endereco`
  ADD PRIMARY KEY (`id_cliente_endereco`),
  ADD KEY `fk_cliente_endereco<>usuario` (`usuario_id`),
  ADD KEY `fk_cliente_endereco<>estado` (`estado_id`),
  ADD KEY `fk_cliente_endereco<>cliente` (`cliente_id`);

--
-- Indexes for table `condicao_de_pagamento`
--
ALTER TABLE `condicao_de_pagamento`
  ADD PRIMARY KEY (`id_condicao_de_pagamento`),
  ADD KEY `fk_condicao_de_pagamento<>usuario` (`usuario_id`);

--
-- Indexes for table `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD KEY `fk_empresa<>usuario` (`usuario_id`);

--
-- Indexes for table `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id_estado`),
  ADD KEY `fk_estado<>usuario` (`usuario_id`);

--
-- Indexes for table `filial`
--
ALTER TABLE `filial`
  ADD PRIMARY KEY (`id_filial`),
  ADD KEY `fk_filial<>usuario` (`usuario_id`),
  ADD KEY `fk_filial<>empresa` (`empresa_id`);

--
-- Indexes for table `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id_grupo`),
  ADD KEY `fk_grupo<>usuario` (`usuario_id`),
  ADD KEY `fk_grupo<>filial` (`filial_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `fk_item<>usuario` (`usuario_id`),
  ADD KEY `fk_item<>grupo` (`grupo_id`);

--
-- Indexes for table `item_unidade_medida`
--
ALTER TABLE `item_unidade_medida`
  ADD PRIMARY KEY (`id_item_unidade_medida`),
  ADD KEY `fk_item_unidade_medida<>usuario` (`usuario_id`),
  ADD KEY `fk_item_unidade_medida<>unidade_medida` (`unidade_medida_id`),
  ADD KEY `fk_item_unidade_medida<>item` (`item_id`);

--
-- Indexes for table `nivel_acesso`
--
ALTER TABLE `nivel_acesso`
  ADD PRIMARY KEY (`id_nivel_acesso`),
  ADD KEY `fk_nivel_acesso<>usuario` (`usuario_id`);

--
-- Indexes for table `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD PRIMARY KEY (`id_notificacoes`),
  ADD KEY `fk_notificacoes<>notificacoes_config` (`notificacoes_config_id`);

--
-- Indexes for table `notificacoes_config`
--
ALTER TABLE `notificacoes_config`
  ADD PRIMARY KEY (`id_notificacoes_config`),
  ADD KEY `fk_notificacoes_config<>usuario` (`usuario_id`);

--
-- Indexes for table `notificacoes_pendentes`
--
ALTER TABLE `notificacoes_pendentes`
  ADD PRIMARY KEY (`id_notificacoes_pendentes`),
  ADD KEY `fk_notificacoes_pendentes<>notificacoes_config` (`notificacoes_config_id`);

--
-- Indexes for table `notificacoes_salvas`
--
ALTER TABLE `notificacoes_salvas`
  ADD PRIMARY KEY (`id_notificacoes_salvas`),
  ADD KEY `fk_notificacoes_salvas<>notificacoes_config` (`notificacoes_config_id`);

--
-- Indexes for table `operacoes_caixa`
--
ALTER TABLE `operacoes_caixa`
  ADD PRIMARY KEY (`id_operacoes_caixa`),
  ADD KEY `fk_operacoes_caixa<>usuario` (`usuario_id`);

--
-- Indexes for table `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `fk_pedido<>usuario` (`usuario_id`),
  ADD KEY `fk_pedido<>filial` (`filial_id`),
  ADD KEY `fk_pedido<>cliente` (`cliente_id`);

--
-- Indexes for table `pedido_item`
--
ALTER TABLE `pedido_item`
  ADD PRIMARY KEY (`id_pedido_item`),
  ADD KEY `fk_pedido_item<>usuario` (`usuario_id`),
  ADD KEY `fk_pedido_item<>pedido` (`pedido_id`),
  ADD KEY `fk_pedido_item<>item` (`item_id`),
  ADD KEY `fk_pedido_item<>item_unidade_medida` (`item_unidade_medida_id`);

--
-- Indexes for table `pedido_pagamento`
--
ALTER TABLE `pedido_pagamento`
  ADD PRIMARY KEY (`id_pedido_pagamento`),
  ADD KEY `fk_pedido_pagamento<>usuario` (`usuario_id`),
  ADD KEY `fk_pedido_pagamento<>condicao_de_pagamento` (`condicao_de_pagamento_id`),
  ADD KEY `fk_pedido_pagamento<>pedido` (`pedido_id`);

--
-- Indexes for table `pedido_pagamento_extorno`
--
ALTER TABLE `pedido_pagamento_extorno`
  ADD PRIMARY KEY (`id_pedido_pagamento_extorno`),
  ADD KEY `fk_pedido_pagamento_extorno<>usuario` (`usuario_id`),
  ADD KEY `fk_pedido_pagamento_extorno<>pedido_pagamento` (`pedido_pagamento_id`);

--
-- Indexes for table `relatorios`
--
ALTER TABLE `relatorios`
  ADD PRIMARY KEY (`id_relatorios`);

--
-- Indexes for table `relatorio_tabela`
--
ALTER TABLE `relatorio_tabela`
  ADD PRIMARY KEY (`id_relatorio_tabela`);

--
-- Indexes for table `unidade_medida`
--
ALTER TABLE `unidade_medida`
  ADD PRIMARY KEY (`id_unidade_medida`),
  ADD KEY `fk_unidade_medida<>usuario` (`usuario_id`);

--
-- Indexes for table `upload_arq`
--
ALTER TABLE `upload_arq`
  ADD PRIMARY KEY (`id_upload_arq`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `Login` (`login_usuario`),
  ADD KEY `fk_usuario<>nivel_acesso` (`nivel_acesso_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `area_nivel_acesso`
--
ALTER TABLE `area_nivel_acesso`
  MODIFY `id_area_nivel_acesso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT for table `caixa`
--
ALTER TABLE `caixa`
  MODIFY `id_caixa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `caixa_movimentacao`
--
ALTER TABLE `caixa_movimentacao`
  MODIFY `id_caixa_movimentacao` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `caixa_operacao`
--
ALTER TABLE `caixa_operacao`
  MODIFY `id_caixa_operacao` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `cliente_contato`
--
ALTER TABLE `cliente_contato`
  MODIFY `id_cliente_contato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `cliente_endereco`
--
ALTER TABLE `cliente_endereco`
  MODIFY `id_cliente_endereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `condicao_de_pagamento`
--
ALTER TABLE `condicao_de_pagamento`
  MODIFY `id_condicao_de_pagamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `estado`
--
ALTER TABLE `estado`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `filial`
--
ALTER TABLE `filial`
  MODIFY `id_filial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id_grupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `item_unidade_medida`
--
ALTER TABLE `item_unidade_medida`
  MODIFY `id_item_unidade_medida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `nivel_acesso`
--
ALTER TABLE `nivel_acesso`
  MODIFY `id_nivel_acesso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `notificacoes`
--
ALTER TABLE `notificacoes`
  MODIFY `id_notificacoes` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notificacoes_config`
--
ALTER TABLE `notificacoes_config`
  MODIFY `id_notificacoes_config` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notificacoes_pendentes`
--
ALTER TABLE `notificacoes_pendentes`
  MODIFY `id_notificacoes_pendentes` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notificacoes_salvas`
--
ALTER TABLE `notificacoes_salvas`
  MODIFY `id_notificacoes_salvas` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `operacoes_caixa`
--
ALTER TABLE `operacoes_caixa`
  MODIFY `id_operacoes_caixa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pedido_item`
--
ALTER TABLE `pedido_item`
  MODIFY `id_pedido_item` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pedido_pagamento`
--
ALTER TABLE `pedido_pagamento`
  MODIFY `id_pedido_pagamento` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pedido_pagamento_extorno`
--
ALTER TABLE `pedido_pagamento_extorno`
  MODIFY `id_pedido_pagamento_extorno` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `relatorios`
--
ALTER TABLE `relatorios`
  MODIFY `id_relatorios` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `relatorio_tabela`
--
ALTER TABLE `relatorio_tabela`
  MODIFY `id_relatorio_tabela` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `unidade_medida`
--
ALTER TABLE `unidade_medida`
  MODIFY `id_unidade_medida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `upload_arq`
--
ALTER TABLE `upload_arq`
  MODIFY `id_upload_arq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `area_nivel_acesso`
--
ALTER TABLE `area_nivel_acesso`
  ADD CONSTRAINT `fk_area_nivel_acesso<>nivel_acesso` FOREIGN KEY (`nivel_acesso_id`) REFERENCES `nivel_acesso` (`id_nivel_acesso`),
  ADD CONSTRAINT `fk_area_nivel_acesso<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `caixa`
--
ALTER TABLE `caixa`
  ADD CONSTRAINT `fk_caixa<>filial` FOREIGN KEY (`filial_id`) REFERENCES `filial` (`id_filial`),
  ADD CONSTRAINT `fk_caixa<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `caixa_movimentacao`
--
ALTER TABLE `caixa_movimentacao`
  ADD CONSTRAINT `fk_caixa_movimentacao<>caixa` FOREIGN KEY (`caixa_id`) REFERENCES `caixa` (`id_caixa`),
  ADD CONSTRAINT `fk_caixa_movimentacao<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `caixa_operacao`
--
ALTER TABLE `caixa_operacao`
  ADD CONSTRAINT `fk_caixa_operacao<>caixa_movimentacao` FOREIGN KEY (`caixa_movimentacao_id`) REFERENCES `caixa_movimentacao` (`id_caixa_movimentacao`),
  ADD CONSTRAINT `fk_caixa_operacao<>operacoes_caixa` FOREIGN KEY (`operacoes_caixa_id`) REFERENCES `operacoes_caixa` (`id_operacoes_caixa`),
  ADD CONSTRAINT `fk_caixa_operacao<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_cliente<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `cliente_contato`
--
ALTER TABLE `cliente_contato`
  ADD CONSTRAINT `fk_cliente_contato<>cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `fk_cliente_contato<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `cliente_endereco`
--
ALTER TABLE `cliente_endereco`
  ADD CONSTRAINT `fk_cliente_endereco<>cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `fk_cliente_endereco<>estado` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`id_estado`),
  ADD CONSTRAINT `fk_cliente_endereco<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `condicao_de_pagamento`
--
ALTER TABLE `condicao_de_pagamento`
  ADD CONSTRAINT `fk_condicao_de_pagamento<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `fk_empresa<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `estado`
--
ALTER TABLE `estado`
  ADD CONSTRAINT `fk_estado<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `filial`
--
ALTER TABLE `filial`
  ADD CONSTRAINT `fk_filial<>empresa` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id_empresa`),
  ADD CONSTRAINT `fk_filial<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `fk_grupo<>filial` FOREIGN KEY (`filial_id`) REFERENCES `filial` (`id_filial`),
  ADD CONSTRAINT `fk_grupo<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_item<>grupo` FOREIGN KEY (`grupo_id`) REFERENCES `grupo` (`id_grupo`),
  ADD CONSTRAINT `fk_item<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `item_unidade_medida`
--
ALTER TABLE `item_unidade_medida`
  ADD CONSTRAINT `fk_item_unidade_medida<>item` FOREIGN KEY (`item_id`) REFERENCES `item` (`id_item`),
  ADD CONSTRAINT `fk_item_unidade_medida<>unidade_medida` FOREIGN KEY (`unidade_medida_id`) REFERENCES `unidade_medida` (`id_unidade_medida`),
  ADD CONSTRAINT `fk_item_unidade_medida<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `nivel_acesso`
--
ALTER TABLE `nivel_acesso`
  ADD CONSTRAINT `fk_nivel_acesso<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD CONSTRAINT `fk_notificacoes<>notificacoes_config` FOREIGN KEY (`notificacoes_config_id`) REFERENCES `notificacoes_config` (`id_notificacoes_config`);

--
-- Limitadores para a tabela `notificacoes_config`
--
ALTER TABLE `notificacoes_config`
  ADD CONSTRAINT `fk_notificacoes_config<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `notificacoes_pendentes`
--
ALTER TABLE `notificacoes_pendentes`
  ADD CONSTRAINT `fk_notificacoes_pendentes<>notificacoes_config` FOREIGN KEY (`notificacoes_config_id`) REFERENCES `notificacoes_config` (`id_notificacoes_config`);

--
-- Limitadores para a tabela `notificacoes_salvas`
--
ALTER TABLE `notificacoes_salvas`
  ADD CONSTRAINT `fk_notificacoes_salvas<>notificacoes_config` FOREIGN KEY (`notificacoes_config_id`) REFERENCES `notificacoes_config` (`id_notificacoes_config`);

--
-- Limitadores para a tabela `operacoes_caixa`
--
ALTER TABLE `operacoes_caixa`
  ADD CONSTRAINT `fk_operacoes_caixa<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido<>cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `fk_pedido<>filial` FOREIGN KEY (`filial_id`) REFERENCES `filial` (`id_filial`),
  ADD CONSTRAINT `fk_pedido<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `pedido_item`
--
ALTER TABLE `pedido_item`
  ADD CONSTRAINT `fk_pedido_item<>item` FOREIGN KEY (`item_id`) REFERENCES `item` (`id_item`),
  ADD CONSTRAINT `fk_pedido_item<>item_unidade_medida` FOREIGN KEY (`item_unidade_medida_id`) REFERENCES `item_unidade_medida` (`id_item_unidade_medida`),
  ADD CONSTRAINT `fk_pedido_item<>pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `fk_pedido_item<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `pedido_pagamento`
--
ALTER TABLE `pedido_pagamento`
  ADD CONSTRAINT `fk_pedido_pagamento<>condicao_de_pagamento` FOREIGN KEY (`condicao_de_pagamento_id`) REFERENCES `condicao_de_pagamento` (`id_condicao_de_pagamento`),
  ADD CONSTRAINT `fk_pedido_pagamento<>pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `fk_pedido_pagamento<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `pedido_pagamento_extorno`
--
ALTER TABLE `pedido_pagamento_extorno`
  ADD CONSTRAINT `fk_pedido_pagamento_extorno<>pedido_pagamento` FOREIGN KEY (`pedido_pagamento_id`) REFERENCES `pedido_pagamento` (`id_pedido_pagamento`),
  ADD CONSTRAINT `fk_pedido_pagamento_extorno<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `unidade_medida`
--
ALTER TABLE `unidade_medida`
  ADD CONSTRAINT `fk_unidade_medida<>usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`);

--
-- Limitadores para a tabela `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario<>nivel_acesso` FOREIGN KEY (`nivel_acesso_id`) REFERENCES `nivel_acesso` (`id_nivel_acesso`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
