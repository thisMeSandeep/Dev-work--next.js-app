import { Bell, HelpCircle } from "lucide-react";
import Link from "next/link";
import ProfileDropdown, {
  DropdownLink,
} from "../profile-dropdown/ProfileDropdown";

interface NavItem {
  name: string;
  path: string;
}

interface UserType {
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string;
}

interface HeaderProps {
  navItems: NavItem[];
  profileLinks: DropdownLink[];
  user: UserType;
}

export default function Header({
  navItems,
  profileLinks,
  user,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-black/10 bg-white">
      {/* Logo + Nav */}
      <div className="flex items-center gap-8">
        <div className="text-lg font-semibold text-green-600">DevWork</div>
        <nav className="flex gap-6">
          {navItems.map((nav) => (
            <Link
              key={nav.name}
              href={nav.path}
              className="text-sm text-gray-700 transition-colors hover:text-green-600"
            >
              {nav.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button
          aria-label="Help"
          className="text-gray-700 hover:text-green-600 transition-colors"
        >
          <HelpCircle size={20} />
        </button>
        <button
          aria-label="Notifications"
          className="text-gray-700 hover:text-green-600 transition-colors"
        >
          <Bell size={20} />
        </button>

        {user && profileLinks.length > 0 && (
          <ProfileDropdown
            name={`${user.firstName} ${user.lastName}`}
            role={user.role}
            avatarText={`${user.firstName[0]}${user.lastName[0]}`.toUpperCase()}
            profileImage={user.profileImage}
            links={profileLinks}
          />
        )}
      </div>
    </header>
  );
}
