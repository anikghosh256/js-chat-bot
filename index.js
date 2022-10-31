// require bot function from bot.js
const ChatBot = require('./bot').default;

// make a memory array that will be memory of the bot
const memory = [];

/**
 * Make terminal based application main function that will be called
 * when the application is started. This function will take a message and then print something and then it will call itself again for the next message.
 * @param {string} message - The message to print
 * @returns {undefined}
 */
async function main() {

  // require readline module
  const readline = require('readline');
  // get input using readline 
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  // ask for input
  await rl.question('you: ', (answer) => {
    
    // get the response from the bot function 
    const response = (new ChatBot("bot", memory)).getResponse(answer);
    
    // push question and answer to the memory
    memory.push({
      question: answer,
      answer: response
    })

    // print the response 
    console.log(`bot: ${response}`);
    // close the readline
    rl.close();

    // if message is not exit then call the main function again
    if (answer !== 'exit') 
      main();
  });

}

main();