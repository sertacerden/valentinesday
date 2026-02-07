import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Quiz from './components/Quiz';
import Gallery from './components/Gallery';
import Letter from './components/Letter';
import Puzzle from './components/Puzzle';
import { fetchQuestions } from './services/quizService';
import './App.css';

// We need to create App.css for specific App-level styles if any,
// or just rely on inline/global. Let's make a simple one.

function App() {
  const [gameState, setGameState] = useState('loading'); // loading, landing, quiz, success, fail, gallery, letter, puzzle
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Load questions for the quiz
    fetchQuestions().then(data => {
      setQuestions(data);
      setGameState('landing');
    });

    // Listen for puzzle start from Letter component
    const handleStartPuzzle = () => setGameState('puzzle');
    window.addEventListener('startPuzzle', handleStartPuzzle);
    return () => window.removeEventListener('startPuzzle', handleStartPuzzle);
  }, []);

  const startQuiz = () => {
    setGameState('quiz');
  };

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    const percentage = (finalScore / questions.length) * 100;

    if (percentage >= 70) {
      setGameState('success');
      import('canvas-confetti').then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e91e63', '#ffc107', '#ffffff']
        });
      });
    } else {

      setGameState('fail');
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {gameState === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="screen center"
          >
            <h2>Aşk Yükleniyor... ❤️</h2>
          </motion.div>
        )}

        {gameState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="screen center"
          >
            <h1>Sevgililer Günün Kutlu Olsun!</h1>
            <p className="subtitle">Senin için özel bir şey hazırladım.</p>
            <p>Ama önce, bizi ne kadar iyi tanıdığını görelim...</p>
            <button onClick={startQuiz} className="start-btn">Teste Başla</button>
          </motion.div>
        )}

        {gameState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="screen"
          >
            <Quiz questions={questions} onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {gameState === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="screen center"
          >
            <h1>Yaşasın! Geçtin! 🎉</h1>
            <p>Skor: {score} / {questions.length}</p>
            <button onClick={() => setGameState('gallery')}>Sürprizini Gör</button>
          </motion.div>
        )}

        {gameState === 'fail' && (
          <motion.div
            key="fail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="screen center"
          >
            <h1>Olamaz! 😢</h1>
            <p>Sadece {score} / {questions.length} doğru yaptın.</p>
            <p>Sürprizi açmak için %70 yapmalısın.</p>
            <button onClick={() => setGameState('quiz')}>Tekrar Dene</button>
          </motion.div>
        )}

        {gameState === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="screen"
          >
            <Gallery onUnlockLetter={() => setGameState('letter')} />
          </motion.div>
        )}


        {gameState === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="screen"
          >
            <Letter />
            <button onClick={() => setGameState('gallery')} style={{ marginTop: '2rem', background: '#ccc', fontSize: '0.9rem' }}>
              Anılara Dön
            </button>
          </motion.div>
        )}

        {gameState === 'puzzle' && (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="screen center"
          >
            <Puzzle />
            <button onClick={() => setGameState('letter')} style={{ marginTop: '2rem', background: '#ccc', fontSize: '0.9rem' }}>
              Mektuba Dön
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
