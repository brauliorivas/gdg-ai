import Link from "next/link"

export default function NavBarItems({ type, link }) {
    return (
        <div>
            <Link href={link}><div>{type}</div></Link>
        </div>
    )
}