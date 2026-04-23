// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";
console.log('OpenAI=======,',OpenAI);

console.log("Deepseek API Key:", process.env.DEEPSEEK_API_KEY);

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY//process.env.DEEPSEEK_API_KEY,
});

async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "现在注册deepseek新用户还有优惠活动吗？" }],
//     model: "deepseek-chat",
//   });

// const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "我现在用的编辑工具是哪个？" }],
//     model: "deepseek-chat",
//   });

//   console.log(completion.choices[0].message.content);


// const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "我现在用的编辑工具是哪个？" }],
//     model: "deepseek-chat",
//     stream: true
//   });

const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "AI有关的最新新闻有什么，简述下就好？" }],
    model: "deepseek-chat",
    stream: true
  });

  // console.log(completion.choices[0].message.content);
//   console.log(completion);

   for await(let chunk of completion) {
      let content=chunk.choices[0].delta
     if (content) {
        process.stdout.write(chunk.choices[0].delta.content);
     }
   }

}

main();