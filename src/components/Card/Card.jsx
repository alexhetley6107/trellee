import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../../redux/cardSlice';

import s from './Card.module.scss';

function Card({ card, boardId }) {
	const dispatch = useDispatch();

	const handleDeleteCard = () => {
		const cardId = card.id;
		dispatch(deleteCard({ boardId, cardId }));
	};

	return (
		<div className={s.card}>
			{card.text}

			<div className={s.del} onClick={handleDeleteCard}>
				×
			</div>
		</div>
	);
}

export default Card;
