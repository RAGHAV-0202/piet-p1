import { Link } from "react-router-dom"

const SideBar = ()=>{
    return(
        <div className="sidebar w-[120px] h-dvh bg-white flex flex-col items-center pt-[2px] px-[10px]">
            <a href="/dashboard" className="h-[60px]"> <img className="h-[60px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlh8qU-hFL2yJUpMHEMY0sprJ7UqhJA2wTjzCJpC---5hXlfQY1yW02ul-ScBLpgW&usqp=CAU" alt="logo"></img></a>

            <div className="options w-auto py-10 flex flex-col gap-[40px] transition-all duration-100">
                <button className="flex flex-col items-center group transition-all duration-100 hover:text-green-900">
                    <i className="fa-regular fa-house text-2xl transition-all duration-100"></i>
                    <span className="font-normal text-[13px] transition-all duration-100 gro">
                    Dashboard
                    </span>
                </button>

                <a href={"/claim"} className="flex flex-col items-center group transition-all duration-100 hover:text-green-900">
                    <i className="fa-regular fa-file text-2xl transition-all duration-100"></i>
                    <span className="font-normal text-[14px] transition-all duration-100 gro">
                    Claim
                    </span>
                </a>

                <button className="flex flex-col items-center group transition-all duration-100 hover:text-green-900">
                    <i className="fa-regular fa-folder text-2xl transition-all duration-100"></i>
                    <span className="font-normal text-[13px] transition-all duration-100 ">
                    My submissions
                    </span>
                </button>
            </div>



        </div>
    )
}

export default SideBar