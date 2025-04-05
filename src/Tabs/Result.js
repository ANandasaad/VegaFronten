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

const Result = ({ project }) => {
  const result = []
  project?.personas?.forEach((persona) => {
    const data = {
      personaName: persona?.personaTitle,
      result: persona?.Results?.map((item) => {
        return {
          status: item?.status,
          description: item?.description,
          created_at: item?.created_at,
        }
      }),
    }

    result.push(data)
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Number of items to show per page
  const totalPages = Math.ceil(result.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentResult = result.slice(startIndex, endIndex)

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
          Results
        </CCardHeader>
        <CTable bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>S. No</CTableHeaderCell>
              <CTableHeaderCell>Persona Title</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '60%' }}>Description</CTableHeaderCell>

              <CTableHeaderCell>Created Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentResult?.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <CTableRow>
                  <CTableDataCell rowSpan={row?.result?.length + 1}>
                    {startIndex + rowIndex + 1}
                  </CTableDataCell>
                  <CTableDataCell rowSpan={row?.result?.length + 1}>
                    {row?.personaName ? row?.personaName : 'N/A'}
                  </CTableDataCell>
                </CTableRow>
                {row?.result?.map((item, itemIndex) => (
                  <CTableRow key={`${rowIndex}-${itemIndex}`}>
                    <CTableDataCell>{item?.status ? item?.status : 'N/A'}</CTableDataCell>
                    <CTableDataCell>{item?.description ? item?.description : 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      {item?.created_at ? new Date(item?.created_at).toLocaleDateString() : 'N/A'}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </React.Fragment>
            ))}
          </CTableBody>
        </CTable>
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

export default Result
