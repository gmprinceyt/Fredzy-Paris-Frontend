import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { FcGoogle } from "react-icons/fc";
import { ChevronDownIcon } from "lucide-react";

import { auth } from "../firebase";
import { useLoginMutation } from "@/redux/api/userApi";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState<string>("");
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleGoogleLogin = async () => {
    if (!gender || !dob) {
      toast.error("Please select your gender and date of birth.");
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        _id: user.uid,
        name: user.displayName ?? "",
        email: user.email ?? "",
        gender,
        dob: dob.toISOString(), // Store in ISO format for consistency
        photo: user.photoURL ?? "",
      });

      if ("data" in res) {
        toast.success(`Welcome ${user.displayName || "User"}`);
        navigate("/");
      } else {
        const error = res.error as FetchBaseQueryError;
        const errorMessage =
          error.data && typeof error.data === "object" && "message" in error.data
            ? (error.data as { message: string }).message
            : "An error occurred during login";
        toast.error(errorMessage);
      }
    } catch {
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div className="max-w-[1280px] m-auto min-h-screen ">
    <div className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 gap-4 border rounded-xl w-xs bg-white dark:bg-black shadow font-[Geist]">
      <h1 className="text-2xl font-bold mb-4">Login or Create Account</h1>

      {/* Gender Selection */}
      <div className="flex flex-col gap-3 mb-4">
        <Label className="px-1 text-base ">Select Gender</Label>
        <Select onValueChange={setGender}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date of Birth Picker */}
      <div className="flex flex-col gap-3 mb-4">
        <Label htmlFor="dob" className="px-1 text-base">
          Date of Birth
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="dob"
              className="w-full justify-between font-normal"
            >
              {dob ? dob.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={dob}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setDob(selectedDate || undefined);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Google Login Button */}
      <Button
        onClick={handleGoogleLogin}
        disabled={!gender || !dob}
        className="gap-2 w-full"
      >
        <FcGoogle size={20} />
        Sign in with Google
      </Button>
    </div>
    </div>
  );
};

export default Login;
