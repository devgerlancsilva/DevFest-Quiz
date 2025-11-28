import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Orquestração",
    description: "É como um maestro, ele ajuda a organizar muitos pedacinhos de um programa para que todos funcionem juntos. Faz com que apps possam ser facilmente aumentados ou diminuídos.",
    options: ["Docker", "Kubernetes", "Cloud Run", "Compute Engine"],
    correctAnswer: 1,
    category: 'Cloud'
  },
  {
    id: 2,
    title: "IA & ML",
    description: "Ajuda a criar e treinar programas de Inteligência Artificial, ensinando o computador a tomar decisões, como reconhecer um gato em uma foto.",
    options: ["TensorFlow", "Google AI Studio", "Vertex AI", "Gemini"],
    correctAnswer: 2,
    category: 'AI'
  },
  {
    id: 3,
    title: "Mobile Development",
    description: "É um kit de ferramentas UI do Google para criar aplicativos nativos compilados para dispositivos móveis, web e desktop a partir de uma única base de código.",
    options: ["Android Studio", "Kotlin", "Flutter", "Firebase"],
    correctAnswer: 2,
    category: 'Mobile'
  },
  {
    id: 4,
    title: "Big Data",
    description: "É como um super detetive para dados. Ele consegue procurar informações em um oceano gigantesco de dados em segundos.",
    options: ["Cloud SQL", "BigQuery", "Looker", "Cloud Spanner"],
    correctAnswer: 1,
    category: 'Data'
  },
  {
    id: 5,
    title: "IDE Mobile",
    description: "É o Ambiente de Desenvolvimento Integrado (IDE) oficial e gratuito do Google para a criação de aplicativos para o sistema operacional Android.",
    options: ["VS Code", "Eclipse", "Android Studio", "IntelliJ IDEA"],
    correctAnswer: 2,
    category: 'Mobile'
  },
  {
    id: 6,
    title: "Data Visualization",
    description: "É a ferramenta que transforma todos aqueles dados (que o BigQuery encontra) em gráficos e relatórios fáceis de ver.",
    options: ["Google Sheets", "Looker", "Data Studio", "Tableau"],
    correctAnswer: 1,
    category: 'Data'
  },
  {
    id: 7,
    title: "Cloud Computing",
    description: "É a maneira de rodar seu programa de um jeito super prático e rápido, sem você ter que se preocupar com o computador (servidor) que está por trás.",
    options: ["Cloud Functions", "App Engine", "Cloud Run", "Compute Engine"],
    correctAnswer: 2,
    category: 'Cloud'
  },
  {
    id: 8,
    title: "Generative AI",
    description: "É uma família de modelos de IA do Google. Foi projetado para ser multimodal, ou seja, pode generalizar e entender texto, imagens, áudio, vídeo e código.",
    options: ["PaLM 2", "BERT", "LaMDA", "Google Gemini"],
    correctAnswer: 3,
    category: 'AI'
  },
  {
    id: 9,
    title: "Collaboration",
    description: "Google Colaboratory é um serviço gratuito e hospedado na nuvem que permite que usuários escrevam e executem código Python diretamente no navegador.",
    options: ["Jupyter Notebook", "Google Colab", "Cloud Shell", "Vertex AI Workbench"],
    correctAnswer: 1,
    category: 'AI'
  },
  {
    id: 10,
    title: "Android UI",
    description: "É o moderno kit de ferramentas nativo do Android para a construção de interfaces de usuário (UI), desenvolvido pelo Google.",
    options: ["XML Layouts", "Jetpack Compose", "Material Design", "ConstraintLayout"],
    correctAnswer: 1,
    category: 'Mobile'
  },
  {
    id: 11,
    title: "Navegador Web",
    description: "É um navegador de internet gratuito e rápido, desenvolvido pelo Google. Lançado pela primeira vez em setembro de 2008.",
    options: ["Firefox", "Google Chrome", "Safari", "Edge"],
    correctAnswer: 1,
    category: 'Web'
  },
  {
    id: 12,
    title: "Publicação de Apps",
    description: "É a plataforma oficial do Google para desenvolvedores de aplicativos e jogos para Android.",
    options: ["Android Studio", "Firebase Console", "Google Play Console", "AdMob"],
    correctAnswer: 2,
    category: 'Mobile'
  },
  {
    id: 13,
    title: "Armazenamento Cloud",
    description: "É um guarda-volumes infinito e seguro na nuvem. Você guarda seus arquivos lá e pode acessá-los de qualquer lugar.",
    options: ["Google Drive", "Cloud Storage", "Dropbox", "OneDrive"],
    correctAnswer: 1,
    category: 'Cloud'
  },
  {
    id: 14,
    title: "Modelos Abertos",
    description: "É uma família de modelos de Inteligência Artificial (IA) abertos e leves desenvolvidos pelo Google DeepMind e outras equipes do Google.",
    options: ["Llama", "Google Gemma", "Mistral", "PaLM"],
    correctAnswer: 1,
    category: 'AI'
  },
  {
    id: 15,
    title: "IA Experimental",
    description: "É uma ferramenta experimental de anotações e escrita com tecnologia de inteligência artificial (IA) desenvolvida pelo Google.",
    options: ["Google Keep", "NotebookLM", "Google Docs", "Notion"],
    correctAnswer: 1,
    category: 'AI'
  },
  {
    id: 16,
    title: "Serverless",
    description: "É para rodar seu programa de um jeito super prático e rápido, sem você ter que se preocupar com o computador (o servidor) que está por trás.",
    options: ["Cloud Run", "App Engine", "Compute Engine", "Kubernetes"],
    correctAnswer: 0,
    category: 'Cloud'
  },
  {
    id: 17,
    title: "No-Code",
    description: "É uma plataforma de desenvolvimento de aplicativos no-code e low-code do Google, permitindo criar aplicações para PC, tablets e celulares sem a necessidade de programação tradicional.",
    options: ["Bubble", "AppSheet", "Wix", "WordPress"],
    correctAnswer: 1,
    category: 'Web'
  },
  {
    id: 18,
    title: "Automação",
    description: "É uma linguagem de programação baseada em JavaScript, que permite automatizar, integrar e estender as funcionalidades dos aplicativos do Google Workspace.",
    options: ["VBA", "App Script", "Python", "TypeScript"],
    correctAnswer: 1,
    category: 'Web'
  },
  {
    id: 19,
    title: "Backend as a Service",
    description: "É uma plataforma abrangente de desenvolvimento de aplicativos móveis e web do Google, que funciona como um 'Backend-as-a-Service' (BaaS).",
    options: ["Supabase", "Firebase", "AWS Amplify", "Heroku"],
    correctAnswer: 1,
    category: 'Mobile'
  },
  {
    id: 20,
    title: "Criação de Sites",
    description: "É uma ferramenta fácil para criar páginas da internet. Você usa para fazer um site para sua turma, um projeto de escola, por exemplo, sem precisar ter uma experiência grande em programação.",
    options: ["Wix", "Google Sites", "WordPress", "Squarespace"],
    correctAnswer: 1,
    category: 'Web'
  },
  {
    id: 21,
    title: "Pesquisas e Enquetes",
    description: "É a ferramenta para criar pesquisas ou testes. Você usa para fazer perguntas e coletar as respostas de forma organizada (como uma enquete na escola).",
    options: ["Typeform", "Google Forms", "SurveyMonkey", "Microsoft Forms"],
    correctAnswer: 1,
    category: 'Web'
  },
  {
    id: 22,
    title: "Easter Egg",
    description: "O 'Dino Chrome', também conhecido como T-Rex Game, é um jogo embutido no Chrome. Ele foi criado como um 'easter egg' para entreter os usuários quando não há conexão com a internet.",
    options: ["Snake", "T-Rex Game", "Pac-Man", "Space Invaders"],
    correctAnswer: 1,
    category: 'Web'
  },
  {
    id: 23,
    title: "Prototipagem de IA",
    description: "A plataforma permite que desenvolvedores, estudantes e pesquisadores criem protótipos de aplicativos de IA generativa.",
    options: ["Vertex AI", "Google AI Studio", "TensorFlow", "Keras"],
    correctAnswer: 1,
    category: 'AI'
  },
  {
    id: 24,
    title: "Plataforma Cloud",
    description: "É a plataforma de computação em nuvem do Google, que oferece uma vasta gama de serviços e recursos para que empresas e desenvolvedores criem, testem e operem aplicativos.",
    options: ["AWS", "Azure", "Google Cloud", "IBM Cloud"],
    correctAnswer: 2,
    category: 'Cloud'
  },
  {
    id: 25,
    title: "Mapas e Localização",
    description: "É uma plataforma e aplicativo de mapeamento online desenvolvido pelo Google que fornece informações detalhadas sobre regiões geográficas e locais em todo o mundo.",
    options: ["Waze", "Google Earth", "Google Maps", "MapQuest"],
    correctAnswer: 2,
    category: 'Data'
  }
];

export const TIER_THRESHOLDS = {
  SMART: 800,
  NINJA: 1600,
  CHAMPION: 2400
};