import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { setCredentials } from "@/Redux/features/auth/authSlice";
import { useProfileMutation } from "@/Redux/api/userApiSlice";
import UpdateProfileModal from "./UpdateProfileModal";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const [updateProfile] = useProfileMutation();
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
        <p className="mb-2"><strong>Name:</strong> {userInfo.username}</p>
        <p className="mb-4"><strong>Email:</strong> {userInfo.email}</p>

        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Update Profile
          </button>

          <Link
            to="/user-orders"
            className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
          >
            Order History
          </Link>
        </div>
      </div>

      <UpdateProfileModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        userInfo={userInfo}
        updateProfile={updateProfile}
        dispatch={dispatch}
        setCredentials={setCredentials}
      />
    </div>
  );
};

export default Profile;
