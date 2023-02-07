global.file = ''
global.taskid = ''
const router = require('koa-router')()
const {
  FFCreatorCenter,
  FFScene,
  FFAudio,
  FFAlbum,
  FFText,
  FFImage,
  FFCreator,
} = require("ffcreator");
const colors = require('colors')
const path = require('path')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Good Boy'
  })
})

router.post('/marking', async (ctx, next) => {
  const {
    tempid,
    file
  } = ctx.request.body
  // 获取模板id 和 图片文件
  let imglist = []
  if (file.length) {
    for (const m of file) {
      imglist.push(m.url)
    }
  }

  FFCreatorCenter.createTemplate(tempid, ({
    image
  }) => {
    console.log('我是参数图片', image)
    // const bg = path.join(__dirname, '../assets/imgs/bg/02.jpeg');
    const bg = 'https://pinkyang.cn/uploadFiles/bg_2.jpeg'
    const logo1 = path.join(__dirname, '../assets/imgs/logo/logo1.png');
    const logo2 = path.join(__dirname, '../assets/imgs/logo/logo2.png');
    const img1 = path.join(__dirname, '../assets/imgs/album/07.jpg');
    const img2 = path.join(__dirname, '../assets/imgs/album/08.jpg');
    const img3 = path.join(__dirname, '../assets/imgs/album/09.jpg');
    const img4 = path.join(__dirname, '../assets/imgs/album/10.jpg');
    const img5 = path.join(__dirname, '../assets/imgs/album/11.jpg');
    const img6 = path.join(__dirname, '../assets/imgs/album/12.jpg');
    const img7 = path.join(__dirname, '../assets/imgs/album/01.jpeg');
    const img8 = path.join(__dirname, '../assets/imgs/album/02.jpeg');
    const img9 = path.join(__dirname, '../assets/imgs/album/03.jpeg');
    const img10 = path.join(__dirname, '../assets/imgs/album/04.jpeg');
    const img11 = path.join(__dirname, '../assets/imgs/album/05.jpeg');
    const cover = path.join(__dirname, '../assets/imgs/cover/cover1.jpg');
    const audio = path.join(__dirname, '../assets/audio/May_I_See_U_Again.mp3');
    const outputDir = path.join(__dirname, '../output/');
    const cacheDir = path.join(__dirname, '../cache/');

    // create creator instance
    const width = 576;
    const height = 1024;
    const creator = new FFCreator({
      cover,
      cacheDir,
      outputDir,
      width,
      height,
      debug: false,
      log: true,
    });

    creator.addAudio(new FFAudio({
      path: audio,
      volume: 0.9,
      fadeIn: 4,
      fadeOut: 4,
      loop: true
    }));

    // create FFScene
    const scene1 = new FFScene();
    const scene2 = new FFScene();
    scene1.setBgColor('#3b3a98');
    scene2.setBgColor('#FFFFF');

    // add new album
    const album = new FFAlbum({
      // list: image,
      list: [img1, img2, img3, img4, img5, img6, img7],
      x: width / 2,
      y: height / 2,
      width: width,
      height: 384,
      showCover: false,
    });
    // album.setTransition('zoomIn');
    album.setDuration(2);
    scene1.addChild(album);

    // add title
    const text1 = new FFText({
      text: '多图相册DEMO',
      x: width / 2,
      y: 150,
      fontSize: 40
    });
    text1.setColor('#ffffff');
    text1.setBackgroundColor('#01003c');
    text1.addEffect('fadeInUp', 1, 1);
    text1.alignCenter();
    text1.setStyle({
      padding: 10
    });
    scene1.addChild(text1);

    const text2 = new FFText({
      text: '可以支持多种动画切换和自定义动画效果',
      x: width / 2,
      y: 250,
      fontSize: 24,
    });
    text2.setColor('#ffffff');
    text2.addEffect('fadeInUp', 1, 2);
    text2.alignCenter();
    scene1.addChild(text2);

    // add logo
    const flogo2 = new FFImage({
      path: logo2,
      x: width / 2,
      y: 60
    });
    flogo2.setScale(0.6);
    scene1.addChild(flogo2);

    scene1.setDuration(album.getTotalDuration() + 1);
    scene1.setTransition('Magnifier', 1.5);
    creator.addChild(scene1);

    // add scene2 background
    const fbg = new FFImage({
      path: bg
    });
    fbg.setXY(width / 2, height / 2);
    scene2.addChild(fbg);

    // 添加文字
    const text3 = new FFText({
      text: '谢谢观看',
      x: width / 2,
      y: height / 2,
      fontSize: 48
    })
    text3.setColor('#111111')
    text3.addEffect('fadeInUp', 1, 2)
    text3.alignCenter()
    scene2.addChild(text3)

    // add logo
    const flogo1 = new FFImage({
      path: logo1,
      x: width / 2,
      y: height / 2 - 150
    });
    flogo1.addEffect('fadeInDown', 1, 1.2);
    scene2.addChild(flogo1);

    scene2.setDuration(5);
    creator.addChild(scene2);

    creator.start();
    // creator.openLog();

    creator.on('start', () => {
      console.log(`FFCreator start`);
    });

    creator.on('error', e => {
      console.log(`FFCreator error: ${e.error}`);
    });

    creator.on('progress', e => {
      console.log(colors.yellow(`FFCreator progress: ${(e.percent * 100) >> 0}%`));
      // ctx.body = { code: 200, pro: `${(e.percent * 100) >> 0}%`}
    });

    creator.on('complete', e => {
      console.log(
        colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `),
      );
      console.log(colors.green(`\n --- You can press the s key or the w key to restart! --- \n`));
    });

    // console.log(creator)
    return creator
  });

  const id = FFCreatorCenter.addTaskByTemplate(tempid, {
    image: imglist
  })

  console.log(id)
  ctx.body = {
    msg: '发送成功，视频加工中...',
    code: 200,
    data: {
      id
    }
  };
})


router.get('/progress', async (ctx, next) => {
  const taskid = ctx.request.query.taskid; // 任务id
  const progress = FFCreatorCenter.getProgress(taskid)
  // console.log('开始建立连接....')、
  const state = FFCreatorCenter.getTaskState(taskid)
  console.log('制作状态', state)
  // console.log('制作进度', progress)  
  if (state === 'complete') {
    const file = FFCreatorCenter.getInfo(taskid)
    const files = FFCreatorCenter.getResultFile(taskid);
    console.log('我是信息', file)
    console.log('我是结果', files)
  }

  ctx.body = {
    code: 200,
    msg: `${taskid}进度为${progress}`,
    data: {
      progress,
      taskid
    }
  };
});

router.get('/tsb', async (ctx, body) => {
  const taskid = '5wfwi6b74dchypu5'
  const state = FFCreatorCenter.getTaskState(taskid)
  console.log('制作状态', state)

  const file = FFCreatorCenter.getInfo(taskid)
  const files = FFCreatorCenter.getResultFile(taskid);
  console.log(file)
  console.log(files)
  ctx.body = {
    code: 200,
    msg: '测试'
  }
})

// 方法二去实现
const createFFTask = () => {
  const bg = path.join(__dirname, './assets/imgs/bg/02.jpeg');
  const logo1 = path.join(__dirname, './assets/imgs/logo/logo1.png');
  const logo2 = path.join(__dirname, './assets/imgs/logo/logo2.png');
  const img1 = path.join(__dirname, './assets/imgs/album/01.jpeg');
  const img2 = path.join(__dirname, './assets/imgs/album/02.jpeg');
  const img3 = path.join(__dirname, './assets/imgs/album/03.jpeg');
  const img4 = path.join(__dirname, './assets/imgs/album/04.jpeg');
  const img5 = path.join(__dirname, './assets/imgs/album/05.jpeg');
  const cover = path.join(__dirname, './assets/imgs/cover/cover1.jpg');
  const audio = path.join(__dirname, './assets/audio/03.wav');
  const outputDir = path.join(__dirname, './output/');
  const cacheDir = path.join(__dirname, './cache/');

  // create creator instance
  const width = 576;
  const height = 1024;
  const creator = new FFCreator({
    cover,
    cacheDir,
    outputDir,
    width,
    height,
    debug: false,
    log: true,
  });

  creator.addAudio(new FFAudio({
    path: audio,
    volume: 0.9,
    fadeIn: 4,
    fadeOut: 4,
    loop: true
  }));

  // create FFScene
  const scene1 = new FFScene();
  const scene2 = new FFScene();
  scene1.setBgColor('#3b3a98');
  scene2.setBgColor('#b33771');

  // add new album
  const album = new FFAlbum({
    list: [img1, img2, img3, img4, img5],
    x: width / 2,
    y: height / 2,
    width: width,
    height: 384,
    showCover: false,
  });
  album.setTransition('zoomIn');
  album.setDuration(2);
  scene1.addChild(album);

  // add title
  const text1 = new FFText({
    text: '多图相册DEMO',
    x: width / 2,
    y: 150,
    fontSize: 40
  });
  text1.setColor('#ffffff');
  text1.setBackgroundColor('#01003c');
  text1.addEffect('fadeInUp', 1, 1);
  text1.alignCenter();
  text1.setStyle({
    padding: 10
  });
  scene1.addChild(text1);

  const text2 = new FFText({
    text: '可以支持多种动画切换和自定义动画效果',
    x: width / 2,
    y: 250,
    fontSize: 24,
  });
  text2.setColor('#ffffff');
  text2.addEffect('fadeInUp', 1, 2);
  text2.alignCenter();
  scene1.addChild(text2);

  // add logo
  const flogo2 = new FFImage({
    path: logo2,
    x: width / 2,
    y: 60
  });
  flogo2.setScale(0.6);
  scene1.addChild(flogo2);

  scene1.setDuration(album.getTotalDuration() + 1);
  scene1.setTransition('Shake', 1.5);
  creator.addChild(scene1);

  // add scene2 background
  const fbg = new FFImage({
    path: bg
  });
  fbg.setXY(width / 2, height / 2);
  scene2.addChild(fbg);
  // add logo
  const flogo1 = new FFImage({
    path: logo1,
    x: width / 2,
    y: height / 2 - 150
  });
  flogo1.addEffect('fadeInDown', 1, 1.2);
  scene2.addChild(flogo1);

  scene2.setDuration(5);
  creator.addChild(scene2);

  creator.start();
  // creator.openLog();

  creator.on('start', () => {
    console.log(`FFCreator start`);
  });

  creator.on('error', e => {
    console.log(`FFCreator error: ${e.error}`);
  });

  creator.on('progress', e => {
    console.log(colors.yellow(`FFCreator progress: ${(e.percent * 100) >> 0}%`));
  });

  creator.on('complete', e => {
    console.log(
      colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `),
    );

    console.log(colors.green(`\n --- You can press the s key or the w key to restart! --- \n`));
  });

  return creator;
};

router.post('/mark2', async (ctx, next) => {
  const id = FFCreatorCenter.addTask(createFFTask)
  console.log(id)
})

module.exports = router