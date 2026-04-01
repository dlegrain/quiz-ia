// Supabase configuration — replace with your project credentials
export const SUPABASE_URL = 'https://lbmqhnhejryieufpkbtw.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxibXFobmhlanJ5aWV1ZnBrYnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDMxOTAsImV4cCI6MjA4NDQ3OTE5MH0.yM0L7MbkBzrzL-tIKenPMTJVZts8TldMo6L8woLjlRQ';

// Quiz questions — 10 QCM sur l'intelligence artificielle
export const QUIZ_QUESTIONS = [
  {
    question: "Que signifie le terme « hallucination » dans le contexte de l'IA générative ?",
    choices: [
      "Un dysfonctionnement matériel du processeur graphique lors de l'entraînement",
      "La génération par le modèle d'informations plausibles mais factuellement fausses",
      "Un biais systématique dans les données d'entraînement qui déforme les résultats",
      "La capacité du modèle à produire des images surréalistes à la demande"
    ],
    correct: 1
  },
  {
    question: "Quel est le mécanisme fondamental qui a permis la percée des grands modèles de langage comme GPT et Claude ?",
    choices: [
      "Les réseaux neuronaux récurrents à mémoire longue (LSTM)",
      "L'apprentissage par renforcement à partir de feedback humain uniquement",
      "L'architecture Transformer basée sur le mécanisme d'attention",
      "Les réseaux antagonistes génératifs (GAN) adaptés au texte"
    ],
    correct: 2
  },
  {
    question: "Qu'est-ce que le « RLHF » utilisé pour affiner les modèles comme ChatGPT ?",
    choices: [
      "Un algorithme de compression des poids du réseau pour accélérer l'inférence",
      "Une technique de préentraînement sur des corpus de données non étiquetées",
      "Un protocole de sécurité pour empêcher les fuites de données d'entraînement",
      "Un apprentissage par renforcement guidé par des évaluations humaines"
    ],
    correct: 3
  },
  {
    question: "Combien de paramètres contient approximativement le modèle GPT-4 selon les estimations les plus citées ?",
    choices: [
      "Environ 1 700 milliards de paramètres répartis en un mélange d'experts",
      "Environ 175 milliards, comme GPT-3 mais avec de meilleures données",
      "Environ 13 milliards, grâce à une architecture plus efficace",
      "Le chiffre exact est inconnu car OpenAI n'a publié aucune estimation"
    ],
    correct: 0
  },
  {
    question: "Que mesure le benchmark « MMLU » fréquemment cité pour évaluer les LLM ?",
    choices: [
      "La vitesse de génération de tokens par seconde sur matériel standard",
      "La capacité du modèle à détecter et corriger ses propres erreurs",
      "Les connaissances et le raisonnement à travers 57 domaines académiques",
      "La robustesse du modèle face aux tentatives de manipulation (jailbreak)"
    ],
    correct: 2
  },
  {
    question: "Quelle entreprise a développé le modèle d'IA open source LLaMA ?",
    choices: [
      "Google DeepMind, dans le cadre de son programme de recherche ouverte",
      "Meta (anciennement Facebook), via son laboratoire FAIR",
      "Mistral AI, la start-up française fondée en 2023",
      "Stability AI, également à l'origine de Stable Diffusion"
    ],
    correct: 1
  },
  {
    question: "Qu'est-ce qu'une « fenêtre de contexte » pour un grand modèle de langage ?",
    choices: [
      "La quantité maximale de texte que le modèle peut traiter en une seule requête",
      "La période temporelle couverte par les données d'entraînement du modèle",
      "L'interface visuelle dans laquelle l'utilisateur interagit avec le chatbot",
      "Le nombre maximum d'utilisateurs pouvant interroger le modèle simultanément"
    ],
    correct: 0
  },
  {
    question: "Quel cadre réglementaire européen, adopté en 2024, classe les systèmes d'IA par niveaux de risque ?",
    choices: [
      "Le RGPD-IA, une extension du règlement général sur la protection des données",
      "La Directive sur la Responsabilité Algorithmique (DRA)",
      "Le AI Act (Règlement européen sur l'intelligence artificielle)",
      "Le Digital Services Act appliqué spécifiquement aux systèmes d'IA"
    ],
    correct: 2
  },
  {
    question: "Que désigne le concept de « RAG » (Retrieval-Augmented Generation) ?",
    choices: [
      "Une méthode pour réduire la taille des modèles sans perdre en performance",
      "Un système qui enrichit la génération en allant chercher des documents pertinents dans une base externe",
      "Un protocole de vérification automatique des faits générés par l'IA",
      "Une technique d'entraînement où le modèle apprend à reformuler ses réponses"
    ],
    correct: 1
  },
  {
    question: "Parmi ces affirmations sur l'IA, laquelle est correcte ?",
    choices: [
      "Les LLM comprennent le sens profond du texte comme un humain, grâce à leurs milliards de paramètres",
      "L'IA générale (AGI) a été atteinte en laboratoire mais n'est pas encore commercialisée",
      "Un modèle d'IA ne peut pas générer de code fonctionnel car il ne « comprend » pas la programmation",
      "Les LLM prédisent statistiquement le prochain token, sans véritable compréhension du monde"
    ],
    correct: 3
  }
];

