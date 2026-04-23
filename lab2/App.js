import React, { useState } from 'react';
import {StyleSheet, Text, View, FlatList, SectionList, Image, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { CATS } from './data';

const CONTACTS = [
    {
        title: 'Адміністрація',
        data: ['Директор', 'Завуч']
    },
    {
        title: 'Техпідтримка',
        data: ['Андрій (Backend)', 'Олена (Mobile)']
    }
];

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView
            contentContainerStyle={props.contentContainerStyle}
            style={props.style}
            children={props.children}
            navigation={props.navigation}
            state={props.state}
            descriptors={props.descriptors}
        >
            <View style={styles.drawerHeader}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>Якимчук Іван</Text>
                <Text style={styles.userGroup}>Група: ІПЗ-24-3</Text>
            </View>
            <DrawerItemList
                state={props.state}
                navigation={props.navigation}
                descriptors={props.descriptors}
            />
        </DrawerContentScrollView>
    );
}

function ContactsScreen() {
    const renderContact = ({ item }) => (
        <View style={styles.contactItem}>
            <Text style={styles.contactText}>{item}</Text>
        </View>
    );

    const renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <SectionList
                sections={CONTACTS}
                renderItem={renderContact}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => item + index}
                ItemSeparatorComponent={() => <View style={styles.line} />}
            />
        </View>
    );
}

function DetailsScreen({ route }) {
    const { item } = route.params;
    return (
        <View style={styles.detailsContainer}>
            <Image source={item.image} style={styles.detailsImage} />
            <Text style={styles.detailsTitle}>{item.title}</Text>
            <Text style={styles.detailsDesc}>{item.description}</Text>
        </View>
    );
}

function MainScreen({ navigation }) {
    const [news, setNews] = useState(CATS);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const topRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setNews(CATS);
            setIsRefreshing(false);
        }, 2000);
    };

    const downLoadMore = () => {
        if (isLoadingMore === true) return;
        setIsLoadingMore(true);
        setTimeout(() => {
            const newItems = CATS.map((oldCat) => {
                return {
                    id: Math.random().toString(),
                    title: oldCat.title,
                    description: oldCat.description,
                    image: oldCat.image
                };
            });
            const updatedList = news.concat(newItems);
            setNews(updatedList);
            setIsLoadingMore(false);
        }, 1500);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailsScreen', { item: item })}
        >
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Новини про котів</Text>
                    </View>
                }
                ItemSeparatorComponent={() => <View style={styles.line} />}
                ListFooterComponent={isLoadingMore === true ? <ActivityIndicator color="blue" size="large" /> : null}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={topRefresh} />}
                onEndReached={downLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={10}
            />
        </View>
    );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{
                    title: 'Головна'
                }}/>
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={({ route }) => ({
                    title: route.params.item.title
                })}/>
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => (
                    <CustomDrawerContent
                        navigation={props.navigation}
                        state={props.state}
                        descriptors={props.descriptors}
                    />
                )}>
                <Drawer.Screen
                    name="Home"
                    component={MyStack}
                    options={{
                        title: 'Новини',
                        headerShown: false
                    }}/>
                <Drawer.Screen
                    name="Contacts"
                    component={ContactsScreen}
                    options={{
                        title: 'Контакти'
                    }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 20,
        backgroundColor: 'lightgray',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'darkblue',
    },
    desc: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    line: {
        height: 1,
        backgroundColor: 'silver',
        marginHorizontal: 10,
    },
    detailsContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    detailsImage: {
        width: '100%',
        height: 250,
        borderRadius: 15,
    },
    detailsTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    detailsDesc: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    sectionHeader: {
        padding: 10,
        backgroundColor: '#eeeeee',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    contactItem: {
        padding: 15,
        backgroundColor: 'white',
    },
    contactText: {
        fontSize: 16,
        color: 'black',
    },
    drawerHeader: {
        padding: 20,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        marginBottom: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    userGroup: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
    },
    userVariant: {
        fontSize: 14,
        color: 'gray',
    },
});