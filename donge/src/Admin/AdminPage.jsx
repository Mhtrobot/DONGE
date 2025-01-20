import axios from "axios";
import logo from "../Image/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminPage() {
  return (
    <>
      <div className="fixed right-0 w-full top-0 z-10">
        <div className="flex justify-center items-center bg-blue-200 h-16 px-8 font-iranyekan font-medium">
          <div>
            {/* Logo APP */}
            <img src={logo} alt="Logo Image" className="w-48" />
          </div>
        </div>
      </div>
    </>
  );
}
