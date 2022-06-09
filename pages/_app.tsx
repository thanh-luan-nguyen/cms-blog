import { useEffect, useState } from 'react'
import { Layout } from '../components'
import '../styles/globals.scss'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
