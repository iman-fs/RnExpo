import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, Button, View, TextInput, ScrollView, FlatList, Pressable } from 'react-native';

export default function List() {

    const [enteredTodoText, setEnteredTodoText] = useState('')
    const [todos, setTodos] = useState([]);

    const todoInputHandler = (entered_text) => {
        setEnteredTodoText(entered_text)
    }

    const addTodoHandler = () => {
        setTodos((currentTodos) => [...currentTodos, { text: enteredTodoText, id: Math.random().toString() }])
        setEnteredTodoText('')
    }

    const deleteTodoHandler = (query) => {

        setTodos(current =>
            current.filter(item => {
              return item.text !== query;
            }),
          );
    }
    return (
        <View style={styles.appContainer}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder='Todo List' onChangeText={todoInputHandler} value={enteredTodoText} />
                <Button onPress={addTodoHandler} title='Add Item' />
            </View>
            <View style={styles.todosContainer}>
                {/* <ScrollView> 
          {todos.map(todo=>(
            <View style={styles.todoItem} key={todo}>
              <Text style={styles.todoItemText} >{todo}</Text>
            </View>
          ))}
        </ScrollView> */}

                {/* Flat list is for big data => it uses lazy loading */}
                <FlatList
                    data={todos}
                    renderItem={itemData => {
                        return (
                            <View style={styles.todoItem}>
                                <Text style={styles.todoItemText} >{itemData.item.text}</Text>
                                <Pressable style={styles.button} onPress={()=>deleteTodoHandler(itemData.item.text)}>
                                    <Text style={styles.text}>delete</Text>
                                </Pressable>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#eeeeee',
        width: '70%',
        padding: 8,
        marginRight: 8
    },
    todosContainer: {
        flex: 4
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#474747',
        padding: 8,
    },
    todoItemText: {
        color: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#af25258f',
    },
    text: {
        color: 'white',
    },

});
