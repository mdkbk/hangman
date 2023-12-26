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

  const renderHangman = () => {
    const incorrectCount = incorrectGuesses.length;
    const maxHangmanParts = 6; // Maximum number of parts in the hangman representation

    const hangmanParts = ["  0", " /|\\", " / \\", "|   |", "|   |"];

    // Display the full hangman
    const fullHangman = hangmanParts.concat(
      Array.from(
        { length: maxHangmanParts - hangmanParts.length },
        () => "    "
      )
    );

    // Build the stick vertically to the right side of the man
    const verticalStick = Array.from({ length: incorrectCount }, () => "    |");

    // Build the horizontal stick if needed
    const horizontalStick = incorrectCount > 0 ? ["--------|"] : [];

    // Combine the full hangman, vertical stick, and horizontal stick
    const hangmanDisplay = fullHangman
      .map((part, index) => {
        return index < verticalStick.length
          ? `${part}${verticalStick[index]}`
          : part;
      })
      .concat(horizontalStick);

    return (
      <div className="hangman">
        <pre>{hangmanDisplay.join("\n")}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Hangman Game</h1>
      {gameOver ? (
        <div>
          {renderHangman()}
          <button onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <div>
          {gameStarted ? (
            <>
              {renderHangman()}
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
      <style>
        {`
          .hangman {
            font-family: monospace;
            white-space: pre;
            font-size: 20px;
          }

          .hangman pre {
            margin: 0;
            padding: 5px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
          }
        `}
      </style>
    </div>
  );
};

export default Hangman;
