import React, { use, useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
  CCardGroup,
  CInputGroup,
  CFormTextarea,
} from '@coreui/react'
import { TbUpload } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { config } from '../../../config'
import { toast, ToastContainer } from 'react-toastify'
import '../../../css/CustomInput.css'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const [currentUpload, setCurrentUpload] = useState('')

  const naviagte = useNavigate()

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
  const token = localStorage.getItem('authToken')

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const fileUrls = {}

      if (data.image?.[0]) {
        setCurrentUpload('Uploading Image...')
        fileUrls.image = await uploadFile(data.image?.[0], 'image')
      }

      const payload = {
        ...data,
        ...fileUrls,
      }

      await axios.post(`${config.BASE_URL}/blog/create`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      toast.success('Organization created successfully!')
      reset()
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    },
    onSettled: () => {
      setCurrentUpload('')
    },
  })

  const onSubmit = (data) => {
    mutate(data)
  }
  useEffect(() => {
    if (!token) {
      naviagte('/login')
    }
  }, [])
  const image = watch('image')

  return (
    <CRow className="justify-content-center">
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
      <CCol md={10}>
        <CCardGroup className="shadow-lg">
          <CCard className="p-4" style={{ borderRadius: '14px' }}>
            <CCardBody>
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{ color: '#053C5E', fontWeight: 500, fontSize: '36px' }}>Add Blog</h1>
                <p className="text-body-secondary">Complete Blog details and information</p>

                {/* Title */}
                <CFormLabel htmlFor="title" className="form-label">
                  Title
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CFormInput
                    type="text"
                    placeholder="Enter Title"
                    {...register('title', { required: 'Title is required' })}
                    invalid={!!errors.title}
                    style={{
                      borderColor: errors.title ? '#dc3545' : '#ABB0BA',
                    }}
                  />
                </CInputGroup>

                {/* Description */}
                <CFormLabel htmlFor="description" className="form-label">
                  Description
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CFormTextarea
                    rows={3}
                    placeholder="Enter description"
                    {...register('description', { required: 'Description is required' })}
                    invalid={!!errors.description}
                    style={{
                      borderColor: errors.description ? '#dc3545' : '#ABB0BA',
                    }}
                  />
                </CInputGroup>

                {/* Upload Logo */}
                <div className="">
                  <CFormLabel
                    htmlFor="image"
                    style={{
                      color: '#053C5E',
                      fontFamily: 'sans-serif',
                      fontWeight: 600,
                      fontSize: '13px',
                      marginBottom: '12px',
                    }}
                  >
                    Upload Image
                  </CFormLabel>
                  <div
                    className="custom-file-container1"
                    style={{
                      borderColor: errors.image ? '#dc3545' : '#ABB0BA',
                      transition: 'border-color 0.15s ease-in-out',
                    }}
                  >
                    <CFormInput
                      type="file"
                      id="image"
                      className="custom-file-input"
                      {...register('image', {
                        required: 'Image  is required',
                        validate: {
                          fileType: (files) =>
                            ['image/png', 'image/jpeg', 'image/jpg'].includes(files[0].type),
                        },
                      })}
                      invalid={!!errors.image}
                    />
                    <label htmlFor="image" className="custom-file-label">
                      {(image?.[0] instanceof File && (
                        <img
                          src={URL.createObjectURL(image?.[0])}
                          alt="profile preview"
                          style={{ maxWidth: '100%', maxHeight: '140px' }}
                        />
                      )) || <TbUpload className="upload-icon" />}
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <CRow className="mt-4">
                  <CCol className="text-end">
                    <CButton
                      type="submit"
                      className="text-white"
                      style={{
                        backgroundColor: '#053C5E',
                        width: '250px',
                        height: '60px',
                      }}
                      disabled={isPending}
                    >
                      {isPending ? currentUpload : 'CREATE BLOG'}
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  )
}

export default AddBlog
