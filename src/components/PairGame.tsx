import React, { useState, useEffect } from "react";
import PlayerInfo from "./PlayerInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  dicreaseLife,
  increaseLevel,
} from "../features/pairGame/pairGameSlice";
import Score from "./Score";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

type Card = {
  id: number;
  value: string;
  flipped: boolean;
};

const cardValues: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "G"];

let shuffledCardValues: string[] = shuffleArray([...cardValues, ...cardValues]);

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function PairGame(): JSX.Element {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  const navigate = useNavigate();

  const active_nickname = useSelector(
    (state: RootState) => state.pairGame.nickname
  );
  const lifes = useSelector((state: RootState) => {
    return state.pairGame.lifes;
  });
  const level = useSelector((state: RootState) => {
    return state.pairGame.level;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (matchedCards.length === shuffledCardValues.length) {
      // Restart the game here
      const timeout = setTimeout(() => {
        dispatch(increaseLevel(1));
        setMatchedCards([]);
        setScore(0);

        shuffledCardValues = shuffleArray([...cardValues, ...cardValues]);

        // Create new game
        setCards(
          shuffledCardValues.map((value, index) => ({
            id: index,
            value,
            flipped: true, // Set all cards to flipped initially
          }))
        );

        // Flip back the cards after 5 seconds
        const flipTimeout = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((prevCard) => ({ ...prevCard, flipped: false }))
          );
        }, 5000);

        return () => {
          clearTimeout(timeout);
          clearTimeout(flipTimeout);
        };
      }, 2000);
    }
  }, [matchedCards]);

  useEffect(() => {
    if (lifes === 0) {
      addScoreToLeaderboard(active_nickname, level);
      navigate("/leaderboard");
    }
  }, [lifes]);

  // Initialize the cards array with shuffled card values
  useEffect(() => {
    setCards(
      shuffledCardValues.map((value, index) => ({
        id: index,
        value,
        flipped: true, // Set all cards to flipped initially
      }))
    );

    // Flip back the cards after 5 seconds
    const timeout = setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((prevCard) => ({ ...prevCard, flipped: false }))
      );
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const addScoreToLeaderboard = async (name: string, level: number) => {
    try {
      const response = await fetch("http://localhost:3001/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, level }),
      });

      if (response.ok) {
        console.log("level added to leaderboard successfully");
        // Handle success
      } else {
        console.log("Failed to add level to leaderboard");
        // Handle failure
      }
    } catch (error) {
      console.log("Error adding score to leaderboard", error);
      // Handle error
    }
  };

  // Handle card click event
  const handleCardClick = (card: Card) => {
    if (card.flipped || matchedCards.includes(card.id)) {
      return;
    }

    if (selectedCards.length === 0) {
      // Flip the first selected card
      flipCard(card);
      setSelectedCards([card.id]);
    } else if (selectedCards.length === 1) {
      // Flip the second selected card
      flipCard(card);
      setSelectedCards([...selectedCards, card.id]);

      // Check if the selected cards match
      const selectedCard1 = cards[selectedCards[0]];
      const selectedCard2 = card;
      if (selectedCard1.value === selectedCard2.value) {
        // Cards match, mark them as matched
        setMatchedCards([...matchedCards, selectedCard1.id, selectedCard2.id]);
        setSelectedCards([]);
        setScore((prevScore) => prevScore + 1);
      } else {
        // Cards do not match, flip them back after a short delay
        setTimeout(() => {
          flipCard(selectedCard1, false);
          flipCard(selectedCard2, false);
          setSelectedCards([]);
          dispatch(dicreaseLife(1));
          //   dispatch(initializeActivePlayer("nickname"));
        }, 1000);
      }
    }
  };

  // Flip the specified card
  const flipCard = (card: Card, flipped = true) => {
    setCards((prevCards) =>
      prevCards.map((prevCard) =>
        prevCard.id === card.id ? { ...prevCard, flipped } : prevCard
      )
    );
  };

  return (
    <div className="pair-game">
      <PlayerInfo active_nickname={active_nickname} lifes={lifes} />
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? "flipped" : ""} ${
              matchedCards.includes(card.id) ? "matched" : ""
            }`}
            onClick={() => handleCardClick(card)}
          >
            {card.flipped && !matchedCards.includes(card.id) && (
              <span className="card-value">{card.value}</span>
            )}
          </div>
        ))}
      </div>
      <Score score={score} level={level} />
    </div>
  );
}

export default PairGame;
