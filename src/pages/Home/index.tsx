/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 01:12:37
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 21:42:10
 */
import React, { useEffect, useRef, useState } from 'react'

import { useChat, useLoginStore } from '@/store'

import Content from './components/Content'
import Menu from './components/Menu'

const Home: React.FC = () => {
  const { isAnonymity } = useLoginStore()
  const { getHistory, setHistory } = useChat()

  const historySidebar = useRef<any>(null)

  const diff = useRef<number>(0)

  const isSwiping = useRef(false)

  const [startX, setStartX] = useState(0)

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const clickOutMenu = (e: any) => {
    if (
      historySidebar.current &&
      !isSidebarCollapsed &&
      !historySidebar.current.contains(e.target)
    ) {
      setIsSidebarCollapsed(true)
    }
  }

  const onTouchStart = (e) => {
    if (isSidebarCollapsed) return
    setStartX(e.touches[0].clientX)
    isSwiping.current = true
  }

  const onTouchMove = (e) => {
    if (!isSwiping.current) return
    diff.current = startX - e.touches[0].clientX
  }

  const onTouchEnd = () => {
    if (!isSwiping.current) return
    if (diff.current > 140) {
      setIsSidebarCollapsed(true)
    }
    isSwiping.current = false
  }

  useEffect(() => {
    if (isAnonymity) {
      setHistory([])
    } else {
      getHistory()
    }
  }, [isAnonymity])

  return (
    <div
      style={{ display: 'flex', height: `100%`, width: '100%', overflow: 'hidden' }}
      onClick={clickOutMenu}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div ref={historySidebar}>
        <Menu
          isCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>
      <Content isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />
    </div>
  )
}

export default Home
