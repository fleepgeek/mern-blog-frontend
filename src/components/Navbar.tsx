import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Link, useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserRound, Search } from "lucide-react";
import NewArticleButton from "./NewArticleButton";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  return (
    <div className="border border-b-gray-400 bg-white">
      <div className="container flex min-h-16 items-center justify-between">
        <div className="flex gap-6">
          <Link to={"/"} className="text-2xl font-bold">
            MERN Blog
          </Link>
          <div className="hidden md:block">
            <SearchBox searchQuery={searchQuery} />
          </div>
        </div>
        <nav className="flex items-center gap-6 md:gap-8">
          <Link to="/search" className="md:hidden">
            <Search />
          </Link>
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
