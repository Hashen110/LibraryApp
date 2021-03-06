import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, View, TextInput, Button, Keyboard } from 'react-native';

export default class InsertBookScreen extends Component {
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
                        <Text style={styles.header}>Add a new book</Text>
                        <TextInput placeholder="ISBN" style={styles.textInput} />
                        <TextInput placeholder="Author" style={styles.textInput} />
                        <TextInput placeholder="Publisher" style={styles.textInput} />
                        <TextInput placeholder="Price" style={styles.textInput} />
                        <View style={styles.btnContainer}>
                            <Button style={styles.btn} title="Add" onPress={() => this.props.navigation.navigate('Home')} />
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
        borderColor: '#000000',
        borderBottomWidth: 1,
        backgroundColor: '#eeeeee',
        marginBottom: 18,
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    }
});