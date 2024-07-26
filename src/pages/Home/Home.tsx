import { Alert, Col, Row } from "antd";
import { WebcamHolder } from "../../components/Webcam";
import { useState } from "react";
import { Face } from "tensorflow-models-face-landmarks-detection";
export const LiveViewLayout = () => {
	const [faces, setFaces] = useState<Face[]>([]);

	const OnFaceDetect = (faces: Face[]) => {
		setFaces(faces);
	};

	return (
		<>{faces.length < 0 ? <Alert message="No Face Detected!" type="error" showIcon /> : faces.length > 1 ? <Alert message="Many Face Detected!" type="error" showIcon /> : <Alert message="Face Detected" type="success" showIcon/> }
			<Row>
				<Col span={24} style={{ display: "flex", justifyContent: "center" }}>
					<WebcamHolder OnFaceDetect={OnFaceDetect} />
				</Col>
			</Row>
		</>
	);
}

