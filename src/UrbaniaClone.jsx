import React, { useState } from "react";
import { motion } from "framer-motion";

const sampleProperties = [
  {
    id: 1,
    title: "Departamento moderno en Miraflores",
    price: "S/ 420,000",
    area: "85 m²",
    rooms: 3,
    image: "https://picsum.photos/seed/1/800/600",
    location: "Miraflores, Lima",
  },
  {
    id: 2,
    title: "Casa familiar en Surco",
    price: "S/ 850,000",
    area: "220 m²",
    rooms: 5,
    image: "https://picsum.photos/seed/2/800/600",
    location: "Surco, Lima",
  },
  {
    id: 3,
    title: "Penthouse con vista al mar",
    price: "S/ 1,350,000",
    area: "160 m²",
    rooms: 4,
    image: "https://picsum.photos/seed/3/800/600",
    location: "San Isidro, Lima",
  },
  {
    id: 4,
    title: "Departamento económico cerca a transporte",
    price: "S/ 210,000",
    area: "48 m²",
    rooms: 2,
    image: "https://picsum.photos/seed/4/800/600",
    location: "Ate, Lima",
  },
];

export default function UrbaniaClone() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [viewMap, setViewMap] = useState(false);

  const filtered = sampleProperties.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.location.toLowerCase().includes(query.toLowerCase());
    const numericPrice = Number(p.price.replace(/[^0-9]/g, ""));
    const inRange = numericPrice >= minPrice && numericPrice <= maxPrice;
    return matchesQuery && inRange;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-extrabold">Urbania<span className="text-indigo-600">Clone</span></div>
            <div className="text-sm text-gray-500">Busca departamentos, casas y terrenos</div>
          </div>
          <nav className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg border border-gray-200">Ingresar</button>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Publicar</button>
          </nav>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="mt-6 bg-white p-4 rounded-2xl shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por distrito, zona o palabra clave (ej: Miraflores)"
              className="col-span-2 px-4 py-3 border rounded-lg focus:outline-none"
            />

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value || 0))}
                placeholder="Min S/"
                className="px-3 py-2 border rounded-lg w-28"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value || 2000000))}
                placeholder="Max S/"
                className="px-3 py-2 border rounded-lg w-28"
              />
              <button
                onClick={() => setViewMap((v) => !v)}
                className="ml-auto px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                {viewMap ? "Ocultar mapa" : "Ver mapa"}
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold">Filtros</h4>
              <div className="mt-3 text-sm text-gray-600">
                <label className="flex items-center justify-between mt-2">
                  <span>Ambientes</span>
                  <select className="ml-2 px-2 py-1 border rounded">
                    <option>Indiferente</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                </label>

                <label className="flex items-center justify-between mt-2">
                  <span>Tipo</span>
                  <select className="ml-2 px-2 py-1 border rounded">
                    <option>Departamento</option>
                    <option>Casa</option>
                    <option>Terreno</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold">Ordenar</h4>
              <div className="mt-3">
                <select className="w-full px-3 py-2 border rounded">
                  <option>Más relevantes</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">Mostrando {filtered.length} resultados</div>
            <div className="text-sm text-gray-500">Resultados actualizados</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                <div className="relative">
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm">{p.price}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{p.location} • {p.area} • {p.rooms} dorms</p>
                  <div className="mt-3 flex items-center justify-between">
                    <button className="px-3 py-2 border rounded-lg text-sm">Ver detalle</button>
                    <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm">Contactar</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <nav className="inline-flex items-center space-x-2">
              <button className="px-3 py-1 border rounded">«</button>
              <button className="px-3 py-1 border rounded bg-indigo-50">1</button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <button className="px-3 py-1 border rounded">»</button>
            </nav>
          </div>
        </section>

        {viewMap && (
          <div className="lg:col-span-4">
            <div className="bg-white p-4 rounded-lg shadow mt-4">
              <h4 className="font-semibold mb-2">Mapa (placeholder)</h4>
              <div className="w-full h-72 bg-gray-200 rounded flex items-center justify-center text-gray-500">Mapa interactivo aquí</div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto mt-10 text-center text-sm text-gray-500">Diseñado para demostración • Copia y pega en tu proyecto</footer>
    </div>
  );
}