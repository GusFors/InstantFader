const fs = require('fs')
const path = require('path')
const gm = require('gm')
console.log(__dirname)
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
})()

function upScale(filePaths, cb) {
  for (let i = 0; i < filePaths.length; i++) {
    gm(__dirname + `/${filePaths[i]}`).identify((err, data) => {
      let sizeData = data.size
      console.log(sizeData)

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
      //.composite('hitcircleoverlay@2x.pngresize.png')
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
