import vehicles from '../data/vehicles.json'

export const allVehicles = vehicles
export const vehicleBySlug = (slug) => vehicles.find((vehicle) => vehicle.slug === slug)

const seatMap = {
	'toyota-corolla-cross-2024': 5,
	'bmw-x3-m-sport-2023': 5,
	'mercedes-c200-amg-2022': 4,
	'audi-q5-s-line-2021': 5,
	'lexus-rx350-fsport-2023': 5,
	'honda-vezel-hybrid-2022': 5,
	'volkswagen-tiguan-rline-2020': 5,
	'subaru-forester-xt-2021': 5,
	'mazda-cx5-signature-2022': 5,
	'nissan-xtrail-epower-2024': 7,
	'porsche-macan-2021': 4,
	'land-rover-discovery-sport-2020': 7,
}

export const getVehicleSeats = (vehicle) => seatMap[vehicle?.slug] ?? 5
