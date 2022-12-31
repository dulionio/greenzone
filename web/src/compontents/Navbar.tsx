import { Disclosure } from '@headlessui/react'
import Mobile from './menu/Mobile';
import Desktop from './menu/Desktop';
import Profile from './menu/Profile';

const navigation = [
  { name: 'Dashboard', href: '/',        current: false },
  { name: 'Sensors',   href: '/sensors', current: false },
  { name: 'Devices',   href: '/devices', current: false },
  { name: 'Events',    href: '/events',  current: true },
]

export default function Navbar() {
  return (
    <Disclosure as="nav" className="w-full bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <Desktop navigation={navigation} open={open} />
              <Profile />
            </div>
          </div>
          <Mobile navigation={navigation} />
        </>
      )}
    </Disclosure>
  )
}

