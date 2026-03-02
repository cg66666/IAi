import React from 'react'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>关于我们</h1>
      <p>这是关于页面。您可以在这里添加有关您的应用或团队的信息。</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to="/" style={{ color: '#007acc', textDecoration: 'none' }}>
          ← 返回首页
        </Link>
      </div>
    </div>
  )
}

export default About
