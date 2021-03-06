import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, View, TextInput, Button, Keyboard } from 'react-native';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.header}>Login</Text>
                        <TextInput placeholder="Username" style={styles.textInput} />
                        <TextInput placeholder="Password" style={styles.textInput} />
                        <View style={styles.btnContainer}>
                            <Button title="Login" onPress={() => this.props.navigation.navigate('Home')} />
                        </View>
                        <View>
                            <Text style={styles.text}>Don't have an account?&nbsp;
                            <Text style={styles.text1} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up</Text>
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
    },
    header: {
        fontSize: 36,
        marginBottom: 48,
        textAlign: 'center'
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    },
    text: {
        marginTop: 25,
        textAlign: 'center'
    },
    text1: {
        color: 'blue',
        textDecorationLine: 'underline',
    }
});