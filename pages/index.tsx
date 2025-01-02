import { observer, useLocalObservable } from "mobx-react-lite";
import Querty from "@/components/Qwerty";
import PuzzleStore from "@/stores/PuzzleStore";
import Guess from "@/components/Guess";
import Header from "@/components/Header";
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
      <Header />
      {store.guesses.map((_, i) => (
        <Guess
          key={`guess-${i}`}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
      ))}
      {store.won && <h1 className="mt-3 mb-3">You Won!</h1>}
      {store.lost && (
        <h1 className="mt-3 mb-3">
          You Lost! The word is{" "}
          <span className="bg-green-100 text-green-800 text-md font-medium me-2 px-2.5 py-2 rounded dark:bg-green-900 dark:text-green-300 uppercase tracking-widest">
            {store.word}
          </span>
        </h1>
      )}
      {(store.won || store.lost) && (
        <button
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={store.init}
        >
          Play Again
        </button>
      )}
      <Querty store={store} />

      {/* word: {store.word}
      guesses: {JSON.stringify(store.guesses)} */}
    </div>
  );
});

export default Home;
