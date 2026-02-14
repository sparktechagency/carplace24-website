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

export const dataUrlToFile = (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
  const bstr = atob(arr[1] || "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};
