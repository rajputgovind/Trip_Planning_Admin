import { forwardRef, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FAQData from "../public/faqs.svg";
import {
  MdAttachMoney,
  MdOutlineProductionQuantityLimits,
  MdOutlineReviews,
} from "react-icons/md";

import { RiCoupon3Line } from "react-icons/ri";

import { useRouter } from "next/router";

import cookie from "js-cookie";

import {
  AiOutlineHome,
  AiOutlineDollarCircle,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineProject,
  AiOutlineUnorderedList,
} from "react-icons/ai";

import { BiUserPin } from "react-icons/bi";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [userType, setUserType] = useState();
  return (
    <div className="sidebar-box">
      <div ref={ref} className="sidebar fixed w-58 h-full bg-white ">
        <div className="flex flex-col ">
          <Link href="/">
            <div
              className={`side-menu cursor-pointer ${
                router.pathname == "/"
                  ? " active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <AiOutlineHome />
              </div>
              <div className="menu-text">
                <p>Dashboard</p>
              </div>
            </div>
          </Link>

          <Link href="/users">
            <div
              className={`side-menu  ${
                router.pathname == "/users"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <AiOutlineUser />
              </div>
              <div>
                <p>Users Management</p>
              </div>
            </div>
          </Link>
          <Link href="/organizer">
            <div
              className={`side-menu  ${
                router.pathname == "/organizer" ||
                router.pathname == "/products"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <AiOutlineUser />
              </div>
              <div>
                <p>Organizer Management</p>
              </div>
            </div>
          </Link>
          <Link href="/tripCreators">
            <div
              className={`side-menu  ${
                router.pathname == "/tripCreators"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <AiOutlineDollarCircle />
              </div>
              <div>
                <p>Trips</p>
              </div>
            </div>
          </Link>
          {/* <Link href="/planfeatures">
            <div
              className={`side-menu  ${
                router.pathname == "/planfeatures" ||
                router.pathname == "/features"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <BiUserPin />
              </div>
              <div>
                <p>All Plan Features</p>
              </div>
            </div>
          </Link> */}

          {/* <Link href="/projects">
            <div
              className={`side-menu  ${
                router.pathname == "/projects" ||
                router.pathname === "/singleProject" ||
                router.pathname == "/editproject" ||
                router.pathname == "/furniture"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <AiOutlineProject />
              </div>
              <div>
                <p>Projects</p>
              </div>
            </div>
          </Link>
          <Link href="/orders">
            <div
              className={`side-menu  ${
                router.pathname == "/orders" ||
                router.pathname == "/orders/singleOrdersView"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <MdOutlineProductionQuantityLimits />
              </div>
              <div>
                <p>Orders</p>
              </div>
            </div>
          </Link>
          <Link href="/coupon">
            <div
              className={`side-menu  ${
                router.pathname === "/coupon"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <RiCoupon3Line />
              </div>
              <div>
                <p>Coupon</p>
              </div>
            </div>
          </Link>
          <Link href="/Faq">
            <div
              className={`side-menu  ${
                router.pathname === "/Faq"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <Image src={FAQData} />
               
              </div>
              <div>
                <p>FAQ</p>
              </div>
            </div>
          </Link>
          <Link href="/reviewproject">
            <div
              className={`side-menu  ${
                router.pathname === "/reviewproject" ||
                router.pathname === "/detailedreviewproject"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <MdOutlineReviews />
              </div>
              <div>
                <p>Reviews</p>
              </div>
            </div>
          </Link> */}
          <Link href="/setting">
            <div
              className={`side-menu  ${
                router.pathname === "/setting"
                  ? "active-menu primary-text"
                  : "text-white deactive-menu"
              }`}
            >
              <div className="menu-icon">
                <AiOutlineSetting />
              </div>
              <div>
                <p>Settings</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
