# pull base image & creates the docker container.
FROM python:3.11.4

#sets and configures the working directory within the container to
WORKDIR /dalal_street

#set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /dalal_street
RUN pip install -r requirements.txt

#copy project
COPY . /dalal_street

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"] 