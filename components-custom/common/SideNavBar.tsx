'use client';

import { signOut } from '@/lib/utils';
import {
  // Archive,
  // FileText,
  // FolderClosed,
  // Hammer,
  House,
  LogOut,
  NotepadText,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SideNavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const navItems = [
    { href: '/dashboard', icon: <House className="h-5 w-5" />, label: 'Home' },
    { href: '/listings', icon: <NotepadText className="h-5 w-5" />, label: 'Listing' },
    // { href: '/manage-shortlet', icon: <Archive className="h-5 w-5" />, label: 'Manage Shortlet' },
    // { href: '/find-artisans', icon: <Hammer className="h-5 w-5" />, label: 'Find Artisans' },
    // { href: '/declutter-items', icon: <FolderClosed className="h-5 w-5" />, label: 'Declutter Items' },
    // { href: '/financial-statement', icon: <FileText className="h-5 w-5" />, label: 'Financial Statement' },
    { href: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
    { 
      href: '#', 
      icon: <LogOut className="h-5 w-5" />, 
      label: 'Logout',
      onClick: handleSignOut 
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center p-0">
        <button onClick={() => setIsOpen(!isOpen)} className="text-blue-950">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Content (Desktop + Mobile Drawer) */}
      <div
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-md border-r border-gray-200 transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:w-64 md:block
        `}
      >
        <div className="flex px-6 mt-6 md:mt-5">
          <Image src="/assets/img/Jodex-logo-horizonal.svg" alt="jodex logo" width={150} height={150} />
        </div>

        <ul className="px-6 space-y-4 mt-6">
          {navItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {item.onClick ? (
                <button
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full text-[15px] px-4 py-2.5 font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-950 text-white'
                      : 'text-slate-800 hover:bg-blue-950 hover:text-white'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 w-full text-[15px] px-4 py-2.5 font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-950 text-white'
                      : 'text-slate-800 hover:bg-blue-950 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon} {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Optional: dark backdrop when menu is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideNavBar;