/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 10:22:29
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 16:52:34
 */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import LoadingPage from '@/components/LoadingPage'
import Layout from '@/layout'

// 定义路由类型
type RouteConfig = {
  path: string
  title: string
  key: string
  element: React.ComponentType<any>
}

const routes: RouteConfig[] = [
  {
    path: '/',
    title: '首页',
    key: 'home',
    element: lazy(() => import('@/pages/Home'))
  }
]

// 创建嵌套路由配置
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: routes.map((route) => {
        return {
          path: route.path,
          element: (
            <Suspense fallback={<LoadingPage />}>
              <route.element />
            </Suspense>
          ),
          index: route.path === '/' ? true : undefined
        }
      })
    }
  ],
  {
    basename: `/${import.meta.env.VITE_PREFIX || ''}`.replace('//', '/')
  }
)

export default router
