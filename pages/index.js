import Head from 'next/head'
import { useCallback, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core'
import { connector } from '../config/web3'

export default function Home() {
  const {
    activate,
    active,
    deactivate,
    error,
    account,
    chainId
  } = useWeb3React()

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)
  }, [activate])

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') {
      connect()
    }
  }, [connect])

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }

  if (error) {
    return <h3><strong>Ha ocurrido un error</strong>: {error.message}</h3>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Metamask Wallet</title>
        <meta name="description" content="Metamask Wallet by @martindevaluado" />
        <link rel="icon" href="https://docs.metamask.io/metamask-fox.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Metamask Wallet
        </h1>

        <div className={styles.description}>
          Just for connect to Wallet and get your account public address.
        </div>

        {
          active 
          ? 
            <>
              <p>You are connected to Network ID: {chainId}.</p>
              <p>Your address account is:</p>
              <p className={styles.account}>{account}</p>
              <button className={styles.button} role="button" onClick={disconnect}>Disconnect Wallet</button>
            </>
          : <button className={styles.button} role="button" onClick={connect}>Connect Wallet</button>
        }
        
      </main>
    </div>
  )
}
