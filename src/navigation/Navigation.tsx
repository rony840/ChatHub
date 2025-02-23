import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import { SafeAreaView, View } from 'react-native';
import { Heading } from '../components/Components';
import { useSelector } from 'react-redux';
import { LoginScreen, SignupScreen, ChatScreen, LogoutScreen } from '../screens/Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootState } from '../store/Store'; // Import RootState for correct typing

const Stack = createNativeStackNavigator();

// **Auth Stack**
const AuthStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

// **User Stack**
const UserStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoggedIn" component={DrawerTab} />
  </Stack.Navigator>
);

// **Drawer Navigation**
const Drawer = createDrawerNavigator();

const DrawerTab: React.FC = () => {
  const username = useSelector((state: RootState) => state.user.currentUser);
  const insets = useSafeAreaInsets();

  return (
    <Drawer.Navigator
      screenOptions={({ route }): DrawerNavigationOptions => {
        let headingText = '';
        let iconClickEnabled = true;

        if (route.name === 'Chat') {
          headingText = 'Chat Hub';
        } else if (route.name === 'Logout') {
          headingText = 'Logout';
          iconClickEnabled = false;
        }

        return {
          header: () => (
            <SafeAreaView style={{ paddingTop: insets.top }}>
              <Heading
              style2={undefined}
              iconPaths={undefined}
                heading={headingText}
                type={'Profile'}
                dispName={username || 'Guest User'}
                iconClickEnabled={iconClickEnabled}
              />
            </SafeAreaView>
          ),
        };
      }}
    >
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

// **Main App Navigation**
const AppNavigation: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  return isAuthenticated ? <UserStack /> : <AuthStack />;
};

export default AppNavigation;
