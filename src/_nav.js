import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Blog',
    to: '/blog',
    items: [
      {
        component: CNavItem,
        name: 'Add Blog',
        to: '/blog/add-blog',
      },
      {
        component: CNavItem,
        name: 'All Blog',
        to: '/blog/all-blogs',
      },
    ],
  },
]

export default _nav
