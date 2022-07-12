export interface Post {
    _id: string;
    createAt: string;
    title: string;
    author: {
        names: string;
        image: string;
    }
    comments:Comment[];
    description: string;
    mainImage: {
        assets: { url: string; }
    };
    slug: { current: string; }
    body: [object]
}
export interface Comment {
    name: string;
    comment: string;
    email: string;
    approved: boolean;
    post: {
        _red: string;
        _type: string;
    };
    _createAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}