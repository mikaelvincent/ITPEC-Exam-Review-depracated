import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { KeyIcon } from 'lucide-react'

const Navbar = () => {
    return (
        <nav className='w-full h-16'>
            <div className='text-muted p-5 text-center w-full max-w-5xl mx-auto flex items-center justify-between'>
                <Link href='/'>
                    <Image src='/logo.svg' width={175} height={175} alt='logo' draggable={false} />
                </Link>
                <Link href='/sign-in'>
                    <Button size='lg' className='w-28 md:w-32 flex items-center gap-x-1.5 text-base font-medium bg-slate-700 hover:bg-slate-700/80 text-white transition-all shadow-[3px_3px_0px_gray] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]'>
                        <KeyIcon className='w-4 h-4 flex-shrink-0' />
                        Sign In
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar