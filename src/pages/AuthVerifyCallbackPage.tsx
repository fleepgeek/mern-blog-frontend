import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateCurrentUser } from "../api/UserApi";
import { useEffect, useRef } from "react";

export default function AuthVerifyCallbackPage() {
  const { user } = useAuth0();
  const { createUser } = useCreateCurrentUser();
  const navigate = useNavigate();
  const { state } = useLocation();

  const userAlreadyCreated = useRef(false);

  useEffect(() => {
    if (user?.sub && user.email && !userAlreadyCreated.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      userAlreadyCreated.current = true;
    }
    navigate(state.returnTo || "/");
  }, [createUser, navigate, state.returnTo, user]);

  return <>Loading...</>;
}
