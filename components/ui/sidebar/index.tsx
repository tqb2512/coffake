import styles from './sidebar.module.css';
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi";
import { IoFastFoodOutline, IoStatsChart, IoSettingsOutline, IoServerOutline, IoStorefrontOutline } from "react-icons/io5";
import MenuLink from './menuLink';

const menuItems = [
    {
        title: "Dashboard",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <HiOutlineHome/>,
            }
        ],
    },
    {
        title: "Users",
        list: [
            {
                title: "Users",
                path: "/users",
                icon: <HiOutlineUserGroup/>,
            }
        ]
    },
    {
        title: "Suppliers",
        list: [
            {
                title: "Suppliers",
                path: "/suppliers",
                icon: <IoStorefrontOutline/>,
            }
        ]
    },
    {
        title: "Products",
        list: [
            {
                title: "Products",
                path: "/products",
                icon: <IoFastFoodOutline/>,
            }
        ]
    },
    {
        title: "Inventory",
        list: [
            {
                title: "Inventory",
                path: "/inventory",
                icon: <IoServerOutline/>,
            }
        ]
    },
    {
        title: "Sales Reports",
        list: [
            {
                title: "Sales Reports",
                path: "/reports",
                icon: <IoStatsChart/>,
            }
        ]
    },
    {
        title: "Settings",
        list: [
            {
                title: "Settings",
                path: "/settings",
                icon: <IoSettingsOutline/>,
            }
        ]
    }
]

export default function SideBar() {
    return (
        <div className="">
            <div className="">
                <h1>Coffake</h1>
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