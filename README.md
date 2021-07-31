
===========Run scripts locally===========

Open the folder in VS code and in terminal

To run just UI tests type : gulp execute --config=local
To run all tests type :  gulp execute --config=local --runtests=** --runvisualtest=true
To run only visual tests type :  gulp execute --config=local --runtests=visual --runvisualtest=true
To run only accessibility tests type : gulp execute --config=local --runtests=accessibility

[comment]: <> (To run only Jobseeker UI tests type gulp execute --config=local --testfolder=temp --runtests=ui)

[comment]: <> (To run only Recruiter UI tests type gulp execute --config=local --testfolder=temp --runtests=ui)

===========Run scripts on browserstack/vsts pipeline===========

Open the folder in VS code and in terminal
To run just UI tests type : gulp execute
To run all tests type : gulp execute --runtests=** --runvisualtest=true
To run only visual tests type : gulp execute --runtests=visual --runvisualtest=true
To run only accessibility tests type : gulp execute --runtests=accessibility  
