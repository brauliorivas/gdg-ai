import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Message({ text, link = "https://github.com/shadcn.png", orientation }) {
  return (
    <div className={`flex ${orientation === "right" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-half flex items-center m-3 ${orientation === "right" ? "bg-[rgb(238,172,148)]" : "bg-[rgb(202,200,200)]"} text-black p-2 rounded-lg shadow-md`}>
        {orientation === "left" && (
          <Avatar>
            <AvatarImage src={link} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
        <div className="mx-2">{text}</div>
        {orientation === "right" && (
          <Avatar>
            <AvatarImage src={link} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}