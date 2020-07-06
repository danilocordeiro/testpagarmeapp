import { createAppContainer } from 'react-navigation'
import React from 'react'
import Icon from 'react-native-vector-icons/Octicons'
import LinearGradient from 'react-native-linear-gradient'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Profile from '../../screens/Profile/Profile'
import { colors } from '../../utils/colors'

const drawerButton = navigation => (
  <Icon
    style={{ padding: 10, color: colors.white }}
    name='three-bars'
    size={30}
    color={colors.black}
    onPress={() => {
      navigation.toggleDrawer()
    }}
  />
)

export default createAppContainer(
  createDrawerNavigator(
    {
      Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
          drawerLabel: 'My Profile'
        })
      }
    },
    {
      initialRouteName: 'Profile',
      headerMode: 'float',
      navigationOptions: ({ navigation }) => ({
        headerBackground: (
          <LinearGradient
            colors={[colors.primary, colors.black]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerTintColor: colors.white,
        title: 'Test pagarme',
        gesturesEnabled: true,
        headerLeft: drawerButton(navigation),
        headerTitleStyle: { color: colors.white }
      })
    }
  )
)
