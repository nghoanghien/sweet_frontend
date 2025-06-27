import { useState, useEffect } from 'react';
import { getAllRegulationHistory } from '@/services/ApplicationScheduleService';

interface IRegulation {
  id: string;
  name: string;
  applicationDate: string;
  color: string;
  creator: string;
  minimumDeposit: number;
  noTermRate: number;
  description: string;
}

export const useApplicationSchedule = () => {
  const [regulations, setRegulations] = useState<IRegulation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchRegulations = async () => {
    try {
      setIsLoading(true);
      const data = await getAllRegulationHistory();
      console.log("Fetched application schedule regulations:", data);
      setRegulations(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching application schedule regulations:', err);
      setError(err);
      setRegulations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching application schedule regulations...");
    fetchRegulations();
  }, []);

  return { 
    regulations, 
    isLoading, 
    error
  };
};
