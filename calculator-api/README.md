install all packages with pip

pip3 install uvicorn fastapi pydantic

run with uvicorn main:app --reload

in dev mode, the url is:

http://127.0.0.1:8000 with raw JSON of {"expression":"yourExpression"} as a BODY parameter
