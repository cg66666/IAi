/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-24 22:12:47
 * @LastEditors: cg
 * @LastEditTime: 2026-03-01 11:30:16
 */
import React, { useState } from 'react'

import { useChat, useLoginStore } from '@/store'

import styles from './index.module.less'

interface IProps {
  isCollapsed?: boolean
  onToggleCollapse: () => void
}

const Menu: React.FC<IProps> = ({ isCollapsed = false, onToggleCollapse }) => {
  const { account, isAnonymity, toLogin, toLogOut } = useLoginStore()
  const { historyList, curChatId, setCurChatId } = useChat()
  return (
    <>
      <aside
        className={`${styles.historySidebar} ${isCollapsed ? styles.collapsed : ''}`}
        id="historySidebar"
      >
        <div className={styles.historyHeader}>
          <span className={styles.title}>📜 历史记录</span>
          <button className={styles.toggleSidebarBtn} onClick={onToggleCollapse} title="开合侧栏">
            ☰
          </button>
        </div>

        {isAnonymity ? (
          <button title="登录" onClick={toLogin} className={styles.emptyText}>
            请先登录以查看历史记录
          </button>
        ) : (
          <>
            {/* 新对话按钮 */}
            <div className={styles.newChatContainer}>
              <button className={styles.newChatBtn} onClick={() => setCurChatId('')}>
                <span className={styles.icon}>+</span>
                {!isCollapsed && <span className={styles.text}>新对话</span>}
              </button>
            </div>
            <div className={styles.historyList}>
              {historyList.map((item) => (
                <div
                  key={item.chatId}
                  className={`${styles.historyItem} ${curChatId === item.chatId ? styles.active : ''}`}
                  onClick={() => setCurChatId(item.chatId)}
                  title="hehe"
                >
                  {item.title}
                </div>
              ))}
            </div>
          </>
        )}

        {/* 左下角登录区域 (手工皮具卡片) */}
        <div className={styles.loginSection} id="loginSection">
          {isAnonymity ? (
            // 未登录：显示登录按钮
            <button className={styles.loginBtn} onClick={toLogin}>
              <span>{isCollapsed ? '🔑' : '🔨 登录 / 注册'}</span>
            </button>
          ) : (
            // 已登录：显示用户卡片
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>{account.charAt(0) || '匠'}</div>
              {!isCollapsed && (
                <span className={styles.userName} title={account}>
                  {account}
                </span>
              )}
              <button className={styles.logoutIcon} onClick={toLogOut} title="退出登录">
                ↪︎
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Menu
