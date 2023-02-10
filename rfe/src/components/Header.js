
function MobileMenuButton({ visible }) {
    if (visible) return (
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
    );
    return null;
}

function HeaderNav({ visible }) {
    if (visible) {
        return (
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

        )
    }

    return (
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-accent"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                <h1 className="hidden sm:flex text-xl text-accent font-bold pl-2">Centsible</h1>
                {/* <!-- <img className="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                <img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> --> */}
            </div>
        </div>
    );
}

export default function Header({ navVisible }) {

    return(
        <header>
            <nav className="bg-primary">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <MobileMenuButton visible={navVisible} />
                        <HeaderNav visible={navVisible} />
                    </div>
                </div>
            
                {/* <!-- Mobile menu, show/hide based on menu state. -->*/}
                <div id="mobile-menu" className="hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <a href="/dashboard" className="text-base-300 hover:bg-primary-focus hover:text-base-100 block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>
                
                        <a href="/transactions" className="text-base-300 hover:bg-primary-focus hover:text-base-100 block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Transactions</a>

                        {/* <a href="/entities" className="text-base-300 hover:bg-primary-focus hover:text-base-100 block px-3 py-2 rounded-md text-base font-medium">Entities</a>
                
                        <a href="/accounts" className="text-base-300 hover:bg-primary-focus hover:text-base-100 block px-3 py-2 rounded-md text-base font-medium">Accounts</a> */}

                    </div>
                </div>
            </nav>
        </header>
    )

}