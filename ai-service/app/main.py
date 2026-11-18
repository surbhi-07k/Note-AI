from fastapi import (
    FastAPI,
    HTTPException
)

from pydantic import BaseModel

from .ai_service import (
    generate_notes
)


app = FastAPI(
    title="AI Notes Generator Service",
    version="1.0.0"
)

class NotesRequest(BaseModel):
    text: str


@app.get("/")
def root():
    return {
        "success": True,
        "message": "AI Notes Generator AI Service is running"
    }


@app.get("/health")
def health():
    return {
        "success": True,
        "service": "ai-service",
        "status": "running"
    }


@app.post("/generate-notes")
def create_notes(
    request: NotesRequest
):
    if not request.text.strip():
        raise HTTPException(
            status_code=400,
            detail="Document text is required"
        )

    try:
        result = generate_notes(
            request.text
        )

        return {
            "success": True,
            "data": result
        }

    except Exception as error:
        print(
            f"AI generation error: {error}"
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to generate AI notes"
        )

