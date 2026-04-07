import OpenAI from "openai";
import { exec } from "child_process";
import { promisify } from "util";
import readline from "readline";

const execPromise = promisify(exec);

const client = new OpenAI({
    apiKey: "sk-975291da095d4c3f886989521e0e556f",
    baseURL: "https://api.deepseek.com"
});

const tools = [
    {
        type: "function",
        function: {
            name: "execute_bash",
            description: "执行一条bash命令，并返回命令的输出结果。支持任何合法的shell命令。",
            parameters: {
                type: "object",
                properties: {
                    command: {
                        type: "string",
                        description: "要执行的bash命令，例如：ls -la、pwd、echo 'hello'、cat file.txt",
                    }
                },
                required: ["command"],
                additionalProperties: false
            }
        }
    }
];

async function executeBash(command) {
    try {
        // 执行命令，超时设为30秒
        const { stdout, stderr } = await execPromise(command, { 
            timeout: 30000,
            shell: true,
            maxBuffer: 1024 * 1024  // 1MB 输出限制
        });
        
        if (stderr) {
            return `命令执行有错误输出:\n${stderr.trim()}`;
        }
        return stdout.trim() || "(命令执行成功，但没有输出)";
    } catch (error) {
        if (error.killed && error.signal === 'SIGTERM') {
            return "错误：命令执行超时（超过30秒）";
        }
        return `执行命令时发生异常: ${error.message}`;
    }
}

async function chatWithBash(userInput, messageHistory = []) {
    const messages = [
         {
            role: "system",
            content: "你是一个可以执行bash命令的助手。当需要查询系统信息、操作文件或执行任何shell命令时，请使用execute_bash工具。"
        },
        ...messageHistory,
        { role: "user", content: userInput }
    ];
    let answer = "";
    // ... 中间逻辑和上面一样 ...

    
    // 第一轮：调用API，可能返回工具调用请求
    const response = await client.chat.completions.create({
        model: "deepseek-chat",
        messages: messages,
        tools: tools,
        tool_choice: "auto"  // 让模型自动决定是否调用工具
    });
    
    const responseMessage = response.choices[0].message;

    console.log(`🤖 模型 第一轮回复: $`,JSON.stringify(responseMessage));
    messages.push(responseMessage);  // 将模型的回复加入历史
    
    // 检查模型是否需要调用工具
    if (responseMessage.tool_calls) {
        for (const toolCall of responseMessage.tool_calls) {
            if (toolCall.function.name === "execute_bash") {
                // 解析模型传来的参数
                const args = JSON.parse(toolCall.function.arguments);
                const command = args.command;
                console.log(`🤖 模型决定执行命令: ${command}`);
                
                // 执行真实的bash命令
                const result = await executeBash(command);
                console.log(`✅ 命令执行完成，返回结果: ${result}`);
                console.log(`✅ 命令执行完成，返回结果长度: ${result.length} 字符`);
                
                // 将执行结果作为tool消息返回给模型
                messages.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: result
                });
            }
        }
        
        // 第二轮：将工具执行结果发给模型，生成最终回复
        const finalResponse = await client.chat.completions.create({
            model: "deepseek-chat",
            messages: messages
        });
        answer = finalResponse.choices[0].message.content || "";
    } else {
        // 模型没有调用工具，直接返回
        answer = responseMessage.content || "";
    }
    
    return { answer, updatedHistory: messages };
}

// 创建交互式命令行界面
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let history = [];

async function startChat() {
    console.log("🤖 DeepSeek Bash 助手已启动（输入 exit 退出）\n");
    
    const askQuestion = () => {
        rl.question("你: ", async (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log("再见！");
                rl.close();
                return;
            }
            
            try {
                const { answer, updatedHistory } = await chatWithBash(input, history);
                history = updatedHistory;
                console.log(`助手: ${answer}\n`);
            } catch (error) {
                console.error(`错误: ${error.message}\n`);
            }
            
            askQuestion();
        });
    };
    
    askQuestion();
}

startChat();