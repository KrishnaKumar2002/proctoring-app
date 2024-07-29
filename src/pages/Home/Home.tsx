import { Alert, Col, Row } from "antd";
import { WebcamHolder } from "../../components/Webcam";
import { useState } from "react";
import { Face } from "tensorflow-models-face-landmarks-detection";
import { DetectedObject } from "@tensorflow-models/coco-ssd";


export const LiveViewLayout = () => {
	const [faces, setFaces] = useState<Face[]>([]);
	const [objects, setObjects] = useState<DetectedObject[]>([]);

	const OnFaceDetect = (faces: Face[]) => {
		setFaces(faces);
	};

	const OnObjectDetect = (objects: DetectedObject[]) => {
		objects = objects.filter(object => object.class !== "person");		
		setObjects(objects);
	};

	return (
		<>
		{faces.length < 0 ? <Alert message="No Face Detected!" type="error" showIcon /> : faces.length > 1 ? <Alert message="Many Face Detected!" type="error" showIcon /> : <Alert message="Face Detected" type="success" showIcon/> }
		{ objects.length < 1 ? <Alert message="No Object Detected!" type="success" showIcon /> : <Alert message="Object Detected" type="error" showIcon/> }
			<Row>
				<Col span={24} style={{ display: "flex", justifyContent: "center" }}>
					<WebcamHolder OnFaceDetect={OnFaceDetect} OnObjectDetect={OnObjectDetect}/>
				</Col>
			</Row>
		
		</>
	);
}

