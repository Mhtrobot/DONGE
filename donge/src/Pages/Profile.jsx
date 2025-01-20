import Header from "../Componnets/Header";
import Footer from "../Componnets/Footer";
import GroupImage from "../Image/Group.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { data, Navigate, useNavigate } from "react-router-dom";
import moment from "moment-jalaali";

export default function Profile() {
  const [userinfo, setuserinfo] = useState(Object);
  const [userCards, setuserCards] = useState(Object | { cards: [] });
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState(null);
  async function showImage(token) {
    try {
      const resp = await axios.get(
        `https://dongapi.phaedra.ir/MEDIA/media/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      console.log(resp);

      const blob = new Blob([resp.data]);
      const objectUrl = URL.createObjectURL(blob);
      setPreviewUrl(objectUrl);
    } catch (error) {
      console.log(error);
    }
  }

  const convertToJalali = (gregorianDate) => {
    return moment(gregorianDate).format("jYYYY/jMM/jDD HH:mm");
  };

  async function loadUser(token) {
    try {
      const response = await axios.get("https://dongapi.phaedra.ir/IAM/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setuserinfo(response.data.data);
    } catch (error) {
      localStorage.clear();
      navigate("/");
    }
  }

  async function cards(token) {
    try {
      const resp = await axios.get("https://dongapi.phaedra.ir/CORE/cards/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setuserCards(resp.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteCard(id) {
    const value = localStorage.getItem("token");
    try {
      const resp = await axios.delete(
        `https://dongapi.phaedra.ir/CORE/cards/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(value)}`,
          },
        }
      );
      cards(JSON.parse(value));
    } catch (error) {
      if (error.response) {
        console.error("Delete failed:", error.response.data);
      } else {
        console.error("Delete error:", error);
      }
    }
  }

  async function logOut() {
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    const value = localStorage.getItem("token");
    loadUser(JSON.parse(value));
    cards(JSON.parse(value));
    showImage(JSON.parse(value));
  }, []);

  return (
    <>
      <div>
        <Header enableMenu={true} currentMenu={3} />
        <div>
          <div>
            <div className="flex flex-col justify-center items-center mt-20 font-iranyekan">
              <div className="bg-gray-50 drop-shadow-md rounded-xl w-4/5 px-4">
                <div className="flex flex-row-reverse justify-between items-center">
                  <div className="flex justify-end items-center">
                    <div className="text-right">
                      <h1 className="font-black text-3xl">{userinfo.name}</h1>
                      <h3 className="font-medium text-lg">{userinfo.phone}</h3>
                    </div>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-20 h-20 p-2 rounded-full flex object-cover justify-center items-center"
                      />
                    ) : (
                      <img src={GroupImage} alt="" className="w-28" />
                    )}
                  </div>
                  <button className="bg-gray-100 p-1 rounded-lg drop-shadow-md hover:scale-110 duration-150">
                    <a
                      href="/EditName"
                      className="flex flex-row-reverse justify-center items-center gap-2"
                    >
                      <svg
                        className="w-8"
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
                          {" "}
                          <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                          <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      <p className="font-medium text-sm">ویرایش</p>
                    </a>
                  </button>
                </div>
                {/*  */}
                <div className="flex justify-end items-center pr-6">
                  <div className="text-right">
                    <div className=" flex justify-start flex-row-reverse gap-5">
                      <h1 className="font-black text-2xl">: بدهکـــاری</h1>
                      <h1 className="font-medium text-2xl">{userinfo.owes}</h1>
                    </div>
                    <div className=" flex justify-start flex-row-reverse gap-5 my-3">
                      <h1 className="font-black text-2xl">: بستانکاری</h1>
                      <h1 className="font-medium text-2xl">{userinfo.debts}</h1>
                    </div>
                    <div className=" flex justify-start flex-row-reverse gap-5 my-3 text-gray-500">
                      <h1 className="font-medium text-lg">: تاریخ عضویت</h1>
                      <h1 className="font-medium text-lg">
                        {convertToJalali(userinfo.createdAt)}
                      </h1>
                    </div>
                  </div>
                </div>
                {/*  */}
              </div>
              {/* ------------------------------------ */}
              <div className="bg-gray-50 drop-shadow-md rounded-xl w-4/5 py-5 mt-5 px-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col justify-center items-center">
                    {/*  */}
                    <div className="flex justify-center items-center">
                      <div className="text-center">
                        <div className=" flex justify-start flex-row-reverse gap-5">
                          <h1 className="font-medium text-2xl">
                            {userCards.message}
                          </h1>
                        </div>
                        {userCards?.cards?.map((card) => (
                          <div
                            key={card.id}
                            className=" flex justify-start flex-row-reverse gap-5"
                          >
                            <h1 className="font-medium flex justify-end items-center text-xl w-32 text-end">
                              {card.cardName}
                            </h1>
                            <h1 className="font-medium flex justify-center items-center text-xl w-48 text-center">
                              {card.cardPan}
                            </h1>
                            <button
                              className="bg-slate-200 rounded-lg duration-200 hover:bg-red-100 hover:scale-110"
                              onClick={() => deleteCard(card.id)}
                            >
                              <svg
                                className="w-9"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                  ></path>{" "}
                                </g>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/*  */}
                  </div>
                  <a
                    href="/addCard"
                    className="bg-gray-100 p-1 rounded-lg drop-shadow-md hover:bg-gray-200 duration-150"
                  >
                    <div className="flex flex-row-reverse justify-center items-center gap-2">
                      <svg
                        className="w-8"
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
                          {" "}
                          <path
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                          <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      <p className="font-medium text-sm">ثبت شماره کارت</p>
                    </div>
                  </a>
                </div>
              </div>
              {/* -------------------------------------------- */}
              <button
                onClick={logOut}
                className="flex flex-row-reverse justify-start gap-5 items-center bg-gray-50 rounded-xl w-4/5 px-4 py-2 mt-8 hover:bg-gray-200 hover:scale-105 duration-150 hover:drop-shadow-md"
              >
                <svg
                  className="w-14"
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
                    {" "}
                    <g id="Interface / Exit">
                      {" "}
                      <path
                        id="Vector"
                        d="M12 15L15 12M15 12L12 9M15 12H4M4 7.24802V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2839 4.21799 18.9076C4 18.4798 4 17.9201 4 16.8V16.75"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <p className="font-medium text-2xl">خروج</p>
              </button>
            </div>

            {/* -------------------------- */}
          </div>
        </div>
        <Footer currentMenu={3} />
      </div>
    </>
  );
}
