import {View, StyleSheet} from 'react-native';
import { Colors } from '../assets/colors/Colors';

const Background = () => {
    return(
        <View style={styles.outer}/>
    );
};

const styles = StyleSheet.create({
    outer:{
        flex:1,
        backgroundColor:Colors.appBackground, 
    },

});

export default Background;