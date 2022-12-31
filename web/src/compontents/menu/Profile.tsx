import { Menu, Transition } from "@headlessui/react";
import { MoonIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { classNames } from "../../hooks/Utils";

const Profile = () => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        type="button"
        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="sr-only">Dark Mode</span>
        <MoonIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <NavLink
                to="/profile"
                className={({ isActive }) => classNames(
                  isActive
                    ? 'bg-gray-300'
                    : 'hover:bg-gray-200',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
                aria-current='page'
              >Profile</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink
                to="/settings"
                className={({ isActive }) => classNames(
                  isActive
                    ? 'bg-gray-300'
                    : 'hover:bg-gray-200',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
                aria-current='page'
              >Settings</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink
                to="/login"
                className={({ isActive }) => classNames(
                  isActive
                    ? 'bg-gray-300'
                    : 'hover:bg-gray-200',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
                aria-current='page'
              >Sign Out</NavLink>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Profile;
