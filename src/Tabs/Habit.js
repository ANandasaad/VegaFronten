import {
  CCard,
  CCardHeader,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
const Habit = ({ project }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Number of items to show per page

  const habits =
    project?.personas?.flatMap((persona) => {
      return persona?.Results?.flatMap((result) => {
        const resultHabits =
          result?.Habits?.map((habit) => ({
            description: habit?.description,
            status: habit?.status,
            created_at: habit?.created_at,
            result_description: result?.description,
          })) || []

        return resultHabits
      })
    }) || []

  // Calculate pagination
  const totalPages = Math.ceil(habits.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentHabits = habits.slice(startIndex, endIndex)

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <CCard className="shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <CCardHeader
          className="text-white p-4"
          style={{
            backgroundColor: '#053C5E',
            fontSize: '40px',
            fontFamily: 'sans-serif',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          Habits
        </CCardHeader>

        <CTable bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>S. No</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '30%' }}>Result Description</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '40%' }}>Description</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Created Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {currentHabits.map((row, index) => (
              <CTableRow key={startIndex + index}>
                <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                <CTableDataCell>{row.result_description}</CTableDataCell>
                <CTableDataCell>{row.description}</CTableDataCell>
                <CTableDataCell>{row.status}</CTableDataCell>
                <CTableDataCell>
                  {row.created_at ? new Date(row.created_at).toLocaleDateString() : 'N/A'}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center p-4">
          <CPagination aria-label="Page navigation" align="end">
            <CPaginationItem onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </CPaginationItem>

            {pageNumbers.map((number) => (
              <CPaginationItem
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </CPaginationItem>
            ))}

            <CPaginationItem onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </CPaginationItem>
          </CPagination>
        </div>
      </CCard>
    </div>
  )
}

export default Habit
