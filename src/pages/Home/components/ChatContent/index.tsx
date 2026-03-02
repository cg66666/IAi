/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-24 22:12:47
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 11:25:03
 */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { flushSync } from 'react-dom'

import { Spin } from 'antd'
import DsMarkdown from 'ds-markdown'
import { marked } from 'marked'
import { nanoid } from 'nanoid'

import { post } from '@/ajax'
import { useChat, useLoginStore } from '@/store'
import { getCookie } from '@/utils'

import 'ds-markdown/style.css'
import styles from './index.module.less'

interface Message {
  role: 'user' | 'system'
  content: string
  tokens?: string
}

const ChatContent: React.FC = () => {
  const { setCurChatId, curChatId, historyList, getHistory } = useChat()
  const { isAnonymity } = useLoginStore()
  const [messageList, setMessageList] = useState<Message[]>([])
  // const [updataRes, setUpdataRes] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // const [totalTokens, setTotalTokens] = useState(0)
  const [changingContent, setChangingContent] = useState('')

  // console.log('changingContent', changingContent)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputWrapper = useRef<any>(null)
  const tempCurTokens = useRef('0')
  const curIndex = useRef(-1)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const totalTokens = useMemo(() => {
    let res = 0
    messageList.forEach((item) => {
      res += Number(item.tokens) || 0
    })
    return res
  }, [messageList])

  const [title, setTitle] = useState('')

  // const curTitle = useMemo(() => {
  //   if (!curChatId) return ''
  //   const item = historyList.find((item) => item.id == curChatId)
  //   return item?.title || '新对话'
  // }, [historyList])

  useEffect(() => {
    scrollToBottom()
  }, [messageList])

  const getRes = async () => {
    try {
      curIndex.current = messageList.length
      let temChatId = ''

      // 登录状态首次
      if (!curChatId && !isAnonymity) {
        temChatId = nanoid(8)
      }

      const res = await fetch('/ai/chat', {
        method: 'POST', // 必须使用 POST 方法，与后端对应
        headers: {
          'Content-Type': 'application/json',
          'ai-token': getCookie('ai-token')
        },
        body: JSON.stringify({
          message: tempVal.current,
          chatId: curChatId || temChatId,
          isInit: messageList.length == 1 // 第一次
        })
      })

      setInputValue('')

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      // 3. 处理流式响应
      const reader = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''

      let string = ''
      while (true) {
        const { done, value } = await reader.read()
        // console.log('value', value)
        // console.log('done', done, value)

        if (done) break
        // 解码接收到的数据块
        buffer += decoder.decode(value, { stream: true })
        // 按行分割处理
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // 保留最后一个不完整的行
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6) // 移除 "data: " 前缀
            try {
              const parsed = JSON.parse(data)
              const content = parsed.content
              if (content) {
                string += content
                await new Promise<void>((resolve) =>
                  setTimeout(() => {
                    setChangingContent(string)
                    scrollToBottom()
                    resolve() // Promise 完成，继续下一次迭代
                  }, 0)
                )
              }
            } catch (e) {
              console.error('解析数据失败:', e, '原始数据:', data)
            }
          } else if (line.startsWith('[DONE]')) {
            const data = line.slice(8)
            const parsed = JSON.parse(data)
            tempCurTokens.current = parsed.curTokens
            setIsLoading(false)

            if (messageList.length == 1 && parsed.title) {
              setTitle(parsed.title)
            }
          }
          if (!curChatId && !isAnonymity && line == '[updatad]') {
            await getHistory()
            setCurChatId(temChatId)
          }
        }
      }
      // 更新历史
      // if (!curChatId && !isAnonymity) {
      //   await getHistory()
      //   setCurChatId(temChatId)
      // }
    } catch (error) {
      console.error('流式请求失败:', error)
    }
  }

  // 更新
  useEffect(() => {
    if (!isLoading && changingContent) {
      messageList.push({
        role: 'system',
        content: changingContent,
        tokens: tempCurTokens.current
      })
      setMessageList([...messageList])
      setChangingContent('')
      return
    } else if (isLoading) {
      getRes()
    }
  }, [isLoading])

  const tempVal = useRef('')

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return
    setIsLoading(true)
    messageList.push({ id: nanoid(8), role: 'user', content: inputValue })
    setMessageList([...messageList])
    tempVal.current = inputValue
    setInputValue('')
    // setUpdataRes(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current && inputWrapper.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      inputWrapper.current.style.height = `${textareaRef.current.scrollHeight + 24}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [inputValue])

  const renderMessageContent = (content: string, isTemp?: boolean) => {
    if (isTemp) {
      return (
        <div className={styles.messageContent}>
          <div style={{ opacity: 0.6 }} dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      )
    }
    return (
      <div
        className={styles.messageContent}
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      ></div>
    )
  }

  // 初始化内容（只有登录状态才触发）
  const getConversation = async () => {
    setMessageList([])
    const res = await post<any>('/getConversation', { id: curChatId })

    if (res.successful) {
      const list = res.data || []
      // console.log('res', list, res.data?.detail, res.data)

      if (list.length) {
        setMessageList(list)
        // let tokens = 0
        // list.forEach((item) => {
        //   tokens += item.tokens || 0
        // })
        // setTotalTokens(tokens)
      }
    }
  }

  useEffect(() => {
    if (isAnonymity) {
      setTitle('新对话')
      setMessageList([])
    } else {
      const item = historyList.find((item) => item.chatId == curChatId)
      setTitle(item?.title || '新对话')
      if (curChatId) {
        getConversation()
      } else {
        setMessageList([])
      }
    }
  }, [curChatId, isAnonymity])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className={styles.head}>{title}</div>
      {/* 消息记录区域，手工纸浆质感 */}
      <div className={styles.chatMessages} id="chatMessages">
        <Scrollbars
          className={styles.scrollContent}
          renderThumbVertical={({ style, ...props }) => {
            const thumbStyle = {
              backgroundColor: '#B87C4B',
              borderRadius: '6px',
              opacity: 0.8,
              ...style
            }
            return <div style={thumbStyle} {...props} />
          }}
        >
          <div style={{ padding: '0 40px 30px 0' }}>
            {messageList.map((message, index) => (
              <div key={index} className={`${styles.message} ${styles[message.role]}`}>
                <div className={styles.bubble}>
                  {renderMessageContent(message.content)}
                  {message.tokens && (
                    <div className={styles.tokensInfo}>消耗 Tokens: {message.tokens || 0}</div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.system}`}>
                <div className={styles.bubble}>
                  {changingContent ? (
                    renderMessageContent(changingContent, true)
                  ) : (
                    <div style={{ width: '55px', height: '25px' }}>
                      <Spin></Spin>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Scrollbars>
      </div>
      {/* <div className={styles.totalConsume}>总消耗tokens</div> */}
      {/* 输入区 老木工作台 */}
      <div className={styles.inputArea} data-type={`总消耗tokens：${totalTokens}`}>
        <div className={styles.inputWrapper} ref={inputWrapper}>
          <Scrollbars
            autoHide
            renderThumbVertical={({ style, ...props }) => {
              const thumbStyle = {
                backgroundColor: '#B87C4B',
                borderRadius: '6px',
                opacity: 0.8,
                ...style
              }
              return <div style={thumbStyle} {...props} />
            }}
          >
            <textarea
              ref={textareaRef}
              id="userInput"
              className={styles.textarea}
              placeholder="敲入消息… "
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </Scrollbars>
        </div>
        <button
          className={`${styles.btn} ${styles.send}`}
          id="sendBtn"
          onClick={handleSend}
          disabled={isLoading}
        >
          发 送
        </button>
      </div>
    </div>
  )
}

export default ChatContent
