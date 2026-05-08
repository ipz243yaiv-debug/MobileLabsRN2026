import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        history: [],
    },
    reducers: {
        addOrder: (state, action) => {
            state.history.push(action.payload);
        },
    },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;