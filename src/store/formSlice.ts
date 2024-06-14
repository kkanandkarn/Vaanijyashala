import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

interface FormData {
    selectedRole: number;
    inputForm : string,
    email: string;
    name: string;
    referralCode: string;
    isChecked: boolean;
}

const initialState: FormData = {
    selectedRole: 1,
    inputForm: '',
    email: '',
    name: '',
    referralCode: '',
    isChecked: false
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormData(state, action: PayloadAction<Partial<FormData>>) {
            return {...state, ...action.payload}
        },
        resetFormData() {
            return initialState;
        }
    }
    
})

export const {setFormData, resetFormData} = formSlice.actions
export default formSlice.reducer