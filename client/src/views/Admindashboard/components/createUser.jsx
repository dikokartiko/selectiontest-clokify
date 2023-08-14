import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const CreateUserForm = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    fullname: "",
    birthdate: "",
    joinDate: "",
    address: "",
    phoneNumber: "",
    salaryAmount: "",
    status: 1,
    roleId: 2,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("User created successfully!");
        setNewUser({
          email: "",
          password: "",
          fullname: "",
          birthdate: "",
          joinDate: "",
          address: "",
          phoneNumber: "",
          salaryAmount: "",
          status: 1,
          roleId: 2,
        });
        setErrorMessage("");
      } else {
        // Display error toast
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="p-4 bg-slate-300 rounded-md">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="relative">
          <label className="block mb-1">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md pr-16"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div>
          <label className="block mb-1">Full Name:</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={newUser.fullname}
            onChange={(e) =>
              setNewUser({ ...newUser, fullname: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Birthdate:</label>
          <input
            placeholder="Enter Birth Date"
            type="text"
            value={newUser.birthdate}
            onChange={(e) =>
              setNewUser({ ...newUser, birthdate: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">salaryAmount:</label>
          <input
            type="number"
            value={newUser.salaryAmount}
            onChange={(e) =>
              setNewUser({ ...newUser, salaryAmount: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Join Date:</label>
          <input
            placeholder="Enter Join Date"
            type="text"
            value={newUser.joinDate}
            onChange={(e) =>
              setNewUser({ ...newUser, joinDate: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Address:</label>
          <input
            placeholder="Enter Address"
            type="text"
            value={newUser.address}
            onChange={(e) =>
              setNewUser({ ...newUser, address: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">phoneNumber:</label>
          <input
            placeholder="Enter Phone Number"
            type="text"
            value={newUser.phoneNumber}
            onChange={(e) =>
              setNewUser({ ...newUser, phoneNumber: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleCreateUser}
          className="w-full py-2 mt-4 text-lg font-bold text-white bg-teal-500 rounded-md hover:bg-teal-700">
          Create Employee
        </button>
      </div>
    </div>
  );
};

export default CreateUserForm;
