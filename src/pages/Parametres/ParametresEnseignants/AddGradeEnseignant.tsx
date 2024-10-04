import React, {useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";
import { useAddGradePersonnelMutation } from "features/gradePersonnel/gradePersonnel";
import { useAddGradeEnseignantMutation } from "features/gradeEnseignant/gradeEnseignant";

const AddGradeEnseignant = () => {
  document.title = " Ajouter Grade Enseignant | Application Smart Institute";
  const navigate = useNavigate();

  function tog_retourParametres() {
    navigate("/parametre/grade-enseignants");
  }

  const [createGradeEnseignant] = useAddGradeEnseignantMutation();

  const [formData, setFormData] = useState({
    _id: "",
    value_grade_enseignant: "",
    grade_ar: "",
    grade_fr: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const errorAlert = (message: string) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const onSubmitGradeEnseignant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createGradeEnseignant(formData).unwrap();
      notify();
      navigate("/parametre/grade-enseignants");
    } catch (error: any) {
      if (error.status === 400) {
        errorAlert("La valeur doit être unique.");
      } else {
        errorAlert("La valeur doit être unique. Veuillez réessayer.");
      }
    }
  };

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Grade a été crée avec succés",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const error = (error: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Creation grade enseignant échoué ${error}`,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Form className="tablelist-form" onSubmit={onSubmitGradeEnseignant}>
                <div
                  id="alert-error-msg"
                  className="d-none alert alert-danger py-2"
                ></div>
                <input type="hidden" id="id-field" />
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="value_grade_enseignant">Valeur</Form.Label>
                      <Form.Control
                        type="text"
                        id="value_grade_enseignant"
                        placeholder=""
                        required
                        onChange={onChange}
                        value={formData.value_grade_enseignant}
                      />
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className="mb-3">
                      <Form.Label htmlFor="grade_fr">Grade Enseignant</Form.Label>
                      <Form.Control
                        type="text"
                        id="grade_fr"
                        placeholder=""
                        required
                        onChange={onChange}
                        value={formData.grade_fr}
                      />
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div
                      className="mb-3"
                      style={{
                        direction: "rtl",
                        textAlign: "right",
                      }}
                    >
                      <Form.Label htmlFor="grade_ar">رتبة الأستاذ</Form.Label>
                      <Form.Control
                        type="text"
                        id="grade_ar"
                        placeholder=""
                        required
                        onChange={onChange}
                        value={formData.grade_ar}
                      />
                    </div>
                  </Col>
                </Row>

                <div className="modal-footer">
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      className="btn-ghost-danger"
                      onClick={() => {
                        tog_retourParametres();
                      }}
                    >
                      Retour
                    </Button>
                    <Button variant="success" id="add-btn" type="submit">
                      Ajouter
                    </Button>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddGradeEnseignant;