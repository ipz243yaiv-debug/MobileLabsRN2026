import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

export default function App() {
    const [currentDir, setCurrentDir] = useState(FileSystem.documentDirectory);
    const [files, setFiles] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [editingFile, setEditingFile] = useState(null);
    const [editBuffer, setEditBuffer] = useState('');
    const [fileDetails, setFileDetails] = useState(null);
    const [storageInfo, setStorageInfo] = useState(null);

    useEffect(() => {
        loadDirectory();
        loadStorage();
    }, [currentDir]);

    async function loadDirectory() {
        const names = await FileSystem.readDirectoryAsync(currentDir);
        let tempFiles = [];

        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            let fullPath = currentDir + name;
            if (!currentDir.endsWith('/')) {
                fullPath = currentDir + '/' + name;
            }
            const info = await FileSystem.getInfoAsync(fullPath);
            tempFiles.push({
                name: name,
                isDirectory: info.isDirectory,
                uri: info.uri
            });
        }
        setFiles(tempFiles);
    }

    async function loadStorage() {
        const total = await FileSystem.getTotalDiskCapacityAsync();
        const free = await FileSystem.getFreeDiskStorageAsync();

        const totalGB = (total / 1073741824).toFixed(2) + " GB";
        const freeGB = (free / 1073741824).toFixed(2) + " GB";
        const usedGB = ((total - free) / 1073741824).toFixed(2) + " GB";

        setStorageInfo({ total: totalGB, free: freeGB, used: usedGB });
    }

    async function createFolder() {
        let path = currentDir + newItemName + '/';
        if (!currentDir.endsWith('/')) {
            path = currentDir + '/' + newItemName + '/';
        }
        await FileSystem.makeDirectoryAsync(path, { intermediates: true });
        setNewItemName('');
        loadDirectory();
    }

    async function createFile() {
        let path = currentDir + newItemName + '.txt';
        if (!currentDir.endsWith('/')) {
            path = currentDir + '/' + newItemName + '.txt';
        }
        await FileSystem.writeAsStringAsync(path, fileContent);
        setNewItemName('');
        setFileContent('');
        loadDirectory();
        loadStorage();
    }

    async function openFile(uri, name) {
        const text = await FileSystem.readAsStringAsync(uri);
        setEditingFile({ name: name, uri: uri });
        setEditBuffer(text);
    }

    async function saveFile() {
        await FileSystem.writeAsStringAsync(editingFile.uri, editBuffer);
        setEditingFile(null);
        loadDirectory();
    }

    async function getInfo(uri, name) {
        const info = await FileSystem.getInfoAsync(uri, { size: true });
        const date = new Date(info.modificationTime * 1000).toLocaleString();
        const size = (info.size / 1024).toFixed(2) + " KB";

        setFileDetails({
            name: name,
            size: size,
            date: date
        });
    }

    async function deleteItem(uri) {
        await FileSystem.deleteAsync(uri);
        loadDirectory();
        loadStorage();
    }

    function goBack() {
        if (currentDir === FileSystem.documentDirectory) return;

        let path = currentDir;
        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        const parts = path.split('/');
        parts.pop();
        const parent = parts.join('/') + '/';
        setCurrentDir(parent);
    }

    return (
        <View style={styles.container}>
            {storageInfo && (
                <View style={styles.storageBox}>
                    <Text style={styles.boldText}>Пам'ять:</Text>
                    <Text style={styles.infoText}>Всього: {storageInfo.total} | Вільно: {storageInfo.free}</Text>
                </View>
            )}

            <Text style={styles.breadcrumb}>
                Шлях: {currentDir.replace(FileSystem.documentDirectory, '/')}
            </Text>

            <View style={styles.navButtons}>
                <Button title="Назад" onPress={goBack} color="grey" />
                <Button title="Оновити" onPress={() => {loadDirectory(); loadStorage();}} />
            </View>

            {fileDetails && (
                <View style={styles.detailsPanel}>
                    <Text>Назва: {fileDetails.name}</Text>
                    <Text>Розмір: {fileDetails.size}</Text>
                    <Text>Дата: {fileDetails.date}</Text>
                    <Button title="Закрити" onPress={() => setFileDetails(null)} color="red" />
                </View>
            )}

            {editingFile && (
                <View style={styles.editorPanel}>
                    <TextInput
                        multiline
                        style={styles.editorInput}
                        value={editBuffer}
                        onChangeText={(text) => setEditBuffer(text)}
                    />
                    <Button title="Зберегти" onPress={saveFile} color="green" />
                    <Button title="Скасувати" onPress={() => setEditingFile(null)} color="grey" />
                </View>
            )}

            <FlatList
                data={files}
                keyExtractor={(item) => item.uri}
                renderItem={({ item }) => (
                    <View style={styles.fileItem}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => {
                                if (item.isDirectory) {
                                    setCurrentDir(item.uri.endsWith('/') ? item.uri : item.uri + '/');
                                } else {
                                    openFile(item.uri, item.name);
                                }
                            }}
                        >
                            <Text>{item.isDirectory ? "📁" : "📄"} {item.name}</Text>
                        </TouchableOpacity>

                        <Button title="Інфо" onPress={() => getInfo(item.uri, item.name)} />
                        <Button title="Х" onPress={() => deleteItem(item.uri)} color="red" />
                    </View>
                )}
            />

            <View style={styles.createForm}>
                <TextInput
                    placeholder="Назва"
                    style={styles.input}
                    value={newItemName}
                    onChangeText={(t) => setNewItemName(t)}
                />
                <TextInput
                    placeholder="Текст"
                    style={styles.input}
                    value={fileContent}
                    onChangeText={(t) => setFileContent(t)}
                />
                <Button title="Папка" onPress={createFolder} />
                <Button title="Файл" onPress={createFile} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    storageBox: {
        padding: 10,
        backgroundColor: 'whitesmoke',
        borderRadius: 8,
        marginBottom: 15,
    },
    boldText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 12,
        color: 'black',
    },
    breadcrumb: {
        fontSize: 13,
        color: 'darkblue',
        marginBottom: 10,
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    fileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    createForm: {
        padding: 15,
        backgroundColor: 'aliceblue',
        borderRadius: 10,
        marginVertical: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginBottom: 10,
        padding: 5,
    },
    detailsPanel: {
        padding: 15,
        backgroundColor: 'lightyellow',
        borderRadius: 10,
        marginBottom: 10,
    },
    editorPanel: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 10,
    },
    editorInput: {
        height: 100,
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
});