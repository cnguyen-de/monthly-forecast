import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import WorkingCalendar from '../components/working-calendar'

const Home: NextPage = () => {
  const title = 'Forecast Email Generator'
  return (
    <div className="bg-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex max-w-3xl flex-col items-center bg-white min-h-screen">
        <h1 className="my-8 bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-center text-2xl font-bold capitalize tracking-wider text-transparent underline decoration-sky-500 sm:text-3xl md:text-4xl xl:text-4xl">
          {title}
        </h1>
        <span className="group absolute right-8 top-8 cursor-help text-4xl">
          *
          <span className="absolute right-0 hidden w-64 rounded bg-white p-2 text-sm shadow-md group-hover:block">
            No input data is saved, this website functions only on client side
          </span>
        </span>
        <WorkingCalendar />
      </main>
    </div>
  )
}

export default Home
