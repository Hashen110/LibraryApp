import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, View, TextInput, Button, Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.login = this.login.bind(this);
        GoogleSignin.configure({
            webClientId: '916604369162-g29h5rn76v8ug30duu4nf21lqbe2fg0u.apps.googleusercontent.com',
        });
    }

    async onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
      
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
      
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      
        // Sign-in the user with the credential
        auth()
        .signInWithCredential(facebookCredential)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(err => console.error(err));
      }

    async onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        auth()
            .signInWithCredential(googleCredential)
            .then(() => this.props.navigation.navigate('Home'))
            .catch(err => {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    console.error('user cancelled the login flow');
                  } else if (error.code === statusCodes.IN_PROGRESS) {
                    console.error('operation (e.g. sign in) is in progress already');
                  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    console.error('play services not available or outdated');
                  } else {
                    console.error(error);
                  }
            });
    }

    login() {
        try {
            auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(res => {
                    this.props.navigation.navigate('Home');
                })
                .catch(err => {
                    console.error(err);
                })
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.header}>Login</Text>
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            value={this.email}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(value) => {
                                this.setState({ email: value });
                            }} />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            value={this.password}
                            secureTextEntry={true}
                            onChangeText={(value) => {
                                this.setState({ password: value });
                            }} />
                        <View style={styles.btnContainer}>
                            <Button title="Login" onPress={() => this.login()} />
                            <Button title="Sign Up With Facebook" 
                            onPress={() => this.onFacebookButtonPress()} 
                            style={styles.btn} />
                            <Button title="Sign Up With Google"
                                onPress={() => this.onGoogleButtonPress()}
                                style={styles.btn} />
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
    },
    btn: {
        marginTop: 5,
        marginBottom: 5
    }
});