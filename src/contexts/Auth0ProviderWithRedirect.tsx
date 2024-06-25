// import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";

type Auth0ProviderWithRedirectProps = {
  children: React.ReactNode;
};

export default function Auth0ProviderWithRedirect({
  children,
}: Auth0ProviderWithRedirectProps) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENTID;
  const redirectUri = import.meta.env.VITE_AUT0_REDIRECT_URI;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Can't initialize Authentication");
  }

  // const onRedirectCallback = (appState?: AppState, user?: User) => {
  const onRedirectCallback = () => {
    // Add navigate code here
    // console.log(user);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
