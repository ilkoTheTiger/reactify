import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

import styles from './Register.module.css';
import { FormKeys } from "../../utils/formKeys";

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        [FormKeys.Email]: '',
        [FormKeys.Password]: '',
        [FormKeys.ConfirmPassword]: '',
    }, onRegisterSubmit);

    const [formErrors, setFormErrors] = useState({
        [FormKeys.Email]: '',
        [FormKeys.Password]: '',
        [FormKeys.ConfirmPassword]: '',
    });

    const formValidate = (e) => {
        const value = e.target.value;
        const target = e.target.name;
        const errors = { ...formErrors }

        if (target === [FormKeys.Email] && (value.length < 3 || value.length > 26)) {
            errors.email = 'Email must be between 3 and 26 letters!';
        } else if (target === [FormKeys.Email] && (/^[A-Za-z0-9_.]+@[A-Za-z]+.[A-Za-z]{2,3}$/.test(value))) {
            errors.email = 'Enter a valid Email address!';
        } else if (target === [FormKeys.Email] && !(value.length < 3 || value.length > 26)) {
            errors.email = ''
        }

        setFormErrors(errors);
    };

    return (
        <section id="register-page" className={styles.registerContainer}>
            <h2>Register</h2>
            <form id="register" method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email.."
                        name={FormKeys.Email}
                        value={values[FormKeys.Email]}
                        onChange={changeHandler}
                        onBlur={formValidate}
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        id="register-password"
                        placeholder="Enter your password.."
                        name={FormKeys.Password}
                        value={values[FormKeys.Password]}
                        onChange={changeHandler}
                        onBlur={formValidate}
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Repeat your password.."
                        name={FormKeys.ConfirmPassword}
                        value={values[FormKeys.ConfirmPassword]}
                        onChange={changeHandler}
                        onBlur={formValidate}
                    />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};