Sistema de Gestão de Cronogramas – Geração Tech 3.0O 

Gerenciador de Cronogramas Interativos é uma plataforma front-end desenvolvida para otimizar o planejamento pedagógico e a coleta de evidências dos instrutores dos cursos de Inteligência Artificial Generativa e IA + Soft Skills (IASP). A solução substitui registros manuais por um ambiente digital persistente, dinâmico e focado em produtividade.

1. Arquitetura de FuncionalidadesO sistema foi projetado sob três pilares fundamentais:

Gestão Dinâmica de Conteúdo

Segmentação por Matriz: Filtros inteligentes que alternam instantaneamente entre cursos e turmas baseados em calendários específicos (Terça/Quinta e Segunda/Quarta).

Editor de Ementas: Módulo integrado que permite ao docente ajustar o roteiro de conteúdo e as atividades práticas em tempo real.

Visualização Modular: Uso de componentes expansíveis para exibir Roadmaps e Objetivos sem comprometer a clareza da interface.

Persistência e SegurançaAuto-save via LocalStorage: Mecanismo que garante a integridade das anotações mesmo após o fechamento do navegador, eliminando o risco de perda de dados.

Segregação de Dados: Separação técnica entre o conteúdo programático oficial e as anotações privadas do professor através de chaves exclusivas de armazenamento.

Experiência do Usuário (UX)Design Glassmorphism: Interface moderna baseada em efeitos de transparência e tipografia avançada para maior legibilidade.

Sistema de Temas Sóbrios: Dark Mode nativo otimizado para turnos prolongados, reduzindo a fadiga visual.

2. Especificações Técnicas

Componente,Tecnologia,Finalidade
Linguagem Base,JavaScript Vanilla (ES6+),Lógica de processamento e manipulação de DOM.
Estilização,CSS3 Moderno (Variables/Flex),Interface responsiva e sistema de temas dinâmicos.
Persistência,Web Storage API,Armazenamento local de dados e customizações.
Interface,HTML5 Semântico,Estruturação de dados e padrões de acessibilidade.

3. Fluxo de Operação

Configuração de Período: Selecione o curso e a turma correspondente no cabeçalho da aplicação.

Preparação Pedagógica: Acesse a seção "Ementa Completa" para revisar ou customizar o roteiro da aula.

Registro de Evidências: Utilize o campo de anotações privadas para registrar o progresso e observações técnicas.

Consolidação de Relatório: Acione o comando de exportação para baixar o registro documental estruturado em formato .txt.

4. Estrutura do Projeto

index.html: Ponto de entrada e estrutura semântica.
style.css: Motor de estilização e definições de tema.
cronograma.js: Base de dados estruturada e lógica de datas.
script.js: Controlador de eventos e persistência de dados.
export.js: Módulo de geração de relatórios externos.