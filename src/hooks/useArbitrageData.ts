import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOpportunities, executeTrade } from '../services/api';
import { updateBankroll } from '../services/bankrollService';
import { useBankrollStore } from '../lib/store';

export function useArbitrageOpportunities() {
  return useQuery({
    queryKey: ['opportunities'],
    queryFn: fetchOpportunities,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useExecuteTrade() {
  const queryClient = useQueryClient();
  const { updateAllocatedFunds } = useBankrollStore();

  return useMutation({
    mutationFn: async ({ opportunityId, stakes }: { 
      opportunityId: number; 
      stakes: { stake1: number; stake2: number; }
    }) => {
      const result = await executeTrade(opportunityId);
      // Update allocated funds after successful trade
      updateAllocatedFunds(stakes.stake1 + stakes.stake2);
      return result;
    },
    onSuccess: () => {
      // Invalidate and refetch opportunities after successful trade
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
  });
}

export function useBankrollUpdate() {
  const queryClient = useQueryClient();
  const { updateBankroll: updateStoreBankroll } = useBankrollStore();

  return useMutation({
    mutationFn: async (amount: number) => {
      const result = await updateBankroll(amount);
      updateStoreBankroll(amount);
      return result;
    },
    onSuccess: () => {
      // Refresh relevant queries after bankroll update
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
}

const fetchArbitrageData = async () => {
  const response = await fetch('/api/arbitrage_data');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useArbitrageData = () => {
  return useQuery({
    queryKey: ['arbitrageData'],
    queryFn: fetchArbitrageData,
  });
};

// Example usage of updateBankroll
export const handleBankrollUpdate = async (amount: number) => {
  try {
    const result = await updateBankroll(amount);
    console.log('Bankroll updated successfully:', result);
  } catch (error) {
    console.error('Failed to update bankroll:', error);
  }
};