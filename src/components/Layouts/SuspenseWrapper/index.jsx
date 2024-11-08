import { Suspense } from "react";
import { ClockLoader } from "react-spinners";

const SuspenseWrapper = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="fallback">
          Page Loading <ClockLoader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
