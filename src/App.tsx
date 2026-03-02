/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 13:35:00
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 21:40:28
 */
// import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

// import VConsole from 'vconsole'
import router from './routes/router'

function App() {
  // useEffect(() => {
  //   new VConsole()
  // },[])

  return <RouterProvider router={router} />
}

export default App
