"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#303030",
          color: "#FFFFFF",
          borderRadius: "6px",
          padding: "12px 16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: "#FFFFFF",
          },
          style: {
            border: "1px solid #10B981",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#FFFFFF",
          },
          style: {
            border: "1px solid #EF4444",
          },
        },
        loading: {
          iconTheme: {
            primary: "#E02020",
            secondary: "#FFFFFF",
          },
          style: {
            border: "1px solid #3B82F6",
          },
        },
      }}
    />
  );
}
