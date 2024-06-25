/**
 * Retrieves transactions that occurred in the same week before the specified date for a specific user.
 * @param {number} userId - Unique User ID.
 * @param {string} date - The date in "YYYY-MM-DD" format.
 * @param {Array<Object>} transactions - The array of transactions.
 * @returns {Array<Object>} - An array of transactions that occurred in the same week as the specified date for the specified user.
 */
const getUserSameWeekTransactions = (userId, date, transactions) => {
  const targetDate = new Date(date);

  const startDate = new Date(targetDate);
  const dayOfWeek = startDate.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Sunday
  startDate.setDate(startDate.getDate() + diffToMonday);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transaction.user_id === userId &&
      transactionDate >= startDate &&
      transactionDate < targetDate
    );
  });
};

module.exports = getUserSameWeekTransactions;
