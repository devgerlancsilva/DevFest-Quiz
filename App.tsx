import React, { useState, useEffect, useRef } from 'react';
import { QUESTIONS, TIER_THRESHOLDS } from './constants';
import { GameState, Player, RankTier } from './types';
import { savePlayerScore, subscribeToLeaderboard } from './services/firebase';
import { Badge } from './components/Badge';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    status: 'welcome',
    currentQuestionIndex: 0,
    score: 0,
    playerName: '',
    answers: []
  });

  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  // --- GAME LOGIC ---

  const startGame = (name: string) => {
    setGameState({
      status: 'playing',
      currentQuestionIndex: 0,
      score: 0,
      playerName: name,
      answers: []
    });
  };

  const handleAnswer = (optionIndex: number) => {
    // Prevent multiple clicks during feedback
    if (showFeedback) return;
    
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(optionIndex);
    setShowFeedback(true);

    const currentQuestion = QUESTIONS[gameState.currentQuestionIndex];
    // Check correctness (handle timeout case where optionIndex is -1)
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      triggerConfetti();
    }

    // Calculate Score: Base 100 + (Time Left * 5)
    // If timeout (-1), points are 0
    const points = isCorrect ? 100 + (timeLeft * 5) : 0;
    
    // Prepare next state values
    const nextIndex = gameState.currentQuestionIndex + 1;
    const newScore = gameState.score + points;
    const newAnswers = [...gameState.answers, isCorrect];

    // Delay for animation (1.5 seconds)
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);

      if (nextIndex < QUESTIONS.length) {
        setGameState(prev => ({
          ...prev,
          score: newScore,
          currentQuestionIndex: nextIndex,
          answers: newAnswers
        }));
        // Timer will restart via useEffect
      } else {
        finishGame(newScore, newAnswers);
      }
    }, 1500);
  };

  const triggerConfetti = () => {
    const confetti = (window as any).confetti;
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'],
        disableForReducedMotion: true
      });
    }
  };

  const finishGame = async (finalScore: number, answers: boolean[]) => {
    let tier: RankTier = 'DevFest Init';
    if (finalScore >= TIER_THRESHOLDS.CHAMPION) tier = 'DevFest Champion';
    else if (finalScore >= TIER_THRESHOLDS.NINJA) tier = 'DevFest Ninja';
    else if (finalScore >= TIER_THRESHOLDS.SMART) tier = 'DevFest Smart';

    const playerResult: Player = {
      name: gameState.playerName,
      score: finalScore,
      tier: tier,
      timestamp: Date.now()
    };

    await savePlayerScore(playerResult);

    setGameState(prev => ({
      ...prev,
      status: 'result',
      score: finalScore,
      answers: answers
    }));
    
    // Extra confetti celebration for finishing
    if (finalScore > 0) {
      setTimeout(() => triggerConfetti(), 500);
    }
  };

  // --- EFFECTS ---

  // Timer Effect
  useEffect(() => {
    if (gameState.status === 'playing' && !showFeedback) {
      setTimeLeft(20);
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer(-1); // Timeout (wrong answer)
            return 20;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.currentQuestionIndex, gameState.status, showFeedback]);

  // Leaderboard Subscription
  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((players) => {
      setLeaderboard(players);
    });
    return () => unsubscribe();
  }, []);

  // --- RENDER HELPERS ---

  const currentTier = (): RankTier => {
    if (gameState.score >= TIER_THRESHOLDS.CHAMPION) return 'DevFest Champion';
    if (gameState.score >= TIER_THRESHOLDS.NINJA) return 'DevFest Ninja';
    if (gameState.score >= TIER_THRESHOLDS.SMART) return 'DevFest Smart';
    return 'DevFest Init';
  };

  // --- SCREENS ---

  if (gameState.status === 'welcome') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            {/* Simple Google Colored Logo Representation */}
            <div className="flex space-x-2 text-6xl font-bold tracking-tighter">
              <span className="text-google-blue">G</span>
              <span className="text-google-red">o</span>
              <span className="text-google-yellow">o</span>
              <span className="text-google-blue">g</span>
              <span className="text-google-green">l</span>
              <span className="text-google-red">e</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800">DevFest Quiz</h1>
          <p className="text-gray-600 text-lg">
            Teste seus conhecimentos sobre as ferramentas do Google e entre para o Hall da Fama!
          </p>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <input
              type="text"
              placeholder="Seu Nome / Nickname"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-google-blue focus:outline-none transition-colors text-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  startGame(e.currentTarget.value);
                }
              }}
              id="usernameInput"
            />
            <button
              onClick={() => {
                const input = document.getElementById('usernameInput') as HTMLInputElement;
                if (input.value.trim()) startGame(input.value);
              }}
              className="mt-4 w-full bg-google-blue hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
            >
              Iniciar Desafio
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Top 3 Atual</h3>
            <div className="space-y-2">
              {leaderboard.slice(0, 3).map((p, i) => (
                <div key={i} className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-sm border-l-4 border-google-yellow">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </div>
                  <Badge tier={p.tier} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState.status === 'playing') {
    const question = QUESTIONS[gameState.currentQuestionIndex];
    const progress = ((gameState.currentQuestionIndex) / QUESTIONS.length) * 100;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header Stats */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-500 font-medium">Questão {gameState.currentQuestionIndex + 1} de {QUESTIONS.length}</div>
            <div className="flex items-center gap-2">
               <span className="text-2xl font-bold text-google-blue">{gameState.score}</span>
               <span className="text-xs text-gray-400 uppercase">pts</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div className="bg-google-blue h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Timer */}
          <div className="flex justify-end mb-2">
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${timeLeft < 5 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
              ⏱ {timeLeft}s
            </span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
            {/* Category Tag */}
            <div className="absolute top-0 right-0 bg-google-yellow text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
              {question.category}
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{question.title}</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {question.description}
              </p>

              <div className="grid grid-cols-1 gap-4">
                {question.options.map((opt, idx) => {
                  let buttonClass = "group relative p-4 text-left border-2 rounded-xl transition-all duration-200 font-semibold text-gray-700 ";
                  
                  if (showFeedback) {
                    if (idx === question.correctAnswer) {
                      // Correct Answer: Pulse Green
                      buttonClass += "border-google-green bg-green-50 animate-pulse text-google-green";
                    } else if (idx === selectedOption) {
                      // Selected Wrong Answer: Shake Red
                      buttonClass += "border-google-red bg-red-50 animate-shake text-google-red";
                    } else {
                      // Others: Fade out
                      buttonClass += "border-gray-100 opacity-40";
                    }
                  } else {
                    // Normal State
                    buttonClass += "border-gray-100 hover:border-google-blue hover:bg-blue-50 group-hover:text-google-blue";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={showFeedback}
                      className={buttonClass}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Result & Leaderboard view
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
        
        {/* Left Column: Player Result */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border-t-8 border-google-green">
            <h2 className="text-gray-500 font-medium uppercase tracking-widest mb-2">Resultado Final</h2>
            <div className="text-6xl font-black text-gray-800 mb-4">{gameState.score}</div>
            
            <div className="flex justify-center mb-6">
              <Badge tier={currentTier()} size="lg" />
            </div>

            <p className="text-gray-600 mb-8">
              Parabéns, {gameState.playerName}! Você completou o desafio.
              Confira ao lado se você entrou para o ranking.
            </p>

            <button
              onClick={() => setGameState({ status: 'welcome', currentQuestionIndex: 0, score: 0, playerName: '', answers: [] })}
              className="w-full bg-google-dark text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition shadow-lg"
            >
              Jogar Novamente
            </button>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl font-bold text-google-green">
                {gameState.answers.filter(Boolean).length}
              </div>
              <div className="text-sm text-gray-500">Acertos</div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
               <div className="text-3xl font-bold text-google-red">
                {gameState.answers.filter(a => !a).length}
              </div>
              <div className="text-sm text-gray-500">Erros</div>
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[600px]">
          <div className="p-6 bg-google-blue text-white">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              🏆 Ranking Global
            </h3>
            <p className="text-blue-100 text-sm">Atualizado em tempo real</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {leaderboard.map((player, index) => (
              <div 
                key={player.id || index} 
                className={`flex items-center justify-between p-3 rounded-xl border ${player.name === gameState.playerName ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-100'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index < 3 ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{player.name}</div>
                    <div className="text-xs text-gray-400">{new Date(player.timestamp).toLocaleTimeString()}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-google-blue">{player.score}</div>
                  <div className="scale-75 origin-right">
                    <Badge tier={player.tier} />
                  </div>
                </div>
              </div>
            ))}
            {leaderboard.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                Nenhum jogador ainda. Seja o primeiro!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;