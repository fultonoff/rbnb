import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import desktopLogo from '../../public/airbnb-desktop.png'
import mobilLogo from '../../public/airbnb-mobile.webp'
import Usernav from './Usernav'

const Navbar = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto lg:px-10 p-5">
        <Link href="/">
          <Image
            src={desktopLogo}
            alt="desktop logo"
            className="w-32 hidden lg:block"
          />
          <Image
            src={mobilLogo}
            alt="desktop logo"
            className="w-12 lg:hidden"
          />
        </Link>
        <div className="rounded-full border px-5 py-2">
          <h1>Hello world</h1>
        </div>

        <Usernav />
      </div>
    </nav>
  );
}

export default Navbar