// Replace the fetchCard function with this version that handles API keys properly

async function fetchCard(word, pinyin, pos, level) {
  const levelLabel = level === 7 ? "7-9 (Advanced Mastery)" : level;
  const posLabel = posEn(pos);
  
  // You'll need to add your API key
  // For security, this should be in an environment variable
  const API_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY || "YOUR_API_KEY_HERE";
  
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229", // Updated model name
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
    // Return fallback data for demo purposes
    return {
      meaning: "Example meaning (API error - using fallback)",
      sentence: "我喜欢学习中文。",
      sentencePinyin: "Wǒ xǐhuān xuéxí zhōngwén.",
      translation: "I like learning Chinese.",
      grammar: "This is a sample grammar explanation. The actual API call failed, so this is placeholder text."
    };
  }
}