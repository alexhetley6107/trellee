import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
	boards: [
		{
			id: '1',
			name: 'first',
			cards: [
				{ id: '1', text: 'fadsdf wswsw' },
				{ id: '2', text: 'fasdsdsdf wwdww' },
				{ id: '3', text: 'faascaasdsdf ww' },
				{ id: 'e', text: 'fadsdf w wwwew wwww ' },
				{ id: 'e22', text: 'fadsdf w wwwew wwww ' },
			],
		},
		{
			id: '2',
			name: 'second',
			cards: [
				{ id: '11', text: 'fadsdf wswsw' },
				{ id: '21', text: 'fasdsdsdf wwdww' },
				{ id: 'e1', text: 'fadsdf w wwwew wwww ' },
			],
		},
		{
			id: '3',
			name: 'third',
			cards: [
				{ id: '111', text: 'fadsdf wswsw' },
				{ id: '211', text: 'fasdsdsdf wwdww' },
			],
		},
	],
};

const cardSlice = createSlice({
	name: 'cardReducer',
	initialState,
	reducers: {
		newBoard: (state) => {
			const id = nanoid(10);
			const newBoard = { id, name: 'New Board', cards: [] };
			state.boards.push(newBoard);
		},
		renameBoard: (state, action) => {
			const { boardId, newName } = action.payload;
			state.boards = state.boards.map((b) => (b.id === boardId ? { ...b, name: newName } : b));
		},
		deleteBoard: (state, action) => {
			state.boards = state.boards.filter((board) => board.id !== action.payload);
		},
		moveBoard: (state) => {},
		addCard: (state, action) => {
			const { boardId, text } = action.payload;
			const id = nanoid(10);
			const newCard = { id, text };
			state.boards = state.boards.map((b) =>
				b.id === boardId ? { ...b, cards: [...b.cards, newCard] } : b,
			);
		},
		moveCard: (state) => {},
		deleteCard: (state, action) => {
			const { boardId, cardId } = action.payload;
			state.boards = state.boards.map((b) =>
				b.id === boardId ? { ...b, cards: b.cards.filter((c) => c.id !== cardId) } : b,
			);
		},
	},
});

export const { newBoard, renameBoard, deleteBoard, moveBoard, addCard, moveCard, deleteCard } =
	cardSlice.actions;
export default cardSlice.reducer;
