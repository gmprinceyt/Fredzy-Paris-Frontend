import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "./ui/button";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiAccountCircleFill } from "react-icons/ri";
import type { User } from "@/types/types";
import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { LogOut, Search, ShoppingCart } from "lucide-react";

const Header = ({user}: {user: User | null}) => {

  const logoutHandler  = useCallback(async()=> {
    try {
      await signOut(auth)
      toast.success("SignOut Success")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("SignOut failed")
    }
  }, [])


  return (
    <>
    <Toaster position="top-center"/>
      <div className="container mx-auto px-4 md:px-6 lg:px-8  z-99 ">
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
          <Link to="" className="mr-6  lg:flex">
            <span className="h-8 font-bold font-[LOGO] ">Fredzy Paris</span>
          </Link>
          <div className="ml-auto flex gap-2">
            <Link
              to="/search"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            >
              <Search/>
            </Link>

            <Link
              to="/cart"
              className="group relative inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            >
              <b className="absolute -top-1 right-0">0</b>
              <ShoppingCart/>
            </Link>
            <ModeToggle />
 
            {/* User Exist or Not */}
            {user?._id ? (
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      className="relative"
                      variant={"outline"}
                    >
                      <RiAccountCircleFill className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem>History</DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>Logout <LogOut/></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> 
            ) : (
              <div className="">
                <Link to="login">
                  <Button className="justify-self-end px-2 py-1 text-xs">
                    login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
