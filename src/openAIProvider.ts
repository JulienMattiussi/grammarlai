const DEFAULT_PARAMS = {
  model: "gpt-3.5-turbo-0125",
  temperature: 0.5,
  max_tokens: 512,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

const OPEN_AI_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export const fetchOpenAI = async (message: string) => {
  const body = {
    ...DEFAULT_PARAMS,
    ...{
      messages: [
        {
          role: "system",
          content: "Correct the following text",
        },
        { role: "user", content: sanitizeText(message) },
      ],
    },
  };

  const requestOptions = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  };
  requestOptions.headers.set(
    "Authorization",
    `Bearer ${process.env.OPEN_AI_KEY}`
  );
  const response = await fetch(OPEN_AI_ENDPOINT, requestOptions);

  const result = await response.json();

  const correctedText = result.choices[0].message.content;

  console.log(correctedText);

  return correctedText;
};

export const sanitizeText = (text: string) => {
  return text.replace(/<[^>]*>?/gm, "");
};
