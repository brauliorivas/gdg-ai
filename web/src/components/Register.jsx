import Link from "next/link"

export default function Register({ type, link }) {
  return (
    <Link href={link}>
      <div className="mx-3 my-3 cursor-pointer dark:bg-[rgb(252,118,00)] bg-[rgb(252,118,65)] px-10 py-20 rounded text-[30px] font-bold hover:bg-[rgb(238,172,148)]"> 
        {type}
      </div>
    </Link>
  )
}
