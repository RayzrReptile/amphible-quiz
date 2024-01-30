import { useState } from 'react'
import './App.css'
import './assets'

function App() {
  // useState Variable
  let [index, setIndex] = useState(0)

  // Questions
  const cardData = [
    {question: "What are Vrex and Levi's relation to one another?", 
    answer: "They are first cousins",
    difficulty: "easy"},
    {question: "When was the first Amphible comic published? Month and year.", 
    answer: "May 2023",
    difficulty: "medium"},
    {question: "What is Arv's favorite sport?", 
    answer: "Basketball",
    difficulty: "easy"},
    {question: "What is Brian's father's name?", 
    answer: "Duke",
    difficulty: "hard"},
    {question: "Tidbit aspires to be ____ when she grows up?", 
    answer: "A sea captain",
    difficulty: "easy"},
    {question: "Where does the world of Amphible take place?", 
    answer: "BogBow Bayou",
    difficulty: "medium"},
    {question: "What species is Iam Adin O'Saur?", 
    answer: "T-Rex",
    difficulty: "easy"},
    {question: "What is the name of Slissia's most prized figurine in her collection?", 
    answer: 'The Limited Edition Feather Styles Reptile Rocker™ Multi-Actionable 7" Figure',
    difficulty: "hard"},
    {question: "This is Qudoka's least favorite color.", 
    answer: "Yellow",
    difficulty: "medium"},
    {question: "What is the name of the first episode of Amphible to have been animated by its creator?", 
    answer: 'Beach Breach',
    difficulty: "hard"},
    {question: "Which two of the main seven Amphiblians are in a romantic relationship?", 
    answer: 'Qudoka and Chez',
    difficulty: "easy"},
    {question: "This character appeared in an animated version of Amphible but has not yet appeared in the comic (as of January 2024).", 
    answer: 'Lasso',
    difficulty: "hard"},
    {question: "How old is Levi?", 
    answer: '19',
    difficulty: "medium"},
    {question: "What is Vrex's occupation?", 
    answer: 'Boat mechanic',
    difficulty: "easy"},
    {question: "Which two characters are the only ones that use the town's community garden?", 
    answer: 'Qudoka and Hilda',
    difficulty: "medium"},
    {question: "Chez's original intended species was a ____ before it was changed to an axolotl.", 
    answer: 'Kamodo dragon',
    difficulty: "hard"},
    {question: "What are Arv and Tidbit's relation to one another?", 
    answer: 'They are siblings',
    difficulty: "easy"},
    {question: "Milk in the world of Amphible is harvested from ____.", 
    answer: 'Maggots',
    difficulty: "hard"}
  ];

  // Function Definitions
  const flipCard = () => {
    let card = document.querySelector('.card');
    card.classList.toggle('flipped');
  }
  const nextCardInc = () => {
    setIndex(index + 1);
    if (index >= cardData.length-1) {
      setIndex(index = 0);
    }
  }
  const backCardInc = () => {
    setIndex(index - 1);
    if (index <= 0) {
      setIndex(index = cardData.length-1);
    }
  }
  const randomCard = () => {
    let randInt = Math.floor(Math.random() * cardData.length);
    while (randInt == index) {
      randInt = Math.floor(Math.random() * cardData.length);
    }
    setIndex(index = randInt);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <h1>The</h1>
          <img src="./assets/AmphibleLogo.png" alt="Amphible Logo" draggable="false"/>
          <h1>Quiz!</h1>
        </div>
        <h2 className="subtitle">Think you know the wacky world of Amphible?<br></br>Try this quirky quiz here!</h2>
        <h3 className="card-count">Number of Cards: {cardData.length}</h3>
      </div>
      <div className="card" id={cardData[index].difficulty} onClick={flipCard}>
        <div className="front">
          <p>{cardData[index].question}</p>
        </div>
        <div className="back">{cardData[index].answer}</div>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={backCardInc} id={cardData[index].difficulty}>←</button>
        <button className="random-button" id={cardData[index].difficulty} onClick={randomCard}>Random Card</button>
        <button className="next-button" onClick={nextCardInc} id={cardData[index].difficulty}>→</button>
      </div>
    </div>
  )
}

export default App
