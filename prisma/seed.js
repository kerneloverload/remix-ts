const {PrismaClient} = require("@prisma/client");

const db = new PrismaClient();

async function seed(){
    await Promise.all(
        getPosts().map((post) => {
            return db.posts.create({data:post});
        })
    );
}

seed();

function getPosts(){
    return [
        { id: "1", title: "Post 1", desc: "The test Post" },
    { id: "2", title: "Post 2", desc: "The test Post" },
    { id: "3", title: "Post 3", desc: "The test Post" },
    { id: "4", title: "Post 4", desc: "The test Post" },
    ]
}