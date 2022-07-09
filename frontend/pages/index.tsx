import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typing'

interface Props {
  posts: [Post];
}
const Home: NextPage = ({ posts }: Props) => {
  console.log('posts :>> ', posts);
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      {/* Post */}

      {
        posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              <img src={urlFor(post.mainImage).url()} alt="" />
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `
  *[_type == 'post']{
    _id,
    title,
    slug,
    author => {
    name,
    image
  },
  description,
  mainImage,
  slug
  }
  `
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts
    }
  }
}