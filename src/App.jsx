import Board from './components/Board/Board';
import Header from './components/Header/Header';

function App() {
	return (
		<div className='app'>
			<Header />
			<div className='cont'>
				<Board />
				<Board />
				<Board />
				<Board />
				<Board />
				<Board />
			</div>
		</div>
	);
}

export default App;
