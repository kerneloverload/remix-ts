import { ActionFunction, Link, redirect } from "remix";
import db from "~/utils/db.server";

export const action:ActionFunction = async ({request}) => {
    const formField = await request.formData();
    const title = formField.get("title");
    const desc = formField.get("desc");
    const formInput = {title, desc}
    const post = await db.posts.create({data : {title: title as string, desc: desc as string}});
    console.log(post);
    return redirect("/posts");
}

const newPost:React.FC = () => {
    return (
        <>
        <div className="page-header">
            <h1>New Post</h1>
            <Link className="btn btn-reverse" to="/posts">
                Back
            </Link>
        </div>
        <form method="post">
            <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" required/>
            </div>
            <div className="form-control">
            <label htmlFor="desc">Description</label>
            <textarea name="desc" id="desc"/>
            </div>
            <button type="submit" className="btn btn-block">Add Post</button>
        </form>
        </>
    )
}

export default newPost;