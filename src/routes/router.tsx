/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 10:22:29
 * @LastEditors: cg
 * @LastEditTime: 2026-02-18 10:47:31
 */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import LoadingPage from '@/components/LoadingPage'
import Layout from '@/layout'

const routeData = [
  {
    path: '/',
    title: '首页',
    key: 'home',
    element: lazy(() => import('@/pages/Home'))
  },
  {
    path: '/about',
    title: '关于我们',
    key: 'about',
    element: lazy(() => import('@/pages/About'))
  }
]

// 创建嵌套路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: routeData.map((route) => {
      return {
        path: route.path,
        element: (
          <Suspense fallback={LoadingPage}>
            <route.element />
          </Suspense>
        ),
        index: route.path === '/' ? true : undefined
      }
    })
  }
])

export default router
