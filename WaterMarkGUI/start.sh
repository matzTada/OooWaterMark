if [ -z "${PORT+x}" ] ; then #if PORT is not defined, define.
echo "PORT was not defined before, define PORT"
export PORT=3333 #change here if you start express app without Docker
fi
echo "PORT: $PORT"

if [ -z "${JSON_FILE_DIR+x}" ] ; then #if JSON_FILE_DIR is not defined, define.
echo "JSON_FILE_DIR was not defined before, define JSON_FILE_DIR"
export JSON_FILE_DIR="./public/jsons" #change here if you start express app without Docker
fi
echo "JSON_FILE_DIR: $JSON_FILE_DIR"

if [ -z "${PREV_FILE_NAME+x}" ] ; then #if PREV_FILE_NAME is not defined, define.
echo "PREV_FILE_NAME was not defined before, define PREV_FILE_NAME"
export PREV_FILE_NAME="output_prev.json" #change here if you start express app without Docker
fi
echo "PREV_FILE_NAME: $PREV_FILE_NAME"

if [ -z "${AFTER_FILE_NAME+x}" ] ; then #if AFTER_FILE_NAME is not defined, define.
echo "AFTER_FILE_NAME was not defined before, define AFTER_FILE_NAME"
export AFTER_FILE_NAME="output.json" #change here if you start express app without Docker
fi
echo "AFTER_FILE_NAME: $AFTER_FILE_NAME"

npm start
