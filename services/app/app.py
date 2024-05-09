import os
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
origins = [
    "http://localhost",
    f"http://localhost:{os.getenv('FRONTEND_PORT')}",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )

from routes.search import searchRouter as search_router
# app.include_router(item_router)
app.include_router(search_router, prefix='/search')

if __name__ == '__main__':   
    import uvicorn
    uvicorn.run(app, host=os.getenv('HOST'), port=int(os.getenv("PORT"))) 
    pass