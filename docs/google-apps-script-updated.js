/**
 * Google Apps Script for Contact Form (Updated Version)
 * 
 * 使用方法：
 * 1. 在 Google Sheet 中，点击 Extensions > Apps Script
 * 2. 删除旧代码，粘贴此代码
 * 3. 保存并重新部署为 Web App
 * 4. 确保部署时选择 "Anyone" 访问权限
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 检查参数是否存在
    if (!e) {
      throw new Error('No request data received');
    }
    
    // 解析数据
    let data;
    
    // 方法 1: 处理 JSON 数据 (Content-Type: application/json)
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        Logger.log('JSON parse error: ' + parseError.toString());
        throw new Error('Invalid JSON data');
      }
    }
    // 方法 2: 处理 URL 编码的表单数据 (Content-Type: application/x-www-form-urlencoded)
    else if (e.parameter) {
      data = {
        name: e.parameter.name || '',
        email: e.parameter.email || '',
        message: e.parameter.message || ''
      };
    }
    // 方法 3: 处理原始数据
    else if (e.postData && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    }
    else {
      Logger.log('Request structure: ' + JSON.stringify(e));
      throw new Error('No valid data format found. Received: ' + JSON.stringify(e));
    }
    
    // 验证数据
    if (!data || (!data.name && !data.email && !data.message)) {
      throw new Error('Invalid data: name, email, or message is required');
    }
    
    // 添加新行：Timestamp, Name, Email, Message
    sheet.appendRow([
      new Date(), // Timestamp
      data.name || '',
      data.email || '',
      data.message || ''
    ]);
    
    Logger.log('Data saved successfully: ' + JSON.stringify(data));
    
    // 返回成功响应（CORS 支持）
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    Logger.log('Request data: ' + JSON.stringify(e));
    
    // 返回错误响应
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Google Sheets API is running');
}

