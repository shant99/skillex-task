import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const links = [
    { name: t("header.home"), path: "/" },
    { name: t("header.products"), path: "/products" },
  ];

  return (
    <header>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={`${link.name}_${index}`}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
