import styles from './sidebar.module.css';
import { HiOutlineHome, HiOutlineUser, HiOutlineUserGroup, HiOutlineTruck, HiOutlineCube, HiOutlineShoppingCart, HiOutlineCircleStack, HiOutlineDocument, HiOutlinePresentationChartLine, HiOutlineCalendarDays } from 'react-icons/hi2';
import MenuLink from './menuLink';

const menuItems = [
  {
    title: "Dashboard",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <HiOutlineHome />,
      },
    ],
  },
  {
    title: "Customers",
    list: [
      {
        title: "Customers",
        path: "/customers",
        icon: <HiOutlineUserGroup />,
      },
    ],
  },
  {
    title: "Employees",
    list: [
      {
        title: "Users",
        path: "/users",
        icon: <HiOutlineUser />,
      },
    ],
  },
  {
    title: "Suppliers",
    list: [
      {
        title: "Suppliers",
        path: "/suppliers",
        icon: <HiOutlineTruck />,
      },
    ],
  },
  {
    title: "Products",
    list: [
      {
        title: "Products",
        path: "/products",
        icon: <HiOutlineCube />,
      },
    ],
  },
  {
    title: "Orders",
    list: [
      {
        title: "Orders",
        path: "/orders",
        icon: <HiOutlineShoppingCart />,
      },
    ],
  },
  {
    title: "Inventory",
    list: [
      {
        title: "Inventory",
        path: "/inventory",
        icon: <HiOutlineCircleStack />,
      },
    ],
  },
  {
    title: "Invoices",
    list: [
      {
        title: "Invoices",
        path: "/invoices",
        icon: <HiOutlineDocument />,
      },
    ],
  },
  {
    title: "Shifts",
    list: [
      {
        title: "Shifts",
        path: "/shifts",
        icon: <HiOutlineCalendarDays />,
      },
    ],
  },
  {
    title: "Sales Reports",
    list: [
      {
        title: "Sales Reports",
        path: "/reports",
        icon: <HiOutlinePresentationChartLine />,
      },
    ],
  }
];

export default function SideBar() {
    return (
      // <div className='h-full'>
        // <div className="custom-scrollbar fixed max-md:sticky left-0 top-0 z-20 max-h-full w-52 flex flex-col justify-start bg-[#2F2C2B] border-r min-h-full overflow-auto max-md:w-20 ">
        <div className="custom-scrollbar fixed left-0 top-0 z-20 max-h-full flex flex-col justify-start bg-[#2F2C2B] border-r min-h-full overflow-auto ">
            <div className="flex items-center">
                <h1 className='font-extrabold text-white text-3xl mx-auto pt-2 mb-6'>Coffake</h1>
            </div>
            <ul className="">
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                       <MenuLink title={cat.title} path={cat.list[0].path} icon={cat.list[0].icon} />
                    </li>
                ))}
            </ul>
        {/* </div> */}

      </div>
    )
}