import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

function Home() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.pageTitle}>Новини</Text>

                <View style={styles.newsCard}>
                    <View style={styles.imageBox}><Ionicons name="image-outline" size={30} color="gray" /></View>
                    <View style={styles.contentBox}>
                        <Text style={styles.newsTitle}>Заголовок новини</Text>
                        <Text style={styles.newsDate}>Дата новини</Text>
                        <Text style={styles.shortText}>Короткий текст новини</Text>
                    </View>
                </View>
                <View style={styles.newsCard}>
                    <View style={styles.imageBox}><Ionicons name="image-outline" size={30} color="gray" /></View>
                    <View style={styles.contentBox}>
                        <Text style={styles.newsTitle}>Заголовок новини</Text>
                        <Text style={styles.newsDate}>Дата новини</Text>
                        <Text style={styles.shortText}>Короткий текст новини</Text>
                    </View>
                </View>
                <View style={styles.newsCard}>
                    <View style={styles.imageBox}><Ionicons name="image-outline" size={30} color="gray" /></View>
                    <View style={styles.contentBox}>
                        <Text style={styles.newsTitle}>Заголовок новини</Text>
                        <Text style={styles.newsDate}>Дата новини</Text>
                        <Text style={styles.shortText}>Короткий текст новини</Text>
                    </View>
                </View>
                <View style={styles.newsCard}>
                    <View style={styles.imageBox}><Ionicons name="image-outline" size={30} color="gray" /></View>
                    <View style={styles.contentBox}>
                        <Text style={styles.newsTitle}>Заголовок новини</Text>
                        <Text style={styles.newsDate}>Дата новини</Text>
                        <Text style={styles.shortText}>Короткий текст новини</Text>
                    </View>
                </View>
                <View style={styles.newsCard}>
                    <View style={styles.imageBox}><Ionicons name="image-outline" size={30} color="gray" /></View>
                    <View style={styles.contentBox}>
                        <Text style={styles.newsTitle}>Заголовок новини</Text>
                        <Text style={styles.newsDate}>Дата новини</Text>
                        <Text style={styles.shortText}>Короткий текст новини</Text>
                    </View>
                </View>
                <View style={styles.newsCard}>
                    <View style={styles.imageBox}><Ionicons name="image-outline" size={30} color="gray" /></View>
                    <View style={styles.contentBox}>
                        <Text style={styles.newsTitle}>Заголовок новини</Text>
                        <Text style={styles.newsDate}>Дата новини</Text>
                        <Text style={styles.shortText}>Короткий текст новини</Text>
                    </View>
                </View>
                <View style={styles.newsCard}>
                    <View style={styles.imageBox}><Ionicons name="image-outline" size={30} color="gray" /></View>
                    <View style={styles.contentBox}>
                        <Text style={styles.newsTitle}>Заголовок новини</Text>
                        <Text style={styles.newsDate}>Дата новини</Text>
                        <Text style={styles.shortText}>Короткий текст новини</Text>
                    </View>
                </View>
                <View style={styles.newsCard}>
                    <View style={styles.imageBox}><Ionicons name="image-outline" size={30} color="gray" /></View>
                    <View style={styles.contentBox}>
                        <Text style={styles.newsTitle}>Заголовок новини</Text>
                        <Text style={styles.newsDate}>Дата новини</Text>
                        <Text style={styles.shortText}>Короткий текст новини</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Якимчук Іван Валерійович, ІПЗ-24-3</Text>
            </View>
        </View>
    );
}

function Gallery() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-between' }}>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
                <View style={styles.galleryItem}><Ionicons name="image-outline" size={30} color="lightgray" /></View>
            </View>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Якимчук Іван Валерійович, ІПЗ-24-3</Text>
            </View>
        </View>
    );
}

function Profile() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ padding: 20 }}>
                <Text style={styles.pageTitle}>Реєстрація</Text>

                <Text>Електронна пошта</Text>
                <TextInput style={styles.input} />

                <Text>Пароль</Text>
                <TextInput style={styles.input} secureTextEntry={true} />

                <Text>Пароль (ще раз)</Text>
                <TextInput style={styles.input} secureTextEntry={true} />

                <Text>Прізвище</Text>
                <TextInput style={styles.input} />

                <Text>Ім'я</Text>
                <TextInput style={styles.input} />

                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Зареєструватися</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Якимчук Іван Валерійович, ІПЗ-24-3</Text>
            </View>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <View style={styles.headerContainer}>
                <Image style={styles.logo} source={require('./assets/ztu.png')} />
                <Text style={styles.headerText}>FirstMobileApp</Text>
            </View>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => {
                        let iconName;
                        if (route.name === 'Головна') iconName = 'home';
                        else if (route.name === 'Галерея') iconName = 'images';
                        else if (route.name === 'Профіль') iconName = 'person';
                        return <Ionicons name={iconName} size={20} color={color} />;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { backgroundColor: 'white' },
                    tabBarIndicatorStyle: { backgroundColor: 'transparent' },
                    tabBarShowIcon: true,
                })}
            >
                <Tab.Screen name="Головна" component={Home} />
                <Tab.Screen name="Галерея" component={Gallery} />
                <Tab.Screen name="Профіль" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 50,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 50,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    newsCard: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    imageBox: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    contentBox: {
        flex: 1,
        marginLeft: 15,
    },
    newsTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    newsDate: {
        fontSize: 12,
        color: 'gray',
    },
    shortText: {
        fontSize: 14,
    },
    footerContainer: {
        backgroundColor: 'lightgray',
        paddingVertical: 10,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
    },
    galleryItem: {
        width: '48%',
        height: '48%',
        aspectRatio: 1.5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    }
});