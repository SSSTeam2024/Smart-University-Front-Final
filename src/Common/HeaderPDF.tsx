import React from "react";
import { Col, Image, Row } from "react-bootstrap";

interface HeaderPDFProps {
  logo_etablissement: string;
  logo_republique: string;
  logo_universite: string;
}

const HeaderPDF: React.FC<HeaderPDFProps> = ({
  logo_etablissement,
  logo_republique,
  logo_universite,
}) => {
  return (
    <Row className="text-center mb-3">
      <Col>
        <Image
          style={{
            width: 100,
          }}
          src={`${process.env.REACT_APP_API_URL}/files/variableGlobaleFiles/logoEtablissementFiles/${logo_etablissement}`}
        />
      </Col>
       <Col >
        <Image
          style={{
            width: 50,
          }}
          src={`${process.env.REACT_APP_API_URL}/files/variableGlobaleFiles/logoRepubliqueFiles/${logo_republique}`}
        />
      </Col>
      <Col>
        <Image
          style={{
            width: 100,
          }}
          src={`${process.env.REACT_APP_API_URL}/files/variableGlobaleFiles/logoUniversiteFiles/${logo_universite}`}
        />
      </Col> 
    </Row>
  );
};

export default HeaderPDF;

// import { jsPDF } from 'jspdf';

// interface HeaderPDFProps {
//   doc: jsPDF;
//   logo_etablissement: string;
//   logo_republique: string;
//   logo_universite: string;
// }

// // Helper function to fetch the image and convert it to a base64 format
// const fetchImage = async (url: string): Promise<string> => {
//   const response = await fetch(url);
//   const blob = await response.blob();

//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       resolve(reader.result as string);
//     };
//     reader.onerror = (error) => {
//       reject(error);
//     };
//     reader.readAsDataURL(blob);
//   });
// };

// // Function to create the header in the PDF using jsPDF
// const createPDFHeader = async ({
//   doc,
//   logo_etablissement,
//   logo_republique,
//   logo_universite,
// }: HeaderPDFProps) => {
//   const logoEtablissementImage = await fetchImage(
//     `${process.env.REACT_APP_API_URL}/files/variableGlobaleFiles/logoEtablissementFiles/${logo_etablissement[2]}`
//   );
//   const logoRepubliqueImage = await fetchImage(
//     `${process.env.REACT_APP_API_URL}/files/variableGlobaleFiles/logoRepubliqueFiles/${logo_republique[2]}`
//   );
//   const logoUniversiteImage = await fetchImage(
//     `${process.env.REACT_APP_API_URL}/files/variableGlobaleFiles/logoUniversiteFiles/${logo_universite[2]}`
//   );

//   const yPosition = 10; // The vertical position for the images

//   // Draw the images in the header
//   doc.addImage(logoEtablissementImage, 'JPEG', 10, yPosition, 40, 20);
//   doc.addImage(logoRepubliqueImage, 'JPEG', 85, yPosition, 30, 20);
//   doc.addImage(logoUniversiteImage, 'JPEG', 150, yPosition, 40, 20);
// };

// // Exporting createPDFHeader as a default export
// export default createPDFHeader;
