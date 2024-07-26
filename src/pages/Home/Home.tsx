import { Alert, Col, Row } from "antd";
import { WebcamHolder } from "../../components/Webcam";
import { useState } from "react";
import { Face } from "tensorflow-models-face-landmarks-detection";
export const Home = () => {
	const [faces, setFaces] = useState<Face[]>([]);
	const OnFaceDetect = (faces: Face[]) => {
		setFaces(faces);
	};

	return (
		<>	{faces.length != 1 && <Alert message="No Face detected" type="error" showIcon closable/>}
			<Row>
				<Col span={24} style={{ display: "flex", justifyContent: "center" }}>
					<WebcamHolder OnFaceDetect={OnFaceDetect} />
				</Col>
			</Row>
		</>
	);
}

