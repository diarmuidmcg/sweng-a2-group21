from calculator import Calc

from fastapi import 


app = FastAPI()

class CalcParameters(BaseModel):
    expression: string

# sign in function that will pass take a username & password & send it to 
# LibreView
@app.post("/")
async def calculate(operation: CalcParameters):
    try:
        return Calc(operation)
    except: 
        return "invalid parameters"
    
