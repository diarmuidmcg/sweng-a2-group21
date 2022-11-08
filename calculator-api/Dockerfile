# 
FROM python:3.9

# 
WORKDIR /code

# 
COPY ./calculator-api/requirements.txt /code/calculator-api/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/calculator-api/requirements.txt

# 
COPY ./calculator-api/app /code/calculator-api/app

# 
CMD ["uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8080"]
