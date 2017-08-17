#normal
FROM node
#for raspberry pi
#FROM hypriot/rpi-node
MAINTAINER matzTada
RUN ["git", "clone", "https://github.com/matzTada/OooWaterMark"]
WORKDIR /OooWaterMark/WaterMarkGUI
ENV PREV_JSON_FILE_DIR /json_prev
ENV PREV_FILE_NAME output_prev.json
ENV AFTER_JSON_FILE_DIR /json_after
ENV AFTER_FILE_NAME output.json
ENV PORT 3333
