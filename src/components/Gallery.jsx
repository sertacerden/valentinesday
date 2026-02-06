import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import styles from './Gallery.module.css';

const PHOTOS = [
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.17.24.jpeg',
        note: 'Seninle her an özel... 💕'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.42 (1).jpeg',
        note: 'Gülüşün dünyamı aydınlatıyor ☀️'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.42 (2).jpeg',
        note: 'Birlikteyken zaman duruyor ⏳'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.42.jpeg',
        note: 'En güzel anılarım seninle 📸'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.43 (1).jpeg',
        note: 'Seni çok seviyorum ❤️'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.43 (2).jpeg',
        note: 'İyi ki varsın sevgilim 🌹'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.43 (3).jpeg',
        note: 'Hayatımın anlamısın ✨'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.43 (4).jpeg',
        note: 'Kalbimin tek sahibisin 🗝️'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.43.jpeg',
        note: 'Sonsuza kadar beraber... ♾️'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.44 (1).jpeg',
        note: 'Gözlerinin içine bakmak... 😍'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.44 (2).jpeg',
        note: 'Seninle her yer cennet 🏝️'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.44 (3).jpeg',
        note: 'Aşkımızın şahidi bu kareler 💑'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.44 (4).jpeg',
        note: 'Sen benim mucizemsin 🌟'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.44 (5).jpeg',
        note: 'Kalbim seninle atıyor 💓'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.44.jpeg',
        note: 'Aşkım ❤️'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.45 (1).jpeg',
        note: 'Her saniye seni özlüyorum 🕰️'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.45 (2).jpeg',
        note: 'Bitanemsin 🍯'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.45 (3).jpeg',
        note: 'Gözbebeğim 👁️'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.45 (4).jpeg',
        note: 'Ruh eşim 👻'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.45 (5).jpeg',
        note: 'Gülüşün dünyamı aydınlatıyor ☀️'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.45 (6).jpeg',
        note: 'Sevgilim 🌸'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.45 (7).jpeg',
        note: 'Hayatım 🌍'
    },
    {
        src: '/pictures/WhatsApp Image 2026-02-06 at 16.21.45.jpeg',
        note: 'First Dateeee 💎'
    },
];

export default function Gallery({ onUnlockLetter }) {
    const containerRef = useRef(null);
    const [selectedId, setSelectedId] = useState(null);
    const [draggedCount, setDraggedCount] = useState(0);
    const handledDrags = useRef(new Set());

    const scatterPositions = useMemo(() => {
        return PHOTOS.map(() => ({
            r: Math.random() * 20 - 10,
            x: Math.random() * 100 - 50, // Increased spread
            y: Math.random() * 60 - 30,
        }));
    }, []);

    const handleDragStart = (index) => {
        if (!handledDrags.current.has(index)) {
            handledDrags.current.add(index);
            setDraggedCount(prev => prev + 1);
        }
    };

    const isDragging = useRef(false);

    return (
        <div className={styles.galleryWrapper} ref={containerRef}>
            <h2 className={styles.heading}>Anılarımız</h2>
            <p className={styles.subtext}>Sürprizi bulmak için fotoğrafları kenara çek!</p>

            <div className={styles.scatterArea}>
                {/* The Hidden Button - Centered and behind everything */}
                <motion.div
                    className={styles.secretButtonContainer}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: draggedCount === PHOTOS.length ? 1 : 0,
                        scale: draggedCount === PHOTOS.length ? 1 : 0.8,
                        pointerEvents: draggedCount === PHOTOS.length ? 'auto' : 'none'
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <button onClick={onUnlockLetter} className={styles.secretBtn}>
                        Son Bir Sürpriz... 💌
                    </button>
                </motion.div>

                {PHOTOS.map((photo, index) => (
                    <motion.div
                        key={index}
                        layoutId={`card-${index}`}
                        className={styles.card}
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0.2}
                        onDragStart={() => {
                            isDragging.current = true;
                            handleDragStart(index);
                        }}
                        onDragEnd={() => {
                            setTimeout(() => isDragging.current = false, 100);
                        }}
                        onTap={() => {
                            if (!isDragging.current) {
                                setSelectedId(index);
                            }
                        }}
                        initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: scatterPositions[index].r,
                            x: scatterPositions[index].x,
                            y: scatterPositions[index].y
                        }}
                        whileHover={{ scale: 1.05, zIndex: 110 }}
                        whileDrag={{ scale: 1.1, zIndex: 120, cursor: 'grabbing' }}
                        style={{ zIndex: 10 + index }}
                    >
                        <div className={styles.polaroidInner}>
                            <img src={photo.src} alt="Memory" className={styles.image} />
                            <div className={styles.caption}>{photo.note}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId !== null && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedId}`}
                            className={styles.expandedCard}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={PHOTOS[selectedId].src} alt="Memory Big" className={styles.expandedImage} />
                            <div className={styles.expandedCaption}>{PHOTOS[selectedId].note}</div>
                            <button className={styles.closeBtn} onClick={() => setSelectedId(null)}>×</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
