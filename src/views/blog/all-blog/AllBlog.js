import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import '../../../css/CustomTable.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { config } from '../../../config'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const AllBlog = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('')
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchKeyword])

  const handleView = (id) => {
    navigate(`/blog/${id}`)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${config.BASE_URL}/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: (data) => {
      toast.success('Blog deleted successfully!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })

      queryClient.invalidateQueries({
        queryKey: ['blog', pagination.pageIndex, pagination.pageSize, debouncedSearchKeyword],
      })
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
  })

  const handledelete = (id) => {
    mutate(id)
  }

  const token = localStorage.getItem('authToken')
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['blog', pagination.pageIndex, pagination.pageSize, debouncedSearchKeyword],
    queryFn: async () => {
      const token = localStorage.getItem('authToken')
      try {
        const response = await axios.get(`${config.BASE_URL}/blog`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          params: {
            page: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
            search: debouncedSearchKeyword,
          },
        })
        return response?.data?.data
      } catch (err) {
        // This will trigger the onError callback
        throw err
      }
    },
    staleTime: 1000 * 60, // 1 minute
  })
  const totalCount = blog?.pagination?.total || 0

  const columns = useMemo(
    () => [
      {
        accessorKey: 'serialNo',
        header: 'S. No',
        size: 80,
        Cell: ({ row }) => {
          return pagination.pageIndex * pagination.pageSize + row.index + 1
        }, // Auto-generate serial numbers
      },
      {
        accessorKey: 'title', // Access nested data
        header: 'Title',
        size: 150,
        Cell: ({ cell }) => cell.getValue() || 'null',
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 150,
        Cell: ({ cell }) => cell.getValue() || 'null',
      },

      {
        accessorKey: 'createdAt',
        header: 'DATE JOINED',
        size: 150,
        Cell: ({ cell }) => {
          const date = cell.getValue()
          return date ? new Date(date).toLocaleDateString() : null
        },
      },
      {
        header: 'Actions',
        size: 180,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: '#053C5E',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onClick={() => handleView(row.original.id)}
            >
              View
            </button>
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onClick={() => handledelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],

    [pagination.pageIndex, pagination.pageSize],
  )

  // Initialize table
  const table = useMaterialReactTable({
    columns,
    data: blog?.blogs || [],
    state: {
      isLoading,
      pagination,
    },
    rowCount: totalCount,

    muiTableHeadCellProps: {
      sx: {
        fontSize: '12px',
        fontWeight: 700,
        textAlign: 'center',
        backgroundColor: '#053C5E', // Blue background
        color: '#ffffff',
      },
    },
    muiTablePaperProps: {
      elevation: 0,
    },

    enableColumnFilters: false,
    enableGlobalFilter: true,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    muiPaginationProps: {
      color: '#053C5E',
      shape: 'rounded',
    },
    paginationDisplayMode: 'pages',
    enableHiding: false,
    manualPagination: true,
    onPaginationChange: setPagination,
    manualFiltering: true,
    onGlobalFilterChange: setSearchKeyword,
    globalFilterFn: 'contains',
  })

  return (
    <div className="container">
      <div className="table-header">
        <h2>Blog List</h2>
        <p>Manage all registered Blog in the system</p>
      </div>
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
      <MaterialReactTable table={table} />
    </div>
  )
}

export default AllBlog
