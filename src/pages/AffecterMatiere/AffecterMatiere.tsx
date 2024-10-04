import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";

const AffecterMatiere = () => {
  document.title = "Affecter matiére avec groupe | Smart University";
  const [matieres, setMatieres] = useState([{ id: 1 }]);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  const handleRemoveItemClick = (idToRemove: any) => {
    setMatieres((prevMatiere: any) =>
      prevMatiere.filter((matiere: any) => matiere.id !== idToRemove)
    );
  };

  const handleAddItemClick = () => {
    setMatieres((prevMatiere) => [
      ...prevMatiere,
      { id: prevMatiere.length + 1 },
    ]);
  };

  const prevNavigate = () => {
    navigate("/gestion-classes/liste-classes");
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            title="Gestion des départements"
            pageTitle="Affecter matiére avec groupe"
          />

          <Row id="sellersList">
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Row className="g-3">
                    <Col lg={3}>
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Chercher..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    {/* <Col className="col-lg-auto">
                      <select
                        className="form-select"
                        id="idStatus"
                        name="choices-single-default"
                      >
                        <option defaultValue="All">Status</option>
                        <option value="All">tous</option>
                        <option value="Active">Activé</option>
                        <option value="Inactive">Desactivé</option>
                      </select>
                    </Col> */}

                    <Col className="col-lg-auto ms-auto">
                      <div className="hstack gap-3">
                        <Button
                          variant="info"
                          className="add-btn"
                          onClick={prevNavigate}
                        >
                          Retour
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body className="p-3">
                  <Row>
                    <Col lg={6} style={{ maxHeight: "calc(100vh - 150px)" }}>
                      {matieres.map((matiere) => (
                        <div key={matiere.id}>
                          <Row>
                            <Col lg={6}>
                              <div className="mb-3">
                                <label
                                  htmlFor="studentIdInput"
                                  className="form-label"
                                >
                                  Affecter des matières :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="studentIdInput"
                                  name="studentIdInput"
                                  required
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <button
                                type="button"
                                className="btn btn-danger btn-icon"
                                onClick={() =>
                                  handleRemoveItemClick(matiere.id)
                                }
                                style={{ marginTop: "27px" }}
                              >
                                <i className="ri-delete-bin-5-line"></i>
                              </button>
                            </Col>
                          </Row>
                        </div>
                      ))}

                      <Row className="align-items-center">
                        <Col>
                          <Link
                            to="#"
                            id="add-item"
                            className="btn btn-soft-secondary fw-medium"
                            onClick={handleAddItemClick}
                          >
                            <i className="ri-add-fill me-1 align-bottom"></i>
                          </Link>
                        </Col>
                        <Col style={{ marginRight: "210px" }}>
                          <Button variant="secondary" className="add-btn">
                            Ajouter
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={6}>
                      <div className="sticky-side-div mb-4">
                        <label htmlFor="studentIdInput" className="form-label">
                          Liste des matières liés avec groupe :{" "}
                          <span style={{ color: "#8B322C" }}>LISI1-G3</span>
                        </label>

                        <SimpleBar style={{ maxHeight: "calc(100vh - 150px)" }}>
                          <Row className="gy-4">
                            <Col lg={12}>
                              <Card style={{ height: "50px" }}>
                                <Card.Body style={{ padding: "10px" }}>
                                  <div className="d-flex justify-content-between">
                                    <h1 className="fs-18 mb-3">
                                      <span style={{ color: "#9B3922" }}>
                                        203
                                      </span>
                                      - Analyse 1 /
                                      <span style={{ color: "#2C7865" }}>
                                        TD
                                      </span>{" "}
                                      /{" "}
                                      <span style={{ color: "#627254" }}>
                                        S1{" "}
                                      </span>
                                    </h1>
                                    <Button
                                      type="button"
                                      className="btn btn-danger btn-icon btn-sm"
                                     
                                    >
                                      <i
                                        className="ri-delete-bin-5-line"
                                        
                                      ></i>
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={12}>
                              <Card style={{ height: "50px" }}>
                                <Card.Body style={{ padding: "10px" }}>
                                  <div className="d-flex justify-content-between">
                                    <h1 className="fs-18 mb-3">
                                      <span style={{ color: "#9B3922" }}>
                                        203
                                      </span>
                                      - Analyse 1 /
                                      <span style={{ color: "#2C7865" }}>
                                        TD
                                      </span>{" "}
                                      /{" "}
                                      <span style={{ color: "#627254" }}>
                                        S1{" "}
                                      </span>
                                    </h1>
                                    <Button
                                      type="button"
                                      className="btn btn-danger btn-icon btn-sm"
                                     
                                    >
                                      <i
                                        className="ri-delete-bin-5-line"
                                        
                                      ></i>
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={12}>
                              <Card style={{ height: "50px" }}>
                                <Card.Body style={{ padding: "10px" }}>
                                  <div className="d-flex justify-content-between">
                                    <h1 className="fs-18 mb-3">
                                      <span style={{ color: "#9B3922" }}>
                                        203
                                      </span>
                                      - Analyse 1 /
                                      <span style={{ color: "#2C7865" }}>
                                        TD
                                      </span>{" "}
                                      /{" "}
                                      <span style={{ color: "#627254" }}>
                                        S1{" "}
                                      </span>
                                    </h1>
                                    <Button
                                      type="button"
                                      className="btn btn-danger btn-icon btn-sm"
                                     
                                    >
                                      <i
                                        className="ri-delete-bin-5-line"
                                        
                                      ></i>
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={12}>
                              <Card style={{ height: "50px" }}>
                                <Card.Body style={{ padding: "10px" }}>
                                  <div className="d-flex justify-content-between">
                                    <h1 className="fs-18 mb-3">
                                      <span style={{ color: "#9B3922" }}>
                                        203
                                      </span>
                                      - Analyse 1 /
                                      <span style={{ color: "#2C7865" }}>
                                        TD
                                      </span>{" "}
                                      /{" "}
                                      <span style={{ color: "#627254" }}>
                                        S1{" "}
                                      </span>
                                    </h1>
                                    <Button
                                      type="button"
                                      className="btn btn-danger btn-icon btn-sm"
                                     
                                    >
                                      <i
                                        className="ri-delete-bin-5-line"
                                        
                                      ></i>
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={12}>
                              <Card style={{ height: "50px" }}>
                                <Card.Body style={{ padding: "10px" }}>
                                  <div className="d-flex justify-content-between">
                                    <h1 className="fs-18 mb-3">
                                      <span style={{ color: "#9B3922" }}>
                                        203
                                      </span>
                                      - Analyse 1 /
                                      <span style={{ color: "#2C7865" }}>
                                        TD
                                      </span>{" "}
                                      /{" "}
                                      <span style={{ color: "#627254" }}>
                                        S1{" "}
                                      </span>
                                    </h1>
                                    <Button
                                      type="button"
                                      className="btn btn-danger btn-icon btn-sm"
                                     
                                    >
                                      <i
                                        className="ri-delete-bin-5-line"
                                        
                                      ></i>
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={12}>
                              <Card style={{ height: "50px" }}>
                                <Card.Body style={{ padding: "10px" }}>
                                  <div className="d-flex justify-content-between">
                                    <h1 className="fs-18 mb-3">
                                      <span style={{ color: "#9B3922" }}>
                                        203
                                      </span>
                                      - Analyse 1 /
                                      <span style={{ color: "#2C7865" }}>
                                        TD
                                      </span>{" "}
                                      /{" "}
                                      <span style={{ color: "#627254" }}>
                                        S1{" "}
                                      </span>
                                    </h1>
                                    <Button
                                      type="button"
                                      className="btn btn-danger btn-icon btn-sm"
                                     
                                    >
                                      <i
                                        className="ri-delete-bin-5-line"
                                        
                                      ></i>
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col> <Col lg={12}>
                              <Card style={{ height: "50px" }}>
                                <Card.Body style={{ padding: "10px" }}>
                                  <div className="d-flex justify-content-between">
                                    <h1 className="fs-18 mb-3">
                                      <span style={{ color: "#9B3922" }}>
                                        203
                                      </span>
                                      - Analyse 1 /
                                      <span style={{ color: "#2C7865" }}>
                                        TD
                                      </span>{" "}
                                      /{" "}
                                      <span style={{ color: "#627254" }}>
                                        S1{" "}
                                      </span>
                                    </h1>
                                    <Button
                                      type="button"
                                      className="btn btn-danger btn-icon btn-sm"
                                     
                                    >
                                      <i
                                        className="ri-delete-bin-5-line"
                                        
                                      ></i>
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={12}>
                              <Card style={{ height: "50px" }}>
                                <Card.Body style={{ padding: "10px" }}>
                                  <div className="d-flex justify-content-between">
                                    <h1 className="fs-18 mb-3">
                                      <span style={{ color: "#9B3922" }}>
                                        203
                                      </span>
                                      - Analyse 1 /
                                      <span style={{ color: "#2C7865" }}>
                                        TD
                                      </span>{" "}
                                      /{" "}
                                      <span style={{ color: "#627254" }}>
                                        S1{" "}
                                      </span>
                                    </h1>
                                    <Button
                                      type="button"
                                      className="btn btn-danger btn-icon btn-sm"
                                     
                                    >
                                      <i
                                        className="ri-delete-bin-5-line"
                                        
                                      ></i>
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={12}>
                              <Card style={{ height: "50px" }}>
                                <Card.Body style={{ padding: "10px" }}>
                                  <div className="d-flex justify-content-between">
                                    <h1 className="fs-18 mb-3">
                                      <span style={{ color: "#9B3922" }}>
                                        203
                                      </span>
                                      - Analyse 1 /
                                      <span style={{ color: "#2C7865" }}>
                                        TD
                                      </span>{" "}
                                      /{" "}
                                      <span style={{ color: "#627254" }}>
                                        S1{" "}
                                      </span>
                                    </h1>
                                    <Button
                                      type="button"
                                      className="btn btn-danger btn-icon btn-sm"
                                     
                                    >
                                      <i
                                        className="ri-delete-bin-5-line"
                                        
                                      ></i>
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </SimpleBar>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AffecterMatiere;