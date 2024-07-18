import Navbar from "../components/Navbar";

type ArticleLayoutProps = {
  children: React.ReactNode;
};

export default function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <div className="relative">
      <Navbar />
      {/* <div className="absolute left-0 top-0 -z-10 h-[500px] w-full bg-gray-400"></div> */}
      <div className="container py-10">{children}</div>
    </div>
  );
}
