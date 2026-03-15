async function fetchCard(word, pinyin, pos, level) {
  const levelLabel = level === 7 ? "7-9 (Advanced Mastery)" : level;
  const posLabel = posEn(pos);
  return {
    meaning: "to love; to like; affection",
    sentence: "我喜欢学习中文。",
    sentencePinyin: "Wǒ xǐhuān xuéxí zhōngwén.",
    translation: "I like learning Chinese.",
    grammar: "This is a sample grammar explanation. The verb 喜欢 (xǐhuān) means 'to like' and can be followed by a noun or verb phrase."
  };
  
  /* Uncomment this block when you have an API key
  const API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!API_KEY) {
    return {
      meaning: "Sample meaning (API key missing)",
      sentence: "请设置API密钥。",
      sentencePinyin: "Qǐng shèzhì API mìyuè.",
      translation: "Please set up API key.",
      grammar: "Add REACT_APP_ANTHROPIC_API_KEY in Vercel environment variables."
    };
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `You are an expert Chinese language teacher. For the HSK ${levelLabel} word "${word}" (${pinyin}${posLabel ? ", " + posLabel : ""}), provide a JSON object with these exact keys:
- "meaning": concise English meaning (3–7 words)
- "sentence": one natural Chinese example sentence appropriate for HSK ${levelLabel}
- "sentencePinyin": full pinyin of that sentence
- "translation": English translation of the sentence
- "grammar": 2–4 sentences on grammar usage, patterns, or nuances

Return ONLY valid JSON. No markdown, no extra text.`
        }]
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const raw = data.content?.find(b => b.type === "text")?.text || "";
    return JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch (error) {
    console.error("API Error:", error);
    return {
      meaning: "Error loading data",
      sentence: "请稍后再试。",
      sentencePinyin: "Qǐng shāo hòu zài shì.",
      translation: "Please try again later.",
      grammar: "There was an error fetching the example. Check your API key and internet connection."
    };
  }
  */
}