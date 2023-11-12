import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useSidebarContext } from "@/hooks/useSidebar";

import { AiOutlineHome, AiFillBook } from "react-icons/ai";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

import Button from "@/components/buttons/button";
import Typography from "@/components/core/typography";

import { useAppStore } from "@/lib/store";

import { FaHistory } from "react-icons/fa";

const Sidebar = () => {
  const { logout, errorMessage } = useAppStore();
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } =
    React.useContext(useSidebarContext);

  async function logoutUser() {
    await logout();
    router.push("/");
  }
  return (
    <div className="sticky top-0">
      <Button variant="primary" className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </Button>
      <aside
        className="sidebar bg-primary-100 shadow-md"
        data-collapse={isCollapsed}
      >
        <div className="sidebar__top pt-1">
          <Typography variant="h4" className="pl-1">
            FENS
          </Typography>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`inline-block text-[1rem] text-typography-800 dark:text-typography-800 py-[0.7rem] px-[0.9rem] mb-[1rem] rounded-md ${
                    router.pathname === href
                      ? "bg-primary-300 dark:bg-quaternary-300"
                      : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar__icon translate-y-1">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
          <div className="absolute bottom-5 pl-2">
            <Button variant="ghost" onClick={logoutUser}>
              <span className="sidebar__icon">
                <AiOutlineLogout className="text-typography-800" />
              </span>
              <span className="sidebar__name text-typography-800 -translate-y-1">
                Logout
              </span>
            </Button>
          </div>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: AiOutlineHome,
  },
  {
    name: "Mata kuliah",
    href: "/dashboard/matakuliah",
    icon: AiFillBook,
  },
  {
    name: "logs",
    href: "/dashboard/logs",
    icon: FaHistory,
  },
];
