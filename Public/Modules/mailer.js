import nodemailer from 'nodemailer'
import handleBars from 'nodemailer-express-handlebars'
import path from 'path'
import mailConfig from '../Config/mail.json'

// This file is responsible for managing and setting up 
// nodemailer and handlebars

const transport = nodemailer.createTransport({

    host: mailConfig.host,
    port: mailConfig.port,
    auth: { 
        user: mailConfig.user, 
        pass: mailConfig.pass
    }

})

transport.use('compile', handleBars({

    viewEngine: 'handlebars',
    viewPath: path.resolve('./Public/Resources/Mail/'),
    extName: '.html'

}))

export default transport