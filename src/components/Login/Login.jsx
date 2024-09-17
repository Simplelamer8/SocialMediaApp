import React, { useState } from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import loginFormSchema from "../FormValidation/LoginFormSchema";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";

const Login = ({isAuth, login}) => {
    const [error, setError] = useState(false);
    if (isAuth === true)
    {
        return <Navigate to="/" />
    }
    return(
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{email: "", password: "", rememberMe: false}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    const res = login(values.email, values.password, values.rememberMe, setError);
                    console.log(values)
                }}
                validationSchema={loginFormSchema}>
                {() => (
                    <Form>
                        <div>
                            <Field type={'text'} name={'email'} placeholder={'e-mail'}/>
                        </div>
                        <ErrorMessage name="email" component="div"/>

                        <div>
                            <Field type={'password'} name={'password'} placeholder={'password'}/>
                        </div>
                        <ErrorMessage name="password" component="div"/>

                        <div>
                            <Field type={'checkbox'} name={'rememberMe'}/>
                            <label htmlFor={'rememberMe'}> remember me </label>
                        </div>

                        <button type={'submit'}>Log in</button>
                    </Form>
                )}
            </Formik>
            {error && <div style={{border: 'red 1px solid', color: 'red'}}>Your login or password is incorrect, or even there are issues related to captcha</div>}
        </div>
    )
};

const mapStateToProps = (store) => {
    return {isAuth: store.auth.isAuth};
}

export default connect(mapStateToProps, {login})(Login);