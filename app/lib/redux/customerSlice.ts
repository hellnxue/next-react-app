import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
  customerNames: string[];
}

const initialState: CustomerState = {
  customerNames: [],
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomerName: (state, action: PayloadAction<string>) => {
      state.customerNames.push(action.payload);
    },
    removeCustomerName: (state, action: PayloadAction<string>) => {
      state.customerNames = state.customerNames.filter(name => name !== action.payload);
    },
  },
});

export const { addCustomerName, removeCustomerName } = customerSlice.actions;
export default customerSlice.reducer;