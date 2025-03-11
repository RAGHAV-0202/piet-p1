import { Link } from "react-router-dom"

const SideBar = ()=>{
    return(
        <div className="sidebar w-[20%] h-dvh bg-white flex flex-col items-center py-[20px] px-[2%]">

            <a href="/dashboard" className="logo h-auto w-[280px] flex flex-row items-center ">
                <a href="/dashboard" className="h-[60px]"> <img className="h-[60px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU" alt="logo"></img></a>

                <div className="branding w-full h-full flex flex-col capitalize font-semibold leading-5 pl-5  ">
                    <span className="uppercase">panipat insitute of</span>
                    <span className="uppercase">Engineering and</span>
                    <span className="uppercase">technology</span>
                </div>
            </a>



            <div className="options w-full py-20 flex flex-col gap-[40px] transition-all duration-100">

            <a href="/dashboard" 
            className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                        rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                        bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                        shadow-md hover:scale-105">
                
                <span className="w-[50px] flex items-center justify-center h-full">
                    <i className="fa-regular fa-house text-2xl transition-all duration-300"></i> 
                </span>

                <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                    Dashboard
                </span>
            </a>

            {/* Claim */}
            <a href="/claim" 
            className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                        rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                        bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                        shadow-md hover:scale-105">
                
                <span className="w-[50px] flex items-center justify-center h-full">
                    <i className="fa-regular fa-file text-2xl transition-all duration-300"></i> 
                </span>

                <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                    Claim
                </span>
            </a>

            {/* My Submissions */}
            <a href="/submissions" 
            className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                        rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                        bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                        shadow-md hover:scale-105">
                
                <span className="w-[50px] flex items-center justify-center h-full">
                    <i className="fa-regular fa-folder text-2xl transition-all duration-300"></i> 
                </span>

                <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                    My Submissions
                </span>
            </a>

            <a href="/profile" 
            className="group px-5 flex flex-row items-center justify-center w-full max-w-[250px] 
                        rounded-3xl transition-all duration-300 h-[60px] text-black font-bold 
                        bg-zinc-100 hover:bg-[linear-gradient(75deg,_rgba(146,136,252,1)_0%,_rgba(124,120,245,1)_100%)] 
                        shadow-md hover:scale-105">
                
                <span className="w-[50px] flex items-center justify-center h-full">
                    <i className="fa-regular fa-user text-2xl transition-all duration-300"></i> 
                </span>

                <span className="text-[20px] pr-[6px] flex-1 h-full flex items-center transition-all duration-300">
                    Profile
                </span>
            </a>
            </div>



        </div>
    )
}

export default SideBar