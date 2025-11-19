# GitHub 仓库设置指南

## 📋 步骤 1: 在 GitHub 创建新仓库

1. **访问 GitHub**
   - 前往 [https://github.com/new](https://github.com/new)
   - 登录你的 GitHub 账号

2. **创建新仓库**
   - Repository name: `killingkenosha-documentary-player` (或你喜欢的名字)
   - Description: `Killing Kenosha Documentary Player - Vue 3 + Vite`
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（我们已经有了）
   - 点击 "Create repository"

3. **复制仓库 URL**
   - 创建后会显示仓库 URL，类似：
     - HTTPS: `https://github.com/yourusername/killingkenosha-documentary-player.git`
     - SSH: `git@github.com:yourusername/killingkenosha-documentary-player.git`

---

## 📤 步骤 2: 连接本地仓库并推送

### 方法 A: 使用 HTTPS（推荐新手）

```bash
# 添加远程仓库（替换为你的实际 URL）
git remote add origin https://github.com/yourusername/killingkenosha-documentary-player.git

# 重命名主分支为 main（如果还没有）
git branch -M main

# 推送代码
git push -u origin main
```

**注意：** 如果 GitHub 要求身份验证，使用 Personal Access Token（不是密码）

### 方法 B: 使用 SSH（推荐）

```bash
# 添加远程仓库（替换为你的实际 URL）
git remote add origin git@github.com:yourusername/killingkenosha-documentary-player.git

# 重命名主分支为 main（如果还没有）
git branch -M main

# 推送代码
git push -u origin main
```

---

## 🔐 GitHub 身份验证

### 如果使用 HTTPS 需要 Personal Access Token

1. **创建 Token**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token (classic)
   - 选择权限：`repo`（完整仓库访问）
   - 生成并复制 token

2. **使用 Token**
   - 推送时，用户名输入你的 GitHub 用户名
   - 密码输入刚才生成的 token

### 如果使用 SSH

1. **检查 SSH 密钥**
   ```bash
   ls -al ~/.ssh
   ```

2. **如果没有 SSH 密钥，生成一个**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

3. **添加 SSH 密钥到 GitHub**
   ```bash
   # 复制公钥
   cat ~/.ssh/id_ed25519.pub
   ```
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - 粘贴公钥并保存

---

## ✅ 验证推送成功

推送完成后，访问你的 GitHub 仓库页面，应该能看到所有文件。

---

## 🔄 后续更新代码

以后更新代码时，使用以下命令：

```bash
# 添加更改的文件
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到 GitHub
git push
```

---

## 🚀 连接 Netlify/Vercel 自动部署

推送代码后，可以在部署平台连接 GitHub 仓库实现自动部署：

1. **Netlify**
   - Add new site → Import an existing project
   - 选择 GitHub 并授权
   - 选择你的仓库
   - 配置构建命令：`npm run build`
   - 配置输出目录：`dist`

2. **Vercel**
   - Add New Project
   - 选择 GitHub 并授权
   - 选择你的仓库
   - Framework Preset: `Vite`
   - 自动检测配置，点击 Deploy

---

## 📝 常用 Git 命令

```bash
# 查看状态
git status

# 查看提交历史
git log

# 查看远程仓库
git remote -v

# 拉取最新代码
git pull

# 查看分支
git branch
```

---

## 🆘 常见问题

### 问题 1: 推送被拒绝
```bash
# 如果远程仓库有内容，先拉取
git pull origin main --allow-unrelated-histories

# 然后推送
git push -u origin main
```

### 问题 2: 忘记添加远程仓库
```bash
# 查看当前远程仓库
git remote -v

# 如果没有，添加
git remote add origin <your-repo-url>

# 如果 URL 错误，更新
git remote set-url origin <new-repo-url>
```

### 问题 3: 想重新开始
```bash
# 删除远程连接
git remote remove origin

# 重新添加
git remote add origin <your-repo-url>
```

