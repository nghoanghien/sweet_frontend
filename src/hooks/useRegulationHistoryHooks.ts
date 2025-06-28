import { useState, useEffect, useCallback } from 'react';
import { getAllRegulationHistory, cancelRegulation as cancelRegulationService } from '@/services/RegulationHistoryService';

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

  const cancelRegulation = async (regulationId: number) => {
    try {
      await cancelRegulationService(regulationId);
      // Refresh the regulations list after successful cancellation
      await fetchRegulations();
    } catch (err) {
      console.error('Error cancelling regulation:', err);
      throw err;
    }
  };

  useEffect(() => {
    console.log("Fetching regulations...");
    fetchRegulations();
  }, [fetchRegulations]);

  return { 
    regulations, 
    isLoading, 
    error,
    cancelRegulation // Export the cancelRegulation function
  };
};
