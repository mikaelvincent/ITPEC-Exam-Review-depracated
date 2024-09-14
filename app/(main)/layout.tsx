import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import React, { PropsWithChildren } from 'react'

const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className='flex min-h-dvh w-full flex-col items-center justify-between dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative'>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default MainLayout