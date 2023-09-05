import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNavketua } from './AppSidebarNavketua'

import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigationketua from 'src/views/pages/register/_navketua'

const AppSidebarketua = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      style={{ backgroundColor: '#4f5d73' }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '30px',
          }}
        >
          <img
            className="img"
            src="/assets/logo1.png"
            alt=""
            style={{ width: 100, height: 100, marginBottom: '10px' }}
          />
          <h4>SIM Kelurahan</h4>
        </div>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav style={{ marginTop: '10px', height: 'calc(100vh - 150px)' }}>
        <SimpleBar style={{ maxHeight: '100%', overflowX: 'hidden' }}>
          <AppSidebarNavketua items={navigationketua} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebarketua)
