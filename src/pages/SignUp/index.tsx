import { useAuthContext } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import { SignUpView } from "./SignUpView";

export default function SignIn() {
  const { user } = useAuthContext();

  return !!user ? <Navigate to={{ pathname: "/" }} /> : <SignUpView />;
}
