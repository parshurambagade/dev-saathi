import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/appStore";
import useLogout from "@/hooks/useLogout";
import {
  User,
  LogOut,
  Crown,
  Heart,
  Users,
  MessageSquare,
  Menu,
  CodeXml,
} from "lucide-react";

const Header = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const user = useSelector((store: RootState) => store.user.userInfo);

  const { handleLogout } = useLogout();

  const handleLogoutClick = () => {
    handleLogout();
    setIsAlertOpen(false);
  };
  return (
    <header className="w-full border-b border-border/50 bg-gradient-to-r from-card/95 to-card backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="group flex items-center space-x-2 transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center mr-2 shadow-lg">
                <CodeXml className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold group-hover:from-primary/80 group-hover:to-accent/80 transition-all duration-200 text-primary">
                DevSaathi
              </span>
            </div>
          </Link>
        </div>

        {user && (
          <>
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className="group flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Heart className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>Discover</span>
              </Link>
              <Link
                to="/connections"
                className="group flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Users className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>Connections</span>
              </Link>
              <Link
                to="/requests"
                className="group flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <MessageSquare className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>Requests</span>
              </Link>
              <Link
                to="/premium"
                className="group flex items-center space-x-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors cursor-pointer"
              >
                <Crown className="h-4 w-4" />
                <span className="font-semibold">Premium</span>
                <Badge
                  variant="secondary"
                  className="bg-accent/20 text-accent border-accent/30 px-2 py-0.5 text-xs"
                >
                  Pro
                </Badge>
              </Link>
            </nav>

            {/* User Avatar and Dropdown */}
            <div className="flex items-center space-x-3">
              {/* User Profile Dropdown - Desktop Only */}
              <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="relative">
                      <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200 border border-border">
                        <AvatarImage
                          src={user?.imageUrl || ""}
                          alt={user?.firstName || "User Avatar"}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                          {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-[2px] -right-[2px] h-3 w-3 bg-green-500 border-2 border-card rounded-full"></div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-card border-border"
                  >
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-foreground">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="w-full cursor-pointer flex items-center space-x-2 hover:bg-secondary/50 focus:bg-secondary/50"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 focus:bg-destructive/10 flex items-center space-x-2"
                      onClick={() => setIsAlertOpen(true)}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu Button with All Options */}
              <div className="lg:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                      <Menu className="h-5 w-5 text-foreground" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-card border-border"
                  >
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-foreground">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="px-3 py-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Navigation
                      </p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/"
                        className="w-full cursor-pointer flex items-center space-x-2 hover:bg-secondary/50 focus:bg-secondary/50"
                      >
                        <Heart className="h-4 w-4" />
                        <span>Discover</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/connections"
                        className="w-full cursor-pointer flex items-center space-x-2 hover:bg-secondary/50 focus:bg-secondary/50"
                      >
                        <Users className="h-4 w-4" />
                        <span>Connections</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/requests"
                        className="w-full cursor-pointer flex items-center space-x-2 hover:bg-secondary/50 focus:bg-secondary/50"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Requests</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/premium"
                        className="w-full cursor-pointer flex items-center space-x-2 text-accent hover:bg-accent/10 focus:bg-accent/10"
                      >
                        <Crown className="h-4 w-4" />
                        <span>Premium</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="px-3 py-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Account
                      </p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="w-full cursor-pointer flex items-center space-x-2 hover:bg-secondary/50 focus:bg-secondary/50"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 focus:bg-destructive/10 flex items-center space-x-2"
                      onClick={() => setIsAlertOpen(true)}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </>
        )}
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground flex items-center space-x-2">
              <LogOut className="h-5 w-5 text-destructive" />
              <span>Confirm Logout</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to logout from DevSaathi? You will be
              redirected to the login page and need to sign in again to access
              your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer bg-secondary hover:bg-secondary/80 text-foreground border-border">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={handleLogoutClick}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Header;
