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
import Home from '../../screens/Home/Home'
import PaymentAddress from '../../screens/Payment/PaymentAddress/PaymentAddress'
import PaymentCart from '../../screens/Payment/PaymentCart/PaymentCart'
import CompleteRegister from '../../screens/Payment/CompleteRegister/CompleteRegister'
import { colors } from '../../utils/colors'
import Plans from '../../screens/Payment/Plans/Plans'
import CheckoutEasy from '../../screens/Payment/CheckoutEasy/CheckoutEasy'
import CardList from '../../screens/Payment/CardList/CardList'
import { signOut } from '../../store/modules/auth/actions'
import Background from '../../components/Background/Background'

function Logout () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(signOut())
  }, [dispatch])
  return <Background />
}

const RootStack = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({ drawerLabel: 'Home' })
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        drawerLabel: 'My Profile'
      })
    },
    CompleteReg: {
      screen: createStackNavigator(
        {
          CompleteRegister,
          RegPaymentAddress: { screen: PaymentAddress },
          RegPaymentCart: { screen: PaymentCart },
          RegPlans: { screen: Plans }
        },
        {
          initialRouteName: 'CompleteRegister',
          defaultNavigationOptions: {
            headerTransparent: true,
            headerTintColor: colors.white,
            headerLeftContainerStyle: {
              marginLeft: 0
            }
          }
        }
      ),
      navigationOptions: () => ({ drawerLabel: 'Complete Register' })
    },
    Payment: {
      screen: createStackNavigator(
        {
          CardList,
          PaymentAddress,
          PaymentCart,
          CheckoutEasy,
          Plans
        },
        {
          initialRouteName: 'CardList',

          defaultNavigationOptions: {
            headerTransparent: true,

            headerTintColor: colors.white,
            headerLeftContainerStyle: {
              marginLeft: 0
            }
          }
        }
      ),
      navigationOptions: () => ({ drawerLabel: 'Payment' })
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
