/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 10:19:00
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 11:29:11
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
    <div
      className=" bg-white"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      {/* 顶部导航栏 */}
      {/* <header
        style={{ backgroundColor: "#2c3e50", padding: "1rem", color: "white" }}
      >
        <h1 style={{ margin: 0 }}>我的应用</h1>
      </header> */}

      {/* 主要内容区域 */}
      <main style={{ flex: 1 }}>
        {/* 使用 Outlet 渲染子路由内容 */}
        <Outlet />
      </main>

      {/* 底部 */}
      {/* <footer
        style={{
          backgroundColor: "#34495e",
          color: "white",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <p>&copy; 2026 我的应用. 保留所有权利.</p>
      </footer> */}
    </div>
  )
}

export default Layout
