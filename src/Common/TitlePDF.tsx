import {  Text, View } from "@react-pdf/renderer";

import { TemplateBody } from "features/templateBody/templateBodySlice";

interface ChildProps {
    piece_demande: TemplateBody;
}
const TitlePDF: React.FC<ChildProps> = ({piece_demande}) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
      
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{
            fontWeight: "bold",
            fontSize: 20
        }}
        > {piece_demande?.title!}
        </Text>
      </View>
     
    </View>
  );
};

export default TitlePDF;
