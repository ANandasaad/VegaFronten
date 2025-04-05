import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { config } from '../../../config'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CImage,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { countries } from '../../../config/conurtyLabels'

import '../../../css/CustomInput.css'
import { TbUpload } from 'react-icons/tb'

const BlogDetail = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blog-detail', id],
    queryFn: async () => {
      const token = localStorage.getItem('authToken')
      try {
        const response = await axios.get(`${config.BASE_URL}/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        return response?.data?.data
      } catch (error) {
        throw error
      }
    },
    staleTime: 1000 * 60,
  })

  const fileValidation = {
    image: {
      validate: (files) => {
        if (data?.image) return true // Existing file is valid
        if (!files?.[0]) return 'Image is required'
        return (
          ['image/png', 'image/jpeg', 'image/jpg'].includes(files[0].type) ||
          'Only PNG, JPEG, or JPG images allowed'
        )
      },
    },
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  })

  // Update default values when `data?.name` changes
  useEffect(() => {
    if (data) {
      reset({
        title: data?.title,
        description: data?.description,
        image: data?.image,
      })
    }
  }, [data, reset])
  const [currentUpload, setCurrentUpload] = useState('')
  const queryClient = useQueryClient()

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

      // Handle image

      if (data.image instanceof FileList && data.image.length > 0) {
        setCurrentUpload('Uploading Image....')
        fileUrls.image = await uploadFile(data.image[0], 'image')
      } else {
        fileUrls.image = data.image // Use existing URL
      }

      const { image, ...restData } = data

      const payload = {
        ...restData,
        ...fileUrls,
      }

      await axios.put(`${config.BASE_URL}/blog/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: (data) => {
      toast.success('Blog updated successfully!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })

      queryClient.invalidateQueries(['blog-detail'])
    },
    onError: (error) => {
      console.log(error)
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
    onSettled: () => {
      setCurrentUpload('')
    },
  })
  const onSubmit = (data) => {
    mutate(data)
  }

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
                <h1 style={{ color: '#053C5E', fontWeight: 500, fontSize: '36px' }}>
                  Edit & View Blog
                </h1>
                <p className="text-body-secondary">View Blog details and information</p>

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
                      {...register('image', fileValidation.image)}
                      invalid={!!errors.image}
                    />
                    <label htmlFor="image" className="custom-file-label">
                      {image?.[0] instanceof File ? (
                        <img
                          src={URL.createObjectURL(image[0])}
                          alt="profile preview"
                          style={{ maxWidth: '100%', maxHeight: '140px' }}
                        />
                      ) : data?.image ? (
                        <CImage
                          src={data?.image}
                          alt="profile picture"
                          style={{ maxWidth: '100%', maxHeight: '140px' }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
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
                      {isPending ? currentUpload : 'UPDATE BLOG'}
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

export default BlogDetail
