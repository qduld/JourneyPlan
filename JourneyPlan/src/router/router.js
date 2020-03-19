import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Create from '../screens/Create/Create'
import Favorite from '../screens/Favorite/Favorite'
import Home from '../screens/Home/Home'
import Route from '../screens/Route/Route'
import Person from '../screens/Person/Person'

// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreateStack = createStackNavigator();
function CreateStackScreen() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name="Home" component={Home} />
      <CreateStack.Screen name="Favorite" component={Favorite} />
      <CreateStack.Screen name="Create" component={Create} />
      <CreateStack.Screen name="Route" component={Route} />
      <CreateStack.Screen name="Person" component={Person} />
    </CreateStack.Navigator>
  );
}

const RouteStack = createStackNavigator();
function RouteStackScreen() {
  return (
    <RouteStack.Navigator>
      <RouteStack.Screen name="Home" component={Home} />
      <RouteStack.Screen name="Favorite" component={Favorite} />
      <RouteStack.Screen name="Create" component={Create} />
      <RouteStack.Screen name="Route" component={Route} />
      <RouteStack.Screen name="Person" component={Person} />
    </RouteStack.Navigator>
  );
}

const FavoriteStack = createStackNavigator();
function FavoriteStackScreen() {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen name="Home" component={Home} />
      <FavoriteStack.Screen name="Favorite" component={Favorite} />
      <FavoriteStack.Screen name="Create" component={Create} />
      <FavoriteStack.Screen name="Route" component={Route} />
      <FavoriteStack.Screen name="Person" component={Person} />
    </FavoriteStack.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Favorite" component={Favorite} />
      <HomeStack.Screen name="Create" component={Create} />
      <HomeStack.Screen name="Route" component={Route} />
      <HomeStack.Screen name="Person" component={Person} />
    </HomeStack.Navigator>
  );
}

const PersonStack = createStackNavigator();
function PersonStackScreen() {
  return (
    <PersonStack.Navigator>
      <PersonStack.Screen name="Home" component={Home} />
      <PersonStack.Screen name="Favorite" component={Favorite} />
      <PersonStack.Screen name="Create" component={Create} />
      <PersonStack.Screen name="Route" component={Route} />
      <PersonStack.Screen name="Person" component={Person} />
    </PersonStack.Navigator>
  );
}



const Tab = createBottomTabNavigator();
export default class Router extends Component {
  render(){
    return(
      <NavigationContainer>
        <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  let iconSize = size;
                  let iconColor = '#34BAC0';
                  let prefix = Platform.OS === "ios"?'ios-':'md-'
                  // if (route.name === 'Home') {
                  //   iconName = focused
                  //     ? 'ios-information-circle'
                  //     : 'ios-information-circle-outline';
                  // } else if (route.name === 'Settings') {
                  //   iconName = focused ? 'ios-list-box' : 'ios-list';
                  // }
                  switch(route.name){
                    case 'Home':
                      iconName = prefix+'home';break;
                    case 'Favorite':
                      iconName = focused?prefix+'heart':prefix+'heart-empty';break;
                    case 'Create':
                      iconName = prefix+'add-circle';iconSize=2.2*iconSize;break;
                    case 'Route':
                      iconName = prefix+'list-box';break;
                    case 'Person':
                      iconName = prefix+'person';break;
                  }


                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
                  // return <MaterialIcons name={iconName} size={size} color={iconColor} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Favorite" component={FavoriteStackScreen} />
          <Tab.Screen name="Create" component={CreateStackScreen} />
          <Tab.Screen name="Route" component={RouteStackScreen} />
          <Tab.Screen name="Person" component={PersonStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}