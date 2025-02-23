import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Image, Text } from 'react-native';
import { FormButton, FormField, Background, FormFooter } from '../components/Components';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../assets/colors/Colors';
import { Formik, FormikHelpers } from 'formik';
import { LoginSchema } from '../schemas/Schemas';
import { useDispatch, useSelector } from 'react-redux'; 
import { loginUser } from '../store/slices/UserSlices';
import { RootState } from '../store/Store'; // Import your RootState from store
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the login form values interface
interface LoginValues {
  email: string;
  password: string;
}

// Define navigation type
type AuthStackParamList = {
  Signup: undefined;
};
type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>(); // Typed navigation
  const dispatch = useDispatch(); // Initialize dispatch
  const { loading, error, user } = useSelector((state: RootState) => state.user); // Typed state
  
  // Handle login
  const handleLogin = (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    dispatch(loginUser(values));
    setSubmitting(false);
  };

  // Initial values setup
  const initialValues: LoginValues = {
    email: user?.email || '',
    password: user?.password || '',
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Component */}
      <Background />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <Image 
              source={require('../assets/icons/chat.png')} 
              style={styles.logo}
            />
            <Text style={styles.companyName}>Chat Hub</Text>
            <Text style={styles.heading}>Login</Text>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
              <View style={styles.formContainer}>
                <FormField
                  title="Email"
                  placeholder="john@example.com"
                  onChange={handleChange('email')}
                  value1={values.email}
                  editable={true}
                  secure={false}
                  error={errors.email??null}
                />
                <FormField
                  title="Password"
                  editable={true}
                  placeholder="* * * * * * *"
                  onChange={handleChange('password')}
                  secure={true}
                  value1={values.password}
                  error={errors.password??null}
                />
                {/* Show error message from Redux state */}
                {error && <Text style={styles.errorText}>{error}</Text>}
                <FormButton btStyle={undefined} btTxt={undefined} title="Login" onPress={handleSubmit} disabled={loading || isSubmitting} />
              </View>
            )}
          </Formik>
        </ScrollView>
        {/* Footer */}
        <FormFooter title1="Don't have an account?" title2="SignUp" onPress={() => navigation.replace('Signup')} />
      </View>
    </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 120,
  },
  logo: {
    width: 150,
    height: 150,
    tintColor: Colors.logoColor1,
  },
  companyName: {
    color: Colors.companyName,
    fontWeight: '500',
    fontSize: 30,
  },
  heading: {
    marginTop: '5%',
    fontWeight: '800',
    color: Colors.headingColor1,
    fontSize: 45,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  formContainer: {
    flex: 1,
    marginTop: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LoginScreen;
