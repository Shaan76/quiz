
        let currentQuestion = 0;
        let score = 0;
        const questions = [
            {
                question: "What is the capital of India?",
                options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
                answer: 1
            },
            {
                question: "What is the capital of France?",
                options: ["Paris", "London", "Rome", "Berlin"],
                answer: 0
            },
            {
                question: "What is the capital of Japan?",
                options: ["Tokyo", "Seoul", "Beijing", "Bangkok"],
                answer: 0
            },
            // Add more questions here
        ];

        function showQuestion(index) {
            const questionContainer = document.getElementById('question-container');
            const questionText = document.getElementById('question-text');
            const feedback = document.getElementById('feedback');
            questionText.innerText = questions[index].question;
            const options = questionContainer.querySelectorAll('.option');
            options.forEach((option, i) => {
                option.querySelector('span').innerText = questions[index].options[i];
                option.querySelector('input').checked = false;
            });
            feedback.innerText = '';
        }

        function submitQuiz(event) {
            event.preventDefault();
            const feedback = document.getElementById('feedback');
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if (selectedOption) {
                const answer = parseInt(selectedOption.value);
                if (answer === questions[currentQuestion].answer) {
                    feedback.innerText = 'Correct!';
                    feedback.style.color = 'green';
                    score++;
                } else {
                    feedback.innerText = 'Wrong!';
                    feedback.style.color = 'red';
                }
                currentQuestion++;
                setTimeout(() => {
                    if (currentQuestion < questions.length) {
                        showQuestion(currentQuestion);
                    } else {
                        feedback.innerText = `Quiz Over! Your score is ${score}/${questions.length}`;
                        document.getElementById('progress').innerText = '';
                        document.getElementById('timer').innerText = '';
                    }
                }, 1000);
                updateProgress();
            } else {
                feedback.innerText = 'Please select an option!';
                feedback.style.color = 'orange';
            }
        }

        function updateProgress() {
            const progress = document.getElementById('progress');
            progress.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
        }

        function startTimer(duration, display) {
            let timer = duration, minutes, seconds;
            const interval = setInterval(() => {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                display.textContent = minutes + ":" + seconds;
                if (--timer < 0) {
                    clearInterval(interval);
                    document.getElementById('feedback').innerText = `Time's up! Your score is ${score}/${questions.length}`;
                    document.getElementById('question-container').style.display = 'none';
                }
            }, 1000);
        }

        document.addEventListener('DOMContentLoaded', () => {
            showQuestion(currentQuestion);
            updateProgress();
            const timerDisplay = document.getElementById('timer');
            startTimer(60 , timerDisplay);
        });