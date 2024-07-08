import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

export default function Registration(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== rePassword){
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });
            const data = await response.json();
            if(response.ok){
                setMessage(data.message);
            }else{
                setMessage(data.message || 'Error occurred');
            }
        } catch (error) {
            setMessage('Error occurred')
        }
    }
    return(
        <>
            <div className='form-wrapper'>
            <h1>Registration</h1>
            <Form className='form-container' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" className='input' placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" className='input' placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" className='input' placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className='input' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Repeat the Password</Form.Label>
                    <Form.Control type="password" className='input' placeholder="Repeat the Password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Submit
                </Button>

                {message && <p>{message}</p>}
            </Form>
        </div>
        </>
    )
}