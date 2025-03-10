import fetch from 'node-fetch';

const testSaveAttendance = async () => {
  try {
    console.log('Testing attendance save API...');
    
    // Create test data with string IDs
    const testData = {
      date: new Date().toISOString().split('T')[0],
      students: [
        {
          id: "67c5e412a9092abc43bd8bf5", // Example MongoDB ObjectID
          name: "Test Student 1",
          present: true
        },
        {
          id: "67c5e412a9092abc43bd8bf6", // Example MongoDB ObjectID
          name: "Test Student 2",
          present: false
        }
      ]
    };
    
    console.log('Sending test data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:5000/api/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    try {
      const data = JSON.parse(responseText);
      console.log('Parsed response:', JSON.stringify(data, null, 2));
      
      if (data.success) {
        console.log('✅ Test passed: Attendance saved successfully');
      } else {
        console.log('❌ Test failed: Server returned error:', data.message);
      }
    } catch (e) {
      console.error('❌ Test failed: Could not parse response as JSON:', e);
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
};

// Run the test
testSaveAttendance(); 