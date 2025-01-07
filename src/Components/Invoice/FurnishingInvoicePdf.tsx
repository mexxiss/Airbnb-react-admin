import { useMemo } from "react";
import {
  Page,
  View,
  Text,
  Document,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { FurnishingResponseInvoice } from "../../types/furnishingTypes";

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

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        page: {
          padding: 40,
          fontSize: 10,
          fontFamily: "Roboto",
          backgroundColor: "#FFFFFF",
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        },
        headerLeft: {
          flex: 1,
        },
        headerRight: {
          alignItems: "flex-end",
        },
        logo: {
          fontSize: 24,
          color: "#666",
          marginBottom: 15,
        },
        decorationBadge: {
          backgroundColor: "#FDF4E3",
          padding: "4px 12px",
          borderRadius: 4,
          marginBottom: 10,
        },
        decorationText: {
          color: "#B8860B",
          fontSize: 11,
        },
        invoiceNumber: {
          fontSize: 12,
          color: "#000",
        },
        infoGrid: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        },
        infoColumn: {
          flex: 1,
        },
        label: {
          color: "#666",
          marginBottom: 4,
        },
        value: {
          fontSize: 10,
          color: "#000",
        },
        date: {
          marginBottom: 20,
        },
        nameHeader: {
          backgroundColor: "#FAF7F2",
          padding: 8,
          marginBottom: 15,
        },
        nameText: {
          color: "#666",
        },
        furnishingDetails: {
          marginBottom: 30,
        },
        totalsContainer: {
          alignItems: "flex-end",
          marginTop: 20,
        },
        totalRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          width: "40%",
          marginBottom: 8,
        },
        totalLabel: {
          flex: 1,
        },
        totalValue: {
          textAlign: "right",
          fontWeight: "bold",
        },
        footer: {
          marginTop: 40,
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          paddingTop: 20,
        },
        footerText: {
          color: "#666",
          fontSize: 9,
          textAlign: "center",
        },
      }),
    []
  );

export default function FurnishingInvoicePdf({
  invoice,
}: {
  invoice: FurnishingResponseInvoice;
}) {
  const styles = useStyles();

  const formatDate = (date: string) => {
    return format(new Date(date), "yyyy/MM/dd");
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>Logo</Text>
            <Text>{invoice.companyDetails.name}</Text>
            <Text>{invoice.companyDetails.address}</Text>
            <Text>Phone: {invoice.companyDetails.phone}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.decorationBadge}>
              <Text style={styles.decorationText}>INTERIOR DECORATION</Text>
            </View>
            <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <Text style={styles.label}>Client Name:</Text>
            <Text style={styles.value}>{invoice.ownerDetails.name}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.label}>Month:</Text>
            <Text style={styles.value}>{invoice.statementPeriod}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.label}>Property:</Text>
            <Text style={styles.value}>{invoice.property_id.title}</Text>
          </View>
        </View>

        <View style={styles.date}>
          <Text style={styles.label}>
            Date: {formatDate(invoice.createdAt)}
          </Text>
        </View>

        <View style={styles.nameHeader}>
          <Text style={styles.nameText}>Name</Text>
        </View>

        <View style={styles.furnishingDetails}>
          <Text style={styles.value}>Styling Project</Text>
          <Text style={styles.value}>
            - Deep cleaning, DET lock, Laundry kit, Decorations
          </Text>
          <Text style={styles.value}>
            - Cutlery set, Cutlery tray, Coffee/tea mugs x4, Water glass set,
            Wine glass set, Placemats x6, Knife block, Cooking utensils, Baking
            tray, Chopping board, Corkscrew, Can opener, Grater, Strainer,
            Kitchen bin with lid, Kitchen towel, Mop and bucket, Kettle
          </Text>
          <Text style={styles.value}>
            - Bath mat, Shower curtain set, Pillow x1, Mattress protector, Duvet
            single, Duvet king, Bedroom bin, Ash tray, Qibla direction sticker,
            Praying mat, First aid kit, Extension cable, 4 way adaptor, Plastic
            bowl set, Toilet brush
          </Text>
        </View>

        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Furnising</Text>
            <Text style={styles.totalValue}>
              AED {invoice.totalFurnishingCost}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Received Amount</Text>
            <Text style={styles.totalValue}>AED {invoice.receivedAmount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL OWED TO FP</Text>
            <Text style={styles.totalValue}>AED {invoice.amountOwedToFP}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.value}>Kind regards,</Text>
          <Text style={styles.value}>{invoice.companyDetails.name}</Text>
          <Text style={styles.footerText}>www.frankporter.com</Text>
        </View>
      </Page>
    </Document>
  );
}
