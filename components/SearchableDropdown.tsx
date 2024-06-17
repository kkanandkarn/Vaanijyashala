import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { fonts } from '../src/constant';

interface DropdownOption {
  id: number;
  label: string;

}

interface DropdownProps {
  data: DropdownOption[];
  title?: string;
  onSelectValue: (option: DropdownOption) => void; // Pass selected option
}

interface GenderDropdownProps extends DropdownProps {
    error?: boolean;
    errorMessage?: string;
    placeholder?: string
  }
  

const SearchableDropdown: React.FC<GenderDropdownProps> = ({ data, title, onSelectValue,  error,
    errorMessage, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const [isFocus, setIsFocus] = useState(false);



  const handleDropdownChange = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelectValue(option); 
    setIsFocus(false);
   
  };



  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}<Text style={{color: 'red', fontSize: 20}}>*</Text></Text>}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }, error && { borderColor: 'red' }]}      
        searchPlaceholder="Search..."
        search
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="id"
        value={selectedOption}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => handleDropdownChange(item)} 
        placeholder={placeholder}
      />
       {error && errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 5,
    width: '99%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontFamily: fonts.POPPINS_BOLD
  },
});

export default SearchableDropdown;
