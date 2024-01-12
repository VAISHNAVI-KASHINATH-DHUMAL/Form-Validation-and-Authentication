import React from 'react';
import './ForgotPass.css';
import { forgotPassScheme } from '../schemas/index';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const initialValues = {
    email: "",
};

function ForgotPass() {
    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: forgotPassScheme,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: (values) => {

            sendPasswordResetEmail(auth, values.email)
                .then((data) => {
                    alert("Check your gmail");
                    navigate('/login');
                })
                .catch((error) => {
                    console.log(error.message);
                    alert("Invalid email");
                });
        },
    });

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    <div className="input-block">
                        <label htmlFor="email" className="input-label">
                            Email
                        </label>
                        <input
                            type="email"
                            autoComplete="off"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Email"
                        />
                    </div>
                    {errors.email && touched.email ? (
                        <p className='form-error'>{errors.email}</p>
                    ) : null}
                    <div className="modal-buttons">
                        <button className="input-button" type="submit">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPass
