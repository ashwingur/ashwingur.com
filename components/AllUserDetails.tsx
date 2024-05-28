// Import necessary dependencies
import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAuth } from "./AuthContext";

// Define interface for User object
interface User {
  id: number;
  username: string;
  role: string;
  date_registered: string;
  last_login: string | null;
}

// Define endpoint URL
const USERS_ENDPOINT = process.env.NEXT_PUBLIC_ASHWINGUR_API + "/users";

function convertToShortLocalDateTime(datetimeString: string) {
  const date = new Date(datetimeString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  return date.toLocaleDateString("en-GB", options).replace(/,/g, " ");
}

// Component to fetch and display users
const UserList: React.FC = () => {
  const { user } = useAuth();
  // Fetch users query
  const { isLoading, data } = useQuery<User[]>("users", async () => {
    const response = await fetch(USERS_ENDPOINT, { credentials: "include" });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-center mb-2">User Dashboard</h2>
      <ul className="">
        <li className={`flex px-2 md:px-4 font-bold dark:bg-black py-1`}>
          <div className="md:w-1/5 w-1/4">ID</div>
          <div className="md:w-1/5 w-2/4">Username</div>
          <div className="hidden md:block md:w-1/5">Registered</div>
          <div className="hidden md:block md:w-1/5">Last Login</div>
          <div className="md:w-1/5 w-1/4">Role</div>
        </li>
        {data?.map((user_element, index) => {
          let bg_colour =
            index % 2 == 0 ? "bg-stone-200 dark:bg-slate-700" : "";
          if (user_element.username === user) {
            bg_colour = "bg-green-200 dark:bg-green-800";
          }
          return (
            <li key={index} className={`flex px-2 py-1 md:px-4 ${bg_colour}`}>
              <div className="md:w-1/5 w-1/4">{user_element.id}</div>
              <div className="md:w-1/5 w-1/2">{user_element.username}</div>
              <div className="hidden md:block md:w-1/5">
                {convertToShortLocalDateTime(user_element.date_registered)}
              </div>
              <div className="hidden md:block md:w-1/5">
                {user_element.last_login
                  ? convertToShortLocalDateTime(user_element.last_login)
                  : "N/A"}
              </div>
              <div className="md:w-1/5 w-1/4">{user_element.role}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Component to add a new user
const AddUser: React.FC = () => {
  const queryClient = useQueryClient();
  // Mutation to add a new user
  const addUserMutation = useMutation(
    (newUserData: { username: string; password: string; role: string }) =>
      fetch(USERS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
        credentials: "include",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUserData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as string,
    };
    await addUserMutation.mutateAsync(newUserData);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="mb-2">Add User</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-2 items-center"
      >
        <div className="flex items-center">
          <label htmlFor="username" className="w-24">
            Username
          </label>
          <input
            className="rounded-md dark:bg-slate-800 py-1 px-2"
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="password" className="w-24">
            Password
          </label>
          <input
            className="rounded-md dark:bg-slate-800 py-1 px-2"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="role" className="w-24">
            Role
          </label>
          <input
            className="rounded-md dark:bg-slate-800 py-1 px-2"
            type="text"
            id="role"
            name="role"
            required
          />
        </div>
        <button
          type="submit"
          disabled={addUserMutation.isLoading}
          className="w-36 bg-blue-200 dark:bg-[#2e1065] p-2 rounded-md hover:bg-blue-400 dark:hover:bg-violet-800 transition-all"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

// Component to delete a user
const DeleteUser: React.FC = () => {
  const [userId, setUserId] = React.useState("");

  const queryClient = useQueryClient();

  // Mutation to delete a user
  const deleteUserMutation = useMutation(
    (userId: string) =>
      fetch(USERS_ENDPOINT, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
        credentials: "include",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await deleteUserMutation.mutateAsync(userId);
  };

  return (
    <div>
      <h2 className="mb-2 text-center">Delete User</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-2 items-center"
      >
        <div className="flex items-center">
          <label htmlFor="userId" className="w-24">
            User ID
          </label>
          <input
            className="rounded-md dark:bg-slate-800 py-1 px-2"
            type="text"
            id="userId"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={deleteUserMutation.isLoading}
          className="w-36 bg-blue-200 dark:bg-[#2e1065] p-2 rounded-md hover:bg-blue-400 dark:hover:bg-violet-800 transition-all"
        >
          Delete User
        </button>
      </form>
    </div>
  );
};

// Main component
const AllUserDetails: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center bg-stone-100 dark:bg-slate-900 p-4 md:p-8 rounded-lg w-11/12 md:w-3/4 md:px-12 shadow-lg">
      <UserList />
      <AddUser />
      <DeleteUser />
    </div>
  );
};

export default AllUserDetails;
