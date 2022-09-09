export const handleFormatting = (num: number, cc: string): string => {
  if (cc !== "brl" && cc !== "eur" && cc !== "cad" && cc !== "usd") {
    const newCurrency = new Intl.NumberFormat(undefined, {
      maximumSignificantDigits: 12,
    }).format(+num.toFixed(2));

    return `${cc.toUpperCase()} ${newCurrency}`;
  } else if (num === 0) {
    return num.toString();
  } else {
    const newCurrency = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: cc,
      maximumSignificantDigits: 12,
    }).format(+num.toFixed(2));
    return newCurrency;
  }
};
