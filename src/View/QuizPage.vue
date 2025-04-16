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
  export default {
    data() {
      return {
        score: null,
        userAnswers: Array(10).fill(null),
        questions: [
          { question: "What is the official visiting hour of NUS?", options: ["06:00-18:00", "09:00-18:00", "08:00-20:00", "12:00-23:59"], answer: "08:00-20:00" },
          { question: "Which lecture theatre is open for visitors?", options: ["LT27", "LT19", "Anyone if not in lecture time", "Not anyone at anytime"], answer: "Not anyone at anytime" },
          { question: "Which office provide service for visitors?", options: ["Dean's Office", "NUS Office of the Associate Provost", "Office of Student Affairs", "NUS Council"], answer: "NUS Office of the Associate Provost" },
          { question: "Is visitors allowed to take NUS buses on weekdays?", options: ["Yes", "No"], answer: "No" },
          { question: "Which of the following is not NUS bus?", options: ["D2", "A2", "BTC", "95"], answer: "95" },
          { question: "After eating at canteen in NUS, what is wrong to do?", options: ["Return the plate", "Leave the plate there", "Clean the table", "None of the above"], answer: "Leave the plate there" },
          { question: "How long can visitors stay in the NUS library per visit?", options: ["30 minutes", "1 hour", "2 hour", "Not allowed"], answer: "Not allowed" },
          { question: "Which bus service operates within the NUS campus?", options: ["NUSExpress", "NUSLoop", "Campus Rider", "NUSShuttle"], answer: "NUSLoop" },
          { question: "What is the NUS policy on smoking?", options: ["Allowed in designated areas", "Banned on campus", "Allowed near hostels", "Only allowed for staff"], answer: "Banned on campus" },
          { question: "At what time, visitors are allowed to enter canteen at Utown?", options: ["11:40am", "12:30pm", "6:30pm", "None of the above"], answer: "None of the above" }
        ]
      };
    },
    methods: {
      submitQuiz() {
        this.score = this.userAnswers.reduce((total, answer, index) => {
          return answer === this.questions[index].answer ? total + 1 : total;
        }, 0);
      }
    }
  };
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
  
