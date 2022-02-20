import {LoaderFunction, useLoaderData, Link, ActionFunction, redirect} from "remix"
import db from "~/utils/db.server";

export const loader:LoaderFunction = async ({params}) => {
    const data = await db.posts.findUnique({where:{id: params.postID}});
    if(!data) throw new Error("Post Not Found");
    return data;
}

export const action:ActionFunction = async ({request, params}) => {
    const formField = await request.formData();
    
    if((formField).get("_method") === "delete"){
        const data = await db.posts.findUnique({where: {id: params.postID}});
        if(!data) throw new Error("Post is no longer Exists");
        await db.posts.delete({where:{id: params.postID}});
    }

    return redirect("/posts");
}

const Post:React.FC = () => {
    const post = useLoaderData();
    return (
        <>
        <div className="page-header">
            <h1>Post</h1>
            <Link to="/posts" className="btn btn-reverse">Back</Link>
        </div>
        <div className="page-content">
            <h2>{post.title}</h2>
            <p>{post.desc}</p>
        </div>
        <div className="page-footer">
            <form method="post">
            <input type="hidden" name="_method" value="delete"/>
            <button type="submit" className="btn btn-delete">Delete</button>
            </form>
        </div>
        </>
    )
}

export default Post;