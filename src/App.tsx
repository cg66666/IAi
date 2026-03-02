/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 13:35:00
 * @LastEditors: cg
 * @LastEditTime: 2026-02-25 12:26:29
 */
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from './routes/router'

function App() {
  return <RouterProvider router={router} />
}

export default App
