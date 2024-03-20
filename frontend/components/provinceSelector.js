import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [{ label: "Alberta" }, { label: "British Columbia" }, { label: "Manitoba" },
{ label: "Newfoundland And Labrador" }, { label: "Nova Scotia" }, { label: "Northwest Territories" },
{ label: "Nunavut" }, { label: "Ontario" }, { label: "Prince Edward Island" },
{ label: "Quebec" }, { label: "Saskatchewan" }, { label: "Yukon Territory" }];

const ProvinceSelector = ({ province, setProvince }) => {
    return (
        <Dropdown
            style={styles.dropdown}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Select Prov./Terr."
            placeholderStyle={styles.placeholderText}
            selectedTextProps={styles.selectedText}
            value={province}
            onChange={item => {
                setProvince(item.label);
            }}
        />
    );
};

export default ProvinceSelector;

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: "#F9F9F9",
        marginBottom: 20,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 15,
        width: "48%",
    },
    placeholderText: {
        color:'rgba(0, 0, 0, 0.5)',
        fontSize:13,
    },
    selectedText: {
        numberOfLines: 1
    }
});