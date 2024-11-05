"use strict";
/*
Author: Hang Ngo
Description: Q3-Battleship Game

Pseudocode:
1. READ the ship grid text file into a two-dimensional array named "shipMap"
2. CREATE a two-dimensional array named "targetingMap" for DISPLAYING target
3. INITIALIZE targetingMap with blank cells and indicate the index of row and column
4. SET the count for Missiles and hits
5. DISPLAY initial targetingMap
6. REPEAT until missiles count is zero OR hits count is equal or greater than 17
    6.1 PROMPT user for the input targeting value and TRY CATCH invalid value
    6.2 GET the index of Row and Column from user input value
    6.3 LOOP into the shipMap to check IF user makes a hit or a miss:
        6.3.1 IF value of shipMap at the Index of row and column is equal to 1 THEN update targetingMap with a hit value "X" AND increase hit count
        6.3.2 IF value of shipMap at the Index of row and column is equal to 0 THEN update targetingMap with a miss value "0"
    6.4 DECREASE missiles count
    6.5 DISPLAY the targetingMap and current missiles count
7. IF the hit counts is equal or greater than 17 THEN DISPLAY message "You Win!" and display the shipMap
8. IF the missile count is 0 and hit count is less than 17 THEN DISPLAY message "You lose!"
9. End program.

*/

//include the readline-sync library
const rs=require('readline-sync');
//include the fs library for reading file
const fs=require('fs');

//funtion to print the targeting map
function print2DArray(targetingMap)
{
    console.log ("   A B C D E F G H I J");
    for (let i=0; i<targetingMap.length; i++)//loop into targeting map
    {
        if (i<9){//if number is smaller than 9, THEN just need one space
        console.log(i+1 + "  "+ targetingMap[i].join(" "));}
        else//if number is 10, THEN just need to display two space
        {
        console.log(i+1 + " "+ targetingMap[i].join(" "));}
    }
}

// function checking user hit or miss
function checkingHitOrMiss(shipMap, targetRow, targetCol)
{
        if (shipMap[targetRow][targetCol]==1) // if shipMap at index [targetRow][targetCol] has value =1
        {
            return true; // return true
        }
        return false;// return false
}

//function to count the hits
function countHits(targetingMap)
{
    let countHit=0;// define a variable countHit
    for (let i=0; i<targetingMap.length; i++) //loop into targetingMap 2D
    {
        for (let j=0; j<targetingMap[i].length; j++) // loop into 1D inside 2D targetingMap
        {
            if (targetingMap[i][j]=="X") // if value at the index[i][j] is "X"
            {
                countHit++; // then count the hit
            }
        }
    }
    return countHit;//return value of countHit
}

function main()
{
    //input
    //Read the content of ship grid text file into 2D array name "shipMap"
    let originalText= fs.readFileSync("map.txt", 'utf-8');
    let lines= originalText.split('\r\n'); //create 1D array name "lines" by splitting the orignialtext
    //create 2D array "shipmap"
    let shipMap=[];
    for (let i=0; i<lines.length;i++)
    {
        shipMap.push(lines[i].split(","));
    }
    //console.log(shipMap[0][3]); // test 2D array


    //Create a blank map call "targetingMap"
    let targetingMap=[];
    for (let i=0; i<shipMap.length; i++) //loop into shipMap
    {
        targetingMap.push([]);//push a blank array
        for (let j=0;j<shipMap[i].length; j++)
        {
            
            targetingMap[i][j]=" "; // let every index in 2D array has value of blank " "
        }
    }
    //console.log(targetingMap);
    //user have 30 missiles and make 17 hits to entirely sank the ship
    let missiles=30;
    let hits=0;
    //process
    //get the user input value
    console.log("Let's play Battleship!");
    console.log("You have 30 missiles to fire to sink all five ships");

    //use while loop to repeat for user input target
    while ((missiles>0)&&(hits<17))// if the hits are smaller than 17 and missiles are greater than 0
    {
        print2DArray(targetingMap);
        //evaluate whether the chosen coordinate is a hit or a miss 
        let targetAttack= rs.question("Choose your target (Ex A1): ").toUpperCase();
        //check invalid input values: user allow to input from A-->J and 1-->9
        if((targetAttack.length==2) && (targetAttack[0].charCodeAt(0)>='A'.charCodeAt(0) && targetAttack[0].charCodeAt(0)<="J".charCodeAt(0) && targetAttack[1].charCodeAt(0)>='1'.charCodeAt(0) && targetAttack[1].charCodeAt(0)<='9'.charCodeAt(0)))
        {
            let targetRow=parseInt(targetAttack.substring(1))-1; // cut the alphabet (A, B, C...) and minus 1 to get the index --> NUMBER IS ROW
            let targetCol= targetAttack.charCodeAt(0)-'A'.charCodeAt(0); // get the letter and minus to A (65) to get the index --> LETTER IS COLUMN
            //create a function to check if use hit or miss the part of the ship
            if (checkingHitOrMiss(shipMap, targetRow, targetCol))// get the value return "true" from the function checkingHitOrMiss
            {
                console.log("HIT!!!!");
                hits++
                targetingMap[targetRow][targetCol]="X"; 
            
                // count the hits
                hits=countHits(targetingMap);
               
            }
            else // if return false
            {
                console.log("MISS");
                targetingMap[targetRow][targetCol]="0";
            }
            //update number of missiles remainingg
            missiles--;
            //print the remaining missiles count
            console.log(`You have ${missiles} missiles remaining`);
            // output
            //IF the user hits every individual location in the map that contains part of a ship before running out of missiles, they win the game
            //if user runs out of missiles before hitting every part of every ship, they lose the game
            //display inform " you win" or "you loose"
            if (hits>=17)
            {
                //check if the position has already hit
                console.log("YOU SANK MY ENTIRE FLEET!");
                console.log("You had 17 of 17 hits, which sank all the ship.");
                console.log("You won, congratulations!");
            }
            
            else if (missiles<=0)
            {//if hits <17
                console.log("\nGAME OVER.");
                console.log(`You had ${hits} of 17 hits, but you didn't sink all the ship. \nBetter luck next time.`);
            }
        }
        else
        { 
            // if user input letter is not A-->J and number is not from 1-->9
            console.log("Invalid value, please try again! (Ex A1, B2, C3,...)");
        }    
    }
}

// Do not change any of the code below!
if (require.main === module)
{
    main();
}
