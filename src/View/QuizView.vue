<template>
    <div class="quiz-container">
      <h1>NUS Regulations Quiz</h1>
  
      <div class="quiz-content">
        <div v-for="(question, index) in questions" :key="index" class="question-card">
          <p class="question-text">{{ index + 1 }}. {{ question.question }}</p>
          <div class="options">
            <label v-for="(option, optIndex) in question.options" :key="optIndex" class="option">
              <input type="radio" :name="'question' + index" :value="option" v-model="userAnswers[index]" />
              {{ option }}
            </label>
          </div>
        </div>
      </div>
  
      <button class="submit-btn" @click="submitQuiz">Submit Quiz</button>
  
      <div v-if="score !== null" class="score-section">
        <h2>Your Score: {{ score }} / 10</h2>
      </div>
    </div>
  </template>
  
  <script>
  import firebaseApp from '../firebase.js';
  import { getFirestore, doc, updateDoc,  } from 'firebase/firestore';
  import { getAuth } from 'firebase/auth';
  const db = getFirestore(firebaseApp);


  export default {
    data() {
      return {
        score: null,
        userAnswers: Array(10).fill(null),
        questions: [
          { question: "What is the official visiting hour of NUS?", options: ["06:00-18:00", "09:00-18:00", "08:00-20:00", "12:00-23:59"], answer: "08:00-20:00" },
          { question: "What is the maximum duration you can stay at one place?", options: ["30mins", "1hr", "2hrs", "No Limit"], answer: "1hr" },
          { question: "Which office oversees student conduct at NUS?", options: ["Dean’s Office", "Registrar’s Office", "Office of Student Affairs", "NUS Council"], answer: "Office of Student Affairs" },
          { question: "How long is a semester at NUS (excluding exams)?", options: ["10 weeks", "12 weeks", "13 weeks", "15 weeks"], answer: "13 weeks" },
          { question: "What is the maximum number of modular credits (MCs) a full-time student can take per semester?", options: ["18", "20", "22", "24"], answer: "22" },
          { question: "What is the penalty for plagiarism at NUS?", options: ["Warning", "Failing the module", "Disciplinary action", "All of the above"], answer: "All of the above" },
          { question: "How long can students access the NUS library after graduation?", options: ["Lifetime", "1 year", "5 years", "Not allowed"], answer: "1 year" },
          { question: "Which bus service operates within the NUS campus?", options: ["NUSExpress", "NUSLoop", "Campus Rider", "NUSShuttle"], answer: "NUSLoop" },
          { question: "What is the NUS policy on smoking?", options: ["Allowed in designated areas", "Banned on campus", "Allowed near hostels", "Only allowed for staff"], answer: "Banned on campus" },
          { question: "What is the consequence of missing 3 tutorial sessions without valid reason?", options: ["Warning", "Drop from module", "Fail the module", "Nothing"], answer: "Drop from module" }
        ]
      };
    },
    methods: {
      async submitQuiz() {
        this.score = this.userAnswers.reduce((total, answer, index) => {
          return answer === this.questions[index].answer ? total + 1 : total;
        }, 0);
        const userEmail = localStorage.getItem('email');

        if (this.score > 7) {
        // User passed - update Firebase
          const userRef = doc(db, "users", userEmail);
          await updateDoc(userRef, {
            quizPassed: true,
          });
          
          alert(`Congratulations! You passed with a score of ${this.score}/10. You will now be redirected to the main page.`);
          this.$router.push('/main');
        } else {
          alert(`You scored ${this.score}/10. You need at least 7 correct answers to pass. Please try again.`);
          this.resetQuiz();
        }
      },
      resetQuiz() {
        this.score = null;
        this.userAnswers = Array(10).fill(null);
        window.scrollTo(0, 0);
    }
  }
}
  </script>
  
  <style scoped>
  .quiz-container {
    width: 100vw;
    height: 100vh;
    background: url('../assets/Utown.png') no-repeat center center/cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    color: white;
  }
  
  h1 {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .quiz-content {
    width: 70%;
    max-width: 1000px;
    max-height: 65vh;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    clip-path: inset(0px round 15px); /* Ensures border remains rounded */
}
  
  .question-card {
    margin-bottom: 15px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .question-text {
    font-size: 18px;
    font-weight: bold;
    color: black;
  }
  
  .options {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  
  .option {
    font-size: 16px;
    margin-bottom: 5px;
    color: black;
  }
  
  .submit-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .submit-btn:hover {
    background: #0056b3;
  }
  
  .score-section {
    margin-top: 20px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    text-align: center;
  }
  
  .score-section h2 {
    font-size: 24px;
    font-weight: bold;
  }
  </style>
  