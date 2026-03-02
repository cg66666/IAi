/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-24 22:12:47
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 11:30:16
 */
import React from 'react'

import ChatContent from '../ChatContent'

import styles from './index.module.less'

interface IProps {
  isSidebarCollapsed?: boolean
  onToggleSidebar: () => void
}

const Content: React.FC<IProps> = ({ onToggleSidebar }) => {
  return (
    <main className={styles.mainChat} id="mainChat">
      <div className={styles.chatContainer}>
        {/* 聊天头部：现在只在移动端显示 (通过CSS控制) */}
        <div className={styles.chatHeader} id="chatHeader">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className={styles.mobileToggleBtn} onClick={onToggleSidebar} title="展开历史栏">
              ☰
            </button>
          </div>
          <div></div>
        </div>

        {/* 聊天内容区域 */}
        <ChatContent />
      </div>
    </main>
  )
}

export default Content
