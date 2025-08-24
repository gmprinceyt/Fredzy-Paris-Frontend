import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { ChevronDownIcon, Loader } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  // 🔹 Handle Google Login
  const handleGoogleLogin = useCallback(async () => {
    if (!gender || !dob) {
      toast.error("Please select your gender and date of birth.");
      return;
    }
    setLoading(true);

    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        _id: user.uid,
        name: user.displayName ?? "",
        email: user.email ?? "",
        gender,
        dob: dob.toISOString(),
        photo: user.photoURL ?? "",
      });

      if ("data" in res) {
        toast.success(`Welcome ${user.displayName || "User"}`);
        navigate("/");
      } else {
        const err = res.error as FetchBaseQueryError & {
          data?: { message?: string };
        };
        toast.error(err.data?.message ?? "An error occurred during login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  }, [dob, gender, login, navigate]);

  return (
    <div className="max-w-[1280px] m-auto min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 gap-4 border rounded-xl w-xs bg-white dark:bg-black shadow font-[Geist]">
        <h1 className="text-2xl font-bold mb-4">Login or Create Account</h1>

        {/* Gender Selection */}
        <div className="flex flex-col gap-3 mb-4">
          <Label className="px-1 text-base">Select Gender</Label>
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
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
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
          disabled={loading || !gender || !dob}
          className="gap-2 w-full"
        >
          {loading ? (
            <Loader className="animate-spin" size={30} />
          ) : (
            <span className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 11.1h-9.18v2.96h5.26c-.23 1.22-.92 2.25-1.96 2.94v2.44h3.18c1.87-1.72 2.95-4.25 2.95-7.19 0-.67-.06-1.31-.17-1.94z"
                />
                <path
                  fill="#34A853"
                  d="M12.17 21c2.64 0 4.85-.87 6.46-2.37l-3.18-2.44c-.88.59-2 1-3.28 1-2.52 0-4.66-1.7-5.42-3.99H3.44v2.5A8.82 8.82 0 0 0 12.17 21z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.75 13.2a5.3 5.3 0 0 1 0-3.4V7.3H3.44a8.82 8.82 0 0 0 0 9.4l3.31-2.5z"
                />
                <path
                  fill="#EA4335"
                  d="M12.17 5.3c1.43 0 2.71.49 3.72 1.46l2.77-2.77C17.01 2.35 14.8 1.5 12.17 1.5A8.82 8.82 0 0 0 3.44 7.3l3.31 2.5c.76-2.29 2.9-3.99 5.42-3.99z"
                />
              </svg>
              Continue with Google
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Login;
