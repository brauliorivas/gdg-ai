import Link from 'next/link';
import { Logo } from './Logo'; 
export function NavBar(){
    return(
        <div className='flex'>
            <div className='flex'>
                <Link href="/web/src/app/Home"><Logo/></Link>
                <ul className='flex'>
                    <Link href="/web/src/app/Home"><li>Home</li></Link>
                    <Link href="/web/src/app/Update"><li>Update</li></Link>
                    <Link href="/web/src/app/About">About</Link>
                    <Link href="/web/src/app/Contacts">Contact</Link>
                </ul>
            </div>
            <div>
            <Link href="/web/src/app/login"><button>Start</button></Link>
            <Link href="/web/src/app/Chat"><button>chat</button></Link>
            </div>
        </div>
    );
}