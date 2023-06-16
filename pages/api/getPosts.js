import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db('BlogStandard');
    const userProfile = await db.collection('users').findOne({
      auth0Id: sub,
    });

    const { lastPostDate, getNewerPosts } = req.body;

	console.log("lastPostDate =>", lastPostDate);
	console.log("getNewerPosts =>", getNewerPosts);
	
    const posts = await db
      .collection('posts')
      .find({
        userId: userProfile._id,
        created: { [getNewerPosts ? '$gt' : '$lt']: new Date(lastPostDate) },
      })
      .limit(getNewerPosts ? 0 : 5)
      .sort({ created: -1 })
      .toArray();
	  console.log("posts # =>", posts.length);
    res.status(200).json({ posts });
    return;
  } catch (e) {}
});
