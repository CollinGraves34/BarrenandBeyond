const express = require('express');
const router = express.Router();
const {
	getAllImages,
	getImage,
	updateImage,
	deleteImage,
	createImage,
	getAllTags,
	createTag
} = require('../controllers/images');

router.route('/getallimages').get(async (req, res) => {
	const images = await getAllImages();

	res.status(200).send({ Images: images });
});

router.route('/getalltags').get(async (req, res) => {
	const tags = await getAllTags();

	res.status(200).send({ tags: tags });
});

router.route('/add/tag').post(async (req, res) => {
	const tag = req.body.name;

	const response = await createTag(tag);

	res.status(200).send(response);
});

router.route('/edit/:imageid').post(async (req, res) => {
	const imageId = req.params.imageid;
	const __filename = req.body.__filename
	const image = req.body.image;
	const author = req.body.author;
	const desc = req.body.description;
	const tags = req.body.tags
	const views = req.body.views

	const response = await updateImage(imageId, __filename, image, author, desc, tags, views);

	res.status(200).send(response);
});

router.route('/create').post(async (req, res) => {
	const __filename = req.body.__filename
	const image = req.body.image;
	const author = req.body.author;
	const desc = req.body.description;
	const tags = req.body.tags
	const views = req.body.views
	
	const response = await createImage(__filename, image, author, desc, tags, views);

	res.status(200).send(response);
});

router.route('/deleteimage/:imageid').post(async (req, res) => {
	const imageId = req.params.imageid;

	const response = deleteImage(imageId);

	res.status(200).send(response);
});

router.route('/image/:imageid').get(async (req, res) => {
	const imageId = req.params.imageid;
	const image = await getImage(imageId);

	res.status(200).send({Image: image});
});


module.exports = router;
