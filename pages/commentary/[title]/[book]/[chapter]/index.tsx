import Container from '../../../../../components/container'
import Intro from '../../../../../components/intro'
import Layout from '../../../../../components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { APP_NAME } from '../../../../../lib/constants'
import { preloadData, range, scrollToTop } from '../../../../../lib/util'
import { getCommentaries, getCommentaryContent } from '../../../../../lib/api'
import { Spinner } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { chapterDisclosure, clickableButton, homeDisclosure, nonclickableButton } from '../../../../../lib/styles'
import { Disclosure } from '@headlessui/react'
import { bibleChapters } from '../../../../../data/bibleChapters'

export default function Index() {

    if (!globalThis.bibleBooks) preloadData()

    const router = useRouter()
    const title = router.query.title
    const book = router.query.book as string
    const bookNum = globalThis.bibleNameToNumber[book]
    const chapter = router.query.chapter as string
    const showPrevious = parseInt(chapter) > 1
    const chapters = range(bibleChapters[bookNum], 1)

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

    const { data: dataCommentaries, loading: loadingCommentaries, error: errorCommentaries } = getCommentaries()

    const { data, loading, error } = getCommentaryContent(title, bookNum, chapter)

    if (error) return <div>Failed to load</div>
    if (loading) return

    if (data && dataCommentaries) {
        return (
            <>
                <Layout>
                    <Head>
                        <title>{APP_NAME}</title>
                    </Head>
                    <Container>
                        <Intro currentPage="true" />

                        <Disclosure>
                            <Disclosure.Button className={`${homeDisclosure}`}>
                                <div className="text-2xl">Commentaries</div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="text-gray-500">
                                <div>
                                    {dataCommentaries.map((commentary) => (
                                        <Link href={"/commentary/" + commentary + '/' + book + '/' + chapter}>
                                            <button className={`${clickableButton}`}>
                                                {commentary.replaceAll('_', ' ')}
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </Disclosure>

                        <Disclosure>
                            <Disclosure.Button className={`${homeDisclosure}`}>
                                <div className="text-2xl">{title}</div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="text-gray-500">
                                <div>
                                    {globalThis.bookNames.map((book) => (
                                        <Link href={"/commentary/" + title + "/" + book}>
                                            <button className={`${clickableButton}`}>{book}</button>
                                        </Link>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </Disclosure>

                        <Disclosure>
                            <Disclosure.Button className={`${chapterDisclosure}`}>
                                <div className="text-xl">{book} {chapter}</div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="text-gray-500">
                                <div>

                                    {chapters.map((chapter) => (
                                        <Link href={"/commentary/" + title + '/' + book + '/' + chapter}>
                                            <button className={`${clickableButton}`}>{chapter}</button>
                                        </Link>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </Disclosure>

                        {
                            data.map((data) => (
                                <p><span className="title-container" dangerouslySetInnerHTML={{ __html: data }} /></p>
                            ))
                        }

                        {showPrevious && (
                            <Link href={"/commentary/" + title + '/' + book + '/' + (parseInt(chapter) - 1)}>
                                <button className={`${clickableButton}`}>Previous</button>
                            </Link>)}
                        <Link href={"/commentary/" + title + '/' + book + '/' + (parseInt(chapter) + 1)}>
                            <button className={`${clickableButton}`}>Next</button>
                        </Link>

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
}

