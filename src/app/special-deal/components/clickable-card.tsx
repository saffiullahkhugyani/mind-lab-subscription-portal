import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LucideAArrowDown, LucideIcon, Send } from "lucide-react";
import React from "react";

interface ClickableCardProps {
  onClick?: () => void;
  icon?: LucideIcon;
  title: string;
  iconColor?: string;
}

export default function ClickableCard({
  onClick,
  icon,
  title,
  iconColor,
}: ClickableCardProps) {
  return (
    <Card
      className="w-[250px] h-[150px] hover:cursor-pointer hover:bg-accent"
      onClick={onClick}
    >
      <CardContent className="h-full flex flex-col justify-center items-center p-6 gap-2 ">
        <div className="items-center">
          {icon &&
            React.createElement(icon, {
              className: iconColor ? iconColor : "text-primary",
            })}
        </div>
        <div className="text-sm text-center font-medium text-gray-600">
          {title}
        </div>
        <Separator />
      </CardContent>
    </Card>
  );
}
