import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Create from '../screens/Create/Create';

import Favorite from '../screens/Favorite/Favorite';
import FavoriteTop from '../screens/Favorite/FavoriteTop';

import Home from '../screens/Home/Home';
import HomeTop  from '../screens/Home/HomeTop';

import Route from '../screens/Route/Route';
import RouteTop from '../screens/Route/RouteTop';

import Person from '../screens/Person/Person';
import PersonTop from '../screens/Person/PersonTop';

// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreateStack = createStackNavigator();
function CreateStackScreen() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name="Create" component={Create} />
    </CreateStack.Navigator>
  );
}

const RouteStack = createStackNavigator();
function RouteStackScreen() {
  return (
    <RouteStack.Navigator>
      <RouteStack.Screen name="Route" component={Route} 
          options={{
            title:'',
            headerTitle: props => <RouteTop {...props} /> 
          }}
      />
    </RouteStack.Navigator>
  );
}

const FavoriteStack = createStackNavigator();
function FavoriteStackScreen( {navigation} ) {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen name="Favorite" component={Favorite} 
          options={{
            title:'',
            headerTitle: props => <FavoriteTop {...navigation} /> 
          }}
      />
    </FavoriteStack.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#F9F9F8' },
      }}
      >
      <HomeStack.Screen name="Home" component={Home}
        options={{
          title:'',
          headerTitle: props => <HomeTop {...props} /> 
        }}
      />
    </HomeStack.Navigator>
  );
}
// headerTitle: props => <TopOptions {...props} /> }}

const PersonStack = createStackNavigator();
function PersonStackScreen( {navigation} ) {
  return (
    <PersonStack.Navigator>
      <PersonStack.Screen name="Person" component={Person} 
          options={{
            title:'',
            cardShadowEnabled:false,
            headerTitle: props => <PersonTop {...navigation} /> 
          }}
      />
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
                  let iconSize = 1.4*size;
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
                      iconName = prefix+'add-circle';iconSize=1.4*iconSize;break;
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
          <Tab.Screen name="Home"  options={{ tabBarLabel:''}} component={HomeStackScreen} />
          <Tab.Screen name="Favorite" options={{ tabBarLabel:''}} component={FavoriteStackScreen} />
          <Tab.Screen name="Create" options={{ tabBarLabel:''}} component={CreateStackScreen} />
          <Tab.Screen name="Route" options={{ tabBarLabel:''}} component={RouteStackScreen} />
          <Tab.Screen name="Person" options={{ tabBarLabel:''}} component={PersonStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
