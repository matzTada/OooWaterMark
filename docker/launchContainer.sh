#build docker image
sudo docker build --no-cache=true -t watermarkgui `pwd`

#run docker container
GUI_PORT=3330
# JSON_DIR="../config_jsons" #relative path allowed. change here for config json files
JSON_DIR="../WaterMarkGUI/public/jsons" #relative path allowed. change here for config json files
JSON_DIR=$(cd $(dirname $0) && cd $JSON_DIR && pwd) #convert to absolute path
sudo docker run -it -v $JSON_DIR:/jsons -p $GUI_PORT:3333 --rm watermarkgui /bin/bash ./start.sh

