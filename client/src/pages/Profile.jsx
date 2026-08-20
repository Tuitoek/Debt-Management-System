import { useAuth } from "../context/AuthContext";
import React from "react";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex flex-col gap-2">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        {user.phone_number && (
          <p>
            <span className="font-semibold">Phone:</span> {user.phone_number}
          </p>
        )}
      </div>

      <button
        onClick={logout}
        className="mt-6 w-full p-2 bg-red-700 text-white rounded font-bold"
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
