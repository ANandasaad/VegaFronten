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

const Persona = ({ personas }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Number of items to show per page
  const totalPages = Math.ceil(personas.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentPersona = personas.slice(startIndex, endIndex)

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
          Personas
        </CCardHeader>
        <CTable bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell style={{ width: '5%' }}>S. No</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '10%' }}>Persona Title</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '20%' }}>Describe Challenges</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '25%' }}>
                Describe Needs Expectations
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '20%' }}>Describe Role Expertise</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '10%' }}>Role of Group</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '5%' }}>Status</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '10%' }}>Created Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentPersona?.map((persona, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                <CTableDataCell>{persona?.personaTitle}</CTableDataCell>
                <CTableDataCell>
                  {persona?.describeChallenges ? persona?.describeChallenges : 'N/A'}
                </CTableDataCell>
                <CTableDataCell>
                  {persona?.describeNeedsExpectations ? persona?.describeNeedsExpectations : 'N/A'}
                </CTableDataCell>
                <CTableDataCell>
                  {persona?.describeRoleExpertise ? persona?.describeRoleExpertise : 'N/A'}
                </CTableDataCell>
                <CTableDataCell>
                  {persona?.roleOfTheGroup ? persona?.roleOfTheGroup : 'N/A'}
                </CTableDataCell>
                <CTableDataCell>{persona?.status ? persona?.status : 'N/A'}</CTableDataCell>
                <CTableDataCell>
                  {persona?.created_at ? new Date(persona?.created_at).toLocaleDateString() : 'N/A'}
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

export default Persona
