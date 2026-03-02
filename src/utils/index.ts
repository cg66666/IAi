/*
 * @Description: Cookie utility functions
 * @Author: cg
 * @Date: 2026-02-24
 * @LastEditors: cg
 * @LastEditTime: 2026-02-25 11:48:55
 */

export function getCookie(cookieName: string) {
  let cookieValue = ''
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=')
      if (cookie[0].trim() === cookieName.trim()) {
        cookieValue = cookie[1].trim()
        break
      }
    }
  }
  return cookieValue
}

export function getQueryParams(url = window.location.href) {
  const urlParams = new URLSearchParams(new URL(url).search)
  const queryParams: any = {}

  urlParams.forEach((value, key) => {
    queryParams[key] = value
  })

  return queryParams
}
