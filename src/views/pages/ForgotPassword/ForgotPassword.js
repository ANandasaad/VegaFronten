import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
  CRow,
  CAlert,
} from '@coreui/react'
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: (email) => axios.post(`${config.BASE_URL}/auth/forgot-password`, { email }),
    onSuccess: (_, variable) => {
      console.log(variable)
      toast.success('Otp has been sent to your email', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })
      setTimeout(() => {
        navigate('/verify-otp', {
          state: {
            email: variable,
            otpType: 'ForgotPassword',
          },
        })
      }, 300)
    },
    onError: (error) => {
      toast.error(error.response.data.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })
    },
  })
  const onSubmit = (data) => {
    mutate(data.email)
  }
  return (
    <div
      className="min-vh-100 d-flex flex-row justify-content-center align-items-center"
      style={{ backgroundColor: '#053C5E' }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} className="d-flex justify-content-center">
            <CCardGroup className="shadow-lg" style={{ width: '535px', height: '430px' }}>
              <CCard className="p-4">
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
                      Forgot Password
                    </h1>
                    <p className="text-body-secondary">Enter your email to receive a reset link</p>

                    <CFormLabel
                      htmlFor="email"
                      style={{
                        color: '#053C5E',
                        fontFamily: 'sans-serif',
                        fontWeight: 800,
                        fontSize: '13px',
                      }}
                    >
                      Email Address
                    </CFormLabel>
                    <CFormInput
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address',
                        },
                      })}
                      invalid={!!errors.email}
                      className="mb-4"
                    />
                    {errors.email && (
                      <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
                        {errors.email.message}
                      </div>
                    )}

                    <CRow className="mt-4">
                      <CCol xs={12}>
                        <CButton
                          style={{
                            backgroundColor: '#053C5E',
                            width: '100%',
                            height: '50px',
                            fontFamily: 'sans-serif',
                            textTransform: 'uppercase',
                          }}
                          type="submit"
                          disabled={isPending}
                          className="text-white fs-5"
                        >
                          {isPending ? 'Sending...' : 'Send Reset Link'}
                        </CButton>
                      </CCol>
                    </CRow>

                    <CRow className="mt-3 text-center">
                      <CCol>
                        <Link
                          to="/login"
                          style={{
                            color: '#053C5E',
                            fontSize: '14px',
                            textDecoration: 'underline',
                          }}
                        >
                          Back to Login
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
