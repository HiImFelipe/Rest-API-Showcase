import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This file is responsible for adding all our
// created controllers to our main index.js file
// automatically

export default app => {

    fs
        .readdirSync(__dirname)
        .filter(file  => ((file.indexOf('.') !== 0) && (file !== "index.js")))
        .forEach(async function(file){

            try{
                
                // Transforming the path provided by Node in a format
                // path.resolve() works with

                let originalPath = path.resolve(__dirname, file)
                originalPath.replaceAll('\\', '/')
                originalPath = 'file:///' + originalPath
                
                // Making usage of dynamic import since the
                // default import is static

                const module = await import(originalPath)
                module.default(app)


            }catch(err){

                console.log(err)

            }

        })

}