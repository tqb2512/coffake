import styles from './sidebar.module.css';
import { HiOutlineHome, HiOutlineUser, HiOutlineUserGroup, HiOutlineTruck, HiOutlineCube, HiOutlineShoppingCart, HiOutlineCircleStack, HiOutlineDocument, HiOutlinePresentationChartLine } from 'react-icons/hi2';
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