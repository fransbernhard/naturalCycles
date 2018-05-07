const banan = (state = [], action) => {
  switch (action.type) {
    case "BANAN":
      return action.payload
    default:
      return state
  }
}

export default banan
