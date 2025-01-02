import { observer } from "mobx-react-lite";
import PuzzleStore from "@/stores/PuzzleStore";

type QwertyProps = {
  store: typeof PuzzleStore;
};

export default observer(function Qwerty({ store }: QwertyProps) {
  const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  const handleKeyPress = (key: string) => {
    if (key === "Enter") {
      store.submitGuess();
    } else if (key === "Backspace") {
      store.handleKeyup({ key: "Backspace" });
    } else {
      store.handleKeyup({ key });
    }
  };

  return (
    <div className="flex flex-col space-y-2 mt-5">
      {/* Regular rows */}
      {qwerty.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex justify-center">
          {row.split("").map((char) => {
            const bgColor = store.exactGuesses.includes(char)
              ? "bg-green-400"
              : store.inexactGuesses.includes(char)
              ? "bg-yellow-400"
              : store.allGuesses.includes(char)
              ? "bg-gray-400"
              : "bg-gray-200";

            return (
              <button
                key={`key-${char}`}
                onClick={() => handleKeyPress(char)}
                className={`m-0.5 flex h-8 w-8 items-center justify-center uppercase rounded-md ${bgColor} text-black`}
                tabIndex={-1}
              >
                {char}
              </button>
            );
          })}
        </div>
      ))}

      {/* Special row for Enter and Backspace */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => handleKeyPress("Enter")}
          className="flex h-8 w-16 items-center justify-center uppercase rounded-md bg-gray-200 text-black"
          tabIndex={-1}
        >
          Enter
        </button>
        <button
          onClick={() => handleKeyPress("Backspace")}
          className="flex h-8 w-16 items-center justify-center uppercase rounded-md bg-gray-200 text-black"
          tabIndex={-1}
        >
          ⌫
        </button>
      </div>
    </div>
  );
});
