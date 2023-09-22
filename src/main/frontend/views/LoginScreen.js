import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {ScreenNames} from "../utils/ScreenNames";

function LoginScreen({ navigation }) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>App Name</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    color="#186A3B"
                    style={styles.loginButton}
                    title="Login as Company"
                    onPress={() => navigation.navigate(ScreenNames.COMPANY)}
                />
                <Button
                    color="#186A3B"
                    style={styles.loginButton}
                    title="Login as Manager"
                    onPress={() => navigation.navigate(ScreenNames.MANAGER)}
                />
                <Button
                    color="#186A3B"
                    style={styles.loginButton}
                    title="Login as Employee"
                    onPress={() => navigation.navigate(ScreenNames.EMPLOYEE)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 100,
    },
    loginButton: {
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