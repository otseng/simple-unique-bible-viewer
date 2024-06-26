import Container from '../../../../../components/container'
import Intro from '../../../../../components/intro'
import Layout from '../../../../../components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { APP_NAME } from '../../../../../lib/constants'
import { getBibleNumberFromName, preloadData, range } from '../../../../../lib/util'
import { getCommentaries, getCommentaryContent } from '../../../../../lib/api'
import { Disclosure } from '@headlessui/react'
import { bibleChapters } from '../../../../../data/bibleChapters'
import { useLang } from '../../../../../lang/langContext'
import { useTheme } from '../../../../../theme/themeContext'

export default function Index() {

    const {lang, setLang} = useLang()
    const {theme, setTheme} = useTheme()

    if (!globalThis.bibleBooks) preloadData()

    const router = useRouter()
    const title = router.query.title
    const book = router.query.book as string
    let bookNum = getBibleNumberFromName(book)
    let chapter = router.query.chapter as string
    if (!chapter) chapter = '1'
    const showPrevious = parseInt(chapter) > 1
    const chapters = range(bibleChapters[bookNum], 1)
    let text = router.query.text as string

    if (!text) text = 'KJV'

    const { data: dataCommentaries, loading: loadingCommentaries, error: errorCommentaries } = getCommentaries()
    const { data, loading, error } = getCommentaryContent(title, bookNum, chapter)

    if (error) return <div>Failed to load</div>
    if (loading) return <div>Loading...</div>

    if (data && dataCommentaries) {
        return (
            <>
                <Layout>
                    <Head>
                        <title>{APP_NAME}</title>
                    </Head>
                    <Container>
                        <Intro currentPage="Commentaries" />

                        <Disclosure>
                            <Disclosure.Button className={`${theme.homeDisclosure}`}>
                                <div className="text-2xl">{lang.Commentaries}</div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="text-gray-500">
                                <div>
                                    {dataCommentaries.map((commentary) => (
                                        <Link href={"/commentary/" + commentary + '/' + book + '/' + chapter + '?text=' + text}>
                                            <button className={`${theme.clickableButton}`}>
                                                {commentary.replaceAll('_', ' ')}
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </Disclosure>

                        <Disclosure>
                            <Disclosure.Button className={`${theme.homeDisclosure}`}>
                                <div className="text-2xl">{title}</div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="text-gray-500">
                                <div>
                                    {globalThis.bookNames.map((book) => (
                                        <Link href={"/commentary/" + title + "/" + book + '/1?text=' + text}>
                                            <button className={`${theme.clickableButton}`}>{book}</button>
                                        </Link>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </Disclosure>

                        <Disclosure>
                            <Disclosure.Button className={`${theme.chapterDisclosure}`}>
                                <div className="text-xl">{book} {chapter}</div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="text-gray-500">
                                <div>

                                    {chapters.map((chapter) => (
                                        <Link href={"/commentary/" + title + '/' + book + '/' + chapter + '?text=' + text}>
                                            <button className={`${theme.clickableButton}`}>{chapter}</button>
                                        </Link>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </Disclosure>

                        {text &&
                            <div className="flex justify-center items-center mt-2 mb-5">
                                <Link href={"/bible/" + text + '/' + book + '/' + chapter}>
                                    <button className={`${theme.clickableButton}`}>Back to {text}</button>
                                </Link>
                            </div>
                        }

                        <span className={`${theme.commentaryTextContainer}`}>
                        {data.map((data) => (
                            <p><span className="title-container" dangerouslySetInnerHTML={{ __html: data }} /></p>
                        ))}
                        </span>

                        <div className="flex justify-center items-center mt-2 mb-5">
                            {showPrevious && (
                                <Link href={"/commentary/" + title + '/' + book + '/' + (parseInt(chapter) - 1)}>
                                    <button className={`${theme.clickableButton}`}>{lang.Previous}</button>
                                </Link>)}
                            <Link href={"/commentary/" + title + '/' + book + '/' + (parseInt(chapter) + 1)}>
                                <button className={`${theme.clickableButton}`}>{lang.Next}</button>
                            </Link>
                        </div>

                        {text &&
                            <div className="flex justify-center items-center mt-2 mb-5">
                                <Link href={"/bible/" + text + '/' + book + '/' + chapter}>
                                    <button className={`${theme.clickableButton}`}>Back to {text}</button>
                                </Link>
                            </div>
                        }

                    </Container>
                </Layout>
            </>
        )
    }
}

