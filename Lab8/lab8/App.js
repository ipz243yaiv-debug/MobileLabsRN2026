import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView, LogBox, Alert } from 'react-native';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import DateTimePicker from '@react-native-community/datetimepicker';

LogBox.ignoreAllLogs();

export default function App() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [reminders, setReminders] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const appId = "f498d95e-36f2-4e6c-b368-f77726bb2b5f";
    const apiKey = "os_v2_app_6smnsxrw6jhgzm3i653snozll7fbtba2luguorupfiwg7cpgrbutlcmse4gu7amjpt4ejjzqwtssyalgrurvbwkwjwjibays22thyyq";

    useEffect(() => {
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        OneSignal.initialize(appId);
        OneSignal.Notifications.requestPermission(true);

        OneSignal.login("user_variant_28");
        OneSignal.User.pushSubscription.optIn();

        OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
            console.log("Сповіщення у foreground:", event);
            event.preventDefault();
            event.notification.display();
        });
    }, []);

    const onDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    const addReminder = () => {
        if (!name || !desc) return;

        const url = 'https://onesignal.com/api/v1/notifications';
        const sendAfter = date.toISOString();

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                app_id: appId,
                headings: { en: name },
                contents: { en: desc },
                included_segments: ["All"],
                send_after: sendAfter,
            }),
        })
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then((result) => {
                console.log('Notification sent successfully:', result);

                const newItem = {
                    id: Date.now().toString(),
                    notifId: result.id,
                    title: name,
                    body: desc,
                    time: date.toLocaleString()
                };

                setReminders([...reminders, newItem]);
                setName('');
                setDesc('');
            })
            .catch((error) => {
                console.error('Error sending notification:', error);
                Alert.alert('Error', error.message);
            });
    };

    const removeItem = (id, notifId) => {
        if (notifId) {
            fetch(`https://onesignal.com/api/v1/notifications/${notifId}?app_id=${appId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${apiKey}`
                }
            })
                .then(() => console.log("Cancelled successfully"))
                .catch((err) => console.log("Cancel error", err));
        }
        setReminders(reminders.filter(item => item.id !== id));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>📝 To-Do Reminder</Text>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Назва"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Опис"
                    value={desc}
                    onChangeText={setDesc}
                />

                <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowPicker(true)}>
                    <Text>Обрати час: {date.toLocaleString()}</Text>
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="datetime"
                        onChange={onDateChange}
                    />
                )}

                <TouchableOpacity style={styles.addBtn} onPress={addReminder}>
                    <Text style={styles.addBtnText}>ДОДАТИ НАГАДУВАННЯ</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={reminders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskCard}>
                        <View style={{flex: 1}}>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text>{item.body}</Text>
                            <Text style={styles.taskTime}>{item.time}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.delBtn}
                            onPress={() => removeItem(item.id, item.notifId)}
                        >
                            <Text style={{color: 'white'}}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        padding: 20,
        paddingTop: 50
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    pickerBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 15,
        borderRadius: 5
    },
    addBtn: {
        backgroundColor: 'dodgerblue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    addBtnText: {
        color: 'white',
        fontWeight: 'bold'
    },
    taskCard: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    taskTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    taskTime: {
        fontSize: 12,
        color: 'gray'
    },
    delBtn: {
        backgroundColor: 'crimson',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10
    }
});