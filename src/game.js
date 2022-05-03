import { useState } from "react";
import Board from "./board";
import SizeSelect from "./components/sizeSelect";
import BoardInput from "./components/boardInput";

/* Displays the game board and allows the user to select the size of the board */

const Game = () => {
	const [size, setSize] = useState(5);
	const [board, setBoard] = useState(`{
"n": 5,
"board": [
["b", 1, 0],
["b", 1, 1],
["b", 1, 3],
["b", 3, 2]
],
"start": [4, 2],
"goal": [0, 0]
}`);
const [testSolution, setTestSolution] = useState(`8
(4,2)
(4,1)
(3,1)
(2,1)
(1,2)
(0,2)
(0,1)
(0,0)
`);

const [generatedInput, setGeneratedInput] = useState(board);
	return (
		<>
			{/* <SizeSelect size={size} setSize={setSize} /> */}
			<Board
				input={board}
				testSolution={testSolution}
				setGeneratedInput={setGeneratedInput}
			/>
			<BoardInput
				board={board}
				setBoard={setBoard}
				testSolution={testSolution}
				setTestSolution={setTestSolution}
				generatedInput={generatedInput}
			/>
		</>
	);
};

export default Game;
