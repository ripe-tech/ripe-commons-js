const SYMBOLS = {
    EUR: ["€", 1],
    USD: ["$", -1],
    GBP: ["£", -1],
    BRL: ["R$", -1],
    CAD: ["$", -1],
    AUD: ["$", -1],
    JPY: ["¥", -1],
    RUB: ["₽", 1],
    KRW: ["₩", -1],
    CHF: ["fr.", 1],
    SGD: ["$", -1],
    MXN: ["$", -1],
    DKK: ["kr.", 1],
    SEK: ["kr.", 1],
    PLN: ["zł", 1]
};

const DECIMAL_PLACES = {
    EUR: 2,
    USD: 2,
    GBP: 2,
    BRL: 2,
    CAD: 2,
    AUD: 2,
    JPY: 0,
    RUB: 2,
    KRW: 0,
    CHF: 2,
    SGD: 2,
    MXN: 2,
    DKK: 2,
    SEK: 2,
    PLN: 2
};

const SEPARATOR = {
    EUR: ",",
    USD: ".",
    GBP: ".",
    BRL: ",",
    CAD: ".",
    AUD: ".",
    JPY: ".",
    RUB: ",",
    KRW: ".",
    CHF: ".",
    SGD: ".",
    MXN: ".",
    DKK: ".",
    SEK: ",",
    PLN: "."
};

const THOUSANDS = {
    EUR: " ",
    USD: ",",
    GBP: ",",
    BRL: ".",
    CAD: ",",
    AUD: ",",
    JPY: ",",
    RUB: " ",
    KRW: ",",
    CHF: ",",
    SGD: ",",
    MXN: ",",
    DKK: ",",
    SEK: ".",
    PLN: " "
};

const _formatCurrency = (money, currency, useSymbol) => {
    let symbol = useSymbol ? SYMBOLS[currency] : null;
    symbol = symbol || [currency, 1];
    const position = symbol[1];
    symbol = symbol[0];
    money = position === 1 ? money + " " + symbol : symbol + " " + money;
    return money;
};

export const formatMoney = (value, currency, places, separator, thousands, useSymbol) => {
    if (value === null || value === undefined) {
        return "";
    }
    useSymbol = useSymbol === undefined ? true : useSymbol;
    let defaultPlaces = DECIMAL_PLACES[currency];
    let defaultSeparator = SEPARATOR[currency];
    let defaultThousands = THOUSANDS[currency];
    defaultPlaces = defaultPlaces === undefined ? 2 : defaultPlaces;
    defaultSeparator = defaultSeparator === undefined ? "." : defaultSeparator;
    defaultThousands = defaultThousands === undefined ? "," : defaultThousands;
    places = isNaN(parseInt(places)) ? defaultPlaces : places;
    separator = separator === null || separator === undefined ? defaultSeparator : separator;
    thousands = thousands === null || thousands === undefined ? defaultThousands : thousands;
    const signal = value < 0 ? "-" : "";
    const integer = parseInt(Math.abs(+value || 0).toFixed(places)) + "";
    let remaining = integer.length;
    remaining = remaining > 3 ? remaining % 3 : 0;
    let money = signal;
    money += remaining ? integer.substr(0, remaining) + thousands : "";
    money += integer.substr(remaining).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
    money += places
        ? separator +
          Math.abs(Math.abs(value) - integer)
              .toFixed(places)
              .slice(2)
        : "";
    money = currency ? _formatCurrency(money, currency, useSymbol) : money;
    return money;
};
