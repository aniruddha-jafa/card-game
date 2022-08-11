import Head from 'next/head'
import ErrorBoundary from '../components/ErrorBoundary'
import 'purecss/build/pure-min.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet='UTF-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
            </Head>
            <ErrorBoundary>
                <Component {...pageProps} />
            </ErrorBoundary>
        </>
    )
}

export default MyApp
