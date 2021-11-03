const variables  = require("./variables");
const fs  = require("fs");



for (const key in variables) {

  if(key === "colors"){
    let colorsObj = variables[key]
    let buildDir = variables.out || "scss"
    let isDir = fs.existsSync(buildDir)   
    if(!isDir){
      fs.mkdirSync(buildDir)
    }
    let colorsScss =  ``
    for (const vKey in colorsObj) { 
      if(typeof colorsObj[vKey] === "string"){
        colorsScss += `$${vKey}: ${colorsObj[vKey]};` + '\n'
      } else{
        let variantColor = colorsObj[vKey]
        for (const variantColorKey in variantColor) {
          colorsScss += `$${vKey}-${variantColorKey}: ${variantColor[variantColorKey]}; \n`
        }
      }
    };

    fs.writeFile(`${buildDir}/${key}.scss`, colorsScss, (err, res)=>{
      if(!err) return console.info(`${buildDir + "/"+ key}.scss file created.`)
      console.error(err);
    })
  }
}


