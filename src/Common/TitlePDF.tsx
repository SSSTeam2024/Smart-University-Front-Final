// import {  Text, View } from "@react-pdf/renderer";

// import { TemplateBody } from "features/templateBody/templateBodySlice";

// interface ChildProps {
//     piece_demande: TemplateBody;
// }
// const TitlePDF: React.FC<ChildProps> = ({piece_demande}) => {
//   return (
//     <View style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
      
//       <View style={{ flex: 1, alignItems: "center" }}>
//         <Text style={{
//             fontWeight: "bold",
//             fontSize: 20
//         }}
//         > {piece_demande?.title!}
//         </Text>
//       </View>
     
//     </View>
//   );
// };

// export default TitlePDF;
import { TemplateBody } from "features/templateBody/templateBodySlice";
import React from "react";

interface ChildProps {
    piece_demande: TemplateBody;
}

const TitlePDF: React.FC<ChildProps> = ({ piece_demande }) => {
    return (
        <div>
            <h2 style={{ fontWeight: "bold", fontSize: "20px", textAlign: "center" }}>
                {piece_demande?.title || "Default Title"}
            </h2>
        </div>
    );
};

// Helper function to get the text from the component for jsPDF
export const getTitleText = (piece_demande: TemplateBody): string => {
    return piece_demande?.title || "Default Title";
};

export default TitlePDF;