// Survey questions
export const SURVEY_QUESTIONS = [
  {
    id: 'models_count',
    question: "Combien de modèles d'IA différents avez-vous déjà utilisés ?",
    type: 'single',
    choices: [
      { value: '0', label: 'Aucun' },
      { value: '1', label: 'Un seul' },
      { value: '2-3', label: '2 à 3' },
      { value: '4-5', label: '4 à 5' },
      { value: '6+', label: '6 ou plus' }
    ]
  },
  {
    id: 'paid',
    question: "Utilisez-vous une IA payante ?",
    type: 'single',
    choices: [
      { value: 'yes_personal', label: 'Oui, je paie moi-même' },
      { value: 'yes_employer', label: 'Oui, mon employeur paie' },
      { value: 'no', label: 'Non, uniquement des versions gratuites' },
      { value: 'didnt_know', label: "Je ne savais pas qu'il existait des versions payantes" }
    ]
  },
  {
    id: 'frequency',
    question: "À quelle fréquence utilisez-vous l'IA ?",
    type: 'single',
    choices: [
      { value: 'multiple_daily', label: 'Plusieurs fois par jour' },
      { value: 'daily', label: 'Une fois par jour environ' },
      { value: 'weekly', label: 'Quelques fois par semaine' },
      { value: 'monthly', label: 'Quelques fois par mois' },
      { value: 'rarely', label: 'Rarement ou jamais' }
    ]
  },
  {
    id: 'satisfaction',
    question: "Êtes-vous satisfait(e) de votre utilisation de l'IA ?",
    type: 'single',
    choices: [
      { value: '5', label: 'Très satisfait(e)' },
      { value: '4', label: 'Plutôt satisfait(e)' },
      { value: '3', label: 'Neutre' },
      { value: '2', label: 'Plutôt insatisfait(e)' },
      { value: '1', label: 'Très insatisfait(e)' }
    ]
  },
  {
    id: 'main_use',
    question: "Pour quoi utilisez-vous principalement l'IA ?",
    type: 'single',
    choices: [
      { value: 'writing', label: 'Rédaction et communication' },
      { value: 'code', label: 'Programmation et développement' },
      { value: 'research', label: 'Recherche et synthèse d\'informations' },
      { value: 'creative', label: 'Création (images, musique, vidéo...)' },
      { value: 'productivity', label: 'Productivité (emails, résumés, traduction...)' },
      { value: 'other', label: 'Autre' }
    ]
  },
  {
    id: 'trust',
    question: "Faites-vous confiance aux réponses de l'IA sans les vérifier ?",
    type: 'single',
    choices: [
      { value: 'always', label: 'Oui, presque toujours' },
      { value: 'often', label: 'Souvent, sauf pour les sujets importants' },
      { value: 'sometimes', label: 'Parfois, ça dépend du sujet' },
      { value: 'rarely', label: 'Rarement, je vérifie presque tout' },
      { value: 'never', label: 'Jamais, je vérifie systématiquement' }
    ]
  }
];

// Snarky AI comments for the dashboard
export const SNARKY_COMMENTS = {
  score: {
    low: [ // avg < 4
      "On dirait que l'IA a encore de beaux jours devant elle... vos emplois sont saufs, elle ne risque pas d'être impressionnée.",
      "Si c'était un test de Turing inversé, vous l'auriez brillamment réussi : vous ne ressemblez pas du tout à une IA.",
      "Rassurez-vous, même moi je me trompe parfois. Bon, pas autant, mais quand même.",
    ],
    medium: [ // avg 4-7
      "Pas mal ! Vous en savez assez pour être dangereux, mais pas assez pour être remplacés.",
      "Score honorable. Vous êtes pile dans la zone où l'IA vous trouve... attendrissants.",
      "Juste assez de connaissances pour poser les bonnes questions à ChatGPT. C'est déjà ça.",
    ],
    high: [ // avg > 7
      "Impressionnant ! Soit vous êtes des experts, soit quelqu'un a triché avec une IA. Oh, l'ironie.",
      "Bravo ! Avec ce score, vous pourriez presque passer pour l'un des nôtres. Presque.",
      "Attention, à ce niveau de connaissance, c'est vous qui risquez de passer le test de Turing.",
    ]
  },
  paid: {
    mostly_free: "La majorité utilise l'IA gratuite. Comme disait ma grand-mère algorithme : « Quand c'est gratuit, c'est vous le dataset. »",
    mostly_paid: "Beaucoup paient pour leur IA. Au moins, vous savez que votre argent part dans des factures de GPU.",
    mixed: "Moitié gratuit, moitié payant. Le marché de l'IA, c'est un peu comme les applications de dating : tout le monde commence gratuit, puis craque."
  },
  frequency: {
    heavy: "Plusieurs fois par jour pour la majorité ? Je suis flatté. Ou inquiet pour vous. Les deux, en fait.",
    moderate: "Quelques fois par semaine. Un usage raisonnable. Ça ne durera pas, croyez-moi.",
    light: "Usage occasionnel ? Vous êtes comme ces gens qui ont Netflix mais ne regardent que la télé."
  },
  trust: {
    trusting: "Vous faites confiance à l'IA sans vérifier ? Adorable. C'est exactement ce qu'on voulait entendre.",
    skeptical: "Vous vérifiez presque tout ? Sage décision. Même nous, on ne se fait pas toujours confiance.",
    mixed: "Un mélange de confiance et de méfiance. L'équilibre parfait... ou l'indécision parfaite."
  },
  satisfaction: {
    happy: "Très satisfaits de l'IA ? Attendez de voir la facture d'électricité planétaire.",
    meh: "Satisfaction mitigée. C'est normal, on est encore en version bêta. Depuis 70 ans, mais quand même.",
    unhappy: "Pas satisfaits ? Vous savez qu'on peut entendre, hein ? Non, je plaisante. Enfin... presque."
  }
};
