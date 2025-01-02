import { observer, useLocalObservable } from "mobx-react-lite";
import Querty from "@/components/Qwerty";
import PuzzleStore from "@/stores/PuzzleStore";
import Guess from "@/components/Guess";
import { useEffect } from "react";

const Home: React.FC = observer(() => {
  const store = useLocalObservable(() => PuzzleStore);

  useEffect(() => {
    store.init();
    window.addEventListener("keyup", store.handleKeyup);

    return () => {
      window.removeEventListener("keyup", store.handleKeyup);
    };
  }, [store]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-600">
      <h1 className="text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-400">
        Wordle
      </h1>
      {store.guesses.map((_, i) => (
        <Guess
          key={`guess-${i}`}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
      ))}
      {store.won && <h1>You Won!</h1>}
      {store.lost && <h1>You Lost! The word is {store.word}</h1>}
      {(store.won || store.lost) && (
        <button onClick={store.init}>Play Again</button>
      )}
      <Querty store={store} />
    </div>
  );
});

export default Home;
