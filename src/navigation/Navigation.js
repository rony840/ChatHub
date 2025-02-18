import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native';
import { Heading } from '../components/Components';
import { useSelector } from 'react-redux';
import { LoginScreen, SignupScreen, ChatScreen, LogoutScreen } from '../screens/Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

// Auth stack
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

//user stack
const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoggedIn" component={DrawerTab} />
    </Stack.Navigator>
  );
};

// Drawer Navigation
const Drawer = createDrawerNavigator();

function DrawerTab() {
  const username = useSelector((state) => state.user.currentUser); // Fetch user data from Redux state
  const insets = useSafeAreaInsets();
  return (
    <Drawer.Navigator
      screenOptions={{
        
        headerBackground:'red',
        header: ({ route }) => {
          // Dynamically change the header based on the screen name
          const { name } = route;
          let headingText = '';
          let iconClickEnabled = true;
          if (name === 'Chat') {
            headingText = 'Chat Hub';
          } else if (name === 'Logout') {
            headingText = 'Logout';
            iconClickEnabled = false; // Disable icon click on Edit Profile screen
          }
          
          return (
            <SafeAreaView style={[{ paddingTop: insets.top }]}>
              <Heading
                heading={headingText}
                type={'Profile'}
                dispName={username || 'Guest User'}
                iconClickEnabled={iconClickEnabled}
              />
            </SafeAreaView>
          );
        },
      }}
    >
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

// App Navigation Component
const AppNavigation = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (isAuthenticated? <UserStack/> : <AuthStack/>)
};

export default AppNavigation;
