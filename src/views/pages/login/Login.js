import React, { useEffect, useState } from 'react'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'

import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { config } from '../../../config'
import loginImage from '../../../assets/images/login.jpg'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const naviagte = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials) => axios.post(`${config.BASE_URL}/auth/login`, credentials),
    onSuccess: (data) => {
      console.log(data)
      localStorage.setItem('authToken', data.data.data.token)
      toast.success('Login successfully!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        onClose: () => {
          naviagte('/blog/all-blogs')
        },
      })
    },
    onError: (error) => {
      toast.error(error.response.data.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })
    },
  })
  const onSubmit = (data) => {
    mutate(data)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      naviagte('/blog/all-blogs')
    }
  }, [])

  return (
    <CRow
      className="min-vh-100 d-flex"
      style={{
        backgroundColor: '#053C5E',
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <CCol>
        <CRow className="justify-content-center">
          <CCol md={8} className="d-flex justify-content-center">
            <CCardGroup className="shadow-lg" style={{ width: '535px', height: '430px' }}>
              <CCard className="p-4" style={{ borderRadius: '14px' }}>
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1
                      style={{
                        color: '#053C5E',
                        fontFamily: 'sans-serif',
                        fontWeight: 500,
                        fontSize: '36px',
                      }}
                    >
                      Login
                    </h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CFormLabel
                      htmlFor="username"
                      style={{
                        color: '#053C5E',
                        fontFamily: 'sans-serif',
                        fontWeight: 800,
                        fontSize: '13px',
                      }}
                    >
                      Username
                    </CFormLabel>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="email"
                        placeholder="Username"
                        autoComplete="username"
                        {...register('email', {
                          required: 'Username is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address',
                          },
                        })}
                        invalid={!!errors.email}
                      />
                    </CInputGroup>
                    {errors.email && (
                      <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
                        {errors.email.message}
                      </div>
                    )}
                    <CFormLabel
                      htmlFor="password"
                      style={{
                        color: '#053C5E',
                        fontFamily: 'sans-serif',
                        fontWeight: 800,
                        fontSize: '13px',
                      }}
                    >
                      Password
                    </CFormLabel>
                    <CInputGroup className="mb-4">
                      <CFormInput
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register('password', { required: 'Password is required' })}
                        invalid={!!errors.password}
                      />
                      <CButton
                        type="button"
                        variant="outline"
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'absolute',
                          left: 'calc(100% - 40px)',
                          border: 'none',
                        }}
                      >
                        {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                      </CButton>
                    </CInputGroup>

                    {errors.password && (
                      <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
                        {errors.password.message}
                      </div>
                    )}

                    <Link
                      style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#6C6C6C',
                        border: 'none',
                        textDecoration: 'none',
                      }}
                    >
                      Forgot Password?
                    </Link>

                    <CRow className="mt-4">
                      <CCol xs={6}>
                        <CButton
                          style={{
                            backgroundColor: '#053C5E',
                            width: '220px',
                            height: '50px',
                            fontFamily: 'sans-serif',
                            textTransform: 'uppercase',
                          }}
                          type="submit"
                          disabled={isPending}
                          className="text-white fs-5"
                        >
                          {isPending ? 'Logging in...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="d-flex justify-content-center">
                        <CButton
                          className="px-0"
                          style={{
                            width: '220px',
                            height: '50px',
                            color: '#053C5E',
                            fontFamily: 'sans-serif',
                            textTransform: 'uppercase',
                            border: '1px solid #053C5E',
                          }}
                          onClick={() => naviagte('/register')}
                        >
                          REGISTER
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default Login
