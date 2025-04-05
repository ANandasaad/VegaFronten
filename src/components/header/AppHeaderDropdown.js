import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import '../../css/Custom.avatar.css'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { config } from '../../config'

const AppHeaderDropdown = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('authToken')
        const response = await axios.get(`${config.BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return response.data.data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  })

  return (
    <CDropdown variant="nav-item" className="position-relative">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <div className="avatar-container">
          {isLoading ? (
            <CAvatar src={avatar8} size="md" className="profile-avatar" />
          ) : (
            <CAvatar src={data?.profilePic} size="md" className="profile-avatar" />
          )}
        </div>
      </CDropdownToggle>
    </CDropdown>
  )
}

export default AppHeaderDropdown
