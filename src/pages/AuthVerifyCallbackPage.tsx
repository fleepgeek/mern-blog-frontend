import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useCreateCurrentUser } from "../api/UserApi";
import { useEffect } from "react";

export default function AuthVerifyCallbackPage() {
  const { user } = useAuth0();
  const { createUser } = useCreateCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.sub && user.email) {
      createUser({ auth0Id: user.sub, email: user.email });
    }
    console.log(user);
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
}
