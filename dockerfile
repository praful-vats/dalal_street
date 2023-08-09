# # Use an official Python runtime as the base image
# FROM python:3.11.4

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # Set the working directory in the container
# WORKDIR /app

# # Copy the requirements file into the container at /app
# COPY requirements.txt /app/

# # Install any needed packages specified in requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the application code into the container at /app
# COPY . /app/

# # Set environment variable to indicate production
# ENV DJANGO_SETTINGS_MODULE stock.settings

# # Build the React app
# RUN cd ticks && npm install && npm run build

# # Expose port 8000 for Gunicorn
# EXPOSE 8000

# # Run Gunicorn with the Django application
# CMD ["gunicorn", "stock.wsgi:application", "--bind", "0.0.0.0:8000"]

# Use an official Python runtime as the base image
# FROM python:3.9

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# # Set the working directory in the container
# WORKDIR /app

# # Install Node.js and npm
# RUN apt-get update && apt-get install -y nodejs npm

# # Copy the requirements file into the container at /app
# COPY requirements.txt /app/

# # Install any needed packages specified in requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the application code into the container at /app
# COPY . /app/

# # Set environment variable to indicate production
# ENV DJANGO_SETTINGS_MODULE stock.settings

# # Build the React app
# RUN cd ticks && npm install && npm run build

# # Expose port 8000 for Gunicorn
# EXPOSE 8000

# # Run Gunicorn with the Django application
# CMD ["gunicorn", "stock.wsgi:application", "--bind", "0.0.0.0:8000"]
# # CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]




FROM python:3.11.4-slim-bookworm

WORKDIR /ds
COPY . /dalal ./

RUN pip install --upgrade pip --no-cache-dir

RUN pip install -r /ds/requirements.txt --no-cache-dir

# CMD ["python3","manage.py","runserver","0.0.0.0:8000"]
CMD ["gunicorn","stock.wsgi:application","--bind", "0.0.0.0:8000"]