import { useState } from 'react'
// import { B, Container, TextField } from '@mui/material';
// import { Formik, Field } from 'formik'
// import * as yup from 'yup'

function Auth({ setUser }) {
    // const [signup, setSignup] = useState(true)

//     const signupSchema = yup.object().shape({
//         username: yup.string().min(5, 'Username too Short!').max(15, 'Username too Long!'),
//         password: yup.string().min(5, 'Password too Short!').max(15, 'Password too Long!'),
//         passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
//     })
//     const loginSchema = yup.object().shape({
//         username: yup.string().required('username required'),
//         password: yup.string().required('password required')
//     })

  
//     function toggleSignup() {
//         setSignup((currentSignup) => !currentSignup)
//     }
//     const initialValues = {
//         username: '',
//         password: '',
//         passwordConfirmation: ''
//     }
//     const handleSubmit = (values) => {
//         const endpoint = signup ? '/users' : '/login'
//         fetch(endpoint, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify(values)
//         }).then((resp) => {
//             if (resp.ok) {
//                 resp.json().then((user) => {
//                     setUser(user)
//                 })
//             } else { 

//                 console.log('errors? handle them')
//             }
//         })
//     }

//     return (
//         <Container maxWidth='sm'>
       
//             <button onClick={toggleSignup}>{signup ? 'Login instead!' : 'Register for an account'}</button>
//             <Formik
//                 initialValues={initialValues}
//                 onSubmit={handleSubmit}
//                 validationSchema={signup ? signupSchema : loginSchema}
//             >
//                {(props) => {
//                 console.log(props)
//                 return (
//                 <form className='form' onSubmit={props.handleSubmit}>
                
//                     <Field name='username' placeholder='Username'/>
//                     {props.errors.username && props.touched.username ? (
//                         <div>{props.errors.username}</div>
//                     ) : null}
//                     <label htmlFor='password'>Password:</label>
//                     <input 
//                         id='password' 
//                         name='password' 
//                         type='password' 
//                         placeholder='Password' 
//                         value={props.values.password}
//                         onChange={props.handleChange}
//                     />

//                         {signup && <>
//                             <label htmlFor='phase'>Phase:</label>
//                             <input 
//                                 id="passwordConfirmation" 
//                                 name="passwordConfirmation"
//                                 type='password' 
//                                 placeholder="Password Confirmation" 
//                                 value={props.values.passwordConfirmation}
//                                 onChange={props.handleChange}
//                             />
//                         </>}
//                         <button type="submit">Submit</button>
//                 </form>
//                )}
//             }
//             </Formik>
//         </Container>
//     )
}

export default Auth;