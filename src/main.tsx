/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 00:54:03
 * @LastEditors: cg
 * @LastEditTime: 2026-02-18 10:48:59
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import './global.less'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
