export interface Post {
    _id: string;
    createAt: string;
    title: string;
    author: {
        names: string;
        image: string;
    }
    description: string;
    mainImage: {
        assets: { url: string; }
    };
    slug: { current: string; }
    body: [object]
}