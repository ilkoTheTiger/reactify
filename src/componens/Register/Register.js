import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

import styles from './Register.module.css';
import { FormKeys } from "../../utils/formKeys";

import { checkForErrors, hasEmptyProperty } from '../../utils/validators';

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    document.title = 'MetniMe - Register'
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

        if (target === 'email' && (value.length < 3 || value.length > 26)) {
            errors.email = 'Email must be between 3 and 26 characters!';
        } else if (target === 'email' && !(/^[A-Za-z0-9_.]+@[A-Za-z]+.[A-Za-z]{2,3}$/.test(value))) {
            errors.email = 'Enter a valid Email address!';
        } else if (target === 'email' && !(value.length < 3 || value.length > 26)) {
            errors.email = ''
        }

        if (target === 'password' && (value.length < 3 || value.length > 26)) {
            errors.password = 'Password must be between 3 and 26 letters!';
        } else if (target === 'password' && !(value.length < 3 || value.length > 26)) {
            errors.password = ''
        }

        if (target === 'confirmPassword' && (value.length < 3 || value.length > 26)) {
            errors.confirmPassword = 'Confirm Password must be between 3 and 26 letters!';
        } else if (target === 'confirmPassword' && value !== values.password) {
            errors.confirmPassword = 'Confirm Password must match your Password!';
        } else if (target === 'confirmPassword' && value === values.password && !(value.length < 3 || value.length > 26)) {
            errors.confirmPassword = ''
        }

        setFormErrors(errors);
    };

    return (
        <section id="register-page" className={styles.registerContainer}>
            <h2>Register</h2>
            <form className={styles.register} method="POST" onSubmit={onSubmit}>
                <div className={styles.formRow}>
                    <label htmlFor={[FormKeys.Email]}>Email:</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.email ? { borderColor: 'red' } : (values.email.length > 2 && /^[A-Za-z0-9_.]+@[A-Za-z]+.[A-Za-z]{2,3}$/.test(values.email)) ? { borderColor: 'green' } : {}}><i className='fa-solid fa-at'></i></span>
                        <input
                            type={[FormKeys.Email]}
                            id={[FormKeys.Email]}
                            placeholder="Enter your email.."
                            name={FormKeys.Email}
                            value={values[FormKeys.Email]}
                            onChange={changeHandler}
                            onBlur={formValidate}
                            style={formErrors.email ? { borderColor: 'red' } : (values.email.length > 2 && /^[A-Za-z0-9_.]+@[A-Za-z]+.[A-Za-z]{2,3}$/.test(values.email)) ? { borderColor: 'green' } : {}}
                        />
                    </div>
                    {formErrors.email &&
                        <p className={styles.formError}>
                            {formErrors.email}
                        </p>
                    }
                </div>

                <div className={styles.formRow}>
                    <label htmlFor={[FormKeys.Password]}>Password:</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.password ? { borderColor: 'red' } : (values.password.length > 2 && values.password.length < 27) ? { borderColor: 'green' } : {}}><i className='fa-solid fa-lock '></i></span>

                        <input
                            type={[FormKeys.Password]}
                            id="register-password"
                            placeholder="Enter your password.."
                            name={FormKeys.Password}
                            value={values[FormKeys.Password]}
                            onChange={changeHandler}
                            onBlur={formValidate}
                            style={formErrors.password ? { borderColor: 'red' } : (values.password.length > 2 && values.password.length < 27) ? { borderColor: 'green' } : {}}

                        />
                    </div>
                    {formErrors.password &&
                        <p className={styles.formError}>
                            {formErrors.password}
                        </p>
                    }
                </div>

                <div className={styles.formRow}>
                    <label htmlFor={[FormKeys.ConfirmPassword]}>Confirm Password:</label>
                    <div className={styles.formInput}>
                        <span style={formErrors.confirmPassword ? { borderColor: 'red' } : (values.confirmPassword.length > 2 && values.confirmPassword.length < 27) ? { borderColor: 'green' } : {}}><i className='fa-solid fa-unlock '></i></span>

                        <input
                            type={[FormKeys.Password]}
                            id="register-confirm-password"
                            placeholder="Repeat your password.."
                            name={FormKeys.ConfirmPassword}
                            value={values[FormKeys.ConfirmPassword]}
                            onChange={changeHandler}
                            onBlur={formValidate}
                            style={formErrors.confirmPassword ? { borderColor: 'red' } : (values.confirmPassword.length > 2 && values.confirmPassword.length < 27) ? { borderColor: 'green' } : {}}

                        />
                    </div>
                    {formErrors.confirmPassword &&
                        <p className={styles.formError}>
                            {formErrors.confirmPassword}
                        </p>
                    }
                </div>

                <div >
                    <input className={styles.inputSubmit} type='submit' style={checkForErrors(formErrors) ? { border: '3px solid red' } : hasEmptyProperty(values) ? {} : { border: '2px solid green' }} disabled={checkForErrors(formErrors)} value='Register' />
                </div>
                <div>
                    <p>
                        <span>If you already have an account <Link className={styles.link} to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section >
    );
};