type DataTableToolbarProps = {
  children: React.ReactNode;
};

export default function DataTableToolbar({ children }: DataTableToolbarProps) {
  return <div className="flex items-center justify-between">{children}</div>;
}
