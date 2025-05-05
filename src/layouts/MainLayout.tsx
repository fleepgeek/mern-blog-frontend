import Header from "../components/Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="container py-10">{children}</main>
    </>
  );
}
