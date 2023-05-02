import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'
import Mode from '@/components/mode'


export default function Home() {
  return (
    <>
      <Layout>
        <h1>Domofox</h1>
        <Mode></Mode>
      </Layout>
    </>
  )
}
