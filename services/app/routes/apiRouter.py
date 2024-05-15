from fastapi import APIRouter
from routes.recommended import recommendedRouter

apiRouter = APIRouter(prefix="/api")

apiRouter.include_router(recommendedRouter)

@apiRouter.get('/')
def default():
    return { "message": "Default home" }