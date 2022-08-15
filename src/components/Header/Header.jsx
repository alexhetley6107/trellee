import React from 'react';
import s from './Header.module.scss';

function Header() {
	return (
		<header className={s.header}>
			<p className={s.title}>Trellee</p>
			<p className={s.add_btn}>Add Board</p>
		</header>
	);
}

export default Header;
