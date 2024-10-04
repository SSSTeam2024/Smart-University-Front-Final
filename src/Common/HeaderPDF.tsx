// import React, { useState } from "react";
// import { StyleSheet, View, Image } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   headerContainer: {
//     display: "flex",
//     flexDirection: "row",
//     marginBottom: 5,
//   },
//   logoContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   logo: {
//     width: 100,
//     height: 50, // Add height to maintain aspect ratio
//     objectFit: "contain", // Ensure the image is not distorted
//   },
// });


// interface HeaderPDFProps {
//   logoEtablissement: string;
//   logoRepublique: string;
//   logoUniversite: string;
// }

// const HeaderPDF: React.FC<HeaderPDFProps> = ({ logoEtablissement, logoRepublique, logoUniversite }) => {
//   const [base64, setBase64]= useState<string>("")
//   const [cleanBase64, setCleanBase64]= useState<string>("")
//   function toDataURL(url: any, callback: any) {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function() {
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       callback(reader.result);
//     }
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open('GET', url);
//   xhr.responseType = 'blob';
//   xhr.send();
// }

// toDataURL('http://localhost:5000/variableGlobaleFiles/logoRepubliqueFiles/20240801091038554_a1t20vo_logoRepublique.png', function(dataUrl: any) {
 
//   setCleanBase64(dataUrl.replace("data:text/html;base64,", ""))
//   setBase64(`data:image/png;base64,${cleanBase64}`)
//   console.log('RESULT:', base64)
// })

//   return (
//     <View style={styles.headerContainer}>
//       <View style={{ ...styles.logoContainer, alignItems: "flex-start" }}>
//         <Image
//           style={styles.logo}
//           src={base64}
//         />
//       </View>
//       <View style={{ flex: 1, alignItems: "center" }}>
//         <Image
//           style={styles.logo}
//           src={`http://localhost:5000/files/variableGlobaleFiles/logoRepubliqueFiles/${logoRepublique}`}
//         />
//       </View>
//       <View style={{ flex: 1, alignItems: "flex-end" }}>
//         <Image
//           style={styles.logo}
//           src={`http://localhost:5000/files/variableGlobaleFiles/logoUniversiteFiles/${logoUniversite}`}
//         />
//       </View>
//     </View>
//   );
// };

// export default HeaderPDF;
// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, Image } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   headerContainer: {
//     display: "flex",
//     flexDirection: "row",
//     marginBottom: 5,
//   },
//   logoContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   logo: {
//     width: 100,
//     height: 50,
//     objectFit: "contain",
//   },
// });

// interface HeaderPDFProps {
//   logoEtablissement: string;
//   logoRepublique: string;
//   logoUniversite: string;
// }

// const HeaderPDF: React.FC<HeaderPDFProps> = ({ logoEtablissement, logoRepublique, logoUniversite }) => {
//   const [base64Etablissement, setBase64Etablissement] = useState<string | null>(null);
//   const [base64Republique, setBase64Republique] = useState<string | null>(null);
//   const [base64Universite, setBase64Universite] = useState<string | null>(null);

//   useEffect(() => {
//     // Helper function to convert image URL to base64
//     const toDataURL = (url: string): Promise<string> => {
//       return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.onload = function () {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result as string);
//           reader.readAsDataURL(xhr.response);
//         };
//         xhr.onerror = () => reject(new Error("Image fetch error"));
//         xhr.open('GET', url);
//         xhr.responseType = 'blob';
//         xhr.send();
//       });
//     };

//     // Fetch the images and convert to base64
//     async function fetchLogos() {
//       try {
//         const [etablissementLogo, republiqueLogo, universiteLogo] = await Promise.all([
//           toDataURL(`http://localhost:5000/files/variableGlobaleFiles/logoEtablissementFiles/${logoEtablissement}`),
//           toDataURL(`http://localhost:5000/files/variableGlobaleFiles/logoRepubliqueFiles/${logoRepublique}`),
//           toDataURL(`http://localhost:5000/files/variableGlobaleFiles/logoUniversiteFiles/${logoUniversite}`),
//         ]);

//         setBase64Etablissement(etablissementLogo);
//         setBase64Republique(republiqueLogo);
//         setBase64Universite(universiteLogo);
//       } catch (error) {
//         console.error("Error fetching logos", error);
//       }
//     }

//     fetchLogos();
//   }, [logoEtablissement, logoRepublique, logoUniversite]);

//   // Render only when images are loaded
//   if (!base64Etablissement || !base64Republique || !base64Universite) {
//     return null; // You can return a loading spinner if needed
//   }

//   return (
//     <View style={styles.headerContainer}>
//       <View style={{ ...styles.logoContainer, alignItems: "flex-start" }}>
//         <Image style={styles.logo} src={base64Etablissement} />
//       </View>
//       <View style={{ flex: 1, alignItems: "center" }}>
//         <Image style={styles.logo} src={base64Republique} />
//       </View>
//       <View style={{ flex: 1, alignItems: "flex-end" }}>
//         <Image style={styles.logo} src={base64Universite} />
//       </View>
//     </View>
//   );
// };

// export default HeaderPDF;
import React from "react";
import { StyleSheet, View, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
    objectFit: "contain",
  },
});

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
    <View style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Image
          style={{
            width: 100,
          }}
          src={`http://localhost:5000/files/variableGlobaleFiles/logoEtablissementFiles/${logo_etablissement}`}
        />
      </View>
       <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          style={{
            width: 50,
          }}
          src={`http://localhost:5000/files/variableGlobaleFiles/logoRepubliqueFiles/${logo_republique}`}
        />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Image
          style={{
            width: 100,
          }}
          src={`http://localhost:5000/files/variableGlobaleFiles/logoUniversiteFiles/${logo_universite}`}
        />
      </View> 
    </View>
  );
};

export default HeaderPDF;
