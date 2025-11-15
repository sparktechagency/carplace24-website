export interface NavItemType {
  href: string;
  label: string;
}

export const navItems: NavItemType[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/vehicles",
    label: "Search",
  },
  {
    href: "/pricing",
    label: "Pricing",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/blogs",
    label: "Blogs",
  },
  {
    href: "/contact-us",
    label: "Contact us",
  },
];
