# 后端密码验证设置指南

密码验证已移至后端，密码不会暴露在前端代码中，提高了安全性。

## 架构说明

### 前端
- 用户输入密码
- 发送密码到后端 API
- 根据后端响应解锁或显示错误

### 后端（Netlify Functions）
- 接收密码验证请求
- 在后端验证密码（密码存储在服务器端）
- 返回验证结果

## 文件结构

```
netlify/
  └── functions/
      └── verify-password.js  # 后端密码验证函数
```

## 密码存储位置

**后端文件：** `netlify/functions/verify-password.js`

```javascript
const correctPassword = 'FriendOfOrf'
```

密码存储在后端代码中，不会出现在前端构建文件中。

## 部署说明

### Netlify 部署

1. **自动部署**
   - 推送代码到 Git 仓库
   - Netlify 会自动检测 `netlify/functions/` 目录
   - Functions 会自动部署

2. **手动部署**
   - 确保 `netlify.toml` 中配置了 `functions = "netlify/functions"`
   - 构建和部署时会自动包含 Functions

### 本地测试

Netlify Functions 需要 Netlify CLI 来本地测试：

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 启动本地开发服务器（包含 Functions）
netlify dev
```

或者直接使用 `npm run dev`，但 Functions 不会运行（会回退到前端验证）。

## API 端点

**URL:** `/.netlify/functions/verify-password`

**方法:** POST

**请求体:**
```json
{
  "password": "FriendOfOrf"
}
```

**成功响应 (200):**
```json
{
  "success": true,
  "message": "Password verified"
}
```

**失败响应 (401):**
```json
{
  "success": false,
  "error": "Incorrect password"
}
```

## 安全性提升

### ✅ 优势
- 密码不会出现在前端代码中
- 密码不会出现在构建后的 JavaScript 文件中
- 即使查看源代码也无法找到密码
- 密码验证逻辑在后端执行

### ⚠️ 注意事项
- Netlify Functions 代码仍然在 Git 仓库中（但不在前端构建文件中）
- 如果 Git 仓库是公开的，密码仍然可见
- 建议使用环境变量存储密码（见下方）

## 使用环境变量（推荐）

为了进一步提高安全性，可以使用环境变量存储密码：

### 1. 更新后端函数

修改 `netlify/functions/verify-password.js`：

```javascript
// 从环境变量读取密码
const correctPassword = process.env.PASSWORD || 'FriendOfOrf'
```

### 2. 在 Netlify 配置环境变量

1. 进入 Netlify Dashboard
2. Site settings → Environment variables
3. 添加变量：
   - Key: `PASSWORD`
   - Value: `FriendOfOrf`
4. 保存并重新部署

这样密码就不会出现在代码中，只存储在 Netlify 的环境变量中。

## 故障排查

### 问题：密码验证失败

1. **检查 Functions 是否部署**
   - 进入 Netlify Dashboard → Functions
   - 确认 `verify-password` 函数存在

2. **检查网络请求**
   - 打开浏览器开发者工具 → Network
   - 查看 `/.netlify/functions/verify-password` 请求
   - 检查响应状态码和错误信息

3. **检查 CORS 设置**
   - 确保后端函数返回了正确的 CORS 头

### 问题：本地开发无法验证

- 本地开发时，Functions 需要 `netlify dev` 才能运行
- 或者可以添加降级方案：如果 API 调用失败，回退到前端验证（仅用于开发）

## 降级方案（可选）

如果需要支持本地开发，可以添加降级逻辑：

```javascript
const checkPassword = async () => {
  try {
    // 尝试后端验证
    const response = await fetch(appConfig.password.verifyEndpoint, {...})
    // ...
  } catch (err) {
    // 降级到前端验证（仅开发环境）
    if (import.meta.env.DEV) {
      // 前端验证逻辑
    }
  }
}
```

