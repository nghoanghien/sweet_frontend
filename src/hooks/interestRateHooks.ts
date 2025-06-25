import { useEffect, useState } from "react";
import { getInterestRateData } from "@/services/interestRateService";

export const useInterestRateData = (isOpen: boolean) => {
  const [interestRateData, setInterestRateData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      getInterestRateData().then(setInterestRateData).catch(() => setInterestRateData(null));
    }
  }, [isOpen]);

  return interestRateData;
};