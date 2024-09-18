import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "../components/ui/separator";
import { cn } from "../lib/utils";

const dashboardLinks = [
  { path: "/dashboard/profile", label: "Profile" },
  { path: "/dashboard/manage-articles", label: "Manage Articles" },
];

export default function DashboardLayout() {
  const { user } = useAuth0();
  return (
    <>
      <Header />

      <div className="container gap-16 py-10 md:grid lg:grid-cols-4">
        <aside className="mb-16 self-start rounded-lg border border-black p-2 text-sm md:min-h-[250px]">
          <div className="px-2 font-light">
            <p>{user?.name}</p>
            <p className="line-clamp-1">{user?.email}</p>
          </div>
          <Separator className="my-4" />
          <ul>
            {dashboardLinks.map((dashboardLink) => (
              <li key={dashboardLink.path}>
                <NavLink
                  to={dashboardLink.path}
                  className={({ isActive }) =>
                    cn(
                      "mb-2 block rounded-lg px-4 py-2 hover:bg-gray-200",
                      isActive && "bg-gray-200 font-bold",
                    )
                  }
                  // className={({ isActive }) =>
                  //   [
                  //     "mb-2 block rounded-lg px-4 py-2 hover:bg-gray-200",
                  //     isActive ? "bg-gray-200 font-bold" : "",
                  //   ].join(" ")
                  // }
                >
                  {dashboardLink.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        <main className="col-span-2 md:col-start-2">
          <Outlet />
        </main>
      </div>
    </>
  );
}

// function DashboardLinks() {
//   return (
//     <div>DashboardLayout</div>
//   )
// }
