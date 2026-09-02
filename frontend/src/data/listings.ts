export type ListingDetail = {
  id: string;
  title: string;
  year: string;
  bodyType: string;
  fuel: string;
  price: string;
  phone: string;
  description: string[];
  features: string[];
  specs: Array<{ label: string; value: string }>;
  images: {
    main: string;
    side: string;
    dash: string;
  };
};

export const DEMO_LISTING: ListingDetail = {
  id: "bmw-8-series",
  title: "BMW 8 Series",
  year: "2021",
  bodyType: "Sedan",
  fuel: "Electric",
  price: "$65,850.00",
  phone: "416-555-551",
  description: [
    "While it may not be the Ultimate Driving Machine, the 2021 BMW 8-series takes its role as a big, comfortable cruiser quite seriously.",
    "Offered in both hardtop coupe and ragtop convertible body styles, the 8-series delivers a cosseting cabin, a quiet ride, and enough panache to justify its princely price tag.",
    "Buyers can choose from either a silky-smooth twin-turbocharged inline-six in the 840i models or a punchy twin-turbo V-8 that makes 523 hp in the M850i.",
    "Cornering prowess isn't up to the standards of BMW's smaller and more focused sport coupes and sedans, but it holds its own nicely against similarly plush rivals such as the Lexus LC and the Mercedes-Benz S-class coupe and convertible.",
    "Like the look but need four doors? Check out the 8-series Gran Coupe, which we review separately. It's the sporty one in the family.",
  ],
  features: [
    "Blind-spot warning",
    "Backup camera",
    "Rear-spot warning",
    "Air Conditioning",
    "DVD Player",
    "Remote Starter",
  ],
  specs: [
    { label: "Make", value: "BMW" },
    { label: "Model", value: "8 Series" },
    { label: "Exterior Color", value: "Gray" },
    { label: "Interior Color", value: "Black" },
    { label: "Transmission", value: "Automatic" },
    { label: "Condition", value: "New" },
    { label: "Model Year", value: "2021" },
    { label: "Fuel Type", value: "Electric" },
    { label: "Odometer", value: "65,000km" },
    { label: "Doors", value: "4" },
    { label: "Torque", value: "5200" },
    { label: "Engine", value: "3.8L" },
    { label: "Drive Train", value: "All Wheel Drive" },
    { label: "Horse Power", value: "325" },
    { label: "Top Speed", value: "280km/h" },
    { label: "VIN", value: "6325417896" },
  ],
  images: {
    main: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80",
    side: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=900&q=80",
    dash: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
};

export const DEMO_LISTINGS_CARDS = Array.from({ length: 9 }, (_, i) => ({
  id: i === 0 ? DEMO_LISTING.id : `artega-gt-${i + 1}`,
  title: i === 0 ? DEMO_LISTING.title : "Artega Gt",
  seats: "5",
  fuel: "CNG",
  doors: "2",
  price: i === 0 ? DEMO_LISTING.price : "$0.00",
  imageSrc:
    i === 0
      ? DEMO_LISTING.images.main
      : "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
}));

export function getListingById(id: string): ListingDetail {
  if (id === DEMO_LISTING.id) return DEMO_LISTING;
  return {
    ...DEMO_LISTING,
    id,
    title: "Artega Gt",
    year: "2021",
    bodyType: "SUV",
    fuel: "CNG",
    price: "$0.00",
    images: {
      main: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80",
      side: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
      dash: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
    },
    specs: DEMO_LISTING.specs.map((spec) => {
      if (spec.label === "Make") return { ...spec, value: "Artega" };
      if (spec.label === "Model") return { ...spec, value: "Gt" };
      return spec;
    }),
  };
}
