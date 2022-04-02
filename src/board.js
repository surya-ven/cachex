import { Hexagon } from "tiled-hexagons";
import Spacer from "./components/spacer";
import { useState, useEffect } from "react";

const tile = <Hexagon sideLength={40} text="Hi" textStyle={{ fill: "blue" }} />;


const blueTile = (
	<Hexagon
		sideLength={40}
		text="Hi"
		fill="blue"
		textStyle={{ fill: "white" }}
	/>
);

const redTile = (
	<Hexagon
		sideLength={40}
		text="Hi"
		fill="red"
		textStyle={{ fill: "white" }}
	/>
);

const createTile = (text) => {
    return <Hexagon sideLength={40} text={text} textStyle={{ fill: "blue" }} />;
}

const createBlueTile = (text) => {
	return (
		<Hexagon
			sideLength={40}
			text={text}
			fill="blue"
			textStyle={{ fill: "white" }}
		/>
	);
};

const createRedTile = (text) => {
    return (
	<Hexagon
		sideLength={40}
		text={text}
		fill="red"
		textStyle={{ fill: "white" }}
	/>
    );
};

const Board = ({ input, testSolution }) => {
	const arr2D = (r, c) => [...Array(r)].map((x) => Array(c).fill(null));
	let boardObj = input;
	if (typeof input == "string") {
		boardObj = JSON.parse(input);
	}
    const board = arr2D(boardObj.n, boardObj.n);
    startBoard(board);
	const [cells, setCells] = useState([]);
	const [colour, setColour] = useState("r");
	const [solution, setSolution] = useState([]);
	const [isPlaySolution, setIsPlaySolution] = useState(false);

	useEffect(() => {
		if (Object.keys(boardObj).length > 0) {
			setCells(boardObj.board);
            setSolution(parseSolution(testSolution));
            console.log(solution);
		}
		console.log(boardObj.board);
	}, [input, testSolution]);

	useEffect(() => {
		setSolution(parseSolution(testSolution));
	}, [testSolution]);

	const onClick = (cells, setCells, newCell) => {
		let reverse = false;
		let reverseLoc = null;
		let newCells = null;
		cells.forEach((cell, i) => {
			if (
				cell[0] !== "none" &&
				cell[1] === newCell[1] &&
				cell[2] === newCell[2]
			) {
				reverse = true;
				reverseLoc = i;
			}
		});
		if (reverse) {
			newCells = cells.slice();
			newCells[reverseLoc][0] = "none";
			setCells(newCells);
			return;
		}
		setCells([...cells, newCell]);
	};

	const updateSolution = async () => {
		const newSolution = solution.slice();
		const newSolutionCell = newSolution.shift();
		setSolution(newSolution);
		setCells([...cells, newSolutionCell]);
	};

	useEffect(() => {
		if (solution.length > 0 && isPlaySolution) {
			updateSolution();
		} else if (solution.length === 0 && isPlaySolution) {
			setIsPlaySolution(false);
		}
	}, [solution, isPlaySolution]);

	fillBoard(board, cells);
	let displayBoard = makeBoard(
		board.slice().reverse(),
		onClick,
		cells,
		setCells,
		colour
	);

	return (
		<div className="p-10 w-screen sm:w-auto">
			<div>
				<div className="mx-2 p-4 sm:px-0">
					<h3 className="text-lg font-medium leading-6 text-gray-900">
						Cachex
					</h3>
					<p className="mt-1 text-sm text-gray-600">
						Implemented from Assignment 1, COMP30024 - The University of Melbourne
					</p>
				</div>
			</div>
			{
				<div className="flex">
					<button
						className="mx-2 my-2 bg-blue-700 transition duration-150 ease-in-out hover:border-indigo-600 hover:text-gray-200 rounded text-white px-6 py-2 text-xs"
						onClick={() => setColour("b")}
					>
						Blue
					</button>
					<button
						className="mx-2 my-2 bg-red-700 transition duration-150 ease-in-out hover:border-gray-600 hover:text-gray-200 rounded text-white px-6 py-2 text-xs"
						onClick={() => setColour("r")}
					>
						Red
					</button>
					<button
						className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-blue-400 rounded border border-indigo-700 text-indigo-700 px-6 py-2 text-xs"
						onClick={() => setIsPlaySolution(true)}
					>
						Play
					</button>
				</div>
			}
			{displayBoard}
		</div>
	);
};

const makeBoard = (board, onClick, cells, setCells, colour) => {
	// console.log(board);
	const size = board.length;
	return (
		<div className="flex justify-center m-10 sm:p-0">
			<div className="my-7">
				{board.map((row, i) => {
					return (
						<div className={`flex -my-7`} key={`${i}`}>
							{makeSpace(size - i)}
							{row.map((tile, j) => {
								return (
									<div
										className="mx-1"
										key={`${i}-${j}`}
										onClick={() =>
											onClick(cells, setCells, [
												colour,
												size - i - 1,
												j,
											])
										}
									>
										{tile}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};

const makeSpace = (amount) => {
	const spacers = Array(amount).fill(<Spacer />);
	return <div className="flex">{spacers.map((spacer) => spacer)}</div>;
};

const fillBoard = (board, cells) => {
	cells.forEach((cell) => {
		if (cell[0] === "b") {
			board[cell[1]][cell[2]] = createBlueTile(`(${cell[1]}, ${cell[2]})`);
		} else if (cell[0] === "r") {
			board[cell[1]][cell[2]] = createRedTile(`(${cell[1]}, ${cell[2]})`);
		} else if (cell[0] === "none") {
			board[cell[1]][cell[2]] = createTile(`(${cell[1]}, ${cell[2]})`);
		}
	});
};

const startBoard = (board) => {
	for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = createTile(`(${i}, ${j})`);
        }
    }
}

const parseSolution = (solution) => {
	const lines = solution.split("\n");
	const solutions = [];
	for (let i = 1; i < lines.length; i++) {
		const line = Array(3);
		if (
			isNaN(parseInt(lines[i].charAt(1))) ||
			isNaN(parseInt(lines[i].charAt(3)))
		) {
			continue;
		}
		line[0] = "r";
		line[1] = parseInt(lines[i].charAt(1));
		line[2] = parseInt(lines[i].charAt(3));
		solutions.push(line);
	}
	return solutions;
};

export default Board;
