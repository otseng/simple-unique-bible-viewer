import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { APP_NAME, DOMAIN } from '../lib/constants';
import { clickableButton, homeDisclosure } from '../lib/styles';
import QRCode from "react-qr-code";
import { Disclosure } from '@headlessui/react';

export default function Index() {

  return (
    <>
      <Layout>
        <Head>
          <title>{APP_NAME}</title>
        </Head>
        <Container>
          <Intro currentPage="true" />

          <Disclosure defaultOpen>
            <Disclosure.Button className={`${homeDisclosure}`}>
              <div className="text-2xl">About</div>
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">

          <div className="m-10">

            <p className="text-xl">Simple web viewer for <a target="new" href="https://github.com/eliranwong/UniqueBible">UniqueBibleApp</a> written in <a target="new" href="https://reactjs.org/">React</a>/<a target="new" href="https://nextjs.org/">Next</a>.</p>

            <p className="text-xl font-bold mt-10">More UBA viewers</p>
            <ul>
              <li><a target="new" href="https://transliteralbible.com/index.html?cmd=.bible">
                <button className={`${clickableButton}`}>TransliteralBible.com</button></a></li>
              <li><a target="new" href="https://bible.gospelchurch.uk">
                <button className={`${clickableButton}`}>GospelChurch.uk</button></a></li>
              <li><a target="new" href="https://marvelbible.com">
                <button className={`${clickableButton}`}>MarvelBible.com</button></a></li>
            </ul>

            <p className="text-xl font-bold mt-10">App QR Code</p>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "400" }}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={DOMAIN}
                viewBox={`0 0 256 256`}
              />
            </div>

          </div>

          </Disclosure.Panel>
          </Disclosure>

        </Container>
      </Layout>
    </>
  )
}

