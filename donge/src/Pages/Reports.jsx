import Header from "../Componnets/Header";
import Footer from "../Componnets/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GroupImage from "../Image/Group.png";

export default function Reports() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [report, setReport] = useState(Object);

  useEffect(() => {
    loadUser(JSON.parse(token));
    groupRequest(JSON.parse(token));
  }, []);

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
        "https://dongapi.phaedra.ir/CORE/payDues/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReport(response.data);
      console.log(response.data);
    } catch (error) {}
  }
  async function payRequest(id) {
    try {
      const resp = await axios.put(
        `https://dongapi.phaedra.ir/CORE/payDues/update-status/${id}`,
        { status: true },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      console.log(resp);
      groupRequest(JSON.parse(token));
    } catch (error) {}
  }

  return (
    <>
      <Header enableMenu={true} currentMenu={2} />
      <div className="flex flex-col gap-4 font-iranyekan justify-center items-center mt-20">
        {report?.payDues?.map(
          (item) =>
            !item.isPaid && (
              <div
                key={item.id}
                className=" bg-panelColor rounded-xl w-2/3 p-3 hover:bg-panelHover duration-150 hover:scale-[1.01]"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <button
                      className="bg-green-300 rounded-lg duration-200 flex justify-center items-center gap-1 p-1 hover:bg-green-100 hover:scale-110"
                      onClick={() => payRequest(item.id)}
                    >
                      <span className="max-sm:hidden flex">پرداخت</span>
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
                    <div className="flex flex-row-reverse justify-center items-center ">
                      <img className="w-10" src={GroupImage} alt="" />
                      <h1 className="font-medium text-xl">{item.group.name}</h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-5">
                  <div className="flex flex-row-reverse gap-1">
                    <h1>:مبلغ</h1>
                    <h1 className="font-medium text-xl">{item.amount}</h1>
                    <h1 className="font-medium text-md">{item.currency}</h1>
                  </div>
                  <div className="flex flex-row-reverse gap-1">
                    <h1>:برای</h1>
                    <h1 className="font-medium text-xl">{item.description}</h1>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-1">
                  <h1>
                    به شماره کارت:
                    <span className="font-medium text-md">
                      {item.card.cardPan}
                    </span>
                  </h1>
                </div>
                <div className="flex max-sm:justify-around justify-center max-sm:text-sm text-xl font-medium items-center mt-2 flex-row-reverse max-sm:gap-0 gap-10 bg-slate-100 rounded-lg p-1">
                  <h1>
                    بدهکار :<span>{item.debtor?.name}</span>
                  </h1>
                  <h1>
                    به شماره :<span>{item.debtor?.phone}</span>
                  </h1>
                </div>
              </div>
            )
        )}
      </div>
      <Footer currentMenu={2} />
    </>
  );
}
