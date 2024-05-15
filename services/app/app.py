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

print("\033[96m>>> Preparing enviroment ...\033[0m")

from routes.default import defaultRouter as default_router
app.include_router(default_router)

from routes.apiRouter import apiRouter
app.include_router(apiRouter)


from routes.search import searchRouter as search_router
app.include_router(search_router, prefix='/search')
print("\033[96m>>> Prepare done!\033[0m")

if __name__ == '__main__': 
    import uvicorn

    # Load the image
    print("\033[93m>>> Running app ...\033[0m") 
    uvicorn.run(app, host=os.getenv('HOST'), port=int(os.getenv("PORT"))) 
    pass