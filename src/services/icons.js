export const getIcon = params => {
  switch (params) {
    case "Anträffad död":
      return "../icons/cross-2";
    case "Arbetsplatsolycka":
      return require("../icons/caution.png");
    case "Bedrägeri":
      return require("../icons/robbery.png");
    case "Brand":
      return require("../icons/fire.png");
    case "Bråk":
      return require("../icons/boxing.png");
    case "Djur skadat/omhändertaget":
      return require("../icons/animal-shelter-export.png");
    case "Farligt föremål":
      return require("../icons/caution.png");
    case "Fylleri/LOB":
      return require("../icons/bar.png");
    case "Inbrott":
      return require("../icons/theft.png");
    case "Kontroll person/fordon":
      return require("../icons/police.png");
    case "Larm Överfall":
      return require("../icons/boxing.png");
    case "Misshandel":
      return require("../icons/boxing.png");
    case "Mord/dråp":
      return require("../icons/crimescene.png");
    case "Motorfordon":
      return require("../icons/car.png");
    case "Narkotikabrott":
      return require("../icons/drugstore.png");
    case "Olovlig körning":
      return require("../icons/icy_road.png");
    case "Rattfylleri":
      return require("../icons/bar.png");
    case "Rån":
      return require("../icons/robbery.png");
    case "Rån väpnat":
      return require("../icons/robbery.png");
    case "Rån övrigt":
      return require("../icons/robbery.png");
    case "Sammanfattning kväll och natt":
      return require("../icons/information.png");
    case "Sammanfattning natt":
      return require("../icons/information.png");
    case "Sammanfattning vecka":
      return require("../icons/information.png");
    case "Sedlighetsbrott":
      return require("../icons/caution.png");
    case "Skadegörelse":
      return require("../icons/caution.png");
    case "Skottlossning":
      return require("../icons/shooting.png");
    case "Stöld":
      return require("../icons/theft.png");
    case "Stöld/inbrott":
      return require("../icons/theft.png");
    case "Trafikbrott":
      return require("../icons/car.png");
    case "Trafikhinder":
      return require("../icons/barrier.png");
    case "Trafikkontroll":
      return require("../icons/police.png");
    case "Trafikolycka":
      return require("../icons/caraccident.png");
    case "Uppdatering":
      return require("../icons/information.png");
    case "Övrigt":
      return require("../icons/information.png");
    default:
      return require("../icons/symbol_inter.png");
  }
};

export default data =>
  data.map(item => {
    let incident = item.title.split(", ").slice(1)[0];
    return {
      ...item,
      icon: getIcon(incident)
    };
  });
