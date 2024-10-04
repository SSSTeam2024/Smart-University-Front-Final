import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderTop: "1px solid #999",
    display: "flex",
    flexDirection: "row",
    fontSize: 10,
    marginTop: 32,
    paddingTop: 4,
  },
  left: {
    flex: 1,
  },
  right: {
    fontStyle: "italic",
  },
  pageNumber: {
    position: "absolute",

    fontSize: 12,
    textAlign: "center",
    color: "grey",
  },
});

interface ChildProps {
    address_fr: string;
    code: string;
    phone: string;
    fax: string;
    website: string
}

const FooterPDF: React.FC<ChildProps> = ({
    address_fr,
    code,
    phone,
    fax,
    website
}) => {
  return (
    <View
    style={{
      borderTopWidth: 1,
      borderTopColor: "#999",
      borderTopStyle: "solid",
      paddingTop: 5,
      paddingBottom: 5,
    }}
  >
    <View style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>{address_fr}, {code}</Text>
    </View>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>
        Tél:{" "}
        <Text style={{ fontSize: 9, fontWeight: "medium" }}>
          (+216) {phone} |
        </Text>
      </Text>
      <Text style={{ fontSize: 9, fontWeight: "bold", marginLeft: 5 }}>
        Fax:{" "}
        <Text style={{ fontSize: 9, fontWeight: "medium" }}>
          (+216) {fax} |
        </Text>
      </Text>
      <Text style={{ fontSize: 9, fontWeight: "medium", marginLeft: 5 }}>
        {website}
      </Text>
    </View>
  </View>
  );
}

export default FooterPDF;
