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


export const detectWord = (value) => {
    return {
        type: 'DETECT',
        payload: value
    };
};


export const readWord = () => {
    return {
        type: 'READ',
    };
};


export const resetStats = () => {
    return {
        type: 'RESET_STATS',
    };
}

export const readCard = () => {
    return {
        type: 'CARD',
    };
}