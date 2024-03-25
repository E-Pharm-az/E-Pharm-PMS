import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {SheetTrigger, SheetContent, Sheet} from "@/components/ui/sheet"
import {Input} from "@/components/ui/input"
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu
} from "@/components/ui/dropdown-menu"
import {Link, Outlet, useLocation} from "react-router-dom";
import {BsBell, BsCart, BsPeople, BsSearch} from "react-icons/bs";
import {FiPackage} from "react-icons/fi";
import {IoIosMenu} from "react-icons/io";
import {BiHomeAlt} from "react-icons/bi";
import {AiOutlineLineChart} from "react-icons/ai";
import {FaRegUserCircle} from "react-icons/fa";

const DashboardLayout = () => {
    const location = useLocation();

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link to={"/"} className="flex items-center gap-2 font-semibold">
                            <span className="text-sm">Pharma Portal</span>
                        </Link>
                        <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                            <BsBell className="h-4 w-4"/>
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link to={"/dashboard"}
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                                      location.pathname === '/dashboard' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                  }`}
                            >
                                <BiHomeAlt className="h-4 w-4"/>
                                Dashboard
                            </Link>
                            <Link to={"/dashboard/orders"}
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                                      location.pathname === '/dashboard/orders' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                  }`}
                            >
                                <BsCart className="h-4 w-4"/>
                                Orders
                                <Badge
                                    className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
                            </Link>
                            <Link to="/dashboard/products"
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                                      location.pathname === '/dashboard/products' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                  }`}
                            >
                                <FiPackage className="h-4 w-4"/>
                                Products
                            </Link>
                            <Link to="/dashboard/team"
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                                      location.pathname === '/dashboard/team' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                  }`}
                            >
                                <BsPeople className="h-4 w-4"/>
                                Team
                            </Link>
                            <Link to={"/dashboard/analytics"}
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                                      location.pathname === '/dashboard/analytics' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                  }`}
                            >
                                <AiOutlineLineChart className="h-4 w-4"/>
                                Analytics
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="shrink-0 md:hidden" size="icon" variant="outline">
                                <IoIosMenu className="h-5 w-5"/>
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="flex flex-col" side="left">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link to={"/"} className="flex items-center gap-2 text-lg font-semibold">
                                    {/*Add the company profile here*/}
                                    <span className="sr-only">Pharma Portal</span>
                                </Link>
                                <Link to={"/dashboard"}
                                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                                            location.pathname === '/dashboard' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                      }`}
                                >
                                    <BiHomeAlt className="h-5 w-5"/>
                                    Dashboard
                                </Link>
                                <Link to={"/dashboard/orders"}
                                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                                          location.pathname === '/dashboard/orders' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                      }`}
                                >
                                    <BsCart className="h-5 w-5"/>
                                    Orders
                                    <Badge
                                        className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
                                </Link>
                                <Link to="/dashboard/products"
                                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                                          location.pathname === '/dashboard/products' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                      }`}
                                >
                                    <FiPackage className="h-5 w-5"/>
                                    Products
                                </Link>
                                <Link to={"/dashboard/team"}
                                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                                          location.pathname === '/dashboard/team' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                      }`}
                                >
                                    <BsPeople className="h-5 w-5"/>
                                    Team
                                </Link>
                                <Link to={"/dashboard/analytics"}
                                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                                          location.pathname === '/dashboard/analytics' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                      }`}
                                >
                                    <AiOutlineLineChart className="h-5 w-5"/>
                                    Analytics
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <BsSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                <Input type="search"
                                       className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                       placeholder="Search products..."
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full" size="icon" variant="secondary">
                                <FaRegUserCircle className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
