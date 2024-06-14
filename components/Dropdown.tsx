import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const DropdownComponent: React.FC<DropdownProps> = ({ data, title, onSelectValue }) => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    data.find(option => option.id === 1) || null
  );
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
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}      
        searchPlaceholder="Search..."
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="id"
        value={selectedOption}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => handleDropdownChange(item)} 
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
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

export default DropdownComponent;
