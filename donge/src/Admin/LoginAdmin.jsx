import axios from "axios";
import logo from "../Image/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [loginError, SetloginError] = useState("");

  async function loginPass(e) {
    try {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      //let resp = await axios.post(`https://dongapi.phaedra.ir/IAM/`, data);
      //localStorage.setItem("token", JSON.stringify(resp.data.token));
      //   navigate("/home");
    } catch (error) {
      if (error.response.data.error) SetloginError("ارور داری");
      else if (!error.response.data.success)
        SetloginError(error.response.data.message);
    }
    setTimeout(() => SetloginError(""), 5000);
  }

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
      <div className="font-iranyekan font-medium mt-16 transition-all">
        <div className="bg-blue-50 flex justify-between items-center h-10 px-10">
          <a href="/">
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
          <p>ورود ادمین</p>
        </div>
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
                className="bg-blue-100 rounded-[15px] border-2 placeholder:text-gray-600 text-black border-backPurple p-3"
                dir="ltr"
                id="phone"
                name="phone"
                placeholder="+989123456789"
                type="text"
              />
            </div>
            {/* Password */}
            <div className="flex flex-col justify-center items-end">
              <label htmlFor="password" className="mb-2 font-medium text-xl">
                رمز عبور
              </label>
              <input
                className="bg-blue-100 rounded-[15px] border-2 placeholder:text-gray-600 text-black border-backPurple p-3"
                dir="ltr"
                id="password"
                name="password"
                placeholder="123456789"
                type="text"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white text-center w-44 py-2 rounded-lg hover:scale-110 transition-all duration-200 mt-5"
            >
              ورود به پنل ادمین
            </button>
            <p>{loginError}</p>
          </form>
        </div>
      </div>
    </>
  );
}
