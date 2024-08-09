import { View, Text, TextInput, StyleSheet } from "react-native";

function FormTextField({label, placeholder, errors=[], ...res}){
    console.log(errors)
    return (
        <View style={{rowGap:8}}>
            {label && (
                <Text
                    style={styles.label}
                >
                    {label}
                </Text>
            )}
            
            <TextInput
                style={styles.textInput}
                // placeholderTextColor={}
                autoCapitalize="none"
                placeholder={placeholder}
                {...res}
            />
            <Text style={styles.error}>{errors}</Text>
            {/* {errors.map(err => {
                <Text style={styles.error}>{err}</Text>
            })} */}
        </View>
    );
}

const styles = StyleSheet.create({
    label:{
        color:"#334155",
        fontWeight:"500",
    },
    textInput:{
        backgroundColor: "#f1f5f9",
        height: 40,
        marginTop: 4,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#cbd5e1",
        padding: 10,
    },
    error:{
        color:"red",
        marginTop: 4,
    }
});

export default FormTextField;