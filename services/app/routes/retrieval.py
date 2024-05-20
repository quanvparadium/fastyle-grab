from fastapi import APIRouter
import numpy as np
from controllers.search import image_search_controller
from schemas.input import ImageSearch

retrievalRouter = APIRouter(prefix="/retrieval")

@retrievalRouter.post('/')
async def retrieval(input: ImageSearch):
    result = await image_search_controller(input)
    return {
        "result": result
    }