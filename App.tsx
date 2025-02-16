import './gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store/Store';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation/>
      </NavigationContainer>
    </Provider>
  );
}