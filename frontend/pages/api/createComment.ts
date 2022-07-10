import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from "@sanity/client";


export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    token: process.env.SANITY_API_TOKEN,
    useCdn: process.env.NODE_ENV === "production",
};
export const client = sanityClient(config);

export default async function createComment(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { _id, email, name, comment } = JSON.parse(req.body);
    try {
        await client.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id,
            },
            name, email, comment
        })
    } catch (error) {
        return res.status(500).json({ message: 'Could not submit comment', error })
    }
    console.log('Comment submitted successfully');

    res.status(200).json({ name: 'John Doe' })
}
