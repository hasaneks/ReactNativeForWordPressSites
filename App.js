import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

//Pages 
import PostView from './src/views/PostViews/PostView';
import PostDetail from './src/views/PostDetail/PostDetail';
import SearchView from './src/views/Search/Search';
import CategoryList from './src/views/Category/CategoryList/CategoryList'
import CategoryView from './src/views/Category/CategoryView/CategoryView';
//React Navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Mobx
import { Provider } from 'mobx-react';
import store from './src/store/index';
//Color Package
import color from './src/config/color'

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const SearchStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Post" component={PostView} />
      <HomeStack.Screen name="Details" component={PostDetail} />
    </HomeStack.Navigator>
  );
};

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="Search" component={SearchView} />
      <SearchStack.Screen name="Search Detail" component={PostDetail} />
    </SearchStack.Navigator>
  );
};

function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator screenOptions={{ headerShown: false }} >
      <CategoryStack.Screen name="Category" component={CategoryList} />
      <CategoryStack.Screen name="Category View" component={CategoryView} />
      <CategoryStack.Screen name="Category Detail" component={PostDetail} />
    </CategoryStack.Navigator>
  );
};

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarTestID}
            onPress={onPress}
            style={[styles.tabBarNavigation, { backgroundColor: isFocused ? color.tabBarColor : color.tabBarFocusColor }]}
          >
            {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}> */}
            <View style={[styles.iconsArea]}>
              {label === "Home" && <Image style={styles.navigationIcon} source={require('./src/img/icons/home.png')} />}
              {label === "Search" && <Image style={styles.navigationIcon} source={require('./src/img/icons/search.png')} />}
              {label === "Category" && <Image style={styles.navigationIcon} source={require('./src/img/icons/web.png')} />}
            </View>
            {/* </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider {...store}>
        <NavigationContainer>
          <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Search" component={SearchStackScreen} />
            <Tab.Screen name="Category" component={CategoryStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  tabBarNavigation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  navigationIcon: {
    height: 24,
    width: 24,
  }
})
