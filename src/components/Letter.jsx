import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Letter.module.css';

export default function Letter() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <div className={styles.container}>
            {!isOpen ? (
                <motion.div
                    className={styles.envelope}
                    onClick={handleOpen}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className={styles.flap}></div>
                    <div className={styles.seal}>❤️</div>
                    <div className={styles.text}>Açmak için Tıkla</div>
                </motion.div>
            ) : (
                <motion.div
                    className={styles.letterPaper}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className={styles.date}>14 Şubat 2026</p>
                    <p>Hayatımın anlamı,</p>
                    <p>
                        Sevgililer Günün Kutlu Olsun! Sana ne kadar özel olduğunu hatırlatmak için
                        ufak bir şey yapmak istedim. Sen benim en sevdiğim insan, en iyi arkadaşım
                        ve en büyük maceramsın.
                    </p>
                    <p>
                        Hayat bazen çok hızlı akıyor. Günler birbirini kovalıyor, koşturmalar, yorgunluklar, planlar… Ama bütün o karmaşanın içinde değişmeyen tek bir şey var: Sen.

                        Seninle tanıştığımdan beri dünya biraz daha yumuşak, biraz daha anlamlı, biraz daha “ev” gibi hissettiriyor. En sıradan anlar bile seninle özel oluyor. Birlikte içtiğimiz kahve, attığımız mesajlar, saçma sapan güldüğümüz şeyler… Hepsi hafızamda küçük ama çok değerli anılar olarak birikiyor.

                        Bazen fark etmiyorsun belki ama sen benim en büyük huzurumsun. Yorulduğumda dinlendiğim yer, mutlu olduğumda paylaşmak istediğim ilk kişisin. Yanımda olman bana güç veriyor, gülüşün günümü düzeltiyor.

                        Bu Sevgililer Günü’nde sana kocaman hediyeler veremesem bile şunu bilmeni istiyorum: Kalbimdeki yerin hiçbir şeyle ölçülmez. İyi ki varsın, iyi ki benimlesin, iyi ki hayatı seninle paylaşıyorum.

                        Daha birlikte güleceğimiz, gezeceğimiz, hayaller kuracağımız bir sürü gün olsun.
                        Elini hiç bırakmak istemiyorum.

                        Seni çok seviyorum. ❤️
                    </p>
                    <p>
                        Seni kelimelerin anlatabileceğinden daha çok seviyorum.
                    </p>
                    <p className={styles.signature}>Sonsuza kadar senin yanında olacağım bebeğim,</p>
                </motion.div>
            )}
        </div>
    );
}
