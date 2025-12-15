import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export function ButtonColorful({
    className,
    label = "Explore Components",
    ...props
}: ButtonColorfulProps) {
    return (
        <Button
            className={cn(
                "relative h-10 px-6 overflow-hidden",
                "bg-gradient-to-r from-blue-600 to-blue-500",
                "hover:from-blue-500 hover:to-blue-400",
                "border border-blue-400/30",
                "shadow-lg shadow-blue-500/25",
                "transition-all duration-300",
                "group",
                className
            )}
            {...props}
        >
            {/* Content */}
            <div className="relative flex items-center justify-center gap-2">
                <span className="text-white font-medium">{label}</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="currentColor" />
            </div>
        </Button>
    );
}
