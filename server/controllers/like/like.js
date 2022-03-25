const likeDB = require("../../data/like")

async function likePost(req, res) {
  try {
    const { postId } = req.body;
    const userId = req.userId;

    const likeData = await likeDB.likeInfo(userId, postId);
    if (likeData){
      likeDB.deleteLike(likeData.id);
    return res.status(409).json({message:'좋아요를 취소합니다.'})
    }
    const createLikeData = await likeDB.createLike(
      userId,
      postId,
    );
    const likeId = createLikeData.id;
    const result = { likeId, userId, postId };

    return res.status(201).json({ data: result, message: "좋아요를 눌렀습니다." });
  } catch (err) {
    console.log(err);
    return res.status(500).send({message: "서버 에러입니다." });
  }
};

module.exports = {
  likePost,
};
