const im = require('imagemagick')
const fs = require('fs')
const gm = require('gm')

;(async () => {
  //   let hitCircleInfo = new Promise((resolve, reject) => {
  //     gm('hitcircle@2x.png').identify((err, data) => {
  //       resolve(data.size)
  //     })
  //   })
  upScale('hitcircle@2x.png')
  upScale('hitcircleoverlay@2x.png')
  gm('default-1@2x.png').write('default-1@2x.pngresize.png', (err) => {})

  setTimeout(() => {
    gm('hitcircle@2x.pngresize.png')
      .composite('default-1@2x.pngresize.png')
      .gravity('Center')
      //.composite('hitcircleoverlay@2x.pngresize.png')
      .write('defaultTest.png' + 'resize.png', (err) => {})
    // .append('hitcircleoverlay@2x.pngresize.png', true)

    setTimeout(() => {
      gm('defaultTest.pngresize.png')
        .composite('hitcircleoverlay@2x.pngresize.png')
        .write('defaultTest2.png' + 'resize.png', (err) => {})
    }, 500)
  }, 500)
  // upscale  hitcircle and hitcircleoverlay by 1.25
  //   console.log(hitCircleInfo.width)
  //   gm('hitcircle@2x.png').resize(await hitCircleInfo.width, await hitCircleInfo.height)
})()

function upScale(filePath) {
  gm(filePath).identify((err, data) => {
    let sizeData = data.size
    console.log(sizeData)

    gm(filePath)
      .resize(sizeData.width * 1.25, sizeData.height * 1.25, '!')
      .write(filePath + 'resize.png', (err) => {})
  })
}

// gm('hitcircle@2x.png').identify(function (err, data) {
//   if (!err) console.log(data)
// })
