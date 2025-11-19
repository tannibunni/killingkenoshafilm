# Google Sheets Web App URL 更新

## 新的 Web App URL

```
https://script.google.com/macros/s/AKfycbzo4yqUZNRVeposxQSyBTb2GTXasWVV76dD0UyCBjhxupVRR1SDyUnrehwvBVVvqvcHqg/exec
```

## 验证状态

✅ **Web App 已正确部署**
- GET 请求返回：`"Google Sheets API is running"`
- 说明 Web App 可以正常访问

## 需要更新的配置

### 1. 本地开发环境（`.env` 文件）

在项目根目录的 `.env` 文件中更新：

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbzo4yqUZNRVeposxQSyBTb2GTXasWVV76dD0UyCBjhxupVRR1SDyUnrehwvBVVvqvcHqg/exec
```

**注意：** 如果 `.env` 文件不存在，需要创建它。

### 2. Netlify 生产环境

1. 登录 [Netlify Dashboard](https://app.netlify.com/)
2. 选择你的网站项目
3. 进入 **Site settings** > **Environment variables**
4. 找到或添加 `VITE_GOOGLE_SHEETS_WEB_APP_URL`
5. 更新值为新的 URL：
   ```
   https://script.google.com/macros/s/AKfycbzo4yqUZNRVeposxQSyBTb2GTXasWVV76dD0UyCBjhxupVRR1SDyUnrehwvBVVvqvcHqg/exec
   ```
6. 点击 **Save**
7. **重要：** 保存后需要重新部署网站才能生效
   - 进入 **Deploys** 页面
   - 点击 **Trigger deploy** > **Deploy site**

## 测试

更新配置后，测试联系表单：

1. 提交联系表单
2. 打开浏览器控制台（F12）
3. 查看日志：
   - "Saving to Google Sheets: ..."
   - "Web App URL: ..."
   - "Google Sheets save request sent (JSON format)"
4. 检查 Google Sheet 是否添加了新行

## 故障排查

如果数据仍然无法保存：

1. **检查环境变量**：
   - 本地：确认 `.env` 文件中的 URL 正确
   - Netlify：确认环境变量已更新并重新部署

2. **检查 Google Apps Script 执行日志**：
   - 打开 Apps Script 编辑器
   - View > Execution log
   - 查看是否有错误信息

3. **检查 Google Sheet 表头**：
   - 确保第一行是：`Timestamp | Name | Email | Message`

4. **检查浏览器控制台**：
   - 查看是否有网络错误
   - 查看请求是否成功发送

