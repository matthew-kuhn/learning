const questions = [
  "What is your name",
  "What is your favorite color",
  "What is your quest"
]

const ask = (i=0) => {
  process.stdout.write(`\n\n${questions[i]}`)
  process.stdout.write(` >`)
}
ask()

const answers = [];

process.stdin.on('data', data=>{
  answers.push(data.toString().trim())
  if(answers.length < questions.length){
    ask(answers.length)
  } else{
    process.exit()
  }
})

process.on('exit', ()=>{
  
})
