/**
 * Retrieves CashOutNatural related transactions for current transaction.
 *
 * @param {TransactionDTO} transaction
 * @param {TransactionDTO[]} transactions
 *
 * @returns {TransactionDTO[]}
 */

const getCashOutNaturalRelated = (transaction, transactions) => {
  const { date, user_id: userId } = transaction;

  const targetDate = new Date(date);

  const startDate = new Date(targetDate);
  const dayOfWeek = startDate.getDay();

  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startDate.setDate(startDate.getDate() + diffToMonday);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  return transactions.filter((item) => {
    const transactionDate = new Date(item.date);
    return (
      item.type === "cash_out" &&
      item.user_id === userId &&
      transactionDate >= startDate &&
      transactionDate <= targetDate
    );
  });
};

module.exports = getCashOutNaturalRelated;
