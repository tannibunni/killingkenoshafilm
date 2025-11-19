/**
 * Netlify Serverless Function - 密码验证
 * 
 * 这个函数在后端验证密码，密码不会暴露在前端代码中
 */

exports.handler = async (event, context) => {
  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // 解析请求体
    const { password } = JSON.parse(event.body)

    // 从环境变量读取密码（如果未设置，使用默认值）
    // 在 Netlify Dashboard 中设置环境变量 PASSWORD
    const correctPassword = process.env.PASSWORD || 'FriendOfOrf'

    // 验证密码
    if (password === correctPassword) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({
          success: true,
          message: 'Password verified'
        })
      }
    } else {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({
          success: false,
          error: 'Incorrect password'
        })
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        success: false,
        error: 'Server error'
      })
    }
  }
}

