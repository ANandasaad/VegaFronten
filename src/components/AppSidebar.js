import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'

import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'
import { setUIState } from '../slice/uiSlice'
import imagelogo from '../assets/brand/syzygy-logo.png'
const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.ui.sidebarShow)
  return (
    <CSidebar
      className="border-end"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setUIState({ sidebarShow: visible }))
      }}
      style={{
        backgroundColor: '#053C5E',
        color: 'white',
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CImage
            customClassName="sidebar-brand-full"
            src={
              'data:image/jpeg;base64,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'
            }
            height={200}
          />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(setUIState({ sidebarShow: false }))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
