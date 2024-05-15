FROM python:3.8-slim

WORKDIR /code

COPY ./services /code/services
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

RUN apt-get update && apt-get install -y git && apt-get install -y libhdf5-dev
RUN apt update \
    && apt install -y libmariadb-dev \
        gcc \
        python3-dev \
        libcogl-pango-dev \
        libcairo2-dev \
        libtool \
        linux-headers-generic \
        musl-dev \
        libffi-dev \
        libssl-dev \
        libjpeg-dev \
        zlib1g-dev

WORKDIR /code/services/
RUN git clone https://github.com/quanvparadium/LAVIS.git

WORKDIR /code/services/LAVIS

RUN apk add gcc musl-dev linux-headers python3-dev 
RUN apk add libffi-dev

RUN pip install --no-binary h5py h5py
RUN pip install -e .

WORKDIR /code/services/app

RUN pip install -r requirements.txt
EXPOSE 4001
CMD ["python", "-u", "app.py"]