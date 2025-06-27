import { useState, useEffect, useCallback } from 'react';
import { getAllRegulationHistory } from '@/services/RegulationHistoryService';

export const useRegulationHistory = () => {
  const [regulations, setRegulations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchRegulations = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();
      
      const data = await getAllRegulationHistory();
      console.log("Fetched regulations:", data);
      
      // Đảm bảo loading tối thiểu 1.5s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      setRegulations(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching regulations:', err);
      setError(err);
      setRegulations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

//   const cancelRegulation = async (regulationId: number) => {
//     try {
//       await cancelQuyDinhLaiSuat(regulationId);
//       await fetchRegulations();
//       return { success: true };
//     } catch (err) {
//       console.error('Error cancelling regulation:', err);
//       throw err;
//     }
//   };

  useEffect(() => {
    console.log("Fetching regulations...");
    fetchRegulations();
  }, [fetchRegulations]);

  const refreshRegulations = useCallback(() => {
    fetchRegulations();
  }, [fetchRegulations]);

  return { 
    regulations, 
    isLoading, 
    error,
    refreshRegulations,
  };
};
