//importing all node packages
import http from 'http'
import nodemailer from 'nodemailer'
import readSync from 'readline-sync'
//initializing localhost url
let hostname = '127.0.0.1'
let port = 3030

//creating localhost function
function serverConnect(){
  const server = http.createServer(function(req, res) {
    res.statusCode = 200
    res.setHeader('setup', 'text-plain')
    res.end(res.innerHTML = 'test')
  })

  server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`)
  })
}
//creating mail function
function mailSend(youEmail, pass, recipient, subject, text){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: youEmail,
      pass: pass
    }
  })

  var mailOptions = {
    from: youEmail,
    to: recipient,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

//empty list for all the send dates
var dates = []

//initialize variables for send data and auth data.
var youEmail, pass, recipient, subject, text, datePrompt, recipientAsk

//recieve send and auth data
function queries(){
  youEmail = readSync.question('List your gmail address... ')
  pass = readSync.question('Please list your gmail password... ')
  recipientAsk = readSync.question('List all recipients... ')
  recipient = recipientAsk.split(', ')
  subject = readSync.question('Please input subject... ')
  text = readSync.question('Please input the text... ')
  datePrompt = readSync.question('List the date... ')
  //divide dates by double space and add
  var tmp = datePrompt.split('  ')
  dates.push(tmp)
  dates = dates[0]
} 

//collecting current date in mm/dd/yy hh:mm format
var result
function dateRefresh(){
  var dateAPI = new Date()
  let currYear = String(dateAPI.getFullYear())
  let currDay = String(dateAPI.getDay())
  let currHour = String(dateAPI.getHours())
  let currMinute = String(dateAPI.getMinutes())
  let currMonth = String(dateAPI.getMonth())
  result = currMonth + '/' + currDay + '/' + currYear + ' ' + currHour + ':' + currMinute
}

queries()
//Solution class to put everything toghether
class Solution {
  constructor(){}
  _sol_help(){
    dateRefresh()
    if (dates.includes(result)){
      mailSend(youEmail, pass, recipient, subject, text)
      dates.splice(dates.indexOf(result), 1)
      return 'done'
    }
  }
  sol(){
    const runner = setInterval(this._sol_help, 2500)
    if (dates.length == 0){
      clearInterval(runner)
    }
  }
} 

serverConnect()
new Solution().sol()