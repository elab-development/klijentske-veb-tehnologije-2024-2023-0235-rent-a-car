export type Id = string;

export interface Location {
  id: Id;
  city: string;
  name: string;
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface Booking extends TimeRange {
  carId: Id;
  pickupLocationId: Id;
  returnLocationId: Id;
}

export interface Car {
  id: Id;
  make: string;
  model: string;
  year: number;
  fuel: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  seats: number;
  pricePerHour: number;
  pickupLocationIds: Id[];
  returnLocationIds: Id[];
  bookings: Booking[];
  imageUrl?: string;
}

export interface SearchCriteria {
  make?: string;
  pickupLocationId?: Id;
  returnLocationId?: Id;
  start?: Date;
  end?: Date;
}

export interface ICarRepository {
  getAll(): Car[];
  findById(id: Id): Car | undefined;
  search(criteria: SearchCriteria): Car[];
}

export class AvailabilityService {
  isAvailable(car: Car, start: Date, end: Date): boolean {
    if (!start || !end || start >= end) return false;
    return car.bookings.every((b) => !(b.start < end && start < b.end));
  }

  findAvailable(
    cars: Car[],
    start: Date,
    end: Date,
    pickupLocationId?: Id,
    returnLocationId?: Id
  ): Car[] {
    return cars.filter((car) => {
      if (pickupLocationId && !car.pickupLocationIds.includes(pickupLocationId))
        return false;
      if (returnLocationId && !car.returnLocationIds.includes(returnLocationId))
        return false;
      return this.isAvailable(car, start, end);
    });
  }
}

export class InMemoryCarRepository implements ICarRepository {
  private cars: Car[];
  constructor(cars: Car[]) {
    this.cars = cars;
  }

  getAll(): Car[] {
    return this.cars;
  }

  findById(id: Id): Car | undefined {
    return this.cars.find((c) => c.id === id);
  }

  search(criteria: SearchCriteria): Car[] {
    const { make, pickupLocationId, returnLocationId, start, end } = criteria;
    const avail = new AvailabilityService();

    return this.cars.filter((c) => {
      if (make) {
        const m = make.trim().toLowerCase();
        if (!c.make.toLowerCase().includes(m)) return false;
      }
      if (pickupLocationId && !c.pickupLocationIds.includes(pickupLocationId))
        return false;
      if (returnLocationId && !c.returnLocationIds.includes(returnLocationId))
        return false;
      if (start && end && !avail.isAvailable(c, start, end)) return false;
      return true;
    });
  }
}

export interface Brand {
  id: Id;
  name: string;
  logoUrl?: string;
}
