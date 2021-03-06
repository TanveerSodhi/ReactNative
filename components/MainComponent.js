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
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ResevationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

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
      drawerContent={props => <CustomDrawerContentComponent {...props} />}
      initialRouteName='Home'>

<MainNavigator.Screen name="Login" component={LoginNavigatorScreen}
            options={{title: "Login"},
            {drawerIcon: ({tintColor}) => (
                <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                color={tintColor}
                />
            )}}/>

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

<MainNavigator.Screen name="My Favorites" component={FavoritesNavigatorScreen}
        options={{title: "My Favorites"},
        {drawerIcon: ({tintColor}) => (
            <Icon 
            name='heart'
            type='font-awesome'
            size={24}
            color={tintColor}
            />
        )}}/>

<MainNavigator.Screen name="Reserve Table" component={ReservationNavigatorScreen}
        options={{title: "Reserve Table"},
        {drawerIcon: ({tintColor}) => (
            <Icon 
            name='cutlery'
            type='font-awesome'
            size={24}
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

 const ReservationNavigator=createStackNavigator();

 function ReservationNavigatorScreen() {
     return(
     
         <ReservationNavigator.Navigator
             
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
             <ReservationNavigator.Screen
                 name="Reserve Table"
                 component={Reservation}
                 options={({navigation})=>({
                    headerTitle: "Contact Us",
                    headerLeft: () => (<Icon name='menu' size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                        />)
                })}
             />
                    
         </ReservationNavigator.Navigator>
     );
 }
  
 const FavoritesNavigator=createStackNavigator();

 function FavoritesNavigatorScreen() {
     return(
     
         <FavoritesNavigator.Navigator
             
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
             <FavoritesNavigator.Screen
                 name="My Favorites"
                 component={Favorites}
                 options={({navigation})=>({
                    headerTitle: "My Favorites",
                    headerLeft: () => (<Icon name='menu' size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                        />)
                })}
             />
                    
         </FavoritesNavigator.Navigator>
     );
 }

 const LoginNavigator=createStackNavigator();

 function LoginNavigatorScreen() {
     return(
     
         <LoginNavigator.Navigator
             
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
             <LoginNavigator.Screen
                 name="Login"
                 component={Login}
                 options={({navigation})=>({
                    headerTitle: "Login",
                    headerLeft: () => (<Icon name='menu' size={24}
                        iconStyle= {{color :'white'}}
                        onPress={() => navigation.toggleDrawer()}
                        />)
                })}
             />
                    
         </LoginNavigator.Navigator>
     );
 }

class Main extends Component {
  
    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

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

export default connect(mapStateToProps,mapDispatchToProps)(Main);