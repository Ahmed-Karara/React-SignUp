import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import GetStarted from './components/GetStarted/GetStarted';
import SignUp from './components/SignUp/SignUp';
import { Container } from 'react-bootstrap';

function App() {
	return (
		<Container
			style={{ minHeight: '100vh' }}
			className='d-flex justify-content-center align-items-center'>
			<Routes>
				<Route path='/*' element={<GetStarted />} />
				<Route path='/SignUp' element={<SignUp />} />
			</Routes>
		</Container>
	);
}

export default App;
