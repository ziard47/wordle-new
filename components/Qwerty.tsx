import { observer } from "mobx-react-lite";

interface QwertyProps {
  store: {
    exactGuesses: string[];
    inexactGuesses: string[];
    allGuesses: string[];
  };
}

const Querty: React.FC<QwertyProps> = observer(({ store }) => {
  const qwerty = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div>
      {qwerty.map((row) => (
        <div className="flex justify-center" key={row}>
          {row.split("").map((char) => {
            const bgColor = store.exactGuesses.includes(char)
              ? "bg-green-400"
              : store.inexactGuesses.includes(char)
              ? "bg-yellow-400"
              : store.allGuesses.includes(char)
              ? "bg-gray-400"
              : "bg-gray-200";

            return (
              <div
                key={char}
                className={`m-px flex h-10 w-10 items-center justify-center uppercase rounded-md ${bgColor} text-black`}
              >
                {char}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default Querty;
