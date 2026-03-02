/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 01:12:37
 * @LastEditors: cg
 * @LastEditTime: 2026-03-01 11:28:49
 */
import React, { useEffect, useState } from 'react'

import { post } from '@/ajax'
import { useChat, useLoginStore } from '@/store'

import Content from './components/Content'
import Menu from './components/Menu'

const Home: React.FC = () => {
  const { isAnonymity } = useLoginStore()
  const { getHistory, setHistory } = useChat()

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  useEffect(() => {
    if (isAnonymity) {
      setHistory([])
    } else {
      getHistory()
    }
  }, [isAnonymity])

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Menu isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />
      <Content isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />
    </div>
  )
}

export default Home
