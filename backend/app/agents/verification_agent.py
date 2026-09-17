from typing import Any, Dict
from pydantic import BaseModel, Field

class VerificationResult(BaseModel):
    verdict: str = Field(description="One of: PASS, FAIL, NEEDS_REVIEW")
    confidence: float = Field(description="Confidence score between 0.0 and 1.0")
    reasons: list[str] = Field(description="Reasons for the verdict")
    suggestions: list[str] = Field(description="Suggestions for improvement if FAIL or NEEDS_REVIEW")

class VerificationAgent:
    def __init__(self, model: Any):
        self.model = model.with_structured_output(VerificationResult)

    def verify(self, task: dict, result: dict) -> dict:
        prompt = (
            f"You are a Verification Agent.\n"
            f"Task: {task}\n"
            f"Result: {result}\n"
            f"Check for output completeness, tool usage correctness, and data consistency.\n"
            f"Score the result as PASS, FAIL, or NEEDS_REVIEW."
        )
        
        response = self.model.invoke(prompt)
        
        return {
            "verdict": response.verdict,
            "confidence": response.confidence,
            "reasons": response.reasons,
            "suggestions": response.suggestions
        }
