import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomerState {
  customerNames: string[];
  addCustomerName: (name: string) => void;
  removeCustomerName: (name: string) => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customerNames: [],
      addCustomerName: (name: string) =>
        set((state) => ({
          customerNames: [...state.customerNames, name],
        })),
      removeCustomerName: (name: string) =>
        set((state) => ({
          customerNames: state.customerNames.filter((n) => n !== name),
        })),
    }),
    {
      name: 'customer-storage',
    }
  )
);