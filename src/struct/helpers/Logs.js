import chalk from "chalk";

const getDate = () => {
    return new Date().toLocaleString()
}

export const error = (msg) => {
    console.log(
        chalk.red(`[${getDate()}] `) + msg
    )
}

export const info = (msg) => {
    console.log(
        chalk.blue(`[${getDate()}] `) + msg
    )
}