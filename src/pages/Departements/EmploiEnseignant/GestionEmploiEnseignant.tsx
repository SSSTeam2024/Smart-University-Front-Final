import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "flatpickr/dist/flatpickr.min.css";
import "./GestionEmploiEnseignant.css";

import { useFetchClasseByIdQuery } from "features/classe/classe";
import { useGetSeancesByIdTeacherAndSemestreQuery } from "features/seance/seance";

import CustomLoader from "Common/CustomLoader/CustomLoader";
import "jspdf-autotable";
import { skipToken } from "@reduxjs/toolkit/query/react";

const GestionEmploiEnseignant = () => {
  document.title = " Gestion emploi enseignant | Application Smart Institute";

  const [canAddSession, setCanAddSession] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setAlertMessage] = useState("");
  const location = useLocation();
  const { classe, semestre } = location.state || {};

  console.log("Location State:", location.state);

  // Fetch seances for the selected teacher and semester
  const { data: seances, isSuccess: sessionClassFetched } =
    useGetSeancesByIdTeacherAndSemestreQuery(
      classe?.enseignantId && semestre
        ? { enseignantId: classe.enseignantId, semestre }
        : skipToken
    );

  // Group seances by day
  const groupedSessions = seances?.reduce((acc: any, session: any) => {
    const day = session.jour; // Adjust field name if needed
    acc[day] = acc[day] || [];
    acc[day].push(session);
    return acc;
  }, {});

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const maxSessions = 5; // Adjust based on your timetable structure

  if (!classe || !semestre) return <div>Error: Missing data!</div>;

  //   const filteredSessions = allSessions.filter(
  //     (session) => session?.semestre! === classeDetails?.semestre!
  //   );

  const timeSlotsDynamic: any = [];
  for (let i = 16; i < 38; i++) {
    const startHour = String(Math.floor(i / 2)).padStart(2, "0");
    const startMinutes = i % 2 === 0 ? "00" : "30";
    const endHour = String(Math.floor((i + 1) / 2)).padStart(2, "0");
    const endMinutes = (i + 1) % 2 === 0 ? "00" : "30";
    timeSlotsDynamic.push(
      `${startHour}:${startMinutes}-${endHour}:${endMinutes}`
    );
  }

  const sortSessions = (sessions: any[]) => {
    sessions.sort((a, b) => {
      const timeA = a.heure_debut.split(":").map(Number);
      const timeB = b.heure_debut.split(":").map(Number);
      const hoursDifference = timeA[0] - timeB[0];
      const minutesDifference = timeA[1] - timeB[1];

      return hoursDifference !== 0 ? hoursDifference : minutesDifference;
    });

    return sessions;
  };

  const groupSessionsByDay = (sessions: any) => {
    const grouped: any = {};
    sessions.forEach((session: any) => {
      const {
        _id,
        jour,
        heure_debut,
        heure_fin,
        matiere,
        enseignant,
        salle,
        semestre,
        hasBreak,
        type_seance,
      } = session;
      if (!grouped[jour]) {
        grouped[jour] = [];
      }
      grouped[jour].push({
        _id,
        jour,
        semestre,
        type_seance,
        classe,
        heure_debut,
        heure_fin,
        matiere,
        enseignant,
        salle,
        hasBreak,
      });
    });

    if (grouped["Lundi"]) {
      grouped["Lundi"] = sortSessions(grouped["Lundi"]);
    }
    if (grouped["Mardi"]) {
      grouped["Mardi"] = sortSessions(grouped["Mardi"]);
    }
    if (grouped["Mercredi"]) {
      grouped["Mercredi"] = sortSessions(grouped["Mercredi"]);
    }
    if (grouped["Jeudi"]) {
      grouped["Jeudi"] = sortSessions(grouped["Jeudi"]);
    }
    if (grouped["Vendredi"]) {
      grouped["Vendredi"] = sortSessions(grouped["Vendredi"]);
    }
    if (grouped["Samedi"]) {
      grouped["Samedi"] = sortSessions(grouped["Samedi"]);
    }

    return grouped;
  };
  //const groupedSessions = groupSessionsByDay(filteredSessions);

  //   const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  //   const maxSessions = Math.max(
  //     ...days.map((day) =>
  //       groupedSessions[day] ? groupedSessions[day].length : 0
  //     )
  //   );

  //   let key = "";
  //   if (classeDetails?.semestre === "1") {
  //     key = "S1";
  //   } else {
  //     key = "S2";
  //   }

  //   let wishList: any[] = [];
  //   for (let element of allVoeux) {
  //     let consernedVoeux;
  //     if (key === element.semestre) {
  //       for (let v of element.fiche_voeux_classes) {
  //         if (classe?._id === v.classe?._id) {
  //           consernedVoeux = v;
  //           wishList.push({
  //             teacher: element.enseignant,
  //             voeux: consernedVoeux,
  //           });
  //           break;
  //         }
  //       }
  //     }
  //   }

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        {showAlert == true ? (
          <div
            className="alert alert-warning alert-dismissible alert-label-icon rounded-label fade show"
            role="alert"
          >
            <i className="ri-alert-line label-icon"></i>
            {showAlertMessage}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                closeAlert();
              }}
            ></button>
          </div>
        ) : (
          <></>
        )}

        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Form className="tablelist-form">
                <div
                  id="alert-error-msg"
                  className="d-none alert alert-danger py-2"
                ></div>
                <input type="hidden" id="id-field" />
                <Row className=" fw-bold titre-emploi">
                  {/* {classeDetails.etat !== "Cloturé" ? (
                    <div className="d-flex justify-content-between">
                      <>
                        {canAddSession === false ? (
                          <Button
                            variant="success"
                            onClick={() => tog_AddSeanceModals()}
                            className="add-btn"
                            disabled={showForm === true}
                          >
                            {showForm === true ? (
                              <CustomLoaderForButton></CustomLoaderForButton>
                            ) : (
                              <>
                                <i className="bi bi-plus-circle me-1 align-middle"></i>
                                Ajouter Séance
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            className="btn-danger"
                            onClick={() => {
                              closeAddSessionForm();
                            }}
                          >
                            <i className="ri-close-line align-bottom me-1"></i>{" "}
                            Fermer
                          </Button>
                        )}
                      </>
                      <>
                        <Link
                          to="/gestion-seances-classe"
                          state={classeDetails}
                        >
                          <Button
                            className="btn btn-soft-dark btn-border"
                            onClick={() => {}}
                          >
                            <i className="ri-edit-2-line align-bottom me-1"></i>{" "}
                            Gestion des séances
                          </Button>
                        </Link>
                      </>
                    </div>
                  ) : (
                    <></>
                  )} */}
                  <h2 className="text-center">
                    Emploi de Temps - {classe.nom_classe_fr} - Semestre{" "}
                    {semestre}
                  </h2>
                </Row>
                {canAddSession === false ? (
                  sessionClassFetched == true ? (
                    <Row>
                      <Col lg={12} className="d-flex align-items-center">
                        <div style={{ overflowX: "auto", width: "100%" }}>
                          <table className="table table-bordered table-striped w-100">
                            <tbody>
                              {days.map((day) => (
                                <tr key={day}>
                                  <td className="py-3 px-4 fw-bold text-center bg-light">
                                    {day.charAt(0).toUpperCase() + day.slice(1)}
                                  </td>
                                  {groupedSessions[day]?.length > 0 ? (
                                    <>
                                      {groupedSessions[day].map(
                                        (session: any, index: any) => (
                                          <td
                                            key={index}
                                            className="py-3 px-4 text-center"
                                          >
                                            <div className="fw-bold">
                                              {session.heure_debut} -{" "}
                                              {session.heure_fin}
                                            </div>
                                            <div>{session.matiere.matiere}</div>
                                            <div>{session.salle.salle}</div>
                                            <div>
                                              {session.enseignant.nom_fr}{" "}
                                              {session.enseignant.prenom_fr}
                                            </div>
                                          </td>
                                        )
                                      )}
                                      {[
                                        ...Array(
                                          maxSessions -
                                            groupedSessions[day].length
                                        ),
                                      ].map((_, idx) => (
                                        <td
                                          key={`empty-${idx}`}
                                          className="py-3 px-4 text-center"
                                        ></td>
                                      ))}
                                    </>
                                  ) : (
                                    <td
                                      colSpan={maxSessions}
                                      className="py-3 px-4 text-center"
                                    >
                                      <em className="text-muted">
                                        Pas de séances
                                      </em>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <CustomLoader
                      text={"Chargement d'Emploi En Cours ..."}
                    ></CustomLoader>
                  )
                ) : (
                  <Row>
                    {/* <Col lg={3} className="mt-5">
                      <Card>
                        <Card.Header className="d-flex align-items-center">
                          <h5 className="card-title mb-0 flex-grow-1">
                            Sélectionner Enseignant
                          </h5>
                          <div className="">
                            <select
                              className="form-select text-muted"
                              name="etat_compte"
                              id="etat_compte"
                              value={formData.enseignant.nom_ar}
                              onChange={handleChangeSelectedVoeuxEnseignant}
                            >
                              <option value="">Sélectionner Enseignant</option>
                              {averageTeachers?.map((element) => {
                                const annualMaxHE =
                                  element?.teacher?.grade?.charge_horaire
                                    ?.annualMaxHE || 0;

                                const dynamicStyle = getStyle(
                                  element?.hours!,
                                  element?.teacher?.grade?.charge_horaire!,
                                  classeDetails.semestre
                                );

                                return (
                                  <option
                                    key={element?.teacher?._id!}
                                    value={element?.teacher?._id!}
                                    className={dynamicStyle?.class!}
                                    style={{
                                      background: dynamicStyle?.bg!,
                                      color: dynamicStyle?.textColor!,
                                    }}
                                  >
                                    {`${element?.teacher?.prenom_fr!} ${element
                                      ?.teacher
                                      ?.nom_fr!}  ${element?.hours!}/${annualMaxHE}`}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <SimpleBar
                            data-simplebar
                            style={{ maxHeight: "440px" }}
                          >
                            <div className="w-100 d-flex justify-content-center fs-17">
                              Liste des voeux
                            </div>
                            <div className="acitivity-timeline acitivity-main">
                              <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0 acitivity-avatar"></div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0 lh-base">Matières</h6>
                                  {selectedVoeux?.map(
                                    (matiere: any, index: number) => (
                                      <p
                                        className="text-muted mb-0"
                                        key={index}
                                      >
                                        <strong>-</strong> {matiere.name}
                                      </p>
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="acitivity-item py-3 d-flex">
                                <div className="flex-shrink-0">
                                  <div className="acitivity-avatar"></div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-0 lh-base">Jours</h6>
                                  {selectedJourVoeux?.map(
                                    (jour: any, index: number) => (
                                      <p
                                        className="mb-2 text-muted"
                                        key={index}
                                      >
                                        {jour.jour} | {jour.temps}
                                      </p>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </SimpleBar>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={9} className="mt-5">
                      <Form className="tablelist-form">
                        <Row className="mb-3">
                          <h5
                            className="modal-title fs-18"
                            id="exampleModalLabel"
                          >
                            Ajouter Séance
                          </h5>
                        </Row>

                        <Row>
                          <Row>
                            <div
                              id="alert-error-msg"
                              className="d-none alert alert-danger py-2"
                            ></div>
                            <input type="hidden" id="id-field" />
                            <Col lg={4}>
                              <div className="mb-3">
                                <Form.Label htmlFor="matiere">
                                  Matière
                                </Form.Label>
                                <select
                                  className="form-select text-muted"
                                  name="matiere"
                                  id="matiere"
                                  value={formData?.matiere}
                                  onChange={handleChangeFiltredMatiere}
                                  onClick={(e) => {
                                    if (formData.enseignant.nom_fr === "") {
                                      showSelectionWarning(
                                        "Veuillez sélectionner un enseignant à partir du liste des voeux!"
                                      );
                                    }
                                  }}
                                >
                                  <option value="">Sélectionner Matière</option>
                                  {selectedVoeux?.map((mat: any) => (
                                    <option key={mat.id} value={mat.id}>
                                      {mat.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3 d-flex flex-column">
                                <Form.Label htmlFor="semestre">
                                  Type Séance
                                </Form.Label>
                                <div
                                  className="btn-group"
                                  role="group"
                                  aria-label="Basic radio toggle button group"
                                >
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name="btnradio"
                                    id="btnradio1"
                                    autoComplete="off"
                                    checked={formData.type_seance === "1"}
                                    onChange={() => {
                                      if (formData.matiere === "") {
                                        showSelectionWarning(
                                          "Veuillez sélectionner une matière d'abord!"
                                        );
                                      } else {
                                        setFormData({
                                          ...formData,
                                          type_seance: "1",
                                          jour: "",
                                        });
                                      }
                                    }}
                                  />
                                  <label
                                    className="btn btn-outline-secondary"
                                    htmlFor="btnradio1"
                                  >
                                    Ordinaire
                                  </label>

                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name="btnradio"
                                    id="btnradio2"
                                    autoComplete="off"
                                    checked={formData.type_seance === "1/15"}
                                    onChange={() => {
                                      if (formData.matiere === "") {
                                        showSelectionWarning(
                                          "Veuillez sélectionner une matière d'abord!"
                                        );
                                      } else {
                                        setFormData({
                                          ...formData,
                                          type_seance: "1/15",
                                          jour: "",
                                        });
                                      }
                                    }}
                                  />
                                  <label
                                    className="btn btn-outline-secondary"
                                    htmlFor="btnradio2"
                                  >
                                    Par quinzaine
                                  </label>
                                </div>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <Form.Label htmlFor="jour">Jour</Form.Label>
                                <select
                                  className="form-select"
                                  name="jour"
                                  id="jour"
                                  onChange={selectChangeJour}
                                  value={formData.jour}
                                  onClick={(e) => {
                                    if (formData.type_seance === "") {
                                      showSelectionWarning(
                                        "Veuillez sélectionner un type de séance d'abord!"
                                      );
                                    }
                                  }}
                                >
                                  <option value="">Sélectionner Jour</option>
                                  {formData.matiere !== "" ? (
                                    availableDays.map((day) => (
                                      <>
                                        {day.time === "" ? (
                                          <option
                                            value={day.day}
                                            style={{
                                              background: "#9B7EBD",
                                              color: "#fff",
                                            }}
                                          >
                                            {day.day}
                                          </option>
                                        ) : (
                                          <option
                                            value={day.day}
                                            style={{
                                              background: "#D4BEE4",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {day.day + " | " + day.time}
                                          </option>
                                        )}
                                      </>
                                    ))
                                  ) : (
                                    <></>
                                  )}
                                </select>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={8}>
                              {formData.jour != "" ? (
                                <TimeRange
                                  error={error}
                                  ticksNumber={132}
                                  selectedInterval={[
                                    selectedStart,
                                    selectedEnd,
                                  ]}
                                  timelineInterval={[startTime, endTime]}
                                  onUpdateCallback={errorHandler}
                                  onChangeCallback={onChangeCallback}
                                  disabledIntervals={disabledIntervals}
                                  step={5 * 60 * 1000}
                                  formatTick={(ms) =>
                                    new Date(ms).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  }
                                />
                              ) : (
                                <></>
                              )}
                            </Col>
                            <Col lg={2}>
                              <div className="mb-3">
                                <Form.Label htmlFor="heure_debut">
                                  Heure début
                                </Form.Label>
                                <Flatpickr
                                  className="form-control"
                                  id="heure_debut"
                                  placeholder="--:--"
                                  options={{
                                    enableTime: false,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    onOpen: (
                                      selectedDates,
                                      dateStr,
                                      instance
                                    ) => instance.close(),
                                    time_24hr: true,
                                  }}
                                  value={formData.heure_debut}
                                />
                              </div>
                            </Col>

                            <Col lg={2}>
                              <div className="mb-3">
                                <Form.Label htmlFor="heure_fin">
                                  Heure fin
                                </Form.Label>
                                <Flatpickr
                                  className="form-control"
                                  id="heure_fin"
                                  placeholder="--:--"
                                  readOnly={true}
                                  options={{
                                    enableTime: false,
                                    noCalendar: true,
                                    onOpen: (
                                      selectedDates,
                                      dateStr,
                                      instance
                                    ) => instance.close(),
                                    dateFormat: "H:i",
                                    time_24hr: true,
                                  }}
                                  value={formData.heure_fin}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="mt-5">
                            <Col lg={6}>
                              {disponibiliteSalles.length === 0 ? (
                                <div className="d-flex flex-column">
                                  <Button
                                    variant="secondary"
                                    onClick={handleFetchDisponibiliteSalles}
                                    disabled={formData.heure_fin === ""}
                                  >
                                    {roomsAvailabilityRequestStatus.isLoading ===
                                    true ? (
                                      <CustomLoaderForButton></CustomLoaderForButton>
                                    ) : (
                                      <>Salles disponibles?</>
                                    )}
                                  </Button>
                                </div>
                              ) : (
                                <div className="mb-3">
                                  {" "}
                                  <select
                                    className="form-select text-muted"
                                    name="etat_compte"
                                    id="etat_compte"
                                    value={formData?.salle}
                                    onChange={handleChangeSalle}
                                  >
                                    <option value="">Sélectionner Salle</option>
                                    {disponibiliteSalles.map(
                                      (salleDisponible) => (
                                        <option
                                          key={salleDisponible._id}
                                          value={salleDisponible._id}
                                        >
                                          {salleDisponible.salle}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              )}
                            </Col>
                            <Col lg={6}>
                              <div className="d-flex flex-column">
                                <Button
                                  variant="primary"
                                  id="add-btn"
                                  onClick={() => {
                                    onSubmitSeance();
                                  }}
                                  disabled={formData.salle === ""}
                                >
                                  {sessionCreationRequestStatus.isLoading ===
                                  true ? (
                                    <CustomLoaderForButton></CustomLoaderForButton>
                                  ) : (
                                    <>Ajouter Séance</>
                                  )}
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Row>
                      </Form>
                    </Col> */}
                  </Row>
                )}

                <div className="modal-footer"></div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GestionEmploiEnseignant;