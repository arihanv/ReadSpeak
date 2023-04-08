export const addWord = (value) => {
    return {
        type: 'INCREMENT',
        payload: value
    };
}

export const deleteWord = (value) => {
    return {
        type: 'DECREMENT',
        payload: value
    };
}

export const resetState = () => {
    return {
      type: 'RESET_STATE'
    };
  };