import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, View, TextInput, Button, Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        };
        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        if (this.state.email !== '') {
            if (this.state.password !== '') {
                if (this.state.password === this.state.confirmPassword) {
                    auth()
                        .createUserWithEmailAndPassword(this.state.email, this.state.password)
                        .then(() => {
                            this.props.navigation.navigate('Login');
                        })
                        .catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                                console.log('That email address is already in use!');
                            }

                            if (error.code === 'auth/invalid-email') {
                                console.log('That email address is invalid!');
                            }
                            console.error(error);
                        });
                } else {
                    console.error('Password and Confirm Password doesn\'t match');
                }
            } else {
                console.error('Invalid Password');
            }
        } else {
            console.error('Invalid Email');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.header}>Sign Up</Text>
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            value={this.email}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(value) => {
                                this.setState({email: value});
                            }} />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            value={this.password}
                            secureTextEntry={true}
                            onChangeText={(value) => {
                                this.setState({password: value});
                            }} />
                        <TextInput
                            placeholder="Confirm Password"
                            style={styles.textInput}
                            value={this.confirmPassword}
                            secureTextEntry={true}
                            onChangeText={(value) => {
                                this.setState({confirmPassword: value});
                            }} />
                        <View style={styles.btnContainer}>
                            <Button title="Sign Up" onPress={() => this.signUp()} />
                        </View>
                        <View>
                            <Text style={styles.text}>Already have an account?&nbsp;
                            <Text style={styles.text1} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
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
        textDecorationLine: 'underline'
    }
});