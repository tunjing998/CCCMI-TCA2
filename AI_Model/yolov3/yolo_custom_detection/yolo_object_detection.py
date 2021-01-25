import glob
import random
import cv2
import numpy as np
import json


def main() -> object:
    font = cv2.FONT_HERSHEY_PLAIN
    net = cv2.dnn.readNet('yolov3.weights', 'yolov3.cfg')

    classes = load_class_names("classes.names")

    # Images path
    images_path = glob.glob(r"D:\College\Team\yolov3\boundary_boxes\\*.jpg")

    layer_names = net.getLayerNames()
    output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    colors = np.random.uniform(0, 255, size=(len(classes), 3))

    # Insert here the path of your images
    random.shuffle(images_path)
    # loop through all the images
    for img_path in images_path:
        # Loading image
        img = cv2.imread(img_path)
        img = cv2.resize(img, None, fx=0.4, fy=0.4)
        height, width, channels = img.shape

        # Detecting objects
        blob = cv2.dnn.blobFromImage(img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)

        net.setInput(blob)
        output_layers_names = net.getUnconnectedOutLayersNames()
        layerOutputs = net.forward(output_layers_names)

        boxes = []
        confidences = []
        class_ids = []
        class_arr = []
        confidence_arr = []
        end_confidence = []
        end_class = []

        for output in layerOutputs:
            for detection in output:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]

                if confidence > 0.5:
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)

                    x = int(center_x - w / 2)
                    y = int(center_y - h / 2)

                    boxes.append([x, y, w, h])
                    confidences.append((float(confidence)))
                    class_ids.append(class_id)
                    class_arr.append(classes[class_id])

        if check_for_duplicates(class_arr) > 1:

            end_class.append(class_arr[0])
            end_confidence.append(max(confidences))

            for i in confidences:
                confidence_arr.append(max(confidences))
        else:
            confidence_arr = confidences
            end_confidence = confidence_arr
            end_class = class_arr

        indexes = cv2.dnn.NMSBoxes(boxes, confidence_arr, 0.2, 0.4)

        font = cv2.FONT_HERSHEY_PLAIN
        for i in range(len(boxes)):
            if i in indexes:
                x, y, w, h = boxes[i]
                label = str(classes[class_ids[i]])+":"+str(confidences[i])
                color = colors[class_ids[i]]
                cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
                cv2.putText(img, label, (x, y + 30), font, 3, color, 2)

        cv2.imshow('Image', img)
        key = cv2.waitKey(1)

        if key == 27:
            break
        json_object = create_json(img_path, end_class, end_confidence)

        print(json_object)

    cv2.destroyAllWindows()


def create_json(image, class_label, confidence):
    python_object = {
        "image": image,
        "class_label": class_label,
        "confidence": confidence
    }

    json_object = json.dumps(python_object)

    return json_object


def load_class_names(names):
    # Create an empty list to hold the object classes
    class_names = []

    # Open the file containing the COCO object classes in read-only mode
    # The coco.names file contains only one object class per line.
    # Read the file line by line and save all the lines in a list.
    with open(names, 'r') as fp:
        lines = fp.readlines()

    # Get the object class names
    # Take the name in each line any remove any whitespaces
    # Append the object class name into class_names
    for name in lines:
        line = name.rstrip()
        class_names.append(line)
    return class_names


def check_for_duplicates(class_array):
    seen = 0
    for i in class_array:
        if class_array:
            item = class_array

            for x in class_array:
                if x not in item:
                    seen = 1
                else:
                    seen += 1

    return seen


if __name__ == "__main__":
    main()
