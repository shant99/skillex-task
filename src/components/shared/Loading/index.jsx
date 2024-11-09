import { useTranslation } from "react-i18next";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="loading">
      {t("loading_products")} <BeatLoader />
    </div>
  );
};

export default Loading;
