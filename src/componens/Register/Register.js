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

        if (target === 'email' && (value.length < 3 || value.length > 26)) {
            errors.email = 'Email must be between 3 and 26 characters!';
        } else if (target === 'email' && !(/^[A-Za-z0-9_.]+@[A-Za-z]+.[A-Za-z]{2,3}$/.test(value))) {
            errors.email = 'Enter a valid Email address!';
        } else if (target === 'email' && !(value.length < 3 || value.length > 26)) {
            errors.email = ''
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
                        <span style={formErrors.password ? { borderColor: 'red' } : (values.password.length > 2 && values.password.length < 26) ? { borderColor: 'green' } : {}}><i className='fa-solid fa-lock '></i></span>

                        <input
                            type={[FormKeys.Password]}
                            id="register-password"
                            placeholder="Enter your password.."
                            name={FormKeys.Password}
                            value={values[FormKeys.Password]}
                            onChange={changeHandler}
                            onBlur={formValidate}
                            style={formErrors.password ? { borderColor: 'red' } : (values.password.length > 2 && values.password.length < 26) ? { borderColor: 'green' } : {}}

                        />
                    </div>
                    {formErrors.password &&
                        <p className={styles.formError}>
                            {formErrors.password}
                        </p>
                    }
                </div>

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
                <div>
                    <p className="field">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section >
    );
};