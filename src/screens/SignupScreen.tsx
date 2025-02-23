import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FormButton, FormField, Background, FormFooter, Heading } from '../components/Components';
import { signupUser } from '../store/slices/UserSlices';
import { SignupSchema } from '../schemas/Schemas';
import { RootState } from '../store/Store'; // Import your RootState from store
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface formObject{
 username: string;
 email:string;
 password:string;

}

type AuthStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const SignupScreen: React.FC = () => {
  const dispatch = useDispatch(); 
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { signedup } = useSelector((state:RootState) => state.user);

  useEffect(() => {
      if (signedup) {
        Alert.alert('User profile created!')
        navigation.replace('Login');
      }
    }, [signedup, navigation]);

  const handlerSignupUser = (values:formObject) => {
    try {
      const { username, email, password } = values;
      const userData = {
        username,
        email,
        password,
      };
      dispatch(signupUser(userData));
    } catch (error:any) {
      console.log(error);
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Background />
      <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
        
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
          <Heading dispName={'ChatHub'} type={'Chat'} style2={undefined} iconClickEnabled={false} iconPaths={undefined} heading={'Signup Form'} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          
          <Formik
            initialValues={initialValues}  
            validationSchema={SignupSchema}
            onSubmit={handlerSignupUser}
            enableReinitialize={true}
          >
            {({ handleChange, handleSubmit, errors}) => (
              <View style={styles.formContainer}>
                <FormField
                  title={'Username'}
                  placeholder={'johndoe678'}
                  onChange={handleChange('username')}
                  error={errors.username??null}
                  editable={true}
                  value1={undefined}
                  secure={false}
                />
                <FormField
                  title={'Email'}
                  placeholder={'johndoe@example.com'}
                  onChange={handleChange('email')}
                  error={errors.email??null}
                  editable={true}
                  value1={undefined}
                  secure={false}
                />
                <FormField
                  title={'Password'}
                  placeholder={'*******'}
                  onChange={handleChange('password')}
                  error={errors.password??null}
                  secure={true}
                  editable={true}
                  value1={undefined}
                />
                <FormButton btStyle={undefined} btTxt={undefined} disabled={false} title={'Sign Up'} onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
        <FormFooter title1={"Already have an account?"} title2={"Login"} onPress={() => navigation.replace('Login')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    zIndex: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default SignupScreen;
