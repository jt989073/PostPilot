FROM python:3.9-slim
WORKDIR /app
COPY Pipfile Pipfile.lock ./
RUN pip install pipenv && pipenv install --dev --system
COPY . .
CMD ["python", "run.py"]