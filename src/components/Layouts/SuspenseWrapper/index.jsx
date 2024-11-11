import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { ClockLoader } from "react-spinners";

const SuspenseWrapper = ({ children }) => {
  const { t } = useTranslation("page_loading");
  return (
    <Suspense
      fallback={
        <div className="fallback">
          {t("page_loading")} <ClockLoader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
