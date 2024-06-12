import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

export type itemsType = {
    label: string;
    id: number;
    value: number;
}

type Props = {
    values: itemsType[];
    dropdownTitle: string;
    value: number | null;
    onChangeValue: (value: number | null) => void;
}

function Dropdown({ dropdownTitle, values, value, onChangeValue }: Readonly<Props>) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<itemsType[]>(values.map(item => ({ ...item, value: item.id })))

  return (
    <View style={styles.container}>
      <Text style={styles.dropdownTitle}>{dropdownTitle}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue = typeof callback === 'function' ? callback(value) : callback
          onChangeValue(newValue)
        }}
        setItems={setItems}
        style={styles.picker}
        dropDownContainerStyle={styles.dropDownContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownTitle: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropDownContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
})

export default Dropdown
