const fs = require('fs')
const path = require('path')
const gm = require('gm')

;(async () => {
  if (!fs.existsSync(__dirname + '/new_files')) {
    fs.mkdirSync(__dirname + '/new_files')
  }

  if (!fs.existsSync(__dirname + '/temp_files')) {
    fs.mkdirSync(__dirname + '/temp_files')
  }

  createBlankHitCircles()

  let filesToBeUpScaled = ['hitcircle@2x.png', 'hitcircleoverlay@2x.png']
  upScale(filesToBeUpScaled, createInstas)

  // gm(__dirname + `/new_files/default-0@2x.png`).identify((err, data) => {
  //   let sizeData = data.size
  //   console.log(`In skin.ini set the HitCircleOverlap to half the default@2x images width: ${sizeData.width / 2}`)
  // })
})()

function upScale(filePaths, cb) {
  console.log('Files to be upscaled:')
  for (let i = 0; i < filePaths.length; i++) {
    gm(__dirname + `/${filePaths[i]}`).identify((err, data) => {
      let sizeData = data.size
      console.log(filePaths[i], sizeData)
      console.log('new size used for default images: ', { width: sizeData.width * 1.25, height: sizeData.height * 1.25 }, '\n')
      // console.log(`In skin.ini set the HitCircleOverlap to half the default@2x images width: ${(sizeData.width * 1.25) / 2}`)

      gm(__dirname + `/${filePaths[i]}`)
        .resize(sizeData.width * 1.25, sizeData.height * 1.25, '!')
        .write(__dirname + '/temp_files/' + filePaths[i], (err) => {
          if (err) console.log(err)

          // call cb after last upscale
          if (i + 1 === filePaths.length) {
            cb()
          }
        })
    })
  }
}

function createInstas() {
  for (let i = 0; i < 10; i++) {
    gm(__dirname + '/temp_files/' + 'hitcircle@2x.png')
      .composite(__dirname + `/default-${i}@2x.png`)
      .gravity('Center')
      .write(__dirname + `/temp_files/default-${i}-test.png`, (err) => {
        if (err) console.log(err)

        gm(__dirname + `/temp_files/default-${i}-test.png`)
          .composite(__dirname + '/temp_files/' + 'hitcircleoverlay@2x.png')
          .write(__dirname + `/new_files/default-${i}@2x.png`, (err) => {
            if (err) console.log(err)
          })
      })
  }
}

function createBlankHitCircles() {
  gm(1, 1, '#00000000').write(__dirname + '/new_files/hitcircleoverlay@2x.png', (err) => {
    if (err) console.log(err)
  })
  gm(1, 1, '#00000000').write(__dirname + '/new_files/hitcircle@2x.png', (err) => {
    if (err) console.log(err)
  })
}
