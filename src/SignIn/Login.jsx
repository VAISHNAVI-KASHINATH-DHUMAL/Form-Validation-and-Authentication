import React from 'react';
import './Login.css';
import { loginScheme } from '../schemas/index';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const initialValues = {
    email: "",
    password: "",
};

function Login() {

    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: loginScheme,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();

            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    console.log(userCredential.user.values);
                    navigate('/home');
                })
                .catch((error) => {
                    console.log(error.message);
                    alert("Invalid email and password");
                });
        },
    });
    console.log(errors);

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="input-block">
                        <label htmlFor="email" className="input-label">
                            Email
                        </label>
                        <input
                            type="email"
                            autoComplete="off"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.email && touched.email ? (
                        <p className='form-error'>{errors.email}</p>
                    ) : null}
                    <div className="input-block">
                        <label htmlFor="password" className="input-label">
                            Password
                        </label>
                        <input
                            type="password"
                            autoComplete="off"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.password && touched.password ? (
                        <p className='form-error'>{errors.password}</p>
                    ) : null}
                    <div className="modal-buttons">
                        <button className="input-button" type="submit">
                            Login
                        </button>
                        <div>Create a new Account</div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
