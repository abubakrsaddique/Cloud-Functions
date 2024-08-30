"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DocumentData } from "firebase/firestore";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { EditProfileDialog } from "@/src/components/Dialog/EditProfileDialog";
import { DeleteProfileDialog } from "@/src/components/Dialog/DeleteProfileDialog";

export interface User extends DocumentData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profileImageUrl?: string;
}

const getInitialsColor = (initials: string) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  const index = initials.charCodeAt(0) % colors.length;
  return colors[index];
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FirstName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastname",
    header: "LastName",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    header: "Profile Image",
    cell: ({ row }) => {
      const user = row.original;
      const initials = `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`;
      const bgColor = getInitialsColor(initials);

      return (
        <Avatar>
          <AvatarImage src={user.profileImageUrl} />
          <AvatarFallback
            className={`flex items-center justify-center text-white ${bgColor}`}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const User = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(User.firstname)}
            >
              Copy User First Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <EditProfileDialog />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteProfileDialog />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
