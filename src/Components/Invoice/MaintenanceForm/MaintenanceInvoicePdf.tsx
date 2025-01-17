import React from "react";
import { Page, View, Text, Document, Font, Image } from "@react-pdf/renderer";
import { format } from "date-fns";
import { MaintenanceResponseValues } from "../../../types/maintenanceTypes";
import exampleImage from "../../../assets/images/whiteLogo-Ut7p0PIj.png";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf" },
    {
      src: "https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xIIzc.ttf",
      fontWeight: 700,
    },
  ],
});

const MaintenanceInvoicePdf = ({
  invoice,
}: {
  invoice: MaintenanceResponseValues;
}) => {
  const formatDate = (date: string) => format(new Date(date), "yyyy-MM-dd");

  return (
    <Document>
      <Page
        size="A4"
        style={{
          padding: 30,
          fontFamily: "Roboto",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Header Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image style={{ width: 60, height: 60 }} src={exampleImage} />
          <View style={{ fontSize: 10, textAlign: "left" }}>
            <Text>{invoice.companyDetails.name}</Text>
            <Text>{invoice.companyDetails.address}</Text>
            <Text>Phone: {invoice.companyDetails.phone}</Text>
            <Text>Date: {formatDate(invoice.createdAt ?? "")}</Text>
          </View>
          <View>
            <Text
              style={{
                backgroundColor: "#F3F4F6",
                padding: "5px 10px",
                borderRadius: 8,
                color: "#2563EB",
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              TECHNICAL SERVICES
            </Text>
            <Text>{invoice.taxInvoiceNumber}</Text>
          </View>
        </View>

        {/* Client Details */}
        <View
          style={{
            marginBottom: 15,
            fontSize: 10,
            lineHeight: 1.5,
          }}
        >
          <Text>Client Name: {invoice.ownerDetails.name}</Text>
          <Text>Month: {invoice.statementPeriod}</Text>
          <Text>Property: {invoice.property_id.title}</Text>
        </View>

        {/* Essential Works Table */}
        <View>
          <Text
            style={{
              padding: 8,
              fontSize: 12,
              fontWeight: "bold",
              backgroundColor: "#bb9e6ccc",
              color: "#FFFFFF",
            }}
          >
            Essential Works*
          </Text>
          <View
            style={{
              display: "flex",
              width: "100%",
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "#CBD5E0",
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#F3F4F6",
                fontWeight: 700,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#CBD5E0",
                  padding: 5,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Item / Service
              </Text>
              <Text
                style={{
                  flex: 1,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#CBD5E0",
                  padding: 5,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Quantity
              </Text>
              <Text
                style={{
                  flex: 1,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#CBD5E0",
                  padding: 5,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Price/Unit
              </Text>
              <Text
                style={{
                  flex: 1,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#CBD5E0",
                  padding: 5,
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                Price/Summary
              </Text>
            </View>
            {invoice.essentialWorks.map((work, index) => (
              <View style={{ flexDirection: "row" }} key={index}>
                <Text
                  style={{
                    flex: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#CBD5E0",
                    padding: 5,
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  {work.itemService}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#CBD5E0",
                    padding: 5,
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  {work.quantity}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#CBD5E0",
                    padding: 5,
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  {work.priceUnit}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#CBD5E0",
                    padding: 5,
                    fontSize: 10,
                    textAlign: "center",
                  }}
                >
                  {work.priceSummary}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals */}

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
              fontSize: 10,
            }}
          >
            <Text style={{ marginRight: 40 }}>Sub Total</Text>
            <Text>{invoice.subtotal?.toFixed(2)}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
              fontSize: 10,
            }}
          >
            <Text style={{ marginRight: 40 }}>Vat 5%</Text>
            <Text>{invoice.tax?.toFixed(2)}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
              fontSize: 10,
            }}
          >
            <Text style={{ marginRight: 40 }}>Total</Text>
            <Text>{invoice.totalMaintenceCost?.toFixed(2)}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
              fontSize: 10,
            }}
          >
            <Text style={{ marginRight: 40 }}>Received Amount</Text>
            <Text>{invoice.receivedAmount?.toFixed(2)}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
              fontSize: 10,
            }}
          >
            <Text style={{ marginRight: 40 }}>TOTAL AMOUNT OWED TO FP</Text>
            <Text>{invoice.amountOwedToFP?.toFixed(2)}</Text>
          </View>
        </View>

        {/* Bank Details */}
        <View
          style={{
            marginTop: 20,
            fontSize: 10,
            lineHeight: 1.5,
          }}
        >
          <Text>Bank Details</Text>
          <Text>Account Holder: {invoice.bank_details?.accountHolderName}</Text>
          <Text>Account Number: {invoice.bank_details?.accountNumber}</Text>
          <Text>Bank: {invoice.bank_details?.bankName}</Text>
          <Text>IBAN: {invoice.bank_details?.iban}</Text>
          <Text>SWIFT Code: {invoice.bank_details?.swiftCode}</Text>
        </View>

        {/* Essential Works Photos */}
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text style={{ marginBottom: 10 }}>Essential Works Photos (1/2)</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {invoice.essentialWorksImages?.map((photo, index) => (
              <View key={index} style={{ width: "45%" }}>
                <Image
                  style={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    marginBottom: 5,
                  }}
                  src={photo.url}
                />
                <Text style={{ fontSize: 8 }}>{photo.work_name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={{ marginTop: 30, fontSize: 10, lineHeight: 1.5 }}>
          <Text>Kind regards,</Text>
          <Text>{invoice.companyDetails.name}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MaintenanceInvoicePdf;

// import React from "react";
// import { Page, View, Text, Document, Font, Image } from "@react-pdf/renderer";
// import { format } from "date-fns";
// import { MaintenanceResponseValues } from "../../../types/maintenanceTypes";

// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf" },
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xIIzc.ttf",
//       fontWeight: 700,
//     },
//   ],
// });

// const MaintenanceInvoicePdf = ({
//   invoice,
// }: {
//   invoice: MaintenanceResponseValues;
// }) => {
//   const formatDate = (date: string) => format(new Date(date), "yyyy-MM-dd");

//   return (
//     <Document>
//       <Page
//         size="A4"
//         style={{
//           padding: 40,
//           fontFamily: "Roboto",
//           fontSize: 10,
//           lineHeight: 1.5,
//         }}
//       >
//         {/* Header Section */}
//         <View style={{ marginBottom: 30 }}>
//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ fontSize: 16, fontWeight: 700 }}>Logo</Text>
//           </View>

//           <View style={{ marginBottom: 20 }}>
//             <Text>{invoice.companyDetails.name}</Text>
//             <Text>P.O. Box {invoice.companyDetails.address}</Text>
//             <Text>Phone: {invoice.companyDetails.phone}</Text>
//             <Text>Date: {formatDate(invoice.createdAt ?? "")}</Text>
//           </View>

//           <View style={{ position: "absolute", top: 0, right: 0 }}>
//             <Text style={{ marginBottom: 10 }}>TECHNICAL SERVICES</Text>
//             <Text>{invoice.taxInvoiceNumber}</Text>
//           </View>
//         </View>

//         {/* Client Details */}
//         <View style={{ marginBottom: 20 }}>
//           <Text>Client Name: {invoice.ownerDetails.name}</Text>
//           <Text>Month: {invoice.statementPeriod}</Text>
//           <Text>Property: {invoice.property_id.title}</Text>
//         </View>

//         {/* Essential Works Table */}
//         <View style={{ marginBottom: 20 }}>
//           <Text style={{ marginBottom: 10 }}>Essential Works*</Text>
//           <View>
//             {/* Table Header */}
//             <View style={{ flexDirection: "row", borderBottom: 1 }}>
//               <Text style={{ flex: 2, padding: 8, borderRight: 1 }}>
//                 Item / Service
//               </Text>
//               <Text
//                 style={{
//                   flex: 1,
//                   padding: 8,
//                   borderRight: 1,
//                   textAlign: "center",
//                 }}
//               >
//                 Quantity
//               </Text>
//               <Text
//                 style={{
//                   flex: 1,
//                   padding: 8,
//                   borderRight: 1,
//                   textAlign: "center",
//                 }}
//               >
//                 Price/unit
//               </Text>
//               <Text style={{ flex: 1, padding: 8, textAlign: "center" }}>
//                 Price/Summary
//               </Text>
//             </View>

//             {/* Table Body */}
//             {invoice.essentialWorks.map((work, index) => (
//               <View
//                 key={index}
//                 style={{ flexDirection: "row", borderBottom: 1 }}
//               >
//                 <Text style={{ flex: 2, padding: 8, borderRight: 1 }}>
//                   {work.itemService}
//                 </Text>
//                 <Text
//                   style={{
//                     flex: 1,
//                     padding: 8,
//                     borderRight: 1,
//                     textAlign: "center",
//                   }}
//                 >
//                   {work.quantity}
//                 </Text>
//                 <Text
//                   style={{
//                     flex: 1,
//                     padding: 8,
//                     borderRight: 1,
//                     textAlign: "center",
//                   }}
//                 >
//                   {work.priceUnit?.toFixed(2)}
//                 </Text>
//                 <Text style={{ flex: 1, padding: 8, textAlign: "center" }}>
//                   {work.priceSummary?.toFixed(2)}
//                 </Text>
//               </View>
//             ))}

//             {/* Totals */}
//             <View style={{ marginTop: 10 }}>
//               <View
//                 style={{ flexDirection: "row", justifyContent: "flex-end" }}
//               >
//                 <Text style={{ marginRight: 40 }}>Sub Total</Text>
//                 <Text>{invoice.subtotal?.toFixed(2)}</Text>
//               </View>
//               <View
//                 style={{ flexDirection: "row", justifyContent: "flex-end" }}
//               >
//                 <Text style={{ marginRight: 40 }}>Vat 5%</Text>
//                 <Text>{invoice.tax?.toFixed(2)}</Text>
//               </View>
//               <View
//                 style={{ flexDirection: "row", justifyContent: "flex-end" }}
//               >
//                 <Text style={{ marginRight: 40 }}>Total</Text>
//                 <Text>{invoice.totalMaintenceCost?.toFixed(2)}</Text>
//               </View>
//               <View
//                 style={{ flexDirection: "row", justifyContent: "flex-end" }}
//               >
//                 <Text style={{ marginRight: 40 }}>Received Amount</Text>
//                 <Text>{invoice.receivedAmount?.toFixed(2)}</Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "flex-end",
//                   marginTop: 5,
//                 }}
//               >
//                 <Text style={{ marginRight: 40 }}>TOTAL AMOUNT OWED TO FP</Text>
//                 <Text>{invoice.amountOwedToFP?.toFixed(2)}</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Bank Details */}
//         <View style={{ marginBottom: 20 }}>
//           <Text style={{ marginBottom: 5 }}>BANK DETAILS</Text>
//           <Text>
//             Account Holder Name: {invoice.bank_details.accountHolderName}
//           </Text>
//           <Text>Account Number: {invoice.bank_details.accountNumber}</Text>
//           <Text>Bank: {invoice.bank_details.bankName}</Text>
//           <Text>IBAN: {invoice.bank_details.iban}</Text>
//           <Text>SWIFT CODE: {invoice.bank_details.swiftCode}</Text>
//         </View>

//         {/* Essential Works Photos */}
//         <View>
//           <Text style={{ marginBottom: 10 }}>Essential Works Photos (1/2)</Text>
//           <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
//             {invoice.essentialWorksImages?.map((photo, index) => (
//               <View key={index} style={{ width: "45%" }}>
//                 <Image
//                   style={{
//                     width: "100%",
//                     height: 150,
//                     objectFit: "cover",
//                     marginBottom: 5,
//                   }}
//                   src={photo.url}
//                 />
//                 <Text style={{ fontSize: 8 }}>{photo.work_name}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Footer */}
//         <View style={{ marginTop: 30 }}>
//           <Text>Kind regards,</Text>
//           <Text>{invoice.companyDetails.name}</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default MaintenanceInvoicePdf;
