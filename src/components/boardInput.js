import { useState } from "react";

const BoardInput = ({ board, setBoard, testSolution, setTestSolution, generatedInput }) => {
	
	
	const handleSubmit = (e) => {
		e.preventDefault();
        // console.log(e.target.input.value);
		try {
			setBoard(JSON.parse(e.target.input.value));
		} catch (e) {
			console.log(e);
		}

		try {
			setTestSolution(e.target.testSolution.value);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="mt-10 sm:mt-0">
			<div>
				<div className="mt-5 md:mt-0 md:col-span-2">
					<form onSubmit={handleSubmit}>
						<div className="shadow overflow-hidden sm:rounded-md">
							<div className="flex px-4 py-3 bg-gray-50 text-right sm:px-6">
								<div className="mr-5">
									<label className="w-20 block text-l font-medium text-gray-700">
										Input Json
									</label>
									<button
										type="submit"
										className="m-2 inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Save
									</button>
								</div>
								<textarea
									type="text"
									name="input"
									className="input w-full mt-5 mr-58 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-medium border-gray-300 rounded-md"
									defaultValue={board}
									rows="15"
								/>

								<div className="w-full ml-5">
									<label className="block text-l text-left font-medium text-gray-700">
										Test Solution
									</label>
									<textarea
										type="text"
										name="testSolution"
										className="input w-full focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-medium border-gray-300 rounded-md"
										defaultValue={testSolution}
										rows="15"
									/>
								</div>
							</div>
						</div>
						<form>
						<div className="shadow overflow-hidden sm:rounded-md">
							<div className="flex px-4 py-3 bg-gray-50 text-right sm:px-6">
								<div className="mr-5">
									<label className="w-24 block text-l font-medium text-gray-700">
										Generated Input Json From Board
									</label>
								</div>
								<textarea
									type="text"
									// name="generated-input"
									className="mt-5 w-60 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-medium border-gray-300 rounded-md"
									value={generatedInput}
									rows="15"
								/>
							</div>
						</div>
						</form>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BoardInput;
