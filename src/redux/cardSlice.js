import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import saveToLS from './saveToLS';

const getBoardsFromLS = () => {
	const data = localStorage.getItem('boards');
	const Boards = data
		? JSON.parse(data)
		: [
				{
					id: '1111',
					name: 'To Do',
					cards: [
						{ id: '1', text: 'Загрузить видео' },
						{ id: '2', text: 'Купить бананы' },
						{ id: '3', text: 'Выучить испанский' },
						{ id: 'e', text: 'Выйти на прогулку' },
						{ id: 'e22', text: 'Собрать урожай' },
					],
				},
				{
					id: '2222',
					name: 'Doing',
					cards: [
						{ id: '11', text: 'Выполнить задачу' },
						{ id: '21', text: 'Устроиться на работу' },
						{ id: 'e1', text: 'Найти поставщика бананов' },
					],
				},
				{
					id: '3333',
					name: 'Done',
					cards: [
						{ id: '111', text: 'Постричь газон' },
						{ id: '211', text: 'Съесть бананы' },
					],
				},
		  ];

	return Boards;
};

const initialState = { boards: getBoardsFromLS() };

const cardSlice = createSlice({
	name: 'cardReducer',
	initialState,
	reducers: {
		newBoard: (state) => {
			const id = nanoid(10);
			const newBoard = { id, name: 'New Board', cards: [] };
			state.boards.push(newBoard);

			saveToLS(state.boards);
		},
		renameBoard: (state, action) => {
			const { boardId, newName } = action.payload;
			state.boards = state.boards.map((b) => (b.id === boardId ? { ...b, name: newName } : b));
			saveToLS(state.boards);
		},
		deleteBoard: (state, action) => {
			state.boards = state.boards.filter((board) => board.id !== action.payload);
			saveToLS(state.boards);
		},
		moveBoard: (state, action) => {
			const { toBoardId, movingBoard } = action.payload;

			let toIndex = state.boards.findIndex((b) => b.id === toBoardId);
			const moveIndex = state.boards.findIndex((b) => b.id === movingBoard.id);

			state.boards = state.boards.filter((b) => b.id !== movingBoard.id);

			toIndex = toIndex - moveIndex === 1 ? toIndex++ : toIndex;

			state.boards.splice(toIndex, 0, movingBoard);
			saveToLS(state.boards);
		},
		addCard: (state, action) => {
			const { boardId, text } = action.payload;
			const id = nanoid(10);
			const newCard = { id, text };
			state.boards = state.boards.map((b) =>
				b.id === boardId ? { ...b, cards: [...b.cards, newCard] } : b,
			);
			saveToLS(state.boards);
		},
		deleteCard: (state, action) => {
			const { boardId, cardId } = action.payload;
			state.boards = state.boards.map((b) =>
				b.id === boardId ? { ...b, cards: b.cards.filter((c) => c.id !== cardId) } : b,
			);
			saveToLS(state.boards);
		},

		moveCardToBoard: (state, action) => {
			const { fromBoardId, toBoardId, movingCard } = action.payload;

			state.boards = state.boards
				.map((b) =>
					b.id === fromBoardId ? { ...b, cards: b.cards.filter((c) => c.id !== movingCard.id) } : b,
				)
				.map((b) => (b.id === toBoardId ? { ...b, cards: [movingCard, ...b.cards] } : b));
			saveToLS(state.boards);
		},

		moveCardToCard: (state, action) => {
			const { fromBoardId, toBoardId, movingCard, onDropCardId } = action.payload;

			state.boards = state.boards.map((b) =>
				b.id === fromBoardId ? { ...b, cards: b.cards.filter((c) => c.id !== movingCard.id) } : b,
			);

			const toBoardCards = state.boards.filter((b) => b.id === toBoardId)[0].cards;
			const cardIndex = toBoardCards.findIndex((c) => c.id === onDropCardId);
			toBoardCards.splice(cardIndex, 0, movingCard);
			saveToLS(state.boards);
		},
	},
});

export const {
	newBoard,
	renameBoard,
	deleteBoard,
	moveBoard,
	addCard,
	deleteCard,
	moveCardToBoard,
	moveCardToCard,
} = cardSlice.actions;
export default cardSlice.reducer;
