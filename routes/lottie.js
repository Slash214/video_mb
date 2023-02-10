/**
 * 测试 lottie动画
 */
const lottie = require("lottie-nodejs");
const { Image, Canvas } = require("canvas");
const path = require("path");
const {
  FFCreatorCenter,
  FFScene,
  FFAudio,
  FFAlbum,
  FFText,
  FFImage,
  FFCreator,
  FFLottie,
} = require("ffcreator");
// const fs = require('fs-extra')
// lottie.setCanvas({
// 	Canvas,
// 	Image
// })

// let index = 1

// const canvas = new Canvas(500, 500)

// const anim = lottie.loadAnimation({
// 	container: canvas,
// 	loop: false,
// 	path: path.join(__dirname, '../assets/animation/chines/data.json'),

// })

// setInterval(() => {
// 	anim.render()

// 	const buffer = canvas.toBuffer('image/png')
// 	const file = path.join(__dirname, `../output/imgs/${index++}.png`)
// 	fs.outputFile(file, buffer)
// 	fs.outputFile(file, buffer, (err) => {
// 		if (err) return console.log(err)
// 		console.log('成功写入')
// 	})
// }, 1000 / 30 )

const creator = new FFCreator({
  width: 1920,
  height: 1080,
  cacheDir: path.join(__dirname, "../cache/"),
  outputDir: path.join(__dirname, "../output/"),
  debug: false,
  log: true,
  fps: 30,
  cover: path.join(__dirname, "../assets/imgs/cover/cover2.jpg"),
});

let audio = path.join(__dirname, "../assets/audio/1.mp3");
creator.addAudio(
  new FFAudio({
    path: audio,
    volume: 0.9,
    fadeIn: 4,
    fadeOut: 4,
    loop: true,
  })
);

const scene = new FFScene()

let file = path.join(__dirname, "../assets/animation/chines/data.json");
console.log(file);
const flottie = new FFLottie({
  x: 1920 / 2,
  y: 1080 / 2,
  width: 1920,
  height: 1080,
  file,
  loop: false,
});

flottie.replaceText('羊羊羊', '很开心')

scene.addChild(flottie)
creator.addChild(scene)

creator.start()

creator.on("start", () => {
	console.log(`FFCreator start`);
  });
  
  creator.on("error", (e) => {
	console.log(`FFCreator error: ${e.error}`);
  });
  
  creator.on("progress", (e) => {
	console.log(`FFCreator progress: ${(e.percent * 100) >> 0}%`);
  });
  
  creator.on("complete", (e) => {
	console.log(
	  `FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `
	);
	console.log(`\n --- You can press the s key or the w key to restart! --- \n`);
  });