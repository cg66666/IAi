/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 10:14:27
 * @LastEditors: cg
 * @LastEditTime: 2026-02-18 11:15:39
 */
import React from 'react'

import { Flex, Spin } from 'antd'

const LoadingPage: React.FC = () => {
  return (
    <Flex
      justify="center"
      align="middle"
      style={{ width: '100%', height: '100%', padding: '20px' }}
    >
      <Spin size="large" />
    </Flex>
  )
}

export default LoadingPage
