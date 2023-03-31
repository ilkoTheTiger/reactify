import { useContext } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";

import { FormKeys } from "../../utils/formKeys";

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        [FormKeys.Email]: '',
        [FormKeys.Password]: '',
        [FormKeys.ConfirmPassword]: '',
    }, onRegisterSubmit);

    return (
        <section id="register-page" className="content auth">
            <form id="register" method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="maria@email.com"
                        name={FormKeys.Email}
                        value={values[FormKeys.Email]}
                        onChange={changeHandler}
                     />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name={FormKeys.Password}
                        value={values[FormKeys.Password]}
                        onChange={changeHandler}
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name={FormKeys.ConfirmPassword}
                        value={values[FormKeys.ConfirmPassword]}
                        onChange={changeHandler}
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