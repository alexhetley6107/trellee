import { useSelector } from 'react-redux';

import Board from './Board/Board';
import Header from './Header/Header';
import s from './App.module.scss';

function App() {
	const boards = useSelector((state) => state.boards);

	return (
		<div className={s.app}>
			<Header />
			<div className={s.cont}>
				{boards.map((b) => (
					<Board board={b} key={b.id} />
				))}
			</div>
		</div>
	);
}

export default App;
