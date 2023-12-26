// components/Hangman.js
import React, { useState, useEffect } from "react";

const Hangman = () => {
  const words = ["javascript", "react", "node", "next", "hangman"];
  const [selectedWord, setSelectedWord] = useState("");
  const [guessedWord, setGuessedWord] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const initializeGame = () => {
    const word = getRandomWord().toLowerCase();
    setSelectedWord(word);
    setGuessedWord(Array(word.length).fill("_"));
    setIncorrectGuesses([]);
    setRemainingAttempts(6);
    setGameOver(false);
    setGameStarted(true);
  };

  const handleGuess = (letter) => {
    if (remainingAttempts > 0 && guessedWord.includes("_") && !gameOver) {
      const newGuessedWord = [...guessedWord];
      if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
          if (selectedWord[i] === letter) {
            newGuessedWord[i] = letter;
          }
        }
        setGuessedWord(newGuessedWord);
      } else {
        setIncorrectGuesses([...incorrectGuesses, letter]);
        setRemainingAttempts(remainingAttempts - 1);
      }
    }
  };

  const restartGame = () => {
    initializeGame();
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameStarted) {
      if (guessedWord.join("") === selectedWord) {
        setGameOver(true);
        setTimeout(() => {
          alert("Congratulations! You won. Play again?");
        }, 0);
      } else if (remainingAttempts === 0) {
        setGameOver(true);
        setTimeout(() => {
          alert(
            `Game over! The correct word was "${selectedWord}". Play again?`
          );
        }, 0);
      }
    }
  }, [guessedWord, remainingAttempts, selectedWord, gameStarted]);

  return (
    <div>
      <h1>Hangman Game</h1>
      {gameOver ? (
        <div>
          <button onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <div>
          {gameStarted ? (
            <>
              <p>Remaining Attempts: {remainingAttempts}</p>
              <p>Incorrect Guesses: {incorrectGuesses.join(", ")}</p>
              <p>{guessedWord.join(" ")}</p>
              <div>
                <p>Available Letters:</p>
                {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={
                      !remainingAttempts ||
                      guessedWord.includes(letter) ||
                      incorrectGuesses.includes(letter)
                    }
                  >
                    {letter}
                  </button>
                ))}
              </div>
              {guessedWord.join("") === selectedWord && (
                <p>{`Congratulations! You guessed the word: "${selectedWord}".`}</p>
              )}
              <button onClick={restartGame}>Restart</button>
            </>
          ) : (
            <button onClick={initializeGame}>Play</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Hangman;
