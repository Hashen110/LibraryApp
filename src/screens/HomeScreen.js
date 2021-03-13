import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Button, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['ISBN', 'Author', 'Publisher', 'Price'],
            tableData: [
                ['row 1', 'row 1', 'row 1', 'row 1'],
                ['row 2', 'row 2', 'row 2', 'row 2'],
                ['row 3', 'row 3', 'row 3', 'row 3'],
                ['row 4', 'row 4', 'row 4', 'row 4'],
                ['row 5', 'row 5', 'row 5', 'row 5'],
            ]
        };
    }

    signOut() {

    }

    async googleSignOut() {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          } catch (error) {
            console.error(error);
          }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={this.state.tableData} textStyle={styles.text} />
                    </Table>
                    <View style={styles.btnContainer}>
                        <Button title="Insert a book" onPress={() => this.props.navigation.navigate('InsertBook')} />
                    </View>
                    <View style={styles.btnContainer1}>
                        <Button title="Sign Out" onPress={() => this.signOut()} />
                        <Button title="Google Sign Out" onPress={() => this.googleSignOut()} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 15
    },
    btnContainer1: {
        backgroundColor: "white",
        marginTop: 30
    },
});