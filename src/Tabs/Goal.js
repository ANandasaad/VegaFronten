import {
  CCard,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'

const Goal = ({ goals }) => {
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
          Goals
        </CCardHeader>
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>S.N0</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell style={{ width: '50%' }}>Description</CTableHeaderCell>
              <CTableHeaderCell>Created Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {goals?.map((goal, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{goal?.status}</CTableDataCell>
                <CTableDataCell>{goal?.description ? goal?.description : 'N/A'}</CTableDataCell>
                <CTableDataCell>
                  {goal?.created_at ? new Date(goal?.created_at).toLocaleDateString() : 'N/A'}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </div>
  )
}

export default Goal
