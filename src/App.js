import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetStarted from './components/GetStarted/GetStarted';
import SignUp from './components/SignUp/SignUp';
import { Container } from 'react-bootstrap';

function App() {
	return (
		<BrowserRouter>
			<Container
				style={{ minHeight: '100vh' }}
				className='d-flex justify-content-center align-items-center'>
				<Routes>
					<Route path='/' element={<GetStarted />} />
					<Route path='/SignUp' element={<SignUp />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
