
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, Award, BookOpen, Users, CheckCircle, XCircle, RotateCcw, Lightbulb, Target, Trophy, PenTool, MessageSquare, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PageLayout } from '@/components/layout/PageLayout';

const Seance3 = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [progress, setProgress] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedActivities, setCompletedActivities] = useState(new Set());
  const [userPoints, setUserPoints] = useState(0);

  // Données de la chanson simulées
  const chansonData = {
    conditionnelPhrases: [
      { text: "Si j'étais né en 17 à Leidenstadt", type: "irréel_présent", valeur: "hypothèse" },
      { text: "J'aurais été un soldat d'Hitler", type: "irréel_passé", valeur: "conséquence" },
      { text: "Aurais-je été meilleur ou pire ?", type: "interrogation", valeur: "questionnement" },
      { text: "Si j'étais né en Irlande du Nord", type: "irréel_présent", valeur: "hypothèse" },
      { text: "J'aurais pu être un poseur de bombes", type: "irréel_passé", valeur: "possibilité" }
    ]
  };

  // Configuration des écrans
  const screens = {
    1: { title: "Mise en perspective", icon: BarChart3 },
    2: { title: "Analyse du corpus", icon: BookOpen },
    3: { title: "Exploration des valeurs", icon: Lightbulb },
    4: { title: "Application guidée", icon: Target },
    5: { title: "Exploration rhétorique", icon: MessageSquare },
    6: { title: "Atelier de création", icon: PenTool },
    7: { title: "Synthèse interactive", icon: Trophy },
    8: { title: "Évaluation formative", icon: CheckCircle },
    9: { title: "Transition finale", icon: Award }
  };

  // Calcul automatique du progrès
  useEffect(() => {
    setProgress((currentScreen / 9) * 100);
  }, [currentScreen]);

  // Gestion des réponses utilisateur
  const handleAnswer = (screenId, answer) => {
    setUserAnswers(prev => ({ ...prev, [screenId]: answer }));
    if (!completedActivities.has(screenId)) {
      setCompletedActivities(prev => new Set([...prev, screenId]));
      setUserPoints(prev => prev + 10);
    }
  };

  // Navigation
  const goToScreen = (screenNumber) => {
    setCurrentScreen(screenNumber);
  };

  const nextScreen = () => {
    if (currentScreen < 9) setCurrentScreen(currentScreen + 1);
  };

  const prevScreen = () => {
    if (currentScreen > 1) setCurrentScreen(currentScreen - 1);
  };

  // Écran 3.1 : Mise en perspective
  const Screen31 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-blue-800 mb-4">Visualisation comparative : Indicatif vs Conditionnel</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-100 p-4 rounded border-l-4 border-green-500">
            <h4 className="font-semibold text-green-800">Mode Indicatif</h4>
            <p className="text-green-700">"Je suis né en France" → Fait réel, certitude</p>
          </div>
          <div className="bg-orange-100 p-4 rounded border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-800">Mode Conditionnel</h4>
            <p className="text-orange-700">"Si j'étais né en 17..." → Hypothèse, irréel</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Volume2 className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold">Écoute sélective des passages au conditionnel</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Écouter le premier couplet'}
          </button>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">Questionnement réflexif</h3>
        <p className="text-purple-700 mb-4">"Que se passerait-il si ces phrases étaient à l'indicatif ?"</p>
        <div className="space-y-3">
          {['Le sens changerait complètement', 'Cela deviendrait factuel', 'L\'effet philosophique disparaîtrait', 'Toutes ces réponses'].map((option, index) => (
            <label key={index} className="flex items-center gap-3">
              <input 
                type="radio" 
                name="reflection" 
                onChange={() => handleAnswer('3.1_reflection', option)}
                className="text-purple-600" 
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Écran 3.2 : Analyse du corpus
  const Screen32 = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Extraction automatique des conditionnels</h3>
        <div className="space-y-3">
          {chansonData.conditionnelPhrases.map((phrase, index) => (
            <div key={index} className={`p-3 rounded border-l-4 ${
              phrase.type === 'irréel_présent' ? 'bg-blue-50 border-blue-400' :
              phrase.type === 'irréel_passé' ? 'bg-green-50 border-green-400' :
              'bg-yellow-50 border-yellow-400'
            }`}>
              <p className="font-medium">{phrase.text}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="bg-gray-200 px-2 py-1 rounded">Type: {phrase.type}</span>
                <span className="bg-gray-200 px-2 py-1 rounded">Valeur: {phrase.valeur}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-indigo-800 mb-4">Activité collaborative : Classification</h3>
        <p className="text-indigo-700 mb-4">Proposez votre classification des valeurs du conditionnel observées :</p>
        <div className="grid md:grid-cols-3 gap-4">
          {['Hypothèse', 'Conséquence', 'Questionnement'].map((category) => (
            <div key={category} className="bg-white p-4 rounded border-2 border-dashed border-indigo-300">
              <h4 className="font-semibold text-center mb-2">{category}</h4>
              <div className="space-y-2">
                {chansonData.conditionnelPhrases
                  .filter(phrase => phrase.valeur === category.toLowerCase())
                  .map((phrase, index) => (
                    <div key={index} className="bg-indigo-100 p-2 rounded text-sm">
                      {phrase.text}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Écran 3.3 : Exploration des valeurs du conditionnel
  const Screen33 = () => {
    const [selectedValue, setSelectedValue] = useState('hypothèse');
    
    const conditionnelValues = {
      hypothèse: {
        definition: "Expression d'une supposition, d'une éventualité",
        exemple: "Si j'étais riche, je voyagerais",
        probabilité: "Variable selon le contexte"
      },
      politesse: {
        definition: "Atténuation pour demander quelque chose poliment",
        exemple: "Pourriez-vous m'aider ?",
        probabilité: "N/A (fonction sociale)"
      },
      information_incertaine: {
        definition: "Information non vérifiée, selon des sources",
        exemple: "Il y aurait eu un accident",
        probabilité: "Incertitude assumée"
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Module didactique interactif</h3>
          <div className="flex gap-4 mb-6">
            {Object.keys(conditionnelValues).map((value) => (
              <button
                key={value}
                onClick={() => setSelectedValue(value)}
                className={`px-4 py-2 rounded transition-colors ${
                  selectedValue === value 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {value.replace('_', ' ')}
              </button>
            ))}
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">
              {selectedValue.replace('_', ' ').toUpperCase()}
            </h4>
            <div className="space-y-3">
              <p><strong>Définition :</strong> {conditionnelValues[selectedValue].definition}</p>
              <p><strong>Exemple :</strong> "{conditionnelValues[selectedValue].exemple}"</p>
              <p><strong>Probabilité :</strong> {conditionnelValues[selectedValue].probabilité}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Exercices contextualisés</h3>
          <p className="text-green-700 mb-4">Associez chaque phrase à son degré de probabilité :</p>
          <div className="space-y-3">
            {[
              { phrase: "Si j'avais su, j'aurais agi différemment", probabilité: "Irréel passé" },
              { phrase: "Vous pourriez m'aider ?", probabilité: "Politesse" },
              { phrase: "Il pleuvrait demain selon la météo", probabilité: "Information incertaine" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                <span>"{item.phrase}"</span>
                <select 
                  onChange={(e) => handleAnswer(`3.3_probability_${index}`, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Choisir...</option>
                  <option value="irréel">Irréel passé</option>
                  <option value="politesse">Politesse</option>
                  <option value="incertain">Information incertaine</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Écran 3.4 : Application guidée
  const Screen34 = () => {
    const [selectedContext, setSelectedContext] = useState('');
    const [userText, setUserText] = useState('');

    const contexts = [
      "Situation professionnelle (entretien d'embauche)",
      "Contexte familial (demande à un parent)",
      "Situation d'urgence (demande d'aide)",
      "Context académique (question à un professeur)"
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Générateur de phrases contextualisées</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choisissez un contexte :
              </label>
              <select 
                value={selectedContext}
                onChange={(e) => setSelectedContext(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Sélectionnez un contexte...</option>
                {contexts.map((context, index) => (
                  <option key={index} value={context}>{context}</option>
                ))}
              </select>
            </div>
            
            {selectedContext && (
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-800 mb-2">Suggestions pour ce contexte :</h4>
                <div className="space-y-2">
                  {selectedContext.includes('professionnel') && (
                    <>
                      <p>"Pourriez-vous me parler de cette entreprise ?"</p>
                      <p>"J'aimerais connaître les perspectives d'évolution."</p>
                    </>
                  )}
                  {selectedContext.includes('familial') && (
                    <>
                      <p>"Est-ce que tu pourrais m'aider avec mes devoirs ?"</p>
                      <p>"J'aimerais sortir ce soir, si c'est possible."</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">Simulateur de dialogue</h3>
          <p className="text-yellow-700 mb-4">Réécrivez cette phrase en utilisant le conditionnel :</p>
          <div className="bg-white p-4 rounded border">
            <p className="font-medium mb-3">Phrase originale : "Aidez-moi avec ce problème."</p>
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Votre version avec conditionnel..."
              className="w-full h-20 border border-gray-300 rounded px-3 py-2 resize-none"
            />
            {userText && (
              <div className="mt-3 p-3 bg-green-50 rounded">
                <p className="text-green-800">
                  {userText.toLowerCase().includes('pourriez') || userText.toLowerCase().includes('aideriez') 
                    ? '✓ Excellent ! Vous avez bien utilisé le conditionnel de politesse.'
                    : '⚠ Essayez d\'utiliser des formes comme "pourriez-vous" ou "aideriez-vous".'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Écran 3.5 : Exploration rhétorique
  const Screen35 = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Effets rhétoriques des questions au conditionnel</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
              <h4 className="font-semibold text-red-800">Affirmation directe</h4>
              <p className="text-red-700">"Je suis un bon soldat."</p>
              <p className="text-sm text-red-600 mt-2">Effet : Assertion brutale</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800">Question à l'indicatif</h4>
              <p className="text-blue-700">"Est-ce que je suis meilleur ?"</p>
              <p className="text-sm text-blue-600 mt-2">Effet : Questionnement factuel</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800">Question au conditionnel</h4>
              <p className="text-green-700">"Aurais-je été meilleur ?"</p>
              <p className="text-sm text-green-600 mt-2">Effet : Questionnement existentiel</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">Mini-laboratoire de style</h3>
        <p className="text-purple-700 mb-4">Manipulez cette phrase et observez les effets produits :</p>
        
        <div className="bg-white p-4 rounded border space-y-3">
          <div className="font-medium">Phrase de base : "Si j'étais né ailleurs, j'aurais eu une autre vie."</div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input type="radio" name="transformation" id="indicatif" />
              <label htmlFor="indicatif">À l'indicatif : "Je suis né ailleurs, j'ai eu une autre vie."</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="radio" name="transformation" id="interrogatif" />
              <label htmlFor="interrogatif">En question : "Si j'étais né ailleurs, aurais-je eu une autre vie ?"</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="radio" name="transformation" id="exclamatif" />
              <label htmlFor="exclamatif">En exclamation : "Si seulement j'étais né ailleurs !"</label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Banque d'exemples littéraires</h3>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded border-l-4 border-orange-400">
            <p className="italic">"Que serais-je devenu si mon père avait vécu ?"</p>
            <p className="text-sm text-gray-600 mt-1">— Sartre, "Les Mots"</p>
          </div>
          <div className="bg-white p-3 rounded border-l-4 border-orange-400">
            <p className="italic">"Aurais-je été le même homme dans un autre siècle ?"</p>
            <p className="text-sm text-gray-600 mt-1">— Marguerite Yourcenar</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Écran 3.6 : Atelier de création
  const Screen36 = () => {
    const [selectedTopic, setSelectedTopic] = useState('');
    const [userCreation, setUserCreation] = useState('');

    const contemporaryTopics = [
      "Écologie et changement climatique",
      "Intelligence artificielle et société",
      "Réseaux sociaux et relations humaines",
      "Mondialisation et identité culturelle"
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Générateur de contextes contemporains</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choisissez un thème contemporain :
              </label>
              <select 
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Sélectionnez un thème...</option>
                {contemporaryTopics.map((topic, index) => (
                  <option key={index} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            {selectedTopic && (
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-800 mb-2">Structures suggérées :</h4>
                <div className="space-y-2 text-sm">
                  <p>"Si j'étais né dans un monde sans..."</p>
                  <p>"Aurais-je été différent(e) si..."</p>
                  <p>"Dans un autre contexte, j'aurais peut-être..."</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Assistant d'écriture créative</h3>
          <p className="text-green-700 mb-4">Créez votre propre couplet en utilisant le conditionnel :</p>
          
          <textarea
            value={userCreation}
            onChange={(e) => setUserCreation(e.target.value)}
            placeholder="Si j'étais né dans un monde sans réseaux sociaux,
j'aurais peut-être...
Aurais-je été plus heureux ou plus isolé ?"
            className="w-full h-32 border border-gray-300 rounded px-3 py-2 resize-none"
          />
          
          <div className="mt-4 flex gap-4">
            <button 
              onClick={() => handleAnswer('3.6_creation', userCreation)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Valider ma création
            </button>
            <button 
              onClick={() => setUserCreation('')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              <RotateCcw size={16} className="inline mr-2" />
              Recommencer
            </button>
          </div>

          {userCreation && userCreation.length > 50 && (
            <div className="mt-4 p-3 bg-white rounded border">
              <h5 className="font-semibold text-green-800 mb-2">Analyse automatique :</h5>
              <div className="space-y-1 text-sm">
                <p>• Conditionnels détectés : {(userCreation.match(/aurais|serais|ferais|dirais|pourrais/gi) || []).length}</p>
                <p>• Structures hypothétiques : {(userCreation.match(/si j'étais|si j'avais|si je/gi) || []).length}</p>
                <p>• Richesse lexicale : {userCreation.split(' ').filter(word => word.length > 5).length} mots complexes</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">Galerie de productions</h3>
          <p className="text-yellow-700 mb-4">Découvrez les créations de vos camarades :</p>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border">
              <p className="italic">"Si j'étais né dans un monde sans smartphones, j'aurais peut-être appris à mieux regarder les étoiles..."</p>
              <p className="text-sm text-gray-600 mt-1">— Élève A | ⭐⭐⭐⭐⭐</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="italic">"Dans un monde sans réchauffement climatique, aurions-nous été plus insouciants ?"</p>
              <p className="text-sm text-gray-600 mt-1">— Élève B | ⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Écran 3.7 : Synthèse interactive
  const Screen37 = () => {
    const [quizStep, setQuizStep] = useState(0);
    const [quizScore, setQuizScore] = useState(0);

    const quizQuestions = [
      {
        question: "Quelle est la valeur du conditionnel dans : 'Pourriez-vous m'aider ?'",
        options: ["Hypothèse", "Politesse", "Information incertaine", "Irréel du passé"],
        correct: 1
      },
      {
        question: "Dans 'Si j'avais su, j'aurais agi', le conditionnel exprime :",
        options: ["Une politesse", "Un irréel du passé", "Une hypothèse future", "Une information incertaine"],
        correct: 1
      },
      {
        question: "'Il y aurait eu un accident' exprime :",
        options: ["Une certitude", "Une information non vérifiée", "Une politesse", "Un souhait"],
        correct: 1
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Infographie dynamique : Les valeurs du conditionnel</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Politesse", color: "blue", example: "Pourriez-vous..." },
              { label: "Hypothèse", color: "green", example: "Si j'étais..." },
              { label: "Information incertaine", color: "yellow", example: "Il y aurait..." },
              { label: "Irréel du passé", color: "red", example: "J'aurais pu..." }
            ].map((item, index) => (
              <div key={index} className={`bg-${item.color}-50 p-4 rounded-lg border-l-4 border-${item.color}-400`}>
                <h4 className={`font-semibold text-${item.color}-800`}>{item.label}</h4>
                <p className={`text-sm text-${item.color}-700 mt-2`}>{item.example}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Quiz gamifié : Parcours à obstacles linguistiques</h3>
          
          {quizStep < quizQuestions.length ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  Question {quizStep + 1}/{quizQuestions.length}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-3">{quizQuestions[quizStep].question}</h4>
                <div className="space-y-2">
                  {quizQuestions[quizStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index === quizQuestions[quizStep].correct) {
                          setQuizScore(quizScore + 1);
                        }
                        setQuizStep(quizStep + 1);
                      }}
                      className="w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded border text-center">
              <Trophy className="mx-auto mb-4 text-yellow-500" size={48} />
              <h4 className="text-xl font-bold mb-2">Quiz terminé !</h4>
              <p className="text-lg mb-4">Score : {quizScore}/{quizQuestions.length}</p>
              <button 
                onClick={() => { setQuizStep(0); setQuizScore(0); }}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                Recommencer
              </button>
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Auto-évaluation guidée</h3>
          <div className="space-y-3">
            {[
              "Je sais identifier les différentes valeurs du conditionnel",
              "Je peux utiliser le conditionnel de politesse approprié",
              "Je comprends l'effet rhétorique des questions au conditionnel",
              "Je sais créer des textes expressifs avec le conditionnel"
            ].map((competence, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                <span>{competence}</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleAnswer(`self_eval_${index}`, level)}
                      className={`w-8 h-8 rounded-full border-2 text-sm font-bold transition-colors ${
                        userAnswers[`self_eval_${index}`] === level
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-blue-600 mt-3">1 = En difficulté | 2 = En cours d'acquisition | 3 = Maîtrisé | 4 = Expert</p>
        </div>
      </div>
    );
  };

  // Écran 3.8 : Évaluation formative
  const Screen38 = () => {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [analysisText, setAnalysisText] = useState('');

    const actualityEvents = [
      "Les conséquences du réchauffement climatique",
      "L'impact de l'intelligence artificielle sur l'emploi",
      "Les effets des réseaux sociaux sur les jeunes",
      "La transition énergétique en Afrique"
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Situation-problème : Analyse d'actualité</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choisissez un événement d'actualité à analyser :
              </label>
              <select 
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Sélectionnez un événement...</option>
                {actualityEvents.map((event, index) => (
                  <option key={index} value={event}>{event}</option>
                ))}
              </select>
            </div>

            {selectedEvent && (
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-800 mb-2">Consigne d'analyse :</h4>
                <p className="text-blue-700">
                  Rédigez un paragraphe utilisant le conditionnel pour analyser les conséquences hypothétiques 
                  de cet événement. Variez les valeurs du conditionnel (hypothèse, politesse, information incertaine).
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Outil de rédaction avec suggestions</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-3 rounded border">
              <h5 className="font-semibold text-green-800 mb-2">Suggestions contextuelles :</h5>
              <div className="text-sm space-y-1">
                <p>• Pour exprimer une hypothèse : "Si cette tendance continuait..."</p>
                <p>• Pour une information incertaine : "Il semblerait que...", "Selon certaines sources..."</p>
                <p>• Pour atténuer un propos : "On pourrait considérer que..."</p>
              </div>
            </div>
            
            <textarea
              value={analysisText}
              onChange={(e) => setAnalysisText(e.target.value)}
              placeholder="Rédigez votre analyse en utilisant différentes valeurs du conditionnel..."
              className="w-full h-40 border border-gray-300 rounded px-3 py-2 resize-none"
            />
            
            {analysisText && (
              <div className="bg-white p-3 rounded border">
                <h5 className="font-semibold text-green-800 mb-2">Analyse automatique :</h5>
                <div className="space-y-1 text-sm">
                  <p>• Conditionnels utilisés : {(analysisText.match(/rait|rais|rait|rions|riez|raient/gi) || []).length}</p>
                  <p>• Structures hypothétiques : {(analysisText.match(/si .+/gi) || []).length}</p>
                  <p>• Expressions d'incertitude : {(analysisText.match(/semblerait|pourrait|devrait|selon/gi) || []).length}</p>
                  <p>• Longueur : {analysisText.split(' ').length} mots</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">Critères d'évaluation</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-yellow-800 mb-2">Pertinence</h4>
              <ul className="text-sm space-y-1">
                <li>• Adéquation au sujet choisi</li>
                <li>• Cohérence de l'argumentation</li>
                <li>• Originalité de l'approche</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-yellow-800 mb-2">Correction</h4>
              <ul className="text-sm space-y-1">
                <li>• Usage correct du conditionnel</li>
                <li>• Variété des valeurs utilisées</li>
                <li>• Qualité de la langue</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-yellow-800 mb-2">Originalité</h4>
              <ul className="text-sm space-y-1">
                <li>• Créativité dans l'expression</li>
                <li>• Richesse du vocabulaire</li>
                <li>• Style personnel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Écran 3.9 : Transition vers la séance finale
  const Screen39 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Synthèse des acquis - Séance 3</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">Compétences développées :</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} />
                Identification des valeurs du conditionnel
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} />
                Usage du conditionnel de politesse
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} />
                Analyse des effets rhétoriques
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} />
                Production créative
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Votre progression :</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Points acquis</span>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold">{userPoints}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Activités complétées</span>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold">{completedActivities.size}/15</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Préparation du commentaire composé</h3>
        <div className="bg-blue-50 p-4 rounded mb-4">
          <h4 className="font-semibold text-blue-800 mb-2">Plan suggéré pour votre commentaire :</h4>
          <div className="space-y-2 text-blue-700">
            <p><strong>I.</strong> L'expression de l'irréel et de l'hypothèse</p>
            <p className="ml-4">A. Les temps de l'irréel (imparfait/plus-que-parfait)</p>
            <p className="ml-4">B. Les valeurs du conditionnel</p>
            <p><strong>II.</strong> La portée philosophique du questionnement</p>
            <p className="ml-4">A. La relativité des destins individuels</p>
            <p className="ml-4">B. L'interrogation sur la nature humaine</p>
            <p><strong>III.</strong> L'efficacité rhétorique du conditionnel</p>
            <p className="ml-4">A. La distanciation critique</p>
            <p className="ml-4">B. L'interpellation du lecteur/auditeur</p>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-semibold text-green-800 mb-2">Conseils méthodologiques :</h4>
          <ul className="space-y-1 text-green-700">
            <li>• Citez précisément les passages de la chanson</li>
            <li>• Analysez les effets de sens produits par chaque mode/temps</li>
            <li>• Reliez forme linguistique et intention artistique</li>
            <li>• Mobilisez vos connaissances sur les contextes historiques</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">Forum de questions</h3>
        <p className="text-yellow-700 mb-4">Posez vos dernières questions avant la séance finale :</p>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded border">
            <p className="font-medium">Question d'Élève C :</p>
            <p className="text-sm text-gray-600">"Comment faire la différence entre conditionnel d'hypothèse et d'atténuation ?"</p>
            <p className="text-sm text-blue-600 mt-2"><strong>Réponse :</strong> Le contexte est déterminant. L'hypothèse s'accompagne souvent d'une condition ("si..."), l'atténuation adoucit une demande ou un propos.</p>
          </div>
        </div>
        
        <div className="mt-4">
          <textarea 
            placeholder="Posez votre question ici..."
            className="w-full h-20 border border-gray-300 rounded px-3 py-2 resize-none"
          />
          <button className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
            Publier ma question
          </button>
        </div>
      </div>

      <div className="text-center bg-purple-50 p-6 rounded-lg">
        <Award size={48} className="mx-auto mb-4 text-purple-600" />
        <h3 className="text-xl font-bold text-purple-800 mb-2">Badge "Maître de l'hypothèse" débloqué !</h3>
        <p className="text-purple-700">Félicitations ! Vous maîtrisez maintenant l'expression du possible et de l'hypothétique.</p>
        <button 
          onClick={() => setCurrentScreen(1)}
          className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold"
        >
          Prêt(e) pour la séance 4 !
        </button>
      </div>
    </div>
  );

  // Fonction pour rendre l'écran actuel
  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case 1: return <Screen31 />;
      case 2: return <Screen32 />;
      case 3: return <Screen33 />;
      case 4: return <Screen34 />;
      case 5: return <Screen35 />;
      case 6: return <Screen36 />;
      case 7: return <Screen37 />;
      case 8: return <Screen38 />;
      case 9: return <Screen39 />;
      default: return <Screen31 />;
    }
  };

  return (
    <PageLayout
      heroTitle="Séance 3 : L'expression du possible et de l'hypothétique"
      heroDescription="Maîtrisez le mode conditionnel à travers des activités interactives"
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Séance 3 : Le Mode Conditionnel</h1>
              <p className="text-gray-600">"Né en 17 à Leidenstadt" - Expression du possible et de l'hypothétique</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Progression</div>
                <div className="text-lg font-bold text-blue-600">{Math.round(progress)}%</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Points</div>
                <div className="text-lg font-bold text-yellow-600">{userPoints}</div>
              </div>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation des écrans */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {Object.entries(screens).map(([screenNum, screen]) => {
              const IconComponent = screen.icon;
              return (
                <button
                  key={screenNum}
                  onClick={() => goToScreen(parseInt(screenNum))}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md whitespace-nowrap transition-colors ${
                    currentScreen === parseInt(screenNum)
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : completedActivities.has(`3.${screenNum}`)
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="text-sm font-medium">3.{screenNum}</span>
                  <span className="hidden md:inline text-sm">{screen.title}</span>
                  {completedActivities.has(`3.${screenNum}`) && <CheckCircle size={14} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Écran 3.{currentScreen} : {screens[currentScreen]?.title}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevScreen}
                disabled={currentScreen === 1}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
              >
                <ChevronLeft size={16} />
                Précédent
              </button>
              <button
                onClick={nextScreen}
                disabled={currentScreen === 9}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                Suivant
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {renderCurrentScreen()}
        </div>
      </div>
    </PageLayout>
  );
};

export default Seance3;
