/* Takes in size and adjusts board accordingly */

const SizeSelect = ({ setSize, size }) => {
    const handleSubmit = (e) => {
		e.preventDefault();
		setSize(Number(e.target.size.value));
	};

	return (
		<div className="mt-10 sm:mt-0">
			<div>
				<div className="mt-5 md:mt-0 md:col-span-2">
					<form onSubmit={handleSubmit}>
						<div className="shadow overflow-hidden sm:rounded-md">
							<div className="flex items-center justify-items-start px-4 py-3 bg-gray-50 text-right sm:px-6">
								<label className="w-20 block text-l font-medium text-gray-700">
									Board size
									<input
										type="number"
										name="size"
										className="w-20 mt-1 text-center focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-medium border-gray-300 rounded-md"
										defaultValue={size}
									/>
								</label>
								<button
									type="submit"
									className="mx-5 inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Save
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SizeSelect;
