// import { useFetchShortCodeQuery } from "features/shortCode/shortCodeSlice";
// import { useAddNewTemplateBodyMutation } from "features/templateBody/templateBodySlice";
// import React, { useState } from "react";
// import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Swal from "sweetalert2";

// const NewTemplateBody = () => {
//   document.title = "Ajouter Corps du Modèle | Smart Institute";

//   const [newTemplateBody] = useAddNewTemplateBodyMutation();
//   const { data: shortCodeList = [] } = useFetchShortCodeQuery();
//   const navigate = useNavigate();

//   const initialTemplateBody = {
//     _id:"",
//     title: "",
//     body: "",
//     langue: "",
//     intended_for: "",
//   };

//   const [templateBody, setTemplateBody] = useState(initialTemplateBody);
//   const [editorInstance, setEditorInstance] = useState<any>(null); // Store the editor instance

//   const { title, body, langue, intended_for } = templateBody;

//   const [selectedLangue, setSelectedLangue] = useState("");
//   const [selectedIntendedFor, setSelectedIntendedFor] = useState("");

//   const globalShortCodes = shortCodeList.filter(
//     (code) => code.intended_for === "global"
//   );
//   const globalShortCodesAr = shortCodeList.filter(
//     (code) => code.intended_for === "global" && code.langue === "arabic"
//   );
//   const globalShortCodesFr = shortCodeList.filter(
//     (code) => code.intended_for === "global" && code.langue === "french"
//   );

//   const filteredShortCodeList = shortCodeList
//     .filter((code) => code.intended_for !== "global") // Exclude GLOBAL shortcodes
//     .filter(
//       (code) =>
//         (selectedLangue ? code.langue === selectedLangue : true) &&
//         (selectedIntendedFor ? code.intended_for === selectedIntendedFor : true)
//     );

//   // Combine GLOBAL(arabic or french) shortcodes with filtered shortcodes
//   let displayShortCodeList = [];
//   if (selectedLangue === "arabic") {
//     displayShortCodeList = [
//       ...globalShortCodesAr,
//       ...filteredShortCodeList.filter((code) => code.langue === "arabic"),
//     ];
//   } else if (selectedLangue === "french") {
//     displayShortCodeList = [
//       ...globalShortCodesFr,
//       ...filteredShortCodeList.filter((code) => code.langue === "french"),
//     ];
//   } else {
//     const globalShortCodes = shortCodeList.filter(
//       (code) => code.intended_for === "global"
//     );
//     displayShortCodeList = [...globalShortCodes, ...filteredShortCodeList];
//   }

//   const onChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setTemplateBody((prevState) => ({
//       ...prevState,
//       [e.target.id]: e.target.value,
//     }));
//   };

//   const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setTemplateBody((prevState) => ({
//       ...prevState,
//       langue: e.target.value,
//     }));
//     setSelectedLangue(e.target.value); // Update state for filtering
//   };

//   const onChangeIntendedFor = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setTemplateBody((prevState) => ({
//       ...prevState,
//       intended_for: e.target.value,
//     }));
//     setSelectedIntendedFor(e.target.value); // Update state for filtering
//   };

