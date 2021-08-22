const state = {
  exchange: "",
  symbol: "",
  symbols: [],
  baseCurrency: "",
  currencySymbol: "",
  forexData: "",
  loaded: false,
};

const getters = {
  getExchange: (state) => state.exchange,
  getSymbol: (state) => state.symbol,
  getBaseCurrency: (state) => state.baseCurrency,
  getCurrencySymbol: (state) => state.currencySymbol,
  selectSymbol: (state) => (symbol) => {
    return state.symbols.find((data) => data.symbol === symbol);
  },
  getForexData: (state) => state.forexData,
  isloaded: (state) => state.loaded,
};

const actions = {};

const mutations = {
  setExchange: (state, exchange) => (state.exchange = exchange),
  setSymbol: (state, symbol) => (state.symbol = symbol),
  setBaseCurrency: (state, baseCurrency) => (state.baseCurrency = baseCurrency),
  setCurrencySymbol: (state, currencySymbol) =>
    (state.currencySymbol = currencySymbol),
  setSymbols: (state, symbols) => (state.symbols = symbols),
  setForexdata: (state, forexData) => (state.forexData = forexData),
  setLoading: (state, loaded) => (state.loaded = loaded),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
