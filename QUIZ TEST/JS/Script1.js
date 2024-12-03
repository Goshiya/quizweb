// JavaScript source code
// Generates a math question based on the selected difficulty level
export function generateQuestion() {
    const level = document.getElementById("level").value;
    let question = "";
    let correctAnswer = 0;
    let options = [];

    // Clear previous options and question
    document.getElementById("question-container").innerHTML = "";
    document.getElementById("options-container").innerHTML = "";

    switch (level) {
        case "1":
            question = generateMultiplicationQuestion();
            break;
        case "2":
            question = generateTrigQuestion();
            break;
        case "3":
            question = generateAdvancedQuestion();
            break;
        default:
            question = "Invalid level!";
    }

    if (question) {
        // Display the question
        document.getElementById("question-container").innerHTML = `<p><strong>Question:</strong> ${question.text}</p>`;

        // Display the options
        question.options.forEach((option) => {
            const optionButton = document.createElement("div");
            optionButton.classList.add("option");
            optionButton.innerHTML = option;
            optionButton.onclick = () => checkAnswer(option, question.correctAnswer, optionButton);
            document.getElementById("options-container").appendChild(optionButton);
        });
    }
}

function generateMultiplicationQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 * num2;

    return {
        text: `${num1} * ${num2} = ?`,
        correctAnswer,
        options: generateOptions(correctAnswer),
    };
}

function generateTrigQuestion() {
    const angles = [0, 90, 180, 270];
    const trigFunctions = [Math.sin, Math.cos, Math.tan];

    const angle = angles[Math.floor(Math.random() * angles.length)];
    const trigFunction = trigFunctions[Math.floor(Math.random() * trigFunctions.length)];

    if (trigFunction === Math.tan && (angle === 90 || angle === 270)) {
        return generateTrigQuestion(); // Skip invalid tan angles
    }

    const correctAnswer = parseFloat(trigFunction((angle * Math.PI) / 180).toFixed(2));
    const functionName = trigFunction === Math.sin ? "sin" : trigFunction === Math.cos ? "cos" : "tan";

    return {
        text: `What is the value of ${functionName}(${angle}°)?`,
        correctAnswer,
        options: generateOptions(correctAnswer),
    };
}

function generateAdvancedQuestion() {
    const isDerivative = Math.random() < 0.5;

    if (isDerivative) {
        const coeff = Math.floor(Math.random() * 10) + 1;
        const exponent = Math.floor(Math.random() * 5) + 2;
        const correctAnswer = `${coeff * exponent}x^${exponent - 1}`;

        return {
            text: `What is the first derivative of ${coeff}x^${exponent}?`,
            correctAnswer,
            options: generateOptionsForDerivatives(correctAnswer, coeff, exponent),
        };
    } else {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = a + Math.floor(Math.random() * 5) + 1;
        const base = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = base * (b - a);

        return {
            text: `What is the definite integral of ${base} from ${a} to ${b}?`,
            correctAnswer,
            options: generateOptionsForIntegration(correctAnswer),
        };
    }
}

function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomOption = correctAnswer + Math.floor(Math.random() * 20) - 10;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function generateOptionsForDerivatives(correctAnswer, coeff, exponent) {
    const options = [correctAnswer];
    while (options.length < 4) {
        const incorrectCoeff = coeff + (Math.random() < 0.5 ? -1 : 1);
        const incorrectExponent = exponent + (Math.random() < 0.5 ? -1 : 1);
        const incorrectAnswer = `${incorrectCoeff}x^${incorrectExponent}`;
        if (!options.includes(incorrectAnswer)) {
            options.push(incorrectAnswer);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function generateOptionsForIntegration(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 4) {
        const offset = Math.random() * 5 - 2.5;
        const incorrectAnswer = parseFloat((correctAnswer + offset).toFixed(2));
        if (!options.includes(incorrectAnswer)) {
            options.push(incorrectAnswer);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function checkAnswer(selectedOption, correctAnswer, optionElement) {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach((option) => (option.style.pointerEvents = "none"));

    if (parseFloat(selectedOption) === parseFloat(correctAnswer)) {
        optionElement.classList.add("correct");
    } else {
        optionElement.classList.add("incorrect");
    }
}
