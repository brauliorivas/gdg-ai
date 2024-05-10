import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Message({ text, link = "https://github.com/shadcn.png", orientation}) {
  return (
    <div className="flex flex-row items-center">
      {orientation === "left" && (
        <div>
          <Avatar>
            <AvatarImage src={link} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div>
        <div>{text}</div>
      </div>
      {orientation === "right" && (
        <div>
          <Avatar>
            <AvatarImage src={link} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  )
}

