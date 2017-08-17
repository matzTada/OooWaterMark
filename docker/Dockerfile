#normal
#FROM node
#for raspberry pi
FROM hypriot/rpi-node
MAINTAINER matzTada
RUN ["git", "clone", "https://github.com/matzTada/OooWaterMark"]
WORKDIR /OooWaterMark/WaterMarkGUI
ENV JSON_FILE_DIR /jsons
PREV_FILE_NAME=output_prev.json
AFTER_FILE_NAME=output.json
ENV PORT 3333
