import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react';
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
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};

        if(!values[LoginFormKeys.Email]){
            errors.email = 'Email is required';
        }else if(!/\S+@\S+\.\S+/.test(values[LoginFormKeys.Email])){
            errors.email = 'Email address is invalid';
        }

        if(!values[LoginFormKeys.Password]){
            errors.password = 'Password is required';
        }else if(values[LoginFormKeys.Password].length < 6){
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length === 0){
            onSubmit(e);
        }else{
            setErrors(validationErrors);
        }
    }

    return (
        <div className='form-wrapper'>
            <h1>Login</h1>
            <Form className='form-container' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name={LoginFormKeys.Email} className='input' placeholder="Enter email" value={values[LoginFormKeys.Email]} onChange={onChange} isInvalid={!!errors.email}/>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name={LoginFormKeys.Password} className='input' placeholder="Password" value={values[LoginFormKeys.Password]} onChange={onChange} isInvalid={!!errors.password}/>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Submit
                </Button>
            </Form>
        </div>

    )
}