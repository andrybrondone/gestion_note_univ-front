import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

interface Module {
  id: number;
  nom_module: string;
  Matieres: Matiere[];
  moyenne: number;
  totalCreditsObt: number;
  totalCredits: number;
  validationUE: boolean;
}

interface Matiere {
  id: number;
  nom_mat: string;
  Notes: { note: number }[];
}

interface ReleverNotePDFProps {
  data: {
    Personne: {
      nom: string;
      prenom: string;
      date_nais: string;
    };
    matricule: string;
    parcours: string;
    moyenne_pratique: number;
  };
  modules: Module[];
  semestre: string;
  currentYear: number;
  moyenneTheorique: number;
  totaleCreditsObtenu: number;
  totaleCredits: number;
  autorisation: string;
  moyenneGeneral: number;
  creditsGeneralObtenu: number;
  observationFinale: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#000",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    textDecoration: "underline",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableCellHeader: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    textAlign: "right",
  },
  note: {
    fontSize: 10,
    marginTop: 20,
  },
});

const ReleverNotePDF: React.FC<ReleverNotePDFProps> = ({
  data,
  modules,
  semestre,
  currentYear,
  moyenneTheorique,
  totaleCreditsObtenu,
  totaleCredits,
  autorisation,
  moyenneGeneral,
  creditsGeneralObtenu,
  observationFinale,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src="/assets/images/univ.jpg" style={{ width: 50 }} />
        <Text>Université de Fianarantsoa</Text>
        <Image src="/assets/images/logoENI.png" style={{ width: 50 }} />
      </View>
      <Text style={styles.title}>RELEVE DE NOTES</Text>
      <Text style={styles.footer}>
        N° . . . . . /{currentYear}/UF/ENI/SCO.RN
      </Text>

      <View style={styles.section}>
        <Text>
          Nom et prénom :{" "}
          {`${data.Personne.nom.toUpperCase()} ${data.Personne.prenom}`}
        </Text>
        <Text>Date et lieu de naissance : {data.Personne.date_nais}</Text>
        <Text>Numéro d'inscription : {data.matricule}</Text>
      </View>

      <View style={styles.section}>
        <Text>Domaine : Science de l'ingénieur</Text>
        <Text>Parcours : {data.parcours}</Text>
      </View>

      <Text>Année Universitaire 2022/2023</Text>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableCellHeader]}>
          <Text style={styles.tableCell}>UE</Text>
          <Text style={styles.tableCell}>Matières</Text>
          <Text style={styles.tableCell}>Notes /20</Text>
          <Text style={styles.tableCell}>Crédits</Text>
          <Text style={styles.tableCell}>Validation de l'UE</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 5 }]}>{semestre}</Text>
        </View>

        {modules.map((module) => (
          <React.Fragment key={module.id}>
            {module.Matieres.map((matiere, index) => (
              <View style={styles.tableRow} key={matiere.id}>
                {index === 0 && (
                  <Text
                    style={[
                      styles.tableCell,
                      {
                        flex: module.Matieres.length + 1,
                        flexDirection: "row",
                      },
                    ]}
                  >
                    {module.nom_module}
                  </Text>
                )}
                <Text style={styles.tableCell}>{matiere.nom_mat}</Text>
                <Text style={styles.tableCell}>
                  {matiere.Notes.length > 0 ? matiere.Notes[0].note : "-"}
                </Text>
                {index === 0 && (
                  <>
                    <Text
                      style={[
                        styles.tableCell,
                        {
                          flex: module.Matieres.length + 1,
                          flexDirection: "row",
                        },
                      ]}
                    >
                      {module.totalCreditsObt}/{module.totalCredits}
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        {
                          flex: module.Matieres.length + 1,
                          flexDirection: "row",
                        },
                      ]}
                    >
                      {module.validationUE ? "Valide" : "Non valide"}
                    </Text>
                  </>
                )}
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>
                Moyenne
              </Text>
              <Text style={styles.tableCell}>
                {module.moyenne.toFixed(2)}/20
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text
            style={[styles.tableCell, styles.tableCellHeader, { flex: 3 }]}
          ></Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellHeader]}>
            MOYENNE THEORIQUE
          </Text>
          <Text style={styles.tableCell}>{moyenneTheorique.toFixed(2)}</Text>
          <Text style={styles.tableCell}>
            {totaleCreditsObtenu}/{totaleCredits}
          </Text>
          <Text style={styles.tableCell}>{autorisation}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellHeader]}>
            MOYENNE PRATIQUE
          </Text>
          <Text style={styles.tableCell}>{data.moyenne_pratique}</Text>
          <Text style={styles.tableCell}>5/5</Text>
          <Text style={styles.tableCell}>VALIDE</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
          <Text style={[styles.tableCell, styles.tableCellHeader]}>
            MOYENNE GENERALE
          </Text>
          <Text style={styles.tableCell}>
            {moyenneGeneral !== null ? moyenneGeneral.toFixed(2) : "_"}
          </Text>
          <Text style={[styles.tableCell, styles.tableCellHeader]}>
            TOTAL CREDITS
          </Text>
          <Text style={styles.tableCell}>{creditsGeneralObtenu}/60</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 5 }]}>
            OBSERVATION FINALE : <Text>{observationFinale}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>
          Fait à Fianarantsoa, le . . . . . . . . . . . . . . . . . . . .
        </Text>
      </View>

      <Text style={styles.note}>
        Note importante : Ce relevé de notes ne doit être remis en aucun cas à
        l'intéressé sous peine d'annulation.
      </Text>
      <View>
        <Text>: 1487 Tanambao, Fianarantsoa(301)</Text>
        <Text>: +261 34 05 733 36 / +261 32 15 204 28</Text>
        <Text>: scolarite@eni.mg</Text>
      </View>
    </Page>
  </Document>
);

export default ReleverNotePDF;
