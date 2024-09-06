interface TopTabProps {
  isActive?: boolean;
  children: React.ReactNode;
}

const TopTab = ({ isActive, children }: TopTabProps) => {
  return (
    <div
      className={`flex cursor-pointer items-center gap-4 py-[18px] text-14 font-semibold md:text-16 ${isActive ? 'text-var-gray-900' : 'text-var-orange-50'}`}
    >
      {children}
    </div>
  );
};

export default TopTab;
