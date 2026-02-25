const COMPARE_KEY = "compare_vehicles";
const FAVORITES_KEY = "favorite_vehicles";

export const VEHICLE_STORAGE_EVENT = "vehicle_storage_update";

const notifyUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(VEHICLE_STORAGE_EVENT));
  }
};

const getFromStorage = (key: string): any[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Failed to parse ${key} from storage`, e);
    return [];
  }
};

const saveToStorage = (key: string, data: any[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    notifyUpdate();
  } catch (e) {
    console.error(`Failed to save ${key} to storage`, e);
  }
};

export const getComparedCars = (): any[] => {
  return getFromStorage(COMPARE_KEY);
};

export const addToCompare = (
  car: any,
): { success: boolean; message: string } => {
  const cars = getComparedCars();
  const carId = car?._id || car?.id;

  if (cars.find((c: any) => (c?._id || c?.id) === carId)) {
    return { success: false, message: "Already in comparison" };
  }

  if (cars.length >= 4) {
    return { success: false, message: "Comparison list is full (max 4)" };
  }

  saveToStorage(COMPARE_KEY, [...cars, car]);
  return { success: true, message: "Added to comparison" };
};

export const removeFromCompare = (id: string) => {
  const cars = getComparedCars();
  const updatedCars = cars.filter((c: any) => (c?._id || c?.id) !== id);
  saveToStorage(COMPARE_KEY, updatedCars);
};

export const isInCompare = (id: string): boolean => {
  const cars = getComparedCars();
  return cars.some((c: any) => (c?._id || c?.id) === id);
};

// Favorites Logic
export const getFavoriteCars = (): any[] => {
  return getFromStorage(FAVORITES_KEY);
};

export const toggleFavorite = (
  car: any,
): { isAdded: boolean; message: string } => {
  const favorites = getFavoriteCars();
  const carId = car?._id || car?.id;
  const index = favorites.findIndex((c: any) => (c?._id || c?.id) === carId);

  if (index === -1) {
    saveToStorage(FAVORITES_KEY, [...favorites, car]);
    return { isAdded: true, message: "Added to favorites" };
  } else {
    const updatedFavorites = favorites.filter(
      (c: any) => (c?._id || c?.id) !== carId,
    );
    saveToStorage(FAVORITES_KEY, updatedFavorites);
    return { isAdded: false, message: "Removed from favorites" };
  }
};

export const isInFavorites = (id: string): boolean => {
  const favorites = getFavoriteCars();
  return favorites.some((c: any) => (c?._id || c?.id) === id);
};
