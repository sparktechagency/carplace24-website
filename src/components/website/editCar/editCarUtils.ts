export const equipmentOptions = [
  { label: "ABS" },
  { label: "Accesso e accensione senza chiave" },
  { label: "Aiuti al parcheggio" },
  { label: "Altoparlante" },
  { label: "Alzacristalli elettrici" },
  { label: "Android Auto" },
  { label: "Apple CarPlay" },
  { label: "Aria condizionata" },
  { label: "Climatizzatore automatico" },
  { label: "Assistente di corsia" },
  { label: "Assistente di frenata automatico" },
  { label: "Bloccaggio differenziale" },
  { label: "Cerchi in lega" },
  { label: "Controllo di velocità" },
  { label: "Controllo di velocità adattivo" },
  { label: "Controllo elettronico della stabilità (ESP)" },
  { label: "Coperture dei sedili" },
  { label: "Alcantara" },
  { label: "Interni in tessuto" },
  { label: "Sedili in pelle" },
  { label: "Dispositivo antifurto" },
  { label: "Elementi cromati" },
  { label: "Fari" },
  { label: "Fari allo laser" },
  { label: "Fari LED" },
  { label: "Fari allo xeno" },
  { label: "Fari adattivi" },
  { label: "Gancio traino" },
  { label: "Gancio di traino rimovibile" },
  { label: "Gancio di traino orientabile" },
  { label: "Gancio di traino fisso" },
  { label: "Head-up Display" },
  { label: "Interfaccia Bluetooth" },
  { label: "ISOFIX" },
  { label: "Pedana" },
  { label: "Pittura speciale" },
  { label: "Porta scorrevole" },
  { label: "Portapacchi" },
  { label: "Porte ad ali di gabbiano" },
  { label: "Portellone posteriore elettrico" },
  { label: "Radio DAB" },
  { label: "Regolazione elettrica dei sedili" },
  { label: "Ricarica rapida" },
  { label: "Riscaldamento ausiliario" },
  { label: "Schienale" },
  { label: "Sedili riscaldati" },
  { label: "Sedili sportivi" },
  { label: "Sedili ventilati" },
  { label: "Sensori di parcheggio anteriori" },
  { label: "Sensori di parcheggio posteriori" },
  { label: "Silenziatore personalizzato" },
  { label: "Sistema di allarme" },
  { label: "Sistema di monitoraggio angolo cieco" },
  { label: "Sistema di navigazione" },
  { label: "Navigazione" },
  { label: "Sistema di navigazione portatile" },
  { label: "Sistema start-stop" },
  { label: "Sospensioni pneumatiche" },
  { label: "Sospensioni rinforzate" },
  { label: "Strumentazione aggiuntiva" },
  { label: "Telecamera a 360°" },
  { label: "Telecamera posteriore" },
  { label: "Tetto panoramico" },
  { label: "Tetto rigido" },
  { label: "Tettuccio apribile" },
  { label: "Valigia" },
  { label: "Vivavoce" },
];

export const labelToKey: Record<string, string> = {
  abs: "ABS",
  "accesso e accensione senza chiave": "KeylessEntryStart",
  "aiuti al parcheggio": "ParkingAssist",
  altoparlante: "SoundSystem",
  "alzacristalli elettrici": "ElectricWindows",
  "android auto": "AndroidAuto",
  "apple carplay": "AppleCarPlay",
  "aria condizionata": "AirConditioning",
  "climatizzatore automatico": "ClimateControl",
  "assistente di corsia": "LaneAssist",
  "assistente di frenata automatico": "AutomaticBrakeAssist",
  "bloccaggio differenziale": "DifferentialLock",
  "cerchi in lega": "AlloyWheels",
  "controllo di velocità": "CruiseControl",
  "controllo di velocità adattivo": "AdaptiveCruiseControl",
  "controllo elettronico della stabilità (esp)": "StabilityControlESP",
  "coperture dei sedili": "SeatCovers",
  alcantara: "Alcantara",
  "interni in tessuto": "FabricSeats",
  "sedili in pelle": "LeatherSeats",
  "dispositivo antifurto": "AntiTheftDevice",
  "elementi cromati": "ChromeElements",
  fari: "Headlights",
  "fari allo laser": "LaserHeadlights",
  "fari led": "LEDHeadlights",
  "fari allo xeno": "XenonHeadlights",
  "fari adattivi": "AdaptiveHeadlights",
  "gancio traino": "Towbar",
  "gancio di traino rimovibile": "DetachableTowbar",
  "gancio di traino orientabile": "SwivelTowbar",
  "gancio di traino fisso": "FixedTowbar",
  "head-up display": "HeadUpDisplay",
  "interfaccia bluetooth": "Bluetooth",
  isofix: "Isofix",
  pedana: "Footboard",
  "pittura speciale": "SpecialPaint",
  "porta scorrevole": "SlidingDoor",
  portapacchi: "RoofRack",
  "porte ad ali di gabbiano": "GullwingDoors",
  "portellone posteriore elettrico": "ElectricTailgate",
  "radio dab": "RadioDAB",
  "regolazione elettrica dei sedili": "ElectricSeatAdjustment",
  "ricarica rapida": "FastCharging",
  "riscaldamento ausiliario": "AuxiliaryHeating",
  schienale: "BackRest",
  "sedili riscaldati": "HeatedSeats",
  "sedili sportivi": "SportsSeats",
  "sedili ventilati": "VentilatedSeats",
  "sensori di parcheggio anteriori": "FrontParkingSensors",
  "sensori di parcheggio posteriori": "RearParkingSensors",
  "silenziatore personalizzato": "CustomMuffler",
  "sistema di allarme": "AlarmSystem",
  "sistema di monitoraggio angolo cieco": "BlindSpotMonitoring",
  "sistema di navigazione": "NavigationSystem",
  navigazione: "NavigationSystem",
  "sistema di navigazione portatile": "PortableNavigation",
  "sistema start-stop": "StartStopSystem",
  "sospensioni pneumatiche": "AirSuspension",
  "sospensioni rinforzate": "ReinforcedSuspension",
  "strumentazione aggiuntiva": "AdditionalInstruments",
  "telecamera a 360°": "Camera360",
  "telecamera posteriore": "RearCamera",
  "tetto panoramico": "PanoramicRoof",
  "tetto rigido": "HardTop",
  "tettuccio apribile": "Sunroof",
  valigia: "Luggage",
  vivavoce: "HandsFree",
};

export const normalize = (s: string) =>
  String(s || "")
    .trim()
    .toLowerCase();

export const getEquipmentFeaturesFromCar = (car: any): string[] => {
  if (!car || !car.equipment) return [];

  // Check if equipmentFeatures array exists and use it if preferred
  // However, user complained it's empty, so we force reconstruction from equipment object

  const reconstructedFeatures: string[] = [];

  equipmentOptions.forEach((opt) => {
    const normLabel = normalize(opt.label);
    const key = labelToKey[normLabel];

    if (key && car.equipment[key]) {
      // Check for truthiness. API might return "true" string or boolean true or 1
      const val = car.equipment[key];
      if (val === true || val === "true" || val === 1) {
        reconstructedFeatures.push(opt.label);
      }
    }
  });

  return reconstructedFeatures;
};
