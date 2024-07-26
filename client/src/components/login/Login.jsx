import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext } from 'react';
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
}

export default function Login() {

    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: ''
    });
    return (
        <div className='form-wrapper'>
            <h1>Login</h1>
            <Form className='form-container' onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name={LoginFormKeys.Email} className='input' placeholder="Enter email" value={values[LoginFormKeys.Email]} onChange={onChange} />
                    <Form.Text className="text">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name={LoginFormKeys.Password} className='input' placeholder="Password" value={values[LoginFormKeys.Password]} onChange={onChange} />
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Submit
                </Button>
            </Form>
        </div>

    )
}