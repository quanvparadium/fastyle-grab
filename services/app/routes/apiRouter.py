from fastapi import APIRouter
from routes.recommended import recommendedRouter
from routes.retrieval import retrievalRouter

apiRouter = APIRouter(prefix="/api")

apiRouter.include_router(recommendedRouter)
apiRouter.include_router(retrievalRouter)

@apiRouter.get('/')
def default():
    return { "message": "Default home" }