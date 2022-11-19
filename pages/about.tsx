import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { APP_NAME } from '../lib/constants';
import { clickableButton, nonclickableButton } from '../lib/styles';
import { scrollToTop } from '../lib/util';
import { useEffect, useState } from 'react';
import BasicModal from '../components/basic-modal';

export default function Index() {

  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowScrollToTopButton(true);
      } else {
        setShowScrollToTopButton(false);
      }
    });
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>{APP_NAME}</title>
        </Head>
        <Container>
          <Intro currentPage="true" />

          <div className="text-xl"><button className={`${nonclickableButton}`}>About</button></div>

          <div className="m-10">

            <p>Simple web viewer for <a target="new" href="https://github.com/eliranwong/UniqueBible">UniqueBibleApp</a> written in React/Next.</p>

            <p>&nbsp;</p>

            <p className="text-xl font-bold">More UBA viewers</p>
            <ul>
              <li><a target="new" href="https://transliteralbible.com/index.html?cmd=.bible">
                <button className={`${clickableButton}`}>TransliteralBible.com</button></a></li>
              <li><a target="new" href="https://bible.gospelchurch.uk">
                <button className={`${clickableButton}`}>GospelChurch.uk</button></a></li>
              <li><a target="new" href="https://marvelbible.com">
                <button className={`${clickableButton}`}>MarvelBible.com</button></a></li>
            </ul>

          </div>

          {showScrollToTopButton && (
            <button onClick={scrollToTop} className="back-to-top">
              &#8679;
            </button>
          )}
        </Container>
      </Layout>
    </>
  )
}
