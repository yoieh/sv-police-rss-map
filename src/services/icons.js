export const getIcon = params => {
  const iconMap = [
    { id: 0, uri: require("../icons/cross-2.png") },
    { id: 1, uri: require("../icons/caution.png") },
    { id: 2, uri: require("../icons/robbery.png") },
    { id: 3, uri: require("../icons/fire.png") },
    { id: 4, uri: require("../icons/boxing.png") },
    { id: 5, uri: require("../icons/animal-shelter-export.png") },
    { id: 6, uri: require("../icons/bar.png") },
    { id: 7, uri: require("../icons/theft.png") },
    { id: 8, uri: require("../icons/police.png") },
    { id: 9, uri: require("../icons/crimescene.png") },
    { id: 10, uri: require("../icons/car.png") },
    { id: 11, uri: require("../icons/drugstore.png") },
    { id: 12, uri: require("../icons/icy_road.png") },
    { id: 13, uri: require("../icons/information.png") },
    { id: 14, uri: require("../icons/shooting.png") },
    { id: 15, uri: require("../icons/barrier.png") },
    { id: 16, uri: require("../icons/caraccident.png") },
    { id: 17, uri: require("../icons/symbol_inter.png") }
  ];
  
  switch (params) {
    case "Anträffad död":
      return iconMap[0];
    case "Arbetsplatsolycka":
      return iconMap[1];
    case "Bedrägeri":
      return iconMap[2];
    case "Brand":
      return iconMap[3];
    case "Bråk":
      return iconMap[4];
    case "Djur skadat/omhändertaget":
      return iconMap[5];
    case "Farligt föremål":
      return iconMap[1];
    case "Fylleri/LOB":
      return iconMap[6];
    case "Inbrott":
      return iconMap[7];
    case "Kontroll person/fordon":
      return iconMap[8];
    case "Larm Överfall":
      return iconMap[3];
    case "Misshandel":
      return iconMap[4];
    case "Mord/dråp":
      return iconMap[9];
    case "Motorfordon":
      return iconMap[10];
    case "Narkotikabrott":
      return iconMap[11];
    case "Olovlig körning":
      return iconMap[12];
    case "Rattfylleri":
      return iconMap[6];
    case "Rån":
      return iconMap[2];
    case "Rån väpnat":
      return iconMap[2];
    case "Rån övrigt":
      return iconMap[2];
    case "Sammanfattning kväll och natt":
      return iconMap[13];
    case "Sammanfattning natt":
      return iconMap[13];
    case "Sammanfattning vecka":
      return iconMap[13];
    case "Sedlighetsbrott":
      return iconMap[1];
    case "Skadegörelse":
      return iconMap[1];
    case "Skottlossning":
      return iconMap[14];
    case "Stöld":
      return iconMap[7];
    case "Stöld/inbrott":
      return iconMap[7];
    case "Trafikbrott":
      return iconMap[10];
    case "Trafikhinder":
      return iconMap[15];
    case "Trafikkontroll":
      return iconMap[8];
    case "Trafikolycka":
      return iconMap[16];
    case "Uppdatering":
      return iconMap[13];
    case "Övrigt":
      return iconMap[13];
    default:
      return iconMap[17];
  }
};

export default uri =>
  uri.map(item => {
    let incident = item.title.split(", ").slice(1)[0];
    return {
      ...item,
      icon: getIcon(incident)
    };
  });
