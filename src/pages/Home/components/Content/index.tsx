/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-24 22:12:47
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 12:18:53
 */
import React, { useState } from 'react'

import ChatContent from '../ChatContent'

import styles from './index.module.less'

interface IProps {
  isSidebarCollapsed?: boolean
  onToggleSidebar: () => void
}

const Content: React.FC<IProps> = ({ onToggleSidebar }) => {
  const [title, setTitle] = useState('')

  return (
    <main className={styles.mainChat} id="mainChat">
      <div className={styles.chatContainer}>
        {/* 聊天头部：现在只在移动端显示 (通过CSS控制) */}
        <div className={styles.chatHeader} id="chatHeader">
          <button className={styles.mobileToggleBtn} onClick={onToggleSidebar} title="展开历史栏">
            ☰
          </button>
          <div className={styles.title}>{title}</div>
        </div>

        {/* 聊天内容区域 */}
        <ChatContent title={title} setTitle={setTitle} />
      </div>
    </main>
  )
}

export default Content
