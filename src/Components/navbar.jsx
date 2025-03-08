import React from "react";
// import userImg from "../image/image.png"

const Navbar = ()=>{
    return(
        <div className="navbar py-[2px] pr-[20px] w-full h-[70px] bg-white flex flex-row items-center justify-between ">
            <div className="logo h-full w-[280px] flex flex-row items-center ">
                <div className="branding w-full h-full flex flex-col capitalize font-semibold leading-5 pl-5  ">
                    <span className="uppercase">panipat insitute of</span>
                    <span className="uppercase">Engineering and</span>
                    <span className="uppercase">technology</span>
                </div>
            </div>
            <button className="left  w-[35px] h-[35px] p-1 flex  rounded-[50%] items-center justify-center border-[1px]">
                <i className="fa-solid fa-user"></i>
            </button>
        </div>
    )
}

export default Navbar