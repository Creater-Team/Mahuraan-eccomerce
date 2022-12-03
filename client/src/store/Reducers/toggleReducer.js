export const toggleReducer = (state = { isOpen: true }, action) => {
  switch (action.type) {
    case "OPEN":
      return { isOpen: true };
    case "CLOSE":
      return { isOpen: false };
    default:
      return state;
  }
};
