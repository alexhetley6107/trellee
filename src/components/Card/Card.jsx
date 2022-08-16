import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard, moveCard, moveCardToCard } from '../../redux/cardSlice';

import s from './Card.module.scss';

function Card({ card, boardId }) {
	const dispatch = useDispatch();

	const handleDeleteCard = () => {
		const cardId = card.id;
		dispatch(deleteCard({ boardId, cardId }));
	};

	const handleDragCardStart = (e) => {
		const fromBoardId = boardId;
		const movingCard = card;
		const json = JSON.stringify({ fromBoardId, movingCard });
		e.dataTransfer.setData('cardInfo', json);
	};

	const handleOnDrop = (e) => {
		const cardInfo = e.dataTransfer.getData('cardInfo');

		if (cardInfo) {
			const { fromBoardId, movingCard } = JSON.parse(cardInfo);
			const toBoardId = boardId;
			const onDropCardId = card.id;

			dispatch(moveCardToCard({ fromBoardId, toBoardId, movingCard, onDropCardId }));
		}
		e.stopPropagation();
	};

	return (
		<div className={s.card} draggable onDragStart={handleDragCardStart} onDrop={handleOnDrop}>
			<p>{card.text}</p>

			<div className={s.del} onClick={handleDeleteCard}>
				×
			</div>
		</div>
	);
}

export default Card;
