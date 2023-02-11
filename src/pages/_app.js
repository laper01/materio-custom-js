// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

// next auth
import { SessionProvider } from 'next-auth/react'

//  redux
import { persistor, wrapper } from '../redux/store/store';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {


  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const { store } = wrapper.useWrappedStore(pageProps);

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{themeConfig.templateName}</title>
        <meta name='description' content={`${themeConfig.templateDescription}`} />
        <meta name='keywords' content={`${themeConfig.keyWords}`} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={settings}>
                <Provider store={store} >
                  <PersistGate loading={null} persistor={persistor}>
                    {getLayout(<Component {...pageProps} />)}
                  </PersistGate>
                </Provider>
              </ThemeComponent>
            )
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

const makeStore = () => store;

export default App;
// export default App;
