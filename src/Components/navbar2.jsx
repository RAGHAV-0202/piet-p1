import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import baseUrl from "../baseurl.js";
import axios from "axios"


const Navbar = ({ toggleSidebar }) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

    const navigate = useNavigate()

    const [data , setData] = React.useState({fullName : "Name" , profileImage : "https://cdn-icons-png.flaticon.com/512/149/149071.png"  , designation : "Staff" })

    React.useEffect(()=>{
        const getUser = async()=>{
            try{
                const response = await axios.get(`${baseUrl}api/auth/loggedIn` , { withCredentials: true } , { withCredentials: true })

                // console.log(response.data.data.user)
                setData(response.data.data.user)
            }catch(err){
                console.log("error while checking if logged in")
                console.log(err)

                navigate("/login")
            }
        }

        getUser()

        
    } , [])

    console.log(data.fullName , data.profileImage , data.designation)

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden bg-white shadow-sm mr-2"
        >
          <Menu size={20} />
        </Button>
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/672610e2-6696-4149-8024-2ad97563763e.png" 
            alt="Institute Logo" 
            className="h-8 w-auto mr-2 md:hidden"
          />
          <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Teacher Dashboard</h1>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium">AI DS Teacher</div>
          <div className="text-xs text-gray-500">Professor</div>
        </div>
        <Avatar>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Navbar;