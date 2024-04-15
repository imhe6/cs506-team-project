FROM python:3.8

#Environmental Variables
ENV PYHTONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#Copy to and set working directory
COPY . /app
WORKDIR /app

#Install Backend Requirements
COPY backend_requirement.txt /app/
RUN pip install -r backend_requirement.txt
