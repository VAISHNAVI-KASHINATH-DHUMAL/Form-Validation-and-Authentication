import React from 'react';
import './Register.css';
import { signUpSchema } from '../schemas/index';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

//Assign initial Values for validation
const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
};

function Register() {
    //used useNavigate() hook for navigation
    const navigate = useNavigate();

    //Validation using formik npm package
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        validateOnChange: true,
        validateOnBlur: false,

        //Function for validation (formik and yup) and authentication (firebase)
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();

            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    console.log("User created:", userCredential.user.values);
                    navigate('/home');
                })
                .catch((error) => {
                    console.error("Error during sign-up:", error.message);
                });
        },
    });
    console.log(errors);

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Registration</h1>
                    <div className="input-block">
                        <label htmlFor="name" className="input-label">
                            Name
                        </label>
                        <input
                            type="name"
                            autoComplete="off"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.name && touched.name ? (
                        <p className='form-error'>{errors.name}</p>
                    ) : null}
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
                    <div className="input-block">
                        <label htmlFor="confirm_password" className="input-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            autoComplete="off"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="Confirm Password"
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {errors.confirm_password && touched.confirm_password ? (
                        <p className='form-error'>{errors.confirm_password}</p>
                    ) : null}
                    <div className="modal-buttons">
                        <button className="input-button" type="submit">
                            Registration
                        </button>
                        <div>Already have an account <Link to="/login">Login</Link></div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
