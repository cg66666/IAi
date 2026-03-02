/*
 * @Description: 更新频率较高，优化性能，单独使用
 * @Author: cg
 * @Date: 2024-11-20 16:16:46
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 11:32:04
 */
import { create } from 'zustand'

import { post } from '@/ajax'

export interface ConversationItem {
  /** 主键 ID */
  chatId: string

  /** 用户唯一标识 (varchar(50)) */
  userId: string

  /** 会话标题 */
  title: string

  /** 最后更新时间 (ISO 8601 字符串) */
  updatedAt: string
}

interface IState {
  curChatId: string
  setCurChatId: (id: string) => void
  historyList: ConversationItem[]
  getHistory: () => void
  setHistory: (list: ConversationItem[]) => void
}

export const useChat = create<IState>((set) => ({
  curChatId: '',
  historyList: [],
  setCurChatId: (curChatId) => {
    set({ curChatId })
  },
  getHistory: async () => {
    const res = await post<ConversationItem[]>('/getHistory')
    if (res.successful) {
      set({ historyList: res.data })
    }
  },
  setHistory: (list) => {
    set({ historyList: list })
  }
}))
