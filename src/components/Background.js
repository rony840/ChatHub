import {View, StyleSheet} from 'react-native';
import { Colors } from '../assets/colors/Colors';
import { memo } from 'react';

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

export default memo(Background);