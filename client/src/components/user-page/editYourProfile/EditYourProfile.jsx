import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/authContext';
import useForm from '../../../hooks/useForm';
import { useParams } from 'react-router-dom';
import * as authService from '../../../services/authService';

export default function EditYourProfile({
    show,
    handleClose,
}){

    const { userId, updateAuthContext } = useContext(AuthContext);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await authService.getUserById(userId);
                setUser({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    email: userData.email || '',
                    password: '',
                    confirmPassword: ''
                })
                console.log('userData:',userData)
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        }
        if(userId){
            fetchUserData();
        }
    }, [userId])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const validate = (user) => {
        const errors = {};
        if(!user.firstName.trim()) errors.firstName = 'First Name is required';
        if(!user.lastName.trim()) errors.lastName = 'Last Name is required';
        if(!user.email.trim()){
            errors.email = 'Email is required';
        }else if(!/\S+@\S+\.\S+/.test(user.email)){
            errors.email = 'Email is invalid';
        }

        if(user.password && user.password.length < 6){
            errors.password = 'Password must be at least 6 characters'
        }

        if(user.password !== user.confirmPassword){
            errors.confirmPassword = "Password don't match";
        }

        return errors;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const validationErrors = validate(user);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {

            await authService.editUser(userId, {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            });

            updateAuthContext({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            })

            alert('Profile updated successfully')
            handleClose()
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile')
        }
    }

    console.log(user);
   
    return(
        <div className='edit-user-wrapper'>
            <h3>Edit Your Profile</h3>

            <Form className='form-container' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" className='input' name='firstName' placeholder="Enter First Name" value={user.firstName} onChange={handleChange} isInvalid={!!errors.firstName} />
                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" className='input' name='lastName' placeholder="Enter Last Name" value={user.lastName} onChange={handleChange} isInvalid={!!errors.lastName}/>
                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>     
                    <Form.Control type="email" className='input' name='email' placeholder="Enter email" value={user.email} onChange={handleChange} isInvalid={!!errors.email}/>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className='input' name='password' placeholder="Password" value={user.password} onChange={handleChange} isInvalid={!!errors.password}/>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" className='input' name='confirmPassword' placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} isInvalid={!!errors.confirmPassword}/>
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Submit
                </Button>

            </Form>
        </div>
    )

}