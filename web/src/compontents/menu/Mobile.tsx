import { Disclosure } from "@headlessui/react"
import { NavLink } from "react-router-dom"
import { classNames } from "../../hooks/Utils"

interface MenuItem {
  name: string
  href: string
}

interface MenuProps {
  navigation: Array<MenuItem>
}

const MenuMobile = ({ navigation }: MenuProps) => {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            aria-current="page"
            >
            {({ isActive }) =>
              <Disclosure.Button
                className={classNames(
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block text-left w-full px-3 py-2 rounded-md text-base font-medium'
                )}
              >{item.name}</Disclosure.Button>
            }
          </NavLink>
        ))}
      </div>
    </Disclosure.Panel>
  );
}

export default MenuMobile;
