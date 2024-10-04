import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";
import { useAddPapierAdministratifMutation } from "features/papierAdministratif/papierAdministratif";

export interface PapierAdministratif {
  _id?: string;
  nom_ar: string;
  nom_fr: string;
  category: string[];
}

const AddPapierAdministratif: React.FC = () => {
  document.title = "Ajouter Papier Administratif | Application Smart Institute";
  const navigate = useNavigate();

  function tog_retourParametres() {
    navigate("/listePapierAdministratif");
  }

  const [createPapierAdministratif] = useAddPapierAdministratifMutation();

  const [formData, setFormData] = useState<PapierAdministratif>({
    nom_ar: "",
    nom_fr: "",
    category: [],
  });

  const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
  
    setFormData(prevFormData => {
      const updatedCategories = checked
        ? [...prevFormData.category, value]
        : prevFormData.category.filter(category => category !== value);
  
      return {
        ...prevFormData,
        category: updatedCategories,
      };
    });
  };
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, 
    }));
  };
  

  // const addNewFileField = () => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     files_papier_administratif: [
  //       ...prevState.files_papier_administratif,
  //       { nom_ar: "", nom_fr: "", category: [] }, // Initialize category as an empty array for new file
  //     ],
  //   }));
  // };

  // const onFileChange = (e: any, index: any) => {
  //   const { name, value } = e.target;
  //   const updatedFiles = [...formData.files_papier_administratif];

  //   updatedFiles[index] = {
  //     ...updatedFiles[index],
  //     [name]: value
  //   };

  //   setFormData({
  //     ...formData,
  //     files_papier_administratif: updatedFiles
  //   });
  // };

  // const removeFileField = (index: number) => {
  //   setFormData((prevState) => {
  //     const updatedFiles = [...prevState.files_papier_administratif];
  //     updatedFiles.splice(index, 1);
  //     return {
  //       ...prevState,
  //       files_papier_administratif: updatedFiles,
  //     };
  //   });
  // };

  const errorAlert = (message: string) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const onSubmitEtatEtudiant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createPapierAdministratif(formData).unwrap();
      notify();
      navigate("/listePapierAdministratif");
    } catch (error: any) {
      console.log(error);
      errorAlert(error.message || "An error occurred.");
    }
  };

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Type inscription étudiant a été crée avec succés",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const error = (error: any) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Creation type inscription étudiant échoué ${error}`,
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
              <Form className="tablelist-form" onSubmit={onSubmitEtatEtudiant}>
                <div
                  id="alert-error-msg"
                  className="d-none alert alert-danger py-2"
                ></div>
                <input type="hidden" id="id-field" />
                {/* File Inputs */}
                <Row>
                  <Col lg={12}>
                    <div className="mb-3">
                      <Form.Label>Nom Papier</Form.Label>
                      <div className="border p-2 mb-3">
                        <div className="d-flex mb-2 align-items-center">
                          <Form.Control
                            type="text"
                            placeholder="Nom Fichier (Arabe)"
                            name="nom_ar"
                            required
                            value={formData.nom_ar}
                            onChange={onChange} 
                            className="me-2"
                          />
                          <Form.Control
                            type="text"
                            placeholder="Nom Fichier (Français)"
                            name="nom_fr"
                            required
                            value={formData.nom_fr}
                            onChange={onChange} 
                            className="me-2"
                          />
                          {/* <Button
                              variant="danger"
                              onClick={() => removeFileField(index)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </Button> */}
                        </div>
                        {/* Category Selection for each file */}
                        <Row className="mb-3">
                          <Col lg={12}>
                            <Form.Label>
                              Sélectionnez une ou plusieurs catégories
                            </Form.Label>
                            <Form.Check
                              type="checkbox"
                              label="Personnel"
                              value="personnel"
                              checked={formData.category.includes("personnel")}
                              onChange={onCategoryChange}
                              className="me-2"
                            />
                            <Form.Check
                              type="checkbox"
                              label="Enseignant"
                              value="enseignant"
                              checked={formData.category.includes("enseignant")}
                              onChange={onCategoryChange}
                              className="me-2"
                            />
                          </Col>
                        </Row>
                      </div>
                      {/* <Button variant="secondary" onClick={addNewFileField}>
                        Ajouter nom dossier
                      </Button> */}
                    </div>
                  </Col>
                </Row>

                {/* Submit and Footer */}
                <div className="modal-footer">
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      className="btn-ghost-danger"
                      onClick={() => tog_retourParametres()}
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

export default AddPapierAdministratif;