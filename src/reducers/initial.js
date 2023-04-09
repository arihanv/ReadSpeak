export const initialState = {
    words: [],
    stats: {
        total: 0,
        cardTotal: 0,
        date: new Date().toLocaleDateString('en-GB'),
    },
    detectedText: "",
};