function DashBoardCard({ icon, title, subTitle }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-[10px] bg-brand-white py-3 lg:py-10">
      <div className="flex items-center gap-1">
        <span className="h-6 w-6 text-brand-primary">{icon}</span>
        <span className="text-3xl font-semibold text-brand-dark-blue">
          {title}
        </span>
      </div>
      <span className="text-center text-xs">{subTitle}</span>
    </div>
  );
}

export default DashBoardCard;
