import { useState, useEffect, useCallback } from 'react';
import { getRegulationCurrent, createOrUpdateRegulation } from '@/services/RegulationHistoryService';
import { IQuyDinhLaiSuatReqDTO } from '@/types/quyDinhLaiSuat.d';

interface IRegulation {
  id: string;
  createdAt: string;
  applicationDate: string | null;
  description: string;
  creator: {
    id: string;
    name: string;
  };
  minimumDeposit: number;
  noTermRate: number;
  savingsTypes: Array<{
    id: string;
    name: string;
    terms: Array<{
      id: string;
      months: number;
    }>;
    interestRates: Array<{
      termId: string;
      frequencyId: string;
      rate: number;
    }>;
    disabledFrequencies: string[];
  }>;
  paymentFrequencies: Array<{
    id: string;
    name: string;
  }>;
  isCancelled: boolean;
}

export const useCreateRegulation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<any>(null);
  const [createdRegulation, setCreatedRegulation] = useState<IRegulation | null>(null);

  const createRegulation = useCallback(async (regulationData: IQuyDinhLaiSuatReqDTO) => {
    try {
      setIsCreating(true);
      setError(null);
      
      const startTime = Date.now();
      
      // Gọi API để tạo quy định mới
      const response = await createOrUpdateRegulation(regulationData);
      console.log("Response:", response);
      
      // Đảm bảo loading tối thiểu 1s để tránh nhấp nháy giao diện
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      if (response.error) {
        console.log("Error:", response.error);
        setError(response.error);
        throw response.error;
      }
      
      setCreatedRegulation(response.data);
      return response;
    } catch (err) {
      console.error('Lỗi khi tạo quy định mới:', err);
      setError(err);
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  return {
    createRegulation,
    isCreating,
    error,
    createdRegulation
  };
};

export const useRegulationCurrent = () => {
  const [regulations, setRegulations] = useState<IRegulation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchRegulations = useCallback(async () => {
    try {
      setIsLoading(true);
      const startTime = Date.now();
      
      const data = await getRegulationCurrent();
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

  useEffect(() => {
    console.log("Fetching regulations........");
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
