import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import useForm from '../../hooks/useForm';

const RegistrationFormKeys = {
    FirstName: 'firstName',
    LastName: 'lastName',
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password'
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

    return(
        <>
            <div className='form-wrapper'>
            <h1>Registration</h1>
            <Form className='form-container' onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" className='input' name='firstName' placeholder="Enter First Name" values={values[RegistrationFormKeys.FirstName]} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" className='input' name='lastName' placeholder="Enter Last Name" values={values[RegistrationFormKeys.LastName]} onChange={onChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>     
                    <Form.Control type="email" className='input' name='email' placeholder="Enter email" values={values[RegistrationFormKeys.Email]} onChange={onChange}/>
                    <Form.Text className="text">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className='input' name='password' placeholder="Password" values={values[RegistrationFormKeys.Password]} onChange={onChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" className='input' name='confirmPassword' placeholder="Confirm Password" values={values[RegistrationFormKeys.ConfirmPassword]} onChange={onChange} />
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Submit
                </Button>

            </Form>
        </div>
        </>
    )
}