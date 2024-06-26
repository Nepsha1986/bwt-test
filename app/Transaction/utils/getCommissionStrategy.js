/**
 * Determines the transaction strategy based on transaction type and user type.
 *
 * @param {"cash_in" | "cash_out"} type
 * @param {"juridical" | "natural"} userType
 *
 * @returns {"CASH_IN" | "CASH_OUT_LEGAL" | "CASH_OUT_NATURAL" }
 * @throws { Error }
 */
const getCommissionStrategy = (type, userType) => {
  if (type === "cash_in") return "CASH_IN";
  if (type === "cash_out" && userType === "juridical") return "CASH_OUT_LEGAL";
  if (type === "cash_out" && userType === "natural") return "CASH_OUT_NATURAL";

  throw new Error(
    `The strategy cannot be determined for type: ${type} and userType: ${userType}`
  );
};

module.exports = getCommissionStrategy;
