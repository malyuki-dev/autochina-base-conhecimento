import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const videos = [
    {
        id: 'v1',
        title: 'Setor de Peças - Entrada de Notas e Integração',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260119_080009__SETOR DE PEÇAS-ENTRADA DE NOTAS E INTEGRAÇAO.mp4',
        category: 'Peças',
        steps: [
            { title: 'Acesso ao Módulo de Peças', description: 'Navegue até o menu principal e selecione o módulo de Entrada de Notas.', time: '15:40' },
            { title: 'Importação do XML', description: 'Importe o arquivo XML da Nota Fiscal de origem do fornecedor.', time: '57:29' },
            { title: 'Validação e Conferência', description: 'Verifique os impostos, valores e se as peças estão cadastradas corretamente no estoque.', time: '99:18' },
            { title: 'Integração e Conclusão', description: 'Confirme a entrada para alimentar o estoque e gerar as pendências financeiras integradas.', time: '141:07' }
        ]
    },
    {
        id: 'v2',
        title: 'Venda de Veículos e Venda Balcão',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260119_140019-VENDA DE VEICULOS E VENDA BALCÃO.mp4',
        category: 'Vendas',
        steps: [
            { title: 'Pesquisa de Cliente', description: 'Inicie pesquisando o cliente por CPF/CNPJ ou realize um novo cadastro.', time: '19:05' },
            { title: 'Seleção do Veículo ou Peça', description: 'Para venda balcão, adicione as peças. Para veículos, selecione o modelo e chassi disponível no estoque.', time: '69:59' },
            { title: 'Negociação e Formas de Pagamento', description: 'Insira os descontos aplicáveis, taxas e escolha as condições de pagamento.', time: '120:53' },
            { title: 'Faturamento', description: 'Gere a pré-venda e encaminhe para o faturamento para a emissão da NF.', time: '171:47' }
        ]
    },
    {
        id: 'v3',
        title: 'Treinamento TI',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260120_080534-TREINAMENTO TI.mp4',
        category: 'TI',
        steps: [
            { title: 'Gestão de Usuários', description: 'Acesse o painel de administração e gerencie permissões, senhas e perfis.', time: '06:46' },
            { title: 'Parâmetros do Sistema', description: 'Configure as regras gerais aplicadas em todos os módulos.', time: '33:53' },
            { title: 'Manutenção de Cadastros', description: 'Orientações sobre bloqueios e manutenções preventivas de cadastros essenciais.', time: '61:00' }
        ]
    },
    {
        id: 'v4',
        title: 'Venda de Veículos',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260120_100044-VENDA DE VEÍCULOS.mp4',
        category: 'Vendas',
        steps: [
            { title: 'Atendimento do Lead', description: 'Receba ou registre o contato inicial do cliente interessado.', time: '09:41' },
            { title: 'Proposta Comercial', description: 'Estruture a proposta, inserindo veículo, emplacamento, despachante e acessórios adicionais.', time: '35:33' },
            { title: 'Aprovação de Crédito', description: 'Caso haja financiamento, insira os dados do banco e a simulação de crédito.', time: '61:25' },
            { title: 'Fechamento de Negócio', description: 'Converta a proposta em venda e prepare a documentação do veículo.', time: '87:16' }
        ]
    },
    {
        id: 'v5',
        title: 'Agendamento',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260120_160048-AGENDAMENTO.mp4',
        category: 'Serviços',
        steps: [
            { title: 'Abertura do Quadro de Agendamento', description: 'Acesse o calendário da oficina.', time: '06:38' },
            { title: 'Seleção de Previsão', description: 'Escolha a data, o consultor responsável e a hora disponível.', time: '24:19' },
            { title: 'Informações do Cliente e Veículo', description: 'Busque a placa do veículo, confirme ou atualize os contatos e registre a reclamação do cliente.', time: '42:01' },
            { title: 'Confirmação', description: 'Finalize o apontamento para bloquear a agenda do consultor.', time: '59:42' }
        ]
    },
    {
        id: 'v6',
        title: 'Garantia',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260121_080142-GARANTIA.mp4',
        category: 'Serviços',
        steps: [
            { title: 'Abertura do Processo', description: 'Identifique o chassi e inicie o pedido de cobertura de garantia junto à montadora.', time: '11:02' },
            { title: 'Inclusão de Peças e Serviços', description: 'Adicione os códigos de deficiência e as peças substituídas.', time: '40:29' },
            { title: 'Envio de Evidências', description: 'Anexe as fotos e laudos técnicos exigidos pela fábrica.', time: '69:56' },
            { title: 'Faturamento de Garantia', description: 'Gere a NF de remessa/garantia após aprovação da montadora.', time: '99:24' }
        ]
    },
    {
        id: 'v7',
        title: 'Abertura de OS - Consultores',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260121_103750-ABERTURA DE OS_CONSULTORES.mp4',
        category: 'Serviços',
        steps: [
            { title: 'Recepção do Cliente', description: 'Transforme o agendamento prévio na Ordem de Serviço.', time: '07:25' },
            { title: 'Check-list do Veículo', description: 'Realize e anote as avarias externas e o nível de combustível.', time: '27:14' },
            { title: 'Pacotes de Revisão', description: 'Adicione pacotes fechados de fábrica para a quilometragem atual.', time: '47:02' },
            { title: 'Impressão da OS', description: 'Imprima o documento, colete a assinatura do cliente e encaminhe para a oficina.', time: '66:51' }
        ]
    },
    {
        id: 'v8',
        title: 'Marcação de Tempo e Requisição de Peças',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260121_141133-MARCAÇAO DE TEMPO E REQUISIÇÃO DE PEÇAS.mp4',
        category: 'Serviços',
        steps: [
            { title: 'Apontamento do Mecânico', description: 'O produtivo deve iniciar o tempo (start) do serviço selecionado.', time: '05:38' },
            { title: 'Diagnóstico e Requisição', description: 'Ao encontrar um problema, o mecânico ou orçamentista solicita a peça ao balcão interno.', time: '20:39' },
            { title: 'Atendimento do Balcão', description: 'O estoquista separa e entrega a peça faturando para a OS em aberto.', time: '35:40' },
            { title: 'Parada e Conclusão', description: 'O mecânico pausa ou finaliza (stop) o tempo para apuração da eficiência.', time: '50:42' }
        ]
    },
    {
        id: 'v9',
        title: 'Marcação de Tempo e Requisição de Peças 2',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260122_081436MARCAÇAO DE TEMPO E REQUISIÇÃO DE PEÇAS.mp4',
        category: 'Serviços',
        steps: [
            { title: 'Serviços Adicionais', description: 'Como lidar com peças requisitadas em serviços complementares identificados no diagnóstico.', time: '07:39' },
            { title: 'Aprovação do Cliente', description: 'O processo de orçar a peça adicional e entrar em contato com o cliente para aprovação prévia.', time: '38:16' },
            { title: 'Devolução de Peças', description: 'Como estornar uma requisição caso a peça não tenha sido utilizada na ordem de serviço.', time: '68:54' }
        ]
    },
    {
        id: 'v10',
        title: 'Entrega de Veículos',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260122_101600-ENTREGA DE VEÍCULOS.mp4',
        category: 'Serviços',
        steps: [
            { title: 'Auditoria de OS', description: 'O consultor realiza a verificação de qualidade dos serviços e peças aplicados.', time: '02:42' },
            { title: 'Faturamento de Serviço', description: 'Encerramento comercial da OS, unindo os valores de peças e mão de obra.', time: '09:55' },
            { title: 'Emissão de Notas', description: 'Geração das NFs conjugadas ou separadas conforme regras fiscais e parametrizações.', time: '17:08' },
            { title: 'Baixa e Liberação', description: 'Apresentação do veículo ao cliente, acerto financeiro e liberação para saída.', time: '24:21' }
        ]
    },
    {
        id: 'v11',
        title: 'Agendamento, Apontamento, Requisição, OS Garantia/Interna',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260122_140409-AGENDAMMENTO_APONTAMENTO_REQUISIIÇAO_OS DE GARANTIA_OS INTERNA.mp4',
        category: 'Serviços',
        steps: [
            { title: 'Revisão do Fluxo Completo', description: 'Passagem geral abordando cada tela e garantindo que o fluxo não tenha interrupções.', time: '06:36' },
            { title: 'Abertura de OS Interna', description: 'Criação de ordens para despesas da concessionária, como preparação e lavagem.', time: '33:04' },
            { title: 'Separação Financeira', description: 'Como ratear os custos da OS de maneira correta no centro de custo do negócio.', time: '59:32' }
        ]
    },
    {
        id: 'v12',
        title: 'Abertura de OS - Consultores 2',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260122_160815-ABERTURA DE OS_CONSULTORES.mp4',
        category: 'Serviços',
        steps: [
            { title: 'Dúvidas Frequentes', description: 'Revisão dos campos obrigatórios e essenciais que costumam passar despercebidos.', time: '04:15' },
            { title: 'Campanhas de Fábrica', description: 'Verificação automática do histórico de recall do veículo no momento da recepção.', time: '38:21' }
        ]
    },
    {
        id: 'v13',
        title: 'Rotinas dos Vendedores e Administrativas',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260123_095842-ROTINAS DOS VENDEDORES E ADMINISTRATIVAS.mp4',
        category: 'Vendas',
        steps: [
            { title: 'Acompanhamento do Funil', description: 'Atualização do status de atendimento dos Leads e propostas de veículos pendentes.', time: '09:41' },
            { title: 'Gestão de Test Drives', description: 'Abertura da autorização, assinatura do termo de responsabilidade e encerramento do trajeto.', time: '48:25' },
            { title: 'Mapas e Relatórios', description: 'Consultar os relatórios diários de vendas para gestão do desempenho e controle.', time: '87:09' }
        ]
    },
    {
        id: 'v14',
        title: 'Rotinas Administrativas',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260123_113653-ROTINAS ADMINISTRATIVAS.mp4',
        category: 'Administrativo',
        steps: [
            { title: 'Contas a Pagar/Receber', description: 'Baixa de títulos provenientes de processos de oficina e vendas concluídas.', time: '00:37' },
            { title: 'Conciliação Bancária', description: 'Cruzamento das informações de caixa e depósitos com o extrato financeiro da empresa.', time: '03:05' },
            { title: 'Conferência de Relatórios', description: 'Emissão e revisão dos relatórios gerenciais e operacionais consolidados.', time: '05:34' }
        ]
    },
    {
        id: 'v15',
        title: 'Administração de Peças',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260123_140033-ADMINISTRAÇÃO DE PEÇAS.mp4',
        category: 'Peças',
        steps: [
            { title: 'Reposição de Estoque', description: 'Geração do pedido de compra baseando-se na curva ABC de peças e histórico.', time: '06:59' },
            { title: 'Inventário Rotativo', description: 'Definição das prateleiras, contagem física e ajuste sistêmico das divergências.', time: '34:55' },
            { title: 'Peças Obsoletas', description: 'Visualização de relatórios de giro, identificando itens lentos que necessitam ação.', time: '62:52' }
        ]
    },
    {
        id: 'v16',
        title: 'CRM',
        filename: 'Cronograma de Treinamento – AUTO CHINA (CHERY) 1901 a 27012026-20260123_162338-CRM.mp4',
        category: 'CRM',
        steps: [
            { title: 'Campanhas de Pós-Venda', description: 'Emissão de listagem de clientes cujos veículos estão próximos do tempo da revisão ou garantia.', time: '05:58' },
            { title: 'Contato Ativo e Registro', description: 'Registro de cada ligação feita ao cliente, informando se houve agendamento ou recusa.', time: '29:51' },
            { title: 'Pesquisa de Satisfação', description: 'Inserir as respostas das avaliações de qualidade (CSI) aplicadas após o faturamento.', time: '53:45' }
        ]
    },
    {
        id: 'v17',
        title: 'Treinamento Contabilidade 01',
        filename: 'TREINAMENTO CONTABILIDADE 01.mp4',
        category: 'Contabilidade',
        steps: [
            { title: 'Plano de Contas', description: 'Cadastramento e parametrização sistêmica em todas as filiais do grupo.', time: '06:15' },
            { title: 'Lançamentos Contábeis', description: 'Processo de integração visualizando os lotes gerados pelos demais módulos de forma online.', time: '31:18' },
            { title: 'Apuração de Impostos', description: 'Conferência dos blocos fiscais, apuração e geração de arquivos para o fisco.', time: '56:22' }
        ]
    }
];

async function main() {
    console.log('Deletando recursos existentes...');
    await prisma.step.deleteMany();
    await prisma.resource.deleteMany();

    console.log('Semeando dados originais...');
    for (const v of videos) {
        await prisma.resource.create({
            data: {
                title: v.title,
                fileUrl: v.filename,
                type: 'VIDEO',
                category: v.category,
                description: `Treinamento sobre ${v.title}`,
                steps: {
                    create: v.steps?.map(s => ({
                        title: s.title,
                        description: s.description,
                        time: s.time
                    })) || []
                }
            }
        });
    }

    console.log('Semente finalizada com sucesso!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
