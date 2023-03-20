//Requirements/Imports
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');


const FILE_PATH = './data/videos.json';

//Reading JSON Data
const readVideos = () => {
    const videosData = JSON.parse(fs.readFileSync(FILE_PATH));
    return videosData;
}

// GET /videos
router.get('/', (_req, res) => {
    const videosData = readVideos();
    const vData = videosData.map(obj => ({ id: obj.id, title: obj.title, channel: obj.channel, image: obj.image }));
    res.json(vData);
});
// GET /videos/:id
router.get('/:id', (req, res) => {
    const videosData = readVideos();
    const video = videosData.find(v => v.id === req.params.id);
    if (video) {
        res.status(200).json(video);
    } else {
        res.status(404).send('Video not found');
    }
});
// POST /videos
router.post('/', (req, res) => {
    const videoObj = req.body;
    const videosData = readVideos();
    const newVideo = {
        id: uuid(),
        title: videoObj.title,
        description: videoObj.description,
        channel: "Ray Singh",
        image: "http://localhost:8080/images/default-image.jpg",
        views: 0,
        likes: 0,
        duration: (Math.random() * 4 + 1).toFixed(2),
        video: videosData[0].video,
        timestamp: new Date().getTime(),
        comments: []
    }
    videosData.push(newVideo);
    fs.writeFileSync(FILE_PATH, JSON.stringify(videosData));
    res.status(201).json(newVideo);
});
//Exporting Routes
module.exports = router;
