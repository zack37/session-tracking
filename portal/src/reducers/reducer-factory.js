export default function factory(initialState, handlers = {}) {
  return (state = initialState, action) => {
    const hasHandler =
      handlers.hasOwnProperty(action.type) &&
      typeof handlers[action.type] === 'function';

    return hasHandler ? handlers[action.type](state, action) : state;
  };
}
