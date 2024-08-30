"use client";

import {
  useUserQuery,
  useUsersCreatedByAdminQuery,
} from "@/src/hooks/useUserQueries";
import Sidebar from "@/src/components/sidebar/Sidebar";
import { User, columns } from "./columns";
import { DataTable } from "@/src/components/usertable/data-table";

const UserDetail = () => {
  const { data: userData, isLoading, error: fetchError } = useUserQuery();

  const {
    data: usersCreatedByAdmin = [],
    isLoading: isUsersLoading,
    error: usersFetchError,
  } = useUsersCreatedByAdminQuery();

  const mappedUsers = usersCreatedByAdmin.map((user: any) => ({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
  })) as User[];

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
            <DataTable<User, unknown> columns={columns} data={mappedUsers} />
          )}
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
