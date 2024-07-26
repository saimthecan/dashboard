import React from "react";
import { Col, Row } from "@themesberg/react-bootstrap";
import { AdminTables } from "./AdminTables";



const AdminOverview = () => {


 

  return (
    <>



      <Row>
        <Col xs={12} className="mb-4">
          <AdminTables />
        </Col>
      </Row>
    </>
  );
};

export default AdminOverview;
