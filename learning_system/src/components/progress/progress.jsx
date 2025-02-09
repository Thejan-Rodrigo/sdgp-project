"use client"

import { useState } from "react"

function Progress() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A")

  const students = [
    {
      id: 1,
      name: "Alex Thompson",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(952)-0d8I8KW1K4C2w7ViMHOoKddbVCuIwJ.png",
      status: "On Track",
      lastUpdate: "2 hours ago",
    },
    {
      id: 2,
      name: "Emily Parker",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(952)-0d8I8KW1K4C2w7ViMHOoKddbVCuIwJ.png",
      status: "Needs Attention",
      lastUpdate: "1 day ago",
    },
    {
      id: 3,
      name: "Michael Chen",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(952)-0d8I8KW1K4C2w7ViMHOoKddbVCuIwJ.png",
      status: "Improving",
      lastUpdate: "3 days ago",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(952)-0d8I8KW1K4C2w7ViMHOoKddbVCuIwJ.png",
      status: "Outstanding",
      lastUpdate: "1 week ago",
    },
  ]

  const progressHistory = [
    {
      date: "Dec 15, 2023",
      type: "Positive",
      message: "Excellent participation in class discussion. Shows deep understanding of geometric concepts.",
    },
    {
      date: "Dec 10, 2023",
      type: "Positive",
      message: "Completed all homework assignments with high accuracy. Keep up the good work!",
    },
    {
      date: "Dec 5, 2023",
      type: "Improvement",
      message: "Needs to focus more on showing work in problem-solving steps.",
    },
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800"
      case "Needs Attention":
        return "bg-red-100 text-red-800"
      case "Improving":
        return "bg-yellow-100 text-yellow-800"
      case "Outstanding":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b">
          <span className="text-2xl">🎓</span>
          <span className="font-semibold">EduTeach</span>
        </div>

        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(952)-0d8I8KW1K4C2w7ViMHOoKddbVCuIwJ.png"
              alt="Teacher avatar"
              className="h-12 w-12 rounded-full"
            />
            <div>
              <div className="font-medium">Sarah Wilson</div>
              <div className="text-sm text-gray-600">Mathematics</div>
              <div className="text-sm text-gray-600">Teacher</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          {["📢 Announcement", "📅 Meeting", "👥 Attendance", "📚 Lessons", "📈 Progress", "❓ Q&A"].map((item) => (
            <a
              key={item}
              href="#"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                item.includes("Progress") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t">
          <a href="#" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            ❔ Help & Support
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 h-14">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Student Progress</h1>
              <select
                className="border rounded-md px-3 py-1"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option>Class 10-A</option>
                <option>Class 10-B</option>
                <option>Class 10-C</option>
              </select>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">🔔</button>
          </div>
          <div className="px-6 py-4 border-t flex items-center justify-between gap-4">
            <input type="text" placeholder="Search students..." className="border rounded-md px-3 py-2 w-80" />
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Filter</button>
          </div>
        </header>

        <div className="flex-1 flex bg-white">
          {/* Student List */}
          <div className="w-[400px] border-r">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Students</h2>
            </div>
            <div className="overflow-auto h-[calc(100vh-11rem)]">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-3 p-3 mx-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    src={student.image || "/placeholder.svg"}
                    alt={student.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.lastUpdate}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(student.status)}`}>
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Details */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Progress Details</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Progress</button>
            </div>
            <div className="text-sm text-gray-600 mb-4">Add progress notes for Alex Thompson</div>
            <div className="space-y-4">
              <textarea
                placeholder="Write your progress note here..."
                className="w-full min-h-[100px] p-3 border rounded-md"
              />
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md hover:bg-gray-50">
                  📎 Attach file
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Progress History</h3>
              <div className="space-y-4 overflow-auto h-[calc(100vh-26rem)]">
                {progressHistory.map((item, i) => (
                  <div key={i} className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-medium">{item.date}</div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === "Positive" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress

