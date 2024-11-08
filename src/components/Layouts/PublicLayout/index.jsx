import { Outlet } from "react-router-dom";
import "./styles.css";
import Header from "./Header";
import { useTranslation } from "react-i18next";

const PublicLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="layout">
      <div className="wrapper">
        <Header />

        <main className="main">
          <Outlet />
        </main>

        <footer>
          <p>{t("footer")}</p>
        </footer>
      </div>
    </div>
  );
};

export default PublicLayout;
