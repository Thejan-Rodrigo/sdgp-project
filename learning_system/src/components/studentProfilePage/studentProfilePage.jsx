const StudentProfile = () => {
    const studentData = {
      name: "Emma Smith",
      class: "10-A",
      rollNumber: "2023001",
      age: "15",
      gender: "Female",
      contact: {
        parentName: "John Smith",
        phone: "(555) 123-4567",
        email: "john.smith@email.com",
        address: "123 Education Street, Learning City, LC 12345",
      },
      attendance: [
        { month: "September", percentage: "50.3", present: "22", total: "24" },
        { month: "October", percentage: "90.9", present: "20", total: "22" },
        { month: "November", percentage: "91.3", present: "21", total: "23" },
      ],
      progress: [
        {
          teacher: "Mrs. Sarah Wilson",
          subject: "Mathematics",
          message:
            "Emma shows excellent understanding of advanced algebra concepts. Her problem-solving skills have improved significantly.",
          date: "2023-11-15",
        },
        {
          teacher: "Mr. Robert Johnson",
          subject: "Physics",
          message: "Good participation in class discussions. Need to focus more on practical experiments.",
          date: "2023-11-12",
        },
        {
          teacher: "Ms. Emily Davis",
          subject: "English",
          message: "Excellent essay writing skills. Shows creative thinking in literature analysis.",
          date: "2023-11-10",
        },
      ],
    }
  
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r">
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-blue-600">📚</span> EduTeach
            </h1>
          </div>
          <div className="p-2">
            <div className="flex items-center gap-3 p-2 rounded-lg">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(957)-5e3TmHrDL3HXRTMv5sjmO9Udl51G7a.png"
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="font-medium">{studentData.name}</div>
                <div className="text-sm text-gray-500">Class {studentData.class}</div>
              </div>
            </div>
            <nav className="mt-4 space-y-1">
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                📢 Announcements
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                📅 Meeting Schedule
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-blue-600 bg-blue-50 rounded-md">
                👤 Student Profile
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                📊 Learning Progress
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                ❓ Q&A
              </a>
            </nav>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Student Profile</h2>
            <div className="flex items-center gap-4">
              <select className="border rounded-md px-3 py-1.5">
                <option>Class 10-A</option>
              </select>
              <button className="text-gray-600">🔔</button>
            </div>
          </header>
  
          <main className="p-6">
            {/* Profile Info */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex gap-6">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(957)-5e3TmHrDL3HXRTMv5sjmO9Udl51G7a.png"
                  alt=""
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-2xl font-semibold mb-4">{studentData.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500">Class:</span> {studentData.class}
                    </div>
                    <div>
                      <span className="text-gray-500">Roll Number:</span> {studentData.rollNumber}
                    </div>
                    <div>
                      <span className="text-gray-500">Age:</span> {studentData.age}
                    </div>
                    <div>
                      <span className="text-gray-500">Gender:</span> {studentData.gender}
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Contact & Address */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-medium mb-4">Contact Information</h4>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-500">Parent Name:</span> {studentData.contact.parentName}
                  </p>
                  <p>
                    <span className="text-gray-500">Phone:</span> {studentData.contact.phone}
                  </p>
                  <p>
                    <span className="text-gray-500">Email:</span> {studentData.contact.email}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-medium mb-4">Address</h4>
                <p>{studentData.contact.address}</p>
              </div>
            </div>
  
            {/* Attendance */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-medium mb-4">Attendance Overview</h4>
              <div className="grid md:grid-cols-3 gap-6">
                {studentData.attendance.map((month) => (
                  <div key={month.month}>
                    <div className="flex justify-between mb-2">
                      <span>{month.month}</span>
                      <span>{month.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${month.percentage}%` }} />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Present: {month.present} / {month.total} days
                    </p>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Progress Messages */}
            <div className="bg-white rounded-lg p-6">
              <h4 className="text-lg font-medium mb-4">Progress Messages</h4>
              <div className="space-y-4">
                {studentData.progress.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0" />
                    <div>
                      <div className="flex justify-between">
                        <div>
                          <h5 className="font-medium">{item.teacher}</h5>
                          <p className="text-sm text-gray-500">{item.subject}</p>
                        </div>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <p className="mt-2 text-gray-600">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
  
  export default StudentProfile
  
  