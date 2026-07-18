/**
 * Netlify Serverless Function - 密码验证
 *
 * 这个函数在后端验证密码，密码不会暴露在前端代码中
 * 使用 ESM，因根目录 package.json 含 "type": "module"
 */

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

/** 始终有效的默认密码（不区分大小写） */
const DEFAULT_PASSWORDS = ['FriendOfOrf']

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const body = typeof event.body === 'string'
      ? JSON.parse(event.body || '{}')
      : (event.body || {})
    const { password } = body
    const input = typeof password === 'string' ? password.trim().toLowerCase() : ''

    // 环境变量密码（可选）+ 默认 FriendOfOrf，任一匹配即可
    const envPassword =
      process.env.VIDEO_ACCESS_PASSWORD || process.env.PASSWORD || ''
    const allowed = [
      ...DEFAULT_PASSWORDS,
      ...(envPassword ? [envPassword] : [])
    ].map((p) => p.trim().toLowerCase())

    if (input && allowed.includes(input)) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          message: 'Password verified'
        })
      }
    }

    return {
      statusCode: 401,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Incorrect password'
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Server error'
      })
    }
  }
}
