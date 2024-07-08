import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
    return (
        <div className='form-wrapper'>
            <h1>Login</h1>
            <Form className='form-container'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" className='input' placeholder="Enter email" />
                    <Form.Text className="text">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className='input' placeholder="Password" />
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Submit
                </Button>
            </Form>
        </div>

    )
}