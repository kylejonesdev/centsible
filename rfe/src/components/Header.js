export default function Header() {

    return(
        <header>
            <nav className="bg-primary">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        {/* <% if(typeof user === 'object' && user) { %> */}
                            <button id="mobile-menu-button" type="button" className="inline-flex items-center justify-center rounded-md p-2 text-base-300 hover:bg-primary-focus hover:text-base-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                {/* <!--
                                Icon when menu is closed.
                    
                                Heroicon name: outline/bars-3
                    
                                Menu open: "hidden", Menu closed: "block"
                                --> */}
                                <svg id="hamburger-symbol" className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                {/* <!--
                                Icon when menu is open.
                    
                                Heroicon name: outline/x-mark
                    
                                Menu open: "block", Menu closed: "hidden"
                                --> */}
                                <svg id="x-symbol" className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-accent"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                                <h1 className="hidden sm:flex text-xl text-accent font-bold pl-2">Centsible</h1>
                                {/* <!-- <img className="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                                <img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> --> */}
                            </div>
                            {/* <% if(typeof user === 'object' && user) { %> */}
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                                    <!-- <a href="/reports/dashboard" className="bg-primary-focus text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a> --> */}
                                    <a href="/dashboard" className="text-base-300 hover:bg-primary-focus hover:text-base-100 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>

                                    <a href="/transactions" className="text-base-300 hover:bg-primary-focus hover:text-base-100 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Transactions</a>
                        
                                    {/* <a href="/entities" className="text-base-300 hover:bg-primary-focus hover:text-base-100 px-3 py-2 rounded-md text-sm font-medium">Entities</a>
                        
                                    <a href="/accounts" className="text-base-300 hover:bg-primary-focus hover:text-base-100 px-3 py-2 rounded-md text-sm font-medium">Accounts</a>                 */}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* <% if(typeof user === 'object' && user) { %> */}
                            <button type="button" className="rounded-full bg-primary p-1 text-base-300 hover:text-base-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Sign Out</span>
                                {/* <!-- Heroicon name: outline/bell -->
                                <!-- <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg> --> */}
                                <a href="/logout" className="fa-solid fa-right-from-bracket fa-lg text-base-300 hover:bg-primary-focus hover:text-base-100 px-3 py-5 rounded-md" title="Logout"></a>
                            </button>          
                            {/* Profile dropdown */}
                            <div className="relative ml-3">
                                {/* <% if(typeof user === 'object' && user) { %> */}
                                <div>
                                    <button type="button" className="flex rounded-full bg-primary text-sm" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    {/* <button type="button" className="flex rounded-full bg-primary text-sm hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true"> */}
                                        <span className="sr-only">Open user menu</span>
                                        {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> */}
                                        <span className="fa-solid fa-user fa-xl text-gray-300 self-center pl-3"></span>
                                        <p className="hidden md:block text-base-300 font-medium p-3">User</p>
                                    </button>                  
                                </div>
                                {/* Dropdown menu, show/hide based on menu state.
                    
                                Entering: "transition ease-out duration-100"
                                    From: "transform opacity-0 scale-95"
                                    To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                    From: "transform opacity-100 scale-100"
                                    To: "transform opacity-0 scale-95" */}
                                <div className="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-base-100 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                    {/* Active: "bg-gray-100", Not Active: "" */}
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* <!-- Mobile menu, show/hide based on menu state. -->
                <% if(typeof user === 'object' && user) { %> */}
                <div id="mobile-menu" className="hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <a href="/dashboard" className="text-base-300 hover:bg-primary-focus hover:text-base-100 block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>
                
                        <a href="/transactions" className="text-base-300 hover:bg-primary-focus hover:text-base-100 block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Transactions</a>

                        <a href="/entities" className="text-base-300 hover:bg-primary-focus hover:text-base-100 block px-3 py-2 rounded-md text-base font-medium">Entities</a>
                
                        <a href="/accounts" className="text-base-300 hover:bg-primary-focus hover:text-base-100 block px-3 py-2 rounded-md text-base font-medium">Accounts</a>

                    </div>
                </div>
            </nav>
        </header>
    )

}