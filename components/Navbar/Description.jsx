import React, { useState, useEffect } from "react";
import { Trail } from "./TrailText";

const Description = () => {
  const [open, set] = useState(false);
  useEffect(() => {
    set(true);
  }, []);

  return (
    <>
      {/* Description small screen */}
      <div className="pt-20 pb-6 lg:hidden">
        <div className="text-3xl text-fg font-extrabold leading-7">
          <Trail open={open}>
            <span>One app to spend,</span>
            <span>save and grow your</span>
            <span>money automatically</span>
          </Trail>
        </div>
      </div>

      {/*  Description large screen */}
      <div className="w-full items-start justify-center hidden lg:flex pt-11 pb-10">
        <div className="text-[2.75rem] w-2/4 text-fg font-[500] leading-10">
          <Trail open={open}>
            <span>One app to spend, save</span>
            <span>and grow your money —</span>
            <span>automatically</span>
          </Trail>
        </div>
      </div>
    </>
  );
};

export default Description;
