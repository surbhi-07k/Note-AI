import json
import time

from google import genai

from .config import (
    GEMINI_API_KEY,
    GEMINI_MODEL
)


client = genai.Client(
    api_key=GEMINI_API_KEY
)


def generate_notes(text: str):
    prompt = f"""
You are an expert AI study assistant.

Analyze the educational PDF text provided below and create
high-quality study notes for a college student.

Return ONLY valid JSON.

Use exactly this structure:

{{
    "summary": "A clear and concise summary of the complete document.",
    "key_points": [
        "Important point 1",
        "Important point 2",
        "Important point 3",
        "Important point 4",
        "Important point 5"
    ],
    "content": "1. Introduction\\nDetailed explanation...\\n\\n2. Main Concepts\\nDetailed explanation...\\n\\n3. Important Concepts\\nDetailed explanation...\\n\\n4. Exam Points\\nImportant points for revision..."
}}

IMPORTANT RULES:

1. Use ONLY information available in the document.
2. Do not invent facts.
3. Do not add information that is not present.
4. Write in simple student-friendly language.
5. Make the summary concise but meaningful.
6. Generate 5 to 10 important key points.
7. Create properly structured detailed notes.
8. Use numbered headings such as:
   1. Introduction
   2. Main Concepts
   3. Types / Components
   4. Advantages and Applications
   5. Important Concepts
   6. Exam Points

9. Explain important concepts clearly.
10. Use short paragraphs.
11. Use bullet points where useful.
12. Make the notes useful for exam preparation.
13. Preserve important technical terms from the document.
14. Do not write Markdown code fences.
15. Return valid JSON only.

DOCUMENT:

{text}
"""

    max_retries = 3

    for attempt in range(max_retries):

        try:

            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt
            )

            response_text = response.text.strip()

            # Remove Markdown code fences if Gemini adds them
            if response_text.startswith("```json"):
                response_text = (
                    response_text
                    .replace("```json", "", 1)
                    .replace("```", "")
                    .strip()
                )

            elif response_text.startswith("```"):
                response_text = (
                    response_text
                    .replace("```", "")
                    .strip()
                )

            result = json.loads(
                response_text
            )

            return result

        except Exception as error:

            print(
                f"Gemini attempt {attempt + 1} failed: {error}"
            )

            if attempt == max_retries - 1:
                raise

            wait_time = 2 ** attempt

            print(
                f"Retrying in {wait_time} seconds..."
            )

            time.sleep(wait_time)