import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/authContext';
import useForm from '../../hooks/useForm';

const RegistrationFormKeys = {
    FirstName: 'firstName',
    LastName: 'lastName',
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirmPassword'
}

export default function Registration(){

    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegistrationFormKeys.FirstName]: '',
        [RegistrationFormKeys.LastName]: '',
        [RegistrationFormKeys.Email]:'',
        [RegistrationFormKeys.Password]: '',
        [RegistrationFormKeys.ConfirmPassword]: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};

        if(!values[RegistrationFormKeys.FirstName]){
            errors.firstName = 'First Name is required'
        }

        if(!values[RegistrationFormKeys.LastName]){
            errors.lastName = 'Last Name is required'
        }

        if(!values[RegistrationFormKeys.Email]){
            errors.email = 'Email is required';
        }else if(!/\S+@\S+\.\S+/.test(values[RegistrationFormKeys.Email])){
            errors.email = 'Email address is invalid';
        }

        if(!values[RegistrationFormKeys.Password]){
            errors.password = 'Password is required';
        }else if(values[RegistrationFormKeys.Password].length < 6){
            errors.password = 'Password must be at least 6 characters';
        }

        if(values[RegistrationFormKeys.Password] !== values[RegistrationFormKeys.ConfirmPassword]){
            errors.confirmPassword = "Passwords doesn't match"
        }

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length === 0){
            onSubmit(e);
            console.log('Form data submitted:', values);
        }else{
            setErrors(validationErrors);
        }
    }


    return(
        <>
            <div className='form-wrapper'>
            <h1>Registration</h1>
            <Form className='form-container' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" className='input' name='firstName' placeholder="Enter First Name" values={values[RegistrationFormKeys.FirstName]} onChange={onChange} isInvalid={!!errors.firstName} />
                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" className='input' name='lastName' placeholder="Enter Last Name" values={values[RegistrationFormKeys.LastName]} onChange={onChange} isInvalid={!!errors.lastName}/>
                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>     
                    <Form.Control type="email" className='input' name='email' placeholder="Enter email" values={values[RegistrationFormKeys.Email]} onChange={onChange} isInvalid={!!errors.email}/>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className='input' name='password' placeholder="Password" values={values[RegistrationFormKeys.Password]} onChange={onChange} isInvalid={!!errors.password}/>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" className='input' name='confirmPassword' placeholder="Confirm Password" values={values[RegistrationFormKeys.ConfirmPassword]} onChange={onChange} isInvalid={!!errors.confirmPassword}/>
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Submit
                </Button>

            </Form>
        </div>
        </>
    )
}