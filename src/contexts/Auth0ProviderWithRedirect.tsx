// import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderWithRedirectProps = {
  children: React.ReactNode;
};

export default function Auth0ProviderWithRedirect({
  children,
}: Auth0ProviderWithRedirectProps) {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Can't initialize Authentication");
  }

  // const onRedirectCallback = () => {
  const onRedirectCallback = (appState?: AppState) => {
    // Add navigate code here
    navigate("/auth-verify", { state: { returnTo: appState?.returnTo } });
    // console.log(user);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
