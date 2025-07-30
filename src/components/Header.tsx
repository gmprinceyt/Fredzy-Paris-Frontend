import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { FcSignature } from "react-icons/fc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiAccountCircleFill } from "react-icons/ri";

const Header = () => {
  const user = {
    _id: null,
    name: "John Doe",
    email: "john@gmail.com",
  };
  return (
    <div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
          <Link to="" className="mr-6 hidden lg:flex">
            <FcSignature className="h-8 w-8" />
            <span className="sr-only">E-commerce</span>
          </Link>
          <div className="ml-auto flex gap-2">
            <Link
              to="products"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            >
              Products
            </Link>

            <Link
              to="contect"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            >
              Contact
            </Link>
            <ModeToggle />

            {/* User Exist or Not */}
            {user._id ? (
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative"
                    >
                      <RiAccountCircleFill className="h-6 w-6" />
                      <span className="sr-only">Open user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem>History</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="">
                <Link to="login">
                  <Button
                    variant="outline"
                    className="justify-self-end px-2 py-1 mr-2  text-xs"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="login">
                  <Button className="justify-self-end px-2 py-1 text-xs">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
