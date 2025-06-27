import { useState, useEffect } from 'react';
import { getAllRegulationHistory } from '@/services/RegulationHistoryService';

export const useRegulationHistory = () => {
  const [regulations, setRegulations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchRegulations = async () => {
    try {
      setIsLoading(true);
      const data = await getAllRegulationHistory();
      console.log("Fetched regulations:", data);
      setRegulations(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching regulations:', err);
      setError(err);
      setRegulations([]);
    } finally {
      setIsLoading(false);
    }
  };

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
  }, []);

  return { 
    regulations, 
    isLoading, 
    error,
  };
};
