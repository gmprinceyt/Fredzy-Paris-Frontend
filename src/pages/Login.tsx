/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.ts";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/api/userApi.ts";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
const Login = () => {
  const [open, setOpen] = useState(false);
  const [dob, setDate] = useState<Date | undefined>(undefined);
  const [gender, setGender ] = useState<string>("");
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  async function loginHandler() {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res =await  login({
        _id: user.uid,
        name: user.displayName!,
        email: user.email!,
        gender,
        dob: String(dob),
        photo: user.photoURL!
      });

      if ("data" in res) {
        navigate("/");
        toast.success(`Welcome ${user.displayName}`);
      } else {
        const error = res.error as FetchBaseQueryError;
        const errorMessage =
          error.data && typeof error.data === "object" && "message" in error.data
            ? (error.data as { message: string }).message
            : "An error occurred";
        toast.error(errorMessage)
      }
    } catch (error) {
      toast.error("Failed to sign");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster position={"top-right"} />
      <div className="flex flex-col  items-center justify-center gap-4 p-4 border rounded-xl bg-white dark:bg-black  shadow  ">
        <div className="flex flex-col gap-3">
          <Label className="px-1">
            Select Gender
          </Label>
          <Select onValueChange={(value) => setGender(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="date" className="px-1">
            Date of birth
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {dob ? dob.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dob}
                captionLayout="dropdown"
                onSelect={(dob) => {
                  setDate(dob);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button onClick={loginHandler}>
          <FcGoogle />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
