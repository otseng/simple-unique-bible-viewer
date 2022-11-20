import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import Link from 'next/link';
import { getBibles, getBooks, getCommentaries } from '../lib/api'
import { APP_NAME } from '../lib/constants';
import { clickableButton, homeDisclosure } from '../lib/styles';
import { Disclosure } from '@headlessui/react';

export default function Index() {

  const { data: dataBible, loading: loadingBible, error: errorBible } = getBibles()
  const { data: dataBooks, loading: loadingBooks, error: errorBooks } = getBooks()
  const { data: dataCommentary, loading: loadingCommentary, error: errorCommentary } = getCommentaries()

  if (errorBible || errorBooks || errorCommentary) return <div>Failed to load</div>
  if (loadingBible || loadingBooks || loadingCommentary) return
  if (dataBible && dataBooks && dataCommentary) return (
    <>
      <Layout>
        <Head>
          <title>{APP_NAME}</title>
        </Head>
        <Container>
          <Intro currentPage="Home"/>

          <Disclosure defaultOpen>
            <Disclosure.Button className={`${homeDisclosure}`}>
              <div className="text-2xl">Bibles</div>
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              <div>
                {dataBible.map((text) => (
                  <Link href={"/bible/" + text}>
                    <button className={`${clickableButton}`}>{text}</button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </Disclosure>

          <Disclosure defaultOpen>
            <Disclosure.Button className={`${homeDisclosure}`}>
              <div className="text-2xl">Books</div>
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              <div>
                {dataBooks.map((title) => (
                  <Link href={"/book/" + title}>
                    <button className={`${clickableButton}`}>
                      {title.replaceAll('_', ' ')}</button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </Disclosure>

          <Disclosure defaultOpen>
            <Disclosure.Button className={`${homeDisclosure}`}>
              <div className="text-2xl">Commentaries</div>
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
              <div>
                {dataCommentary.map((commentary) => (
                  <Link href={"/commentary/" + commentary}>
                    <button className={`${clickableButton}`}>
                      {commentary.replaceAll('_', ' ')}
                    </button>
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

