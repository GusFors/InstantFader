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