//   const onBodyChange = (event: any, editor: any) => {
//     const data = editor.getData();
//     setTemplateBody((prevState) => ({
//       ...prevState,
//       body: data,
//     }));
//   };

 
//   const onShortCodeButtonClick = (code: string) => {
//     setTemplateBody((prevState) => ({
//       ...prevState,
//       body: prevState.body + code,
//     }));
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     newTemplateBody(templateBody).then(() =>
//       setTemplateBody(initialTemplateBody)
//     );
//     notify();
//     navigate("/template/liste-template-body");
//   };

//   const notify = () => {
//     Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Template Body has been created successfully",
//       showConfirmButton: false,
//       timer: 2000,
//     });
//   };

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid={true}>
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <Card.Body>
//                   <Card.Header>
//                     <div className="d-flex">
//                       <div className="flex-shrink-0 me-3">
//                         <div className="avatar-sm">
//                           <div className="avatar-title rounded-circle bg-light text-primary fs-20">
//                             <i className="bi bi-person-lines-fill"></i>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex-grow-1">
//                         <h5 className="card-title">Nouveau Corps du Modèle</h5>
//                       </div>
//                     </div>
//                   </Card.Header>
//                   <Card.Body></Card.Body>
//                   <div className="mb-3">
//                     <Form onSubmit={onSubmit}>
//                       <Row>
//                         <Col lg={12}>
//                           <div className="mb-3">
//                             <Form.Label htmlFor="title">
//                               <h4 className="card-title mb-0">Titre</h4>
//                             </Form.Label>
//                             <Form.Control
//                               type="text"
//                               id="title"
//                               name="title"
//                               placeholder="Entrer titre"
//                               value={templateBody.title}
//                               onChange={onChange}
//                             />
//                           </div>
//                         </Col>
//                         <Col lg={4}>
//                           <div className="mb-3">
//                             <Form.Label htmlFor="langue">Langue</Form.Label>
//                             <select
//                               className="form-select text-muted"
//                               name="langue"
//                               id="langue"
//                               value={templateBody.langue}
//                               onChange={onChangeLanguage}
//                             >
//                               <option value="">Sélectionner Langue</option>
//                               <option value="arabic">Arabe</option>
//                               <option value="french">Français</option>
//                             </select>
//                           </div>
//                         </Col>
//                         <Col lg={4}>
//                           <div className="mb-3">
//                             <Form.Label htmlFor="intended_for">
//                               Destiné aux
//                             </Form.Label>
//                             <select
//                               className="form-select text-muted"
//                               name="intended_for"
//                               id="intended_for"
//                               value={templateBody.intended_for}
//                               onChange={onChangeIntendedFor}
//                             >
//                               <option value="">Sélectionner</option>
//                               <option value="enseignant">Enseignants</option>
//                               <option value="etudiant">Etudiants</option>
//                               <option value="personnel">Personnels</option>
//                             </select>
//                           </div>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col lg={12}>
//                           <div className="mb-3">
//                             {displayShortCodeList.map((code) => (
//                               <Button
//                                 className="m-2"
//                                 onClick={() =>
//                                   onShortCodeButtonClick(code.body)
//                                 }
//                                 key={code._id} 
//                               >
//                                 {code.titre}
//                               </Button>
//                             ))}
//                           </div>
//                         </Col>
//                       </Row>
                     
//                         <Row>
//                   <Col lg={12}>
//                     <Form.Label htmlFor="body" className="form-label">
//                       Corps
//                     </Form.Label>
//                     <CKEditor
//                       editor={ClassicEditor}
//                       data={templateBody.body}
//                       onChange={onBodyChange}
//                       config={{
//                         toolbar: [
//                           "heading",
//                           "|",
//                           "bold",
//                           "italic",
//                           "link",
//                           "bulletedList",
//                           "numberedList",
//                           "|",
//                           "undo",
//                           "redo",
//                         ],
//                         fontFamily: {
//                           options: ["default", "Times New Roman"],
//                         },
//                         fontSize: {
//                           options: [12, 14, 16],
//                           default: 12,
//                         },
//                         // Add restrictions to limit body length
//                         wordCount: {
//                           onUpdate: (stats: any) => {
//                             if (stats.characters > 1000) {
//                               alert("Character limit exceeded!");
//                             }
//                           },
//                         },
//                       }}
//                     />
//                   </Col>
//                 </Row>
//                       <Col lg={12}>
//                         <div className="hstack gap-2 justify-content-end">
//                           <Button variant="primary" id="add-btn" type="submit">
//                             Ajouter Corps
//                           </Button>
//                         </div>
//                       </Col>
//                     </Form>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default NewTemplateBody;
import { useFetchShortCodeQuery } from "features/shortCode/shortCodeSlice";
import { useAddNewTemplateBodyMutation } from "features/templateBody/templateBodySlice";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";

const NewTemplateBody = () => {
  document.title = "Ajouter Corps du Modèle | Smart Institute";

  const [newTemplateBody] = useAddNewTemplateBodyMutation();
  const { data: shortCodeList = [] } = useFetchShortCodeQuery();
  const navigate = useNavigate();

  const initialTemplateBody = {
    _id: "",
    title: "",
    body: "",
    langue: "",
    intended_for: "",
  };

  const [templateBody, setTemplateBody] = useState(initialTemplateBody);
  const [step, setStep] = useState(1); // Stepper state
  const [selectedLangue, setSelectedLangue] = useState("");
  const [selectedIntendedFor, setSelectedIntendedFor] = useState("");

  const { title, body, langue, intended_for } = templateBody;

 
  // Filter Global Shortcodes based on selected language
  const globalShortCodesAr = shortCodeList.filter(
    (code) => code.intended_for === "global" && code.langue === "arabic"
  );
  const globalShortCodesFr = shortCodeList.filter(
    (code) => code.intended_for === "global" && code.langue === "french"
  );

  // Filter non-global shortcodes based on selected language and intended for
  const filteredShortCodeList = shortCodeList
    .filter((code) => code.intended_for !== "global") // Exclude global shortcodes
    .filter(
      (code) =>
        (selectedLangue ? code.langue === selectedLangue : true) &&
        (selectedIntendedFor ? code.intended_for === selectedIntendedFor : true)
    );

  // Combine global shortcodes based on the selected language
  let displayShortCodeList = [];
  if (selectedLangue === "arabic") {
    displayShortCodeList = [
      ...globalShortCodesAr,
      ...filteredShortCodeList.filter((code) => code.langue === "arabic"),
    ];
  } else if (selectedLangue === "french") {
    displayShortCodeList = [
      ...globalShortCodesFr,
      ...filteredShortCodeList.filter((code) => code.langue === "french"),
    ];
  } else {
    displayShortCodeList = [
      ...globalShortCodesAr,
      ...globalShortCodesFr,
      ...filteredShortCodeList,
    ];
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTemplateBody((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemplateBody((prevState) => ({
      ...prevState,
      langue: e.target.value,
    }));
    setSelectedLangue(e.target.value);
  };

  const onChangeIntendedFor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemplateBody((prevState) => ({
      ...prevState,
      intended_for: e.target.value,
    }));
    setSelectedIntendedFor(e.target.value);
  };

  const onBodyChange = (event: any, editor: any) => {
    const data = editor.getData();
    setTemplateBody((prevState) => ({
      ...prevState,
      body: data,
    }));
  };

  // Handle Shortcode Insertion
  const onShortCodeButtonClick = (code: string) => {
    setTemplateBody((prevState) => ({
      ...prevState,
      body: prevState.body + code, // Append shortcode to body
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newTemplateBody(templateBody).then(() =>
      setTemplateBody(initialTemplateBody)
    );
    notify();
    navigate("/template/liste-template-body");
  };

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Template Body has been created successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  // const handlePrevious = () => setStep((prevStep) => prevStep - 1);

  const handlePrevious = () => {
    if (body.trim() !== "") {
      Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Tout le texte écrit dans le corps sera perdu si vous continuez !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, continuer",
        cancelButtonText: "Non, rester ici",
      }).then((result) => {
        if (result.isConfirmed) {
          setTemplateBody((prevState) => ({
            ...prevState,
            body: "", // Optionally clear the body
          }));
          setStep((prevStep) => prevStep - 1);
        }
      });
    } else {
      setStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-light text-primary fs-20">
                            <i className="bi bi-person-lines-fill"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title">Nouveau Corps du Modèle</h5>
                      </div>
                    </div>
                  </Card.Header>

                  <Card.Body></Card.Body>


<div className="mb-3">
                  <Form onSubmit={onSubmit}>
                    {step === 1 && (
                      <>
                        <Row>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="langue">Langue du document</Form.Label>
                              <select
                                className="form-select text-muted"
                                name="langue"
                                id="langue"
                                value={langue}
                                onChange={onChangeLanguage}
                              >
                                <option value="">Sélectionner Langue</option>
                                <option value="arabic">Arabe</option>
                                <option value="french">Français</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="mb-3">
                              <Form.Label htmlFor="intended_for">
                                Destiné aux
                              </Form.Label>
                              <select
                                className="form-select text-muted"
                                name="intended_for"
                                id="intended_for"
                                value={intended_for}
                                onChange={onChangeIntendedFor}
                              >
                                <option value="">Sélectionner</option>
                                <option value="enseignant">Enseignants</option>
                                <option value="etudiant">Étudiants</option>
                                <option value="personnel">Personnels</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                          <Button variant="primary" onClick={handleNext}>
                            Suivant
                          </Button>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <Row>
                          <Col lg={12}>
                            <div className="mb-3">
                              <Form.Label htmlFor="title">
                                <h4 className="card-title mb-0">Titre</h4>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Entrer titre"
                                value={title}
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={12}>
                            <Form.Label htmlFor="body" className="form-label">
                              Corps
                            </Form.Label>

                            {/* Shortcode Buttons */}
                            <div className="mb-3">
                              {displayShortCodeList.map((code, index) => (
                                <Button
                                  key={code._id}
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => onShortCodeButtonClick(code.body)}
                                  className="me-2 mb-2"
                                >
                                  {code.titre}
                                </Button>
                              ))}
                            </div>

                            {/* CKEditor with body */}
                            <CKEditor
                              editor={ClassicEditor}
                              data={body}
                              onChange={onBodyChange}
                              config={{
                                toolbar: [
                                  "heading",
                                  "|",
                                  "bold",
                                  "italic",
                                  "link",
                                  "bulletedList",
                                  "numberedList",
                                  "|",
                                  "undo",
                                  "redo",
                                ],
                                fontFamily: {
                                  options: ["default", "Times New Roman"],
                                },
                                fontSize: {
                                  options: [12, 14, 16],
                                  default: 12,
                                },
                              }}
                            />
                          </Col>
                        </Row>

                        <div className="d-flex justify-content-between">
                          <Button variant="secondary" onClick={handlePrevious}>
                            Précédent
                          </Button>
                          <Button variant="primary" type="submit">
                            Ajouter Corps
                          </Button>
                        </div>
                      </>
                    )}
                  </Form>
                  </div>
                
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NewTemplateBody;