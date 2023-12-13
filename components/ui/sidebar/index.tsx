import styles from './sidebar.module.css';
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi";
import { IoFastFoodOutline, IoStatsChart, IoSettingsOutline, IoServerOutline, IoStorefrontOutline, IoDocumentTextOutline  } from "react-icons/io5";
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
    title: "Employees",
    list: [
      {
        title: "Users",
        path: "/users",
        icon: <HiOutlineUserGroup />,
      },
    ],
  },
  {
    title: "Suppliers",
    list: [
      {
        title: "Suppliers",
        path: "/suppliers",
        icon: <IoStorefrontOutline />,
      },
    ],
  },
  {
    title: "Products",
    list: [
      {
        title: "Products",
        path: "/products",
        icon: <IoFastFoodOutline />,
      },
    ],
  },
  {
    title: "Orders",
    list: [
      {
        title: "Orders",
        path: "/orders",
        icon: <IoFastFoodOutline />,
      },
    ],
  },
  {
    title: "Inventory",
    list: [
      {
        title: "Inventory",
        path: "/inventory",
        icon: <IoServerOutline />,
      },
    ],
  },
  {
    title: "Invoices",
    list: [
      {
        title: "Invoices",
        path: "/invoices",
        icon: <IoDocumentTextOutline />,
      },
    ],
  },
  {
    title: "Sales Reports",
    list: [
      {
        title: "Sales Reports",
        path: "/reports",
        icon: <IoStatsChart />,
      },
    ],
  },
  {
    title: "Settings",
    list: [
      {
        title: "Settings",
        path: "/settings",
        icon: <IoSettingsOutline />,
      },
    ],
  },
];

export default function SideBar() {
    return (
        <div className="flex flex-col bg-[#2F2C2B] min-h-full fixed">
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
        </div>
    )
}