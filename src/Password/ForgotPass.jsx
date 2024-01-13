//Importing files, package, firebase, hooks
import React from 'react';
import './ForgotPass.css';
import { forgotPassScheme } from '../schemas/index';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

//Assigned initial Value for validation
const initialValues = {
    email: "",
};

function ForgotPass() {
    //used useNavigate() hook for navigation
    const navigate = useNavigate();

    //Validation using formik npm package
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: forgotPassScheme,
        validateOnChange: true,
        validateOnBlur: false,
        
         //Function for validation (formik and yup) and authentication (firebase)
        onSubmit: (values) => {

            sendPasswordResetEmail(auth, values.email)
                .then((data) => {
                    alert("Check your gmail");
                    //Navigate to login page
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
             {/*Reset Password*/}
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>

                    {/*Email*/}
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
