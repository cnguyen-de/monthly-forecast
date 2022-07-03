import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import WorkingCalendar from '../components/working-calendar'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="sm:text-3xl md:text-4xl xl:text-5xl tracking-wider uppercase font-bold my-8">
          Forecast Email Generator
        </h1>
        <span className="absolute right-12 top-12 group text-4xl cursor-help">
          *
          <span className="absolute group-hover:block hidden text-sm right-0 w-64">
            No input data is saved, this website functions only on client side
          </span>
        </span>
        <WorkingCalendar />
      </main>
    </div>
  )
}

export default Home
