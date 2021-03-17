//importing all node packages
import nodemailer from 'nodemailer'
import readSync from 'readline-sync'
//initializing localhost url
const hostname = '127.0.0.1'
const port = 3030

//This function takes in your email credentials, who you want to send an email to, the subject, and the body / text
function mailSend(youEmail, pass, recipient, subject, text){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: youEmail,
      pass: pass
    }
  })

  let mailOptions = {
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
let dates = []

//initialize variables for send data and auth data.
let youEmail, pass, recipient, subject, text, datePrompt, recipientAsk

//This function asks the user to input their: email credentials, who they want to send an email to, the subject, and the body / text
//The data from all these inputs will then be used to run the mailSend() function
function queries(){
  youEmail = readSync.question('List your gmail address (example@gmail.com)... ')
  pass = readSync.question('Please list your gmail password... ', {hideEchoBack: true, mask: ' '})
  recipientAsk = readSync.question('List all recipients (use comma and space to seperate two addresses)... ')
  recipient = recipientAsk.split(', ')
  subject = readSync.question('Please input subject... ')
  text = readSync.question('Please input the text... ')
  datePrompt = readSync.question('List the date (use comma and space to seperate two dates)... ')
  //divide dates by double space and add
  let tmp = datePrompt.split(', ')
  // Adds the dates the user wants to send the mail at to the dates list
  dates.push(tmp)
  dates = dates[0]
} 

//This function returns the current date in mm/dd/yy hh:mm format
let result
function dateRefresh(){
  let today = new Date()
  let dd = String(today.getDate())
  let mm = String(today.getMonth() + 1)
  let yyyy = today.getFullYear()
  let hh = today.getHours()
  let minu = String(today.getMinutes())
  while (minu.length < 2){
    minu = '0' + minu
  }
  result = mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + minu

  console.log(result)
}

queries() // executes the queries() function that starts at line 42

//Solution class to put everything toghether
class Solution {
  constructor(){} // Empty unneeded constructor class
  // this _sol_help function will send the email at the right time
  _sol_help(){
    dateRefresh() // runs dateRefresh() function that starts at line 58 to get the currrent date in mm/dd/yy hh:mm format
    /* Only runs mailSend() function at line 9 that sends mail if the date the user wants the email to send (which is stored in the dates variable) 
    matches the current date */
    if (dates.includes(result)){
      mailSend(youEmail, pass, recipient, subject, text) // sends the mail using the data that the 
      dates.splice(dates.indexOf(result), 1) /*If the current date is that of when the user wants the email to send, remove the date from the list to avoid the same email             sending multiple times in the same minute and hour */
      return 'done'
    }
  }
  sol(){
    const runner = setInterval(this._sol_help, 2500) /* runs the _sol_help() function (which checks the time and sends the email if the time is righr) at line 75 every two           seconds */
    if (dates.length == 0){
      clearInterval(runner)
    }
  }
} 

//runs the sol() function at line 85
new Solution().sol()

