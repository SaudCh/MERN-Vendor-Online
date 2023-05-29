import React from "react";

export default function SuccessAlert({ success }) {
  return success ? (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2"
      role="alert"
    >
      <strong className="font-bold">Success! </strong>
      <span className="block sm:inline">{success}</span>
    </div>
  ) : null;
}
