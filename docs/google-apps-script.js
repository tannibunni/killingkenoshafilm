/**
 * Google Apps Script for Contact Form
 * 
 * 使用方法：
 * 1. 在 Google Sheet 中，点击 Extensions > Apps Script
 * 2. 粘贴此代码
 * 3. 保存并部署为 Web App
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // 添加新行：Timestamp, Name, Email, Message
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
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Google Sheets API is running');
}

