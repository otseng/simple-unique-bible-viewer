import Container from '../../../components/container'
import Intro from '../../../components/intro'
import Layout from '../../../components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { APP_NAME } from '../../../lib/constants'
import { preloadData } from '../../../lib/util'
import { clickableButton } from '../../../lib/styles'

export default function Index() {

  if (!globalThis.bibleBooks) preloadData()

  const router = useRouter()
  const title = router.query.title

  return (
  <>
      <Layout>
      <Head>
          <title>{APP_NAME}</title>
      </Head>
      <Container>
          <Intro />
          <h1 className="text-xl">Commentary / {title}</h1>
          <p>&nbsp;</p>
          <ul>
          {globalThis.bookNames.map((book) => (
            <Link href={"/commentary/" + title + "/" + book}>
              <button className={`${clickableButton}`}>{book}</button>
            </Link>
          ))}
        </ul>

      </Container>
      </Layout>
  </>
  )
}