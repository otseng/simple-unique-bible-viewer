import Container from '../../components/container'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { APP_NAME } from '../../lib/constants'
import { preloadData } from '../../lib/util'
import { getBooks } from '../../lib/api'
import { Disclosure } from '@headlessui/react'
import { useLang } from '../../lang/langContext'
import { useTheme } from '../../theme/themeContext'

export default function Index() {

  const {lang, setLang} = useLang()
  const {theme, setTheme} = useTheme()

  if (!globalThis.bibleBooks) preloadData()

  const router = useRouter()
  const text = router.query.text

  const { data: dataBooks, loading: loadingBooks, error: errorBooks } = getBooks()

  if (errorBooks) return <div>Failed to load</div>
  if (loadingBooks) return <div>Loading...</div>

  if (dataBooks) {
    return (
      <>
        <Layout>
          <Head>
            <title>{APP_NAME}</title>
          </Head>
          <Container>
            <Intro currentPage="Books" />

            <Disclosure defaultOpen>
            <Disclosure.Button className={`${theme.homeDisclosure}`}>
              <div className="text-2xl">{lang.Books}</div>
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              <div>
              {dataBooks.map((title) => (
              <Link href={"/book/" + title.replaceAll('?', '&quest;')}>
                <button className={`${theme.clickableButton}`}>
                  {title.replaceAll('_', ' ')}</button>
              </Link>
            ))}
              </div>
            </Disclosure.Panel>
          </Disclosure>

          </Container>
        </Layout>
      </>
    )
  }
}