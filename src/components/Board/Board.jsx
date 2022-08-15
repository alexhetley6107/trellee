import React, { useState } from 'react';
import Card from '../Card/Card';
import s from './Board.module.scss';

function Board() {
	const [isAdding, setAdding] = useState(false);

	return (
		<div className={s.board}>
			<div className={s.title}>Board Name</div>
			<div className={s.cards}>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
			<form className={s.form}>
				{isAdding ? (
					<>
						<textarea name=''></textarea>
						<p className={s.add} onClick={() => setAdding(false)}>
							Add
						</p>
						<p className={s.cancel} onClick={() => setAdding(false)}>
							Cancel
						</p>
					</>
				) : (
					<p className={s.add} onClick={() => setAdding(true)}>
						Add Card
					</p>
				)}
			</form>
		</div>
	);
}

export default Board;
