"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const acciones = [
    { titulo: "Nuevo cliente", icono: "＋" },
    { titulo: "Nuevo servicio", icono: "⌁" },
    { titulo: "Registrar pago", icono: "₡" },
    { titulo: "Fotos", icono: "◌" },
  ];

  const metricas = [
    { titulo: "Servicios hoy", valor: "2", detalle: "0 completados" },
    { titulo: "Clientes activos", valor: "30", detalle: "registrados" },
    { titulo: "Por cobrar", valor: "₡90,000", detalle: "2 pendientes" },
    { titulo: "Mes actual", valor: "₡0", detalle: "ingresos registrados" },
  ];

  const serviciosHoy = [
    {
      cliente: "Hellen",
      servicio: "Mantenimiento zona verde",
      hora: "09:00",
      lugar: "Calle Rodríguez",
      estado: "Programado",
    },
    {
      cliente: "Sandra Gonzales M119",
      servicio: "Poda y limpieza general",
      hora: "07:00",
      lugar: "Montezuma",
      estado: "Programado",
    },
  ];

  const opcionesMenu = [
    "Dashboard",
    "Clientes",
    "Calendario",
    "Servicios",
    "Pagos",
    "Fotos",
    "Reportes",
    "Empleados",
    "Configuración",
  ];

  return (
    <main className="min-h-screen bg-[#030805] text-white">
      <section className="relative mx-auto min-h-screen max-w-md overflow-hidden bg-[#07130c]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_5%,rgba(214,168,91,0.16),transparent_32%),radial-gradient(circle_at_85%_22%,rgba(71,133,83,0.18),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(214,168,91,0.08),transparent_42%),linear-gradient(180deg,#07130c_0%,#0d2014_48%,#050b07_100%)]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(120deg,rgba(255,255,255,0.045),transparent_35%,rgba(255,255,255,0.025)_65%,transparent)]" />

        <header className="relative px-5 pb-4 pt-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d6a85b]">
                  Jardin Admin
                </p>
                <h1 className="mt-2 text-2xl font-semibold leading-tight text-white">
                  Rodriguez Garden Service
                </h1>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/40">
                  Business Operations
                </p>
              </div>

              <button
                onClick={() => setMenuAbierto(true)}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.07] text-xl text-white/80 shadow-lg shadow-black/20 backdrop-blur-xl transition duration-300 hover:border-[#d6a85b]/35 hover:text-[#f0c779] hover:shadow-[#d6a85b]/10"
              >
                ☰
              </button>
            </div>
          </div>
        </header>

        <section className="relative px-5 py-4">
          <p className="text-sm font-medium text-white/45">Buenos días</p>
          <h2 className="mt-1 text-4xl font-semibold tracking-tight text-white">
            Operación de hoy
          </h2>
          <p className="mt-2 text-sm text-white/45">
            Martes 23 de junio, 2026
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {acciones.map((accion) => (
              <button
                key={accion.titulo}
                className="group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-5 text-left shadow-xl shadow-black/20 backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-[#d6a85b]/35 hover:bg-white/[0.08] hover:shadow-[0_0_35px_rgba(214,168,91,0.12)]"
              >
                <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_50%_0%,rgba(214,168,91,0.22),transparent_45%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a85b]/20 bg-[#d6a85b]/10 text-2xl text-[#f0c779] shadow-lg shadow-[#d6a85b]/10 transition duration-500 group-hover:scale-105 group-hover:border-[#f0c779]/35">
                  {accion.icono}
                </div>

                <p className="relative mt-5 text-sm font-semibold text-white/90">
                  {accion.titulo}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {metricas.map((item) => (
              <article
                key={item.titulo}
                className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-5 shadow-xl shadow-black/20 backdrop-blur-2xl"
              >
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full border border-[#d6a85b]/10 bg-white/[0.035]" />
                <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  {item.titulo}
                </p>
                <p className="relative mt-5 text-3xl font-semibold tracking-tight text-white">
                  {item.valor}
                </p>
                <p className="relative mt-1 text-xs text-white/40">
                  {item.detalle}
                </p>
              </article>
            ))}
          </div>

          <section className="mt-8 pb-14">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6a85b]">
                  Agenda
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-white">
                  Servicios de hoy
                </h3>
              </div>

              <button className="rounded-full border border-[#d6a85b]/25 bg-[#d6a85b]/10 px-4 py-2 text-xs font-semibold text-[#f0c779] transition hover:border-[#d6a85b]/40 hover:bg-[#d6a85b]/15">
                Ver todos
              </button>
            </div>

            <div className="space-y-4">
              {serviciosHoy.map((servicio, index) => (
                <article
                  key={servicio.cliente}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.065] p-5 shadow-2xl shadow-black/25 backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-[#d6a85b]/25 hover:bg-white/[0.085]"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full border border-[#d6a85b]/10 bg-[#d6a85b]/[0.035]" />
                  <div className="pointer-events-none absolute -left-24 bottom-0 h-36 w-36 rounded-full bg-emerald-400/[0.04] blur-2xl" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#d6a85b]/20 bg-[#d6a85b]/10 text-[#f0c779] shadow-lg shadow-[#d6a85b]/10">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em]">
                        Hoy
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-semibold text-white">
                          {servicio.cliente}
                        </p>
                        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                          {servicio.estado}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-white/45">
                        {servicio.servicio}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                        Hora
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white/75">
                        {servicio.hora}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                        Ubicación
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold text-white/75">
                        {servicio.lugar}
                      </p>
                    </div>
                  </div>

                  <button className="relative mt-5 h-11 w-full rounded-2xl border border-white/10 bg-white/[0.055] text-sm font-semibold text-white/80 transition duration-300 hover:border-[#d6a85b]/30 hover:text-[#f0c779]">
                    Abrir servicio
                  </button>
                </article>
              ))}
            </div>
          </section>
        </section>
      </section>

      <div
        onClick={() => setMenuAbierto(false)}
        className={`fixed inset-0 z-40 bg-black/35 backdrop-blur-sm transition-opacity duration-500 ${
          menuAbierto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[82%] max-w-[340px] border-r border-[#d6a85b]/15 bg-[#07140d]/80 shadow-[0_0_70px_rgba(0,0,0,0.65)] backdrop-blur-3xl transition-transform duration-500 ease-out ${
          menuAbierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d6a85b]">
              Jardin Admin
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">
              Rodriguez Garden Service
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/35">
              Business Operations
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-5">
            <div className="space-y-1.5">
              {opcionesMenu.map((item) => (
                <button
                  key={item}
                  onClick={() => setMenuAbierto(false)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-transparent px-4 py-3.5 text-left text-sm font-medium text-white/65 transition duration-300 hover:border-[#d6a85b]/20 hover:bg-white/[0.055] hover:text-[#f0c779]"
                >
                  <span>{item}</span>
                  <span className="text-white/20 transition group-hover:text-[#f0c779]">
                    →
                  </span>
                </button>
              ))}
            </div>
          </nav>

          <div className="border-t border-white/10 px-6 py-5">
            <button className="text-sm font-semibold text-white/45 transition duration-300 hover:text-[#f0c779]">
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>
    </main>
  );
}