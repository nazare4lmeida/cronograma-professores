Sistema de Gestão de Cronogramas – Geração Tech 3.0
O Gerenciador de Cronogramas Interativos é uma solução front-end desenvolvida para otimizar o fluxo de trabalho de instrutores dos cursos de Inteligência Artificial Generativa e IA + Soft Skills (IASP). A plataforma centraliza o planejamento pedagógico e a coleta de evidências de aula em um ambiente dinâmico e persistente.

Arquitetura de Funcionalidades
Gestão Dinâmica de Conteúdo
Segmentação por Matriz: Filtros integrados para seleção de cursos e turmas baseados em calendários específicos (Terça/Quinta e Segunda/Quarta).

Roadmaps Editáveis: Módulo que permite ao docente ajustar o roteiro de conteúdo e as atividades práticas diretamente na interface, com persistência de dados.

Persistência e Segurança de Dados
Auto-save via LocalStorage: Implementação de armazenamento local que garante a integridade das anotações e customizações mesmo após o fechamento da sessão ou reinicialização do navegador.

Segregação de Dados: Separação clara entre o material didático oficial e as anotações privadas do professor através de chaves únicas de armazenamento.

Interface e Experiência do Usuário (UX)
Design Glassmorphism: Interface moderna desenvolvida com foco em legibilidade, utilizando a tipografia Plus Jakarta Sans e hierarquia visual avançada.

Dark Mode Nativo: Sistema de temas sóbrios baseado em variáveis CSS para redução da fadiga visual em períodos prolongados de uso.

Exportação e Relatórios
Data Export: Módulo capaz de consolidar todas as entradas do LocalStorage em arquivos de texto (.txt) estruturados, facilitando a entrega de relatórios para a coordenação.

Estrutura Técnica
O projeto foi construído utilizando os pilares do desenvolvimento web moderno, priorizando a ausência de dependências externas para maximizar o desempenho:

Linguagem: JavaScript Vanilla (ES6+) para manipulação assíncrona do DOM.

Estilização: CSS3 avançado com sistema de variáveis e Flexbox/Grid Layout para responsividade total.

Estrutura: HTML5 semântico focado em acessibilidade e SEO técnico.

Procedimentos de Operação
Configuração de Sessão: Utilize os seletores no cabeçalho para definir o curso e o período letivo correspondente.

Customização Pedagógica: No campo "Editar Material", ajuste o roadmap de conteúdo conforme a necessidade da turma.

Registro de Evidências: Utilize o bloco de notas privativo para registrar o progresso dos alunos e observações de aula.

Consolidação: Acione o comando de exportação para gerar o registro documental das atividades realizadas.