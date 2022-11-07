from calculator import Calc
from pydantic import BaseModel, BaseSettings
from fastapi import FastAPI


app = FastAPI()

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
    
