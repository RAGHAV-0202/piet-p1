import React from "react";

const Navbar = () => {
    return (
        <div className="navbar py-3 px-6 flex-1 w-[80vw] h-[80px] flex items-center justify-end backdrop-blur-md bg-white/10  rounded-lg">
            {/* User Profile */}
            <a href="/profile" className="text-black user w-[220px] h-full flex flex-row items-center gap-4 p-2 rounded-3xl cursor-pointer transition-all duration-300 hover:bg-white/20 hover:shadow-md hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                        shadow-md">
                
                {/* Profile Image */}
                <div className="left flex justify-center items-center">
                    <img 
                        className="w-[55px] h-[55px] rounded-full border-[3px] border-white shadow-lg"
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" 
                        alt="user" 
                    />
                </div>

                {/* Name & Role */}
                <div className="right text-black">
                    <p className="text-lg font-semibold">Name</p>
                    <p className="text-sm text-zinc-900">Professor</p>
                </div>
            </a>
        </div>
    );
};

export default Navbar;
