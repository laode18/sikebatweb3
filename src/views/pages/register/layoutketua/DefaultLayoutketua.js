import React from 'react'
import {
  AppContentketua,
  AppSidebarketua,
  AppFooterketua,
  AppHeaderketua,
} from 'src/views/pages/register/componentsketua/index'
import withAuth from 'src/authMiddleware'

const DefaultLayoutketua = () => {
  return (
    <div>
      <AppSidebarketua />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeaderketua />
        <div className="body flex-grow-1 px-3">
          <AppContentketua />
        </div>
        <AppFooterketua />
      </div>
    </div>
  )
}

export default withAuth(['ketua'])(DefaultLayoutketua)
