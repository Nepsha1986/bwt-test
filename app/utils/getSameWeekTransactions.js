/**
 * Retrieves transactions that occurred in the same week before the specified date.
 * @param {Array<Object>} transactions - The array of transactions.
 * @param {string} date - The date in "YYYY-MM-DD" format.
 * @returns {Array<Object>} - An array of transactions that occurred in the same week as the specified date.
 */
const getSameWeekTransactions = (transactions, date) => {
	const targetDate = new Date(date);

	const startDate = new Date(targetDate);
	const dayOfWeek = startDate.getDay(); // 0 (Sunday) to 6 (Saturday)
	const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
	startDate.setDate(startDate.getDate() + diffToMonday);

	const endDate = new Date(startDate);
	endDate.setDate(endDate.getDate() + 6);

	return transactions.filter(transaction => {
		const transactionDate = new Date(transaction.date);
		return transactionDate >= startDate && transactionDate < targetDate;
	});
};

module.exports = getSameWeekTransactions;
