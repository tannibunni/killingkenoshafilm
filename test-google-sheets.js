/**
 * 测试 Google Sheets Web App 连接
 * 
 * 使用方法：
 * node test-google-sheets.js
 */

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxrgfwixTrnp4BtmgLTCOtMnW8E6OI-dfBbdcVNaLXMBzqIaQkUOA_bZsJBuaru0h-U/exec';

async function testGoogleSheets() {
  console.log('Testing Google Sheets Web App...');
  console.log('URL:', WEB_APP_URL);
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from the script'
  };
  
  try {
    console.log('\nSending test data:', testData);
    
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log('\nResponse status:', response.status);
    console.log('Response type:', response.type);
    console.log('\nNote: With no-cors mode, we cannot read the response body.');
    console.log('Please check your Google Sheet to see if the data was saved.');
    
  } catch (error) {
    console.error('\nError:', error);
  }
}

testGoogleSheets();

