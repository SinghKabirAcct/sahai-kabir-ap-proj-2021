import os

runStatus = input("Is this you  first time running this code (y/n)? ")

if runStatus == 'y':    
    os.system("npm init -y")
    os.system("npm install http")
    os.system("npm install nodemailer")
    os.system("npm install readline-sync")
os.system("node app.mjs")