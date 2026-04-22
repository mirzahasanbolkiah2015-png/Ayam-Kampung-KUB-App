import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  color?: "green" | "amber" | "blue" | "purple" | "red" | "teal";
}

const colorMap = {
  green: "from-[oklch(0.42_0.15_148)] to-[oklch(0.55_0.14_155)]",
  amber: "from-[oklch(0.62_0.16_70)] to-[oklch(0.72_0.18_80)]",
  blue: "from-[oklch(0.45_0.15_230)] to-[oklch(0.55_0.15_240)]",
  purple: "from-[oklch(0.42_0.18_290)] to-[oklch(0.52_0.18_300)]",
  red: "from-[oklch(0.48_0.20_25)] to-[oklch(0.56_0.20_30)]",
  teal: "from-[oklch(0.45_0.14_190)] to-[oklch(0.55_0.14_200)]",
};

export default function PageHeader({
  title,
  subtitle,
  icon,
  className,
  color = "green",
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden px-4 pt-10 pb-6 text-white",
        `bg-gradient-to-br ${colorMap[color]}`,
        className
      )}
    >
      {/* decorative circles */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/8" />

      <div className="relative flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold leading-tight text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm mt-0.5 text-white/80 leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
}
