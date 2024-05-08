import {Logo} from './Logo';
export function NavBar(){
    return(
        <div className='flex'>
            <div className='flex'>
                <Logo/>
                <ul className='flex'>
                    <li>Update</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>

            </div>
        </div>
    );
}