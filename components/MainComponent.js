import React , {Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform,StatusBar, Image, StyleSheet, SafeAreaView, ScrollView , Text} from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon} from 'react-native-elements';

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
    
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={({navigation})=>({
                headerTitle: "Menu",
                headerLeft: () => (<Icon name='menu' size={24}
                    color='white'
                    onPress={() => navigation.toggleDrawer()}
                    />)
            })}
                
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
    return(
    
        <HomeNavigator.Navigator
            
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={({navigation})=>({
                    headerTitle: "Home",
                    headerLeft: () => (<Icon name='menu' size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                        />)
                })}
            />
                   
        </HomeNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
                <View style={styles.drawerHeader}>
                    <View style={{flex: 1}}>
                        <Image source={require('./images/logo.png')}
                            style={styles.drawerImage}/>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>
                </View>
                <DrawerItemList {...props}/>
            </SafeAreaView>
    </DrawerContentScrollView>
);

const MainNavigator = createDrawerNavigator();

function MyDrawer() {
    return (
      <MainNavigator.Navigator drawerStyle={{
        backgroundColor: '#D1C4E9'
      }}
      drawerContent={props => <CustomDrawerContentComponent {...props} />}>
        <MainNavigator.Screen name="Home" component={HomeNavigatorScreen}
            options={{title: "Home"},
            {drawerIcon: ({tintColor}) => (
                <Icon 
                name='home'
                type='font-awesome'
                size={24}
                color={tintColor}
                />
            )}}/>
            <MainNavigator.Screen name="About Us" component={AboutNavigatorScreen}
        options={{title: "About Us"},
        {drawerIcon: ({tintColor}) => (
            <Icon 
            name='info-circle'
            type='font-awesome'
            size={24}
            color={tintColor}
            />
        )}}/>
        <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen}
            options={{title: "Menu"},
            {drawerIcon: ({tintColor}) => (
                <Icon 
                name='list'
                type='font-awesome'
                size={24}
                color={tintColor}
                />
            )}}/>
         <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen}
        options={{title: "Contact Us"},
        {drawerIcon: ({tintColor}) => (
            <Icon 
            name='address-card'
            type='font-awesome'
            size={22}
            color={tintColor}
            />
        )}}/>
            
      </MainNavigator.Navigator>
     
      
    );
  }

 const ContactNavigator=createStackNavigator();

 function ContactNavigatorScreen() {
     return(
     
         <ContactNavigator.Navigator
             
             screenOptions={{
                 headerStyle: {
                     backgroundColor: "#512DA8"
                 },
                 headerTintColor: "#fff",
                 headerTitleStyle: {
                     color: "#fff"            
                 }
             }}
         >
             <ContactNavigator.Screen
                 name="Contact Us"
                 component={Contact}
                 options={({navigation})=>({
                    headerTitle: "Contact Us",
                    headerLeft: () => (<Icon name='menu' size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                        />)
                })}
             />
                    
         </ContactNavigator.Navigator>
     );
 }

 const AboutNavigator=createStackNavigator();

 function AboutNavigatorScreen() {
     return(
     
         <AboutNavigator.Navigator
             
             screenOptions={{
                 headerStyle: {
                     backgroundColor: "#512DA8"
                 },
                 headerTintColor: "#fff",
                 headerTitleStyle: {
                     color: "#fff"            
                 }
             }}
         >
             <AboutNavigator.Screen
                 name="About Us"
                 component={About}
                 options={({navigation})=>({
                    headerTitle: "About Us",
                    headerLeft: () => (<Icon name='menu' size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                        />)
                })}
             />
                    
         </AboutNavigator.Navigator>
     );
 }
  

class Main extends Component {
  

    render() {
        return(
            <View style={{flex:1,paddingTop:Platform.OS==='ios'?0:StatusBar.currentHeight}} >
            <NavigationContainer>
                <MyDrawer/>           
            </NavigationContainer> 
            </View>
                  );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });

export default Main;