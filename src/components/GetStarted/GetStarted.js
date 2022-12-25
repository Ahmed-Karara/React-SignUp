import React from 'react';
import './GetStarted.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import necklace3 from '../../images/necklace3.jpg';

export default function GetStarted() {
	return (
		<div className='getstarted'>
			<div className='imgss'>
				<img src={necklace3} alt='necklace' />
			</div>
			<div className='welcome'>
				<h1 className='mb-4 mt-2'>Welcome </h1>
				<h5>We're glad you're here! Sign up to start. </h5>

				<Link to='/SignUp'>
					<Button className='w-100 mt-4'> Get Started</Button>
				</Link>
			</div>
		</div>
	);
}
