from fastapi import APIRouter

defaultRouter = APIRouter()

@defaultRouter.get('/')
def default():
    return { "message": "Default home" }