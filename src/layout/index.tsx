/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 10:19:00
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 21:41:52
 */
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useLoginStore } from '@/store'

const Layout: React.FC = () => {
  const { checkLogin } = useLoginStore()

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <div className=" bg-white" style={{ height: `100%`, width: '100%' }}>
      {/* 主要内容区域 */}
      <main style={{ height: ' 100%' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
