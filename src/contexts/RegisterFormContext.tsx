// src/contexts/RegisterFormContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface FormData {
  selectedRole: number;  // Ensure this is always a number
  email: string;
  name: string;
  referralCode: string;
  isChecked: boolean;
}

interface RegisterFormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const RegisterFormContext = createContext<RegisterFormContextType | undefined>(undefined);

interface RegisterFormProviderProps {
  children: ReactNode;
}

export const RegisterFormProvider: React.FC<RegisterFormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    selectedRole: 1,
    email: '',
    name: '',
    referralCode: '',
    isChecked: false,
  });

  return (
    <RegisterFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </RegisterFormContext.Provider>
  );
};
