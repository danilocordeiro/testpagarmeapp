import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import SignIn from './src/screens/SignIn/SignIn'
import SignUp from './src/screens/SignUp/SignUp'
import NavigatorSelector from './src/navigation/NavigatorSelector'

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({ SignIn, SignUp }),
        NavigatorSelector
      },
      { initialRouteName: isSigned ? 'NavigatorSelector' : 'Sign' }
    )
  )
