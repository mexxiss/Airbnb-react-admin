import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { IInvoice } from "../../types/invoiceTypes";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

interface InvoicePDFProps {
  invoice: IInvoice;
  currentStatus: string;
}

const InvoicePDFNew = ({ invoice, currentStatus }: InvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Invoice #{invoice.invoiceNumber}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Status: {currentStatus}</Text>
        <Text style={styles.text}>Total Amount: ${invoice.totalAmount}</Text>
        <Text style={styles.text}>Subtotal: ${invoice.subTotal}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDFNew;
