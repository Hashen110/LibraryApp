import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Button, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

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
        marginTop: 12
    },
});