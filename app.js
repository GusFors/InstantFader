const fs = require('fs')
const gm = require('gm')

;(async () => {
  if (!fs.existsSync('./new_files')) {
    fs.mkdirSync('./new_files')
  }

  if (!fs.existsSync('./temp_files')) {
    fs.mkdirSync('./temp_files')
  }

  createBlankHitCircles()

  let filesToBeUpScaled = ['hitcircle@2x.png', 'hitcircleoverlay@2x.png']
  upScale(filesToBeUpScaled, createInstas)
})()

function upScale(filePaths, cb) {
  for (let i = 0; i < filePaths.length; i++) {
    gm(filePaths[i]).identify((err, data) => {
      let sizeData = data.size
      console.log(sizeData)

      gm(filePaths[i])
        .resize(sizeData.width * 1.25, sizeData.height * 1.25, '!')
        .write('./temp_files/' + filePaths[i], (err) => {
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
    gm('./temp_files/' + 'hitcircle@2x.png')
      .composite(`default-${i}@2x.png`)
      .gravity('Center')
      //.composite('hitcircleoverlay@2x.pngresize.png')
      .write(`./temp_files/default-${i}-test.png`, (err) => {
        if (err) console.log(err)

        gm(`./temp_files/default-${i}-test.png`)
          .composite('./temp_files/' + 'hitcircleoverlay@2x.png')
          .write(`./new_files/default-${i}@2x.png`, (err) => {
            if (err) console.log(err)
          })
      })
  }
}

function createBlankHitCircles() {
  gm(1, 1, '#00000000').write('./new_files/hitcircleoverlay@2x.png', (err) => {
    if (err) console.log(err)
  })
  gm(1, 1, '#00000000').write('./new_files/hitcircle@2x.png', (err) => {
    if (err) console.log(err)
  })
}
