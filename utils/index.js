/**
 * 导出相册模板
 * 卡点视频模板
 */

const path = require("path");
const {
  FFScene,
  FFCreatorCenter,
  FFAudio,
  FFCreator,
  FFVideo,
  FFImage,
  FFAlbum,
} = require("ffcreator");

// 这里定义一些常量
/**
 * width 视频宽度
 * height 视频高度
 * music 视频背景音乐
 * cacheDir 渲染缓存目录
 * outputDir 视频导出目录
 * fps  帧数
 */

const conf = {
  width: 1080,
  height: 1920,
  music: path.join(__dirname, "..", "assets", "audio", "1.mp3"),
  cacheDir: path.join(__dirname, "../cache/"),
  outputDir: path.join(__dirname, "../output/"),
  fps: 30,
};

const imgList = [
  'https://s1.ax1x.com/2023/02/24/pSzsIjP.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzs7B8.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzs5ct.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzs41I.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzsHHS.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzsqAg.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzsv3n.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzsOhj.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzsLNQ.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzsxcq.jpg',
  'https://s1.ax1x.com/2023/02/24/pSzsj9s.jpg'
]

/**
 * 简简单单相册导出
 * @params imgList 图片 
 * @params id  模板id 
 */
const albumTaskTemplate = (imgList, id) => {
  // 创建入口
  const compose = new FFCreator({
    width: conf.width,
    height: conf.height,
    cacheDir: conf.cacheDir,
    outputDir: conf.outputDir,
    fps: conf.fps,
    clarity: "high",
    debug: false,
    log: true,
  });

  // 添加背景音乐
  const aduio = new FFAudio({
    path: conf.music,
    volume: 0.9,
    fadeIn: 4,
    fadeOut: 4,
    loop: true
  })
  compose.addAudio(aduio)

  // 创建相册
  // const album = new FFAlbum({
  //   list: imgList,
  //   width: conf.width,
  //   height: conf.height,
  //   x: conf.width / 2,
  //   y: conf.height / 2
  // })
  // album.setDuration(3)
  // album.setTransition()

  // 不使用 相册 使用 画面 + 图片 + 文字 去 循环生成
  imgList.forEach((el, index) => {
    let scence = new FFScene()
    let img = new FFImage({
      x: conf.width / 2,
      y: conf.height / 2,
      width: conf.width,
      height: conf.height / 2,
      duration: 2,
      path: el
    })

    let bg = new FFImage({
      x: conf.width / 2,
      y: conf.height / 2,
      width: conf.width,
      height: conf.height,
      duration: 2,
      path: el
    })

    

    scence.addChild(bg)
    // img.addEffect('zoomIn', 1, 1)
    scence.addChild(img)
    scence.setDuration(3)
    scence.setTransition('Fat')
    compose.addChild(scence)
  });

  
  // 高斯模糊 背景 还未 实现 后续 实现 

  // 创建画面
  // const scence = new FFScene()
  // 相册 传入 画面
  // scence.addChild(album)
  // compose.addChild(scence)

  // 开始渲染
  compose.start()


  compose.on("complete", (e) => {
    console.log(
      `FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `
    );
    console.log(`\n --- You can press the s key or the w key to restart! --- \n`);
  });
};


albumTaskTemplate(imgList)