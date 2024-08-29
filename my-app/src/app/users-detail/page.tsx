"use client";

import React from "react";
import {
  useUserQuery,
  useUsersCreatedByAdminQuery,
} from "@/src/hooks/useUserQueries";
import Sidebar from "@/src/components/sidebar/Sidebar";

const UserDetail = () => {
  const { data: userData, isLoading, error: fetchError } = useUserQuery();

  const {
    data: usersCreatedByAdmin = [],
    isLoading: isUsersLoading,
    error: usersFetchError,
  } = useUsersCreatedByAdminQuery();

  if (usersFetchError)
    return <div>Error fetching users: {usersFetchError.message}</div>;
  if (!userData) return <div>No user data found.</div>;

  return (
    <div className="flex min-h-screen h-full">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl text-black font-bold mb-4">
          Users Created By Admin
        </h1>

        <div className="overflow-x-auto">
          {isUsersLoading ? (
            <div>Loading users....</div>
          ) : (
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">First Name</th>
                  <th className="py-3 px-6 text-left">Last Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Password</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {usersCreatedByAdmin.map((user: any) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {user.firstname}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {user.lastname}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {user.password}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
