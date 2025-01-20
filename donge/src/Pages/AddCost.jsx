import { useEffect, useState } from "react";
import Header from "../Componnets/Header";
import GroupImage from "../Image/Group.png";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddCost() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const groupId = localStorage.getItem("group");

  const [members, setMembers] = useState([Object]);
  const [selectedMember, setSelectedMember] = useState("");
  const [userCards, setUserCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [myId, setMyId] = useState("");

  const [addError, setAddError] = useState("");

  useEffect(() => {
    loadMember(JSON.parse(token), JSON.parse(groupId));
    loadUser(JSON.parse(token));
    cards(JSON.parse(token));
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
      setMyId(response.data.id);
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
      console.log(response.data.data);
      setMembers(response.data.data);
    } catch (error) {}
  }

  async function cards(token) {
    try {
      const resp = await axios.get("https://dongapi.phaedra.ir/CORE/cards/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);

      setUserCards(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addPay(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // console.log(myId);
    // console.log(Number(selectedMember));
    // console.log(JSON.parse(groupId));
    // console.log(Number(selectedCard));
    // console.log(data.Value);
    // console.log(data.thing);
    try {
      const response = await axios.post(
        "https://dongapi.phaedra.ir/CORE/payDues/create",
        {
          creditorId: myId,
          debtorId: Number(selectedMember),
          groupId: JSON.parse(groupId),
          cardId: Number(selectedCard),
          amount: data.Value,
          currency: "تومان",
          description: data.thing,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/GroupPage");
      }
    } catch (error) {
      // if (!error.response?.data?.success) {
      //   setAddError(error.response?.data?.message);
      // } else {
      setAddError("ارور داری");
      // }
    }
    setTimeout(() => setAddError(""), 5000);
  }

  return (
    <>
      <Header enableMenu={false} currentMenu={0} />
      <div className="font-iranyekan font-medium">
        {/* Sub Header */}
        <div className="bg-subHeaderColor flex justify-between items-center mt-16 h-10 px-10">
          <a href="/GroupPage">
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
          <p>ثبت مخارج</p>
        </div>
        {/* Cost Panel */}
        <div className="flex flex-col justify-center items-center mt-10">
          {/* ---------------- */}
          <form
            onSubmit={addPay}
            className="flex flex-col justify-center items-center gap-3 p-5 rounded-2xl border border-slate-200 drop-shadow shadow-xl"
          >
            {/* Value */}
            <div className="w-full px-4 flex flex-col justify-center items-end">
              <label htmlFor="Value" className="mb-2 font-medium text-xl">
                مبلغ
              </label>
              <input
                className="bg-textBoxColor rounded-[15px] border-2 placeholder:text-gray-400 text-black border-backPurple w-full p-3"
                dir="ltr"
                id="Value"
                name="Value"
                placeholder="400000"
                type="text"
              />
            </div>
            {/* thing */}
            <div className="w-full px-4 flex flex-col justify-center items-end">
              <label htmlFor="thing" className="mb-2 font-medium text-xl">
                بابت چی ؟
              </label>
              <input
                className="bg-textBoxColor rounded-[15px] border-2 placeholder:text-gray-400 text-black border-backPurple w-full p-3"
                dir="rtl"
                id="thing"
                name="thing"
                placeholder="ناهار"
                type="text"
              />
            </div>
            <div className="w-full px-4 flex flex-col justify-center items-end">
              <label htmlFor="card" className="mb-2 font-medium text-xl">
                :به کارت
              </label>
              <select
                id="card"
                name="card"
                value={selectedCard}
                onChange={(e) => {
                  setSelectedCard(e.target.value);
                }}
                className="bg-gray-100 rounded-lg p-2 w-full text-right"
              >
                <option>انتخاب کنید</option>
                {userCards?.cards?.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.cardPan}
                  </option>
                ))}
              </select>
            </div>
            {/* For Who ??? */}
            <div className="flex mt-2 flex-col justify-center items-end">
              <h1 className="px-4">برای کیا ؟</h1>
              <div className="flex flex-row-reverse justify-start w-full items-center gap-3 py-3">
                {/* Person */}
                {members.map((member) => (
                  <label
                    key={member.id}
                    className={`flex justify-end gap-1 px-2 items-center rounded-full cursor-pointer ${
                      selectedMember == member.id
                        ? "bg-buttonColor text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="member"
                      value={member.id}
                      checked={selectedMember == member.id}
                      onChange={(e) => setSelectedMember(e.target.value)}
                      className="hidden"
                    />
                    <h1>{member.name}</h1>
                    <img className="w-10" src={GroupImage} alt="" />
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              // onClick={() => DivChanger(1)}
              className="bg-buttonColor text-white text-center w-44 py-2 rounded-lg hover:scale-110 transition-all duration-200 mt-5"
            >
              بزن به حساب
            </button>
            <p>{addError}</p>
          </form>
        </div>
      </div>
    </>
  );
}
