import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CContainer,
  CImage,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useCallback, useState } from 'react'

const ProjectInfo = ({ project }) => {
  const [visible, setVisible] = useState(false)
  const [image, setImage] = useState(null)
  const [picHeading, setHeadingPic] = useState('')
  const dummyImage = 'https://placehold.co/1000x900?text=Project+Image'

  const handleImage = useCallback((pic, heading) => {
    setImage(pic)
    setHeadingPic(heading)
    setVisible(true)
  }, [])

  if (!project) return <CSpinner />
  return (
    <div>
      <>
        <CCard className="shadow-lg rounded-xl border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <CCardHeader
            className="text-white p-4"
            style={{
              backgroundColor: '#053C5E',
              fontSize: '40px',
              fontFamily: 'sans-serif',
              fontWeight: '600',
            }}
          >
            {project?.projectName}
          </CCardHeader>

          {/* Body Section */}
          <CCardBody className="p-6 text-gray-700">
            <CTable bordered responsive>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableDataCell>{project?.description}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Problem/Opportunity</CTableHeaderCell>
                  <CTableDataCell>{project?.problemOrOpportunity}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Principles</CTableHeaderCell>
                  <CTableDataCell>{project?.projectPrinciples}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Team</CTableHeaderCell>
                  <CTableDataCell style={{ textTransform: 'uppercase' }}>
                    {project?.teamName}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Project Impact</CTableHeaderCell>
                  <CTableDataCell>
                    {project?.projectImpact ? project?.projectImpact : '_'}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Project Background Image</CTableHeaderCell>
                  <CTableDataCell>
                    {project?.projectBackgroundImage ? (
                      <CButton
                        color="primary"
                        onClick={() =>
                          handleImage(project?.projectBackgroundImage, 'Project Background Image')
                        }
                      >
                        View Image
                      </CButton>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableDataCell>
                    <span style={{ textTransform: 'uppercase' }}>{project?.status}</span>
                  </CTableDataCell>
                </CTableRow>

                <CTableRow>
                  <CTableHeaderCell>StoryBoard Status</CTableHeaderCell>
                  <CTableDataCell>
                    <span style={{ textTransform: 'uppercase' }}>
                      {project?.storyBoardDone ? 'True' : 'False'}
                    </span>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>StoryBoard URL</CTableHeaderCell>
                  <CTableDataCell>
                    <span>{project?.storyBoardUrl ? project?.storyBoardUrl : 'N/A'}</span>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Certificate URL</CTableHeaderCell>
                  <CTableDataCell>
                    <span>{project?.certificateUrl ? project?.certificateUrl : 'N/A'}</span>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Success story</CTableHeaderCell>
                  <CTableDataCell>
                    <span>{project?.successStory ? project?.successStory : 'N/A'}</span>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Start Date</CTableHeaderCell>
                  <CTableDataCell>
                    {new Date(project?.startDate).toLocaleDateString()}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Target Date</CTableHeaderCell>
                  <CTableDataCell>
                    {new Date(project?.targetDate).toLocaleDateString()}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Project Completion Date</CTableHeaderCell>
                  <CTableDataCell>
                    {project?.projectCompletionDate
                      ? new Date(project?.projectCompletionDate).toLocaleDateString()
                      : 'N/A'}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>Project Created Date</CTableHeaderCell>
                  <CTableDataCell>
                    {new Date(project?.created_at).toLocaleDateString()}
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>

            {/* Project Members List */}
            <h3
              className="mt-6 text-lg"
              style={{
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
                fontWeight: '600',
                color: '#053C5E',
              }}
            >
              Project Members
            </h3>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>S.NO</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Designation</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Profile Picture</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {project?.projectMember?.map((member, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{member?.user?.userProfile?.fullName || 'N/A'}</CTableDataCell>
                    <CTableDataCell>{member?.user?.email || 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      {member?.user?.userProfile?.designation || 'N/A'}
                    </CTableDataCell>

                    <CTableDataCell>{member?.user?.role?.role || 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      {member?.user?.userProfile?.profilePicture ? (
                        <CButton
                          color="primary"
                          onClick={() =>
                            handleImage(
                              member?.user?.userProfile?.profilePicture,
                              'User Profile Picture',
                            )
                          }
                        >
                          View Image
                        </CButton>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        <CModal visible={visible} onClose={() => setVisible(false)} alignment="center" size="lg">
          <CModalHeader closeButton>
            <CModalTitle className="text-uppercase">
              {picHeading ? picHeading : 'Picture'}
            </CModalTitle>
          </CModalHeader>
          <CModalBody className="text-center">
            {image ? (
              <CImage
                src={image || dummyImage}
                alt="Project Background"
                onError={(e) => (e.target.src = dummyImage)} // Fallback if image fails to load
                fluid
                rounded
              />
            ) : (
              <p>No image available</p>
            )}
          </CModalBody>
        </CModal>
      </>
    </div>
  )
}

export default ProjectInfo
