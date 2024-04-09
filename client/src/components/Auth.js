import React, { useState } from 'react';
import { Container, TextField } from '@mui/material';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';


function Auth({ setUser }) {
    const [signup, setSignup] = useState(true);
    const navigate = useNavigate();

    const signupSchema = yup.object().shape({
        username: yup.string().min(5, 'Username too Short!').max(15, 'Username too Long!'),
        password: yup.string().min(5, 'Password too Short!').max(15, 'Password too Long!'),
        passwordConfirmation: yup.string().when('signup', {
            is: true,
            then: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
            otherwise: yup.string().notRequired()
        })
    });
    
    const loginSchema = yup.object().shape({
        username: yup.string().required('Username required'),
        password: yup.string().required('Password required')
    });

    function toggleSignup() {
        setSignup((currentSignup) => !currentSignup);
    }

    const initialValues = {
        username: '',
        password: '',
        passwordConfirmation: ''
    };

    const handleSubmit = (values) => {
        const endpoint = signup ? '/users' : '/login';
        fetch(endpoint, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(values)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    setUser(user);
                    navigate('/app'); // Example navigation after successful authentication
                });
            } else { 
                console.log('errors? handle them');
            }
        });
    };

    return (
        <Container maxWidth='sm'>
            <button onClick={toggleSignup}>{signup ? 'Login instead!' : 'Register for an account'}</button>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={signup ? signupSchema : loginSchema}
            >
                {(props) => (
                    <form className='form' onSubmit={props.handleSubmit}>
                        <Field name='username' placeholder='Username' component={TextField} />
                        {props.errors.username && props.touched.username && <div>{props.errors.username}</div>}
                        <Field name='password' type='password' placeholder='Password' component={TextField} />
                        {signup && (
                            <Field name='passwordConfirmation' type='password' placeholder='Password Confirmation' component={TextField} />
                        )}
                        <button type="submit">{signup ? 'Register' : 'Login'}</button>
                    </form>
                )}
            </Formik>
        </Container>
    );
}

export default Auth;