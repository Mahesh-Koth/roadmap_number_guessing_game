import figlet from "figlet";
import inquirer from "inquirer";
import { pastel } from "gradient-string";
import chalk from "chalk";

let userName;
let count = 0;

const greet = async (showMessage = true) => {
  if (showMessage) {
    figlet("Welcome To NumGuess", function (err, data) {
      console.log(pastel.multiline(data));
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    const { name } = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "What's your name?",
      default: "Mahesh Kothamasu",
    });

    console.log(chalk.greenBright.bgGreen(`Hey there, ${name}`));
  }

  const level = await inquirer.prompt({
    type: "list",
    name: "level",
    message: "Choose the level of difficulty",
    choices: ["Easy", "Medium", "Hard"],
  });

  switch (level.level) {
    case "Easy":
      count = 10;
      console.log(
        `Great!, You have chosen ${chalk.greenBright.bgGreen(`${level.level}`)} level. You get ${chalk.greenBright.bgGreen(`10`)} chances to guess the number.`,
      );
      break;
    case "Medium":
      count = 5;
      console.log(
        `Great!, You have chosen ${chalk.yellowBright.bgYellow(`${level.level}`)} level. You get ${chalk.yellowBright.bgYellow(`5`)} chances to guess the number.`,
      );
      break;
    case "Hard":
      count = 3;
      console.log(
        `Great!, You have chosen ${chalk.redBright.bgRed(`${level.level}`)} level. You get ${chalk.redBright.bgRed(`3`)} chances to guess the number.`,
      );
      break;
    default:
      console.log(
        `Sorry!, You have chosen ${chalk.blueBright.bgBlue("Invalid choice")}`,
      );
      break;
  }

  if (
    level.level === "Easy" ||
    level.level === "Medium" ||
    level.level === "Hard"
  ) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    console.log(randomNumber);
    const originalCount = count;
    let timeTaken = "Time taken to guess the number:";
    console.time(timeTaken);
    const guessNumber = async () => {
      const { number } = await inquirer.prompt({
        type: "number",
        name: "number",
        message: "Guess the number",
      });

      if (number === randomNumber) {
        console.log(
          chalk.greenBright.bgGreen(
            `Congrats! You have guessed the number correctly in ${originalCount - count + 1} attempts`,
          ),
        );
        console.timeEnd(timeTaken);

        const playAgain = await inquirer.prompt({
          type: "confirm",
          name: "playAgain",
          message: "Do you want to play again?",
        });

        if (playAgain.playAgain) {
          greet(false);
        }
      } else {
        count--;
        if (count === 0) {
          console.log(
            chalk.redBright.bgRed(
              `Sorry! You have exhausted all your chances. The number is ${randomNumber}`,
            ),
          );

          const playAgain = await inquirer.prompt({
            type: "confirm",
            name: "playAgain",
            message: "Do you want to play again?",
          });

          if (playAgain.playAgain) {
            greet(false);
          }
        } else {
          console.log(
            chalk.yellowBright.bgYellow(
              `Sorry! You have ${chalk.yellowBright.bgYellow(
                `${count}`,
              )} chances left`,
            ),
          );

          if (count / originalCount <= 0.5) {
            console.log(
              chalk.bgMagentaBright.bgMagenta(
                `Hint: The number is ${randomNumber > number ? "greater" : "lesser"} than ${number}`,
              ),
            );
          }
          guessNumber();
        }
      }
    };
    guessNumber();
  }
};

greet();
