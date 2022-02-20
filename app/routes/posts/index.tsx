import {LoaderFunction, useLoaderData, Link} from "remix";
import db from "~/utils/db.server"

interface Posts{
    id:string, 
    title:string,
    createdAt: Date 
}

export const loader:LoaderFunction = async () => {
    const data:Posts[] = await db.posts.findMany({
        take: 20,
        select: {id: true, title:true, createdAt: true}
    });
    if(!data) throw new Error("No Posts Found");
    return data;
}

const PostItems:React.FC = () => {
    const post:Posts[] = useLoaderData();
    return(
        <>
        <div className="page-header">
            <h1>Posts</h1>
            <Link className="btn" to="/posts/new">
                New Post
            </Link>
        </div>
        <ul className="posts-list">
            {post.map(post => <li key={post.id}>
                <Link to={post.id}>
                <h2>{post.title}</h2>
                {new Date(post.createdAt).toLocaleString()}
                </Link>
            </li>)}
        </ul>
        </>
    )
}

export default PostItems;