import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from "react-router-dom";
import { classNames } from '../../hooks/Utils';

interface MenuItem {
  name: string
  href: string
}

interface MenuProps {
  navigation: Array<MenuItem>
  open: Boolean
}

const Desktop = ({ navigation, open }: MenuProps) => {
  return (<>
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      {/* Mobile menu button*/}
      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        )}
      </Disclosure.Button>
    </div>
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
      <div className="flex flex-shrink-0 items-center">
        <span className="material-symbols-outlined text-white">spa</span>
        <span className="hidden text-xl ml-2 w-auto md:block text-white">GreenZone</span>
      </div>
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => classNames(
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'px-3 py-2 rounded-md text-sm font-medium'
              )}
              aria-current='page'
            >{item.name}</NavLink>
          ))}
        </div>
      </div>
    </div>
  </>);
};

export default Desktop;
