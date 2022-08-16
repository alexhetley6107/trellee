import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	deleteBoard,
	addCard,
	renameBoard,
	moveCardToBoard,
	moveBoard,
} from '../../redux/cardSlice';
import Card from '../Card/Card';
import s from './Board.module.scss';

function Board({ board }) {
	const { id, name, cards } = board;
	const [isAdding, setAdding] = useState(false);
	const [isRenaming, setRenaming] = useState(false);

	const textRef = useRef();
	const renameInput = useRef();

	const dispatch = useDispatch();

	const handleDeleteBoard = () => {
		dispatch(deleteBoard(id));
	};

	const handleAddCard = () => {
		const text = textRef.current.value.trim();

		if (!text) return;

		const boardId = id;
		dispatch(addCard({ boardId, text }));
		setAdding(false);
	};

	const startRenaming = () => {
		setRenaming(true);

		//TODO: fix focus on opening
		renameInput.current?.focus();
	};

	const handleRenameBoard = () => {
		const newName = renameInput.current.value.trim();
		if (!newName) return;

		const boardId = id;
		dispatch(renameBoard({ boardId, newName }));
		setRenaming(false);
	};

	const allowDrop = (e) => {
		e.preventDefault();
	};

	const handleOnDrop = (e) => {
		// e.stopPropagation();

		const boardInfo = e.dataTransfer.getData('boardInfo');
		const cardInfo = e.dataTransfer.getData('cardInfo');

		if (cardInfo) {
			const { fromBoardId, movingCard } = JSON.parse(cardInfo);
			const toBoardId = id;
			dispatch(moveCardToBoard({ fromBoardId, toBoardId, movingCard }));
			return;
		}

		if (boardInfo) {
			const movingBoard = JSON.parse(boardInfo);
			const toBoardId = id;
			dispatch(moveBoard({ toBoardId, movingBoard }));
		}
	};

	const handleDragBoardStart = (e) => {
		const movingBoard = JSON.stringify(board);
		e.dataTransfer.setData('boardInfo', movingBoard);
	};

	return (
		<div
			className={s.board}
			draggable
			onDragOver={allowDrop}
			onDragStart={handleDragBoardStart}
			onDrop={handleOnDrop}>
			{isRenaming ? (
				<div className={s.rename}>
					<input
						type='text'
						ref={renameInput}
						placeholder='new name...'
						defaultValue={name}
						onBlur={handleRenameBoard}
					/>
					<p onClick={handleRenameBoard}>ok</p>
				</div>
			) : (
				<div className={s.title} onDoubleClick={startRenaming}>
					{name}
				</div>
			)}

			<div className={s.del} onClick={handleDeleteBoard}>
				×
			</div>

			<div className={s.cards}>
				{cards.map((c) => (
					<Card card={c} key={c.id} boardId={id} />
				))}
			</div>

			<form className={s.form}>
				{isAdding ? (
					<>
						<textarea ref={textRef} placeholder='input something...'></textarea>
						<p className={s.add} onClick={handleAddCard}>
							Add
						</p>
						<p className={s.cancel} onClick={() => setAdding(false)}>
							Cancel
						</p>
					</>
				) : (
					<p className={s.add} onClick={() => setAdding(true)}>
						Add task
					</p>
				)}
			</form>
		</div>
	);
}

export default Board;
