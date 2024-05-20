from pydantic import BaseModel, Field
from typing import List, Optional
class RecommendedInput(BaseModel):
    topwear: Optional[List[int]] = Field(default= None)
    headwear: Optional[List[int]] = Field(default= None)
    bottomwear: Optional[List[int]] = Field(default= None)
    footwear: Optional[List[int]] = Field(default= None)
    dress: Optional[List[int]] = Field(default= None)
    others: Optional[List[int]] = Field(default= None)
    