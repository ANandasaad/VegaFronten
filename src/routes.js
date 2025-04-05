import { element } from 'prop-types'
import React from 'react'

//super admin

const AddBlog = React.lazy(() => import('./views/blog/add-blog/AddBlog'))
const AllBlog = React.lazy(() => import('./views/blog/all-blog/AllBlog'))

const BlogDetail = React.lazy(() => import('./views/pages/Blog/BlogDetail'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/blog/add-blog', name: 'Add Blog', element: AddBlog },
  { path: '/blog/all-blogs', name: 'All Blog', element: AllBlog },
  { path: '/blog/:id', name: 'Blog Detail', element: BlogDetail },
]

export default routes
