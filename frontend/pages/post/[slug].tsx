import { useState } from 'react'
import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";
import PortableText from "react-portable-text"
import { SubmitHandler, useForm } from "react-hook-form";

interface InputType {
    _id: string;
    name: string;
    email: string;
    comment: string
}
interface Props {
    post: Post;
}
const PostDetails = ({ post }: Props) => {

    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<InputType>();
    const onSubmit: SubmitHandler<InputType> = async (data) => {
        await fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(() => {
            console.log(data);

            setSubmitted(true);
        }).catch((error) => { console.log(error); setSubmitted(false) })
    }
    return (
        <main>
            <Header />
            <img
                src={urlFor(post.mainImage).url()}
                className="w-full object-cover h-80"
                alt=""
            />
            <article className="max-w-4xl mx-auto p-5">
                <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
                <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>
                <div className="flex items-center space-x-2">
                    <img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()} alt="" />
                    <p className="text-sm font-medium">Blog Post by {'-'}
                        <span className="text-pink-500 font-bold ml-2 capitalize">{post.author.name}</span>
                        {'-'}
                        <span className="text-black-500 font-medium ml-2 capitalize"><span>Published at </span>  {new Date(post._createdAt).toLocaleString()}</span>
                    </p>
                </div>
                <div>
                    <PortableText
                        content={post.body}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                        serializers={{
                            h1: (props: any) => <h1 className='text-2xl font-bold my-5' {...props} />,
                            h2: (props: any) => <h1 className='text-xl font-bold my-5' {...props} />,
                            li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
                            link: ({ href, children }: any) => {
                                <a href={href} className="text-blue-500 hover:underline">{children}</a>
                            }
                        }} />
                </div>
            </article>
            <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />


            {submitted ? (
               <div className="flex flex-col p-5 mb-10 text-white bg-yellow-500 max-w-xl mx-auto">
            <h3 className="text-3xl font-bold">Thank you for submitted your comment!</h3>
            <p>Once it has been approved, it will appear below</p>
            </div>
            ) : (
                <form className='flex flex-col p-5 max-w-2xl mx-auto mb-10'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className="text-sm text-yellow-500">Enjoyed this article</h3>
                <h4 className="text-3xl mb-2 font-bold">Leave a comment below !</h4>
                <hr className="mb-5 black" />
                <input {...register("_id")} type="hidden" name='_id' value={post._id} />
                <div className='mb-5'>
                    <label className='black mb-5' htmlFor="Name">Name</label>
                    <input
                        {...register("name", { required: true })}
                        className='shadow border rounded  mt-3 py-2 px-3 form-input  block w-full ring-yellow-500 outline-none focus:ring' type="text" placeholder="John Application" />
                    {errors.name && (
                        <span className="text-red-500">This field is required</span>
                    )}
                </div>
                <div className='mb-5'>
                    <label className='black' htmlFor="Email">Email</label>
                    <input {...register("email", { required: true })} className='shadow border rounded  mt-3 py-2 px-3 form-input block w-full ring-yellow-500 outline-none focus:ring' type="email" placeholder="John Application" />
                    {errors.email && (
                        <span className="text-red-500">This field is required</span>
                    )}
                </div>
                <div className='mb-5'>
                    <label className='black' htmlFor="Comment">Comment</label>
                    <textarea {...register("comment", { required: true })} className='shadow border mt-2 rounded py-2 px-3 form-textarea block w-full ring-yellow-500 outline-none focus:ring' rows={8} placeholder="John Application" />
                    {errors.comment && (
                        <span className="text-red-500">This field is required</span>
                    )}
                </div>
                <div className='mt-10'>
                    <button type="submit" className="block w-full px-4 py-2 rounded text-white bg-yellow-500 font-bold hover:bg-yellow-400 focus:shadow-outline focus:outline-none transition duration-150">submit</button>
                </div>
            </form>
            )}

        </main>
    );
};

export default PostDetails;

export const getStaticPaths = async () => {
    const query = `*[_type == 'post']{
        _id,
        slug {
        current
    }
}
    `;
    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post: Post) => ({
        params: { slug: post.slug.current },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author-> {
        name,
        image
      },
        'comments': *[
          _type == "comment" &&
          post._ref == ^._id &&
          approved == true],
      description,
      mainImage,
      slug,
      body
    }`;

    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });
    if (!post) {
        return {
            notFound: true,
        };
    }
    return {
        props: { post },
        revalidate: 60, //after 60 seconds update the old cached version
    };
};
