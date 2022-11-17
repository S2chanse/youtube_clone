import React, { useState } from 'react';

import { AiFillLock, AiOutlineUser } from 'react-icons/ai';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_SERVER } from '../../Config.js';
import { loginUser } from '../../_reducers/userSlice';
import axios from 'axios';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);
  const naviagte = useNavigate();
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        let dataToSubmit = {
          email: values.email,
          password: values.password,
        };

        const response = await axios.post(`${USER_SERVER}/login`, dataToSubmit);

        if (!response.data.loginSuccess) {
          setFormErrorMessage('Config Your Id and Password');
          return;
        }
        const response2 = await axios.get(`${USER_SERVER}/auth`);
        dispatch(loginUser(response2.data));
        window.localStorage.setItem('userId', response2.data._id);
        naviagte('/');
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className='app'>
            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>
              <Form.Item required>
                <Input
                  id='email'
                  prefix={
                    <AiOutlineUser style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='Enter your email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className='input-feedback'>{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id='password'
                  prefix={<AiFillLock style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Enter your password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className='input-feedback'>{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label>
                  <p
                    style={{
                      color: '#ff0000bf',
                      fontSize: '0.7rem',
                      border: '1px solid',
                      padding: '1rem',
                      borderRadius: '10px',
                    }}
                  >
                    {formErrorMessage}
                  </p>
                </label>
              )}

              <Form.Item>
                <Checkbox
                  id='rememberMe'
                  onChange={handleRememberMe}
                  checked={rememberMe}
                >
                  Remember me
                </Checkbox>
                <a
                  className='login-form-forgot'
                  href='/reset_user'
                  style={{ float: 'right' }}
                >
                  forgot password
                </a>
                <div>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                    style={{ minWidth: '100%' }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    Log in
                  </Button>
                </div>
                Or <Link to='/register'>register now!</Link>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default LoginPage;
