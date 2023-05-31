import React, { useContext, useEffect } from "react";
import { LoadingContext } from "../../contexts/loadingContext";

const columns = [
  { headerName: "Name" },

  {
    headerName: "Email",
  },
  {
    headerName: "Memership",
  },
  {
    headerName: "Action",
  },
];
export default function UserTable({ data, toggleBlock }) {


  return (
    <div>
      <div className="block py-2   mx-1 md:mx-2 rounded-md">
        <div className="flex justify-center">
          <table>
            <thead>
              {columns.map((column, index) => (
                <th key={index}>{column.headerName}</th>
              ))}
            </thead>
            <tbody>
              {
                data.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="text-center">
                      No data found
                    </td>
                  </tr>
                )
              }
              {
                data.map((user, index) => (
                  <tr key={index}>
                    <td data-label="id">{user?.name}</td>
                    <td data-label="date">{user?.email}</td>
                    <td data-label="name" className=" capitalize">{user?.plan}</td>
                    <td data-label="price">
                      <button
                        onClick={() => toggleBlock(user.id, !user.isBlocked)}
                        className={`${user?.isBlocked ? "bg-secondary-500 hover:bg-secondary-700" : "bg-red-500 hover:bg-red-700"} text-white py-1 px-2 rounded`}>
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
