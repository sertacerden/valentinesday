
// This is a mock service mimicking a DynamoDB fetch
// In a real app, this would use the AWS SDK to Query/Scan a table

const MOCK_QUESTIONS = [
    {
        id: 'q1',
        question: "İlk nerede tanıştık?",
        options: ["O'Mutfak", "Yemekhane", "Golf Arabası", "Çardak"],
        correctAnswer: "Yemekhane" // USER: CHANGE THIS
    },
    {
        id: 'q2',
        question: "En sevdiğim yemek hangisi?",
        options: ["Pizza", "Sweet Chili Tavuk", "Hamburger", "Lahmacun"],
        correctAnswer: "Sweet Chili Tavuk" // USER: CHANGE THIS
    },
    {
        id: 'q3',
        question: "Yıldönümümüz ne zaman?",
        options: ["31 Temmuz", "21 Temmuz", "1 Ağustos", "2 Ağustos"],
        correctAnswer: "2 Ağustos" // USER: CHANGE THIS
    },
    {
        id: 'q4',
        question: "İlk kim 'Seni Seviyorum' dedi?",
        options: ["Sen", "Ben", "Bal", "Hüsamettin"],
        correctAnswer: "Hüsamettin" // USER: CHANGE THIS
    },
    {
        id: 'q5',
        question: "En sevdiğim renk hangisi?",
        options: ["Mavi", "Kırmızı", "Sarı", "Mor"],
        correctAnswer: "Mor" // USER: CHANGE THIS
    },
    {
        id: 'q6',
        question: "En sevdiğim şey ne?",
        options: ["Ben", "Fenerbahçe"],
        correctAnswer: "Ben" // USER: CHANGE THIS
    },
    {
        id: 'q7',
        question: "Sana aldığım ilk hediye neydi?",
        options: ["Kolye", "Bileklik", "Anahtarlık", "Ayna"],
        correctAnswer: "Kolye" // USER: CHANGE THIS
    },
    {
        id: 'q8',
        question: "Beraber yapmayı en çok sevdiğim şey ne?",
        options: ["Mağaza gezmek", "Yemek yemek", "Dizi izlemek", "Ayıplı şeyler 🫣"],
        correctAnswer: "Yemek yemek" // USER: CHANGE THIS
    },
    {
        id: 'q9',
        question: "En sevdiğim çizgi film hangisi?",
        options: ["Regular Show", "Gumball", "Johnny Test", "Adventure Time"],
        correctAnswer: "Regular Show" // USER: CHANGE THIS
    },
    {
        id: 'q10',
        question: "Sana aldığım ilk çiçek neydi?",
        options: ["Kokina", "Gül", "Kasımpatı"],
        correctAnswer: "Gül" // USER: CHANGE THIS
    }
];

export const fetchQuestions = async () => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_QUESTIONS);
        }, 800);
    });
};
