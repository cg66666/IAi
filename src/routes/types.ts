// src/routes/types.ts
export interface RouteConfig {
  path: string
  componentKey?: string // 添加组件键值属性
  title?: string
  element: React.ReactNode
  exact?: boolean
  children?: RouteConfig[]
}
