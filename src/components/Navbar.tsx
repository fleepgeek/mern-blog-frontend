import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="border-b-gray-400 border">
      <div className="container flex justify-between py-4">
        <a href="/">Logo</a>
        <nav>
          <Button>Login</Button>
        </nav>
      </div>
    </div>
  );
}
