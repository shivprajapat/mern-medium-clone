import React from 'react'

const Banner = () => {
    return (
        <section className='flex justify-between items-center bg-yellow-400 border-y border-black py-20'>
            <div className="px-10 space-y-5">
                <h1 className='text-6xl max-w-xl font-serif'>
                    <span className="underline decoration-black decoration-4">
                        Medium
                    </span>
                    is a place to write, read and connect</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos modi eveniet </p>
            </div>
            <div className="px-10 space-y-5">
                <img
                    src="/medium-logo.png"
                    className="hidden md:inline-flex h-32 lg-h-full"
                    alt=""
                />
            </div>
        </section>
    )
}

export default Banner