import { useState } from 'react'
import './App.css'

function App() {
  // useState Variables
  let [index, setIndex] = useState(0);
  let [currentStreak, setCurrentStreak] = useState(0);
  let [bestStreak, setBestStreak] = useState(0);
  let [batchSize, setBatchSize] = useState(12); // must be less than question list

  // Update best streak 
  if (currentStreak > bestStreak) {
    setBestStreak(currentStreak);
  }

  // Fisher–Yates Shuffle
  const shuffle = (arr) => {
    let array = [...arr];
    var i = array.length, j = 0, temp;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    array.length = batchSize;
    return array;
}

  // Other Variables
  const questionsList = [
    {question: "What are Vrex and Levi's relation to one another?", 
    answer: "First Cousins",
    difficulty: "easy",
    guessed: "Unguessed"},
    {question: "When was the first Amphible comic published? Month and year.", 
    answer: "May 2023",
    difficulty: "medium",
    guessed: "Unguessed"},
    {question: "What is Arv's favorite sport?", 
    answer: "Basketball",
    difficulty: "easy",
    guessed: "Unguessed"},
    {question: "What is Brian's father's name?", 
    answer: "Duke",
    difficulty: "hard",
    guessed: "Unguessed"},
    {question: "Tidbit aspires to be a ____ when she grows up?", 
    answer: "Sea Captain",
    difficulty: "easy",
    guessed: "Unguessed"},
    {question: "Where does the world of Amphible take place?", 
    answer: "BogBow Bayou",
    difficulty: "medium",
    guessed: "Unguessed"},
    {question: "What species is Iam Adin O'Saur?", 
    answer: "T-rex",
    difficulty: "easy",
    guessed: "Unguessed"},
    {question: "What is the name of Slissia's most prized figurine in her collection?", 
    answer: 'The Limited Edition Feather Styles Reptile Rocker™ Multi-Actionable 7" Figure',
    difficulty: "hard",
    guessed: "Unguessed"},
    {question: "This is Qudoka's least favorite color.", 
    answer: "Yellow",
    difficulty: "medium",
    guessed: "Unguessed"},
    {question: "What is the name of the first episode of Amphible to have been animated by its creator?", 
    answer: 'Beach Breach',
    difficulty: "hard",
    guessed: "Unguessed"},
    {question: "Which two of the main seven Amphiblians are in a romantic relationship?", 
    answer: 'Qudoka And Chez',
    difficulty: "easy", 
    guessed: "Unguessed"},
    {question: "This character appeared in an animated version of Amphible but has not yet appeared in the comic (as of January 2024).", 
    answer: 'Lasso',
    difficulty: "hard", 
    guessed: "Unguessed"},
    {question: "How old is Levi?", 
    answer: '19',
    difficulty: "medium", 
    guessed: "Unguessed"},
    {question: "What is Vrex's occupation?", 
    answer: 'Boat Mechanic',
    difficulty: "easy", 
    guessed: "Unguessed"},
    {question: "Which two characters are the only ones that use the town's community garden?", 
    answer: 'Qudoka And Hilda',
    difficulty: "medium", 
    guessed: "Unguessed"},
    {question: "Chez's original intended species was a ____ before it was changed to an axolotl.", 
    answer: 'Kamodo Dragon',
    difficulty: "hard", 
    guessed: "Unguessed"},
    {question: "What are Arv and Tidbit's relation to one another?", 
    answer: 'Siblings',
    difficulty: "easy", 
    guessed: "Unguessed"},
    {question: "Which character does Slissia have a secret crush on?", 
    answer: "Vrex",
    difficulty: "easy",
    guessed: "Unguessed"},
    {question: "Iam Adin O'Saur's favorite type of food is ____.", 
    answer: "Seafood",
    difficulty: "easy",
    guessed: "Unguessed"},
    {question: "How many bedrooms are there in the Amphiblian household?", 
    answer: "3",
    difficulty: "medium",
    guessed: "Unguessed"},
    {question: "Who is the mayor of the town in Amphible?", 
    answer: "Mayor Meleane",
    difficulty: "medium",
    guessed: "Unguessed"},
    {question: "How many of the main seven characters wears a graphic t-shirt?", 
    answer: "3",
    difficulty: "medium",
    guessed: "Unguessed"},
    {question: "How much does Vrex weigh in lbs?", 
    answer: "372",
    difficulty: "hard",
    guessed: "Unguessed"},
    {question: "Milk in the world of Amphible is harvested from ____.", 
    answer: 'Maggots',
    difficulty: "hard", 
    guessed: "Unguessed"}
  ];
  let [cardData, setCardData] = useState(shuffle(questionsList));
  let indicatorIMG = './guess-'+cardData[index].guessed+'.png';
  const BATCH_MIN = 6; // minimum batch size (max is questionsList length)
  const CORRECTNESS_THRESH = 0.75; // percent match for answers to be considered correct

  // Function Definitions
  const startQuiz = () => {
    let classNames = [
      'card', 
      'button-container',
      'introduction-container',
      'card-count',
      'score-container',
      'guess-container',
      'start-container'
    ];
    for (let className of classNames) {
      let container = document.querySelector('.'+className);
      container.classList.toggle('hidden');
    }

    newGame();
  }
  const reshuffle = () => {
    newGame();
    checkFlipped();
    wipeInput();

    let card = document.querySelector('.card');
    card.classList.remove('reshuffle');
    card.classList.remove('wrong-guess');
    card.classList.remove('correct-guess');
    setTimeout(function() {
      card.classList.add('reshuffle');
    }, 1);
  }
  const newGame = () => {
    setCurrentStreak(0);
    setCardData(shuffle(questionsList));
  }
  const flipCard = () => {
    let card = document.querySelector('.card');
    card.classList.toggle('flipped');
    let form = document.querySelector('.guess-form');
    if (form.id == "Unguessed") {
      markWrong();
    }
  }
  const checkFlipped = () => {
    let card = document.querySelector('.card');
    if (card.classList.contains('flipped')) {
      flipCard();
    };
  }
  const checkNotFlipped = () => {
    let card = document.querySelector('.card');
    if (!card.classList.contains('flipped')) {
      flipCard();
    };
  }
  const wipeInput = () => {
    let input = document.querySelector('.text-input');
    input.value = "";
  }
  const batchInc = () => {
    setBatchSize(batchSize + 1);
    if (batchSize >= questionsList.length) {
      setBatchSize(batchSize = BATCH_MIN);
    }
  }
  const batchDec = () => {
    setBatchSize(batchSize - 1);
    if (batchSize <= BATCH_MIN) {
      setBatchSize(batchSize = questionsList.length);
    }
  }
  const nextCardInc = () => {
    checkFlipped();
    wipeInput();
    setIndex(index + 1);
    if (index >= cardData.length-1) {
      setIndex(index = 0);
    }
  }
  const backCardInc = () => {
    checkFlipped();
    wipeInput();
    setIndex(index - 1);
    if (index <= 0) {
      setIndex(index = cardData.length-1);
    }
  }
  const randomCard = () => {
    checkFlipped();
    wipeInput();
    let randInt = Math.floor(Math.random() * cardData.length);
    // Check if there are any unguessed cards left
    let totalGuessed = 0;
    for (let card of cardData) {
      if (card.guessed!="Unguessed") {totalGuessed++;}
    }
    console.log(totalGuessed);
    // Default to first card if no unguessed cards are left
    if (totalGuessed == cardData.length) {
      randInt = 0;
    } // Or if there is only one card left
    else if (totalGuessed == cardData.length-1) {
      while (isGuessed) {
        randInt = Math.floor(Math.random() * cardData.length);
        isGuessed = cardData[randInt].guessed!="Unguessed";
      }
    }
    else {
      let isGuessed = cardData[randInt].guessed!="Unguessed";
      let isSameIndex = randInt == index;
      while (isSameIndex || isGuessed) {
        randInt = Math.floor(Math.random() * cardData.length);
        isSameIndex = randInt == index;
        isGuessed = cardData[randInt].guessed!="Unguessed";
      }
      console.log('Is same: ' + isSameIndex);
      console.log('Is guessed: ' + isGuessed);
    }
    setIndex(index = randInt);
  }
  const keyInput = (event) => {
    if(event.key === 'Enter') {
      checkAnswer();
    }
  }
  const checkAnswer = () => {
    let guess = document.querySelector('.text-input').value;
    if (!guess) {
      alert("No answer written.");
      return;
    }
    // Trim guess and solution
    guess = guess.trim().split(" ");
    let solution = cardData[index].answer;
    solution = solution.trim().split(" ");
    // Check for individual words
    let correctWords = 0;
    for (let word of guess) {
      if (typeof word.charAt(0) === 'string') {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (solution.includes(word)) {
        correctWords++;
      }
    }
    let threshold = Math.ceil(CORRECTNESS_THRESH*solution.length)
    if (correctWords >= threshold) {
      markCorrect();
    }
    else {
      markWrong();
    }
  }
  const markCorrect = () => {
    let array = [...cardData];
    array[index].guessed = "Correct";
    setCardData([...array]);
    console.log(cardData[index].guessed);

    // Add to Streak
    setCurrentStreak(currentStreak+1);

    let card = document.querySelector('.card');
    card.classList.remove('reshuffle');
    card.classList.add('correct-guess');
    setTimeout(function() {
      card.classList.remove('correct-guess');
    }, 500);

    setTimeout(function() {
      nextCardInc();
    }, 550);
  }
  const markWrong = () => {
    let array = [...cardData];
    array[index].guessed = "Wrong";
    setCardData([...array]);
    console.log(cardData[index].guessed);

    // Reset Streak
    setCurrentStreak(0);

    let card = document.querySelector('.card');
    card.classList.remove('reshuffle');
    card.classList.add('wrong-guess');
    setTimeout(function() {
      card.classList.remove('wrong-guess');
      card.classList.remove('flipped');
    }, 250);
    setTimeout(function() {
      checkNotFlipped();
    }, 300);
  }
  const reloadPage = () => {
    location.reload();
  }

  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <h1>The</h1>
          <img src="./AmphibleLogo.png" onClick={reloadPage} alt="Amphible Logo" draggable="false"/>
          <h1>Quiz!</h1>
        </div>
        <div className="introduction-container">
          <h2 className="subtitle">Think you know the wacky world of Amphible?<br></br>Try this quirky quiz here!</h2>
          <h4 className='tutorial'>Go through a random batch of question cards each time you start the quiz. The color of the card indicates the difficulty. Click on the card to flip over to the answers, but be warned! You'll be given the chance to guess the answer before you flip the card and add to the streak. Missing an answer or flipping the card before guessing will break your streak. Good luck!</h4>
        </div>
        <h3 className="card-count hidden">Number of Cards: {batchSize}</h3>
        <div className="score-container hidden">
          <h3 className="current-streak">Current Streak: {currentStreak}</h3>
          <h3 className="beast-streak">Best Streak: {bestStreak}</h3>
        </div>
      </div>
      <div className="start-container">
        <button className="start-button" onClick={startQuiz}>Start!</button>
        <div className="batch-selector">
          <h3 className="batch-title">Batch Size: {batchSize}</h3>
          <div className="batch-buttons">
            <button className="batch-up" onClick={batchInc}>↑</button>
            <button className="batch-down" onClick={batchDec}>↓</button>
          </div>
          
        </div>
      </div>
      <div className="card hidden" id={cardData[index].difficulty} onClick={flipCard}>
        <div className="front">
          <img className="img-indicator" src={indicatorIMG} draggable="false" alt={cardData[index].guessed} />
          <p>{cardData[index].question}</p>
        </div>
        <div className="back">
          <p>{cardData[index].answer}</p>
        </div>
      </div>
      <div className="guess-container hidden">
        <button className="reset-button" id={cardData[index].difficulty} onClick={reshuffle}>Shuffle Deck</button>
        <div className='guess-form' id={cardData[index].guessed}>
          <input type="text" placeholder='Type answer here...' className='text-input' onKeyDown={keyInput}/>
          <button className='check-button' id={cardData[index].difficulty} onClick={checkAnswer}>Check Answer</button>
        </div>
      </div>
      <div className="button-container hidden">
        <button className="back-button" onClick={backCardInc} id={cardData[index].difficulty}>←</button>
        <button className="random-button" id={cardData[index].difficulty} onClick={randomCard}>Random Card</button>
        <button className="next-button" onClick={nextCardInc} id={cardData[index].difficulty}>→</button>
      </div>
    </div>
  )
}

export default App
