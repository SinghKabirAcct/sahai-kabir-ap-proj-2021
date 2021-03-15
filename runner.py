import os
#Gets access to operating system commands

runStatus = input("Is this you  first time running this code (y/n)? ")
#If yes, all dependancies will be installed and then the JavaScript code will run. If no, the program will just run the JavaScript code without installing packages that have 
#already been installed and don't need to be installed again

if runStatus == 'y':    
    os.system("npm init -y") # creates mandatory files needed to store important data about this folder's programs
    os.system("npm install nodemailer") # installs package needed to send mail
    os.system("npm install readline-sync") # installs package needed to allow user to input date into the terminal
os.system("node app.mjs") # runs JavaScript code
