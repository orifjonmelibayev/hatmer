import { useAuthContext } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import { SignInView } from "./SignInView";

export default function SignIn() {
  const { user } = useAuthContext();

  return !!user ? (<Navigate to={{ pathname: "/" }} />) : (<SignInView />);
}
