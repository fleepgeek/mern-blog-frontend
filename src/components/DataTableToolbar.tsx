type DataTableToolbarProps = {
  children: React.ReactNode;
};

export default function DataTableToolbar({ children }: DataTableToolbarProps) {
  return (
    <div className="items-center justify-between space-y-4 md:flex md:space-y-0">
      {children}
    </div>
  );
}
