import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { Colors } from '../assets/colors/Colors';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface pathObj {
  [key: string]: string;
}

interface HeadingProps {
  dispName: string | { username: string };
  type: string;
  heading: string;
  style2: ViewStyle | undefined;
  iconClickEnabled: boolean;
  iconPaths: pathObj | undefined;
}

// Define the navigation prop type
type NavigationProps = DrawerNavigationProp<any>;

const iconPaths: pathObj = {
  Profile: require("../assets/icons/profile.png"),
  Chat: require("../assets/icons/chat.png")
};

const Heading: React.FC<HeadingProps> = (props) => {
  const navigation = useNavigation<NavigationProps>(); // Specify the correct navigation type
  const { dispName, type, heading, style2, iconClickEnabled } = props;

  // Handle dispName being either a string or an object
  const displayName = typeof dispName === 'string' ? dispName : dispName?.username;

  const iconSource = iconPaths[type] || require("../assets/icons/chat.png");

  const handleOpenDrawer = () => {
    if (iconClickEnabled) {
      navigation.openDrawer(); // This should work now
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={handleOpenDrawer}
            disabled={!iconClickEnabled}
          >
            <Image
              source={iconSource}
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleSt}>{displayName || 'Chat Hub'}</Text>
          </View>
        </View>

        <Text style={[styles.heading, style2]}>
          {heading || 'Add Heading'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.headingBG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 70,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 10,
  },
  titleSt: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.companyName,
    textAlign: 'left',
  },
  icon: {
    zIndex: 10,
    marginLeft: 10,
  },
  image: {
    width: 40,
    height: 40,
    tintColor: Colors.companyName,
  },
  heading: {
    fontSize: 30,
    fontWeight: '500',
    color: Colors.headingColor1,
    textAlign: 'right',
    flex: 1,
    marginRight: 20,
  },
});

export default memo(Heading);
