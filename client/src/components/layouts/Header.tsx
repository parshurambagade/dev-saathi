import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/appStore";
import useLogout from "@/hooks/useLogout";

const Header = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const user = useSelector((store: RootState) => store.user.userInfo);

  const { handleLogout } = useLogout();

  const handleLogoutClick = () => {
    handleLogout();
    setIsAlertOpen(false);
  };
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
        >
          devTinder
        </Link>
      </div>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/premium" className="w-full">
                Premium
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/connections" className="w-full">
                Connections
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/requests" className="w-full">
                Requests
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsAlertOpen(true)}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account and redirected to the login
              page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
              onClick={handleLogoutClick}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Header;
