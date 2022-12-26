import React, { useRef, useState, useEffect } from 'react';
import './SignUp.css';
import { Button, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import necklace from '../../images/necklace.jpeg';
import necklace2 from '../../images/necklace2.jpg';

// experission must begin and end with a letter and numbers allowed in between.

const userRegEx = /^[a-zA-Z][a-zA-Z0-9]{3,13}\D$/i;

// Email regex experission

const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// password regex experission

const pwRegEx = /[a-zA-Z0-9/*+-=_)(*&^%$#@!~"?><:;'/.,`|{}]{8}$/;

export default function SignUp() {
	const userRef = useRef();
	const emailref = useRef();
	const pwdref = useRef();
	const confirmPwdref = useRef();

	const [userName, setUserName] = useState('');
	const [validName, setValidName] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);

	const [confirmPwd, setConfirmPwd] = useState('');
	const [validConfirmPwd, setValidConfirmPwd] = useState(false);

	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [logEmail, setLogEmail] = useState('');

	// set the focus on the userName input on loading the page
	useEffect(() => {
		userRef.current.focus();
	}, []);

	// userName validation
	useEffect(() => {
		const result = userRegEx.test(userName);
		setValidName(result);
	}, [userName]);

	// Email validation
	useEffect(() => {
		const resultEmail = emailRegEx.test(email);
		setValidEmail(resultEmail);
	}, [email]);

	// password validation and matching
	useEffect(() => {
		const resultPwd = pwRegEx.test(pwd);
		setValidPwd(resultPwd);
		const matching = pwd === confirmPwd;
		setValidConfirmPwd(matching);
	}, [pwd, confirmPwd]);

	// clear the error msg when user modify wrong input fields
	useEffect(() => {
		setError('');
	}, [userName, email, pwd, confirmPwd]);

	// the data object
	const data = { User: userName, Email: email, Password: pwd, ConfirmPassword: confirmPwd };

	// submiting form handler
	async function handleSubmit(e) {
		e.preventDefault();
		// if submit button enabled and input fields have invalid data
		const v1 = userRegEx.test(userName);
		const v2 = emailRegEx.test(email);
		const v3 = pwRegEx.test(pwd);
		if (!v1 || !v2 || !v3) {
			setError('Invalid data please follow the instructions.');
			return;
		}
		await fetch('https://httpbin.org/post', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then(function (response) {
				if (response.ok) {
					console.log(response);
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
				setSuccess(true);
			})
			.catch(function () {
				setError('Something went wrong, Check your connection and try again.');
			});
		localStorage.setItem('data', JSON.stringify(data));

		setLogEmail(JSON.parse(localStorage.data));
	}

	return (
		<>
			{success === true ? (
				<div className='signup'>
					<div className='img'>
						<img src={necklace2} alt={necklace} />
					</div>
					<div className='register'>
						<h2 className='mb-4 mt-2'>Signed Up Successfully</h2>
						<h4>Welcome</h4>
						<span>{logEmail.Email}</span>
					</div>
				</div>
			) : (
				<div className='signup'>
					<div className='img'>
						<img src={necklace} alt='necklace' />
					</div>
					<div className='register'>
						<h3 className='mb-4 mt-2'>Create Account</h3>
						<h5>Go ahead and sign up, let everyon know how awesome you are. </h5>
						<Alert variant='danger' className={error ? 'text-center p-3' : 'd-none'}>
							{error}
						</Alert>
						<Alert className={success ? 'text-center p-2 mt-3' : 'd-none'}>{success}</Alert>
						<Form onSubmit={handleSubmit} className='w-100 p-2'>
							{/* UserName input */}

							<Form.Group className='mb-3'>
								<Form.Label>
									<span className={validName ? 'check' : 'no-check'}>
										valid <FontAwesomeIcon icon={faCheck} />
									</span>
									<span className={validName || !userName ? 'no-wrong' : 'wrong'}>
										invalid <FontAwesomeIcon icon={faTimes} />
									</span>
								</Form.Label>
								<Form.Control
									type='text'
									required
									autoComplete='off'
									onChange={(e) => {
										setUserName(e.target.value);
									}}
									ref={userRef}
									placeholder='User Name'
								/>
								<Alert className={userName && !validName ? 'mt-2' : 'd-none '}>
									<FontAwesomeIcon icon={faInfoCircle} />

									<div className='info'>
										- 5 to 15 characters.
										<br />
										- Must begin and end with a letter.
										<br />- only letters and numbers are allowed.
									</div>
								</Alert>
							</Form.Group>

							{/* Email input */}

							<Form.Group className='mb-3'>
								<Form.Label>
									<span className={validEmail ? 'check' : 'no-check'}>
										valid <FontAwesomeIcon icon={faCheck} />
									</span>
									<span className={validEmail || !email ? 'no-wrong' : 'wrong'}>
										invalid <FontAwesomeIcon icon={faTimes} />
									</span>
								</Form.Label>
								<FontAwesomeIcon />
								<Form.Control
									type='email'
									required
									autoComplete='off'
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									ref={emailref}
									placeholder='Email address'
								/>
								<Alert className={email && !validEmail ? 'mt-2' : 'd-none '}>
									<FontAwesomeIcon icon={faInfoCircle} />

									<div className='info'> Must be a valid email.</div>
								</Alert>
							</Form.Group>

							{/* password input */}

							<Form.Group className='mb-3'>
								<Form.Label>
									<span className={validPwd ? 'check' : 'no-check'}>
										valid <FontAwesomeIcon icon={faCheck} />
									</span>
									<span className={validPwd || !pwd ? 'no-wrong' : 'wrong'}>
										invalid <FontAwesomeIcon icon={faTimes} />
									</span>
								</Form.Label>
								<Form.Control
									type='password'
									onChange={(e) => {
										setPwd(e.target.value);
									}}
									required
									ref={pwdref}
									placeholder='password'
								/>

								<Alert className={pwd && !validPwd ? 'mt-2' : 'd-none '}>
									<FontAwesomeIcon icon={faInfoCircle} />

									<div className='info'> Must be 8 characters or more.</div>
								</Alert>
							</Form.Group>

							{/* Confirm password input */}

							<Form.Group className='mb-3'>
								<Form.Label>
									<span className={validConfirmPwd && confirmPwd ? 'check' : 'no-check'}>
										matched <FontAwesomeIcon icon={faCheck} />
									</span>
									<span className={validConfirmPwd || !confirmPwd ? 'no-wrong' : 'wrong'}>
										unmatched <FontAwesomeIcon icon={faTimes} />
									</span>
								</Form.Label>
								<Form.Control
									type='password'
									onChange={(e) => {
										setConfirmPwd(e.target.value);
									}}
									required
									ref={confirmPwdref}
									placeholder='Confirm Password'
								/>
								<Alert className={confirmPwd && !validConfirmPwd ? 'mt-2' : 'd-none '}>
									<FontAwesomeIcon icon={faInfoCircle} />

									<div className='info'> Must match the password field.</div>
								</Alert>
							</Form.Group>

							{/* submit button */}

							<Button
								className='w-100'
								type='submit'
								disabled={
									!validName || !validEmail || !validPwd || !validConfirmPwd ? true : false
								}>
								Create Account
							</Button>
						</Form>
					</div>
				</div>
			)}
		</>
	);
}
