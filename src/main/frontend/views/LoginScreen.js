import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomRedirectButton from "../components/CustomRedirectButton";
import {ScreenNames} from "../utils/ScreenNames";

function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>App Name</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <CustomRedirectButton buttonText={"Login as a Company"} page={ScreenNames.COMPANY} buttonWidth={250}/>
                <CustomRedirectButton buttonText={"Login as a Manager"} page={ScreenNames.MANAGER} buttonWidth={250}/>
                <CustomRedirectButton buttonText={"Login as an Employee"} page={ScreenNames.EMPLOYEE} buttonWidth={250}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F1F1",
    },
    buttonsContainer: {
        marginTop: 200,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    headerContainer: {
        height: 100,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    headerTitle: {
        color: "#50C878",
        fontSize: 32,
        marginBottom: 8,
        marginLeft: 12,
    },
});

export default LoginScreen;