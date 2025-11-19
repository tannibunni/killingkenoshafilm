# Google Sheets 集成故障排查指南

## 问题：Web App URL 返回登录页面

如果访问 Web App URL 时看到 Google 登录页面，说明 Web App 没有正确部署或权限设置有问题。

## 解决方案

### 步骤 1：检查 Google Apps Script 代码

1. 打开你的 Google Sheet
2. 点击 **Extensions** > **Apps Script**
3. 确保代码是 `docs/google-apps-script-updated.js` 中的最新版本
4. 点击 **Save** (💾) 保存

### 步骤 2：重新部署 Web App

1. 在 Apps Script 编辑器中，点击 **Deploy** > **Manage deployments**
2. 如果已有部署：
   - 点击部署旁边的 **Edit** (铅笔图标)
   - 点击 **Deploy**
   - **重要：** 选择 "New version" 而不是 "New deployment"
3. 如果这是新部署：
   - 点击 **New deployment**
   - 点击齿轮图标 ⚙️ 选择 **Web app**
   - 设置：
     - **Description**: Contact Form Handler
     - **Execute as**: Me
     - **Who has access**: **Anyone** (这是关键！)
   - 点击 **Deploy**

### 步骤 3：复制新的 Web App URL

部署完成后：
1. 复制显示的 **Web App URL**
2. 格式应该是：`https://script.google.com/macros/s/.../exec`
3. 更新环境变量（见步骤 4）

### 步骤 4：更新环境变量

**本地开发：**
1. 打开 `.env` 文件
2. 更新或添加：
   ```env
   VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_NEW_SCRIPT_ID/exec
   ```
3. 重启开发服务器

**Netlify 部署：**
1. 登录 [Netlify Dashboard](https://app.netlify.com/)
2. 选择你的网站
3. 进入 **Site settings** > **Environment variables**
4. 找到或添加 `VITE_GOOGLE_SHEETS_WEB_APP_URL`
5. 更新为新的 Web App URL
6. 点击 **Save**
7. **重要：** 重新部署网站（Deploys > Trigger deploy）

### 步骤 5：测试 Web App

在浏览器中访问 Web App URL（GET 请求）：
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

应该返回：`"Google Sheets API is running"`

如果仍然看到登录页面，检查：
- Web App 的 "Who has access" 是否设置为 "Anyone"
- 是否使用了最新的部署版本

## 常见问题

### Q: 为什么使用 `no-cors` 模式？

A: Google Apps Script Web Apps 需要 `no-cors` 模式才能从浏览器直接调用。这限制了读取响应，但请求仍会发送。

### Q: 如何查看执行日志？

A: 在 Apps Script 编辑器中：
1. 点击 **View** > **Execution log**
2. 查看最近的执行记录
3. 如果有错误，会显示在日志中

### Q: 数据格式问题

代码现在支持两种格式：
1. **URL-encoded form data** (优先使用)
2. **JSON** (降级方案)

Google Apps Script 代码会自动检测并处理两种格式。

## 验证数据保存

1. 提交联系表单
2. 打开浏览器控制台（F12）
3. 查看日志：
   - "Saving to Google Sheets: ..."
   - "Google Sheets save request sent (form data)" 或 "(JSON)"
4. 检查 Google Sheet 是否添加了新行

## 如果仍然无法工作

1. **检查 Google Sheet 表头**：
   - 确保第一行是：`Timestamp | Name | Email | Message`

2. **检查 Apps Script 权限**：
   - 首次运行时可能需要授权
   - 点击 "Review permissions" 并授权

3. **检查网络请求**：
   - 浏览器控制台 → Network 标签
   - 查找对 Web App URL 的 POST 请求
   - 检查请求状态和响应

4. **尝试手动测试**：
   - 使用 `test-google-sheets.js` 脚本测试连接

