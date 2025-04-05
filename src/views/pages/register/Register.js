import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormLabel,
  CRow,
  CForm,
  CFormInput,
  CInputGroup,
  CCardGroup,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { config } from '../../../config'

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const profilePic = watch('profilePic')
  const navigate = useNavigate()
  const uploadFile = async (file, type) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', type)
    const response = await axios.post(`${config.BASE_URL}/image/upload`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  }
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const fileUrls = {}
      if (data?.profilePic?.[0]) {
        fileUrls.profilePic = await uploadFile(data?.profilePic?.[0], 'profilePic')
      }

      const payload = {
        ...data,
        ...fileUrls,
      }

      console.log(payload)
      return await axios.post(`${config.BASE_URL}/auth/signup`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: (data) => {
      toast.success('Registration successful!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        onClose: () => {
          navigate('/login')
        },
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Registration failed', {
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
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'colored',
      })
      return
    }
    mutate(data)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

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
            <CCardGroup className="shadow-lg" style={{ width: '535px', minHeight: '600px' }}>
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
                      Register
                    </h1>
                    <p className="text-body-secondary">Create your account</p>

                    {/* Profile Image Upload */}
                    <div className="mb-3 text-center">
                      <div
                        className="mb-2"
                        style={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          margin: '0 auto',
                          border: '2px solid #053C5E',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f0f0f0',
                        }}
                      >
                        {profilePic?.[0] instanceof File ? (
                          <img
                            src={URL.createObjectURL(profilePic?.[0])}
                            alt="profile preview"
                            style={{ maxWidth: '100%', maxHeight: '140px' }}
                          />
                        ) : (
                          <span style={{ color: '#053C5E' }}>Profile</span>
                        )}
                      </div>
                      <CFormLabel
                        htmlFor="profilePic"
                        style={{
                          color: '#053C5E',
                          fontFamily: 'sans-serif',
                          fontWeight: 800,
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'block',
                        }}
                      >
                        Click for Profile Image
                      </CFormLabel>
                      <CFormInput
                        type="file"
                        id="profilePic"
                        accept="image/*"
                        {...register('profilePic', {
                          required: 'Image  is required',
                          validate: {
                            fileType: (files) =>
                              ['image/png', 'image/jpeg', 'image/jpg'].includes(files[0].type),
                          },
                        })}
                        invalid={!!errors.image}
                        style={{ display: 'none' }}
                      />
                    </div>

                    {/* Email */}
                    <CFormLabel
                      htmlFor="email"
                      style={{
                        color: '#053C5E',
                        fontFamily: 'sans-serif',
                        fontWeight: 800,
                        fontSize: '13px',
                      }}
                    >
                      Email
                    </CFormLabel>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        {...register('email', {
                          required: 'Email is required',
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

                    {/* Password */}
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
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="new-password"
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                          },
                        })}
                        invalid={!!errors.password}
                      />
                      <CButton
                        type="button"
                        variant="outline"
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'absolute',
                          right: '0',
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

                    {/* Confirm Password */}
                    <CFormLabel
                      htmlFor="confirmPassword"
                      style={{
                        color: '#053C5E',
                        fontFamily: 'sans-serif',
                        fontWeight: 800,
                        fontSize: '13px',
                      }}
                    >
                      Confirm Password
                    </CFormLabel>
                    <CInputGroup className="mb-4">
                      <CFormInput
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (val) => {
                            if (watch('password') !== val) {
                              return 'Passwords do not match'
                            }
                          },
                        })}
                        invalid={!!errors.confirmPassword}
                      />
                      <CButton
                        type="button"
                        variant="outline"
                        onClick={toggleConfirmPasswordVisibility}
                        style={{
                          position: 'absolute',
                          right: '0',
                          border: 'none',
                        }}
                      >
                        {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
                      </CButton>
                    </CInputGroup>
                    {errors.confirmPassword && (
                      <div className="text-danger mt-1" style={{ fontSize: '12px' }}>
                        {errors.confirmPassword.message}
                      </div>
                    )}

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
                          {isPending ? 'Registering...' : 'Register'}
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
                          onClick={() => navigate('/login')}
                        >
                          Back to Login
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

export default Register
