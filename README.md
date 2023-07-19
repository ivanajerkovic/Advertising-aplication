# advertising application
 final project for JavaScript course
 
Data base is created in db.json file so you need to watch it

Open two terminals (required)
Use commands: http-server -c-1
              json-seerver --watch db.json

Run http://localhost:8080

----------------------------------------------------------------------
Short directions for installing servers

Installation node server:
    Download software and install it: https://nodejs.org/en/download/
    Check if you have succesfully installed in terminal: npm -v

Installation http server:
    From terminal with command: 
    npm install -g http-server
    
Installation json server:
    From terminal with command:  
    npm install -g json-server

Running http server:
    In folder where the project is, from terminal with command: 
    http-server -c-1
    
    In web browser run localhost:8080

Running json server:
    In folder where the project is, from terminal with command:
    json-server --watch db.json

In case of an error, probably need to do this:
Open PowerShell as administrator (right click on PowerShell and Run as administrator) 
then type command: Set-ExecutionPolicy -ExecutionPolicy Unrestricted
on question: Do you want to change the execution policy? - type: y 

-------------------------------------------------------------------------------------
For more information please visit:
https://www.npmjs.com/package/json-server
https://www.npmjs.com/package/http-server
