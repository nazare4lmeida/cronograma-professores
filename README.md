📘 Sistema de Gestão de Cronogramas – Geração Tech 3.0

O Gerenciador de Cronogramas é uma plataforma front-end desenvolvida para otimizar o planejamento pedagógico e a coleta de evidências dos instrutores dos cursos de Inteligência Artificial Generativa e IA + Soft Skills (IASP).

A solução substitui registros manuais por um ambiente digital, persistente, dinâmico e orientado à produtividade, garantindo organização, segurança das informações e melhor experiência de uso para os docentes.

🧩 Arquitetura de Funcionalidades

O sistema foi projetado com base em três pilares fundamentais:

1️⃣ Gestão Dinâmica de Conteúdo

Segmentação por Matriz
Filtros inteligentes que permitem alternar instantaneamente entre cursos e turmas, considerando calendários específicos:

Terça / Quinta

Segunda / Quarta

Editor de Ementas
Módulo integrado que possibilita ao docente:

Ajustar o roteiro de conteúdo

Atualizar atividades práticas em tempo real

Visualização Modular
Uso de componentes expansíveis para exibição de:

Roadmaps

Objetivos
Sem comprometer a clareza da interface.

2️⃣ Persistência e Segurança

Auto-save via LocalStorage
Mecanismo automático de salvamento que garante a integridade das anotações mesmo após o fechamento do navegador.

Segregação de Dados
Separação técnica entre:

Conteúdo programático oficial

Anotações privadas do instrutor
Utilizando chaves exclusivas de armazenamento.

3️⃣ Experiência do Usuário (UX)

Design em Glassmorphism
Interface moderna com efeitos de transparência, sombras suaves e tipografia avançada para maior legibilidade.

Sistema de Temas Sóbrios

Dark Mode nativo

Otimizado para longos períodos de uso

Redução da fadiga visual

## ⚙️ Especificações Técnicas

- **Linguagem Base:**  
  JavaScript Vanilla (ES6+)  
  Responsável pela lógica de processamento e manipulação do DOM.

- **Estilização:**  
  CSS3 Moderno (Variables e Flexbox)  
  Utilizado para construção da interface responsiva e do sistema de temas dinâmicos.

- **Persistência:**  
  Web Storage API (LocalStorage)  
  Armazenamento local de dados, preferências e anotações do instrutor.

- **Interface:**  
  HTML5 Semântico  
  Estruturação adequada do conteúdo, seguindo boas práticas de acessibilidade.


🔄 Fluxo de Operação

Configuração de Período
Selecione o curso e a turma correspondente no cabeçalho da aplicação.

Preparação Pedagógica
Acesse a seção “Ementa Completa” para revisar ou customizar o roteiro da aula.

Registro de Evidências
Utilize o campo de anotações privadas para registrar:

Progresso da aula

Observações técnicas

Evidências pedagógicas

Consolidação de Relatório
Acione o comando de exportação para baixar o relatório estruturado em formato .txt.

📁 Estrutura do Projeto
/
├── index.html      # Ponto de entrada e estrutura semântica
├── style.css       # Motor de estilização e definições de tema
├── cronograma.js   # Base de dados estruturada e lógica de datas
├── script.js       # Controlador de eventos e persistência
└── export.js       # Módulo de geração de relatórios externos