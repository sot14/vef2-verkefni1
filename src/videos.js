import express from 'express';
import util from 'util';
import fs from 'fs';

export const router = express.Router();
const readFileAsync = util.promisify(fs.readFile)

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function readData() {
    const file = await readFileAsync('./videos.json');
    const json = JSON.parse(file);
    return json;
}

async function list(req, res) {
    const title = 'Myndbönd';
    const data = await readData();
    const { videos } = data;
    const { categories } = data;

    res.render('videos', { title, videos, categories });
}

async function video(req, res, next) {
    const { id } = req.params;

    const json = await readData();
    const { videos } = json;
  
    const foundVideo = videos.find(a => a.id == id);
  
    if (!foundVideo) {
      // sendum í 404 handler
      return next();
    }
  
    const { title } = foundVideo;
    let relatedVideos = [];
    
    for(const v in foundVideo['related']) {
      const rv_id = foundVideo['related'][v];
      const foundRelated = videos.find(a => a.id == rv_id);
      relatedVideos.push(foundRelated);
    }
  
    return res.render('video', { title, video: foundVideo, related: relatedVideos });
}

router.get('/', catchErrors(list));
router.get('/:id', catchErrors(video));