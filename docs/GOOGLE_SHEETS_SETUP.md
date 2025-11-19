# Google Sheets 数据库设置指南

本指南将帮助你设置 Google Sheets 作为联系表单的数据库，自动保存所有提交的用户信息。

## 设置步骤

### 1. 创建 Google Sheet

1. 访问 [Google Sheets](https://sheets.google.com/)
2. 创建一个新的电子表格
3. 在第一行添加表头：
   ```
   A1: Timestamp
   B1: Name
   C1: Email
   D1: Message
   ```
4. 记录下你的 Google Sheet ID（在 URL 中，例如：`https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`）

### 2. 创建 Google Apps Script

1. 在 Google Sheet 中，点击 **Extensions** > **Apps Script**
2. 删除默认代码，粘贴以下代码：

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // 添加新行
    sheet.appendRow([
      new Date(), // Timestamp
      data.name || '',
      data.email || '',
      data.message || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Google Sheets API is running');
}
```

3. 点击 **Save** (💾) 保存脚本
4. 给项目命名，例如：`Contact Form Handler`

### 3. 部署 Web App

1. 点击 **Deploy** > **New deployment**
2. 点击 **Select type** 旁边的齿轮图标 ⚙️
3. 选择 **Web app**
4. 设置：
   - **Description**: Contact Form Handler
   - **Execute as**: Me
   - **Who has access**: Anyone
5. 点击 **Deploy**

### 4. 处理安全警告（重要）

部署时会显示 "Google hasn't verified this app" 警告，这是正常的，因为这是你自己创建的应用。

**解决步骤：**
1. 看到警告页面时，点击 **Advanced**（高级）
2. 点击 **Go to [Project Name] (unsafe)**（转到项目名称（不安全））
   - 注意：这里显示 "unsafe" 是 Google 的标准警告，因为应用未经过 Google 官方验证
   - 但这是你自己创建的应用，可以安全使用
3. 点击 **Allow**（允许）授权访问
4. **重要：** 复制 **Web App URL**，格式类似：
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

**为什么会出现这个警告？**
- Google 要求所有访问用户数据的应用必须经过验证
- 对于个人使用的应用，Google 允许你通过 "Advanced" 选项继续
- 这是 Google 的安全措施，保护用户数据

### 5. 配置环境变量

在项目根目录的 `.env` 文件中添加：

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbzo4yqUZNRVeposxQSyBTb2GTXasWVV76dD0UyCBjhxupVRR1SDyUnrehwvBVVvqvcHqg/exec
```

**已配置信息：**
- Google Sheet ID: `1JvzR7rzUNxtXUNWSDC0HPP9kEk8l88QNtw3JvdDxEPE`
- Web App URL: 已保存在配置中

### 6. 在 Netlify 配置环境变量（部署时必需）

如果你使用 Netlify 部署网站，需要在 Netlify Dashboard 中添加环境变量：

1. 登录 [Netlify Dashboard](https://app.netlify.com/)
2. 选择你的网站项目
3. 进入 **Site settings** > **Environment variables**
4. 点击 **Add a variable**，添加以下变量：

   | Key | Value |
   |-----|-------|
   | `VITE_EMAILJS_PUBLIC_KEY` | `XUQPJ6BTfk34lIIR3` |
   | `VITE_EMAILJS_SERVICE_ID` | `service_spznhqh` |
   | `VITE_EMAILJS_TEMPLATE_ID` | `template_kkfmc0d` |
   | `VITE_GOOGLE_SHEETS_WEB_APP_URL` | `https://script.google.com/macros/s/AKfycbzo4yqUZNRVeposxQSyBTb2GTXasWVV76dD0UyCBjhxupVRR1SDyUnrehwvBVVvqvcHqg/exec` |

5. 点击 **Save** 保存
6. **重要：** 保存后需要重新部署网站才能生效
   - 进入 **Deploys** 页面
   - 点击 **Trigger deploy** > **Deploy site**

### 7. 更新代码配置

配置信息会自动从环境变量读取。

## 数据格式

提交到 Google Sheets 的数据格式：
- **Timestamp**: 自动生成的时间戳
- **Name**: 用户姓名
- **Email**: 用户邮箱
- **Message**: 用户消息

## 安全注意事项

- Web App URL 是公开的，但只有你的 Google Sheet 可以写入数据
- 建议设置 Google Sheet 的访问权限为"只有你可以编辑"
- 可以考虑添加简单的验证（如 API key）来防止滥用

### 如何设置 Google Sheet 访问权限

1. 打开你的 Google Sheet
2. 点击右上角的 **Share**（共享）按钮
3. 在 "Get link"（获取链接）部分：
   - 点击下拉菜单，选择 **Restricted**（限制访问）
   - 或者如果显示 "Anyone with the link"，点击它并改为 **Restricted**
4. 在 "People and groups"（人员和群组）部分：
   - 确保只有你的 Google 账号有编辑权限
   - 如果有其他用户，点击他们的权限下拉菜单，选择 **Viewer**（查看者）或移除他们
5. 点击 **Done**（完成）

**重要说明：**
- Web App 仍然可以写入数据，因为它使用你的授权
- 但其他人无法直接编辑或查看 Google Sheet
- 这样可以保护你的数据隐私

## 测试

1. 填写联系表单
2. 提交表单
3. 检查 Google Sheet 是否添加了新行

## 故障排查

- 如果数据没有保存，检查 Google Apps Script 的执行日志
- 确保 Web App 的访问权限设置为 "Anyone"
- 检查浏览器控制台是否有错误信息
