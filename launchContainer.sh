#build docker image
sudo docker build --no-cache=true -t watermarkgui `pwd`

#run docker container
GUI_PORT=3002
# JSON_DIR="../config_jsons" #relative path allowed. change here for config json files
PREV_JSON_DIR="../../Detector_for_GCTC/output/before" #relative path allowed. change here for config json files
AFTER_JSON_DIR="../../Detector_for_GCTC/output/after" #relative path allowed. change here for config json files

PREV_JSON_DIR=$(cd $(dirname $0) && cd $PREV_JSON_DIR && pwd) #convert to absolute path
AFTER_JSON_DIR=$(cd $(dirname $0) && cd $AFTER_JSON_DIR && pwd) #convert to absolute path
sudo docker run -it -v $PREV_JSON_DIR:/json_prev -v $AFTER_JSON_DIR:/json_after -p $GUI_PORT:3333 --rm watermarkgui /bin/bash ./start.sh

