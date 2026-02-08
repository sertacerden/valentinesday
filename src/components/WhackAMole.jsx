import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './WhackAMole.module.css';

export default function WhackAMole({ onBack }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [activeHole, setActiveHole] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const timerRef = useRef(null);
    const moleTimerRef = useRef(null);

    const [hitHole, setHitHole] = useState(null); // Track which hole shows the hit effect

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(30);
        setGameOver(false);
        setHitHole(null);

        // Game Loop
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        moveMole();
    };

    const endGame = () => {
        clearInterval(timerRef.current);
        clearTimeout(moleTimerRef.current);
        setIsPlaying(false);
        setGameOver(true);
        setActiveHole(null);
        setHitHole(null);

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const moveMole = () => {
        if (!isPlaying && timeLeft <= 0) return;

        const randomHole = Math.floor(Math.random() * 9);
        setActiveHole(randomHole);
        setHitHole(null); // Reset hit effect for new move

        // Random duration for mole to stay up (400ms - 1000ms)
        const duration = Math.random() * 600 + 400;

        moleTimerRef.current = setTimeout(() => {
            if (timeLeft > 0) moveMole();
        }, duration);
    };

    const whack = (index) => {
        if (index === activeHole) {
            setScore((s) => s + 1);
            setActiveHole(null);
            setHitHole(index); // Trigger visual hit effect
            // Maybe play sound here

            // Immediately move to next avoiding wait
            clearTimeout(moleTimerRef.current);

            // Slight delay so user sees the hit
            setTimeout(() => {
                if (timeLeft > 0) moveMole();
            }, 200);
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
            clearTimeout(moleTimerRef.current);
        };
    }, []);

    return (
        <div className={styles.gameContainer}>
            <h2 style={{ color: 'black', fontFamily: 'var(--font-heading)', fontSize: '2.5rem' }}>Seto'yu Yakala! 🔨</h2>

            <div className={styles.scoreBoard}>
                <div>Skor: {score}</div>
                <div>Süre: {timeLeft}s</div>
            </div>

            {!isPlaying && !gameOver && (
                <button
                    onClick={startGame}
                    style={{ padding: '1rem 3rem', fontSize: '1.5rem', borderRadius: '50px', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer' }}
                >
                    Başla!
                </button>
            )}

            {gameOver && (
                <div style={{ textAlign: 'center', color: 'black' }}>
                    <h3>Oyun Bitti!</h3>
                    <p>Toplam Skor: {score}</p>
                    <button
                        onClick={startGame}
                        style={{ marginTop: '1rem', padding: '0.8rem 2rem', borderRadius: '20px', border: 'none', background: 'white', color: 'var(--color-primary)', cursor: 'pointer' }}
                    >
                        Tekrar Oyna
                    </button>
                </div>
            )}

            <div className={styles.grid}>
                {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className={styles.hole} onClick={() => whack(index)}>
                        <div className={`${styles.mole} ${activeHole === index ? styles.up : ''} ${hitHole === index ? styles.hit : ''}`} />
                        {hitHole === index && <div className={styles.hitText}>POW! 💥</div>}
                    </div>
                ))}
            </div>

            <button className={styles.backBtn} onClick={onBack}>
                Ana Menüye Dön
            </button>
        </div>
    );
}
