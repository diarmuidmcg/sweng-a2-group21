from calculator import Calc
from pydantic import BaseModel, BaseSettings
from fastapi import FastAPI


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# parameter for calculate post request
class CalcParameters(BaseModel):
    expression: str

# post request, takes CalcParameters as paramter
@app.post("/")
async def calculate(operation: CalcParameters):
    # print(operation.expression)
    
    try:
        c1 = Calc(operation.expression)
        return c1.output()
    except: 
        return "invalid parameters"
    
