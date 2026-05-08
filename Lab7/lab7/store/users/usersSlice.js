import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
    },
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { saveUser } = usersSlice.actions;
export default usersSlice.reducer;