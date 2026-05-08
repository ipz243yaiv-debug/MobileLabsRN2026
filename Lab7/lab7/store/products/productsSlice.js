import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        {
            id: '1',
            name: 'Ноутбук',
            description: 'Потужний ігровий ноутбук',
            price: 45000,
            image: 'https://via.placeholder.com/100'
        },
        {
            id: '2',
            name: 'Смартфон',
            description: 'Сучасний телефон з гарною камерою',
            price: 20000,
            image: 'https://via.placeholder.com/100'
        },
        {
            id: '3',
            name: 'Навушники',
            description: 'Бездротові навушники з шумозаглушенням',
            price: 3000,
            image: 'https://via.placeholder.com/100'
        }
    ],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
});

export default productsSlice.reducer;