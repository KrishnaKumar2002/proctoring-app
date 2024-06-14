import { Col, Row, Typography } from "antd";
import React from "react";
import { WebcamHolder } from "../../components/Webcam";
import * as tf from "@tensorflow/tfjs";

function Home() {
	const tensorA = tf.tensor([
		[1, 2],
		[3, 4],
	]);
	const tensorB = tf.tensor([
		[5, 6],
		[7, 8],
	]);
	const result = tensorA.add(tensorB);
	return (
		<div>
			<Row>
				<Col span={24} style={{ textAlign: "center" }}>
					<Typography.Title level={2}>PROCTORING APP</Typography.Title>
				</Col>
			</Row>
			<Row>
				<Col span={24} style={{ display: "flex", justifyContent: "center" }}>
					<WebcamHolder />
				</Col>
			</Row>
			<Row>
				<Col span={24} style={{ display: "flex", justifyContent: "center" }}>
					<Row>
						<Col span={12} style={{ textAlign: "center" }}>
							<Typography.Title level={1}>Tensorflow.js</Typography.Title>
							<Typography.Text>Result : {result.toString()}</Typography.Text>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
}

export default Home;
