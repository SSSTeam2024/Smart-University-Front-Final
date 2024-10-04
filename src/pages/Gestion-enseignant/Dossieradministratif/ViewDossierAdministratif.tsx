import React, { useState, useMemo, useCallback } from "react";
import { Card, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import TableContainer from "Common/TableContainer";
import { Link, useLocation, useParams } from "react-router-dom";
import img1 from "assets/images/users/avatar-1.jpg";
import { DossierAdministratif, useFetchDossierAdministratifQuery } from "features/dossierAdministratif/dossierAdministratif";
import Swal from "sweetalert2";

const ViewDossierAdministratif = () => {
  document.title = "Demande Etudiant | Smart Institute";
  const [modal_AddUserModals, setmodal_AddUserModals] =
    useState<boolean>(false);
  const [isMultiDeleteButton, setIsMultiDeleteButton] =
    useState<boolean>(false);
  function tog_AddUserModals() {
    setmodal_AddUserModals(!modal_AddUserModals);
  }
  const location = useLocation();
  const dossierAdministratif = location.state;

  const { data: allDossiers = [] } = useFetchDossierAdministratifQuery();

  // Access the enseignant ID
  const enseignantId = dossierAdministratif?.enseignant?._id;

  console.log("Enseignant ID:", enseignantId);

  const filteredDossiers = allDossiers.filter((dossier) => {
    const currentEnseignantId = dossier.enseignant?._id;

    console.log("Comparing:", currentEnseignantId, "with", enseignantId);

    return String(currentEnseignantId).trim() === String(enseignantId).trim();
  });

  console.log("filteredDossiers", filteredDossiers);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkAll") as HTMLInputElement;
    const ele = document.querySelectorAll(".userCheckBox");

    if (checkall.checked) {
      ele.forEach((ele: any) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele: any) => {
        ele.checked = false;
      });
    }
    checkedbox();
  }, []);

  const checkedbox = () => {
    const ele = document.querySelectorAll(".userCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
  };


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });


  const data = useMemo(() => {
    return filteredDossiers.flatMap((dossier) =>
      dossier.papers.map((paper) => ({
        soustype: paper.papier_administratif.nom_fr,
        date: paper.annee,
        remarque: paper.remarques,
        file: paper.file,
      }))
    );
  }, [filteredDossiers]);

  
  // Columns definition
  const columns = useMemo(
    () => [
    
      {
        Header: "Papier administratif",
        accessor: "soustype",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Année",
        accessor: "date",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Remarques",
        accessor: "remarque",
        disableFilters: true,
        filterable: true,
      },
      //  {
      //   Header: 'Fichier',
      //   accessor: 'file',
      //   disableFilters: true,
      //   filterable: true,
      //   Cell: ({ cell: { value } }: any)=> (
      //     <a
      //     href={`http://localhost:5000/files/dossierFiles/${value}`}
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       <i
      //         className="bi bi-file-earmark-pdf"
      //         style={{ cursor: 'pointer', fontSize: '1.5em', marginLeft: '30px' }}
      //       ></i>
      //     </a>
      //   ),
      // },
      {
        Header: 'Fichier',
        accessor: 'file',
        disableFilters: true,
        Cell: ({ row }: any) => {
          const fileUrl = row.original.file;
          const fileLink = `http://localhost:5000/files/dossierFiles/${fileUrl}`;
          console.log(fileLink);
          return (
            <a
              href={`http://localhost:5000/files/dossierFiles/${fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className="bi bi-file-earmark-pdf"
                style={{ cursor: 'pointer', fontSize: '1.5em', marginLeft: '30px' }}
              ></i>
            </a>
          );
        },
      }
      ,
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (dossierAdministratif: DossierAdministratif) => {
          return (
            <ul className="hstack gap-2 list-unstyled mb-0">
           
              <li>
                <Link
                  to="#"
                  className="badge bg-danger-subtle text-danger remove-item-btn"
                >
                  <i
                    className="ph ph-trash"
                    style={{
                      transition: "transform 0.3s ease-in-out",
                      cursor: "pointer",
                      fontSize: "1.5em",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                   // onClick={() => AlertDelete(dossierAdministratif?._id!)}
                  ></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Tab.Container defaultActiveKey="Profil">
        <div className="d-flex align-items-center gap-3 mb-4">
          <Nav as="ul" className="nav nav-pills flex-grow-1 mb-0">
            <Nav.Item as="li">
              <Nav.Link eventKey="Profil">Profil</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <Tab.Content className="text-muted">
          <Tab.Pane eventKey="Profil">
            <Card>
              <Row className="g-0">
                <Col md={9}>
                  <Card.Header>
                    <div className="flex-grow-1 card-title mb-0">
                      <h5>
                        {filteredDossiers[0]?.enseignant?.nom_fr}{" "}
                        {filteredDossiers[0]?.enseignant?.prenom_fr}
                      </h5>
                      <p className="text-muted mb-0">
                        {" "}
                        {filteredDossiers[0]?.enseignant?.nom_ar}{" "}
                        {filteredDossiers[0]?.enseignant?.prenom_ar}
                      </p>
                    </div>
                  </Card.Header>
                </Col>
              </Row>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <Card>
        <Card.Body className="p-0">
          <table className="table align-middle table-nowrap" id="customerTable">
            <TableContainer
              columns={columns || []}
              data={data || []}
              // isGlobalFilter={false}
              iscustomPageSize={false}
              isBordered={false}
              customPageSize={5}
              className="custom-header-css table align-middle table-nowrap"
              tableClass="table-centered align-middle table-nowrap mb-0"
              theadClass="text-muted table-light"
              SearchPlaceholder="Search Products..."
            />
          </table>
          <div className="noresult" style={{ display: "none" }}>
            <div className="text-center">
              <h5 className="mt-2">Sorry! No Result Found</h5>
              <p className="text-muted mb-0">
                We've searched more than 150+ Orders We did not find any orders
                for you search.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default ViewDossierAdministratif;