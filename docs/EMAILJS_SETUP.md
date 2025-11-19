# EmailJS 配置指南

ContactForm 组件现在支持通过 EmailJS 直接发送邮件到 `mattorftv@gmail.com`。

## 设置步骤

### 1. 注册 EmailJS 账号

1. 访问 [EmailJS](https://www.emailjs.com/)
2. 注册免费账号（每月 200 封邮件免费额度）

### 2. 创建 Email Service

1. 登录 EmailJS Dashboard
2. 进入 **Email Services** 页面
3. 点击 **Add New Service**
4. 选择你的邮件服务商（Gmail、Outlook 等）
5. 按照提示连接你的邮箱账户
6. 记录下 **Service ID**

### 3. 创建 Email Template

1. 进入 **Email Templates** 页面
2. 点击 **Create New Template**
3. 使用以下模板变量：

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This email was sent from the Killing Kenosha website contact form.
```

4. 在 **To Email** 字段填入：`mattorftv@gmail.com`
5. 保存模板并记录下 **Template ID**

### 4. 获取 Public Key

1. 进入 **Account** > **General**
2. 找到 **Public Key**，复制它

### 5. 配置环境变量

在项目根目录创建 `.env` 文件（如果不存在）：

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

**重要：** `.env` 文件已经在 `.gitignore` 中，不会被提交到 Git。

### 6. 部署时配置环境变量

#### Netlify
1. 进入 Netlify Dashboard
2. 选择你的网站
3. 进入 **Site settings** > **Environment variables**
4. 添加三个环境变量：
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`

#### Vercel
1. 进入 Vercel Dashboard
2. 选择你的项目
3. 进入 **Settings** > **Environment Variables**
4. 添加三个环境变量（同上）

## 降级方案

如果 EmailJS 未配置，ContactForm 会自动降级使用 `mailto:` 链接，打开用户的默认邮件客户端。

## 测试

配置完成后，测试联系表单：
1. 填写表单
2. 点击 "Send Message"
3. 检查 `mattorftv@gmail.com` 收件箱

## 注意事项

- EmailJS 免费版每月限制 200 封邮件
- 确保环境变量正确配置
- 在生产环境部署前测试邮件发送功能
- **重要：** Private Key 不应该暴露在代码或文档中，只在 EmailJS Dashboard 中使用

## 已配置信息

配置信息已保存在 `.env` 文件中（不会提交到 Git）。

