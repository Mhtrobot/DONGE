import Header from "../Componnets/Header";
import Footer from "../Componnets/Footer";
import GroupImage from "../Image/Group.png";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Notifications() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState({
    sentRequests: [],
    recievedRequests: [],
  });

  const token = localStorage.getItem("token");
  const groupId = localStorage.getItem("group");

  async function loadUser(token) {
    try {
      const response = await axios.get(
        "https://dongapi.phaedra.ir/IAM/user-auth/validate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      localStorage.clear();
      navigate("/");
    }
  }

  async function groupRequest(token) {
    try {
      const response = await axios.get(
        "https://dongapi.phaedra.ir/CORE/groupRequest/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
      console.log(response.data);
    } catch (error) {}
  }

  async function deleteRequest(id) {
    try {
      const resp = await axios.delete(
        `https://dongapi.phaedra.ir/CORE/groupRequest/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      groupRequest(JSON.parse(token), JSON.parse(groupId));
    } catch (error) {
      if (error.response) {
        console.error("Delete failed:", error.response.data);
      } else {
        console.error("Delete error:", error);
      }
    }
  }
  async function acceptRequest(id) {
    try {
      const resp = await axios.put(
        `https://dongapi.phaedra.ir/CORE/groupRequest/accept/${id}`,
        { isAccepted: true },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      console.log(resp);
      //deleteRequest(JSON.parse(groupId));
      groupRequest(JSON.parse(token), JSON.parse(groupId));
    } catch (error) {}
  }

  useEffect(() => {
    groupRequest(JSON.parse(token));
    loadUser(JSON.parse(token));
  }, []);

  return (
    <>
      <Header enableMenu={true} currentMenu={4} />
      <div className="flex flex-col gap-4 font-iranyekan justify-center items-center mt-20">
        {requests?.sentRequests?.map((req) => (
          <div
            key={req.sentRequest.id}
            className=" bg-slate-300 rounded-xl w-2/3 p-3 hover:bg-slate-400 duration-150 hover:scale-[1.01]"
          >
            <div className="flex justify-between items-center">
              <div>
                <button
                  className="bg-red-300 rounded-lg duration-200 flex justify-center items-center gap-2 px-2 py-1 hover:bg-red-100 hover:scale-110"
                  onClick={() => deleteRequest(req.sentRequest.id)}
                >
                  <span className="max-sm:hidden flex">حذف</span>
                  <svg
                    className="w-9"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="flex justify-end items-center">
                <div className="flex flex-col justify-center items-end ">
                  <h1 className="font-black text-2xl">{req.group.name}</h1>
                  <h1 className="font-medium text-xl">
                    {req.group.description}
                  </h1>
                </div>
                <div className="w-16">
                  <img src={GroupImage} alt="" />
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse mr-16 max-sm:mr-0">
              <h1 className="font-normal text-sm">
                ارسال شد برای : {req.reciever.name} ({req.reciever.phone})
              </h1>
            </div>
          </div>
        ))}
        {requests?.recievedRequests?.map((req) => (
          <div
            key={req.recievedRequest.id}
            className=" bg-panelColor rounded-xl w-2/3 p-3 hover:bg-panelHover duration-150 hover:scale-[1.01]"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  className="bg-red-300 rounded-lg duration-200 flex justify-center items-center gap-2 px-2 py-1 hover:bg-red-100 hover:scale-110"
                  onClick={() => deleteRequest(req.recievedRequest.id)}
                >
                  <span className="max-sm:hidden flex">حذف</span>
                  <svg
                    className="w-9"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </button>
                <button
                  className="bg-green-300 flex justify-center items-center gap-2 px-2 py-1 rounded-lg duration-200 hover:bg-green-100 hover:scale-110"
                  onClick={() => {
                    acceptRequest(req.recievedRequest.id);
                    deleteRequest(req.recievedRequest.id);
                  }}
                >
                  <span className="max-sm:hidden flex">تـایید</span>
                  <svg
                    className="w-9 p-0.5"
                    viewBox="0 0 24 24"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="circleOkIconTitle"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    color="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title id="circleOkIconTitle">OK</title>
                      <polyline points="7 13 10 16 17 9"></polyline>
                      <circle cx="12" cy="12" r="10"></circle>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="flex justify-end items-center">
                <div className="flex flex-col justify-center items-end ">
                  <h1 className="font-black text-2xl">{req.group.name}</h1>
                  <h1 className="font-medium text-xl">
                    {req.group.description}
                  </h1>
                </div>
                <div className="w-16">
                  <img src={GroupImage} alt="" />
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse mr-16 max-sm:mr-0">
              <h1 className="font-normal text-sm">
                ارسال شده از طرف : {req.sender.name} ({req.sender.phone})
              </h1>
            </div>
          </div>
        ))}
      </div>
      <Footer currentMenu={4} />
    </>
  );
}
