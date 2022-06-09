import React from 'react';

import {
    BellIcon,
    ChatIcon,
    GlobeIcon,
    PlusIcon,
    SparklesIcon,
    SpeakerphoneIcon,
    VideoCameraIcon,
} from '@heroicons/react/outline';

import {
    BeakerIcon,
    ChevronDownIcon,
    HomeIcon,
    MenuIcon,
    SearchIcon,
} from '@heroicons/react/solid';

import Image from '../node_modules/next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

function Header() {
    const { data: session } = useSession();

    return (
        <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
            <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
                <Image
                    src="https://links.papareact.com/fqy"
                    layout="fill"
                    objectFit="contain"
                    alt="logo"
                />
            </div>
            <div className="flex items-center mx-7 xl:min-w-[300px] ">
                <HomeIcon className="h-5 w-5" />
                <p className="flex-1 ml-2 hidden lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5" />
            </div>
            {/* Search box */}
            <form className="flex flex-1 items-center space-x-2 border  border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
                <SearchIcon className="w-6 h-6 text-gray-400" />
                <input
                    className="flex-1 bg-transparent outline-none "
                    type="text"
                    placeholder="Search Reddit..."
                />
                <button type="submit" hidden />
            </form>
            <div className=" items-center text-gray-500 space-x-2 mx-5 hidden lg:inline-flex">
                <SparklesIcon className="icon" />
                <GlobeIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-100" />
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <PlusIcon className="icon" />
                <SpeakerphoneIcon className="icon" />
            </div>
            <div className="flex items-center ml-5 lg:hidden">
                <MenuIcon className="icon" />
            </div>
            {/* Sign in/ Sign out button */}
            {session ? (
                <div
                    className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
                    onClick={() => signOut()}
                >
                    <div className="relative h-5 w-5 flex-shrink-0">
                        <Image
                            src="https://links.papareact.com/23l"
                            alt=""
                            layout="fill"
                        />
                    </div>
                    <div className="flex-1 text-sm">
                        <p className="truncate">{session?.user?.name}</p>
                        <p className="text-gray-400">1 Karma</p>
                    </div>
                    <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
                </div>
            ) : (
                <div
                    className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
                    onClick={() => signIn()}
                >
                    <div className="relative h-5 w-5 flex-shrink-0">
                        <Image
                            src="https://links.papareact.com/23l"
                            alt=""
                            layout="fill"
                        />
                    </div>
                    <p className="text-gray-400">Sign In</p>
                </div>
            )}
        </div>
    );
}

export default Header;
