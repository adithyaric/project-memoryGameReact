import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //Duplicate Cards
      .sort(() => Math.random() - 0.5) //Sorting array randomly, - 0.5 because sometimes the numbers are negative
      .map((card) => ({ ...card, id: Math.random() })); //Cards have uniqe ids

    setchoiceOne(null);
    setchoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  // handle a choice
  const handleChoice = (props) => {
    // if choiceOne have a value than its true and than update the choiceTwo,
    // if choiceOne doesn't have a value than update choiceOne from choiceTwo's value
    choiceOne ? setchoiceTwo(props) : setchoiceOne(props);
  };
  //Compare two selected cars
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevcards) => {
          return prevcards.map((card) => {
            if (card.src === choiceOne.src && choiceTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  //Final touche : set a new game automaticly
  useEffect(() => {
    shuffleCards();
  }, []);
  //reset choices & increase turn
  const resetTurn = () => {
    setDisabled(false);
    setchoiceOne(null);
    setchoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
