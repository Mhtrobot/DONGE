import Header from "../Componnets/Header";
import Footer from "../Componnets/Footer";
import GroupImage from "../Image/Group.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [userGroup, setuserGroup] = useState(Object | { owenedGroups: [] });
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

  const groupPage = (id, name) => {
    return () => {
      localStorage.setItem("group", id);
      localStorage.setItem("groupName", name);
      navigate("/GroupPage");
    };
  };

  async function showGroups(token) {
    try {
      const response = await axios.get(
        "https://dongapi.phaedra.ir/CORE/groupMember/groups",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setuserGroup(response.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    const value = localStorage.getItem("token");
    loadUser(JSON.parse(value));
    showGroups(JSON.parse(value));
  }, []);

  return (
    <>
      <div>
        <Header enableMenu={true} currentMenu={1} />\{" "}
        <div className="flex flex-col justify-center gap-4 items-center mt-14 mb-32 font-iranyekan">
          {/* Group */}
          {userGroup?.owenedGroups?.map((owenedGroups) => (
            <button
              onClick={groupPage(owenedGroups.id, owenedGroups.name)}
              key={owenedGroups.id}
              // href="/GroupPage"
              className="flex justify-end items-center bg-panelColor rounded-xl w-2/3 hover:bg-panelHover duration-150 hover:scale-105"
            >
              <div className="flex flex-col justify-center items-end gap-2">
                <h1 className="font-black text-2xl">{owenedGroups.name}</h1>
                <h2 className="font-medium text-xl">
                  {owenedGroups.description}
                </h2>
              </div>
              <div className="w-28">
                <img src={GroupImage} alt="" />
              </div>
            </button>
          ))}
          {userGroup?.joinedGroups?.map((joinedGroups) => (
            <button
              onClick={groupPage(joinedGroups.id, joinedGroups.name)}
              key={joinedGroups.id}
              // href="/GroupPage"
              className="flex justify-end items-center bg-panelColor rounded-xl w-2/3 hover:bg-panelHover duration-150 hover:scale-105"
            >
              <div className="flex flex-col justify-center items-end gap-2">
                <h1 className="font-black text-2xl">{joinedGroups.name}</h1>
                <h2 className="font-medium text-xl">
                  {joinedGroups.description}
                </h2>
              </div>
              <div className="w-28">
                <img src={GroupImage} alt="" />
              </div>
            </button>
          ))}
        </div>
        <Footer currentMenu={1} />
      </div>
    </>
  );
}
