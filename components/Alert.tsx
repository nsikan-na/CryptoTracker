import React, { useContext, useEffect } from "react";
import { Context } from "../pages/_app";
const Alert: React.FC<{}> = () => {
  const { alertText, setAlertText }: any = useContext(Context);
  useEffect(() => {
    setTimeout(() => {
      setAlertText("");
    }, 4500);
  }, [alertText]);
  return (
    <>
      {alertText != "" ? (
        <div className=" py-2 w-full  fixed top-10 flex justify-center font-semibold">
          <div className="w-10/12 p-2 md:w-5/12 lg:w-4/12 2xl:w-2/12 rounded-md text-center text-lg bg-green-600">
            {alertText}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Alert;
