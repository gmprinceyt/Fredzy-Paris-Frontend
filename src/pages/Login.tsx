import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../firebase.ts";
import { toast } from "sonner"
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    async function loginHandler(){
        try {
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth, provider);
            console.log("User signed in:", user);
            toast("User signed in successfully", {
                description: `Welcome, ${user.displayName}!`,
                action: {
                    label: "Continue",
                    onClick: () => {},
                },
            })

        } catch (error) {
           toast("User signed in Failed", {
                description: `Error, ${error instanceof Error ? error.message : String(error)}!`,
                action: {
                    label: "Undo",
                    onClick: () => {},
                },
            })
        }
    }

  return (
    <div>
      <div className="flex min-h-svh  items-center justify-center gap-4 p-4 ">
        <Button onClick={loginHandler}>
            <FcGoogle/>
            Sign in with Google
        </Button>
        <ModeToggle />
          </div>
    </div>
  );
};

export default Login;
