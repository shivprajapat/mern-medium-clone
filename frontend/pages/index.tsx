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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-12 md:py-6">
        {
          posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className='border  border-lg group  overflow-hidden cursor-pointer'>
                <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage).url()} alt="" />
                <div className="flex justify-between p-5 bg-white">
                  <div>
                    <p className='text-lg font-bold'>{post.title}</p>
                    <p className='text-xs'>{post.description} by <span className='font-bold text-pink-500 capitalize'>{post.author.name}</span> </p>
                  </div>
                  <img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()} alt={post.title} />
                </div>
              </div>
            </Link>
          ))
        }
      </div>
      {/* ./Post */}
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
    author-> {
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