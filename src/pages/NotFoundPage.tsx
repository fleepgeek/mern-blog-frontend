import { FrownIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      {/* <Link to={"/"} className="absolute text-2xl font-bold">
        MERN Blog
      </Link> */}
      {/* <div className="absolute left-0 top-0 w-full">
        <Navbar />
      </div> */}
      <div className="flex min-h-dvh flex-col items-center justify-center">
        <div className="mx-auto max-w-md text-center">
          <FrownIcon className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            404 Not Found!
          </h1>
          <p className="mt-4 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, we're here to help.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
