import React from "react";
import { MoreVertical } from "lucide-react";

const ChatHeaderS = ({ admin }) => {
  // Ensure admin exists and has a name
  const adminName = admin?.name || "Unknown Admin";
  const adminInitials = admin?.name
    ? admin.name.split(" ").map((n) => n[0]).join("")
    : "?";

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-semibold">{adminInitials}</span>
        </div>
        <div>
          <h3 className="font-semibold">{adminName}</h3>
          <p className="text-sm text-gray-600">{admin?.subject || "No Subject"}</p>
        </div>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <MoreVertical size={20} className="text-gray-600" />
      </button>
    </div>
  );
};

export default ChatHeaderS;
