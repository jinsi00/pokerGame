# pokerGame
1. Run to download winner.txt: $  node main.js
2. The result file is in the result folder
3. The game file read by this project is LJ-poker.txt in the current directory
4. First test item: need to initialize first: $ npm install
5. Test project run: $ npm test

> Provided:

There are 52 cards in a deck and 2 players - Leon & Judy
Each player will take a hand of 5 cards from the same deck
A number is assigned for each rank (table 1)

|A	|2	|3	|4	|5	|6	|7	|8	|9	|10	|J	|Q	|K	|
|--	|--	|--	|--	|--	|--	|--	|--	|--	|--	|--	|--	|--	|
|1	|2	|3	|4	|5	|6	|7	|8	|9	|10	|10	|10	|10	|

- The score of a hand is calculated with the steps below
1. Identify 3 cards in 5 whose sum is divisible by 10
2. If such 3-cards group can be identified, the score of 5-cards group is the sum of 2 rest cards if the sum is not greater than 10, or else it is the sum minus 10.
3. If such 3-cards group can not be identified, the score is 0
4. e.g score(J, Q, K, 5, 8) = 3, score(2, Q, K, 5, 3) = 10, score(A, 2, 3, 4, A) = 0, score(5, 6, 10, 9, 3) = 3
- If Leon's score is higher than Judy's then Leon beats Judy and vice visa
- If Leon's score equals Judy's then their highest rank will be compared in ascending order described in table 1 above. Therefore, hand (J, Q, K, 5, 8) beats (5, 6, 10, 9, 3)
- If the scores and the highest ranks of two hands both equal then the suits of cards with the highest rank will be compared in order spade(S) > heart(H) > club(C) > diamond(D). Therefore, "H9S7CAC2D7" (heart 9, spade 7, club A, club 2 and diamond 7) beats "D9D5C6S5DA".
- I made a record for every game they played that day in format '<Leon's hand>;<Judy's hand>' (e.g "H9S7CAC2D7;D9D5C6S5DA"). But they played so many times that I was totally lost. Could you please help me find out who won more?

_Please write a program to generate two files - leon.txt for Leon's winning records and judy.txt for Judy's (the order of lines must be kept)._

_I tried my best to keep the correctness of my record but feel free to skip it if you find any game that doesn't make sense._
