import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { IMonthlyInvoice } from "../../types/invoiceTypes";
import { formatDate } from "../../utils/common";

const styles = StyleSheet.create({
  col4: { width: "25%" },
  col8: { width: "75%" },
  col6: { width: "50%" },
  px6: { paddingHorizontal: 6 },
  mb4: { marginBottom: 4 },
  mt4: { marginTop: 4 },
  mt6: { marginTop: 6 },
  mb8: { marginBottom: 8 },
  mt8: { marginTop: 8 },
  mt12: { marginTop: 12 },
  mb40: { marginBottom: 40 },
  mt40: { marginTop: 40 },
  bold: { fontWeight: 900 },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, marginBottom: 4 },
  body1: { fontSize: 10 },
  body2: { fontSize: 9 },
  subtitle1: { fontSize: 10, fontWeight: 700 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: "right" },
  page: {
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: "Roboto",
    backgroundColor: "#FFFFFF",
    textTransform: "capitalize",
    padding: "40px 24px 120px 24px",
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
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: "auto",
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
    borderColor: "#DFE3E8",
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  table: {
    display: "flex",
    width: "auto",
  },
  tHead: {
    backgroundColor: "#FDF4E3"
  },
  tableRow: {
    padding: "8px 0",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#DFE3E8",
  },
  noBorder: {
    paddingTop: 8,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  tableCell_1: {
    width: "5%",
  },
  tableCell_2: {
    width: "50%",
    paddingRight: 16,
  },
  tableCell_3: {
    width: "30%",
  },
  date: {
    fontSize: 12,
    fontWeight: 500,
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
    fontSize: 12,
    color: "#000",
    opacity: 0.6
  },
  totalValue: {
    fontSize: 12,
    textAlign: "right",
  },
});

interface InvoicePDFProps {
  invoice: IMonthlyInvoice;
}

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf" }, // Regular
    {
      src: "https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu51xIIzc.ttf",
      fontWeight: 700,
    }, // Bold
  ],
});

const MonthlyInvoicePDFWithTable = ({ invoice }: InvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>Logo</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.decorationBadge}>
            <Text style={styles.decorationText}>Revenue Statement</Text>
          </View>
          <Text style={styles.invoiceNumber}>{invoice?.invoiceDetails?.invoiceNumber}</Text>
        </View>
      </View>
      <View style={styles.gridContainer}>
        <View>
          <Text style={styles.h4}>{invoice?.ownerDetails?.name}</Text>
          <Text>{invoice?.ownerDetails?.address}</Text>
          <Text>Phone: {invoice.ownerDetails?.phone}</Text>

          <View style={styles.mt6}>
            <Text style={styles.date}>
              Date: {formatDate(invoice?.invoiceDetails?.date || "")}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.h4}>{invoice?.companyDetails?.name}</Text>
          <Text>
            {invoice?.companyDetails?.address}
          </Text>
          <Text>
            <Text>Phone:</Text>
            <Text>
              {invoice?.companyDetails?.phone}
            </Text>
          </Text>

          <View style={styles.mt6}>
            <Text style={styles.date}>
              Statement Period: {invoice?.invoiceDetails?.statementPeriod}
            </Text>
          </View>
        </View>
      </View>

      {/* Table Header */}
      <View style={[styles.table, styles.mb8, styles.mt12]}>
        <View style={[styles.tableRow, styles.h4, styles.tHead]}>
          <Text style={[styles.tableCell_1, styles.body2, styles.px6]}>#</Text>
          <Text style={[styles.tableCell_2, styles.body2, styles.px6]}>
            Reservation Code
          </Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>Guest Name</Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>Check-In</Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>Check-Out</Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>Total Nights</Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>Income</Text>
        </View>
      </View>

      {/* Table Rows */}
      {invoice?.reservations?.map((reservation, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.tableCell_1, styles.body2, styles.px6]}>{index + 1}</Text>
          <Text style={[styles.tableCell_2, styles.body2, styles.px6]}>
            {reservation.reservationCode}
          </Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>
            {reservation.guestName}
          </Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>
            {formatDate(reservation.checkIn || "")}
          </Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>
            {formatDate(reservation.checkOut || "")}
          </Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>
            {reservation.totalNights}
          </Text>
          <Text style={[styles.tableCell_3, styles.body2, styles.px6]}>
            ${reservation.netRentalIncome}
          </Text>
        </View>
      ))}

      <View style={[styles.totalsContainer, styles.px6]}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            AED 100
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Management Fee (17%)</Text>
          <Text style={styles.totalValue}>AED 17</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Net Total</Text>
          <Text style={styles.totalValue}>AED 83</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Kind regards,</Text>
        <Text>Mexxstates</Text>
        <Text
          style={{
            backgroundColor: "#bb9e6c",
            marginTop: 15,
            paddingVertical: 6,
            paddingHorizontal: 3,
          }}
        >
          www.frankporter.com
        </Text>
      </View>
    </Page>
  </Document>
);

export default MonthlyInvoicePDFWithTable;
