
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { PageLayout } from '@/components/layout/PageLayout';
import { 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  BookOpen, 
  MessageSquare, 
  PenTool,
  CheckCircle,
  Star,
  Eye,
  Download,
  Share,
  Volume2,
  Target,
  Trophy,
  BarChart3,
  Lightbulb,
  Users
} from 'lucide-react';

const Seance4 = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [progress, setProgress] = useState(12.5);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedSyntaxElement, setSelectedSyntaxElement] = useState('');
  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      author: "Marie L.",
      content: "Je pense que Goldman nous montre qu'on est tous influencés par notre contexte, mais qu'on garde une part de liberté. Le fait qu'il pose la question \"aurais-je été...\" montre qu'il y a une part d'incertitude.",
      upvotes: 12,
      downvotes: 2
    },
    {
      id: 2,
      author: "Alexandre K.",
      content: "Mais est-ce qu'on peut vraiment échapper à notre époque ? Les trois exemples (Allemagne, Belfast, Johannesburg) montrent des contextes où la violence était partout. Comment ne pas être influencé ?",
      upvotes: 8,
      downvotes: 1
    }
  ]);
  const [writingText, setWritingText] = useState('');
  const [writingAnalysis, setWritingAnalysis] = useState({
    lexicalRichness: 0,
    connectors: 0,
    citations: 0,
    coherence: 'En cours...'
  });

  const TOTAL_SCREENS = 8;

  useEffect(() => {
    setProgress((currentScreen / TOTAL_SCREENS) * 100);
  }, [currentScreen]);

  const navigation = {
    next: () => setCurrentScreen(prev => Math.min(prev + 1, TOTAL_SCREENS)),
    prev: () => setCurrentScreen(prev => Math.max(prev - 1, 1)),
    goTo: (screen) => setCurrentScreen(screen)
  };

  const handleQuizAnswer = (questionId, answer, isCorrect) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { answer, isCorrect }
    }));
  };

  const handleSyntaxClick = (elementType) => {
    setSelectedSyntaxElement(elementType);
  };

  const syntaxExplanations = {
    condition: 'Cette proposition subordonnée exprime une condition irréelle dans le passé, introduite par "Si" + plus-que-parfait.',
    si: 'Conjonction de subordination introduisant l\'hypothèse irréelle.',
    subject: 'Sujet de la proposition subordonnée.',
    verb: 'Plus-que-parfait exprimant l\'irréel du passé.',
    complement: 'Compléments circonstanciels de temps et de lieu.',
    main: 'Proposition principale à la forme interrogative, exprimant la conséquence hypothétique.',
    aux: 'Auxiliaire "avoir" au conditionnel passé.',
    subject2: 'Sujet de la proposition principale (inversion interrogative).',
    verb2: 'Participe passé du verbe "être".',
    attribute: 'Attribut du sujet, exprimant l\'état hypothétique.'
  };

  const analyzeWriting = (text) => {
    const words = text.split(' ').filter(word => word.length > 3);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const lexicalRichness = words.length > 0 ? Math.round((uniqueWords.size / words.length) * 100) : 0;
    
    const connectors = ['ainsi', 'donc', 'par conséquent', 'en effet', 'cependant', 'néanmoins', 'toutefois', 'de plus', 'par ailleurs'];
    const foundConnectors = connectors.filter(conn => text.toLowerCase().includes(conn));
    
    const quotes = (text.match(/["«»"]/g) || []).length / 2;
    
    const coherenceScore = sentences.length > 3 && foundConnectors.length > 1 && quotes > 0 ? 'Bonne' : 'À améliorer';
    
    setWritingAnalysis({
      lexicalRichness,
      connectors: foundConnectors.length,
      citations: Math.floor(quotes),
      coherence: coherenceScore
    });
  };

  useEffect(() => {
    if (writingText) {
      analyzeWriting(writingText);
    }
  }, [writingText]);

  const addForumPost = (content) => {
    if (content.trim()) {
      const newPost = {
        id: forumPosts.length + 1,
        author: "Vous",
        content: content,
        upvotes: 0,
        downvotes: 0
      };
      setForumPosts(prev => [...prev, newPost]);
    }
  };

  const voteOnPost = (postId, direction) => {
    setForumPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          [direction === 'up' ? 'upvotes' : 'downvotes']: post[direction === 'up' ? 'upvotes' : 'downvotes'] + 1
        };
      }
      return post;
    }));
  };

  // Écran 4.1: Consolidation et perspective globale
  const Screen1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Consolidation et perspective globale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                95%
              </div>
              <h4 className="font-semibold">Compréhension globale</h4>
              <p className="text-sm text-gray-600">Maîtrise des contextes historiques</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                88%
              </div>
              <h4 className="font-semibold">Temps du passé</h4>
              <p className="text-sm text-gray-600">Imparfait et plus-que-parfait</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl">
                76%
              </div>
              <h4 className="font-semibold">Mode conditionnel</h4>
              <p className="text-sm text-gray-600">Expression de l'hypothèse</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">
                32%
              </div>
              <h4 className="font-semibold">Phrase complexe</h4>
              <p className="text-sm text-gray-600">À développer dans cette séance</p>
            </div>
          </div>

          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quelle est la structure syntaxique dominante dans "Né en 17 à Leidenstadt" ?</h3>
              <div className="space-y-3">
                {[
                  { text: "Les phrases simples juxtaposées", correct: false },
                  { text: "Les propositions relatives", correct: false },
                  { text: "Les subordonnées conditionnelles avec hypothèse irréelle", correct: true },
                  { text: "Les phrases exclamatives", correct: false }
                ].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer('syntax_structure', option.text, option.correct)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      userAnswers.syntax_structure?.answer === option.text
                        ? option.correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              {userAnswers.syntax_structure?.isCorrect && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    <strong>Correct !</strong> La chanson repose principalement sur des structures conditionnelles 
                    exprimant l'irréel du passé ("Si j'étais né..."), ce qui crée l'effet stylistique de distance 
                    et de questionnement philosophique.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  // Écran 4.2: Analyse structurelle avancée
  const Screen2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600" />
            Analyse structurelle avancée
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg mb-6 font-mono">
            <div className="mb-2">"Si j'étais né en 17 à Leidenstadt,</div>
            <div className="mb-2">Sur les ruines d'un monde en feu,</div>
            <div>Aurais-je été plus heureux ?"</div>
          </div>

          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4">Structure syntaxique (cliquez sur les éléments) :</h4>
              
              <div className="space-y-4">
                <div className="text-center">
                  <button
                    onClick={() => handleSyntaxClick('condition')}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedSyntaxElement === 'condition'
                        ? 'border-blue-500 bg-blue-100'
                        : 'border-gray-300 bg-white hover:border-blue-300'
                    }`}
                  >
                    Proposition subordonnée conditionnelle
                  </button>
                </div>

                <div className="flex justify-center space-x-2 flex-wrap">
                  {[
                    { key: 'si', text: 'Si' },
                    { key: 'subject', text: 'je' },
                    { key: 'verb', text: 'étais né' },
                    { key: 'complement', text: 'en 17 à Leidenstadt' }
                  ].map(element => (
                    <button
                      key={element.key}
                      onClick={() => handleSyntaxClick(element.key)}
                      className={`px-3 py-2 m-1 rounded-lg border-2 transition-all ${
                        selectedSyntaxElement === element.key
                          ? 'border-blue-500 bg-blue-100'
                          : 'border-gray-300 bg-white hover:border-blue-300'
                      }`}
                    >
                      {element.text}
                    </button>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={() => handleSyntaxClick('main')}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedSyntaxElement === 'main'
                        ? 'border-green-500 bg-green-100'
                        : 'border-gray-300 bg-white hover:border-green-300'
                    }`}
                  >
                    Proposition principale (interrogative)
                  </button>
                </div>

                <div className="flex justify-center space-x-2 flex-wrap">
                  {[
                    { key: 'aux', text: 'Aurais' },
                    { key: 'subject2', text: 'je' },
                    { key: 'verb2', text: 'été' },
                    { key: 'attribute', text: 'plus heureux' }
                  ].map(element => (
                    <button
                      key={element.key}
                      onClick={() => handleSyntaxClick(element.key)}
                      className={`px-3 py-2 m-1 rounded-lg border-2 transition-all ${
                        selectedSyntaxElement === element.key
                          ? 'border-green-500 bg-green-100'
                          : 'border-gray-300 bg-white hover:border-green-300'
                      }`}
                    >
                      {element.text}
                    </button>
                  ))}
                </div>
              </div>

              {selectedSyntaxElement && syntaxExplanations[selectedSyntaxElement] && (
                <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg">
                  <p><strong>Analyse :</strong> {syntaxExplanations[selectedSyntaxElement]}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  // Écran 4.3: Laboratoire syntaxique
  const Screen3 = () => {
    const [syntaxExperiment, setSyntaxExperiment] = useState('');

    const insertSuggestion = (text) => {
      setSyntaxExperiment(prev => prev + text);
    };

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-600" />
              Laboratoire syntaxique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Phrase originale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-3">
                    Si j'étais né en 17 à Leidenstadt,<br />
                    Aurais-je été plus heureux ?
                  </div>
                  <p className="text-sm"><strong>Effet :</strong> Irréel du passé, questionnement philosophique</p>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">Transformation : Indicatif</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-3">
                    Je suis né en 17 à Leidenstadt,<br />
                    J'ai été plus heureux.
                  </div>
                  <p className="text-sm"><strong>Effet :</strong> Affirmation factuelle, perte de la dimension hypothétique</p>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg">Transformation : Futur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm mb-3">
                    Si je naissais en 17 à Leidenstadt,<br />
                    Serais-je plus heureux ?
                  </div>
                  <p className="text-sm"><strong>Effet :</strong> Irréel du présent, questionnement sur un futur hypothétique</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-yellow-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">À votre tour ! Créez une variation :</h3>
                <Textarea
                  value={syntaxExperiment}
                  onChange={(e) => setSyntaxExperiment(e.target.value)}
                  placeholder="Réécrivez la phrase en changeant la structure syntaxique. Observez comment cela modifie le sens et l'effet stylistique..."
                  className="min-h-32 mb-4"
                />
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Suggestions de structures :</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Quand j\'étais... ',
                      'Bien que je sois... ',
                      'Puisque j\'étais... ',
                      'Même si j\'avais été... '
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => insertSuggestion(suggestion)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        {suggestion.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Écran 4.4: Dimension philosophique
  const Screen4 = () => {
    const [newPostContent, setNewPostContent] = useState('');

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
              Dimension philosophique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Card className="bg-indigo-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Forum de discussion : "Sommes-nous responsables de nos actes si nous sommes déterminés par notre époque et notre lieu de naissance ?"
                </h3>
                
                <div className="space-y-4 mb-6">
                  {forumPosts.map(post => (
                    <Card key={post.id} className="border-l-4 border-blue-400">
                      <CardContent className="p-4">
                        <div className="font-semibold text-blue-600 mb-2">{post.author}</div>
                        <p className="mb-3">{post.content}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => voteOnPost(post.id, 'up')}
                            className="px-3 py-1 bg-green-100 hover:bg-green-200 rounded-full text-sm transition-colors"
                          >
                            👍 {post.upvotes}
                          </button>
                          <button
                            onClick={() => voteOnPost(post.id, 'down')}
                            className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-full text-sm transition-colors"
                          >
                            👎 {post.downvotes}
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Votre contribution au débat :</h4>
                  <Textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Exprimez votre point de vue sur la question du déterminisme et de la liberté individuelle dans la chanson..."
                    className="min-h-24 mb-3"
                  />
                  <Button
                    onClick={() => {
                      addForumPost(newPostContent);
                      setNewPostContent('');
                    }}
                    disabled={!newPostContent.trim()}
                  >
                    Publier votre réflexion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Écran 4.5: Préparation du commentaire composé
  const Screen5 = () => {
    const [commentaryPlan, setCommentaryPlan] = useState('');

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="w-6 h-6 text-green-600" />
              Préparation du commentaire composé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">I. Structure linguistique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-3">
                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">Système hypothétique irréel</span>
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Temps du passé</span>
                    <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 rounded text-sm">Phrases complexes</span>
                  </div>
                  <p className="text-sm">Analyse de l'emploi des temps et modes pour créer un effet de distanciation.</p>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">II. Dimension historique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-3">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Trois contextes</span>
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">Violence systémique</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Déterminisme social</span>
                  </div>
                  <p className="text-sm">Les références à trois époques/lieux marqués par la violence et l'oppression.</p>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg">III. Portée philosophique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-3">
                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">Questionnement existentiel</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Liberté vs déterminisme</span>
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">Universalité</span>
                  </div>
                  <p className="text-sm">La dimension universelle du questionnement sur la responsabilité individuelle.</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Votre plan détaillé :</h4>
                <Textarea
                  value={commentaryPlan}
                  onChange={(e) => setCommentaryPlan(e.target.value)}
                  placeholder="Développez votre plan en vous appuyant sur les éléments ci-dessus. N'oubliez pas l'introduction avec l'accroche, la présentation de l'œuvre et l'annonce du plan..."
                  className="min-h-40"
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Écran 4.6: Atelier d'écriture avancé
  const Screen6 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="w-6 h-6 text-purple-600" />
            Atelier d'écriture avancé
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="bg-purple-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Espace de rédaction guidé</h3>
              <Textarea
                value={writingText}
                onChange={(e) => setWritingText(e.target.value)}
                placeholder="Rédigez votre commentaire composé. L'assistant vous proposera des suggestions stylistiques et vérifiera la cohérence de votre argumentation..."
                className="min-h-64 mb-4"
              />
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Suggestions en temps réel :</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Utilisez des connecteurs logiques</span>
                    <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Citez précisément le texte</span>
                    <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Analysez les effets stylistiques</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <strong>📊 Richesse lexicale :</strong><br />
                      <span className="text-blue-600">{writingAnalysis.lexicalRichness}%</span>
                    </div>
                    <div>
                      <strong>🔗 Connecteurs :</strong><br />
                      <span className="text-blue-600">{writingAnalysis.connectors} détectés</span>
                    </div>
                    <div>
                      <strong>📝 Citations :</strong><br />
                      <span className="text-blue-600">{writingAnalysis.citations} citations</span>
                    </div>
                    <div>
                      <strong>🎯 Cohérence :</strong><br />
                      <span className="text-blue-600">{writingAnalysis.coherence}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  // Écran 4.7: Évaluation finale
  const Screen7 = () => {
    const [selfEvaluation, setSelfEvaluation] = useState({});

    const handleSelfEval = (question, score) => {
      setSelfEvaluation(prev => ({
        ...prev,
        [question]: score
      }));
    };

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-red-600" />
              Évaluation finale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Auto-évaluation guidée</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-medium mb-3">Mon introduction présente-t-elle clairement l'œuvre et annonce-t-elle le plan ?</p>
                      <div className="space-y-2">
                        {[
                          { text: "Oui, de manière complète et structurée", score: 3 },
                          { text: "Partiellement, il manque un élément", score: 2 },
                          { text: "Non, l'introduction est insuffisante", score: 1 }
                        ].map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelfEval('introduction', option.score)}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                              selfEvaluation.introduction === option.score
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-3">Mon analyse linguistique est-elle précise et argumentée ?</p>
                      <div className="space-y-2">
                        {[
                          { text: "Oui, avec citations et analyse des effets", score: 3 },
                          { text: "Partiellement, quelques imprécisions", score: 2 },
                          { text: "Non, analyse superficielle", score: 1 }
                        ].map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelfEval('analysis', option.score)}
                            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                              selfEvaluation.analysis === option.score
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    📊 Bilan de vos acquis
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                        92%
                      </div>
                      <h4 className="font-semibold">Analyse linguistique</h4>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                        87%
                      </div>
                      <h4 className="font-semibold">Compréhension littéraire</h4>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                        78%
                      </div>
                      <h4 className="font-semibold">Expression écrite</h4>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                        85%
                      </div>
                      <h4 className="font-semibold">Réflexion critique</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Écran 4.8: Bilan et ouverture
  const Screen8 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-600" />
            Bilan et ouverture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold mb-4">Certificat de réussite</h2>
            <p className="text-lg text-gray-600 mb-6">
              Vous avez acquis les compétences d'analyse littéraire et linguistique de la séquence "Né en 17 à Leidenstadt"
            </p>
            
            <div className="flex justify-center gap-2 flex-wrap mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full">🔍 Analyste linguistique</span>
              <span className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full">📚 Critique littéraire</span>
              <span className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full">🤔 Penseur philosophique</span>
              <span className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full">✍️ Rédacteur expert</span>
            </div>
          </div>

          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🚀 Pour aller plus loin
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Projet créatif</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Écrivez un couplet supplémentaire à la chanson en vous basant sur un contexte contemporain
                    </p>
                    <Button size="sm" className="w-full">Commencer le projet</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Œuvres similaires</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Découvrez d'autres chansons engagées : "Le déserteur" de Boris Vian, "Strange Fruit"...
                    </p>
                    <Button size="sm" className="w-full">Explorer</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Approfondissement historique</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Explorez les contextes : République de Weimar, Troubles nord-irlandais, Apartheid
                    </p>
                    <Button size="sm" className="w-full">Approfondir</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  const screens = {
    1: <Screen1 />,
    2: <Screen2 />,
    3: <Screen3 />,
    4: <Screen4 />,
    5: <Screen5 />,
    6: <Screen6 />,
    7: <Screen7 />,
    8: <Screen8 />
  };

  return (
    <PageLayout
      heroTitle="Séance 4 : La phrase complexe et la communication artistique"
      heroDescription="Analysez la structure syntaxique et les procédés rhétoriques"
    >
      <div className="container mx-auto p-6">
        {/* Navigation Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold">Séance 4 - Phrase complexe et communication artistique</h1>
                <div className="text-sm text-gray-600">
                  Écran {currentScreen}/{TOTAL_SCREENS}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigation.prev}
                  disabled={currentScreen === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigation.next}
                  disabled={currentScreen === TOTAL_SCREENS}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Screen Navigation Pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Array.from({ length: TOTAL_SCREENS }, (_, i) => i + 1).map(num => (
            <Button
              key={num}
              variant={currentScreen === num ? "default" : "outline"}
              size="sm"
              onClick={() => navigation.goTo(num)}
              className="min-w-16"
            >
              4.{num}
            </Button>
          ))}
        </div>

        {/* Current Screen Content */}
        {screens[currentScreen]}
      </div>
    </PageLayout>
  );
};

export default Seance4;
