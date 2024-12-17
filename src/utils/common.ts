/**
 * Formats the given amount with the specified currency code and symbol.
 * @param amount - The numeric amount to be formatted.
 * @param currency - The currency type ("AED", "USD", or "INR").
 * @returns The formatted amount as a string.
 */
export function formatAmountWithCurrency(
    amount: number,
    currency: string | 'AED' | 'USD' | 'INR'
  ): string {
    let formattedAmount: string;
  
    switch (currency) {
      case 'AED':
        formattedAmount = `AED ${amount.toLocaleString()} د.إ`;
        break;
      case 'USD':
        formattedAmount = `USD ${amount.toLocaleString()} $`;
        break;
      case 'INR':
        formattedAmount = `INR ${amount.toLocaleString()} ₹`;
        break;
      default:
        throw new Error("Unsupported currency type");
    }
  
    return formattedAmount;
  }