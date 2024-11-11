import { useTranslation } from "react-i18next";
import "./styles.css";

const AboutTask = () => {
  const { t } = useTranslation();
  return (
    <div className="about-task-wrapper">
      <p className="fade-in-move">{t("skillex")}</p>
      <p className="fade-in-move">{t("name_surname")}</p>
      <p className="fade-in-move">{t("task")}</p>
      <p className="fade-in-move">{t("task_title")}</p>
    </div>
  );
};

export default AboutTask;
