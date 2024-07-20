import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import NewArticleButton from "./NewArticleButton";

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <div className="border border-b-gray-400 bg-white">
      <div className="container flex min-h-16 items-center justify-between">
        <Link to={"/"} className="text-2xl font-bold">
          MERN Blog
        </Link>
        <nav className="flex gap-8">
          {!isAuthenticated ? (
            <Button onClick={() => loginWithRedirect()}>Login</Button>
          ) : (
            <>
              <NewArticleButton />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <CircleUserRound />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      to="/dashboard/profile"
                      className="flex flex-col items-start gap-1"
                    >
                      <p>{user?.name}</p>
                      {user?.email}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button onClick={() => logout()} className="w-full">
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
