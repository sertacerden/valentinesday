import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './Puzzle.module.css';

const GRID_SIZE = 4;
const TILE_SIZE = 80; // px
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

export default function Puzzle({ onComplete }) {
    const [pieces, setPieces] = useState([]);
    const [placedPieces, setPlacedPieces] = useState(Array(TOTAL_PIECES).fill(null));
    const [isSolved, setIsSolved] = useState(false);

    // Initialize pieces
    useEffect(() => {
        // Create pieces with their correct positions
        const newPieces = Array.from({ length: TOTAL_PIECES }, (_, i) => ({
            id: i,
            row: Math.floor(i / GRID_SIZE),
            col: i % GRID_SIZE,
        }));

        // Shuffle pieces to display in the "pool"
        setPieces(newPieces.sort(() => Math.random() - 0.5));
    }, []);

    const handleDragStart = (e, pieceId) => {
        e.dataTransfer.setData('pieceId', pieceId);
    };

    const handleDrop = (e, slotIndex) => {
        e.preventDefault();
        const pieceId = parseInt(e.dataTransfer.getData('pieceId'));

        // If slot is already filled, do nothing (or could swap)
        if (placedPieces[slotIndex] !== null) return;

        // Check if the piece belongs here (optional difficulty: strict vs loose)
        // Let's make it strict for "puzzle" feel: only allow correct piece? 
        // OR allow any piece and check win condition?
        // User asked for "completed with dragging", standard puzzle allows wrong placement.
        // Let's allow placing any piece anywhere, but check if it matches ID for win.

        // Actually, to make it easier for user, let's allow placing.

        const newPlaced = [...placedPieces];

        // Remove from original list (if it was there) logic handled by rendering
        // But since we are using two areas, we need to track where each piece is.

        // Simpler Approach:
        // `pieces` state holds pieces in the "pool".
        // `placedPieces` state holds pieces in the grid slots.

        // Find piece in pool
        const pieceInPool = pieces.find(p => p.id === pieceId);

        if (pieceInPool) {
            // Move from pool to grid
            newPlaced[slotIndex] = pieceInPool;
            setPlacedPieces(newPlaced);
            setPieces(pieces.filter(p => p.id !== pieceId));
            checkWin(newPlaced);
        } else {
            // Piece might be moving from another slot?
            // Let's handle pool-to-slot only for simplicity first, or standard HTML5 drag/drop
            // If we want to move between slots, we need to find where it came from.
            const oldSlotIndex = placedPieces.findIndex(p => p && p.id === pieceId);
            if (oldSlotIndex !== -1) {
                newPlaced[oldSlotIndex] = null;
                newPlaced[slotIndex] = placedPieces[oldSlotIndex];
                setPlacedPieces(newPlaced);
                checkWin(newPlaced);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Return piece to pool if dropped outside
    const returnToPool = (pieceId) => {
        // implementation complex with standard drag/drop
        // Let's stick to Pool -> Grid logic mostly
    };

    const checkWin = (currentPlaced) => {
        // Check if all slots are filled AND correct
        const isComplete = currentPlaced.every((piece, index) => piece && piece.id === index);
        if (isComplete) {
            setIsSolved(true);
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    return (
        <div className={styles.puzzleContainer}>
            {!isSolved ? (
                <>
                    <h2>Parçaları Yerleştir 🧩</h2>
                    <div className={styles.gameArea}>

                        {/* The Grid (Drop Zone) */}
                        <div className={styles.dropZone}>
                            {placedPieces.map((piece, index) => (
                                <div
                                    key={index}
                                    className={styles.slot}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index)}
                                >
                                    {piece && (
                                        <div
                                            className={styles.puzzlePiece}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, piece.id)}
                                            style={{
                                                backgroundPosition: `${(piece.col * 100) / (GRID_SIZE - 1)}% ${(piece.row * 100) / (GRID_SIZE - 1)}%`
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* The Pool (Pieces Area) */}
                        <div className={styles.piecesArea}>
                            {pieces.map((piece) => (
                                <div
                                    key={piece.id}
                                    className={styles.puzzlePiece}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, piece.id)}
                                    style={{
                                        backgroundPosition: `${(piece.col * 100) / (GRID_SIZE - 1)}% ${(piece.row * 100) / (GRID_SIZE - 1)}%`,
                                        position: 'relative'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.successMessage}>
                    <h2>Mükemmelsin! ❤️</h2>
                    <img src="/pictures/puzzle.jpeg" alt="Completed" style={{ width: '300px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }} />
                    <p style={{ marginTop: '1rem', opacity: 0.8 }}>Sonsuza kadar birlikte tamamlayacağımız resimler olsun...</p>
                </div>
            )}
        </div>
    );
}
