import { useState } from "react";

export default function Footer({ currentMenu = 1 }) {
  return (
    <>
      <div className="hidden max-sm:flex font-iranyekan font-medium fixed right-0 w-full bottom-0 z-10">
        <div className="bg-headerColor flex flex-row-reverse justify-between items-center gap-1 w-full p-3 rounded-xl absolute bottom-0">
          <a
            href="/Profile"
            style={{
              backgroundColor: currentMenu === 3 ? "#859f60" : "none",
              color: currentMenu === 3 ? "white" : "none",
            }}
            className="flex flex-col justify-center items-center gap-3 w-28 hover:bg-headerHoverButton rounded-xl p-2 duration-100 text-sm"
          >
            <div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 18.5C15.1625 18.5 13.1615 17.6351 11.4969 15.9052C9.83229 14.1754 9 12.0959 9 9.66671C9 7.23754 9.83229 5.15803 11.4969 3.42817C13.1615 1.6983 15.1625 0.833374 17.5 0.833374C19.8375 0.833374 21.8385 1.6983 23.5031 3.42817C25.1677 5.15803 26 7.23754 26 9.66671C26 12.0959 25.1677 14.1754 23.5031 15.9052C21.8385 17.6351 19.8375 18.5 17.5 18.5ZM0.5 36.1667V29.9834C0.5 28.732 0.809896 27.5818 1.42969 26.5329C2.04948 25.4839 2.87292 24.6834 3.9 24.1313C6.09583 22.9903 8.32708 22.1346 10.5938 21.5641C12.8604 20.9936 15.1625 20.7084 17.5 20.7084C19.8375 20.7084 22.1396 20.9936 24.4062 21.5641C26.6729 22.1346 28.9042 22.9903 31.1 24.1313C32.1271 24.6834 32.9505 25.4839 33.5703 26.5329C34.1901 27.5818 34.5 28.732 34.5 29.9834V36.1667H0.5ZM4.75 31.75H30.25V29.9834C30.25 29.5785 30.1526 29.2105 29.9578 28.8792C29.763 28.548 29.5063 28.2903 29.1875 28.1063C27.275 27.1125 25.3448 26.3672 23.3969 25.8704C21.449 25.3735 19.4833 25.125 17.5 25.125C15.5167 25.125 13.551 25.3735 11.6031 25.8704C9.65521 26.3672 7.725 27.1125 5.8125 28.1063C5.49375 28.2903 5.23698 28.548 5.04219 28.8792C4.8474 29.2105 4.75 29.5785 4.75 29.9834V31.75ZM17.5 14.0834C18.6688 14.0834 19.6693 13.6509 20.5016 12.786C21.3339 11.921 21.75 10.8813 21.75 9.66671C21.75 8.45212 21.3339 7.41237 20.5016 6.54744C19.6693 5.68251 18.6688 5.25004 17.5 5.25004C16.3313 5.25004 15.3307 5.68251 14.4984 6.54744C13.6661 7.41237 13.25 8.45212 13.25 9.66671C13.25 10.8813 13.6661 11.921 14.4984 12.786C15.3307 13.6509 16.3313 14.0834 17.5 14.0834Z"
                  style={{
                    fill: currentMenu === 3 ? "white" : "black",
                  }}
                />
              </svg>
            </div>
            <p>حساب کاربری</p>
          </a>
          <a
            href="/reports"
            style={{
              backgroundColor: currentMenu === 2 ? "#859f60" : "none",
              color: currentMenu === 2 ? "white" : "none",
            }}
            className="flex flex-col justify-center items-center gap-3 w-28 hover:bg-headerHoverButton rounded-xl p-2 duration-100 text-sm"
          >
            <div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 38 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 36.875C14.2083 36.875 10.033 35.3182 6.47396 32.2047C2.91493 29.0911 0.875 25.2035 0.354167 20.5417H4.625C5.11111 24.0806 6.71701 27.0069 9.44271 29.3208C12.1684 31.6347 15.3542 32.7917 19 32.7917C23.0625 32.7917 26.5087 31.405 29.3385 28.6318C32.1684 25.8585 33.5833 22.4813 33.5833 18.5C33.5833 14.5188 32.1684 11.1415 29.3385 8.36823C26.5087 5.59497 23.0625 4.20833 19 4.20833C16.6042 4.20833 14.3646 4.75278 12.2812 5.84167C10.1979 6.93056 8.44444 8.42778 7.02083 10.3333H12.75V14.4167H0.25V2.16667H4.41667V6.96458C6.1875 4.78681 8.34896 3.10243 10.901 1.91146C13.4531 0.720486 16.1528 0.125 19 0.125C21.6042 0.125 24.0434 0.609896 26.3177 1.57969C28.592 2.54948 30.5712 3.85955 32.2552 5.5099C33.9392 7.16024 35.276 9.09983 36.2656 11.3286C37.2552 13.5575 37.75 15.9479 37.75 18.5C37.75 21.0521 37.2552 23.4425 36.2656 25.6714C35.276 27.9002 33.9392 29.8398 32.2552 31.4901C30.5712 33.1404 28.592 34.4505 26.3177 35.4203C24.0434 36.3901 21.6042 36.875 19 36.875ZM24.8333 27.075L16.9167 19.3167V8.29167H21.0833V17.6833L27.75 24.2167L24.8333 27.075Z"
                  style={{
                    fill: currentMenu === 2 ? "white" : "black",
                  }}
                />
              </svg>
            </div>
            <p>تاریخچه</p>
          </a>
          <a
            href="/Notifications"
            style={{
              backgroundColor: currentMenu === 4 ? "#859f60" : "none",
              color: currentMenu === 4 ? "white" : "none",
            }}
            className="flex flex-col justify-center items-center gap-3 w-28 hover:bg-headerHoverButton rounded-xl p-2 duration-100 text-sm"
          >
            <div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.166672 16.8333C0.166672 13.3611 0.939241 10.1753 2.48438 7.27604C4.02952 4.37674 6.10417 1.97222 8.70834 0.0625L11.1563 3.39583C9.07292 4.92361 7.41494 6.85069 6.1823 9.17708C4.94966 11.5035 4.33334 14.0556 4.33334 16.8333H0.166672ZM37.6667 16.8333C37.6667 14.0556 37.0504 11.5035 35.8177 9.17708C34.5851 6.85069 32.9271 4.92361 30.8438 3.39583L33.2917 0.0625C35.8958 1.97222 37.9705 4.37674 39.5156 7.27604C41.0608 10.1753 41.8333 13.3611 41.8333 16.8333H37.6667ZM4.33334 35.5833V31.4167H8.50001V16.8333C8.50001 13.9514 9.36806 11.3906 11.1042 9.15104C12.8403 6.91146 15.0972 5.44444 17.875 4.75V3.29167C17.875 2.42361 18.1788 1.68576 18.7865 1.07812C19.3941 0.470486 20.132 0.166667 21 0.166667C21.8681 0.166667 22.6059 0.470486 23.2135 1.07812C23.8212 1.68576 24.125 2.42361 24.125 3.29167V4.75C26.9028 5.44444 29.1597 6.91146 30.8958 9.15104C32.632 11.3906 33.5 13.9514 33.5 16.8333V31.4167H37.6667V35.5833H4.33334ZM21 41.8333C19.8542 41.8333 18.8733 41.4254 18.0573 40.6094C17.2413 39.7934 16.8333 38.8125 16.8333 37.6667H25.1667C25.1667 38.8125 24.7587 39.7934 23.9427 40.6094C23.1267 41.4254 22.1458 41.8333 21 41.8333ZM12.6667 31.4167H29.3333V16.8333C29.3333 14.5417 28.5174 12.5799 26.8854 10.9479C25.2535 9.31597 23.2917 8.5 21 8.5C18.7083 8.5 16.7465 9.31597 15.1146 10.9479C13.4826 12.5799 12.6667 14.5417 12.6667 16.8333V31.4167Z"
                  style={{
                    fill: currentMenu === 4 ? "white" : "black",
                  }}
                />
              </svg>
            </div>
            <p>پیام ها</p>
          </a>
          <a
            href="/Home"
            style={{
              backgroundColor: currentMenu === 1 ? "#859f60" : "none",
              color: currentMenu === 1 ? "white" : "none",
            }}
            className="flex flex-col justify-center items-center gap-3 w-28 hover:bg-headerHoverButton rounded-xl p-2 duration-100 text-sm"
          >
            <div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 34 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 33.5833H10.75V21.0833H23.25V33.5833H29.5V14.8333L17 5.45833L4.5 14.8333V33.5833ZM0.333336 37.75V12.75L17 0.25L33.6667 12.75V37.75H19.0833V25.25H14.9167V37.75H0.333336Z"
                  style={{
                    fill: currentMenu === 1 ? "white" : "black",
                  }}
                />
              </svg>
            </div>
            <p>خانه</p>
          </a>
        </div>
      </div>
    </>
  );
}
