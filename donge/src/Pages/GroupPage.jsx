import { useEffect, useState } from "react";
import Header from "../Componnets/Header";
import GroupImage from "../Image/Group.png";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function GroupPage() {
  const navigate = useNavigate();
  const [currentDiv, setCurrentDiv] = useState(0);
  const [members, setMembers] = useState(Object || "");
  const [memberAddError, setMemberAddError] = useState("");

  const token = localStorage.getItem("token");
  const groupId = localStorage.getItem("group");
  const groupName = localStorage.getItem("groupName");
  const [report, setReport] = useState(Object);

  const [previewUrl, setPreviewUrl] = useState(null);

  async function showImage() {
    try {
      const resp = await axios.get(
        `https://dongapi.phaedra.ir/MEDIA/media/group/${JSON.parse(
          groupId
        )}/profile`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([resp.data]);
      const objectUrl = URL.createObjectURL(blob);
      setPreviewUrl(objectUrl);
    } catch (error) {}
  }

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

  async function loadMember(token, id) {
    try {
      const response = await axios.get(
        `https://dongapi.phaedra.ir/CORE/groupMember/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMembers(response.data.data);
    } catch (error) {}
  }

  async function leaveGroup() {
    console.log("sda");

    try {
      const response = await axios.delete(
        `https://dongapi.phaedra.ir/CORE/groupMember/leave/${JSON.parse(
          groupId
        )}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      console.log(response);

      navigate("/Home");
    } catch (error) {}
  }

  async function addMember(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await axios.post(
        "https://dongapi.phaedra.ir/CORE/groupRequest/create",
        {
          groupId: JSON.parse(groupId),
          recieverPhone: data.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setMemberAddError(response.data.message);
    } catch (error) {
      setMemberAddError("ارور داری");
    }
    setTimeout(() => setMemberAddError(""), 5000);
  }
  async function removeMember(id) {
    try {
      const resp = await axios.delete(
        `https://dongapi.phaedra.ir/CORE/groupMember/remove/${JSON.parse(
          groupId
        )}/${id}`,
        { status: true },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      loadMember(JSON.parse(token), JSON.parse(groupId));
      console.log(resp);
    } catch (error) {}
  }

  async function groupRequest(token, id) {
    try {
      const response = await axios.get(
        `https://dongapi.phaedra.ir/CORE/payDues/${id}`,
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
      groupRequest(JSON.parse(token), JSON.parse(groupId));
    } catch (error) {}
  }

  useEffect(() => {
    loadMember(JSON.parse(token), JSON.parse(groupId));
    loadUser(JSON.parse(token));
    groupRequest(JSON.parse(token), JSON.parse(groupId));
    showImage();
  }, []);

  const DivChanger = (nowDiv) => {
    switch (nowDiv) {
      case 1:
        setCurrentDiv(1);
        break;
      default:
        setCurrentDiv(0);
        break;
    }
  };
  return (
    <>
      <Header enableMenu={false} currentMenu={0} />
      <div className="font-iranyekan font-medium mt-16">
        {/* Sub Header */}
        <div className="bg-subHeaderColor flex justify-between items-center h-10 px-10">
          <div className="flex justify-center items-center gap-2">
            <a href="/Home">
              <svg
                width="35"
                height="35"
                viewBox="0 0 48 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="48" height="46" fill="url(#pattern0_79_188)" />
                <defs>
                  <pattern
                    id="pattern0_79_188"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_79_188"
                      transform="matrix(0.00641026 0 0 0.00668896 0 -0.0217391)"
                    />
                  </pattern>
                  <image
                    id="image0_79_188"
                    width="156"
                    height="156"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACcCAYAAACKuMJNAAAFFElEQVR4Xu3d4W0UMRRFYdIBLVECnUAHpAIogRIoISWlBHZIomzIZNZvnn19bZ+VIuWH7Td7/GkRICV3n3hRQFjgTjiLURT4BDgQSAsATpqbYYDDgLQA4KS5GQY4DEgLAE6am2GAw4C0AOCkuRkGOAxICwBOmpthgMOAtADgpLkZBjgMSAsATpqbYYDDgLQA4KS5GQY4DEgLAE6am2GAw4C0AOCkuRkGOAxICwBOmpthgMOAtADgpLkZBrhzBr5dtn2+fP04t33dXYCL3/2G7efztnvQxQICLtbrGtvLTtAFGgKuPNYeNtCV9/u3EnBlwY6wga6sIeAKO5VgA11hTD7hjkNFsIGuAB3gPo50BtvLaV8v3/wp6L/cEsDtX3kG28PlyA3c43KaCt4w4N5HAlsBnLNLAPe2HNjOSircB7jXUGArRJNZBrinemDLKArsBRzYAlzyS1cHxydb3lDohJXBgS1Epc7iVcGBrY6f8CkrggNbmEm9DauBA1s9O6dOWgkc2E4RqbtpFXBgq+vm9GkrgAPbaR71N84ODmz1zaROnBkc2FI02myeFRzY2nhJnzojOLClWbQ7YDZwYGtnpcrJM4EDWxUSbQ+ZBRzY2jqpdvoM4MBWjUP7g0YHB7b2RqpOGBkc2KpS0Bw2KjiwaXxUnzIiOLBVZ6A7cDRwYNPZaDJpJHBga0JAe+go4MCmddFs2gjgwNbs+vUHu4MDm95E04nO4MDW9Or7HO4KDmx9PDSf6ggObM2vvd8AN3Bg62dBMtkJHNgkV953iAs4sPV1IJvuAA5ssuvuP6g3uAy2rd73y9dj/4xTPMFvxbvoCS6LTdFnpRkSC5IhO7cGNj/KEguSIf+1BZsftu2JJBYkQ676gs0T25TgwOaLbUpw26/t3tDx8iwg+dNOMuSqL+g8sU35CfeSGnSe6CQfPpIhO31B54dOYkEy5IO2oPNCJ7EgGXLQNYNu+y+te687G/ppfimevje47T1m0D1c9n9RhGJGnQIO4EBX5y6HOMUFHOiG4JJ/SCdwoMvfp/0JbuBAZ08m94CO4ECXu1Pr3a7gQGfN5vzDOYMD3fl7td3pDg50tnTOPdgI4EB37m4td40CDnSWfOIPNRI40MXv127HaOBAZ0co9kAjggNd7I6tVo8KDnRWjMofZmRwoCu/Z5uVo4MDnQ2lsgeZARzoyu7aYtUs4EBnwen2Q8wEDnS377v7itnAga47qeMHmBEc6IzRzQoOdKboZgYHOkN0s4MDnRm6FcCBzgjdKuBAZ4JuJXCgM0C3GjjQdUa3IjjQdUS3KjjQdUK3MjjQdUC3OjjQidEB7ik4PxRRBA9wr6FBJ0AHuLeRQdcYHeDeBwZdQ3SA248LukboAPdx2Ay67TdVS34MfSMXzY4F3HHaM+g2aBs4XjsFAHebRQQd2G70BNxtcKX/Tge2gpaAK4j0vOTokw5shR0BVxjqAB3YAg0BF4i1gw5swX6ACwa7Qrd9y99Gg/0AFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtY4C/5vuydqb+D2wAAAABJRU5ErkJggg=="
                  />
                </defs>
              </svg>
            </a>
            <a href="/AddCost" className="flex justify-center items-center">
              <svg
                width="35"
                height="35"
                viewBox="0 0 55 46"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.9583 14C12.4687 14 11.1936 13.5594 10.1328 12.6781C9.07204 11.7969 8.54166 10.7375 8.54166 9.5V5C8.54166 3.7625 9.07204 2.70312 10.1328 1.82187C11.1936 0.940625 12.4687 0.5 13.9583 0.5H41.0417C42.5312 0.5 43.8064 0.940625 44.8672 1.82187C45.9279 2.70312 46.4583 3.7625 46.4583 5V9.5C46.4583 10.7375 45.9279 11.7969 44.8672 12.6781C43.8064 13.5594 42.5312 14 41.0417 14H13.9583ZM13.9583 9.5H41.0417V5H13.9583V9.5ZM5.83332 45.5C4.34374 45.5 3.06857 45.0594 2.0078 44.1781C0.947038 43.2969 0.416656 42.2375 0.416656 41V38.75H54.5833V41C54.5833 42.2375 54.0529 43.2969 52.9922 44.1781C51.9314 45.0594 50.6562 45.5 49.1667 45.5H5.83332ZM0.416656 36.5L9.82812 18.8937C10.2795 18.0688 10.9566 17.4219 11.8594 16.9531C12.7621 16.4844 13.7326 16.25 14.7708 16.25H40.2292C41.2674 16.25 42.2378 16.4844 43.1406 16.9531C44.0434 17.4219 44.7205 18.0688 45.1719 18.8937L54.5833 36.5H0.416656ZM18.0208 32H20.7292C21.0903 32 21.4062 31.8875 21.6771 31.6625C21.9479 31.4375 22.0833 31.175 22.0833 30.875C22.0833 30.575 21.9479 30.3125 21.6771 30.0875C21.4062 29.8625 21.0903 29.75 20.7292 29.75H18.0208C17.6597 29.75 17.3437 29.8625 17.0729 30.0875C16.8021 30.3125 16.6667 30.575 16.6667 30.875C16.6667 31.175 16.8021 31.4375 17.0729 31.6625C17.3437 31.8875 17.6597 32 18.0208 32ZM18.0208 27.5H20.7292C21.0903 27.5 21.4062 27.3875 21.6771 27.1625C21.9479 26.9375 22.0833 26.675 22.0833 26.375C22.0833 26.075 21.9479 25.8125 21.6771 25.5875C21.4062 25.3625 21.0903 25.25 20.7292 25.25H18.0208C17.6597 25.25 17.3437 25.3625 17.0729 25.5875C16.8021 25.8125 16.6667 26.075 16.6667 26.375C16.6667 26.675 16.8021 26.9375 17.0729 27.1625C17.3437 27.3875 17.6597 27.5 18.0208 27.5ZM18.0208 23H20.7292C21.0903 23 21.4062 22.8875 21.6771 22.6625C21.9479 22.4375 22.0833 22.175 22.0833 21.875C22.0833 21.575 21.9479 21.3125 21.6771 21.0875C21.4062 20.8625 21.0903 20.75 20.7292 20.75H18.0208C17.6597 20.75 17.3437 20.8625 17.0729 21.0875C16.8021 21.3125 16.6667 21.575 16.6667 21.875C16.6667 22.175 16.8021 22.4375 17.0729 22.6625C17.3437 22.8875 17.6597 23 18.0208 23ZM26.1458 32H28.8542C29.2153 32 29.5312 31.8875 29.8021 31.6625C30.0729 31.4375 30.2083 31.175 30.2083 30.875C30.2083 30.575 30.0729 30.3125 29.8021 30.0875C29.5312 29.8625 29.2153 29.75 28.8542 29.75H26.1458C25.7847 29.75 25.4687 29.8625 25.1979 30.0875C24.9271 30.3125 24.7917 30.575 24.7917 30.875C24.7917 31.175 24.9271 31.4375 25.1979 31.6625C25.4687 31.8875 25.7847 32 26.1458 32ZM26.1458 27.5H28.8542C29.2153 27.5 29.5312 27.3875 29.8021 27.1625C30.0729 26.9375 30.2083 26.675 30.2083 26.375C30.2083 26.075 30.0729 25.8125 29.8021 25.5875C29.5312 25.3625 29.2153 25.25 28.8542 25.25H26.1458C25.7847 25.25 25.4687 25.3625 25.1979 25.5875C24.9271 25.8125 24.7917 26.075 24.7917 26.375C24.7917 26.675 24.9271 26.9375 25.1979 27.1625C25.4687 27.3875 25.7847 27.5 26.1458 27.5ZM26.1458 23H28.8542C29.2153 23 29.5312 22.8875 29.8021 22.6625C30.0729 22.4375 30.2083 22.175 30.2083 21.875C30.2083 21.575 30.0729 21.3125 29.8021 21.0875C29.5312 20.8625 29.2153 20.75 28.8542 20.75H26.1458C25.7847 20.75 25.4687 20.8625 25.1979 21.0875C24.9271 21.3125 24.7917 21.575 24.7917 21.875C24.7917 22.175 24.9271 22.4375 25.1979 22.6625C25.4687 22.8875 25.7847 23 26.1458 23ZM34.2708 32H36.9792C37.3403 32 37.6562 31.8875 37.9271 31.6625C38.1979 31.4375 38.3333 31.175 38.3333 30.875C38.3333 30.575 38.1979 30.3125 37.9271 30.0875C37.6562 29.8625 37.3403 29.75 36.9792 29.75H34.2708C33.9097 29.75 33.5937 29.8625 33.3229 30.0875C33.0521 30.3125 32.9167 30.575 32.9167 30.875C32.9167 31.175 33.0521 31.4375 33.3229 31.6625C33.5937 31.8875 33.9097 32 34.2708 32ZM34.2708 27.5H36.9792C37.3403 27.5 37.6562 27.3875 37.9271 27.1625C38.1979 26.9375 38.3333 26.675 38.3333 26.375C38.3333 26.075 38.1979 25.8125 37.9271 25.5875C37.6562 25.3625 37.3403 25.25 36.9792 25.25H34.2708C33.9097 25.25 33.5937 25.3625 33.3229 25.5875C33.0521 25.8125 32.9167 26.075 32.9167 26.375C32.9167 26.675 33.0521 26.9375 33.3229 27.1625C33.5937 27.3875 33.9097 27.5 34.2708 27.5ZM34.2708 23H36.9792C37.3403 23 37.6562 22.8875 37.9271 22.6625C38.1979 22.4375 38.3333 22.175 38.3333 21.875C38.3333 21.575 38.1979 21.3125 37.9271 21.0875C37.6562 20.8625 37.3403 20.75 36.9792 20.75H34.2708C33.9097 20.75 33.5937 20.8625 33.3229 21.0875C33.0521 21.3125 32.9167 21.575 32.9167 21.875C32.9167 22.175 33.0521 22.4375 33.3229 22.6625C33.5937 22.8875 33.9097 23 34.2708 23Z" />
              </svg>
            </a>
            {currentDiv === 0 && (
              <button
                onClick={() => DivChanger(1)}
                className="flex justify-center items-center"
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
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M15.5699 18.5001V14.6001"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M15.5699 7.45V5.5"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M15.57 12.65C17.0059 12.65 18.17 11.4859 18.17 10.05C18.17 8.61401 17.0059 7.44995 15.57 7.44995C14.134 7.44995 12.97 8.61401 12.97 10.05C12.97 11.4859 14.134 12.65 15.57 12.65Z"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M8.43005 18.5V16.55"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M8.43005 9.4V5.5"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M8.42996 16.5501C9.8659 16.5501 11.03 15.386 11.03 13.9501C11.03 12.5142 9.8659 11.3501 8.42996 11.3501C6.99402 11.3501 5.82996 12.5142 5.82996 13.9501C5.82996 15.386 6.99402 16.5501 8.42996 16.5501Z"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            )}
          </div>
          <p className="text-xl">نام گروه</p>
        </div>
        {/* ---------------------------------------------- */}
        {currentDiv === 0 && (
          <div className="flex flex-col gap-4 font-iranyekan justify-center items-center mt-10">
            {report?.payDuesWithUsersAndCardPans?.map(
              (item) =>
                !item.isPaid && (
                  <div
                    key={item.id}
                    className=" bg-panelColor rounded-xl w-2/3 p-3 hover:bg-panelHover duration-150 hover:scale-[1.01]"
                  >
                    <div className="flex max-sm:justify-around justify-center max-sm:text-sm text-xl font-medium items-center mb-2 flex-row-reverse max-sm:gap-0 gap-10 bg-slate-100 rounded-lg p-1">
                      <h1>
                        بستانکار :<span>{item.creditor.name}</span>
                      </h1>
                      <h1>
                        به شماره :<span>{item.creditor.phone}</span>
                      </h1>
                    </div>
                    <div className="flex flex-row-reverse gap-8">
                      <div className="flex flex-row-reverse gap-1">
                        <h1>:مبلغ</h1>
                        <h1 className="font-medium text-xl">{item.amount}</h1>
                        <h1 className="font-medium text-md">{item.currency}</h1>
                      </div>
                      <div className="flex flex-row-reverse gap-1">
                        <h1>:برای</h1>
                        <h1 className="font-medium text-xl">
                          {item.description}
                        </h1>
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
                        بدهکار :<span>{item.debtor.name}</span>
                      </h1>
                      <h1>
                        به شماره :<span>{item.debtor.phone}</span>
                      </h1>
                    </div>
                    <div className="flex justify-center items-center w-full">
                      <button
                        className="bg-green-300 rounded-lg duration-200 flex w-full justify-center items-center gap-1 p-1 mx-9 my-3 hover:bg-green-100 hover:scale-105"
                        onClick={() => payRequest(item.id)}
                      >
                        <span>پرداخت</span>
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
                  </div>
                )
            )}
          </div>
        )}
        {currentDiv === 1 && (
          <div className="flex flex-col justify-center items-center mt-10">
            <div className="flex flex-col justify-center items-center gap-3 p-5 rounded-2xl border border-slate-200 drop-shadow shadow-xl">
              <div className="flex flex-row-reverse justify-between items-center gap-3">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 p-2 rounded-full flex object-cover justify-center items-center"
                  />
                ) : (
                  <img src={GroupImage} alt="" className="w-32 h-32 " />
                )}
                <div className="flex flex-row-reverse justify-between items-center bg-gray-50 drop-shadow-md rounded-xl w-80 px-4 py-2">
                  <div className="flex justify-end items-center">
                    <h1 className="font-black text-md">{groupName}</h1>
                  </div>
                  <a
                    href="/EditGroup"
                    className="bg-gray-100 p-1 rounded-lg drop-shadow-md hover:scale-110 duration-150"
                  >
                    <div className="flex flex-row-reverse justify-center items-center gap-2">
                      <svg
                        className="w-5"
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
                    </div>
                  </a>
                </div>
                <button
                  onClick={() => DivChanger(0)}
                  className="p-2 bg-gray-50 drop-shadow-md rounded-xl hover:scale-110 duration-200"
                >
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 48 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect width="48" height="46" fill="url(#pattern0_79_188)" />
                    <defs>
                      <pattern
                        id="pattern0_79_188"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_79_188"
                          transform="matrix(0.00641026 0 0 0.00668896 0 -0.0217391)"
                        />
                      </pattern>
                      <image
                        id="image0_79_188"
                        width="156"
                        height="156"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACcCAYAAACKuMJNAAAFFElEQVR4Xu3d4W0UMRRFYdIBLVECnUAHpAIogRIoISWlBHZIomzIZNZvnn19bZ+VIuWH7Td7/GkRICV3n3hRQFjgTjiLURT4BDgQSAsATpqbYYDDgLQA4KS5GQY4DEgLAE6am2GAw4C0AOCkuRkGOAxICwBOmpthgMOAtADgpLkZBjgMSAsATpqbYYDDgLQA4KS5GQY4DEgLAE6am2GAw4C0AOCkuRkGOAxICwBOmpthgMOAtADgpLkZBrhzBr5dtn2+fP04t33dXYCL3/2G7efztnvQxQICLtbrGtvLTtAFGgKuPNYeNtCV9/u3EnBlwY6wga6sIeAKO5VgA11hTD7hjkNFsIGuAB3gPo50BtvLaV8v3/wp6L/cEsDtX3kG28PlyA3c43KaCt4w4N5HAlsBnLNLAPe2HNjOSircB7jXUGArRJNZBrinemDLKArsBRzYAlzyS1cHxydb3lDohJXBgS1Epc7iVcGBrY6f8CkrggNbmEm9DauBA1s9O6dOWgkc2E4RqbtpFXBgq+vm9GkrgAPbaR71N84ODmz1zaROnBkc2FI02myeFRzY2nhJnzojOLClWbQ7YDZwYGtnpcrJM4EDWxUSbQ+ZBRzY2jqpdvoM4MBWjUP7g0YHB7b2RqpOGBkc2KpS0Bw2KjiwaXxUnzIiOLBVZ6A7cDRwYNPZaDJpJHBga0JAe+go4MCmddFs2gjgwNbs+vUHu4MDm95E04nO4MDW9Or7HO4KDmx9PDSf6ggObM2vvd8AN3Bg62dBMtkJHNgkV953iAs4sPV1IJvuAA5ssuvuP6g3uAy2rd73y9dj/4xTPMFvxbvoCS6LTdFnpRkSC5IhO7cGNj/KEguSIf+1BZsftu2JJBYkQ676gs0T25TgwOaLbUpw26/t3tDx8iwg+dNOMuSqL+g8sU35CfeSGnSe6CQfPpIhO31B54dOYkEy5IO2oPNCJ7EgGXLQNYNu+y+te687G/ppfimevje47T1m0D1c9n9RhGJGnQIO4EBX5y6HOMUFHOiG4JJ/SCdwoMvfp/0JbuBAZ08m94CO4ECXu1Pr3a7gQGfN5vzDOYMD3fl7td3pDg50tnTOPdgI4EB37m4td40CDnSWfOIPNRI40MXv127HaOBAZ0co9kAjggNd7I6tVo8KDnRWjMofZmRwoCu/Z5uVo4MDnQ2lsgeZARzoyu7aYtUs4EBnwen2Q8wEDnS377v7itnAga47qeMHmBEc6IzRzQoOdKboZgYHOkN0s4MDnRm6FcCBzgjdKuBAZ4JuJXCgM0C3GjjQdUa3IjjQdUS3KjjQdUK3MjjQdUC3OjjQidEB7ik4PxRRBA9wr6FBJ0AHuLeRQdcYHeDeBwZdQ3SA248LukboAPdx2Ay67TdVS34MfSMXzY4F3HHaM+g2aBs4XjsFAHebRQQd2G70BNxtcKX/Tge2gpaAK4j0vOTokw5shR0BVxjqAB3YAg0BF4i1gw5swX6ACwa7Qrd9y99Gg/0AFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtYAHDBYCzPFQBcrh+7gwUAFwzG8lwBwOX6sTtY4C/5vuydqb+D2wAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                </button>
              </div>
              {/* Add Person */}
              <div className="flex flex-row-reverse justify-between w-full items-center bg-gray-50 drop-shadow-md rounded-xl gap-36 px-4 py-2">
                <form
                  onSubmit={addMember}
                  className="flex flex-col w-full justify-center items-end"
                >
                  <label
                    htmlFor="phoneNumber"
                    className="font-nor text-sm px-3"
                  >
                    اضافه کردن عضو جدید
                  </label>
                  <div className="flex w-full gap-2">
                    <button
                      type="submit"
                      className="bg-buttonColor px-6 py-2 text-xmd font-semibold text-white rounded-xl hover:scale-105 duration-150"
                    >
                      عضویت
                    </button>
                    <input
                      className="bg-white rounded-[15px] w-full border-2 placeholder:text-gray-400 text-black border-backPurple p-2"
                      dir="ltr"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="09123456789"
                      type="text"
                    />
                  </div>
                  <p className="text-xs pt-2 pr-2">{memberAddError}</p>
                </form>
              </div>
              {/* Members */}
              <div className="flex flex-col justify-start w-full items-center">
                <h1>اعضای گروه</h1>
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-row w-full justify-between items-center"
                  >
                    <button
                      onClick={() => {
                        removeMember(member.id);
                      }}
                      className="hover:scale-110 duration-150"
                    >
                      {/* <svg
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
                          {" "}
                          <g id="User / User_Remove">
                            {" "}
                            <path
                              id="Vector"
                              d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M15 13H21M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
                              stroke="red"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>{" "}
                        </g>
                      </svg> */}
                    </button>
                    <div className="flex flex-row-reverse justify-center items-center">
                      <img className="w-10" src={GroupImage} alt="" />
                      <div className="flex flex-col items-end">
                        <h1>{member.name}</h1>
                        <h1 className="font-normal text-sm">{member.phone}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Delete Group */}
              {/* <button className="flex flex-row-reverse justify-start gap-3 w-4/5 items-center bg-gray-100 rounded-xl p-2 mt-1 hover:bg-gray-200 hover:scale-105 duration-150 hover:drop-shadow-md">
                <svg
                  className="w-10"
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
                      d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <p className="font-medium text-xl text-red-500">حذف گروه</p>
              </button> */}
            </div>
            {/* Quit Group */}
            <button
              onClick={() => leaveGroup()}
              className="flex flex-row-reverse justify-start gap-3 w-1/2 items-center bg-gray-100 rounded-xl p-2 mt-8 hover:bg-gray-200 hover:scale-105 duration-150 hover:drop-shadow-md"
            >
              <svg
                className="w-10"
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
              <p className="font-medium text-xl">خروج از گروه</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
