import './src/config/reactotronConfig'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector } from 'react-redux'
import { StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { darken } from 'polished'
import { appStore, appPersistor } from './src/store/appStore'
import createRouter from './routes'
import { colors } from './src/utils/colors'

function TestPagarme () {
  const signed = useSelector(state => state.auth.signed)
  const Routes = createRouter(signed)
  return <Routes />
}

const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={appPersistor}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={darken(0.2, colors.primary)}
        />
        <PaperProvider>
          <TestPagarme />
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
