import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [{ label: "AB" }, { label: "BC" }, { label: "MB" },
{ label: "NL" }, { label: "NS" }, { label: "NT" },
{ label: "NU" }, { label: "ON" }, { label: "PE" },
{ label: "QC" }, { label: "SK" }, { label: "YT" }];

const ProvinceSelector = ({ province, setProvince }) => {
    return (
        <Dropdown
            style={styles.dropdown}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Select Province/Territory"
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
        marginBottom: 20,
        paddingHorizontal: 10,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        width: "48%",
    },
});