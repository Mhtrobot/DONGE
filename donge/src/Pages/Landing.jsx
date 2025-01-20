import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Componnets/Header";
import LoadingCover from "../Image/LoadingCover.png";
import { Navigate, useNavigate } from "react-router-dom";

export default function Landing() {
  const [currentDiv, setCurrentDiv] = useState(0);

  const navigate = useNavigate();

  const [phoneNumber, setphoneNumber] = useState("");
  const handleChange = (event) => {
    setphoneNumber(event.target.value);
  };
  const [loginError, SetloginError] = useState("");
  const [loginToken, setloginToken] = useState("");

  async function loadUser(token) {
    try {
      const response = await axios.get("https://dongapi.phaedra.ir/IAM/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data.data;
      if (user.name) {
        navigate("/home");
      } else navigate("/AddName");
    } catch (error) {
      localStorage.clear();
    }
  }

  useEffect(() => {
    const value = localStorage.getItem("token");
    if (!value) return;
    loadUser(JSON.parse(value));
  }, []);

  async function loginPass(e) {
    try {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      let resp = await axios.post(
        `https://dongapi.phaedra.ir/IAM/user-auth/login-with-password`,
        data
      );
      localStorage.setItem("token", JSON.stringify(resp.data.token));
      navigate("/home");
    } catch (error) {
      if (error.response.data.error) SetloginError("ارور داری");
      else if (!error.response.data.success)
        SetloginError(error.response.data.message);
    }
    setTimeout(() => SetloginError(""), 5000);
  }

  async function sendCode(e) {
    try {
      SetloginError("");
      e.preventDefault();

      let res = await axios.post(
        "https://dongapi.phaedra.ir/IAM/user-auth/send-otp",
        {
          phone: phoneNumber,
        }
      );
      SetloginError(res.data.message);
      loginRegister(2);
    } catch (error) {
      if (error.response.data.error) SetloginError("ارور داری");
      else if (!error.response.data.success)
        SetloginError(error.response.data.message);
    }
    setTimeout(() => SetloginError(""), 5000);
  }

  async function loginCode(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      let resp = await axios.post(
        "https://dongapi.phaedra.ir/IAM/user-auth/verify-otp",
        {
          phone: phoneNumber,
          code: data.Code,
        }
      );
      localStorage.setItem("token", JSON.stringify(resp.data.token));
      setloginToken(JSON.stringify(resp.data.token));
      loadUser(resp.data.token);
    } catch (error) {
      if (error.response.data.error) SetloginError("ارور داری");
      else if (!error.response.data.success)
        SetloginError(error.response.data.message);
    }
    setTimeout(() => SetloginError(""), 5000);
  }

  const loginRegister = (loginType) => {
    switch (loginType) {
      case 1:
        setCurrentDiv(1);
        break;
      case 2:
        setCurrentDiv(2);
        break;
      default:
        setCurrentDiv(0);
    }
  };

  return (
    <>
      <Header enableMenu={false} currentMenu={0} />
      <div className="font-iranyekan font-medium mt-16 transition-all">
        {/* Landing  */}
        {currentDiv === 0 && (
          <div>
            <div className="pt-12">
              <div className="flex flex-col justify-center items-center gap-5">
                <button
                  onClick={() => loginRegister(1)}
                  className="bg-buttonColor text-center w-36 py-2 rounded-lg hover:scale-110 transition-all duration-200"
                >
                  ورود اعضا
                </button>
                {/* <button
                  onClick={() => loginRegister(2)}
                  className="bg-buttonColor text-center w-36 py-2 rounded-lg hover:scale-110 transition-all duration-200"
                >
                  ثبت نام
                </button> */}
              </div>
            </div>
            <div className="flex justify-center items-center pt-16">
              <img
                src={LoadingCover}
                className="w-2/5 max-sm:w-3/5"
                alt="Loading Cover"
              />
            </div>
          </div>
        )}
        {/* Log-in  */}
        {(currentDiv === 1 || currentDiv === 2) && (
          <div>
            {/* Sub Header */}
            <div className="bg-subHeaderColor flex justify-between items-center h-10 px-10">
              <button onClick={() => loginRegister(0)}>
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
              <p>ورود اعضا</p>
            </div>
            {currentDiv === 1 && (
              <div className="flex flex-col justify-center items-center mt-10">
                <form
                  onSubmit={loginPass}
                  className="flex flex-col justify-center items-center gap-3 p-5 rounded-2xl border border-slate-200 drop-shadow shadow-xl"
                >
                  {/* Phone Numebr */}
                  <div className="flex flex-col justify-center items-end">
                    <label htmlFor="phone" className="mb-2 font-medium text-xl">
                      شماره تماس
                    </label>
                    <input
                      className="bg-textBoxColor rounded-[15px] border-2 placeholder:text-gray-400 text-black border-backPurple p-3"
                      value={phoneNumber}
                      onChange={handleChange}
                      dir="ltr"
                      id="phone"
                      name="phone"
                      placeholder="+989123456789"
                      type="text"
                    />
                  </div>
                  {/* Password */}
                  <div className="flex flex-col justify-center items-end">
                    <label
                      htmlFor="password"
                      className="mb-2 font-medium text-xl"
                    >
                      رمز عبور
                    </label>
                    <input
                      className="bg-textBoxColor rounded-[15px] border-2 placeholder:text-gray-400 text-black border-backPurple p-3"
                      dir="ltr"
                      id="password"
                      name="password"
                      placeholder="123456789"
                      type="text"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-buttonColor text-white text-center w-44 py-2 rounded-lg hover:scale-110 transition-all duration-200 mt-5"
                  >
                    ورود به برنامه
                  </button>
                  <button
                    onClick={sendCode}
                    className="font-normal text-sm hover:text-gray-400 transition duration-200"
                  >
                    ورود با رمز یکبار مصرف
                  </button>
                  <p>{loginError}</p>
                </form>
              </div>
            )}
            {currentDiv === 2 && (
              <div className="flex flex-col justify-center items-center mt-10">
                <form
                  onSubmit={loginCode}
                  className="flex flex-col justify-center items-center gap-3 p-5 rounded-2xl border border-slate-200 drop-shadow shadow-xl"
                >
                  {/* Phone Numebr */}
                  {/* <div className="flex flex-col justify-center items-end">
                    <label htmlFor="phone" className="mb-2 font-medium text-xl">
                      شماره تماس
                    </label>
                    <input
                      className="bg-textBoxColor rounded-[15px] border-2 placeholder:text-gray-400 text-black border-backPurple p-3"
                      dir="ltr"
                      id="phone"
                      name="phoneNumber"
                      placeholder="+989123456789"
                      type="text"
                    />
                  </div> */}
                  {/* Code Verification */}
                  <div className="flex flex-col justify-center items-end">
                    <label htmlFor="Code" className="mb-2 font-medium text-xl">
                      کد پیامک شده
                    </label>
                    <input
                      className="bg-textBoxColor rounded-[15px] border-2 placeholder:text-gray-400 text-black border-backPurple p-3"
                      dir="ltr"
                      id="Code"
                      name="Code"
                      placeholder="123456789"
                      type="text"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-buttonColor text-white text-center w-44 py-2 rounded-lg hover:scale-110 transition-all duration-200 mt-5"
                  >
                    ورود به برنامه
                  </button>
                  <button
                    onClick={() => loginRegister(1)}
                    className="font-normal text-sm  hover:text-gray-400 transition duration-200"
                  >
                    ورود با رمز عبور
                  </button>
                  <p>{loginError}</p>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
