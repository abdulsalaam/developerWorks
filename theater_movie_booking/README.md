This is the readme file for the Business Network Definition created in Playground

Write a simple Movie ticket application using Hyperledger fabric, golang and node. Make assumptions on attributes for the various objects
•	Four (4) ticketing windows sell movie tickets at a theatre
•	People can buy one or more tickets
•	Once 100 tickets are sold for a movie, that movie-show  is full
•	The theatre runs 5 movies at any time, and each show 4 times a day
•	Once a ticket is purchased a buyer automatically gets a bottle of water and popcorn on Window-1
•	At the end of the purchase, a ticket and receipt  is printed and the purchase is recorded on the blockchain
•	The buyer can go and exchange the water for soda at the cafeteria. Window 1 must generate a random number. If that number is even, the buyer must be able to get the water exchanged for soda at the cafeteria. The cafeteria has only 200 sodas, so only the first 200 requesters can exchange. 
Exercise: Model such that the tickets, shows and sodas availability are managed by contracts on the blockchain. The movie theatre has 5 shows running at any time and each show has 100 seats. Model such that more than 1 movie theatre can be supported by the blockchain. The blockchain records show, theatres, the number of movie halls per theatre, shows running in each movie hall, cafeteria soda inventory. 
Note:  write a test suite to demonstrate above exercise



Solution:

Hyperledger composer playground tool
$ npm install composer-playground -g    | install playground tool globaly
$ npm composer-playground   | run playground at url http://localhost:8080  or https://composer-playground.mybluemix.net

import BNA file or create as empty sample

