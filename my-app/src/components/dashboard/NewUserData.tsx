"use client";

import React from "react";
import {
  useUserQuery,
  useUsersCreatedByAdminQuery,
} from "@/src/hooks/useUserQueries";

const NewUserData = () => {
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
    <div>
      <div className="bg-gray-600 py-5 px-5 flex justify-center items-center">
        <h2 className="text-xl mb-4 text-white font-bold ">
          Users Created by You
        </h2>
      </div>
      <div className="py-4">
        {" "}
        <ul>
          {isUsersLoading ? (
            <div>Loading users....</div>
          ) : (
            usersCreatedByAdmin.map((user: any) => (
              <li key={user.id}>
                <div>
                  <label>First Name :</label>
                  {user.firstname}
                </div>

                <div>
                  <label>Last Name :</label>
                  {user.lastname}
                </div>

                <div>
                  <label>Email :</label>
                  {user.email}
                </div>

                <div>
                  {" "}
                  <label>Password :</label>
                  {user.password}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default NewUserData;
