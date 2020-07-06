import { createAppContainer } from 'react-navigation'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Octicons'
import { createStackNavigator } from 'react-navigation-stack'
import { darken } from 'polished'
import { useDispatch } from 'react-redux'
import metrics from '../../utils/metrics'
import LinearGradient from 'react-native-linear-gradient'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Profile from '../../screens/Profile/Profile'
import { colors } from '../../utils/colors'
import { signOut } from '../../store/modules/auth/actions'

function Logout () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(signOut())
  }, [])
  return <></>
}

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

const RootStack = createDrawerNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        drawerLabel: 'My Profile'
      })
    },
    Logout: {
      screen: Logout,
      navigationOptions: () => ({
        drawerLabel: 'Sign out'
      })
    }
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerBackground: () => (
        <LinearGradient
          colors={[darken(0.2, colors.primary), colors.primary]}
          style={{ flex: 1 }}
        />
      ),
      headerTintColor: colors.white,
      title: 'Test pagarme',
      gesturesEnabled: true,
      headerLeft: () => (
        <Icon
          style={{ padding: 10, color: colors.white }}
          name='three-bars'
          size={30}
          color={colors.black}
          onPress={() => {
            navigation.toggleDrawer()
          }}
        />
      ),
      headerTitleStyle: {
        paddingLeft: metrics.DEVICE_WIDTH / 5.5,
        color: colors.white
      }
    })
  }
)

export default createAppContainer(
  createStackNavigator({ RootStack: { screen: RootStack } })
)
