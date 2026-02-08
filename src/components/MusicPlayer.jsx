import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Attempt auto-play
        // Browsers block autoplay without interaction. 
        // We can try catching the error or just wait for user interaction.
        const playAudio = async () => {
            try {
                if (audioRef.current) {
                    audioRef.current.volume = 0.5;
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } catch (err) {
                console.log("Autoplay blocked, waiting for interaction");
            }
        };

        playAudio();

        // Add global click listener to start music if autoplay failed
        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        };

        document.addEventListener('click', handleInteraction, { once: true });
        return () => document.removeEventListener('click', handleInteraction);
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '50%',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px'
        }} onClick={togglePlay}>
            <audio ref={audioRef} loop src="/music/Derdim.mp3" />
            {isPlaying ? '🎵' : '🔇'}
        </div>
    );
}
