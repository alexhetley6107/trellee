import React from 'react';
import { useDispatch } from 'react-redux';
import { newBoard } from '../../redux/cardSlice';
import s from './Header.module.scss';

function Header() {
	const dispatch = useDispatch();

	const handleAddBoard = () => {
		dispatch(newBoard());
	};

	return (
		<header className={s.header}>
			<p className={s.title}>Trellee</p>
			<p className={s.add_btn} onClick={handleAddBoard}>
				Add Board
			</p>
		</header>
	);
}

export default Header;
