import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Quiz.module.css';
import confetti from 'canvas-confetti';

export default function Quiz({ questions, onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev (though we only go next)

    const handleAnswer = (option) => {
        const isCorrect = option === questions[currentIndex].correctAnswer;
        const newScore = isCorrect ? score + 1 : score;
        setScore(newScore);

        // Optional: Visual feedback before moving on? 
        // For now, let's keep it snappy.

        if (isCorrect) {
            // Mini confetti burst for correct answer
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#e91e63', '#ffc107', '#ffffff']
            });
        }

        setDirection(1);

        if (currentIndex + 1 < questions.length) {
            setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
        } else {
            setTimeout(() => onComplete(newScore), 300);
        }
    };

    const currentQuestion = questions[currentIndex];

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.3 }
        })
    };

    return (
        <div className={styles.quizContainer}>
            <div className={styles.progress}>
                Soru {currentIndex + 1} / {questions.length}
            </div>

            <AnimatePresence mode='wait' custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={styles.questionCard}
                >
                    <h2 className={styles.questionText}>{currentQuestion.question}</h2>
                    <div className={styles.options}>
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleAnswer(option)}
                                className={styles.optionButton}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
