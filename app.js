const im = require('imagemagick')
const fs = require('fs')
const gm = require('gm')

;(async () => {
  //   let hitCircleInfo = new Promise((resolve, reject) => {
  //     gm('hitcircle@2x.png').identify((err, data) => {
  //       resolve(data.size)
  //     })
  //   })
  let filesToBeUpScaled = ['hitcircle@2x.png', 'hitcircleoverlay@2x.png']

  upScale(filesToBeUpScaled, createInstas)
  // upScale('hitcircleoverlay@2x.png')
  // gm('default-1@2x.png').write('default-1@2x.pngresize.png', (err) => {})

  // upscale  hitcircle and hitcircleoverlay by 1.25
  //   console.log(hitCircleInfo.width)
  //   gm('hitcircle@2x.png').resize(await hitCircleInfo.width, await hitCircleInfo.height)
})()

function upScale(filePaths, cb) {
  for (let i = 0; i < filePaths.length; i++) {
    gm(filePaths[i]).identify((err, data) => {
      let sizeData = data.size
      console.log(sizeData)

      gm(filePaths[i])
        .resize(sizeData.width * 1.25, sizeData.height * 1.25, '!')
        .write('./temp_files/' + filePaths[i], (err) => {
          if (i + 1 === filePaths.length) {
            // call cb after last upscale
            cb()
          }
        })
    })
  }
}

function createInstas() {
  for (let i = 0; i <= 10; i++) {
    gm('./temp_files/' + 'hitcircle@2x.png')
      .composite(`default-${i}@2x.png`)
      .gravity('Center')
      //.composite('hitcircleoverlay@2x.pngresize.png')
      .write(`./temp_files/default-${i}-test.png`, (err) => {
        gm(`./temp_files/default-${i}-test.png`)
          .composite('./temp_files/' + 'hitcircleoverlay@2x.png')
          .write(`./new_files/default-${i}@2x.png`, (err) => {})
      })
    // .append('hitcircleoverlay@2x.pngresize.png', true)
  }
}
// gm('hitcircle@2x.png').identify(function (err, data) {
//   if (!err) console.log(data)
// })
