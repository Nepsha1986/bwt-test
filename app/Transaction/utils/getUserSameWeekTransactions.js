/**
 * Retrieves transactions that occurred in the same week before the specified date for a specific user.
 *
 * @param {number} userId
 * @param {string} date
 * @param {Array<Object>} transactions
 *
 * @returns {Array<Object>}
 */
const getUserSameWeekTransactions = (userId, date, transactions) => {
  const targetDate = new Date(date);

  const startDate = new Date(targetDate);
  const dayOfWeek = startDate.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startDate.setDate(startDate.getDate() + diffToMonday);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transaction.user_id === userId &&
      transactionDate >= startDate &&
      transactionDate <= targetDate
    );
  });
};

module.exports = getUserSameWeekTransactions;

module.exports = getUserSameWeekTransactions;
