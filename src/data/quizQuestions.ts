
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export const defaultQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: 1,
    category: "Science",
    difficulty: "easy",
    points: 100
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    category: "Geography",
    difficulty: "easy",
    points: 100
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
    category: "Art",
    difficulty: "easy",
    points: 100
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    category: "Geography",
    difficulty: "easy",
    points: 100
  },
  {
    id: 5,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Osmium", "Oxygen", "Oganesson", "Gold"],
    correctAnswer: 1,
    category: "Science",
    difficulty: "easy",
    points: 100
  },
  {
    id: 6,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    category: "Literature",
    difficulty: "easy",
    points: 100
  },
  {
    id: 7,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    category: "Mathematics",
    difficulty: "easy",
    points: 100
  },
  {
    id: 8,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Thailand", "Korea", "Japan"],
    correctAnswer: 3,
    category: "Geography",
    difficulty: "easy",
    points: 100
  },
  {
    id: 9,
    question: "Who discovered penicillin?",
    options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Albert Einstein"],
    correctAnswer: 1,
    category: "Science",
    difficulty: "medium",
    points: 200
  },
  {
    id: 10,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: 2,
    category: "Science",
    difficulty: "easy",
    points: 100
  },
  {
    id: 11,
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Elephant", "Gorilla"],
    correctAnswer: 1,
    category: "Animals",
    difficulty: "easy",
    points: 100
  },
  {
    id: 12,
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    correctAnswer: 2,
    category: "Geography",
    difficulty: "easy",
    points: 100
  },
  {
    id: 13,
    question: "Who is the author of 'To Kill a Mockingbird'?",
    options: ["J.K. Rowling", "Harper Lee", "Stephen King", "Ernest Hemingway"],
    correctAnswer: 1,
    category: "Literature",
    difficulty: "medium",
    points: 200
  },
  {
    id: 14,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: 2,
    category: "Science",
    difficulty: "easy",
    points: 100
  },
  {
    id: 15,
    question: "Which famous scientist developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
    correctAnswer: 1,
    category: "Science",
    difficulty: "medium",
    points: 200
  },
  {
    id: 16,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: 2,
    category: "Geography",
    difficulty: "medium",
    points: 200
  },
  {
    id: 17,
    question: "Which instrument has 47 strings and 7 pedals?",
    options: ["Piano", "Harp", "Violin", "Guitar"],
    correctAnswer: 1,
    category: "Music",
    difficulty: "hard",
    points: 300
  },
  {
    id: 18,
    question: "What is the main ingredient in guacamole?",
    options: ["Spinach", "Avocado", "Lime", "Tomato"],
    correctAnswer: 1,
    category: "Food",
    difficulty: "easy",
    points: 100
  },
  {
    id: 19,
    question: "Which language has the most native speakers worldwide?",
    options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correctAnswer: 2,
    category: "Language",
    difficulty: "medium",
    points: 200
  },
  {
    id: 20,
    question: "What is the national animal of Scotland?",
    options: ["Lion", "Unicorn", "Wolf", "Eagle"],
    correctAnswer: 1,
    category: "Geography",
    difficulty: "hard",
    points: 300
  },
  {
    id: 21,
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
    correctAnswer: 2,
    category: "Geography",
    difficulty: "easy",
    points: 100
  },
  {
    id: 22,
    question: "How many elements are in the periodic table?",
    options: ["92", "100", "118", "120"],
    correctAnswer: 2,
    category: "Science",
    difficulty: "medium",
    points: 200
  },
  {
    id: 23,
    question: "Which company created the iPhone?",
    options: ["Microsoft", "Apple", "Samsung", "Google"],
    correctAnswer: 1,
    category: "Technology",
    difficulty: "easy",
    points: 100
  },
  {
    id: 24,
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    correctAnswer: 2,
    category: "Biology",
    difficulty: "medium",
    points: 200
  },
  {
    id: 25,
    question: "Who painted 'Starry Night'?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Leonardo da Vinci"],
    correctAnswer: 1,
    category: "Art",
    difficulty: "medium",
    points: 200
  },
  {
    id: 26,
    question: "Which planet has the Great Red Spot?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: 1,
    category: "Science",
    difficulty: "medium",
    points: 200
  },
  {
    id: 27,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
    category: "Geography",
    difficulty: "medium",
    points: 200
  },
  {
    id: 28,
    question: "Who wrote '1984'?",
    options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
    correctAnswer: 1,
    category: "Literature",
    difficulty: "medium",
    points: 200
  },
  {
    id: 29,
    question: "What is the chemical symbol for gold?",
    options: ["Gd", "Au", "Ag", "Go"],
    correctAnswer: 1,
    category: "Science",
    difficulty: "easy",
    points: 100
  },
  {
    id: 30,
    question: "Which country is home to the Great Barrier Reef?",
    options: ["New Zealand", "Australia", "Indonesia", "Philippines"],
    correctAnswer: 1,
    category: "Geography",
    difficulty: "easy",
    points: 100
  }
];
