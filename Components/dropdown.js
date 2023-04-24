import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export const MARKER_ISSUES = {
    NOT_WORKING: "light is not working",
    STOLEN:"light got stolen",
    BROKEN:"light is broken",
    NOT_INSTALLED:"light is not installed, but showing on map",
    QUALITY_ISSUE:"light quality is not upto the mark"
}

const local_data = [
  {
    value: "NOT_WORKING",
    lable: MARKER_ISSUES.NOT_WORKING,
  
  },
  {
    value: 'STOLEN',
    lable: MARKER_ISSUES.STOLEN,
   
  },
  {
    value: 'BROKEN',
    lable: MARKER_ISSUES.BROKEN,
    
  },
  {
    value: "NOT_INSTALLED",
    lable: MARKER_ISSUES.NOT_INSTALLED,
 
  },
  {
    value: "QUALITY_ISSUE",
    lable: MARKER_ISSUES.QUALITY_ISSUE,
  
  },
];

const MarketIssue = props => {
    const {onValueChange} = props;
  const [value, selectedValue] = useState('1');

  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      maxHeight={200}
      value={value}
      data={local_data}
      valueField="value"
      labelField="lable"
      placeholder="Select country"
      searchPlaceholder="Search..."
      onChange={e => {
        onValueChange(e.value)
        selectedValue(e.value);
      }}
    />
  );
};

export default MarketIssue;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 250,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
});