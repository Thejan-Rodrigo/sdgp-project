import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api/attendance';

const testGetAttendance = async () => {
  try {
    console.log('Testing GET /api/attendance...');
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error Response:', errorText);
      throw new Error(`Failed to fetch attendance: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('GET Response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error testing GET /api/attendance:', error.message);
  }
};

const testPostAttendance = async () => {
  try {
    const testData = {
      date: '2025-03-04',
      students: [
        { id: 1, name: 'John Smith', present: false },
        { id: 2, name: 'Jane Doe', present: true },
        { id: 3, name: 'Michael Johnson', present: false },
        { id: 4, name: 'Emily Williams', present: true },
        { id: 5, name: 'David Brown', present: true }
      ]
    };
    
    console.log('Testing POST /api/attendance...');
    console.log('Request Body:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error Response:', errorText);
      throw new Error(`Failed to save attendance: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('POST Response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error testing POST /api/attendance:', error.message);
  }
};

// Run the tests
const runTests = async () => {
  console.log('=== Testing Attendance API ===');
  
  // Test GET endpoint
  await testGetAttendance();
  
  // Test POST endpoint
  await testPostAttendance();
  
  // Test GET again to verify the changes
  await testGetAttendance();
  
  console.log('=== Tests Completed ===');
};

runTests(); 