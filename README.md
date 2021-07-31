
===========Run scripts locally===========

Open the folder in VS code and in terminal

To run just UI tests type : npm run execute:local

To run all tests type :  npm run execute:local -- --runtests='**'  {will run both ui and visual tests}

To run only visual tests type :  npm run execute:local -- --runvisualtest=true --runtests='visual' --webbrowser=firefox

To run only accessibility tests type : npm run execute --config=local --runtests=accessibility  {In progress}


[comment]: <> (To run a specific browser, pass --webbrowser='firefox')

===========Run scripts on browserstack/vsts pipeline===========

Open the folder in VS code and in terminal
To run just UI tests type : npm run execute:browserstack

To run all tests type : npm run execute:browserstack --runtests=** --runvisualtest=true

To run only visual tests type : npm run executebrowserstack --runtests=visual --runvisualtest=true

  
